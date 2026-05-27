
import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient'; // Твой изолированный клиент
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/knowledge/progress
// Автоматически регистрирует статью (если её нет) и обновляет прогресс юзера
router.post('/progress', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { title, type, category, max_xp, slug, newProgress } = req.body;

  try {
    // 1. Автоматический захват: upsert статьи по slug
    const { data: item, error: itemErr } = await supabase
      .from('knowledge_items')
      .upsert({ title, type, category, max_xp, slug }, { onConflict: 'slug' })
      .select()
      .single();

    if (itemErr) throw itemErr;

    // 2. Получаем текущий прогресс
    const { data: currentProgress } = await supabase
      .from('user_knowledge_progress')
      .select('progress')
      .eq('user_id', userId)
      .eq('item_id', item.id)
      .single();

    const oldProgress = currentProgress?.progress || 0;
    if (newProgress <= oldProgress) return res.json({ success: true, message: 'Прогресс актуален' });

    // 3. Расчет дельты ПХ
    const xpToReward = Math.floor(item.max_xp * (newProgress / 100)) - Math.floor(item.max_xp * (oldProgress / 100));

    // 4. Обновление БД
    await supabase.from('user_knowledge_progress').upsert({
      user_id: userId,
      item_id: item.id,
      progress: newProgress,
      updated_at: new Date().toISOString()
    });

    if (xpToReward > 0) {
      const { data: user } = await supabase.from('users').select('xp').eq('id', userId).single();
      await supabase.from('users').update({ xp: (user?.xp || 0) + xpToReward }).eq('id', userId);
      await supabase.from('xp_logs').insert({ user_id: userId, amount: xpToReward, reason: `Прогресс: ${item.title}` });
    }

    res.json({ success: true, earnedXp: xpToReward });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
