import { Router, Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { supabase } from '../server';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// ─── Генерация JWT (живёт 7 дней) ────────────────────────────────────────────
function signToken(userId: string): string {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
}

// ─── Найти или создать пользователя в Supabase ────────────────────────────────
async function upsertUser(data: {
  github_id?: number;
  twitch_id?: string;
  github_username?: string;
  twitch_username?: string;
  display_name: string;
  email?: string | null;
  avatar_url?: string | null;
}) {
  const column = data.github_id ? 'github_id' : 'twitch_id';
  const value  = data.github_id ?? data.twitch_id;

  // Ищем существующего пользователя
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq(column, value)
    .single();

  if (existing) {
    // Обновляем при каждом входе
    const { data: updated, error } = await supabase
      .from('users')
      .update({
        avatar_url: data.avatar_url,
        email:      data.email || existing.email,
        last_login: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  }

  // Создаём нового пользователя
  const { data: created, error } = await supabase
    .from('users')
    .insert({
      ...data,
      xp:         0,
      level:      1,
      is_public:  true,
      last_login: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return created;
}

// ══════════════════════════════════════════════
//  GITHUB
// ══════════════════════════════════════════════

// GET /api/auth/github
// Возвращает URL для редиректа на GitHub
router.get('/github', (_req: Request, res: Response) => {
  const params = new URLSearchParams({
    client_id:    process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${process.env.API_URL}/api/auth/github/callback`,
    scope:        'read:user user:email',
  });
  res.json({ url: `https://github.com/login/oauth/authorize?${params}` });
});

// GET /api/auth/github/callback
// GitHub редиректит сюда после авторизации
router.get('/github/callback', async (req: Request, res: Response): Promise<any> => {
  const { code } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}?auth_error=missing_code`);
  }

  try {
    // 1. Обмен code → access_token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id:     process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri:  `${process.env.API_URL}/api/auth/github/callback`,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken: string = tokenRes.data.access_token;
    if (!accessToken) throw new Error('No access token from GitHub');

    // 2. Данные пользователя + email
    const [userRes, emailsRes] = await Promise.all([
      axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    const ghUser  = userRes.data;
    const primary = (emailsRes.data as any[]).find((e) => e.primary)?.email ?? ghUser.email;

    // 3. Upsert в Supabase
    const user = await upsertUser({
      github_id:       ghUser.id,
      github_username: ghUser.login,
      display_name:    ghUser.name || ghUser.login,
      email:           primary,
      avatar_url:      ghUser.avatar_url,
    });

    // 4. JWT → редирект на фронтенд
    const token = signToken(user.id);
    return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);

  } catch (err: any) {
    console.error('[GitHub OAuth]', err.message);
    return res.redirect(`${process.env.FRONTEND_URL}?auth_error=github_failed`);
  }
});

// ══════════════════════════════════════════════
//  TWITCH
// ══════════════════════════════════════════════

// GET /api/auth/twitch
// Возвращает URL для редиректа на Twitch
router.get('/twitch', (_req: Request, res: Response) => {
  const params = new URLSearchParams({
    client_id:     process.env.TWITCH_CLIENT_ID!,
    redirect_uri:  `${process.env.API_URL}/api/auth/twitch/callback`,
    response_type: 'code',
    scope:         'user:read:email',
  });
  res.json({ url: `https://id.twitch.tv/oauth2/authorize?${params}` });
});

// GET /api/auth/twitch/callback
// Twitch редиректит сюда после авторизации
router.get('/twitch/callback', async (req: Request, res: Response): Promise<any> => {
  const { code } = req.query;

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}?auth_error=missing_code`);
  }

  try {
    // 1. Обмен code → access_token
    const tokenRes = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id:     process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        code,
        grant_type:    'authorization_code',
        redirect_uri:  `${process.env.API_URL}/api/auth/twitch/callback`,
      },
    });

    const accessToken: string = tokenRes.data.access_token;
    if (!accessToken) throw new Error('No access token from Twitch');

    // 2. Данные пользователя Twitch
    const userRes = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id':   process.env.TWITCH_CLIENT_ID!,
      },
    });

    const twUser = userRes.data.data[0];

    // 3. Upsert в Supabase
    const user = await upsertUser({
      twitch_id:       twUser.id,
      twitch_username: twUser.login,
      display_name:    twUser.display_name,
      email:           twUser.email,
      avatar_url:      twUser.profile_image_url,
    });

    // 4. JWT → редирект на фронтенд
    const token = signToken(user.id);
    return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);

  } catch (err: any) {
    console.error('[Twitch OAuth]', err.message);
    return res.redirect(`${process.env.FRONTEND_URL}?auth_error=twitch_failed`);
  }
});

// ══════════════════════════════════════════════
//  ОБЩИЕ РОУТЫ
// ══════════════════════════════════════════════

// GET /api/auth/me
// Получить текущего пользователя по токену
router.get('/me', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data: user, error } = await supabase
    .from('users')
    .select('id, display_name, github_username, twitch_username, email, avatar_url, bio, xp, level, is_public, created_at, last_login')
    .eq('id', userId)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({ user });
});

// POST /api/auth/logout
// JWT stateless — удаление токена происходит на фронтенде
router.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out' });
});

export default router;
