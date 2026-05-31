import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { X, Download, Search, Upload, RefreshCw } from "lucide-react";
import { apiGet, apiPost } from "@/lib/auth";

// ─── ПХ за тип файла (из ТЗ) ─────────────────────────────────────────────────
const XP_BY_CATEGORY: Record<string, number> = {
  "ЦИФРОВЫЕ АРТЕФАКТЫ":        3,
  "МЕДИА МОДУЛИ":              5,
  "СТРИМ-ФАЙЛЫ КИБЕРЭДЭН":    6,
  "СИСТЕМНЫЕ МОДУЛИ":         12,
  "ЦИФРОВЫЕ ПРОТОКОЛЫ":       15,
  "ОБЪЁМНЫЕ МОДЕЛИ":          18,
  "МОДЕЛИ ИГРОВЫХ ДВИЖОКОВ":  24,
  "ПРОСТРАНСТВА И УРОВНИ":    30,
  "ИИ-БОТЫ":                  35,
  "КИНЕМАТОГРАФИЧЕСКИЕ ФАЙЛЫ": 40,
  "ПОЛНОЦЕННЫЙ TOOLKIT":       55,
  "ЦИФРОВЫЕ СУЩНОСТИ":         3,
};

// ─── Определение категории по расширению/mime ─────────────────────────────────
function detectCategory(fileName: string, mimeType?: string): string {
  const ext  = fileName.split(".").pop()?.toLowerCase() || "";
  const mime = mimeType?.toLowerCase() || "";

  if (["svg", "png", "jpg", "jpeg", "gif", "webp", "avif", "concept"].includes(ext)
    || mime.startsWith("image/")) return "ЦИФРОВЫЕ АРТЕФАКТЫ";

  if (["mp4", "mov", "avi", "mkv", "webm", "flv"].includes(ext)
    || mime.startsWith("video/")) return "МЕДИА МОДУЛИ";

  if (["mp3", "wav", "ogg", "flac", "aac"].includes(ext)
    || mime.startsWith("audio/")) return "МЕДИА МОДУЛИ";

  if (["stream", "obs", "clbr", "rtsp"].includes(ext)) return "СТРИМ-ФАЙЛЫ КИБЕРЭДЭН";

  if (["dll", "so", "sys", "exe", "bin", "dat", "pak"].includes(ext)) return "СИСТЕМНЫЕ МОДУЛИ";

  if (["json", "yaml", "yml", "xml", "toml", "proto", "ini", "cfg"].includes(ext)) return "ЦИФРОВЫЕ ПРОТОКОЛЫ";

  if (["obj", "fbx", "blend", "stl", "gltf", "glb", "3ds", "max"].includes(ext)) return "ОБЪЁМНЫЕ МОДЕЛИ";

  if (["unity", "uproject", "scene", "prefab", "unitypackage"].includes(ext)) return "МОДЕЛИ ИГРОВЫХ ДВИЖОКОВ";

  if (["umap", "uasset", "world", "level", "map"].includes(ext)) return "ПРОСТРАНСТВА И УРОВНИ";

  if (["py", "bot", "sh", "onnx", "pt", "h5", "pkl"].includes(ext)) return "ИИ-БОТЫ";

  if (["mov", "prproj", "aep", "drp"].includes(ext)) return "КИНЕМАТОГРАФИЧЕСКИЕ ФАЙЛЫ";

  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "ПОЛНОЦЕННЫЙ TOOLKIT";

  if (["ts", "tsx", "js", "jsx", "vue", "svelte"].includes(ext)) return "СИСТЕМНЫЕ МОДУЛИ";

  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) return "ЦИФРОВЫЕ ПРОТОКОЛЫ";

  return "ЦИФРОВЫЕ СУЩНОСТИ";
}

function formatSize(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} ГБ`;
  if (bytes >= 1_048_576)     return `${(bytes / 1_048_576).toFixed(1)} МБ`;
  if (bytes >= 1024)          return `${(bytes / 1024).toFixed(0)} КБ`;
  return `${bytes} Б`;
}

const CATEGORIES = [
  "ВСЕ ФАЙЛЫ",
  "ЦИФРОВЫЕ АРТЕФАКТЫ",
  "СИСТЕМНЫЕ МОДУЛИ",
  "ОБЪЁМНЫЕ МОДЕЛИ",
  "МЕДИА МОДУЛИ",
  "ЦИФРОВЫЕ ПРОТОКОЛЫ",
  "ЦИФРОВЫЕ СУЩНОСТИ",
  "СТРИМ-ФАЙЛЫ КИБЕРЭДЭН",
  "МОДЕЛИ ИГРОВЫХ ДВИЖОКОВ",
  "ИИ-БОТЫ",
  "ПРОСТРАНСТВА И УРОВНИ",
  "КИНЕМАТОГРАФИЧЕСКИЕ ФАЙЛЫ",
  "ПОЛНОЦЕННЫЙ TOOLKIT",
];

interface RealAsset {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  url: string;
  is_public: boolean;
  created_at: string;
  category: string;
  xp: number;
}

interface DatacenterModalProps {
  open: boolean;
  onClose: () => void;
}

export function DatacenterModal({ open, onClose }: DatacenterModalProps) {
  const [assets,          setAssets]          = useState<RealAsset[]>([]);
  const [loading,         setLoading]         = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ВСЕ ФАЙЛЫ");
  const [searchQuery,     setSearchQuery]     = useState("");
  const [uploading,       setUploading]       = useState(false);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res  = await apiGet("/api/upload/assets");
      if (!res.ok) return;
      const data = await res.json();
      const enriched: RealAsset[] = (data.assets || []).map((a: any) => {
        const cat = detectCategory(a.file_name, a.mime_type);
        return { ...a, category: cat, xp: XP_BY_CATEGORY[cat] ?? 3 };
      });
      setAssets(enriched);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { if (open) loadAssets(); }, [open]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res  = await apiPost("/api/upload/asset", form);
      const data = await res.json();
      if (res.ok) {
        const cat = detectCategory(data.asset.file_name, data.asset.mime_type);
        setAssets(prev => [{ ...data.asset, category: cat, xp: XP_BY_CATEGORY[cat] ?? 3 }, ...prev]);
      }
    } catch { /* ignore */ }
    finally { setUploading(false); e.target.value = ""; }
  };

  const filtered = useMemo(() => {
    return assets.filter(a => {
      const matchCat  = selectedCategory === "ВСЕ ФАЙЛЫ" || a.category === selectedCategory;
      const matchSearch = a.file_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [assets, selectedCategory, searchQuery]);

  const totalXp = filtered.reduce((s, a) => s + a.xp, 0);

  const categoryCount = (cat: string) =>
    cat === "ВСЕ ФАЙЛЫ" ? assets.length : assets.filter(a => a.category === cat).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-6xl max-h-[90vh] bg-surface border border-border overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/80 backdrop-blur">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest neon-text-cyan">ЦОД</div>
                <h2 className="font-display text-2xl neon-text-violet">Хранилище цифровых активов</h2>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={loadAssets} disabled={loading}
                  className="p-2 border border-border hover:neon-border transition">
                  <RefreshCw size={16} className={loading ? "animate-spin neon-text-cyan" : "text-muted-foreground"} />
                </button>
                <label className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:neon-border-cyan font-display text-xs tracking-widest uppercase transition cursor-pointer">
                  <Upload size={14} className="neon-text-cyan" />
                  {uploading ? "Загрузка…" : "Добавить файл"}
                  <input type="file" onChange={handleUpload} className="hidden" disabled={uploading} />
                </label>
                <button onClick={onClose} className="p-2 hover:bg-white/10 transition">
                  <X size={24} className="neon-text-cyan hover:neon-text-acid transition" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-border bg-surface/40">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input type="text" placeholder="Поиск в датацентре..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background/40 border border-border text-foreground focus:border-neon-cyan outline-none transition font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 border-r border-border bg-surface/40 overflow-y-auto hidden md:block">
                <div className="p-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Категории</div>
                  {CATEGORIES.map(cat => {
                    const count = categoryCount(cat);
                    return (
                      <button key={cat} onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-xs font-mono uppercase transition flex justify-between items-center ${
                          selectedCategory === cat
                            ? "bg-neon-violet/20 text-neon-violet border-l-2 border-neon-violet"
                            : "text-muted-foreground hover:text-foreground"
                        }`}>
                        <span>{cat}</span>
                        {count > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.5 ${selectedCategory === cat ? "bg-neon-violet/30 text-neon-violet" : "bg-border/50 text-muted-foreground"}`}>
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-40 font-mono text-xs neon-text-cyan animate-pulse">
                    Загрузка датацентра…
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 gap-3 text-muted-foreground">
                    <Upload size={32} className="opacity-30" />
                    <div className="font-mono text-xs uppercase tracking-widest">
                      {assets.length === 0 ? "Загрузи первый файл в активы" : "Нет файлов в этой категории"}
                    </div>
                    {assets.length === 0 && (
                      <label className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:neon-border-cyan font-display text-xs tracking-widest uppercase transition cursor-pointer">
                        <Upload size={12} /> Загрузить
                        <input type="file" onChange={handleUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(asset => (
                      <div key={asset.id}
                        className="group relative p-4 border border-border bg-background/40 hover:neon-border-cyan transition cursor-pointer">
                        {/* Категория badge */}
                        <div className="text-[9px] font-mono uppercase tracking-widest neon-text-cyan opacity-60 mb-2">
                          {asset.category}
                        </div>

                        <div className="font-display text-sm group-hover:neon-text-cyan transition line-clamp-2">
                          {asset.file_name}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="font-mono text-xs text-muted-foreground">
                            {asset.file_type.toUpperCase()} · {formatSize(asset.file_size)}
                          </div>
                          <div className="font-mono text-xs neon-text-acid">+{asset.xp} ПХ</div>
                        </div>

                        <div className="mt-2 font-mono text-[10px] text-muted-foreground/50">
                          {new Date(asset.created_at).toLocaleDateString("ru-RU")}
                        </div>

                        {/* Download overlay */}
                        {asset.url && (
                          <a href={asset.url} target="_blank" rel="noreferrer"
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                            <Download size={18} />
                            <span className="font-mono text-xs uppercase tracking-widest">Скачать</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border bg-surface/80 backdrop-blur flex justify-between items-center">
              <div className="font-mono text-xs text-muted-foreground">
                Всего: {filtered.length} файлов
              </div>
              <div className="font-mono text-xs neon-text-acid">
                ПХ в категории: +{totalXp} ПХ
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
