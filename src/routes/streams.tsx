import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, Eye } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/streams")({
  head: () => ({
    meta: [
      { title: "Streams · nazrOS" },
      { name: "description", content: "Прямые включения каналов CyberEden." },
      { property: "og:title", content: "Streams · nazrOS" },
      { property: "og:description", content: "Live-каналы nazrOS." },
    ],
  }),
  component: StreamsPage,
});

const streams = [
  { id: "s1", channel: "@vex.pilot", title: "Полевые испытания VEX-02 в Секторе-9", viewers: 12482, live: true, hue: 305 },
  { id: "s2", channel: "@ghost_in_static", title: "Live-реверс: эксплойт нейро-API", viewers: 7821, live: true, hue: 210 },
  { id: "s3", channel: "@solaris.kid", title: "Indie Neuro Jam · day 1", viewers: 4210, live: true, hue: 145 },
  { id: "s4", channel: "@aurora.eye", title: "Аналитика финала Nexus Pro", viewers: 9120, live: true, hue: 0 },
  { id: "s5", channel: "@nazr.os", title: "AMA · архитектура nazrOS 4.0", viewers: 18044, live: true, hue: 305 },
  { id: "s6", channel: "@spike.rin", title: "Доставка в дождь · 3 часа non-stop", viewers: 980, live: true, hue: 210 },
];

function StreamsPage() {
  const { t } = useI18n();
  return (
    <PageShell
      eyebrow={t("streams.eyebrow")}
      title={t("streams.title")}
      subtitle={t("streams.subtitle")}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {streams.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="hud-corners group relative border border-border bg-surface/40 backdrop-blur-sm overflow-hidden"
          >
            <div
              className="aspect-video relative overflow-hidden"
              style={{
                background: `radial-gradient(circle at 30% 40%, oklch(0.5 0.2 ${s.hue} / 0.6), oklch(0.13 0.04 290) 70%)`,
              }}
            >
              <div className="absolute inset-0 hud-scanlines pointer-events-none" />
              <div className="absolute inset-0 hud-grid opacity-40" />
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-background/70 border border-destructive">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive flicker" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-destructive-foreground">
                  LIVE
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-background/70 font-mono text-[10px]">
                <Eye size={11} /> {s.viewers.toLocaleString("ru-RU")}
              </div>
              <button
                aria-label="Play"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/40"
              >
                <span className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center pulse-glow">
                  <Play size={22} fill="currentColor" />
                </span>
              </button>
            </div>
            <div className="p-4">
              <div className="font-mono text-[11px] neon-text-cyan">{s.channel}</div>
              <div className="mt-1 font-display text-sm leading-snug">{s.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
