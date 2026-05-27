import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/profile
// Возвращает профиль пользователя и динамический прогресс по всем статьям
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  try {
    // 1. Получаем базовые данные пользователя
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userErr || !user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // 2. Получаем прогресс пользователя с «джойном» метаданных статей
    const { data: progressData, error: progErr } = await supabase
      .from('user_knowledge_progress')
      .select(`
        progress,
        knowledge_items (
          id,
          title,
          type,
          category,
          max_xp,
          slug
        )
      `)
      .eq('user_id', userId);

    if (progErr) {
      return res.status(500).json({ error: 'Ошибка получения прогресса' });
    }

    // 3. Формируем итоговый объект для фронтенда
    const knowledge = (progressData || []).map((p: any) => {
      const item = p.knowledge_items;
      return {
        id: item.id,
        title: item.title,
        type: item.type,
        category: item.category,
        slug: item.slug,
        progress: p.progress,
        // Динамически вычисляем текущий XP на основе прогресса
        xp: Math.floor(item.max_xp * (p.progress / 100)),
        max_xp: item.max_xp
      };
    });

    // 4. Отправляем всё одним ответом
    res.json({ 
      user, 
      knowledge 
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
