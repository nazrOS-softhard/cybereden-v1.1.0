import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { DeviceStages } from "@/components/DeviceStages";
import type { DeviceStage } from "@/components/DeviceStages";
import { useAuth, apiGet } from "@/lib/auth";

const TWITCH_PARENTS = ["cybereden.ru","www.cybereden.ru","cybereden.vercel.app","localhost"]
  .map(p => `parent=${p}`).join("&");

function twitchLogin(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("twitch.tv")) return u.pathname.replace(/^\//, "").split("/")[0] || null;
  } catch {}
  return null;
}

interface Props {
  open: boolean;
  layoutId: string;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  meta?: { label: string; value: string }[];
  image?: string;
  images?: string[];  // ← ДОБАВЛЕН МАССИВ ИЗОБРАЖЕНИЙ
  cta: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  children?: ReactNode;
  streamUrl?: string;
  stages?: DeviceStage[];  // ← стадии устройства
  itemId?: string;         // ← id для стадий
}

export function ExpandedCardModal({
  open, layoutId, onClose,
  eyebrow, title, meta,
  image, images, cta, ctaHref, onCtaClick,
  children, streamUrl,
  stages, itemId,
}: Props) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"info" | "stages">("info");

  // Подгружаем разблокированные стадии при открытии
  const [unlockedSet, setUnlockedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!open) { setActiveTab("info"); return; }
    if (!user || !itemId || !stages?.length) return;

    apiGet(`/api/market/unlocked-stages?item_id=${itemId}`)
      .then(r => r.ok ? r.json() : { stages: [] })
      .then(d => {
        const ids = new Set<number>((d.stages || []).map((s: any) => Number(s.stage_id)));
        setUnlockedSet(ids);
      })
      .catch(() => {});
  }, [open, user, itemId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  const login     = streamUrl ? twitchLogin(streamUrl) : null;
  const hasStages = !!stages?.length && !!itemId;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            layoutId={layoutId}
            className="fixed inset-2 sm:inset-4 md:inset-8 z-50 bg-surface neon-border overflow-hidden flex flex-col"
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="absolute inset-0 hud-scanlines pointer-events-none" />

            {/* Кнопка назад */}
            <button onClick={onClose} aria-label="Close"
              className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-2 bg-background/80 border border-border hover:neon-border-cyan font-mono text-xs uppercase tracking-widest transition">
              <ArrowLeft size={14} /> Back
            </button>

            {/* Вкладки: Описание / Стадии */}
            {hasStages && (
              <div className="absolute top-4 left-24 z-10 flex gap-1">
                <button onClick={() => setActiveTab("info")}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition ${activeTab === "info" ? "border-neon-cyan neon-text-cyan bg-neon-cyan/10" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  Описание
                </button>
                <button onClick={() => setActiveTab("stages")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition ${activeTab === "stages" ? "border-[#ff2ea6] text-[#ff2ea6] bg-[#ff2ea6]/10" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  <Layers size={11} />
                  Стадии сборки
                  {unlockedSet.size > 0 && (
                    <span className="ml-1 px-1 bg-[#ff2ea6]/20 text-[#ff2ea6] text-[9px]">
                      {unlockedSet.size}/{stages!.length}
                    </span>
                  )}
                </button>
              </div>
            )}

            <div className="relative flex-1 overflow-y-auto">

              {/* ── Вкладка: Стадии сборки ──────────────────────────────── */}
              {hasStages && activeTab === "stages" ? (
                <div className="p-6 md:p-10 max-w-4xl mx-auto">
                  <div className="mb-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.4em] neon-text-cyan mb-2">{eyebrow}</div>
                    <h2 className="font-display text-3xl md:text-4xl neon-text-violet">{title}</h2>
                    <p className="mt-2 font-mono text-sm text-muted-foreground">
                      Открывай стадии за ПХ и получай файлы для самостоятельной сборки
                    </p>
                  </div>
                  <DeviceStages
                    itemId={itemId!}
                    stages={stages!}
                    initialUnlocked={unlockedSet}
                    onStageUnlocked={(stageId) => setUnlockedSet(prev => new Set([...prev, stageId]))}
                  />
                </div>

              ) : (
                /* ── Вкладка: Описание (дефолт) ──────────────────────── */
                <div className="grid md:grid-cols-[1.1fr_1fr] gap-0 min-h-full">
                  {/* ← ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ */}
                  {images && images.length > 0 ? (
                    <div className="relative bg-background hud-corners overflow-hidden">
                      <div className="flex flex-col gap-2">
                        {images.map((img, i) => (
                          <img key={i} src={img} alt={`${title} ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                    </div>
                  ) : image && (
                    <div className="relative bg-background hud-corners">
                      <img src={image} alt={title} className="w-full h-auto object-contain" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-6 md:p-10 lg:p-12">
                    {eyebrow && (
                      <div className="font-mono text-[10px] uppercase tracking-[0.4em] neon-text-cyan mb-3">{eyebrow}</div>
                    )}
                    <motion.h2
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                      className="font-display text-3xl md:text-5xl neon-text-violet leading-tight"
                    >
                      {title}
                    </motion.h2>

                    {meta && meta.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {meta.map(m => (
                          <div key={m.label} className="border border-border p-3 bg-background/40">
                            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
                            <div className="font-display text-base neon-text-cyan mt-1">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Подсказка что есть стадии */}
                    {hasStages && (
                      <button onClick={() => setActiveTab("stages")}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#ff2ea6]/30 bg-[#ff2ea6]/5 hover:bg-[#ff2ea6]/10 transition font-mono text-xs text-[#ff2ea6]">
                        <Layers size={13} />
                        {unlockedSet.size === 0
                          ? `${stages!.length} стадий для самостоятельной сборки →`
                          : `Прогресс: ${unlockedSet.size}/${stages!.length} стадий открыто →`
                        }
                      </button>
                    )}

                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/90">
                      {/* Плеер — если есть стрим */}
                      {login && (
                        <div className="aspect-video w-full bg-black overflow-hidden mb-6">
                          <iframe key={login}
                            src={`https://player.twitch.tv/?channel=${login}&${TWITCH_PARENTS}&autoplay=true`}
                            width="100%" height="100%"
                            allow="autoplay; fullscreen" allowFullScreen
                            className="w-full h-full border-0" loading="lazy"
                          />
                        </div>
                      )}
                      {/* Дети (описание, кнопка регистрации, бонус) — всегда */}
                      {children}
                    </div>

                    <div className="mt-8">
                      {ctaHref ? (
                        <a href={ctaHref} target="_blank" rel="noreferrer"
                          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-display tracking-[0.25em] uppercase text-sm pulse-glow hover:brightness-110 transition">
                          {cta}
                        </a>
                      ) : (
                        <button onClick={onCtaClick}
                          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-display tracking-[0.25em] uppercase text-sm pulse-glow hover:brightness-110 transition">
                          {cta}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
