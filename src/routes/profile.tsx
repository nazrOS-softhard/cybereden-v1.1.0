import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Trophy, Github, Twitch, Globe,
  ShoppingBag, Upload, BookOpen, Zap,
  Database, LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { DatacenterModal } from "@/components/DatacenterModal";
import { useAuth, startOAuth, apiPost, apiGet } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · nazrOS" },
      { name: "description", content: "Кибла кибера — личный кабинет." },
    ],
  }),
  component: ProfilePage,
});

const mockInventory = [
  { name: "cloN-001", tier: "S" },
  { name: "rostN-001", tier: "A" },
  { name: "piN-001", tier: "B" },
  { name: "visioN-001", tier: "S" },
];

const mockAchievements = [
  { name: "КиберХак 2026", date: "..." },
  { name: "РазрабКонф 2026", date: "..." },
];

const mockKnowledge = [
  { title: "KILLNET: Как хакерские группировки стали частью цифровой геополитики", progress: 85, xp: 1200, type: "Публикация" },
  { title: "TEAM YANDEX: Как корпорации заходят в цифровой спорт", progress: 60, xp: 800, type: "Интервью" },
  { title: "Архитектура нового доверия", progress: 45, xp: 600, type: "Алгоритм" },
];

// ─── Компонент предупреждения о связке аккаунтов ─────────────────────────────
function LinkAccountBanner({ user }: { user: any }) {
  const hasGithub = !!user.github_username;
  const hasTwitch = !!user.twitch_username;

  if (hasGithub && hasTwitch) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 border border-amber-500/30 bg-amber-500/10 backdrop-blur font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4 relative z-40"
    >
      <div className="flex items-center gap-3">
        <span className="text-amber-400 animate-pulse text-sm">⚠️</span>
        <div>
          <span className="text-amber-400 uppercase tracking-wider font-bold block">Синхронизация среды не завершена</span>
          <span className="text-muted-foreground text-[11px]">
            {!hasGithub && "Подключите GitHub для верификации репозиториев. "}
            {!hasTwitch && "Подключите Twitch для отслеживания трансляций и начисления ПХ."}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto justify-end">
        {!hasGithub && (
          <button 
            onClick={() => startOAuth("github", user.id)}
            className="px-3 py-1.5 border border-amber-500/50 hover:bg-amber-500/20 text-amber-300 uppercase tracking-widest text-[10px] transition font-bold"
          >
            + Link GitHub
          </button>
        )}
        {!hasTwitch && (
          <button 
            onClick={() => startOAuth("twitch", user.id)}
            className="px-3 py-1.5 border border-amber-500/50 hover:bg-amber-500/20 text-amber-300 uppercase tracking-widest text-[10px] transition font-bold"
          >
            + Link Twitch
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Страница не авторизована ─────────────────────────────────────────────────
function LoginRequired() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center hud-corners p-10 border border-border bg-surface/40 backdrop-blur"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] neon-text-cyan mb-3">
          Идентификация требуется
        </div>
        <h1 className="font-display text-3xl neon-text-violet mb-2">
          Кибла кибера
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Подключи GitHub и Twitch для доступа к личному кабинету,
          активам и системе ПХ.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => startOAuth("github")}
            className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-border hover:neon-border-cyan bg-background/60 font-display text-sm tracking-[0.2em] uppercase transition group w-full"
          >
            <Github size={18} className="group-hover:neon-text-cyan transition" />
            Войти через GitHub
          </button>
          <button
            onClick={() => startOAuth("twitch")}
            className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-border hover:neon-border bg-background/60 font-display text-sm tracking-[0.2em] uppercase transition group w-full"
          >
            <Twitch size={18} className="group-hover:neon-text-violet transition" />
            Войти через Twitch
          </button>
        </div>

        <div className="mt-6 font-mono text-[10px] text-muted-foreground">
           Необходимо подключить{" "}
          <span className="neon-text-cyan">оба аккаунта</span>{" "}
          для полного доступа
        </div>

        <div className="mt-4">
          <Link to="/" className="font-mono text-[10px] neon-text-acid hover:underline">
            ← Вернуться на главную
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Основная страница профиля ────────────────────────────────────────────────
function ProfilePage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [assets, setAssets]               = useState<any[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [datacenterOpen, setDatacenterOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user.avatar_url) setAvatarPreview(user.avatar_url);
    loadAssets();
  }, [user?.id]);

  async function loadAssets() {
    setAssetsLoading(true);
    try {
      const res = await apiGet("/api/upload/assets");
      if (res.ok) {
        const { assets: list } = await res.json();
        setAssets(list || []);
      }
    } finally {
      setAssetsLoading(false);
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4.5 * 1024 * 1024) { alert("Файл > 4.5 МБ"); return; }

    const form = new FormData();
    form.append("avatar", file);
    const res  = await apiPost("/api/upload/avatar", form);
    const data = await res.json();
    if (res.ok) setAvatarPreview(data.avatarUrl);
    else alert(`Ошибка: ${data.error}`);
  };

  const handleAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    const res  = await apiPost("/api/upload/asset", form);
    const data = await res.json();
    if (res.ok) setAssets(prev => [data.asset, ...prev]);
    else alert(`Ошибка: ${data.error}`);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  // ── Загрузка ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan animate-pulse">
          Загрузка кибера...
        </div>
      </div>
    );
  }

  // ── Не авторизован ────────────────────────────────────────────────────────────
  if (!user) return <LoginRequired />;

  // ── Авторизован ───────────────────────────────────────────────────────────────
  const joinedDate = new Date(user.created_at).toLocaleDateString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });

  const accounts = [
    {
      name: "GitHub",
      handle: user.github_username ? `@${user.github_username}` : "Не подключен",
      icon: Github,
      connected: !!user.github_username,
      onClick: () => !user.github_username && startOAuth("github", user.id),
    },
    {
      name: "Twitch",
      handle: user.twitch_username ? `@${user.twitch_username}` : "Не подключен",
      icon: Twitch,
      connected: !!user.twitch_username,
      onClick: () => !user.twitch_username && startOAuth("twitch", user.id),
    },
    {
      name: "Darknet",
      handle: "Не подключен",
      icon: Globe,
      connected: false,
      onClick: () => {},
    },
  ];

  return (
    <PageShell eyebrow={t("profile.eyebrow")} title={`@${user.display_name}`} subtitle={t("profile.subtitle")}>

      {/* Баннер предупреждения синхронизации аккаунтов */}
      <LinkAccountBanner user={user} />

      {/* Треугольник уровня */}
      <div className="absolute top-[200px] right-[830px] z-50 pointer-events-none scale-[2.0]">
        <div className="relative flex items-center justify-center w-5 h-5">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none"
            style={{ stroke: "#FFD700", strokeWidth: "14px", filter: "drop-shadow(0 0 4px #FFD700) drop-shadow(0 0 10px #FFA500)" }}>
            <polygon points="50,12 93,85 7,85" />
          </svg>
          <span className="absolute z-10 font-mono text-[10px] font-black text-[#8b5cf6] translate-y-[1px]"
            style={{ textShadow: "0 0 4px rgba(255,255,255,0.2), 0 0 8px rgba(139,92,246,0.8)" }}>
            {user.level}
          </span>
        </div>
      </div>

      {/* Выход */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 border border-border hover:border-red-500 hover:text-red-400 transition font-mono text-xs uppercase tracking-widest"
        >
          <LogOut size={12} />
          Выход
        </button>
      </div>

      <div className="relative grid lg:grid-cols-[280px_1fr] gap-6">

        {/* ── Аватар ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="hud-corners p-6 border border-border bg-surface/50 backdrop-blur"
        >
          <div className="relative aspect-square neon-border-cyan overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: avatarPreview
                  ? `url(${avatarPreview}) center/cover no-repeat`
                  : "radial-gradient(circle at 50% 35%, oklch(0.7 0.28 305 / 0.6), oklch(0.13 0.04 290) 70%)",
              }}
            />
            {!avatarPreview && (
              <>
                <div className="absolute inset-0 hud-grid opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center font-display text-7xl neon-text-violet">
                  {user.display_name?.[0]?.toUpperCase() ?? "?"}
                </div>
              </>
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="flex flex-col items-center gap-2 text-white">
                <Upload size={24} />
                <span className="text-xs">Загрузить аватар</span>
              </div>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
            <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex justify-between">
              <span className="truncate max-w-[140px]">id · {user.id.slice(0, 18)}…</span>
              <span className="neon-text-acid">● online</span>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ПХ</span>
              <span className="neon-text-cyan">{user.xp.toLocaleString("ru-RU")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rank</span>
              <span className="neon-text-violet">Оператор</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span>{joinedDate}</span>
            </div>
          </div>
        </motion.div>

        {/* ── Правая колонка ────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Подключённые аккаунты */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <div className="font-display text-sm tracking-widest neon-text-violet mb-4">
              {t("profile.accounts")}
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {accounts.map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.name}
                    onClick={a.onClick}
                    className={`flex items-center gap-3 p-3 border transition text-left ${
                      a.connected
                        ? "border-border bg-background/40 cursor-default"
                        : "border-border bg-background/20 hover:border-neon-cyan cursor-pointer"
                    }`}
                  >
                    <Icon size={18} className={a.connected ? "neon-text-cyan" : "text-muted-foreground"} />
                    <div>
                      <div className="font-display text-xs uppercase tracking-widest">{a.name}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{a.handle}</div>
                    </div>
                    {a.connected && <div className="w-2 h-2 rounded-full bg-neon-acid animate-pulse ml-auto" />}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Инвентарь */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={14} className="neon-text-cyan" />
                  <span className="font-display text-sm tracking-widest neon-text-violet">{t("profile.inventory")}</span>
                </div>
                <Link to="/market" className="text-[10px] neon-text-acid hover:underline uppercase tracking-widest">Перейти →</Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {mockInventory.map((it) => (
                  <div key={it.name} className="relative p-3 border border-border bg-background/40 hover:neon-border transition">
                    <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center font-display text-xs neon-text-acid border border-neon-acid">
                      {it.tier}
                    </div>
                    <div className="font-display text-xs pr-8">{it.name}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Достижения */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="neon-text-acid" />
                  <span className="font-display text-sm tracking-widest neon-text-violet">{t("profile.achievements")}</span>
                </div>
                <Link to="/events" className="text-[10px] neon-text-acid hover:underline uppercase tracking-widest">События →</Link>
              </div>
              <ul className="divide-y divide-border">
                {mockAchievements.map((a) => (
                  <li key={a.name} className="py-2 flex justify-between text-xs">
                    <span className="font-display">{a.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{a.date}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Активы */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setDatacenterOpen(true)}>
                <Zap size={14} className="neon-text-cyan group-hover:neon-text-acid transition" />
                <span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">АКТИВЫ</span>
              </div>
              <button onClick={() => setDatacenterOpen(true)} className="flex items-center gap-1 text-[10px] neon-text-acid hover:neon-text-cyan transition uppercase tracking-widest">
                <Database size={12} /> Датацентр
              </button>
            </div>
            <div className="space-y-3">
              {assetsLoading && <div className="font-mono text-xs text-muted-foreground animate-pulse">Загрузка активов…</div>}
              {!assetsLoading && assets.length === 0 && (
                <div className="font-mono text-xs text-muted-foreground">Активы не загружены</div>
              )}
              {assets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-3 border border-border bg-background/40 hover:neon-border transition">
                  <div>
                    <div className="font-display text-sm">{asset.file_name}</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {asset.file_size ? `${(asset.file_size / 1024 / 1024).toFixed(1)} MB` : "—"}
                    </div>
                  </div>
                  {asset.url && (
                    <a href={asset.url} target="_blank" rel="noreferrer" className="font-mono text-xs neon-text-acid hover:underline">
                      Скачать
                    </a>
                  )}
                </div>
              ))}
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border hover:border-neon-cyan transition cursor-pointer group">
                <Upload size={16} className="neon-text-cyan group-hover:neon-text-acid transition" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:neon-text-cyan">
                  Загрузить файл
                </span>
                <input type="file" onChange={handleAssetUpload} className="hidden" />
              </label>
            </div>
          </section>

          {/* Знания */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <Link to="/journal" className="flex items-center gap-2 mb-4 cursor-pointer group">
              <BookOpen size={14} className="neon-text-cyan group-hover:neon-text-acid transition" />
              <span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">ЗНАНИЯ</span>
              <span className="ml-auto text-[10px] neon-text-acid group-hover:underline">Перейти →</span>
            </Link>
            <div className="space-y-4">
              {mockKnowledge.map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-display text-sm">{item.title}</div>
                      <div className="font-mono text-xs text-muted-foreground">{item.type}</div>
                    </div>
                    <div className="font-mono text-xs neon-text-acid whitespace-nowrap">+{item.xp} ПХ</div>
                  </div>
                  <div className="w-full bg-background/40 border border-border h-2">
                    <div className="bg-neon-cyan h-full transition-all" style={{ width: `${item.progress}%` }} />
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">{item.progress}% завершено</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <DatacenterModal open={datacenterOpen} onClose={() => setDatacenterOpen(false)} />
    </PageShell>
  );
}
