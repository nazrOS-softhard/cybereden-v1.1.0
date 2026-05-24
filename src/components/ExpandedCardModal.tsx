import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
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
}: Props) {
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
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
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
                      className="w-full h-64 md:h-full object-cover"
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
                    {children}
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
