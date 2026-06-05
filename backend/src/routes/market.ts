import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';

const router = Router();

// ─── GET /api/market/purchase-status — проверить есть ли уже покупка ─────────
// Вызывается Telegram-ботом перед отправкой инвойса
router.get('/purchase-status', async (req: Request, res: Response): Promise<any> => {
  const botSecret = req.headers['x-bot-secret'];
  if (botSecret !== process.env.TELEGRAM_BOT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { cyber_user_id } = req.query as Record<string, string>;
  if (!cyber_user_id) return res.status(400).json({ error: 'cyber_user_id required' });

  const { data, error } = await supabase
    .from('purchases')
    .select('unique_code, status, created_at')
    .eq('user_id', cyber_user_id)
    .eq('product_id', 'cybervaucher_nazrOS')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });

  return res.json({
    has_purchase: !!data,
    nx_code:      data?.unique_code ?? null,
    status:       data?.status ?? null,
  });
});

// ─── POST /api/market/purchase — создать заказ (Telegram-бот) ────────────────
router.post('/purchase', async (req: Request, res: Response): Promise<any> => {
  const botSecret = req.headers['x-bot-secret'];
  if (botSecret !== process.env.TELEGRAM_BOT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { telegram_id, cyber_user_id, product_id, unique_code, delivery_address } = req.body;

  if (!cyber_user_id || !product_id || !unique_code) {
    return res.status(400).json({ error: 'cyber_user_id, product_id, unique_code required' });
  }

  // Проверяем что юзер существует
  const { data: user } = await supabase
    .from('users').select('id, xp').eq('id', cyber_user_id).single();

  if (!user) return res.status(404).json({ error: 'CyberEden user not found' });

  // Проверяем на дубликат
  const { data: existing } = await supabase
    .from('purchases')
    .select('unique_code')
    .eq('user_id', cyber_user_id)
    .eq('product_id', 'cybervaucher_nazrOS')
    .maybeSingle();

  if (existing) {
    return res.status(409).json({
      error:    'Already purchased',
      nx_code:  existing.unique_code,
    });
  }

  // Создаём заказ
  const { data: purchase, error } = await supabase
    .from('purchases')
    .insert({
      user_id:          cyber_user_id,
      telegram_id:      String(telegram_id || ''),
      unique_code,
      product_id:       'cybervaucher_nazrOS',
      delivery_address: delivery_address || null,
      status:           'pending',
    })
    .select().single();

  if (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Already purchased' });
    }
    return res.status(500).json({ error: error.message });
  }

  // Помечаем юзера как инвестора
  await supabase.from('users').update({ is_investor: true }).eq('id', cyber_user_id);

  return res.status(201).json({
    success:     true,
    purchase_id: purchase.id,
    unique_code,
  });
});

export default router;
