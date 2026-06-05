import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// ─── GET /api/profile — профиль + знания ─────────────────────────────────────
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  try {
    const { data: user, error: userErr } = await supabase
      .from('users').select('*').eq('id', userId).single();

    if (userErr || !user) return res.status(404).json({ error: 'Пользователь не найден' });

    const { data: progressData } = await supabase
      .from('user_knowledge_progress')
      .select(`progress, knowledge_items ( id, title, type, category, max_xp, slug )`)
      .eq('user_id', userId);

    const knowledge = (progressData || []).map((p: any) => {
      const item = p.knowledge_items;
      return {
        id: item.id, title: item.title, type: item.type,
        category: item.category, slug: item.slug,
        progress: p.progress,
        xp: Math.floor(item.max_xp * (p.progress / 100)),
        max_xp: item.max_xp,
      };
    });

    return res.json({ user, knowledge });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── PATCH /api/profile — обновить профиль ────────────────────────────────────
router.patch('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { display_name, bio, is_public } = req.body;

  const updates: Record<string, any> = {};
  if (display_name !== undefined) updates.display_name = String(display_name).slice(0, 30).trim();
  if (bio          !== undefined) updates.bio          = String(bio).slice(0, 500);
  if (is_public    !== undefined) updates.is_public    = Boolean(is_public);

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Нет полей для обновления' });
  }

  const { data: user, error } = await supabase
    .from('users').update(updates).eq('id', userId).select().single();

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ success: true, user });
});

// ─── GET /api/profile/nx-code — NX код инвестора ─────────────────────────────
// Возвращает unique_code из purchases для отображения под аватаркой
router.get('/nx-code', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data: purchase, error } = await supabase
    .from('purchases')
    .select('unique_code, status, created_at')
    .eq('user_id', userId)
    .eq('product_id', 'cybervaucher_nazrOS')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !purchase) {
    return res.json({ nx_code: null });
  }

  return res.json({
    nx_code: purchase.unique_code,
    status:  purchase.status,
  });
});

export default router;
