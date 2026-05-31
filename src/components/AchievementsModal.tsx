
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Trophy, Search, QrCode } from "lucide-react";
import { apiGet } from "@/lib/auth";

const FILTERS = ["ВСЕ", "ТРАНСЛЯЦИИ", "ТУРНИРЫ", "ХАКАТОНЫ", "ДЕПЫ"] as const;

interface Achievement {
  id: string;
  event_id: string;
  event_title: string;
  event_type: string;
  event_date: string;
  xp_awarded: number;
  created_at: string;
}

export function AchievementsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items,   setItems]   = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter,  setFilter]  = useState<(typeof FILTERS)[number]>("ВСЕ");
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    apiGet("/api/achievements")
      .then(r => r.ok ? r.json() : { achievements: [] })
      .then(d => setItems(d.achievements || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open]);

  const filtered = items.filter(i => {
    const matchFilter = filter === "ВСЕ" || i.event_type.toUpperCase() === filter;
    const matchSearch = i.event_title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalXp = items.reduce((s, i) => s + i.xp_awarded, 0);

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
                  <Trophy size={20} /> Достижения
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-mono text-xs neon-text-acid">+{totalXp} ПХ</div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 transition">
                  <X size={24} className="neon-text-cyan" />
                </button>
              </div>
            </div>

            {/* Search + Filters */}
            <div className="px-6 py-3 border-b border-border space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <input type="text" placeholder="Поиск по достижениям…" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-background/40 border border-border font-mono text-sm focus:border-neon-cyan outline-none transition" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border transition ${
                      f === filter ? "border-neon-cyan neon-text-cyan" : "border-border text-muted-foreground hover:text-foreground"
                    }`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="text-center font-mono text-xs neon-text-cyan animate-pulse py-10">Загрузка достижений…</div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16">
                  <QrCode size={40} className="mx-auto opacity-20 mb-4" />
                  <div className="font-display text-xl neon-text-violet mb-2">Достижений пока нет</div>
                  <p className="font-mono text-xs text-muted-foreground max-w-sm mx-auto">
                    Посети мероприятие CyberEden в оффлайне и отсканируй QR-код — достижение появится здесь автоматически
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-border bg-background/40 hover:neon-border transition">
                      <div className="w-10 h-10 border border-neon-acid/40 bg-neon-acid/10 flex items-center justify-center flex-shrink-0">
                        <Trophy size={18} className="neon-text-acid" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-sm">{item.event_title}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="font-mono text-[10px] uppercase tracking-widest neon-text-cyan">{item.event_type}</span>
                          <span className="font-mono text-[10px] text-muted-foreground">{item.event_date}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-mono text-sm neon-text-acid">+{item.xp_awarded} ПХ</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString("ru-RU")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-border font-mono text-xs text-muted-foreground">
              {filtered.length} достижений · QR-код на мероприятии = подтверждение посещения
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
