import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// ─── GET /api/knowledge/progress — прогресс текущего юзера ───────────────────
router.get('/progress', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data, error } = await supabase
    .from('user_knowledge_progress')
    .select(`
      id,
      progress,
      updated_at,
      knowledge_items (
        id, title, type, category, max_xp, slug
      )
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const items = (data || []).map((row: any) => {
    const item = row.knowledge_items;
    const pct  = Math.min(100, Math.max(0, row.progress));
    // ПХ начисляется пропорционально прогрессу
    const earnedXp = Math.round((item.max_xp * pct) / 100);
    return {
      id:         row.id,
      item_id:    item.id,
      title:      item.title,
      type:       item.type,
      category:   item.category,
      max_xp:     item.max_xp,
      slug:       item.slug,
      progress:   pct,
      earned_xp:  earnedXp,
      updated_at: row.updated_at,
    };
  });

  return res.json({ items });
});

// ─── POST /api/knowledge/progress — обновить прогресс ────────────────────────
// Body: { slug: string, progress: number (0-100) }
router.post('/progress', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { slug, progress } = req.body;

  if (!slug || progress === undefined) {
    return res.status(400).json({ error: 'slug and progress are required' });
  }

  const newProgress = Math.min(100, Math.max(0, Number(progress)));

  // Находим knowledge item
  const { data: item, error: itemErr } = await supabase
    .from('knowledge_items')
    .select('id, max_xp, type')
    .eq('slug', slug)
    .single();

  if (itemErr || !item) {
    return res.status(404).json({ error: 'Knowledge item not found' });
  }

  // Upsert прогресса
  const { data: existing } = await supabase
    .from('user_knowledge_progress')
    .select('id, progress')
    .eq('user_id', userId)
    .eq('item_id', item.id)
    .single();

  if (existing) {
    // Обновляем только если прогресс вырос
    if (newProgress <= existing.progress) {
      return res.json({ success: true, progress: existing.progress, xp_delta: 0 });
    }

    const oldXp = Math.round((item.max_xp * existing.progress) / 100);
    const newXp = Math.round((item.max_xp * newProgress) / 100);
    const delta = newXp - oldXp;

    await supabase
      .from('user_knowledge_progress')
      .update({ progress: newProgress, updated_at: new Date().toISOString() })
      .eq('id', existing.id);

    // Начисляем разницу в ПХ
    if (delta > 0) {
      await supabase.from('xp_logs').insert({
        user_id: userId, amount: delta,
        reason: `Прогресс "${slug}": ${existing.progress}% → ${newProgress}%`,
      });
      await supabase.rpc('increment_user_xp', { user_id_param: userId, xp_amount: delta })
        .then(() => {}) // Если функции нет — просто обновляем вручную
        .catch(async () => {
          const { data: u } = await supabase.from('users').select('xp').eq('id', userId).single();
          if (u) await supabase.from('users').update({ xp: u.xp + delta }).eq('id', userId);
        });
    }

    return res.json({ success: true, progress: newProgress, xp_delta: delta });
  } else {
    // Создаём запись
    await supabase.from('user_knowledge_progress').insert({
      user_id: userId, item_id: item.id, progress: newProgress,
    });

    const earnedXp = Math.round((item.max_xp * newProgress) / 100);
    if (earnedXp > 0) {
      await supabase.from('xp_logs').insert({
        user_id: userId, amount: earnedXp,
        reason: `Начало изучения "${slug}" (${newProgress}%)`,
      });
      const { data: u } = await supabase.from('users').select('xp').eq('id', userId).single();
      if (u) await supabase.from('users').update({ xp: u.xp + earnedXp }).eq('id', userId);
    }

    return res.json({ success: true, progress: newProgress, xp_delta: earnedXp });
  }
});

// ─── GET /api/knowledge/items — список всех материалов журнала ────────────────
router.get('/items', async (_req: Request, res: Response): Promise<any> => {
  const { data, error } = await supabase
    .from('knowledge_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ items: data || [] });
});

export default router;
