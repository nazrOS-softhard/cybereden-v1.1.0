import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { X, Download, Search } from "lucide-react";
import { assetCategories, datacenterAssets } from "@/lib/mockData";

// Цвета бейджей для HUD-меток
const badgeColors: Record<string, string> = {
  LIVE: "bg-neon-acid text-black",
  NEW: "bg-neon-cyan text-black",
  CORE: "bg-neon-violet text-white",
  SYSTEM: "bg-blue-600 text-white",
  FEATURED: "bg-yellow-600 text-white",
  RESTRICTED: "bg-red-600 text-white",
  EXPERIMENTAL: "bg-orange-600 text-white",
  ALPHA: "bg-purple-600 text-white",
  BETA: "bg-indigo-600 text-white",
  CLASSIFIED: "bg-gray-700 text-white",
};

interface DatacenterModalProps {
  open: boolean;
  onClose: () => void;
}

export function DatacenterModal({ open, onClose }: DatacenterModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useMemo(() => {
    return datacenterAssets.filter((asset) => {
      const matchesCategory =
        selectedCategory === "Все" || asset.category === selectedCategory;
      const matchesSearch = asset.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-6xl max-h-[90vh] bg-surface border border-border rounded overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/80 backdrop-blur">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest neon-text-cyan">
                  DATACENTER
                </div>
                <h2 className="font-display text-2xl neon-text-violet">
                  Хранилище цифровых активов
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 transition rounded"
              >
                <X size={24} className="neon-text-cyan hover:neon-text-acid transition" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-border bg-surface/40">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Поиск по файлам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background/40 border border-border text-foreground focus:border-neon-cyan outline-none transition"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar - Categories */}
              <div className="w-64 border-r border-border bg-surface/40 overflow-y-auto hidden md:block">
                <div className="p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    Категории
                  </div>
                  <button
                    onClick={() => setSelectedCategory("Все")}
                    className={`w-full text-left px-3 py-2 text-xs font-mono uppercase transition ${
                      selectedCategory === "Все"
                        ? "bg-neon-violet/20 text-neon-violet border-l-2 border-neon-violet"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Все файлы
                  </button>
                  {assetCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 text-xs font-mono uppercase transition ${
                        selectedCategory === cat
                          ? "bg-neon-violet/20 text-neon-violet border-l-2 border-neon-violet"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content - Assets Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="group relative p-4 border border-border bg-background/40 hover:neon-border-cyan transition cursor-pointer"
                    >
                      {/* Badge */}
                      {asset.badge && (
                        <div
                          className={`absolute top-3 left-3 px-2 py-1 text-[9px] font-mono uppercase ${badgeColors[asset.badge]}`}
                        >
                          {asset.badge}
                        </div>
                      )}

                      <div className="mt-3">
                        <div className="font-display text-sm group-hover:neon-text-cyan transition">
                          {asset.name}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="font-mono text-xs text-muted-foreground">
                            {asset.format} · {asset.size}
                          </div>
                          <div className="font-mono text-xs neon-text-acid">
                            +{asset.xp} XP
                          </div>
                        </div>
                      </div>

                      {/* Download Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="flex items-center gap-2 text-white pointer-events-auto">
                          <Download size={20} />
                          <span className="font-mono text-xs uppercase tracking-widest">
                            Загрузить
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border bg-surface/80 backdrop-blur flex justify-between items-center">
              <div className="font-mono text-xs text-muted-foreground">
                Всего: {filteredAssets.length} файлов
              </div>
              <div className="font-mono text-xs neon-text-acid">
                XP за загрузку: {filteredAssets.reduce((sum, a) => sum + a.xp, 0)} XP
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
