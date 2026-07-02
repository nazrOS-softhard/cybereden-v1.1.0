import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { rankFromXp } from "@/lib/ranks";
import { motion } from "framer-motion";
import {
  Github, Twitch, Globe, Upload, LogOut,
  Check, X, Pencil, ShoppingBag, Trophy, BookOpen, Zap, Database,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { DatacenterModal }    from "@/components/DatacenterModal";
import { KnowledgeModal }     from "@/components/KnowledgeModal";
import { AchievementsModal }  from "@/components/AchievementsModal";
import { InventoryModal }     from "@/components/InventoryModal";
import { useAuth, startOAuth, apiPost, apiPatch, apiGet, apiUpload } from "@/lib/auth";
import { SignalChannel } from "@/components/SignalChannel";

export const Route = createFileRoute("/profile")({
  validateSearch: (search: Record<string, unknown>) => ({
    uid: typeof search.uid === "string" ? search.uid : undefined,
  }),
  head: () => ({ meta: [{ title: "Кибла кибера · nazrOS" }] }),
  component: ProfilePage,
});

const API = (import.meta.env.VITE_API_URL || "https://cybereden-v1-1-0.vercel.app").replace(/\/$/, "");

// ── Значок инвестора ──────────────────────────────────────────────────────────
function InvestorBadge() {
  return (
    <span title="Квалифицированный инвестор nazrOS"
      className="inline-flex items-center gap-1 px-2 py-0.5 border border-yellow-500/60 bg-yellow-500/10 font-mono text-[9px] uppercase tracking-widest neon-text-acid select-none">
      ◆ ИНВЕСТ
    </span>
  );
}

// ── Треугольник уровня ────────────────────────────────────────────────────────
function LevelBadge({ level }: { level: number }) {
  return (
    <div className="relative flex items-center justify-center w-8 h-8 flex-shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none"
        style={{ stroke: "#FFD700", strokeWidth: "12px", filter: "drop-shadow(0 0 4px #FFD700) drop-shadow(0 0 10px #FFA500)" }}>
        <polygon points="50,10 95,88 5,88" />
      </svg>
      <span className="absolute font-mono text-[11px] font-black text-[#8b5cf6] translate-y-[1px]"
        style={{ textShadow: "0 0 8px rgba(139,92,246,0.9)" }}>{level}</span>
    </div>
  );
}

// ── Редактируемый никнейм ─────────────────────────────────────────────────────
function EditableNickname({ initial, onSaved }: { initial: string; onSaved: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value,   setValue]   = useState(initial);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);
  useEffect(() => { setValue(initial); }, [initial]);

  const save = async () => {
    const trimmed = value.trim().slice(0, 30);
    if (!trimmed || trimmed === initial) { cancel(); return; }
    setSaving(true); setError(null);
    try {
      const res = await apiPatch("/api/profile", { display_name: trimmed });
      if (res.ok) { onSaved(trimmed); setEditing(false); }
      else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || `HTTP ${res.status}`);
      }
    } catch (e: any) { setError(e.message || "Нет соединения"); }
    finally { setSaving(false); }
  };

  const cancel = () => { setValue(initial); setEditing(false); setError(null); };

  if (editing) return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="font-display text-3xl md:text-4xl neon-text-violet">@</span>
        <input ref={ref} value={value}
          onChange={e => { setValue(e.target.value); setError(null); }}
          onKeyDown={e => { if (e.key === "Enter") save(); if (e.key === "Escape") cancel(); }}
          maxLength={30} disabled={saving}
          className="font-display text-3xl md:text-4xl neon-text-violet bg-transparent border-b-2 border-neon-cyan outline-none disabled:opacity-50 min-w-[120px]"
          style={{ width: `${Math.max(value.length, 5) + 1}ch` }}
        />
        <button onClick={save} disabled={saving} className="p-1.5 border border-neon-cyan hover:bg-neon-cyan/10 transition disabled:opacity-40"><Check size={16} className="neon-text-cyan" /></button>
        <button onClick={cancel} disabled={saving} className="p-1.5 border border-border hover:border-red-500 hover:text-red-400 transition disabled:opacity-40"><X size={16} /></button>
      </div>
      {saving && <div className="font-mono text-[10px] text-muted-foreground animate-pulse pl-8">Сохранение…</div>}
      {error  && <div className="font-mono text-[10px] text-red-400 pl-8">{error}</div>}
    </div>
  );

  return (
    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setEditing(true)}>
      <h1 className="font-display text-3xl md:text-4xl neon-text-violet">@{initial}</h1>
      <Pencil size={14} className="text-muted-foreground group-hover:neon-text-cyan transition opacity-0 group-hover:opacity-100" />
    </div>
  );
}

// ── Экран входа ───────────────────────────────────────────────────────────────
function LoginRequired() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center hud-corners p-10 border border-border bg-surface/40 backdrop-blur">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] neon-text-cyan mb-3">Идентификация требуется</div>
        <h1 className="font-display text-3xl neon-text-violet mb-2">Кибла кибера</h1>
        <p className="text-sm text-muted-foreground mb-8">Подключи GitHub и Twitch для доступа к личному кабинету.</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => startOAuth("github")} className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-border hover:neon-border-cyan bg-background/60 font-display text-sm tracking-[0.2em] uppercase transition group w-full">
            <Github size={18} className="group-hover:neon-text-cyan transition" /> Войти через GitHub
          </button>
          <button onClick={() => startOAuth("twitch")} className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-border hover:neon-border bg-background/60 font-display text-sm tracking-[0.2em] uppercase transition group w-full">
            <Twitch size={18} className="group-hover:neon-text-violet transition" /> Войти через Twitch
          </button>
        </div>
        <Link to="/" className="mt-4 inline-block font-mono text-[10px] neon-text-acid hover:underline">← Главная</Link>
      </motion.div>
    </div>
  );
}

function LinkAccountBanner({ user }: { user: any }) {
  const need = !user.github_username ? "github" : !user.twitch_username ? "twitch" : null;
  if (!need) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex items-center justify-between gap-4 p-4 border border-yellow-500/40 bg-yellow-500/10">
      <div>
        <div className="font-display tracking-widest text-xs neon-text-acid mb-1">⚠ СИНХРОНИЗАЦИЯ СРЕДЫ НЕ ЗАВЕРШЕНА</div>
        <p className="font-mono text-xs text-muted-foreground">Подключите {need === "github" ? "GitHub" : "Twitch"} для начисления ПХ.</p>
      </div>
      <button onClick={() => startOAuth(need as any, user.id)}
        className="whitespace-nowrap px-4 py-2 border border-yellow-500/50 hover:border-neon-cyan font-display text-xs tracking-widest uppercase transition flex items-center gap-2">
        {need === "github" ? <Github size={14} /> : <Twitch size={14} />}
        + Link {need === "github" ? "GitHub" : "Twitch"}
      </button>
    </motion.div>
  );
}

// ── Публичный профиль (только просмотр) ──────────────────────────────────────
function PublicProfileView({ profileUser }: { profileUser: any }) {
  const joined = new Date(profileUser.created_at).toLocaleDateString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
  const rank = rankFromXp(profileUser.xp || 0);

  // Публичные данные кибера
  const [assets,       setAssets]       = useState<any[]>([]);
  const [knowledge,    setKnowledge]    = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [inventory,    setInventory]    = useState<any[]>([]);
  const [loadingData,  setLoadingData]  = useState(true);

  // Модалы
  const [datacenterOpen,   setDatacenterOpen]   = useState(false);
  const [knowledgeOpen,    setKnowledgeOpen]    = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [inventoryOpen,    setInventoryOpen]    = useState(false);

  const API_URL = (import.meta.env.VITE_API_URL || "https://cybereden-v1-1-0.vercel.app").replace(/\/$/, "");

  useEffect(() => {
    // Загружаем публичные данные пользователя
    Promise.all([
      fetch(`${API_URL}/api/upload/assets?user_id=${profileUser.id}`).then(r => r.ok ? r.json() : { assets: [] }).then(d => setAssets(d.assets || [])),
      fetch(`${API_URL}/api/knowledge/progress?user_id=${profileUser.id}`).then(r => r.ok ? r.json() : { items: [] }).then(d => setKnowledge(d.items || [])),
      fetch(`${API_URL}/api/achievements?user_id=${profileUser.id}`).then(r => r.ok ? r.json() : { achievements: [] }).then(d => setAchievements(d.achievements || [])),
      fetch(`${API_URL}/api/inventory?user_id=${profileUser.id}`).then(r => r.ok ? r.json() : { items: [] }).then(d => setInventory(d.items || [])),
    ]).catch(() => {}).finally(() => setLoadingData(false));
  }, [profileUser.id]);

  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24">
      <Link to="/dashboard"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:neon-text-cyan transition mb-6">
        ← Дашборд
      </Link>

      {/* Заголовок */}
      <header className="mb-6 hud-corners relative p-6 border border-border bg-surface/30 backdrop-blur-sm">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan mb-2">// КИБЛА КИБЕРА</div>
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-3xl neon-text-violet">@{profileUser.display_name}</h1>
            {profileUser.is_investor && (
              <span className="px-2 py-0.5 border border-yellow-500/40 bg-yellow-500/10 font-mono text-xs neon-text-acid">◆ ИНВЕСТ</span>
            )}
          </div>
          <span className={`font-mono text-xs ${profileUser.is_online ? "neon-text-acid" : "text-muted-foreground"}`}>
            {profileUser.is_online ? "● ONLINE" : "○ OFFLINE"}
          </span>
        </div>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">

        {/* Левая колонка */}
        <div className="space-y-4">
          {/* Аватар */}
          <div className="hud-corners p-6 border border-border bg-surface/50 backdrop-blur text-center">
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
              {profileUser.is_online && (
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-neon-acid border-2 border-background" />
              )}
            </div>
            <div className="font-display text-xl neon-text-violet mb-1">@{profileUser.display_name}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{rank}</div>
          </div>

          {/* Статы */}
          <div className="hud-corners p-4 border border-border bg-surface/40 backdrop-blur space-y-2">
            {[
              { label: "ПХ",      value: (profileUser.xp || 0).toLocaleString("ru-RU") },
              { label: "Rank",    value: rank },
              { label: "Joined",  value: joined },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center border-b border-border/30 pb-2 last:border-0 last:pb-0">
                <span className="font-mono text-xs text-muted-foreground">{row.label}</span>
                <span className="font-mono text-xs neon-text-cyan">{String(row.value)}</span>
              </div>
            ))}
          </div>

          {/* Аккаунты */}
          <div className="hud-corners border border-border bg-surface/40 backdrop-blur overflow-hidden">
            <div className="px-4 py-2 border-b border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Подключённые аккаунты
            </div>
            {[
              { name: "GitHub",  handle: profileUser.github_username ? `@${profileUser.github_username}` : "—", href: profileUser.github_username ? `https://github.com/${profileUser.github_username}` : null },
              { name: "Twitch",  handle: profileUser.twitch_username ? `@${profileUser.twitch_username}` : "—", href: profileUser.twitch_username ? `https://twitch.tv/${profileUser.twitch_username}` : null },
            ].map(acc => (
              <div key={acc.name} className="flex items-center justify-between px-4 py-3 border-b border-border/40 last:border-0">
                <span className="font-mono text-xs text-muted-foreground">{acc.name}</span>
                {acc.href
                  ? <a href={acc.href} target="_blank" rel="noreferrer" className="font-mono text-xs neon-text-acid hover:underline">{acc.handle}</a>
                  : <span className="font-mono text-xs text-muted-foreground/40">{acc.handle}</span>
                }
              </div>
            ))}
          </div>

          {/* СИГНАЛ */}
          <SignalChannel
            profileUserId={profileUser.id}
            profileUserName={profileUser.display_name}
            isOwnProfile={false}
          />
        </div>

        {/* Правая колонка */}
        <div className="space-y-4">

          {/* Инвентарь */}
          <button onClick={() => setInventoryOpen(true)}
            className="w-full hud-corners p-4 border border-border bg-surface/40 backdrop-blur text-left hover:neon-border transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs neon-text-cyan uppercase tracking-widest">
                <ShoppingBag size={14} /> Инвентарь
              </div>
              <span className="font-mono text-xs text-muted-foreground">{inventory.length} предм. →</span>
            </div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">
              {inventory.length > 0 ? `${inventory.length} устройств nazrOS` : "Инвентарь пуст"}
            </div>
          </button>

          {/* Достижения */}
          <button onClick={() => setAchievementsOpen(true)}
            className="w-full hud-corners p-4 border border-border bg-surface/40 backdrop-blur text-left hover:neon-border transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs neon-text-acid uppercase tracking-widest">
                <Trophy size={14} /> Достижения
              </div>
              <span className="font-mono text-xs text-muted-foreground">{achievements.length} →</span>
            </div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">
              {achievements.length > 0 ? `${achievements.length} достижений` : "Нет достижений"}
            </div>
          </button>

          {/* Знания */}
          <button onClick={() => setKnowledgeOpen(true)}
            className="w-full hud-corners p-4 border border-border bg-surface/40 backdrop-blur text-left hover:neon-border transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs neon-text-violet uppercase tracking-widest">
                <BookOpen size={14} /> Знания
              </div>
              <span className="font-mono text-xs text-muted-foreground">Все ({knowledge.length}) →</span>
            </div>
            <div className="mt-2 space-y-1">
              {knowledge.slice(0, 3).map((k: any) => (
                <div key={k.id} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground truncate max-w-[60%]">{k.title || k.article_id}</span>
                  <span className="font-mono text-[10px] neon-text-cyan">{Math.round(k.progress || 0)}%</span>
                </div>
              ))}
            </div>
          </button>

          {/* Датацентр — все файлы этого кибера */}
          <button onClick={() => setDatacenterOpen(true)}
            className="w-full hud-corners p-4 border border-border bg-surface/40 backdrop-blur text-left hover:neon-border transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                <Database size={14} /> Датацентр
              </div>
              <span className="font-mono text-xs text-muted-foreground">{assets.length} файлов →</span>
            </div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">
              {assets.length > 0 ? `${assets.length} загруженных файлов` : "Нет файлов"}
            </div>
          </button>
        </div>
      </div>

      {/* Модалы (readonly — передаём userId чужого кибера) */}
      <DatacenterModal  open={datacenterOpen}   onClose={() => setDatacenterOpen(false)}   userId={profileUser.id} readonly />
      <KnowledgeModal   open={knowledgeOpen}    onClose={() => setKnowledgeOpen(false)}    userId={profileUser.id} readonly />
      <AchievementsModal open={achievementsOpen} onClose={() => setAchievementsOpen(false)} userId={profileUser.id} readonly />
      <InventoryModal   open={inventoryOpen}    onClose={() => setInventoryOpen(false)}    userId={profileUser.id} readonly />
    </motion.main>
  );
}

// ── Основная страница ─────────────────────────────────────────────────────────
function ProfilePage() {
  const { t }    = useI18n();
  const navigate = useNavigate();
  const { user, loading, logout, refreshUser } = useAuth();
  const { uid }  = Route.useSearch();

  // Если uid передан и это не мой профиль — грузим чужой
  const [publicUser,    setPublicUser]    = useState<any>(null);
  const [publicLoading, setPublicLoading] = useState(false);

  useEffect(() => {
    if (!uid || uid === user?.id) { setPublicUser(null); return; }
    setPublicLoading(true);
    fetch(`${API}/api/users/${uid}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => setPublicUser(d?.user ?? null))
      .catch(() => setPublicUser(null))
      .finally(() => setPublicLoading(false));
  }, [uid, user?.id]);

  // Показываем публичный профиль если uid чужой
  if (uid && uid !== user?.id) {
    if (publicLoading) return (
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan animate-pulse">Загрузка кибера...</div>
      </div>
    );
    if (!publicUser) return (
      <div className="relative z-10 flex min-h-screen items-center justify-center flex-col gap-4">
        <div className="font-display text-2xl neon-text-violet">Кибер не найден</div>
        <Link to="/dashboard" className="font-mono text-xs neon-text-cyan hover:underline">← Дашборд</Link>
      </div>
    );
    return <PublicProfileView profileUser={publicUser} />;
  }

  const [displayName,    setDisplayName]    = useState("");
  const [avatarPreview,  setAvatarPreview]  = useState<string | null>(null);
  const [nxCode,         setNxCode]         = useState<string | null>(null);

  // Реальные данные из API
  const [assets,         setAssets]         = useState<any[]>([]);
  const [knowledgeItems, setKnowledgeItems] = useState<any[]>([]);
  const [achieveCount,   setAchieveCount]   = useState<number | null>(null);
  const [inventoryCount, setInventoryCount] = useState<number | null>(null);

  // Модалы
  const [datacenterOpen,   setDatacenterOpen]   = useState(false);
  const [knowledgeOpen,    setKnowledgeOpen]    = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [inventoryOpen,    setInventoryOpen]    = useState(false);

  useEffect(() => {
    if (!user) return;
    setDisplayName(user.display_name);
    if (user.avatar_url) setAvatarPreview(user.avatar_url);

    // Загружаем все данные параллельно
    Promise.all([
      apiGet("/api/upload/assets").then(r => r.ok ? r.json() : { assets: [] }).then(d => setAssets(d.assets || [])),
      apiGet("/api/knowledge/progress").then(r => r.ok ? r.json() : { items: [] }).then(d => setKnowledgeItems(d.items || [])),
      apiGet("/api/achievements").then(r => r.ok ? r.json() : { achievements: [] }).then(d => setAchieveCount((d.achievements || []).length)),
      apiGet("/api/inventory").then(r => r.ok ? r.json() : { items: [] }).then(d => setInventoryCount((d.items || []).length)),
      // NX код если инвестпул
      (user as any).is_investor
        ? apiGet("/api/profile/nx-code").then(r => r.ok ? r.json() : {}).then(d => setNxCode(d.nx_code || null))
        : Promise.resolve(),
    ]).catch(() => {});
  }, [user?.id]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4.5 * 1024 * 1024) { alert("Файл > 4.5 МБ"); return; }
    const form = new FormData(); form.append("avatar", file);
    try {
      const res = await apiUpload("/api/upload/avatar", form);
      const d   = await res.json();
      if (res.ok) { setAvatarPreview(d.avatarUrl); refreshUser(); }
      else alert(`Ошибка: ${d.error}`);
    } catch (e: any) { alert(e.message); }
  };

  const handleAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData(); form.append("file", file);
    try {
      const res = await apiUpload("/api/upload/asset", form);
      const d   = await res.json();
      if (res.ok) { setAssets(prev => [d.asset, ...prev]); }
      else alert(`Ошибка: ${d.error}`);
    } catch (e: any) { alert(e.message); }
  };

  const handleLogout = () => { logout(); navigate({ to: "/" }); };

  if (loading) return (
    <div className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan animate-pulse">Загрузка кибера...</div>
    </div>
  );
  if (!user) return <LoginRequired />;

  const joinedDate  = new Date(user.created_at).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
  const isInvestor  = !!(user as any).is_investor;

  const accounts = [
    { name: "GitHub",  handle: user.github_username ? `@${user.github_username}` : "Не подключен", icon: Github,  connected: !!user.github_username, onClick: () => !user.github_username && startOAuth("github", user.id) },
    { name: "Twitch",  handle: user.twitch_username ? `@${user.twitch_username}` : "Не подключен", icon: Twitch,  connected: !!user.twitch_username, onClick: () => !user.twitch_username && startOAuth("twitch", user.id) },
    { name: "Darknet", handle: "Не подключен", icon: Globe, connected: false, onClick: () => {} },
  ];

  return (
    <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-24 pb-24">

      {/* Заголовок */}
      <header className="mb-6 hud-corners relative p-6 border border-border bg-surface/30 backdrop-blur-sm">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan mb-2">{t("profile.eyebrow")}</div>
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <EditableNickname initial={displayName} onSaved={v => { setDisplayName(v); refreshUser(); }} />
            <LevelBadge level={user.level} />
            {isInvestor && <InvestorBadge />}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 border border-border hover:border-red-500 hover:text-red-400 transition font-mono text-xs uppercase tracking-widest">
            <LogOut size={12} /> Выход
          </button>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{t("profile.subtitle")}</div>
      </header>

      <LinkAccountBanner user={user} />

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">

        {/* Аватар */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          className="hud-corners p-6 border border-border bg-surface/50 backdrop-blur">
          <div className="relative aspect-square neon-border-cyan overflow-hidden">
            <div className="absolute inset-0" style={{
              background: avatarPreview
                ? `url(${avatarPreview}) center/cover no-repeat`
                : "radial-gradient(circle at 50% 35%, oklch(0.7 0.28 305/0.6), oklch(0.13 0.04 290) 70%)",
            }} />
            {!avatarPreview && (
              <>
                <div className="absolute inset-0 hud-grid opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center font-display text-7xl neon-text-violet">
                  {displayName?.[0]?.toUpperCase() ?? "?"}
                </div>
              </>
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="flex flex-col items-center gap-2 text-white"><Upload size={24} /><span className="text-xs">Загрузить аватар</span></div>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
            <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex justify-between">
              <span className="truncate max-w-[140px]">id · {user.id.slice(0, 14)}…</span>
              <span className="neon-text-acid">● online</span>
            </div>
          </div>

          <div className="mt-4 space-y-1.5 text-sm font-mono">
            <div className="flex justify-between"><span className="text-muted-foreground">ПХ</span><span className="neon-text-cyan">{user.xp.toLocaleString("ru-RU")}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Rank</span><span className="neon-text-violet">{rankFromXp(user?.xp || 0)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span>{joinedDate}</span></div>

            {/* NX код инвестора */}
            {isInvestor && nxCode && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">NX · код</div>
                <div className="font-mono text-xs neon-text-acid tracking-widest select-all" title="Ваш уникальный NX-код">
                  {nxCode}
                </div>
              </div>
            )}
            {isInvestor && !nxCode && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="font-mono text-[9px] text-muted-foreground animate-pulse">NX · загрузка…</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Правая колонка */}
        <div className="space-y-6">

          {/* Аккаунты */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <div className="font-display text-sm tracking-widest neon-text-violet mb-4">{t("profile.accounts")}</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {accounts.map(a => { const Icon = a.icon; return (
                <button key={a.name} onClick={a.onClick}
                  className={`flex items-center gap-3 p-3 border transition text-left ${a.connected ? "border-border bg-background/40 cursor-default" : "border-border bg-background/20 hover:border-neon-cyan cursor-pointer"}`}>
                  <Icon size={18} className={a.connected ? "neon-text-cyan" : "text-muted-foreground"} />
                  <div>
                    <div className="font-display text-xs uppercase tracking-widest">{a.name}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{a.handle}</div>
                  </div>
                  {a.connected && <div className="w-2 h-2 rounded-full bg-neon-acid animate-pulse ml-auto" />}
                </button>
              ); })}
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Инвентарь */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur cursor-pointer hover:neon-border transition group" onClick={() => setInventoryOpen(true)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><ShoppingBag size={14} className="neon-text-cyan group-hover:neon-text-acid transition" /><span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">{t("profile.inventory")}</span></div>
                <span className="text-[10px] neon-text-acid">{inventoryCount !== null ? `${inventoryCount} предм.` : ""} →</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {inventoryCount === 0 ? "Нет приобретённых предметов" : inventoryCount === null ? "Загрузка…" : `${inventoryCount} предм. · нажми чтобы открыть`}
              </div>
            </section>

            {/* Достижения */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur cursor-pointer hover:neon-border transition group" onClick={() => setAchievementsOpen(true)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><Trophy size={14} className="neon-text-acid group-hover:neon-text-cyan transition" /><span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">{t("profile.achievements")}</span></div>
                <span className="text-[10px] neon-text-acid">{achieveCount !== null ? `${achieveCount} событий` : ""} →</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {achieveCount === 0 ? "Нет посещённых мероприятий" : achieveCount === null ? "Загрузка…" : `${achieveCount} достижений · нажми чтобы открыть`}
              </div>
            </section>
          </div>

          {/* ── СИГНАЛ — голосовой канал (только для своего профиля) ── */}
          {user && (
            <SignalChannel
              profileUserId={user.id}
              profileUserName={user.display_name}
              isOwnProfile={true}
            />
          )}

          {/* АКТИВЫ — инлайн список последних 3 файлов */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setDatacenterOpen(true)}>
                <Zap size={14} className="neon-text-cyan group-hover:neon-text-acid transition" />
                <span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">АКТИВЫ</span>
              </div>
              <button onClick={() => setDatacenterOpen(true)} className="flex items-center gap-1 text-[10px] neon-text-acid hover:neon-text-cyan transition uppercase tracking-widest">
                <Database size={12} /> Датацентр ({assets.length})
              </button>
            </div>

            <div className="space-y-2">
              {assets.length === 0 ? (
                <div className="font-mono text-xs text-muted-foreground">Активы не загружены</div>
              ) : (
                <>
                  {assets.slice(0, 3).map(asset => (
                    <div key={asset.id} className="flex items-center justify-between p-3 border border-border bg-background/40 hover:neon-border transition group">
                      <div className="min-w-0">
                        <div className="font-display text-sm truncate">{asset.file_name}</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {asset.file_type?.toUpperCase()} · {asset.file_size ? `${(asset.file_size / 1024 / 1024).toFixed(1)} MB` : "—"}
                        </div>
                      </div>
                      {asset.url && (
                        <a href={asset.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="font-mono text-xs neon-text-acid hover:underline whitespace-nowrap ml-3 flex-shrink-0">
                          Скачать
                        </a>
                      )}
                    </div>
                  ))}
                  {assets.length > 3 && (
                    <button onClick={() => setDatacenterOpen(true)}
                      className="w-full text-center font-mono text-[10px] text-muted-foreground hover:neon-text-cyan transition py-1.5 border border-border/30 hover:border-neon-cyan/30">
                      + ещё {assets.length - 3} файлов в датацентре
                    </button>
                  )}
                </>
              )}

              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border hover:border-neon-cyan transition cursor-pointer group mt-2">
                <Upload size={16} className="neon-text-cyan group-hover:neon-text-acid transition" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:neon-text-cyan">Загрузить файл</span>
                <input type="file" onChange={handleAssetUpload} className="hidden" />
              </label>
            </div>
          </section>

          {/* ЗНАНИЯ — инлайн последние 3 + кнопки */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="neon-text-cyan" />
                <span className="font-display text-sm tracking-widest neon-text-violet">ЗНАНИЯ</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setKnowledgeOpen(true)} className="text-[10px] neon-text-acid hover:neon-text-cyan transition uppercase tracking-widest">
                  Все ({knowledgeItems.length}) →
                </button>
                <Link to="/journal" className="text-[10px] text-muted-foreground hover:neon-text-cyan transition uppercase tracking-widest">
                  Журнал →
                </Link>
              </div>
            </div>

            {knowledgeItems.length === 0 ? (
              <div className="font-mono text-xs text-muted-foreground">
                Открой публикацию в <Link to="/journal" className="neon-text-acid hover:underline">Журнале</Link> — прогресс сохранится здесь
              </div>
            ) : (
              <div className="space-y-4">
                {knowledgeItems.slice(0, 3).map((item: any) => {
                  const pct = Math.min(100, Math.round(item.progress));
                  return (
                    <div key={item.id} className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <div className="font-display text-sm truncate">{item.title}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">{item.type}</div>
                        </div>
                        <div className="font-mono text-xs neon-text-acid whitespace-nowrap">+{item.earned_xp} ПХ</div>
                      </div>
                      <div className="w-full bg-background/40 border border-border h-1.5">
                        <div className="bg-neon-cyan h-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">{pct}% завершено</div>
                    </div>
                  );
                })}
                {knowledgeItems.length > 3 && (
                  <button onClick={() => setKnowledgeOpen(true)}
                    className="w-full text-center font-mono text-[10px] text-muted-foreground hover:neon-text-cyan transition py-1 border border-border/30 hover:border-neon-cyan/30">
                    + ещё {knowledgeItems.length - 3} материалов
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      <DatacenterModal   open={datacenterOpen}   onClose={() => setDatacenterOpen(false)} />
      <KnowledgeModal    open={knowledgeOpen}    onClose={() => setKnowledgeOpen(false)} />
      <AchievementsModal open={achievementsOpen} onClose={() => setAchievementsOpen(false)} />
      <InventoryModal    open={inventoryOpen}    onClose={() => setInventoryOpen(false)} />
    </motion.main>
  );
}
