import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';

const router = Router();

// ─── GET /api/market/purchase/check/:userId — проверка существования заказа ────
router.get('/check/:userId', async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  const botSecret = req.headers['x-bot-secret'];

  // Проверка ключа
  if (botSecret !== process.env.TELEGRAM_BOT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { data, error } = await supabase
    .from('purchases')
    .select('unique_code')
    .eq('user_id', userId)
    .single();

  if (data) {
    return res.status(200).json({ unique_code: data.unique_code });
  }
  return res.status(404).json({ error: 'Not found' });
});

// ─── POST /api/market/purchase — создать заказ ────
router.post('/purchase', async (req: Request, res: Response): Promise<any> => {
  const botSecret = req.headers['x-bot-secret'];
  if (botSecret !== process.env.TELEGRAM_BOT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { telegram_id, cyber_user_id, product_id, unique_code, delivery_address } = req.body;

  if (!cyber_user_id || !product_id || !unique_code) {
    return res.status(400).json({ error: 'cyber_user_id, product_id, unique_code required' });
  }

  const { data: user, error: userErr } = await supabase
    .from('users')
    .select('id')
    .eq('id', cyber_user_id)
    .single();

  if (userErr || !user) {
    return res.status(404).json({ error: 'CyberEden user not found' });
  }

  const { data: existingPurchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', cyber_user_id)
    .eq('product_id', product_id)
    .maybeSingle();

  if (existingPurchase) {
    return res.status(409).json({ error: 'Этот продукт уже был приобретен ранее' });
  }

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
    return res.status(500).json({ error: error.message });
  }

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
    message: 'Заказ создан.',
  });
});

export default router;
