import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function PageShell({ title, subtitle, eyebrow, children }: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24"
    >
      <header className="mb-10 hud-corners relative p-6 border border-border bg-surface/30 backdrop-blur-sm">
        <div className="absolute inset-0 hud-scanlines pointer-events-none" />
        {eyebrow && (
          <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan mb-2">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl md:text-5xl neon-text-violet">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
      </header>
      {children}
    </motion.main>
  );
}
