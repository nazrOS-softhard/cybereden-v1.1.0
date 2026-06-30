import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
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
import { rankFromXp } from "@/lib/ranks";

const RANKS = ["ВСЕ", "НАБЛЮДАТЕЛЬ", "ОПЕРАТОР", "АРХИТЕКТОР ЯДРА", "ГЛАВНЫЙ РАЗРАБОТЧИК"] as const;

// rankFromXp imported from @/lib/ranks

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

// ── Хук debounce ──────────────────────────────────────────────────────────────
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function DashboardPage() {
  const { t } = useI18n();
  const { user: me } = useAuth();

  const [users,     setUsers]     = useState<CyberRow[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState<(typeof RANKS)[number]>("ВСЕ");
  const [searchRaw, setSearchRaw] = useState("");

  // Дебаунс поиска 300 мс — предотвращает фриз при быстром наборе
  const search = useDebounce(searchRaw, 300);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/users`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 30_000);
    return () => clearInterval(interval);
  }, [fetchUsers]);

  // Фильтрация через useMemo-заменитель: только при изменении данных/фильтров
  const filtered = (() => {
    const lc = search.toLowerCase();
    return users
      .filter(u => filter === "ВСЕ" || rankFromXp(u.xp) === filter)
      .filter(u => !lc ||
        u.display_name.toLowerCase().includes(lc) ||
        (u.github_username ?? "").toLowerCase().includes(lc) ||
        (u.twitch_username ?? "").toLowerCase().includes(lc)
      );
  })();

  const onlineCount = users.filter(u => u.is_online).length;
  const totalXp     = users.reduce((s, u) => s + u.xp, 0);
  const newToday    = users.filter(u => {
    const d = new Date(u.created_at); const n = new Date();
    return d.toDateString() === n.toDateString();
  }).length;

  const kpis = [
    { label: t("dash.kpi.registered"),  value: users.length,  trend: t("dash.kpi.registered.trend"),  color: "neon-text-cyan"   },
    { label: t("dash.kpi.online"),       value: onlineCount,   trend: t("dash.kpi.online.trend"),       color: "neon-text-acid"   },
    { label: t("dash.kpi.xp"),          value: totalXp,       trend: t("dash.kpi.xp.trend"),           color: "neon-text-violet" },
    { label: t("dash.kpi.new"),         value: newToday,      trend: t("dash.kpi.new.trend"),          color: "neon-text-cyan"   },
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
            <div className={`mt-2 font-display text-3xl tabular-nums ${k.color}`}>
              {loading ? "—" : k.value.toLocaleString("ru-RU")}
            </div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">{k.trend}</div>
          </motion.div>
        ))}
      </div>

      <div className="hud-corners border border-border bg-surface/40 backdrop-blur-sm">
        <div className="px-5 py-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-display text-sm tracking-widest neon-text-violet">{t("dash.cybers")}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {loading ? t("dash.loading") : `${filtered.length} / ${users.length}`}
            </div>
          </div>

          {/* Поиск — НЕ лагает благодаря debounce */}
          <input
            type="text"
            value={searchRaw}
            onChange={e => setSearchRaw(e.target.value)}
            placeholder={t("dash.search.placeholder")}
            className="w-full bg-background/40 border border-border px-3 py-2 font-mono text-xs outline-none focus:border-neon-cyan placeholder:text-muted-foreground/50 transition"
          />

          <div className="flex flex-wrap gap-2">
            {RANKS.map(r => (
              <button key={r} onClick={() => setFilter(r)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all ${
                  r === filter ? "neon-border-cyan neon-text-cyan" : "border-border text-muted-foreground hover:text-foreground"
                }`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center font-mono text-xs neon-text-cyan animate-pulse uppercase tracking-widest">
            {t("dash.loading")}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {users.length === 0 ? t("dash.empty") : t("dash.no_match")}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((c, i) => {
              const rank = rankFromXp(c.xp);
              const isMe = me?.id === c.id;
              return (
                <Link key={c.id} to="/profile" search={{ uid: c.id }}
                  className={`grid grid-cols-[40px_44px_1fr_140px_100px_90px] items-center px-5 py-3 text-sm transition-colors cursor-pointer group hover:bg-primary/5 ${
                    isMe ? "bg-primary/5 border-l-2 border-neon-cyan" : ""
                  }`}>
                  <div className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                  <div className="w-8 h-8 border border-border overflow-hidden bg-background/40 flex items-center justify-center">
                    {c.avatar_url
                      ? <img src={c.avatar_url} alt="" className="w-full h-full object-cover" />
                      : <span className="font-display text-sm neon-text-violet">{c.display_name[0]?.toUpperCase()}</span>
                    }
                  </div>
                  <div className="font-display tracking-wider group-hover:neon-text-cyan transition-colors pl-2 truncate">
                    @{c.display_name}
                    {isMe && <span className="ml-2 font-mono text-[10px] neon-text-acid">← {t("dash.you")}</span>}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground hidden sm:block">{rank}</div>
                  <div className="font-mono text-xs text-right tabular-nums">
                    <span className="neon-text-acid">{c.xp.toLocaleString("ru-RU")}</span>
                    <span className="text-muted-foreground ml-1 text-[10px]">{t("dash.px")}</span>
                  </div>
                  <div className={`font-mono text-[10px] uppercase tracking-widest text-right ${c.is_online ? "neon-text-acid" : "text-muted-foreground"}`}>
                    {c.is_online ? "● online" : "○ offline"}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {!me && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-6 p-4 border border-border/40 bg-surface/20 backdrop-blur text-center font-mono text-xs text-muted-foreground">
          <Link to="/" className="neon-text-cyan hover:underline">{t("dash.register_cta")}</Link>
          {" "}{t("dash.register_suffix")}
        </motion.div>
      )}
    </PageShell>
  );
}
