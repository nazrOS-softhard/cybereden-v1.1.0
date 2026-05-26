import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { cybers } from "@/lib/mockData";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · nazrOS" },
      { name: "description", content: "Метрики и сетка активных киберов CyberEden." },
      { property: "og:title", content: "Dashboard · nazrOS" },
      { property: "og:description", content: "HUD-дашборд nazrOS." },
    ],
  }),
  component: DashboardPage,
});

const roles = ["ВСЕ", "НАБЛЮДАТЕЛЬ", "ОПЕРАТОР", "АРХИТЕКТОР ЯДРА", "ГЛАВНЫЙ РАЗРАБОТЧИК"] as const;

const statusColor: Record<string, string> = {
  online: "neon-text-acid",
  ghost: "neon-text-cyan",
  offline: "text-muted-foreground",
};

function DashboardPage() {
  const { t } = useI18n();
  const [selectedRole, setSelectedRole] = useState<(typeof roles)[number]>("ВСЕ");

  const filtered = useMemo(() => {
    if (selectedRole === "ВСЕ") return cybers;
    return cybers.filter((c) => c.rank === selectedRole);
  }, [selectedRole]);

  const sorted = [...filtered].sort((a, b) => b.xp - a.xp);

  const kpis = [
    { label: t("dash.kpi.nodes"), value: "12 482", trend: "+4.2%", color: "neon-text-cyan" },
    { label: t("dash.kpi.xp"), value: "8.4M", trend: "+12.1%", color: "neon-text-acid" },
    { label: t("dash.kpi.streams"), value: "236", trend: "−1.8%", color: "neon-text-violet" },
    { label: t("dash.kpi.threat"), value: "low / 0.21", trend: "stable", color: "neon-text-cyan" },
  ];

  return (
    <PageShell
      eyebrow={t("dash.eyebrow")}
      title={t("dash.title")}
      subtitle={t("dash.subtitle")}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="hud-corners p-5 border border-border bg-surface/50 backdrop-blur-sm relative"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {k.label}
            </div>
            <div className={`mt-2 font-display text-3xl ${k.color}`}>{k.value}</div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">{k.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="hud-corners border border-border bg-surface/40 backdrop-blur-sm">
        <div className="px-5 py-3 border-b border-border">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="font-display text-sm tracking-widest neon-text-violet">
                {t("dash.cybers")}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {t("dash.sync")}
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all ${
                    role === selectedRole
                      ? "neon-border-cyan neon-text-cyan"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {sorted.map((c, i) => (
            <Link
              key={c.id}
              to="/profile"
              className="grid grid-cols-[40px_1fr_140px_100px_80px] items-center px-5 py-3 text-sm hover:bg-primary/5 transition-colors cursor-pointer group"
            >
              <div className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display tracking-wider group-hover:neon-text-cyan transition-colors">
                {c.handle}
                {c.streaming && (
                  <span className="ml-2 text-[10px] neon-text-acid">● STREAM</span>
                )}
              </div>
              <div className="font-mono text-xs text-muted-foreground hidden sm:block">
                {c.rank}
              </div>
              <div className="font-mono text-xs neon-text-cyan text-right">
                {c.xp.toLocaleString("ru-RU")} ПХ
              </div>
              <div
                className={`font-mono text-[10px] uppercase tracking-widest text-right ${statusColor[c.status]}`}
              >
                ● {c.status}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
