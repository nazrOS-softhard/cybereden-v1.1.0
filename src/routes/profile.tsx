import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { useAuth, startOAuth, apiPost, apiPatch, apiGet } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Кибла кибера · nazrOS" }] }),
  component: ProfilePage,
});

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
function EditableNickname({ userId, initial, onSaved }: {
  userId: string; initial: string; onSaved: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value,   setValue]   = useState(initial);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);
  useEffect(() => { setValue(initial); }, [initial]);

  const save = async () => {
    const trimmed = value.trim().slice(0, 30);
    if (!trimmed || trimmed === initial) { cancel(); return; }
    setSaving(true); setError(null);
    try {
      const res = await apiPatch("/api/profile", { display_name: trimmed });
      if (res.ok) { onSaved(trimmed); setEditing(false); }
      else {
        const d = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        setError(d.error || "Ошибка сохранения");
      }
    } catch (err: any) {
      setError(err.message || "Нет соединения с сервером");
    } finally { setSaving(false); }
  };

  const cancel = () => { setValue(initial); setEditing(false); setError(null); };

  if (editing) return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="font-display text-3xl md:text-4xl neon-text-violet">@</span>
        <input ref={inputRef} value={value}
          onChange={e => { setValue(e.target.value); setError(null); }}
          onKeyDown={e => { if (e.key === "Enter") save(); if (e.key === "Escape") cancel(); }}
          maxLength={30} disabled={saving}
          className="font-display text-3xl md:text-4xl neon-text-violet bg-transparent border-b-2 border-neon-cyan outline-none disabled:opacity-50 min-w-[120px]"
          style={{ width: `${Math.max(value.length, 5) + 1}ch` }}
        />
        <button onClick={save} disabled={saving} className="p-1.5 border border-neon-cyan hover:bg-neon-cyan/10 transition disabled:opacity-40">
          <Check size={16} className="neon-text-cyan" />
        </button>
        <button onClick={cancel} disabled={saving} className="p-1.5 border border-border hover:border-red-500 hover:text-red-400 transition disabled:opacity-40">
          <X size={16} />
        </button>
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
        <p className="text-sm text-muted-foreground mb-8">Подключи GitHub и Twitch для доступа к личному кабинету, активам и системе ПХ.</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => startOAuth("github")}
            className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-border hover:neon-border-cyan bg-background/60 font-display text-sm tracking-[0.2em] uppercase transition group w-full">
            <Github size={18} className="group-hover:neon-text-cyan transition" /> Войти через GitHub
          </button>
          <button onClick={() => startOAuth("twitch")}
            className="inline-flex items-center justify-center gap-3 px-8 py-3 border border-border hover:neon-border bg-background/60 font-display text-sm tracking-[0.2em] uppercase transition group w-full">
            <Twitch size={18} className="group-hover:neon-text-violet transition" /> Войти через Twitch
          </button>
        </div>
        <p className="mt-6 font-mono text-[10px] text-muted-foreground">
          Необходимо подключить <span className="neon-text-cyan">оба аккаунта</span> для полного доступа
        </p>
        <Link to="/" className="mt-4 inline-block font-mono text-[10px] neon-text-acid hover:underline">← Главная</Link>
      </motion.div>
    </div>
  );
}

function LinkAccountBanner({ user }: { user: any }) {
  const needTwitch = !user.twitch_username;
  const needGithub = !user.github_username;
  if (!needGithub && !needTwitch) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex items-center justify-between gap-4 p-4 border border-yellow-500/40 bg-yellow-500/10">
      <div>
        <div className="font-display tracking-widest text-xs neon-text-acid mb-1">⚠ СИНХРОНИЗАЦИЯ СРЕДЫ НЕ ЗАВЕРШЕНА</div>
        <p className="font-mono text-xs text-muted-foreground">
          Подключите {needTwitch ? "Twitch" : "GitHub"} для отслеживания трансляций и начисления ПХ.
        </p>
      </div>
      {needTwitch && (
        <button onClick={() => startOAuth("twitch", user.id)}
          className="whitespace-nowrap px-4 py-2 border border-yellow-500/50 hover:border-neon-cyan font-display text-xs tracking-widest uppercase transition flex items-center gap-2">
          <Twitch size={14} /> + Link Twitch
        </button>
      )}
      {needGithub && (
        <button onClick={() => startOAuth("github", user.id)}
          className="whitespace-nowrap px-4 py-2 border border-yellow-500/50 hover:border-neon-cyan font-display text-xs tracking-widest uppercase transition flex items-center gap-2">
          <Github size={14} /> + Link GitHub
        </button>
      )}
    </motion.div>
  );
}

// ── Основная страница ─────────────────────────────────────────────────────────
function ProfilePage() {
  const { t }    = useI18n();
  const navigate = useNavigate();
  const { user, loading, logout, refreshUser } = useAuth();

  const [displayName,    setDisplayName]    = useState("");
  const [avatarPreview,  setAvatarPreview]  = useState<string | null>(null);

  // Модалы
  const [datacenterOpen,   setDatacenterOpen]   = useState(false);
  const [knowledgeOpen,    setKnowledgeOpen]    = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [inventoryOpen,    setInventoryOpen]    = useState(false);

  // Счётчики для превью
  const [assetCount,      setAssetCount]      = useState<number | null>(null);
  const [achieveCount,    setAchieveCount]    = useState<number | null>(null);
  const [knowledgeCount,  setKnowledgeCount]  = useState<number | null>(null);
  const [inventoryCount,  setInventoryCount]  = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    setDisplayName(user.display_name);
    if (user.avatar_url) setAvatarPreview(user.avatar_url);

    // Загружаем счётчики
    apiGet("/api/upload/assets").then(r => r.ok ? r.json() : { assets: [] })
      .then(d => setAssetCount((d.assets || []).length)).catch(() => {});
    apiGet("/api/achievements").then(r => r.ok ? r.json() : { achievements: [] })
      .then(d => setAchieveCount((d.achievements || []).length)).catch(() => {});
    apiGet("/api/knowledge/progress").then(r => r.ok ? r.json() : { items: [] })
      .then(d => setKnowledgeCount((d.items || []).length)).catch(() => {});
    apiGet("/api/inventory").then(r => r.ok ? r.json() : { items: [] })
      .then(d => setInventoryCount((d.items || []).length)).catch(() => {});
  }, [user?.id]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4.5 * 1024 * 1024) { alert("Файл > 4.5 МБ"); return; }
    const form = new FormData();
    form.append("avatar", file);
    try {
      const res = await apiPost("/api/upload/avatar", form);
      const d   = await res.json();
      if (res.ok) { setAvatarPreview(d.avatarUrl); refreshUser(); }
      else alert(`Ошибка: ${d.error}`);
    } catch (err: any) { alert(err.message); }
  };

  const handleLogout = () => { logout(); navigate({ to: "/" }); };

  if (loading) return (
    <div className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan animate-pulse">Загрузка кибера...</div>
    </div>
  );

  if (!user) return <LoginRequired />;

  const joinedDate = new Date(user.created_at).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });

  const accounts = [
    { name: "GitHub",  handle: user.github_username ? `@${user.github_username}` : "Не подключен", icon: Github,
      connected: !!user.github_username, onClick: () => !user.github_username && startOAuth("github", user.id) },
    { name: "Twitch",  handle: user.twitch_username ? `@${user.twitch_username}` : "Не подключен", icon: Twitch,
      connected: !!user.twitch_username, onClick: () => !user.twitch_username && startOAuth("twitch", user.id) },
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
            <EditableNickname userId={user.id} initial={displayName}
              onSaved={v => { setDisplayName(v); refreshUser(); }} />
            <LevelBadge level={user.level} />
            {(user as any).is_investor && <InvestorBadge />}
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 border border-border hover:border-red-500 hover:text-red-400 transition font-mono text-xs uppercase tracking-widest">
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
              <span className="truncate max-w-[140px]">id · {user.id.slice(0, 16)}…</span>
              <span className="neon-text-acid">● online</span>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-sm font-mono">
            <div className="flex justify-between"><span className="text-muted-foreground">ПХ</span><span className="neon-text-cyan">{user.xp.toLocaleString("ru-RU")}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Rank</span><span className="neon-text-violet">Оператор</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span>{joinedDate}</span></div>
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
            {/* Инвентарь — открывает InventoryModal */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur cursor-pointer hover:neon-border transition group"
              onClick={() => setInventoryOpen(true)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={14} className="neon-text-cyan group-hover:neon-text-acid transition" />
                  <span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">{t("profile.inventory")}</span>
                </div>
                <span className="text-[10px] neon-text-acid">
                  {inventoryCount !== null ? `${inventoryCount} предм.` : ""} →
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {inventoryCount === 0
                  ? "Нет приобретённых предметов"
                  : inventoryCount === null
                    ? "Загрузка…"
                    : `${inventoryCount} предм. в инвентаре · нажми чтобы открыть`
                }
              </div>
            </section>

            {/* Достижения — открывает AchievementsModal */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur cursor-pointer hover:neon-border transition group"
              onClick={() => setAchievementsOpen(true)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="neon-text-acid group-hover:neon-text-cyan transition" />
                  <span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">{t("profile.achievements")}</span>
                </div>
                <span className="text-[10px] neon-text-acid">
                  {achieveCount !== null ? `${achieveCount} событий` : ""} →
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                {achieveCount === 0
                  ? "Нет посещённых мероприятий"
                  : achieveCount === null
                    ? "Загрузка…"
                    : `${achieveCount} достижений · нажми чтобы открыть`
                }
              </div>
            </section>
          </div>

          {/* Активы + Датацентр */}
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
            <div className="font-mono text-xs text-muted-foreground cursor-pointer hover:text-foreground transition"
              onClick={() => setDatacenterOpen(true)}>
              {assetCount === null ? "Загрузка…" : assetCount === 0 ? "Загрузи первый файл" : `${assetCount} файлов в датацентре`}
            </div>
          </section>

          {/* Знания — открывает KnowledgeModal */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur cursor-pointer hover:neon-border transition group"
            onClick={() => setKnowledgeOpen(true)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="neon-text-cyan group-hover:neon-text-acid transition" />
                <span className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">ЗНАНИЯ</span>
              </div>
              <span className="text-[10px] neon-text-acid">
                {knowledgeCount !== null ? `${knowledgeCount} материалов` : ""} →
              </span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              {knowledgeCount === 0
                ? "Открой публикацию, интервью или алгоритм в Журнале"
                : knowledgeCount === null
                  ? "Загрузка…"
                  : `${knowledgeCount} материалов изучается · нажми чтобы открыть`
              }
            </div>
          </section>
        </div>
      </div>

      {/* Модалы */}
      <DatacenterModal   open={datacenterOpen}   onClose={() => setDatacenterOpen(false)} />
      <KnowledgeModal    open={knowledgeOpen}    onClose={() => setKnowledgeOpen(false)} />
      <AchievementsModal open={achievementsOpen} onClose={() => setAchievementsOpen(false)} />
      <InventoryModal    open={inventoryOpen}    onClose={() => setInventoryOpen(false)} />
    </motion.main>
  );
}
