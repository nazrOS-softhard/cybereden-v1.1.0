import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const PRODUCT_META: Record<string, { name: string; type: string; tier: string }> = {
  cybervaucher_nazrOS: { name: "КИБЕРВАУЧЕР nazrOS", type: "device",   tier: "S" },
  "clon":              { name: "cloN",               type: "device",   tier: "S" },
  "rostn":             { name: "rostN",              type: "device",   tier: "A" },
  "pin":               { name: "piN",                type: "device",   tier: "B" },
  "visionN":           { name: "взглядН",            type: "device",   tier: "S" },
  "blan":              { name: "blaN",               type: "device",   tier: "A" },
  "biohn":             { name: "biohN",              type: "device",   tier: "B" },
  "stranno":           { name: "страННо",            type: "software", tier: "A" },
  "kefirno":           { name: "кефирННо",           type: "software", tier: "B" },
};

// ─── GET /api/inventory — только доставленные (для совместимости) ────────────
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { data: purchases, error } = await supabase
    .from('purchases')
    .select('id, product_id, unique_code, status, created_at, updated_at')
    .eq('user_id', userId)
    .eq('status', 'delivered')
    .order('created_at', { ascending: false });

  if (error) {
    if (error.code === '42P01') return res.json({ items: [] });
    return res.status(500).json({ error: error.message });
  }

  const items = (purchases || []).map(p => {
    const meta = PRODUCT_META[p.product_id] || { name: p.product_id, type: "device", tier: "C" };
    return {
      id: p.id, product_id: p.product_id, product_name: meta.name,
      product_type: meta.type, tier: meta.tier, unique_code: p.unique_code,
      status: p.status, acquired_at: p.created_at,
    };
  });

  return res.json({ items });
});

// ─── GET /api/inventory/all — ВСЕ покупки (pending/shipped/delivered) ────────
router.get('/all', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { data: purchases, error } = await supabase
    .from('purchases')
    .select('id, product_id, unique_code, status, created_at, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    if (error.code === '42P01') return res.json({ items: [] });
    return res.status(500).json({ error: error.message });
  }

  const items = (purchases || []).map(p => {
    const meta = PRODUCT_META[p.product_id] || { name: p.product_id, type: "device", tier: "C" };
    return {
      id: p.id, product_id: p.product_id, product_name: meta.name,
      product_type: meta.type, tier: meta.tier, unique_code: p.unique_code,
      status: p.status, acquired_at: p.created_at,
    };
  });

  return res.json({ items });
});

// ─── POST /api/inventory/confirm-receipt — юзер подтверждает получение ───────
// Body: { purchase_id: string }
router.post('/confirm-receipt', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { purchase_id } = req.body;

  if (!purchase_id) return res.status(400).json({ error: 'purchase_id required' });

  // Проверяем что покупка принадлежит юзеру
  const { data: purchase, error: findErr } = await supabase
    .from('purchases')
    .select('id, user_id, product_id, status')
    .eq('id', purchase_id)
    .eq('user_id', userId)
    .single();

  if (findErr || !purchase) {
    return res.status(404).json({ error: 'Покупка не найдена' });
  }

  if (purchase.status === 'delivered') {
    return res.json({ success: true, already: true });
  }

  // Обновляем статус на delivered
  const { error: updateErr } = await supabase
    .from('purchases')
    .update({ status: 'delivered', updated_at: new Date().toISOString() })
    .eq('id', purchase_id);

  if (updateErr) return res.status(500).json({ error: updateErr.message });

  // Бонусные ПХ за подтверждение получения (опционально)
  const BONUS_XP = 50;
  await supabase.from('xp_logs').insert({
    user_id: userId, amount: BONUS_XP,
    reason: `Подтверждение получения: ${PRODUCT_META[purchase.product_id]?.name || purchase.product_id}`,
  });
  const { data: u } = await supabase.from('users').select('xp').eq('id', userId).single();
  if (u) await supabase.from('users').update({ xp: u.xp + BONUS_XP }).eq('id', userId);

  return res.json({ success: true, xp_awarded: BONUS_XP });
});

// ─── POST /api/inventory/deliver — admin: пометить как "в пути" ──────────────
router.post('/deliver', async (req: Request, res: Response): Promise<any> => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });

  const { unique_code, status } = req.body;
  if (!unique_code) return res.status(400).json({ error: 'unique_code required' });

  const newStatus = status === 'shipped' ? 'shipped' : 'delivered';

  const { data, error } = await supabase
    .from('purchases')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('unique_code', unique_code)
    .select('id, user_id, product_id, status')
    .single();

  if (error || !data) return res.status(404).json({ error: 'Purchase not found' });
  return res.json({ success: true, purchase: data });
});

export default router;
