
import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Маппинг product_id → метаданные
const PRODUCT_META: Record<string, { name: string; type: string; tier: string }> = {
  cybervaucher_nazrOS: { name: "КИБЕРВАУЧЕР nazrOS", type: "device",   tier: "S" },
  "cloN-001":          { name: "cloN-001",           type: "software", tier: "S" },
  "rostN-001":         { name: "rostN-001",          type: "software", tier: "A" },
  "piN-001":           { name: "piN-001",            type: "device",   tier: "B" },
  "visioN-001":        { name: "visioN-001",         type: "device",   tier: "S" },
  "blaN-001":          { name: "blaN-001",           type: "device",   tier: "A" },
  "biohN-001":         { name: "biohN-001",          type: "device",   tier: "B" },
};

// ─── GET /api/inventory — инвентарь текущего юзера ───────────────────────────
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data: purchases, error } = await supabase
    .from('purchases')
    .select('id, product_id, unique_code, status, created_at, updated_at')
    .eq('user_id', userId)
    .eq('status', 'delivered')   // Только доставленные попадают в инвентарь
    .order('created_at', { ascending: false });

  if (error) {
    if (error.code === '42P01') return res.json({ items: [] }); // таблица не создана
    return res.status(500).json({ error: error.message });
  }

  const items = (purchases || []).map(p => {
    const meta = PRODUCT_META[p.product_id] || {
      name: p.product_id, type: "device", tier: "C",
    };
    return {
      id:           p.id,
      product_id:   p.product_id,
      product_name: meta.name,
      product_type: meta.type,
      tier:         meta.tier,
      unique_code:  p.unique_code,
      status:       p.status,
      acquired_at:  p.created_at,
    };
  });

  return res.json({ items });
});

// ─── POST /api/inventory/deliver — отметить заказ как доставленный ────────────
// Вызывается вручную администратором или Telegram-ботом после подтверждения доставки
router.post('/deliver', async (req: Request, res: Response): Promise<any> => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { unique_code } = req.body;
  if (!unique_code) return res.status(400).json({ error: 'unique_code required' });

  const { data, error } = await supabase
    .from('purchases')
    .update({ status: 'delivered', updated_at: new Date().toISOString() })
    .eq('unique_code', unique_code)
    .select('id, user_id, product_id')
    .single();

  if (error || !data) return res.status(404).json({ error: 'Purchase not found' });

  return res.json({ success: true, purchase: data });
});

export default router;
