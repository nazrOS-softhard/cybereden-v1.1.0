import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Стоимости стадий по item_id (должны совпадать с frontend stages.ts)
const STAGE_COSTS: Record<string, Record<number, number>> = {
  clon:    { 1:300,  2:600,  3:900,  4:1200, 5:1500, 6:1800, 7:500  },
  biohn:   { 1:500,  2:1000, 3:1500, 4:2000, 5:2500, 6:3000, 7:3500 },
  blan:    { 1:400,  2:800,  3:1200, 4:1600, 5:2000, 6:2400, 7:2800 },
  pin:     { 1:350,  2:700,  3:1050, 4:1400, 5:1750, 6:2100, 7:2450 },
  visionN: { 1:450,  2:900,  3:1350, 4:1800, 5:2250, 6:2700, 7:3150 },
  rostn: { 1:130,  2:900,  3:1350, 4:1800, 5:2250, 6:2700, 7:3150 },
  stranno: { 1:200,  2:400,  3:600,  4:800,  5:1000, 6:1200         },
  kefirno: { 1:150,  2:300,  3:450,  4:600,  5:750                  },
};

// ─── GET /api/market/purchase-status ─────────────────────────────────────────
router.get('/purchase-status', async (req: Request, res: Response): Promise<any> => {
  const botSecret = req.headers['x-bot-secret'];
  if (botSecret !== process.env.TELEGRAM_BOT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { cyber_user_id } = req.query as Record<string, string>;
  if (!cyber_user_id) return res.status(400).json({ error: 'cyber_user_id required' });

  const { data } = await supabase
    .from('purchases')
    .select('unique_code, status, created_at')
    .eq('user_id', cyber_user_id)
    .eq('product_id', 'cybervaucher_nazrOS')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return res.json({ has_purchase: !!data, nx_code: data?.unique_code ?? null, status: data?.status ?? null });
});

// ─── POST /api/market/purchase ────────────────────────────────────────────────
router.post('/purchase', async (req: Request, res: Response): Promise<any> => {
  const botSecret = req.headers['x-bot-secret'];
  if (botSecret !== process.env.TELEGRAM_BOT_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { telegram_id, cyber_user_id, product_id, unique_code, delivery_address } = req.body;
  if (!cyber_user_id || !product_id || !unique_code) {
    return res.status(400).json({ error: 'cyber_user_id, product_id, unique_code required' });
  }

  const { data: user } = await supabase.from('users').select('id').eq('id', cyber_user_id).single();
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { data: existing } = await supabase
    .from('purchases').select('unique_code')
    .eq('user_id', cyber_user_id).eq('product_id', 'cybervaucher_nazrOS').maybeSingle();
  if (existing) return res.status(409).json({ error: 'Already purchased', nx_code: existing.unique_code });

  const { data: purchase, error } = await supabase
    .from('purchases')
    .insert({ user_id: cyber_user_id, telegram_id: String(telegram_id || ''), unique_code, product_id: 'cybervaucher_nazrOS', delivery_address: delivery_address || null, status: 'pending' })
    .select().single();

  if (error) return res.status(500).json({ error: error.message });

  await supabase.from('users').update({ is_investor: true }).eq('id', cyber_user_id);
  return res.status(201).json({ success: true, purchase_id: purchase.id, unique_code });
});

// ─── GET /api/market/unlocked-stages — разблокированные стадии юзера ──────────
router.get('/unlocked-stages', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId   = (req as any).userId;
  const { item_id } = req.query as Record<string, string>;

  const query = supabase.from('unlocked_stages').select('item_id, stage_id, px_spent, unlocked_at').eq('user_id', userId);
  if (item_id) query.eq('item_id', item_id);

  const { data, error } = await query;
  if (error) {
    if (error.code === '42P01') return res.json({ stages: [] });
    return res.status(500).json({ error: error.message });
  }
  return res.json({ stages: data || [] });
});

// ─── POST /api/market/unlock-stage — разблокировать стадию за ПХ ─────────────
router.post('/unlock-stage', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { item_id, stage_id } = req.body;

  if (!item_id || !stage_id) return res.status(400).json({ error: 'item_id and stage_id required' });

  // Проверяем стоимость
  const costs     = STAGE_COSTS[item_id];
  const px_cost   = costs?.[stage_id];
  if (px_cost === undefined) return res.status(404).json({ error: 'Stage not found' });

  // Проверяем что предыдущая стадия разблокирована (кроме 1-й)
  if (stage_id > 1) {
    const { data: prevStage } = await supabase
      .from('unlocked_stages')
      .select('id').eq('user_id', userId).eq('item_id', item_id).eq('stage_id', stage_id - 1).single();
    if (!prevStage) return res.status(400).json({ error: 'Необходимо сначала разблокировать предыдущую стадию' });
  }

  // Проверяем что уже не разблокирована
  const { data: already } = await supabase
    .from('unlocked_stages')
    .select('id').eq('user_id', userId).eq('item_id', item_id).eq('stage_id', stage_id).single();
  if (already) return res.status(409).json({ error: 'Стадия уже разблокирована' });

  // Проверяем баланс ПХ
  const { data: user } = await supabase.from('users').select('xp').eq('id', userId).single();
  if (!user || user.xp < px_cost) {
    return res.status(400).json({ error: `Недостаточно ПХ. Нужно ${px_cost}, есть ${user?.xp ?? 0}` });
  }

  // Списываем ПХ и записываем разблокировку
  const newXp = user.xp - px_cost;
  const [, unlockRes] = await Promise.all([
    supabase.from('users').update({ xp: newXp }).eq('id', userId),
    supabase.from('unlocked_stages').insert({ user_id: userId, item_id, stage_id, px_spent: px_cost }).select().single(),
  ]);

  if (unlockRes.error) return res.status(500).json({ error: unlockRes.error.message });

  // Логируем расход ПХ
  await supabase.from('xp_logs').insert({ user_id: userId, amount: -px_cost, reason: `Разблокировка стадии ${stage_id} устройства ${item_id}` });

  return res.status(201).json({ success: true, stage_id, item_id, px_spent: px_cost, remaining_xp: newXp });
});

export default router;
