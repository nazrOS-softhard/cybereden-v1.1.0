import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Github, Twitch, Globe, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile/$userId")({
  head: () => ({ meta: [{ title: "Кибла кибера · nazrOS" }] }),
  component: PublicProfilePage,
});

const API = (import.meta.env.VITE_API_URL || "https://cybereden-v1-1-0.vercel.app").replace(/\/$/, "");

function LevelBadge({ level }: { level: number }) {
  return (
    <div className="relative flex items-center justify-center w-8 h-8 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none"
        style={{ stroke: "#FFD700", strokeWidth: "12px", filter: "drop-shadow(0 0 4px #FFD700)" }}>
        <polygon points="50,10 95,88 5,88" />
      </svg>
      <span className="absolute font-mono text-[11px] font-black text-[#8b5cf6] translate-y-[1px]"
        style={{ textShadow: "0 0 8px rgba(139,92,246,0.9)" }}>{level}</span>
    </div>
  );
}

function rankFromLevel(level: number): string {
  if (level >= 50) return "ГЛАВНЫЙ РАЗРАБОТЧИК";
  if (level >= 30) return "АРХИТЕКТОР ЯДРА";
  if (level >= 10) return "ОПЕРАТОР";
  return "НАБЛЮДАТЕЛЬ";
}

function PublicProfilePage() {
  const { userId } = Route.useParams();
  const { user: me } = useAuth();

  const [profileUser, setProfileUser] = useState<any>(null);
  const [loading,     setLoading]     = useState(true);
  const [notFound,    setNotFound]    = useState(false);

  // Если это мой профиль — редирект не нужен, но можно показать ссылку
  const isMyProfile = me?.id === userId;

  useEffect(() => {
    fetch(`${API}/api/users/${userId}`)
      .then(r => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then(d => { if (d?.user) setProfileUser(d.user); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return (
    <div className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan animate-pulse">
        Загрузка кибера...
      </div>
    </div>
  );

  if (notFound || !profileUser) return (
    <div className="relative z-10 flex min-h-screen items-center justify-center flex-col gap-4">
      <div className="font-display text-2xl neon-text-violet">Кибер не найден</div>
      <Link to="/dashboard" className="font-mono text-xs neon-text-cyan hover:underline">
        ← Вернуться в дашборд
      </Link>
    </div>
  );

  const rank      = rankFromLevel(profileUser.level || 0);
  const joined    = new Date(profileUser.created_at).toLocaleDateString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });

  const accounts = [
    { name: "GitHub",  handle: profileUser.github_username ? `@${profileUser.github_username}` : "Не подключен", icon: Github, connected: !!profileUser.github_username, href: profileUser.github_username ? `https://github.com/${profileUser.github_username}` : null },
    { name: "Twitch",  handle: profileUser.twitch_username ? `@${profileUser.twitch_username}` : "Не подключен", icon: Twitch, connected: !!profileUser.twitch_username, href: profileUser.twitch_username ? `https://twitch.tv/${profileUser.twitch_username}` : null },
    { name: "Darknet", handle: "Не подключен", icon: Globe, connected: false, href: null },
  ];

  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24">

      {/* Назад */}
      <Link to="/dashboard"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:neon-text-cyan transition mb-6">
        <ArrowLeft size={13} /> Дашборд
      </Link>

      {/* Если это мой профиль — подсказка */}
      {isMyProfile && (
        <div className="mb-4 px-4 py-2 border border-neon-acid/30 bg-neon-acid/5 font-mono text-xs neon-text-acid">
          Это твоя кибла. <Link to="/profile" className="underline">Перейти к управлению →</Link>
        </div>
      )}

      <div className="grid md:grid-cols-[320px_1fr] gap-8">

        {/* ── Левая колонка ─────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Аватар */}
          <div className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 border-2 border-neon-violet rounded-full overflow-hidden bg-background mx-auto"
                style={{ boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}>
                {profileUser.avatar_url
                  ? <img src={profileUser.avatar_url} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center font-display text-3xl neon-text-violet">
                      {(profileUser.display_name || "?")[0].toUpperCase()}
                    </div>
                }
              </div>
              {/* Online indicator */}
              {profileUser.is_online && (
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-neon-acid border-2 border-background" />
              )}
            </div>

            <div className="flex items-center justify-center gap-2 mb-1">
              <LevelBadge level={profileUser.level || 0} />
              <div className="font-display text-xl neon-text-violet">
                @{profileUser.display_name}
              </div>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              {rank}
            </div>
            {profileUser.is_online
              ? <span className="font-mono text-[10px] neon-text-acid">● Онлайн</span>
              : <span className="font-mono text-[10px] text-muted-foreground">○ Оффлайн</span>
            }
          </div>

          {/* Статистика */}
          <div className="hud-corners p-4 border border-border bg-surface/40 backdrop-blur space-y-2">
            {[
              { label: "ПХ",     value: (profileUser.xp || 0).toLocaleString("ru-RU") },
              { label: "Уровень", value: profileUser.level || 0 },
              { label: "Rank",   value: rank },
              { label: "Joined", value: joined },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center border-b border-border/30 pb-2 last:border-0 last:pb-0">
                <span className="font-mono text-xs text-muted-foreground">{row.label}</span>
                <span className="font-mono text-xs neon-text-cyan">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Аккаунты */}
          <div className="hud-corners border border-border bg-surface/40 backdrop-blur overflow-hidden">
            {accounts.map(acc => (
              <div key={acc.name}
                className="flex items-center justify-between px-4 py-3 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-2.5">
                  <acc.icon size={14} className={acc.connected ? "neon-text-cyan" : "text-muted-foreground/40"} />
                  <span className="font-mono text-xs text-muted-foreground">{acc.name}</span>
                </div>
                {acc.href ? (
                  <a href={acc.href} target="_blank" rel="noreferrer"
                    className="font-mono text-xs neon-text-acid hover:underline">
                    {acc.handle}
                  </a>
                ) : (
                  <span className={`font-mono text-xs ${acc.connected ? "neon-text-cyan" : "text-muted-foreground/40"}`}>
                    {acc.handle}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Правая колонка ────────────────────────────────────────────── */}
        <div className="space-y-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] neon-text-cyan mb-2">
              // КИБЛА КИБЕРА
            </div>
            <h1 className="font-display text-4xl neon-text-violet">
              @{profileUser.display_name}
            </h1>
          </div>

          {/* Investor badge */}
          {profileUser.is_investor && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-yellow-500/40 bg-yellow-500/10">
              <span className="font-mono text-xs neon-text-acid">◆ КВАЛИФИЦИРОВАННЫЙ ИНВЕСТОР nazrOS</span>
            </div>
          )}

          {/* Заглушки для блоков которые видны только владельцу */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Активы",       sub: "Приватно" },
              { label: "Знания",       sub: "Приватно" },
              { label: "Достижения",   sub: "Приватно" },
              { label: "Инвентарь",    sub: "Приватно" },
            ].map(b => (
              <div key={b.label}
                className="hud-corners p-4 border border-border/30 bg-surface/20 backdrop-blur opacity-50">
                <div className="font-display text-sm text-muted-foreground">{b.label}</div>
                <div className="font-mono text-[10px] text-muted-foreground/50 mt-1">{b.sub}</div>
              </div>
            ))}
          </div>

          {/* СИГНАЛ — когда подключим */}
          {/* <SignalChannel profileUserId={profileUser.id} profileUserName={profileUser.display_name} isOwnProfile={false} /> */}
        </div>
      </div>
    </motion.main>
  );
}
