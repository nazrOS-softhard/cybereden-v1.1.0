
import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// ─── GET /api/users — публичный список киберов для Дашборда ──────────────────
// Доступен всем (авторизованным и нет)
router.get('/', async (_req: Request, res: Response): Promise<any> => {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, display_name, github_username, twitch_username, avatar_url, xp, level, is_public, last_login, created_at')
    .eq('is_public', true)
    .order('xp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  // Онлайн = last_login в последние 30 минут
  const now = Date.now();
  const withStatus = (users || []).map(u => ({
    ...u,
    is_online: u.last_login
      ? (now - new Date(u.last_login).getTime()) < 30 * 60 * 1000
      : false,
  }));

  return res.json({ users: withStatus });
});

// ─── GET /api/users/:id — публичный профиль конкретного кибера ───────────────
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const { data: user, error } = await supabase
    .from('users')
    .select('id, display_name, github_username, twitch_username, avatar_url, xp, level, is_public, bio, created_at, last_login')
    .eq('id', id)
    .single();

  if (error || !user) return res.status(404).json({ error: 'Кибер не найден' });
  if (!user.is_public) return res.status(403).json({ error: 'Профиль скрыт' });

  // Публичные активы кибера
  const { data: assets } = await supabase
    .from('assets')
    .select('id, file_name, file_type, file_size, url, created_at')
    .eq('user_id', id)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  return res.json({ user, assets: assets || [] });
});

export default router;
