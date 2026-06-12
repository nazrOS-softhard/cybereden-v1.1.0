import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ShoppingBag, Search, Monitor, Code2, Package, CheckCircle } from "lucide-react";
import { apiGet, apiPost } from "@/lib/auth";

const FILTERS = ["ВСЕ", "УСТРОЙСТВА", "СОФТ"] as const;

interface InventoryItem {
  id: string;
  product_id: string;
  product_name: string;
  product_type: string;
  tier: string;
  unique_code: string;
  status: string;
  acquired_at: string;
}

const TIER_COLORS: Record<string, string> = {
  S: "border-neon-acid text-neon-acid",
  A: "border-neon-violet text-neon-violet",
  B: "border-neon-cyan text-neon-cyan",
  C: "border-border text-muted-foreground",
};

// ── Карточка с подтверждением получения ──────────────────────────────────────
function InventoryCard({ item, onDeliveryConfirmed }: {
  item: InventoryItem;
  onDeliveryConfirmed: (id: string) => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const tierCls = TIER_COLORS[item.tier] || TIER_COLORS.C;
  const isPending   = item.status === "pending" || item.status === "shipped";
  const isDelivered = item.status === "delivered";

  const statusLabel: Record<string, { label: string; color: string }> = {
    pending:   { label: "Ожидает отправки", color: "text-yellow-400" },
    shipped:   { label: "В пути",            color: "neon-text-cyan"  },
    delivered: { label: "Получено",          color: "neon-text-acid"  },
  };

  const st = statusLabel[item.status] ?? { label: item.status, color: "text-muted-foreground" };

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      // Отправляем подтверждение получения
      await apiPost("/api/inventory/confirm-receipt", { purchase_id: item.id });
      onDeliveryConfirmed(item.id);
    } catch { /* ignore */ }
    finally { setConfirming(false); }
  };

  return (
    <div className={`p-4 border transition ${isDelivered ? "border-neon-acid/30 bg-neon-acid/5" : "border-border bg-background/40"}`}>
      {/* Шапка */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {item.product_type === "device"
            ? <Monitor size={16} className="text-muted-foreground" />
            : <Code2 size={16} className="text-muted-foreground" />
          }
          <div className="font-display text-sm">{item.product_name}</div>
        </div>
        <div className={`w-7 h-7 border flex items-center justify-center font-display text-xs ${tierCls}`}>
          {item.tier}
        </div>
      </div>

      {/* Статус + NX-код */}
      <div className="space-y-1 mb-3">
        <div className={`font-mono text-xs ${st.color}`}>
          {isDelivered && <CheckCircle size={11} className="inline mr-1" />}
          {st.label}
        </div>
        {item.unique_code && (
          <div className="font-mono text-[10px] text-muted-foreground">
            #{item.unique_code}
          </div>
        )}
        <div className="font-mono text-[10px] text-muted-foreground/50">
          {new Date(item.acquired_at).toLocaleDateString("ru-RU")}
        </div>
      </div>

      {/* Кнопка подтверждения получения */}
      {isPending && (
        <button
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full flex items-center justify-center gap-2 py-2 border border-neon-acid/40 bg-neon-acid/10 hover:bg-neon-acid/20 font-mono text-xs neon-text-acid uppercase tracking-widest transition disabled:opacity-50"
        >
          <Package size={12} />
          {confirming ? "Подтверждение…" : "Я получил!"}
        </button>
      )}
    </div>
  );
}

export function InventoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items,   setItems]   = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter,  setFilter]  = useState<(typeof FILTERS)[number]>("ВСЕ");
  const [search,  setSearch]  = useState("");

 const loadItems = async () => {
  setLoading(true);
  try {
    const res = await apiGet("/api/inventory/all");
    if (!res.ok) {
      console.error("Failed to load inventory:", res.status, await res.text());
      setItems([]);
      return;
    }
    const data = await res.json();
    setItems(data.items || []);
  } catch (e) {
    console.error("Error loading inventory:", e);
    setItems([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (open) loadItems();
  }, [open]);

  const handleDeliveryConfirmed = (id: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, status: "delivered" } : it));
  };

  const filtered = items.filter(i => {
    const matchFilter = filter === "ВСЕ"
      || (filter === "УСТРОЙСТВА" && i.product_type === "device")
      || (filter === "СОФТ" && i.product_type === "software");
    const matchSearch = i.product_name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
            className="w-full max-w-4xl max-h-[85vh] bg-surface border border-border overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}>

            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest neon-text-cyan">Кибла кибера</div>
                <h2 className="font-display text-2xl neon-text-violet flex items-center gap-2">
                  <ShoppingBag size={20} /> Инвентарь
                </h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 transition">
                <X size={24} className="neon-text-cyan" />
              </button>
            </div>

            <div className="px-6 py-3 border-b border-border space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <input type="text" placeholder="Поиск по инвентарю…" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-background/40 border border-border font-mono text-sm focus:border-neon-cyan outline-none transition" />
              </div>
              <div className="flex gap-2">
                {FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-widest border transition ${
                      f === filter ? "border-neon-cyan neon-text-cyan" : "border-border text-muted-foreground hover:text-foreground"
                    }`}>
                    {f === "УСТРОЙСТВА" && <Monitor size={12} />}
                    {f === "СОФТ" && <Code2 size={12} />}
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="text-center font-mono text-xs neon-text-cyan animate-pulse py-10">Загрузка инвентаря…</div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={40} className="mx-auto opacity-20 mb-4" />
                  <div className="font-display text-xl neon-text-violet mb-2">Инвентарь пуст</div>
                  <p className="font-mono text-xs text-muted-foreground">
                    Приобрети устройства и софт в{" "}
                    <a href="/market" className="neon-text-acid hover:underline">Маркете</a>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(item => (
                    <InventoryCard
                      key={item.id}
                      item={item}
                      onDeliveryConfirmed={handleDeliveryConfirmed}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-border font-mono text-xs text-muted-foreground">
              {filtered.length} предметов
              {items.some(i => i.status === "pending" || i.status === "shipped") && (
                <span className="ml-3 neon-text-acid">
                  · Нажми «Я получил!» когда физически получишь устройство
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
