import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "nazrOS · CyberEden" },
      {
        name: "description",
        content: "Войди в nazrOS — операционную систему киберпанк-сообщества CyberEden.",
      },
      { property: "og:title", content: "nazrOS · CyberEden" },
      { property: "og:description", content: "Операционная система CyberEden." },
    ],
  }),
  component: Home,
});

const nodes = [
  { to: "/market", label: "Market", descKey: "node.market.desc" },
  { to: "/journal", label: "Journal", descKey: "node.journal.desc" },
  { to: "/events", label: "Events", descKey: "node.events.desc" },
  { to: "/streams", label: "Streams", descKey: "node.streams.desc" },
  { to: "/dashboard", label: "Dashboard", descKey: "node.dashboard.desc" },
  { to: "/profile", label: "Profile", descKey: "node.profile.desc" },
] as const;

function Home() {
  const { t } = useI18n();
  return (
    <main className="relative z-10 min-h-screen">
      <section className="relative pt-14 min-h-screen flex items-center overflow-hidden">
        {/* Старый фоновый блок удален, чтобы не перекрывать background.png */}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="font-mono text-xs uppercase tracking-[0.5em] neon-text-cyan flicker">
              {t("home.boot")}
            </div>
            <h1 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              <span className="neon-text-violet">Cyber</span>
              <span className="neon-text-cyan">Eden</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-xl">
              {t("home.tagline")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/market"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display text-sm tracking-[0.25em] uppercase pulse-glow"
              >
                {t("home.cta.market")} <ArrowRight size={16} />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:neon-border-cyan font-display text-sm tracking-[0.25em] uppercase"
              >
                {t("home.cta.hud")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan mb-3">
          {t("home.nodes.eyebrow")}
        </div>
        <h2 className="font-display text-2xl md:text-4xl mb-10">
          <span className="neon-text-violet">{t("home.nodes.title.a")}</span> {t("home.nodes.title.b")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map((n, i) => (
            <motion.div
              key={n.to}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={n.to}
                className="block hud-corners relative p-6 border border-border bg-surface/40 backdrop-blur-sm hover:neon-border transition-all group"
              >
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  0{i + 1} / 06
                </div>
                <div className="mt-2 font-display text-2xl group-hover:neon-text-violet transition-colors">
                  {n.label}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{t(n.descKey)}</div>
                <ArrowRight
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity neon-text-cyan"
                  size={18}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
