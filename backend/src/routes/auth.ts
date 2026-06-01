import { Router, Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

function parseLinkState(state?: string): string | null {
  if (!state) return null;
  try {
    const decoded = atob(state);
    if (decoded.startsWith('link:')) return decoded.split(':')[1];
  } catch { /* ignore */ }
  return null;
}

async function upsertUser(data: {
  github_id?: number; twitch_id?: string;
  github_username?: string; twitch_username?: string;
  display_name: string; email?: string | null; avatar_url?: string | null;
}) {
  const column = data.github_id ? 'github_id' : 'twitch_id';
  const value  = data.github_id ?? data.twitch_id;

  const { data: existing } = await supabase
    .from('users').select('*').eq(column, value).single();

  if (existing) {
    const isCustomAvatar = existing.avatar_url?.includes('/avatars/');
    const updates: Record<string, any> = {
      email:      data.email || existing.email,
      last_login: new Date().toISOString(),
    };
    if (!isCustomAvatar) updates.avatar_url = data.avatar_url;

    const { data: updated, error } = await supabase
      .from('users').update(updates).eq('id', existing.id).select().single();
    if (error) throw error;
    return updated;
  }

  const { data: created, error } = await supabase
    .from('users')
    .insert({ ...data, xp: 0, level: 1, is_public: true, last_login: new Date().toISOString() })
    .select().single();
  if (error) throw error;
  return created;
}

async function linkAccount(userId: string, data: {
  github_id?: number; github_username?: string;
  twitch_id?: string; twitch_username?: string;
  avatar_url?: string | null;
}) {
  const { data: existing } = await supabase
    .from('users').select('avatar_url').eq('id', userId).single();
  const isCustomAvatar = existing?.avatar_url?.includes('/avatars/');
  const updates: Record<string, any> = { ...data, last_login: new Date().toISOString() };
  if (isCustomAvatar) delete updates.avatar_url;

  const { data: updated, error } = await supabase
    .from('users').update(updates).eq('id', userId).select().single();
  if (error) throw error;
  return updated;
}

// ── GitHub ────────────────────────────────────────────────────────────────────

router.get('/github', (_req: Request, res: Response) => {
  const params = new URLSearchParams({
    client_id:    process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${process.env.API_URL}/api/auth/github/callback`,
    scope:        'read:user user:email',
  });
  res.json({ url: `https://github.com/login/oauth/authorize?${params}` });
});

router.get('/github/callback', async (req: Request, res: Response): Promise<any> => {
  const { code, state } = req.query as Record<string, string>;
  const FRONT = process.env.FRONTEND_URL!;
  if (!code) return res.redirect(`${FRONT}?auth_error=missing_code`);

  try {
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      { client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET,
        code, redirect_uri: `${process.env.API_URL}/api/auth/github/callback` },
      { headers: { Accept: 'application/json' } }
    );
    const accessToken: string = tokenRes.data.access_token;
    if (!accessToken) throw new Error('No GitHub access token');

    const [userRes, emailsRes] = await Promise.all([
      axios.get('https://api.github.com/user',        { headers: { Authorization: `Bearer ${accessToken}` } }),
      axios.get('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${accessToken}` } }),
    ]);
    const ghUser  = userRes.data;
    const primary = (emailsRes.data as any[]).find(e => e.primary)?.email ?? ghUser.email;
    const linkUserId = parseLinkState(state);

    const user = linkUserId
      ? await linkAccount(linkUserId, { github_id: ghUser.id, github_username: ghUser.login, avatar_url: ghUser.avatar_url })
      : await upsertUser({ github_id: ghUser.id, github_username: ghUser.login, display_name: ghUser.name || ghUser.login, email: primary, avatar_url: ghUser.avatar_url });

    return res.redirect(`${FRONT}/auth-callback?token=${signToken(user.id)}`);
  } catch (err: any) {
    console.error('[GitHub OAuth]', err.message);
    return res.redirect(`${FRONT}?auth_error=github_failed`);
  }
});

// ── Twitch ────────────────────────────────────────────────────────────────────

router.get('/twitch', (_req: Request, res: Response) => {
  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID!, redirect_uri: `${process.env.API_URL}/api/auth/twitch/callback`,
    response_type: 'code', scope: 'user:read:email',
  });
  res.json({ url: `https://id.twitch.tv/oauth2/authorize?${params}` });
});

router.get('/twitch/callback', async (req: Request, res: Response): Promise<any> => {
  const { code, state } = req.query as Record<string, string>;
  const FRONT = process.env.FRONTEND_URL!;
  if (!code) return res.redirect(`${FRONT}?auth_error=missing_code`);

  try {
    const tokenRes = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: { client_id: process.env.TWITCH_CLIENT_ID, client_secret: process.env.TWITCH_CLIENT_SECRET,
        code, grant_type: 'authorization_code', redirect_uri: `${process.env.API_URL}/api/auth/twitch/callback` },
    });
    const accessToken: string = tokenRes.data.access_token;
    if (!accessToken) throw new Error('No Twitch access token');

    const userRes = await axios.get('https://api.twitch.tv/helix/users', {
      headers: { Authorization: `Bearer ${accessToken}`, 'Client-Id': process.env.TWITCH_CLIENT_ID! },
    });
    const twUser = userRes.data.data[0];

    // Нормализуем login — всегда lowercase без @
    const twitchLogin = twUser.login.toLowerCase().replace(/^@/, '');

    const linkUserId = parseLinkState(state);
    const user = linkUserId
      ? await linkAccount(linkUserId, { twitch_id: twUser.id, twitch_username: twitchLogin, avatar_url: twUser.profile_image_url })
      : await upsertUser({ twitch_id: twUser.id, twitch_username: twitchLogin, display_name: twUser.display_name, email: twUser.email, avatar_url: twUser.profile_image_url });

    return res.redirect(`${FRONT}/auth-callback?token=${signToken(user.id)}`);
  } catch (err: any) {
    console.error('[Twitch OAuth]', err.message);
    return res.redirect(`${FRONT}?auth_error=twitch_failed`);
  }
});

// ── /me ───────────────────────────────────────────────────────────────────────
router.get('/me', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { data: user, error } = await supabase
    .from('users')
    .select('id, display_name, github_username, twitch_username, email, avatar_url, bio, xp, level, is_public, is_investor, created_at, last_login')
    .eq('id', userId).single();

  if (error || !user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user });
});

// ── /heartbeat — обновляет last_login (вызывается каждые 5 мин с фронтенда) ──
router.post('/heartbeat', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', userId);
  return res.json({ ok: true, ts: new Date().toISOString() });
});

// ── /logout ───────────────────────────────────────────────────────────────────
router.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true });
});

export default router;
