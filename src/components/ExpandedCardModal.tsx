import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

interface Props {
  open: boolean;
  layoutId: string;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  meta?: { label: string; value: string }[];
  image?: string;
  cta: string;
  children?: ReactNode;
  streamUrl?: string;
}

function getTwitchChannel(urlOrName: string): string {
  if (!urlOrName) return "";
  const match = urlOrName.match(/(?:twitch\.tv\/)([\w\-\.\d]+)/i);
  return match ? match[1] : urlOrName.trim();
}

export function ExpandedCardModal({
  open,
  layoutId,
  onClose,
  eyebrow,
  title,
  meta,
  image,
  cta,
  children,
  streamUrl,
}: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const twitchChannel = useMemo(() => {
    return streamUrl ? getTwitchChannel(streamUrl) : "";
  }, [streamUrl]);

  // 1. Динамически и безопасно загружаем официальный SDK Твича
  useEffect(() => {
    if (!open || !twitchChannel) return;

    if ((window as any).Twitch) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://player.twitch.tv/js/embed/v1.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Скрипт оставляем, чтобы не качать заново при следующем открытии
    };
  }, [open, twitchChannel]);

  // 2. Инициализируем плеер и боремся с падением в паузу при плохом интернете
  useEffect(() => {
    if (!open || !scriptLoaded || !twitchChannel || !playerContainerRef.current) return;

    // Очищаем контейнер перед созданием, чтобы не дублировать плееры
    playerContainerRef.current.innerHTML = "";

    // Создаем интерактивный плеер через JS SDK
    const player = new (window as any).Twitch.Player(playerContainerRef.current, {
      channel: twitchChannel,
      width: "100%",
      height: "100%",
      autoplay: true,
      muted: true, // Помогает слабому интернету быстрее стартануть без аудио-чанков
      parent: ["cybereden.vercel.app"],
      controls: true,
    });

    playerRef.current = player;

    // СЛУШАЕМ ИСПРАВЛЕНИЕ БАГА:
    // Когда Твич ловит просадку интернета, он кидает событие PAUSE.
    // Мы перехватываем его и заставляем насильно продолжать буферизацию!
    const handlePause = () => {
      // Даем плееру команду играть дальше. Если трафика нет, 
      // он покажет родную крутилку буферизации Твича вместо остановки видео.
      setTimeout(() => {
        if (playerRef.current && playerRef.current.isPaused()) {
          console.log("Трафик отстал, пробиваем буферизацию, играем дальше...");
          playerRef.current.play();
        }
      }, 150); // Микро-задержка, чтобы Твич успел осознать статус
    };

    // Вешаем слушатель на паузу
    player.addEventListener((window as any).Twitch.Player.PAUSE, handlePause);

    // Закрываем за собой хвосты
    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener((window as any).Twitch.Player.PAUSE, handlePause);
        playerContainerRef.current!.innerHTML = "";
        playerRef.current = null;
      }
    };
  }, [open, scriptLoaded, twitchChannel]);

  // Управление скроллом и кнопкой Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            layoutId={layoutId}
            className="fixed inset-2 sm:inset-4 md:inset-8 z-50 bg-surface neon-border overflow-hidden flex flex-col"
            transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
          >
            <div className="absolute inset-0 hud-scanlines pointer-events-none" />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-2 bg-background/80 border border-border hover:neon-border-cyan font-mono text-xs uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Back
            </button>

            <div className="relative flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-0 min-h-full">
                {image && (
                  <div className="relative bg-background hud-corners">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                  </div>
                )}
                <div className="p-6 md:p-10 lg:p-12">
                  {eyebrow && (
                    <div className="font-mono text-[10px] uppercase tracking-[0.4em] neon-text-cyan mb-3">
                      {eyebrow}
                    </div>
                  )}
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="font-display text-3xl md:text-5xl neon-text-violet leading-tight"
                  >
                    {title}
                  </motion.h2>

                  {meta && meta.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {meta.map((m) => (
                        <div key={m.label} className="border border-border p-3 bg-background/40">
                          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            {m.label}
                          </div>
                          <div className="font-display text-base neon-text-cyan mt-1">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground/90">
                    {twitchChannel ? (
                      /* Статичный контейнер для JS SDK Плеера */
                      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mt-4 border border-border/50 relative">
                        <div 
                          ref={playerContainerRef} 
                          className="w-full h-full [&_iframe]:border-0"
                        />
                        {!scriptLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                            <span className="animate-pulse">Loading SDK Matrix...</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      children
                    )}
                  </div>

                  <div className="mt-8 sticky bottom-0">
                    <button className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-display tracking-[0.25em] uppercase text-sm pulse-glow hover:brightness-110 transition">
                      {cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
