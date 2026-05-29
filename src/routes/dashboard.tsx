import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · nazrOS" },
      { name: "description", content: "Сетка активных киберов CyberEden." },
    ],
  }),
  component: DashboardPage,
});

const API = (import.meta.env.VITE_API_URL || "https://cybereden-v1-1-0.vercel.app").replace(/\/$/, "");

const RANKS = ["ВСЕ", "НАБЛЮДАТЕЛЬ", "ОПЕРАТОР", "АРХИТЕКТОР ЯДРА", "ГЛАВНЫЙ РАЗРАБОТЧИК"] as const;

// ─── Утилиты ──────────────────────────────────────────────────────────────────
function rankFromLevel(level: number): string {
  if (level >= 50) return "ГЛАВНЫЙ РАЗРАБОТЧИК";
  if (level >= 30) return "АРХИТЕКТОР ЯДРА";
  if (level >= 10) return "ОПЕРАТОР";
  return "НАБЛЮДАТЕЛЬ";
}

function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

interface CyberRow {
  id: string;
  display_name: string;
  github_username: string | null;
  twitch_username: string | null;
  avatar_url: string | null;
  xp: number;
  level: number;
  is_online: boolean;
  created_at: string;
}

function DashboardPage() {
  const { t } = useI18n();
  const { user: me } = useAuth();

  const [users,    setUsers]    = useState<CyberRow[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState<(typeof RANKS)[number]>("ВСЕ");
  const [search,   setSearch]   = useState("");

  useEffect(() => {
    fetch(`${API}/api/users`)
      .then(r => r.json())
      .then(d => setUsers(d.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = users
    .filter(u => filter === "ВСЕ" || rankFromLevel(u.level) === filter)
    .filter(u => !search || u.display_name.toLowerCase().includes(search.toLowerCase())
      || u.github_username?.toLowerCase().includes(search.toLowerCase()));

  const onlineCount = users.filter(u => u.is_online).length;

  const kpis = [
    { label: "Киберов в сети",       value: String(users.length),  trend: "registered",   color: "neon-text-cyan"   },
    { label: "Онлайн",               value: String(onlineCount),   trend: "активны сейчас", color: "neon-text-acid" },
    { label: "ПХ в системе",         value: users.reduce((s, u) => s + u.xp, 0).toLocaleString("ru-RU"),
      trend: "всего начислено",       color: "neon-text-violet" },
    { label: "Новых сегодня",        value: String(users.filter(u => {
        const d = new Date(u.created_at);
        const now = new Date();
        return d.toDateString() === now.toDateString();
      }).length),                     trend: "за 24 ч",            color: "neon-text-cyan" },
  ];

  return (
    <PageShell eyebrow={t("dash.eyebrow")} title={t("dash.title")} subtitle={t("dash.subtitle")}>

      {/* KPI */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map((k, i) => (
          <motion.div key={k.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="hud-corners p-5 border border-border bg-surface/50 backdrop-blur-sm">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{k.label}</div>
            <div className={`mt-2 font-display text-3xl ${k.color}`}>{k.value}</div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">{k.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="hud-corners border border-border bg-surface/40 backdrop-blur-sm">

        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-display text-sm tracking-widest neon-text-violet">{t("dash.cybers")}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {loading ? "загрузка…" : `${filtered.length} / ${users.length} киберов`}
            </div>
          </div>

          {/* Поиск */}
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по нику..."
            className="w-full bg-background/40 border border-border px-3 py-2 font-mono text-xs outline-none focus:border-neon-cyan placeholder:text-muted-foreground/50 transition"
          />

          {/* Фильтр по рангу */}
          <div className="flex flex-wrap gap-2">
            {RANKS.map(r => (
              <button key={r} onClick={() => setFilter(r)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all ${
                  r === filter ? "neon-border-cyan neon-text-cyan" : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                }`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Список */}
        {loading ? (
          <div className="p-10 text-center font-mono text-xs neon-text-cyan animate-pulse uppercase tracking-widest">
            Загрузка сети…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {users.length === 0 ? "Киберов пока нет. Стань первым — зарегистрируйся." : "Нет совпадений"}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((c, i) => {
              const rank = rankFromLevel(c.level);
              const isMe = me?.id === c.id;
              return (
                <Link key={c.id} to="/profile"
                  className={`grid grid-cols-[40px_44px_1fr_140px_100px_80px] items-center px-5 py-3 text-sm transition-colors cursor-pointer group hover:bg-primary/5 ${isMe ? "bg-primary/5 border-l-2 border-neon-cyan" : ""}`}>

                  {/* № */}
                  <div className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>

                  {/* Аватар */}
                  <div className="w-8 h-8 border border-border overflow-hidden bg-background/40 flex items-center justify-center">
                    {c.avatar_url
                      ? <img src={c.avatar_url} alt="" className="w-full h-full object-cover" />
                      : <span className="font-display text-sm neon-text-violet">{c.display_name[0]?.toUpperCase()}</span>}
                  </div>

                  {/* Ник */}
                  <div className="font-display tracking-wider group-hover:neon-text-cyan transition-colors pl-2">
                    @{c.display_name}
                    {isMe && <span className="ml-2 text-[10px] neon-text-acid">← ты</span>}
                  </div>

                  {/* Ранг */}
                  <div className="font-mono text-xs text-muted-foreground hidden sm:block">{rank}</div>

                  {/* ПХ */}
                  <div className="font-mono text-xs text-right">
                    <span className="neon-text-acid">{c.xp.toLocaleString("ru-RU")}</span>
                    <span className="text-muted-foreground ml-1 text-[10px]">ПХ</span>
                  </div>

                  {/* Статус */}
                  <div className={`font-mono text-[10px] uppercase tracking-widest text-right ${c.is_online ? "neon-text-acid" : "text-muted-foreground"}`}>
                    {c.is_online ? "● online" : "○ offline"}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Подсказка для незарегистрированных */}
      {!me && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-6 p-4 border border-border/40 bg-surface/20 backdrop-blur text-center font-mono text-xs text-muted-foreground">
          <Link to="/" className="neon-text-cyan hover:underline">Зарегистрируйся</Link>{" "}
          чтобы появиться в сетке CyberEden
        </motion.div>
      )}
    </PageShell>
  );
}
