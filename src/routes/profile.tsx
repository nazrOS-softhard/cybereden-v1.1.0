import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Trophy,
  Github,
  Twitch,
  Globe,
  ShoppingBag,
  Upload,
  BookOpen,
  Zap,
  Database,
} from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { DatacenterModal } from "@/components/DatacenterModal";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile · nazrOS" },
      { name: "description", content: "Аватар, подключённые аккаунты, инвентарь и достижения." },
      { property: "og:title", content: "Profile · nazrOS" },
      { property: "og:description", content: "Профиль пользователя nazrOS." },
    ],
  }),
  component: ProfilePage,
});

const accounts = [
  { name: "GitHub", handle: "@nazr-os", icon: Github, connected: true, url: "https://github.com" },
  { name: "Twitch", handle: "@nazr.os", icon: Twitch, connected: true, url: "https://twitch.tv" },
  { name: "Darknet", handle: "node://4a82…", icon: Globe, connected: false },
];

const inventory = [
  { name: "Neurochip X-9", tier: "S" },
  { name: "VEX-02", tier: "A" },
  { name: "Aurora visor", tier: "A" },
  { name: "Vermillion arm", tier: "S" },
  { name: "ICE-breaker v2", tier: "B" },
  { name: "Dream patch", tier: "C" },
];

const achievements = [
  { name: "Первый имплант", date: "12.03.2089" },
  { name: "Финалист Nexus Pro", date: "08.07.2090" },
  { name: "Hack the Spire · gold", date: "20.08.2090" },
  { name: "1M XP", date: "01.09.2090" },
];

const assets = [
  { id: "a1", name: "neural_map_v3.zip", size: "245 MB", xp: 500 },
  { id: "a2", name: "protocol_lib.json", size: "12 MB", xp: 250 },
];

const knowledge = [
  { title: "Архитектура Zero Trust", progress: 85, xp: 1200, type: "Статья" },
  { title: "Эксплойты нейро-API", progress: 60, xp: 800, type: "Видео" },
  { title: "Основы HUD-дизайна", progress: 45, xp: 600, type: "Курс" },
];

function ProfilePage() {
  const { t } = useI18n();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadedAssets, setUploadedAssets] = useState(assets);
  const [datacenterOpen, setDatacenterOpen] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedAssets([
        ...uploadedAssets,
        {
          id: `a${uploadedAssets.length + 1}`,
          name: file.name,
          size: `${Math.round(file.size / 1024 / 1024)} MB`,
          xp: Math.floor(Math.random() * 500) + 200,
        },
      ]);
    }
  };

  const handleOAuthClick = (account: typeof accounts[0]) => {
    if (account.url && account.connected) {
      alert(`OAuth подключён к ${account.name}`);
    }
  };

  return (
    <PageShell
      eyebrow={t("profile.eyebrow")}
      title="@f00rtime"
      subtitle={t("profile.subtitle")}
    >
      <div className="relative grid lg:grid-cols-[280px_1fr] gap-6">
        {/* ДЕСКТОПНЫЙ НЕОНОВЫЙ ТРЕУГОЛЬНИК */}
        <div className="absolute -top-[52px] left-[354px] hidden lg:block z-50 pointer-events-none">
          <div className="relative flex items-center justify-center w-5 h-5">
            <svg
              viewBox="0 0 100 100"
              className="absolute top-0 left-0 w-full h-full fill-none"
              style={{
                stroke: '#FFD700',
                strokeWidth: '14px',
                filter: 'drop-shadow(0 0 4px #FFD700) drop-shadow(0 0 10px #FFA500)'
              }}
            >
              <polygon points="50,12 93,85 7,85" />
            </svg>
            <span
              className="z-10 font-mono text-[10px] font-black text-black translate-y-[1px]"
              style={{
                textShadow: '0 0 2px rgba(255, 255, 255, 0.6)'
              }}
            >
              7
            </span>
          </div>
        </div>

        {/* МОБИЛЬНЫЙ НЕОНОВЫЙ ТРЕУГОЛЬНИК */}
        <div className="absolute -top-[44px] left-[315px] block lg:hidden z-50 pointer-events-none">
          <div className="relative flex items-center justify-center w-4 h-4">
            <svg
              viewBox="0 0 100 100"
              className="absolute top-0 left-0 w-full h-full fill-none"
              style={{
                stroke: '#FFD700',
                strokeWidth: '14px',
                filter: 'drop-shadow(0 0 4px #FFD700) drop-shadow(0 0 10px #FFA500)'
              }}
            >
              <polygon points="50,12 93,85 7,85" />
            </svg>
            <span
              className="z-10 font-mono text-[9px] font-black text-black translate-y-[1px]"
            >
              7
            </span>
          </div>
        </div>

        {/* Avatar card */}
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
                  ? `url(${avatarPreview}) center/cover`
                  : "radial-gradient(circle at 50% 35%, oklch(0.7 0.28 305 / 0.6), oklch(0.13 0.04 290) 70%)",
              }}
            />
            {!avatarPreview && (
              <>
                <div className="absolute inset-0 hud-grid opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center font-display text-7xl neon-text-violet">
                  N
                </div>
              </>
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer group">
              <div className="flex flex-col items-center gap-2 text-white">
                <Upload size={24} />
                <span className="text-xs">Загрузить аватар</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
            <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex justify-between">
              <span>id · 4a82</span>
              <span className="neon-text-acid">● online</span>
            </div>
          </div>
          <div className="mt-4 space-y-1.5 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">XP</span>
              <span className="neon-text-cyan">482 300</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rank</span>
              <span className="neon-text-violet">Архитектор</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span>12.03.2089</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Accounts */}
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
                    onClick={() => handleOAuthClick(a)}
                    className={`flex items-center gap-3 p-3 border transition ${
                      a.connected
                        ? "border-border bg-background/40 hover:neon-border-acid cursor-pointer"
                        : "border-border bg-background/20 hover:border-neon-cyan cursor-pointer"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={a.connected ? "neon-text-cyan" : "text-muted-foreground"}
                    />
                    <div className="text-left">
                      <div className="font-display text-xs uppercase tracking-widest">
                        {a.name}
                      </div>
                      <div className="font-mono text-[11px] text-muted-foreground">
                        {a.connected ? a.handle : "Не подключен"}
                      </div>
                    </div>
                    {a.connected && (
                      <div className="w-2 h-2 rounded-full bg-neon-acid animate-pulse ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Inventory */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
              <div className="flex items-center gap-2 mb-4 justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={14} className="neon-text-cyan" />
                  <div className="font-display text-sm tracking-widest neon-text-violet">
                    {t("profile.inventory")}
                  </div>
                </div>
                <Link
                  to="/market"
                  className="text-[10px] neon-text-acid hover:underline uppercase tracking-widest"
                >
                  Перейти →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {inventory.slice(0, 4).map((it) => (
                  <div
                    key={it.name}
                    className="relative p-3 border border-border bg-background/40 hover:neon-border transition"
                  >
                    <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center font-display text-xs neon-text-acid border border-neon-acid">
                      {it.tier}
                    </div>
                    <div className="font-display text-xs pr-8">{it.name}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
              <div className="flex items-center gap-2 mb-4 justify-between">
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="neon-text-acid" />
                  <div className="font-display text-sm tracking-widest neon-text-violet">
                    {t("profile.achievements")}
                  </div>
                </div>
                <Link
                  to="/events"
                  className="text-[10px] neon-text-acid hover:underline uppercase tracking-widest"
                >
                  События →
                </Link>
              </div>
              <ul className="divide-y divide-border">
                {achievements.slice(0, 3).map((a) => (
                  <li key={a.name} className="py-2 flex justify-between text-xs">
                    <span className="font-display">{a.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{a.date}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Assets */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <div className="flex items-center gap-2 mb-4 justify-between">
              <div
                className="flex items-center gap-2 cursor-pointer group flex-1"
                onClick={() => setDatacenterOpen(true)}
                title="Открыть DATACENTER"
              >
                <Zap size={14} className="neon-text-cyan group-hover:neon-text-acid transition" />
                <div className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">
                  АКТИВЫ
                </div>
              </div>
              <button
                onClick={() => setDatacenterOpen(true)}
                className="flex items-center gap-1 text-[10px] neon-text-acid hover:neon-text-cyan transition uppercase tracking-widest"
                title="Открыть DATACENTER"
              >
                <Database size={12} />
                DATACENTER
              </button>
            </div>
            <div className="space-y-3">
              {uploadedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-3 border border-border bg-background/40 hover:neon-border transition"
                >
                  <div>
                    <div className="font-display text-sm">{asset.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{asset.size}</div>
                  </div>
                  <div className="font-mono text-xs neon-text-acid">+{asset.xp} XP</div>
                </div>
              ))}
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border hover:border-neon-cyan transition cursor-pointer group">
                <Upload size={16} className="neon-text-cyan group-hover:neon-text-acid transition" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:neon-text-cyan">
                  Загрузить файл
                </span>
                <input
                  type="file"
                  onChange={handleAssetUpload}
                  className="hidden"
                />
              </label>
            </div>
          </section>

          {/* Knowledge */}
          <section className="hud-corners p-6 border border-border bg-surface/40 backdrop-blur">
            <Link
              to="/journal"
              className="flex items-center gap-2 mb-4 cursor-pointer group"
            >
              <BookOpen size={14} className="neon-text-cyan group-hover:neon-text-acid transition" />
              <div className="font-display text-sm tracking-widest neon-text-violet group-hover:neon-text-cyan transition">
                ЗНАНИЯ
              </div>
              <span className="ml-auto text-[10px] neon-text-acid group-hover:underline">Перейти →</span>
            </Link>
            <div className="space-y-4">
              {knowledge.map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-display text-sm">{item.title}</div>
                      <div className="font-mono text-xs text-muted-foreground">{item.type}</div>
                    </div>
                    <div className="font-mono text-xs neon-text-acid">+{item.xp} XP</div>
                  </div>
                  <div className="w-full bg-background/40 border border-border h-2">
                    <div
                      className="bg-neon-cyan h-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
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
