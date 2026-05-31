
import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// ─── Таблица achievements (создай в Supabase если нет) ────────────────────────
// CREATE TABLE IF NOT EXISTS achievements (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//   event_id TEXT NOT NULL,
//   event_title TEXT NOT NULL,
//   event_type TEXT NOT NULL,   -- ТРАНСЛЯЦИИ | ТУРНИРЫ | ХАКАТОНЫ | ДЕПЫ
//   event_date TEXT,
//   xp_awarded INTEGER DEFAULT 0,
//   qr_token TEXT,              -- токен из QR кода
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   UNIQUE(user_id, event_id)   -- нельзя дважды получить одно достижение
// );

// ─── GET /api/achievements — достижения текущего юзера ───────────────────────
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    // Если таблица не существует — возвращаем пустой список
    if (error.code === '42P01') return res.json({ achievements: [] });
    return res.status(500).json({ error: error.message });
  }

  return res.json({ achievements: data || [] });
});

// ─── POST /api/achievements/scan — сканирование QR кода на мероприятии ───────
// QR код содержит: https://cybereden.ru/api/achievements/scan?event_id=e7&token=SECRET&type=ТУРНИРЫ
// Или фронтенд сам вызывает этот endpoint после сканирования
router.post('/scan', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { event_id, token, event_title, event_type, event_date, xp } = req.body;

  if (!event_id || !token) {
    return res.status(400).json({ error: 'event_id and token are required' });
  }

  // Верификация токена: в QR коде записан HMAC(event_id, QR_SECRET)
  // Для простоты используем статический секрет из env
  const QR_SECRET = process.env.QR_SECRET || 'cybereden-qr-secret';
  const crypto = require('crypto');
  const expectedToken = crypto
    .createHmac('sha256', QR_SECRET)
    .update(event_id)
    .digest('hex')
    .slice(0, 16);

  if (token !== expectedToken) {
    return res.status(403).json({ error: 'Недействительный QR-код' });
  }

  const xpAwarded = Number(xp) || 150;  // По умолчанию 150 ПХ за мероприятие

  try {
    // Upsert — повторное сканирование не даёт ПХ дважды
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        user_id:     userId,
        event_id,
        event_title: event_title || `Событие #${event_id}`,
        event_type:  event_type  || 'СОБЫТИЯ',
        event_date:  event_date  || new Date().toLocaleDateString('ru-RU'),
        xp_awarded:  xpAwarded,
        qr_token:    token,
      })
      .select()
      .single();

    if (error) {
      // Unique violation — уже отсканировано
      if (error.code === '23505') {
        return res.status(409).json({
          error:   'Ты уже получил это достижение',
          already: true,
        });
      }
      return res.status(500).json({ error: error.message });
    }

    // Начисляем ПХ
    await supabase.from('xp_logs').insert({
      user_id: userId, amount: xpAwarded,
      reason: `Посещение мероприятия: ${event_title || event_id}`,
    });
    const { data: u } = await supabase.from('users').select('xp').eq('id', userId).single();
    if (u) await supabase.from('users').update({ xp: u.xp + xpAwarded }).eq('id', userId);

    return res.status(201).json({
      success: true,
      achievement: data,
      xp_awarded: xpAwarded,
      message: `🎖 Достижение получено! +${xpAwarded} ПХ`,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/achievements/qr-token/:event_id — получить токен для QR ────────
// Только для администраторов (проверка по фиксированному admin-токену)
router.get('/qr-token/:event_id', async (req: Request, res: Response): Promise<any> => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { event_id } = req.params;
  const QR_SECRET = process.env.QR_SECRET || 'cybereden-qr-secret';
  const crypto    = require('crypto');
  const token     = crypto
    .createHmac('sha256', QR_SECRET)
    .update(event_id)
    .digest('hex')
    .slice(0, 16);

  const qrUrl = `https://cybereden.ru/scan?event_id=${event_id}&token=${token}`;

  return res.json({ event_id, token, qr_url: qrUrl });
});

export default router;
