
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, BookOpen, Video, Code2, Search } from "lucide-react";
import { apiGet } from "@/lib/auth";

const FILTERS = ["ВСЕ", "ПУБЛИКАЦИЯ", "ИНТЕРВЬЮ", "АЛГОРИТМ"] as const;

const TYPE_ICONS: Record<string, any> = {
  "ПУБЛИКАЦИЯ": BookOpen,
  "ИНТЕРВЬЮ":   Video,
  "АЛГОРИТМ":   Code2,
};

const TYPE_XP_MAX: Record<string, number> = {
  "ПУБЛИКАЦИЯ": 29,
  "ИНТЕРВЬЮ":   27,
  "АЛГОРИТМ":   53,
};

interface KnowledgeItem {
  id: string;
  title: string;
  type: string;
  category: string;
  max_xp: number;
  progress: number;
  earned_xp: number;
  updated_at: string;
}

export function KnowledgeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items,   setItems]   = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter,  setFilter]  = useState<(typeof FILTERS)[number]>("ВСЕ");
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    apiGet("/api/knowledge/progress")
      .then(r => r.ok ? r.json() : { items: [] })
      .then(d => setItems(d.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open]);

  const filtered = items.filter(i => {
    const matchFilter = filter === "ВСЕ" || i.type.toUpperCase() === filter;
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalXp = items.reduce((s, i) => s + i.earned_xp, 0);

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
                  <BookOpen size={20} /> Знания
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="font-mono text-xs neon-text-acid">+{totalXp} ПХ накоплено</div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 transition">
                  <X size={24} className="neon-text-cyan" />
                </button>
              </div>
            </div>

            {/* Search + Filters */}
            <div className="px-6 py-3 border-b border-border space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <input type="text" placeholder="Поиск по знаниям…" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-background/40 border border-border font-mono text-sm focus:border-neon-cyan outline-none transition" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1 text-xs font-mono uppercase tracking-widest border transition ${
                      f === filter ? "border-neon-cyan neon-text-cyan" : "border-border text-muted-foreground hover:text-foreground"
                    }`}>
                    {f === "ВСЕ" ? "Все" : f} {f !== "ВСЕ" && `(${items.filter(i => i.type.toUpperCase() === f).length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="text-center font-mono text-xs neon-text-cyan animate-pulse py-10">Загрузка знаний…</div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen size={40} className="mx-auto opacity-20 mb-4" />
                  <div className="font-display text-xl neon-text-violet mb-2">Знания ещё не накоплены</div>
                  <p className="font-mono text-xs text-muted-foreground">
                    Открой публикацию, интервью или алгоритм в{" "}
                    <a href="/journal" className="neon-text-acid hover:underline">Журнале</a>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map(item => {
                    const Icon = TYPE_ICONS[item.type.toUpperCase()] || BookOpen;
                    const pct  = Math.min(100, Math.round(item.progress));
                    return (
                      <div key={item.id} className="p-4 border border-border bg-background/40 hover:neon-border transition">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-3">
                            <Icon size={16} className="neon-text-cyan mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-display text-sm">{item.title}</div>
                              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                                {item.type} · {item.category}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-mono text-xs neon-text-acid">+{item.earned_xp} ПХ</div>
                            <div className="font-mono text-[10px] text-muted-foreground">из {item.max_xp}</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-background/60 border border-border h-2">
                            <div className="bg-neon-cyan h-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex justify-between mt-1">
                            <div className="font-mono text-[10px] text-muted-foreground">{pct}% завершено</div>
                            <div className="font-mono text-[10px] text-muted-foreground">
                              {new Date(item.updated_at).toLocaleDateString("ru-RU")}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border flex justify-between font-mono text-xs text-muted-foreground">
              <span>{filtered.length} записей</span>
              <span>Максимум ПХ: публикация +29, интервью +27, алгоритм +53</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
