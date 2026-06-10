import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Package, Sparkles, Lock } from "lucide-react";
import type { SoftCollection } from "@/lib/stages";
import { useAuth, apiPost } from "@/lib/auth";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  itemId: string;
  itemName: string;
  price: number;
  collection: SoftCollection;
}

export function SoftCollectionModal({ open, onClose, itemId, itemName, price, collection }: Props) {
  const { user, refreshUser } = useAuth();
  const [buying,  setBuying]  = useState(false);
  const [bought,  setBought]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const canAfford = (user?.xp ?? 0) >= price;

  const handleBuy = async () => {
    if (!user || !canAfford || buying) return;
    setBuying(true); setError(null);
    try {
      const res  = await apiPost("/api/market/purchase-soft", { item_id: itemId });
      const data = await res.json();
      if (res.ok) { setBought(true); refreshUser(); }
      else setError(data.error || "Ошибка покупки");
    } catch (e: any) { setError(e.message || "Нет соединения"); }
    finally { setBuying(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl max-h-[85vh] bg-surface border border-border overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/80">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest neon-text-cyan mb-1">КУПАЖ КОЛЛЕКЦИИ</div>
                <h2 className="font-display text-2xl neon-text-violet flex items-center gap-2">
                  <Sparkles size={20} className="neon-text-acid" /> {itemName}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 transition"><X size={24} className="neon-text-cyan" /></button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* Цифровые компоненты */}
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                  <Download size={12} /> Цифровые компоненты
                </div>
                <div className="space-y-1.5">
                  {collection.digital.map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 border transition ${
                      bought ? "border-neon-cyan/30 bg-neon-cyan/5" : "border-border bg-background/40"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${bought ? "bg-neon-acid" : "bg-border"}`} />
                      <span className="font-mono text-xs">{item}</span>
                      {bought && <Download size={12} className="ml-auto neon-text-acid flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Физические компоненты */}
              {collection.physical.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    <Package size={12} /> Физическое коллекционное издание
                  </div>
                  <div className="space-y-1.5">
                    {collection.physical.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 border border-border bg-background/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-violet flex-shrink-0" />
                        <span className="font-mono text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                    Физическая часть доставляется отдельно через Telegram-бота после оплаты
                  </div>
                </div>
              )}

              {/* Доступы */}
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                  <Sparkles size={12} /> Привилегии и доступы
                </div>
                <div className="space-y-1.5">
                  {collection.access.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-neon-acid/20 bg-neon-acid/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-acid flex-shrink-0" />
                      <span className="font-mono text-xs neon-text-acid">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: кнопка покупки */}
            <div className="px-6 py-4 border-t border-border bg-surface/80">
              {error && (
                <div className="font-mono text-xs text-red-400 mb-3">{error}</div>
              )}

              {bought ? (
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm neon-text-acid">✓ Куплено! Проверь инвентарь</div>
                  {collection.downloadUrl && (
                    <a href={collection.downloadUrl} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-display text-xs uppercase tracking-widest">
                      <Download size={14} /> Скачать
                    </a>
                  )}
                </div>
              ) : !user ? (
                <div className="font-mono text-xs text-muted-foreground text-center">
                  Войди в CyberEden чтобы приобрести коллекцию
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-xs text-muted-foreground">
                    Твои ПХ: <span className="neon-text-cyan">{user.xp.toLocaleString("ru-RU")}</span>
                    {!canAfford && <span className="text-red-400 ml-2">недостаточно</span>}
                  </div>
                  <button onClick={handleBuy} disabled={!canAfford || buying}
                    className={`flex items-center gap-2 px-6 py-2.5 font-display text-sm tracking-widest uppercase transition ${
                      canAfford && !buying
                        ? "bg-primary text-primary-foreground pulse-glow hover:brightness-110"
                        : "bg-background/40 text-muted-foreground cursor-not-allowed border border-border"
                    }`}>
                    {buying ? "Покупка…" : (
                      <>
                        {!canAfford && <Lock size={14} />}
                        Получить коллекцию · {price.toLocaleString("ru-RU")} ПХ
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
