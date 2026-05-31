
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ShoppingBag, Search, Monitor, Code2 } from "lucide-react";
import { apiGet } from "@/lib/auth";

const FILTERS = ["ВСЕ", "УСТРОЙСТВА", "СОФТ"] as const;

interface InventoryItem {
  id: string;
  product_id: string;
  product_name: string;
  product_type: string;   // 'device' | 'software'
  tier: string;           // S, A, B, C
  unique_code: string;
  status: string;
  acquired_at: string;
}

// Маппинг product_id → метаданные
const PRODUCT_META: Record<string, { name: string; type: string; tier: string }> = {
  cybervaucher_nazrOS: { name: "КИБЕРВАУЧЕР",    type: "device",   tier: "S" },
  "cloN-001":          { name: "cloN-001",        type: "software", tier: "S" },
  "rostN-001":         { name: "rostN-001",       type: "software", tier: "A" },
  "piN-001":           { name: "piN-001",         type: "device",   tier: "B" },
  "visioN-001":        { name: "visioN-001",      type: "device",   tier: "S" },
  "blaN-001":          { name: "blaN-001",        type: "device",   tier: "A" },
  "biohN-001":         { name: "biohN-001",       type: "device",   tier: "B" },
};

const TIER_COLORS: Record<string, string> = {
  S: "border-neon-acid text-neon-acid",
  A: "border-neon-violet text-neon-violet",
  B: "border-neon-cyan text-neon-cyan",
  C: "border-border text-muted-foreground",
};

export function InventoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items,   setItems]   = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter,  setFilter]  = useState<(typeof FILTERS)[number]>("ВСЕ");
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    apiGet("/api/inventory")
      .then(r => r.ok ? r.json() : { items: [] })
      .then(d => setItems(d.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open]);

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

            {/* Header */}
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

            {/* Filters */}
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

            {/* Grid */}
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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filtered.map(item => {
                    const tierCls = TIER_COLORS[item.tier] || TIER_COLORS.C;
                    return (
                      <div key={item.id}
                        className="relative p-4 border border-border bg-background/40 hover:neon-border transition group">
                        {/* Tier badge */}
                        <div className={`absolute top-2 right-2 w-7 h-7 border flex items-center justify-center font-display text-xs ${tierCls}`}>
                          {item.tier}
                        </div>
                        {/* Type icon */}
                        <div className="mb-2 mt-1">
                          {item.product_type === "device"
                            ? <Monitor size={20} className="text-muted-foreground" />
                            : <Code2 size={20} className="text-muted-foreground" />
                          }
                        </div>
                        <div className="font-display text-sm pr-8 group-hover:neon-text-cyan transition">
                          {item.product_name}
                        </div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {item.product_type === "device" ? "Устройство" : "Софт"}
                        </div>
                        {item.unique_code && (
                          <div className="mt-2 font-mono text-[9px] text-muted-foreground/60 truncate">
                            #{item.unique_code}
                          </div>
                        )}
                        <div className="mt-1 font-mono text-[9px] text-muted-foreground/50">
                          {new Date(item.acquired_at).toLocaleDateString("ru-RU")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-border font-mono text-xs text-muted-foreground">
              {filtered.length} предметов
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
