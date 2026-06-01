import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';

const router = Router();

// Онлайн = last_login в последние 10 минут (heartbeat каждые 5 мин с фронтенда)
const ONLINE_THRESHOLD_MS = 10 * 60 * 1000;

// ─── GET /api/users ───────────────────────────────────────────────────────────
router.get('/', async (_req: Request, res: Response): Promise<any> => {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, display_name, github_username, twitch_username, avatar_url, xp, level, is_public, last_login, created_at')
    .eq('is_public', true)
    .order('xp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const now = Date.now();
  const withStatus = (users || []).map(u => ({
    ...u,
    is_online: u.last_login
      ? (now - new Date(u.last_login).getTime()) < ONLINE_THRESHOLD_MS
      : false,
  }));

  return res.json({ users: withStatus });
});

// ─── GET /api/users/:id ───────────────────────────────────────────────────────
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const { data: user, error } = await supabase
    .from('users')
    .select('id, display_name, github_username, twitch_username, avatar_url, xp, level, is_public, bio, created_at, last_login')
    .eq('id', id)
    .single();

  if (error || !user) return res.status(404).json({ error: 'Кибер не найден' });
  if (!user.is_public) return res.status(403).json({ error: 'Профиль скрыт' });

  const { data: assets } = await supabase
    .from('assets')
    .select('id, file_name, file_type, file_size, url, created_at')
    .eq('user_id', id)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  const now = Date.now();
  const is_online = user.last_login
    ? (now - new Date(user.last_login).getTime()) < ONLINE_THRESHOLD_MS
    : false;

  return res.json({ user: { ...user, is_online }, assets: assets || [] });
});

export default router;
