import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient'; // Твой изолированный клиент
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/progress', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  // Фронтенд шлет данные статьи (можно брать из метаданных .md файла)
  const { title, type, category, max_xp, slug, newProgress } = req.body;

  try {
    // 1. Автоматический "захват" статьи: upsert (создаст, если нет, или обновит)
    const { data: item } = await supabase
      .from('knowledge_items')
      .upsert({ title, type, category, max_xp, slug }, { onConflict: 'slug' })
      .select().single();

    // 2. Расчет и начисление ПХ (всё автоматизировано!)
    // Высчитываем сколько ПХ добавить за текущий прогресс
    const xpToReward = Math.floor(item.max_xp * (newProgress / 100));

    // 3. Сохраняем в БД
    await supabase.from('user_knowledge_progress').upsert({
      user_id: userId,
      item_id: item.id,
      progress: newProgress
    });

    // 4. Пишем в лог опыта (твоя таблица xp_logs)
    await supabase.from('xp_logs').insert({
      user_id: userId,
      amount: xpToReward,
      reason: `Прогресс прочтения "${title}" до ${newProgress}%`
    });

    res.json({ success: true, earnedXp: xpToReward });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
