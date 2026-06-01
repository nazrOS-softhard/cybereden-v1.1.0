import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// ПХ за тип контента (100% = max_xp)
const TYPE_MAX_XP: Record<string, number> = {
  'Публикация': 29,
  'Интервью':   27,
  'Алгоритм':   53,
};

// ── Получить или создать knowledge_item по slug ────────────────────────────────
async function findOrCreateItem(data: {
  slug: string; title: string; type: string; category: string;
}) {
  // Ищем существующий
  const { data: existing } = await supabase
    .from('knowledge_items')
    .select('*')
    .eq('slug', data.slug)
    .single();

  if (existing) return existing;

  // Создаём новый
  const max_xp = TYPE_MAX_XP[data.type] ?? 29;
  const { data: created, error } = await supabase
    .from('knowledge_items')
    .insert({ slug: data.slug, title: data.title, type: data.type, category: data.category, max_xp })
    .select()
    .single();

  if (error) throw error;
  return created;
}

// ── Обновить ПХ пользователя ──────────────────────────────────────────────────
async function awardXp(userId: string, delta: number, reason: string) {
  if (delta <= 0) return;
  await supabase.from('xp_logs').insert({ user_id: userId, amount: delta, reason });
  const { data: u } = await supabase.from('users').select('xp').eq('id', userId).single();
  if (u) await supabase.from('users').update({ xp: (u.xp || 0) + delta }).eq('id', userId);
}

// ── GET /api/knowledge/progress — прогресс текущего юзера ────────────────────
router.get('/progress', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data, error } = await supabase
    .from('user_knowledge_progress')
    .select(`
      id, progress, updated_at,
      knowledge_items ( id, title, type, category, max_xp, slug )
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const items = (data || []).map((row: any) => {
    const item     = row.knowledge_items;
    const pct      = Math.min(100, Math.max(0, row.progress));
    const earnedXp = Math.round((item.max_xp * pct) / 100);
    return {
      id: row.id, item_id: item.id,
      title: item.title, type: item.type,
      category: item.category, max_xp: item.max_xp,
      slug: item.slug, progress: pct,
      earned_xp: earnedXp, updated_at: row.updated_at,
    };
  });

  return res.json({ items });
});

// ── POST /api/knowledge/progress — создать/обновить прогресс ─────────────────
// Body: { slug, progress (0-100), title, type, category }
// Вызывается из журнала при открытии и при скролле
router.post('/progress', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { slug, progress, title, type, category } = req.body;

  if (!slug || progress === undefined) {
    return res.status(400).json({ error: 'slug and progress are required' });
  }

  const newProgress = Math.min(100, Math.max(0, Math.round(Number(progress))));

  try {
    // Находим или создаём knowledge_item
    const item = await findOrCreateItem({
      slug,
      title:    title    || slug,
      type:     type     || 'Публикация',
      category: category || 'general',
    });

    // Проверяем текущий прогресс юзера
    const { data: existing } = await supabase
      .from('user_knowledge_progress')
      .select('id, progress')
      .eq('user_id', userId)
      .eq('item_id', item.id)
      .single();

    if (existing) {
      // Обновляем только если прогресс вырос
      if (newProgress <= existing.progress) {
        const earnedXp = Math.round((item.max_xp * existing.progress) / 100);
        return res.json({ success: true, progress: existing.progress, xp_delta: 0, earned_xp: earnedXp });
      }

      const oldXp   = Math.round((item.max_xp * existing.progress) / 100);
      const newXp   = Math.round((item.max_xp * newProgress) / 100);
      const delta   = newXp - oldXp;

      await supabase
        .from('user_knowledge_progress')
        .update({ progress: newProgress, updated_at: new Date().toISOString() })
        .eq('id', existing.id);

      await awardXp(userId, delta, `Прогресс "${title || slug}": ${existing.progress}% → ${newProgress}%`);

      return res.json({ success: true, progress: newProgress, xp_delta: delta, earned_xp: newXp });

    } else {
      // Первый раз открыл — создаём запись
      await supabase.from('user_knowledge_progress').insert({
        user_id: userId, item_id: item.id, progress: newProgress,
      });

      const earnedXp = Math.round((item.max_xp * newProgress) / 100);
      await awardXp(userId, earnedXp, `Начало изучения "${title || slug}" (${newProgress}%)`);

      return res.status(201).json({ success: true, progress: newProgress, xp_delta: earnedXp, earned_xp: earnedXp });
    }
  } catch (err: any) {
    console.error('[Knowledge Progress]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ── GET /api/knowledge/items — все материалы (для журнала) ───────────────────
router.get('/items', async (_req: Request, res: Response): Promise<any> => {
  const { data, error } = await supabase
    .from('knowledge_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ items: data || [] });
});

export default router;
