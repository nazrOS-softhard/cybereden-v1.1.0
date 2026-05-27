import { Router, Request, Response } from 'express';
import { supabase } from '../server';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/profile
// Профиль текущего пользователя (кибла кибера)
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data: user, error } = await supabase
    .from('users')
    .select('id, display_name, github_username, twitch_username, email, avatar_url, bio, xp, level, is_public, created_at')
    .eq('id', userId)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: 'Профиль не найден' });
  }

  // Количество активов
  const { count } = await supabase
    .from('assets')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  return res.json({
    user: {
      ...user,
      asset_count: count ?? 0,
    },
  });
});

// PATCH /api/profile
// Обновить профиль
// Body: { display_name?, bio?, is_public? }
router.patch('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { display_name, bio, is_public } = req.body;

  const updates: Record<string, any> = {};
  if (display_name !== undefined) updates.display_name = String(display_name).slice(0, 50);
  if (bio          !== undefined) updates.bio          = String(bio).slice(0, 500);
  if (is_public    !== undefined) updates.is_public    = Boolean(is_public);

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Нет полей для обновления' });
  }

  const { data: user, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ success: true, user });
});

export default router;
