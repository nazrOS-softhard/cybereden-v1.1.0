import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/knowledge/progress
// Этот роут вызывается фронтендом при скролле статьи или её завершении
router.post('/progress', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  // Фронтенд шлет метаданные статьи из файла (md/mdx) и текущий процент
  const { title, type, category, max_xp, slug, newProgress } = req.body;

  try {
    // 1. Авто-регистрация статьи: если её нет в БД, она добавится сама
    const { data: item, error: itemErr } = await supabase
      .from('knowledge_items')
      .upsert({ title, type, category, max_xp, slug }, { onConflict: 'slug' })
      .select()
      .single();

    if (itemErr || !item) throw new Error('Ошибка синхронизации статьи');

    // 2. Получаем предыдущий прогресс
    const { data: currentProgress } = await supabase
      .from('user_knowledge_progress')
      .select('progress')
      .eq('user_id', userId)
      .eq('item_id', item.id)
      .single();

    const oldProgress = currentProgress?.progress || 0;
    if (newProgress <= oldProgress) return res.json({ success: true });

    // 3. Высчитываем разницу ПХ (сколько добавить за этот «скачок» прогресса)
    const xpToReward = Math.floor(item.max_xp * (newProgress / 100)) - Math.floor(item.max_xp * (oldProgress / 100));

    // 4. Сохраняем прогресс пользователя
    await supabase.from('user_knowledge_progress').upsert({
      user_id: userId,
      item_id: item.id,
      progress: newProgress,
      updated_at: new Date().toISOString()
    });

    // 5. Обновляем общий баланс опыта в таблице users и пишем в логи
    if (xpToReward > 0) {
      const { data: user } = await supabase.from('users').select('xp').eq('id', userId).single();
      await supabase.from('users').update({ xp: (user?.xp || 0) + xpToReward }).eq('id', userId);
      await supabase.from('xp_logs').insert({ 
        user_id: userId, 
        amount: xpToReward, 
        reason: `Прогресс прочтения "${item.title}" (${newProgress}%)` 
      });
    }

    res.json({ success: true, earnedXp: xpToReward });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
