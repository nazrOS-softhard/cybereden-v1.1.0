
import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';

const router = Router();

// ─── POST /api/market/purchase — создать заказ (вызывается Telegram-ботом) ────
// Telegram бот отправляет сюда данные после оплаты Stars
router.post('/purchase', async (req: Request, res: Response): Promise<any> => {
  // Проверяем ключ бота
  const botSecret = req.headers['x-bot-secret'];
  if (botSecret !== process.env.TELEGRAM_BOT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { telegram_id, cyber_user_id, product_id, unique_code, delivery_address } = req.body;

  if (!cyber_user_id || !product_id || !unique_code) {
    return res.status(400).json({ error: 'cyber_user_id, product_id, unique_code required' });
  }

  // Проверяем что юзер существует
  const { data: user, error: userErr } = await supabase
    .from('users')
    .select('id, xp')
    .eq('id', cyber_user_id)
    .single();

  if (userErr || !user) {
    return res.status(404).json({ error: 'CyberEden user not found' });
  }

  // Создаём заказ
  const { data: purchase, error } = await supabase
    .from('purchases')
    .insert({
      user_id:          cyber_user_id,
      telegram_id:      String(telegram_id || ''),
      unique_code,
      product_id,
      delivery_address: delivery_address || null,
      status:           'pending',
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Этот unique_code уже используется' });
    }
    return res.status(500).json({ error: error.message });
  }

  // Если это киберваучер — ставим is_investor=true
  if (product_id === 'cybervaucher_nazrOS') {
    await supabase
      .from('users')
      .update({ is_investor: true })
      .eq('id', cyber_user_id);
  }

  return res.status(201).json({
    success: true,
    purchase_id: purchase.id,
    unique_code,
    message: 'Заказ создан. Статус: pending. После доставки обнови статус через /api/inventory/deliver',
  });
});

export default router;
