import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  layoutId: string;
  onClick?: () => void;
  image?: string;
  eyebrow?: string;
  title: string;
  meta?: string;
  children?: ReactNode;
}

export function NeonCard({ layoutId, onClick, image, eyebrow, title, meta, children }: Props) {
  return (
    <motion.button
      layoutId={layoutId}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="text-left group relative bg-surface/60 backdrop-blur-sm border border-border hover:neon-border transition-all overflow-hidden"
    >
      <div className="hud-corners relative">
        {image && (
          <div className="aspect-[4/3] overflow-hidden bg-background">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}
        <div className="p-4">
          {eyebrow && (
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] neon-text-cyan mb-1.5">
              {eyebrow}
            </div>
          )}
          <div className="font-display text-base leading-tight group-hover:neon-text-violet transition-colors">
            {title}
          </div>
          {children && <div className="mt-2 text-xs text-muted-foreground">{children}</div>}
          {meta && (
            <div className="mt-3 font-mono text-xs neon-text-acid">{meta}</div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
