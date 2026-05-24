import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Languages } from "lucide-react";
import logo from "@/assets/cybereden-logo.svg";
import { useI18n } from "@/lib/i18n";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/dashboard", key: "nav.dashboard" },
  { to: "/journal", key: "nav.journal" },
  { to: "/streams", key: "nav.streams" },
  { to: "/events", key: "nav.events" },
  { to: "/market", key: "nav.market" },
  { to: "/profile", key: "nav.profile" },
] as const;

export function TopNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, toggle, t } = useI18n();

  const LangToggle = ({ className = "" }: { className?: string }) => (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      title={lang === "ru" ? "Switch to English" : "Переключить на русский"}
      className={`inline-flex items-center gap-1.5 px-2.5 h-8 border border-border hover:neon-border-cyan transition-all font-mono text-[11px] uppercase tracking-widest ${className}`}
    >
      <Languages size={13} className="neon-text-cyan" />
      <span className={lang === "ru" ? "neon-text-violet" : "text-muted-foreground"}>RU</span>
      <span className="text-muted-foreground">/</span>
      <span className={lang === "en" ? "neon-text-violet" : "text-muted-foreground"}>EN</span>
    </button>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/60 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
<motion.img
  src={logo}
  alt="CyberEden Logo"
  width={27}
  height={27}
  className="w-7 h-7"
  style={{ scaleX: -1 }}
  animate={{ rotate: -360 }}
  transition={{
    repeat: Infinity,
    ease: "linear",
    duration: 12
  }}
  whileHover={{
    transition: { duration: 1.5, ease: "linear", repeat: Infinity }
  }}
/>





            <div className="font-display text-sm tracking-[0.3em] neon-text-violet">
              NAZR<span className="neon-text-cyan">OS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${
                    active
                      ? "neon-text-cyan border-b border-neon-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(l.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle className="hidden md:inline-flex" />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-border hover:neon-border transition-all"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-14 right-0 bottom-0 z-40 w-72 max-w-[85vw] bg-surface/95 backdrop-blur-xl border-l border-border md:hidden"
          >
            <div className="hud-scanlines absolute inset-0 pointer-events-none" />
            <nav className="relative flex flex-col py-6">
              {links.map((l, i) => {
                const active = location.pathname === l.to;
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-6 py-3 font-display text-sm tracking-[0.25em] uppercase border-l-2 transition-all ${
                        active
                          ? "border-neon-violet neon-text-violet bg-primary/10"
                          : "border-transparent text-muted-foreground hover:border-neon-cyan hover:neon-text-cyan"
                      }`}
                    >
                      <span className="text-xs text-muted-foreground mr-3 font-mono">
                        0{i + 1}
                      </span>
                      {t(l.key)}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="px-6 pt-6">
                <LangToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
