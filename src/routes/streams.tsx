import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Eye, Radio, X, Monitor, Mic, Settings2, Twitch,
  ExternalLink, AlertTriangle, RefreshCw, Users, Clock,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/streams")({
  head: () => ({
    meta: [
      { title: "Стримы · nazrOS" },
      { name: "description", content: "Прямые трансляции киберов CyberEden через Twitch." },
    ],
  }),
  component: StreamsPage,
});

const API      = (import.meta.env.VITE_API_URL || "https://cybereden-v1-1-0.vercel.app").replace(/\/$/, "");
// Домены которые нужно передать Twitch embed в parent= параметре
const PARENTS  = ["cybereden.vercel.app", "cybereden.ru", "www.cybereden.ru", "localhost"];

// ── Типы ──────────────────────────────────────────────────────────────────────
interface LiveStream {
  id: string;
  twitch_login: string;
  display_name: string;
  cyber_user_id: string | null;
  avatar_url: string | null;
  title: string;
  game: string;
  viewers: number;
  thumbnail: string;
  started_at: string;
  tags: string[];
}

// ── Утилиты ───────────────────────────────────────────────────────────────────
function formatViewers(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

function uptime(startedAt: string): string {
  const ms = Date.now() - new Date(startedAt).getTime();
  const h  = Math.floor(ms / 3600000);
  const m  = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}ч ${m}м` : `${m}м`;
}

// ── Карточка стрима ───────────────────────────────────────────────────────────
function StreamCard({ stream, onClick }: { stream: LiveStream; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }} onClick={onClick}
      className="hud-corners border border-border bg-surface/40 backdrop-blur cursor-pointer group overflow-hidden transition-all hover:neon-border"
    >
      {/* Превью */}
      <div className="relative aspect-video bg-background/60 overflow-hidden">
        {stream.thumbnail ? (
          <img src={stream.thumbnail} alt={stream.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Radio size={32} className="text-muted-foreground animate-pulse" />
          </div>
        )}
        {/* LIVE badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-red-600/90 text-white font-mono text-[10px] uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE
        </div>
        {/* Зрители */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 font-mono text-[11px]">
          <Eye size={11} /> {formatViewers(stream.viewers)}
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-12 h-12 border-2 border-white/80 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>

      {/* Мета */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {stream.avatar_url
            ? <img src={stream.avatar_url} alt="" className="w-7 h-7 rounded-full border border-border" />
            : <div className="w-7 h-7 rounded-full border border-border bg-primary/20 flex items-center justify-center font-display text-xs">{stream.display_name[0]}</div>
          }
          <div>
            <div className="font-display text-sm neon-text-violet group-hover:neon-text-cyan transition">@{stream.twitch_login}</div>
          </div>
          <div className="ml-auto flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <Clock size={10} /> {uptime(stream.started_at)}
          </div>
        </div>
        <div className="font-display text-sm leading-tight line-clamp-2">{stream.title}</div>
        {stream.game && (
          <div className="mt-1 font-mono text-[10px] text-muted-foreground">{stream.game}</div>
        )}
        {stream.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {stream.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 border border-border/50 font-mono text-[9px] text-muted-foreground">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Окно просмотра стрима ─────────────────────────────────────────────────────
function StreamModal({ stream, onClose }: { stream: LiveStream; onClose: () => void }) {
  const parentParam = PARENTS.map(p => `parent=${p}`).join("&");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
        onClick={e => e.target === e.currentTarget && onClose()}>

        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-5xl hud-corners border border-border bg-background overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              {stream.avatar_url && <img src={stream.avatar_url} alt="" className="w-8 h-8 rounded-full border border-border" />}
              <div>
                <div className="font-display text-sm neon-text-violet">@{stream.twitch_login}</div>
                <div className="font-mono text-xs text-muted-foreground line-clamp-1">{stream.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <Eye size={12} /> {formatViewers(stream.viewers)} зрителей
              </div>
              <a href={`https://twitch.tv/${stream.twitch_login}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 border border-border hover:neon-border font-display text-xs tracking-widest uppercase transition">
                <Twitch size={12} /> Twitch <ExternalLink size={10} />
              </a>
              <button onClick={onClose}
                className="p-1.5 border border-border hover:border-red-500 hover:text-red-400 transition">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Twitch Embed — с правильным parent= */}
          <div className="relative aspect-video bg-black">
            <iframe
              src={`https://player.twitch.tv/?channel=${stream.twitch_login}&${parentParam}&autoplay=true&muted=false`}
              width="100%" height="100%"
              allowFullScreen
              allow="autoplay; fullscreen"
              className="w-full h-full border-0"
            />
          </div>

          {/* Чат */}
          <div className="grid grid-cols-[1fr_300px]">
            <div className="p-4 border-t border-r border-border">
              <div className="font-mono text-xs text-muted-foreground">
                Стрим транслируется через официальный Twitch embed. Задержка ~10-30 сек.
              </div>
            </div>
            <iframe
              src={`https://www.twitch.tv/embed/${stream.twitch_login}/chat?${parentParam}&darkpopout`}
              height="250"
              className="w-full border-0 border-t border-border bg-black"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Модал: начать трансляцию ──────────────────────────────────────────────────
function GoLiveModal({ onClose, user }: { onClose: () => void; user: any }) {
  const [tab, setTab] = useState<"twitch" | "browser">("twitch");
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [audioStream,  setAudioStream]  = useState<MediaStream | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [selectedMic,    setSelectedMic]    = useState<string | null>(null);
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const rtmpKey = user?.twitch_username
    ? "Перейди в Twitch → Настройки → Канал → Ключ потока"
    : "Сначала подключи Twitch в профиле";

  // Получаем список микрофонов
  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices()
      .then(devices => setMics(devices.filter(d => d.kind === "audioinput")))
      .catch(() => {});
  }, []);

  // Превью захваченного экрана
  useEffect(() => {
    if (screenStream && videoRef.current) {
      videoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  const captureScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setScreenStream(stream);
      setSelectedScreen(stream.getVideoTracks()[0]?.label || "Экран");
    } catch (e: any) {
      if (e.name !== "NotAllowedError") alert("Не удалось захватить экран: " + e.message);
    }
  };

  const captureMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      setSelectedMic(stream.getAudioTracks()[0]?.label || "Микрофон");
    } catch (e: any) {
      alert("Не удалось захватить микрофон: " + e.message);
    }
  };

  const stopPreview = () => {
    screenStream?.getTracks().forEach(t => t.stop());
    audioStream?.getTracks().forEach(t => t.stop());
    setScreenStream(null); setAudioStream(null);
    setSelectedScreen(null); setSelectedMic(null);
  };

  useEffect(() => () => stopPreview(), []);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={e => e.target === e.currentTarget && onClose()}>

        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
          className="w-full max-w-2xl hud-corners border border-border bg-background overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="font-display text-lg neon-text-violet">Начать трансляцию</div>
            <button onClick={onClose}
              className="p-1.5 border border-border hover:border-red-500 hover:text-red-400 transition">
              <X size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {[
              { id: "twitch",  label: "Через Twitch (рекомендуется)", icon: Twitch  },
              { id: "browser", label: "Через браузер (BETA)",         icon: Monitor },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id as any)}
                className={`flex items-center gap-2 px-5 py-3 font-display text-xs tracking-widest uppercase border-b-2 transition ${
                  tab === t.id ? "border-neon-cyan neon-text-cyan" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* ── Twitch tab ─────────────────────────────────────────────── */}
            {tab === "twitch" && (
              <div className="space-y-5">
                <div className="p-4 border border-neon-cyan/20 bg-neon-cyan/5">
                  <div className="font-display text-xs tracking-widest neon-text-cyan mb-2">Как это работает</div>
                  <ol className="font-mono text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Запусти OBS Studio или Streamlabs</li>
                    <li>Выбери сервис: <span className="text-foreground">Twitch</span></li>
                    <li>Вставь ключ потока из Twitch Dashboard</li>
                    <li>Нажми "Начать вещание" в OBS</li>
                    <li>Твой стрим <span className="neon-text-acid">автоматически появится</span> на этой странице</li>
                  </ol>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-border bg-background/40">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">RTMP Сервер</div>
                    <div className="font-mono text-xs text-foreground break-all">rtmp://live.twitch.tv/live</div>
                  </div>
                  <div className="p-3 border border-border bg-background/40">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Ключ потока</div>
                    <div className="font-mono text-xs text-muted-foreground">{rtmpKey}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Битрейт", value: "3000–6000 Кбит/с" },
                    { label: "Разрешение", value: "1080p / 720p" },
                    { label: "Кадров/сек", value: "30 / 60" },
                  ].map(s => (
                    <div key={s.label} className="p-3 border border-border bg-background/40">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                      <div className="font-display text-sm mt-1">{s.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a href="https://dashboard.twitch.tv/u/me/stream-manager" target="_blank" rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-display text-sm tracking-[0.2em] uppercase pulse-glow">
                    <Twitch size={16} /> Открыть Twitch Studio
                  </a>
                  <a href="https://obsproject.com" target="_blank" rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-border hover:neon-border font-display text-xs uppercase tracking-widest transition">
                    <ExternalLink size={14} /> OBS
                  </a>
                </div>

                {!user?.twitch_username && (
                  <div className="flex items-center gap-2 p-3 border border-yellow-500/30 bg-yellow-500/5 font-mono text-xs">
                    <AlertTriangle size={14} className="neon-text-acid flex-shrink-0" />
                    Подключи Twitch в профиле чтобы твой стрим отображался в CyberEden автоматически
                  </div>
                )}
              </div>
            )}

            {/* ── Browser tab ────────────────────────────────────────────── */}
            {tab === "browser" && (
              <div className="space-y-5">
                <div className="flex items-start gap-2 p-3 border border-yellow-500/30 bg-yellow-500/5 font-mono text-xs">
                  <AlertTriangle size={14} className="neon-text-acid flex-shrink-0 mt-0.5" />
                  <div>
                    Браузерный стриминг в BETA. Захват экрана работает, но публикация требует
                    дополнительного сервера. Пока доступен только локальный превью.
                  </div>
                </div>

                {/* Превью */}
                <div className="relative aspect-video bg-black border border-border overflow-hidden">
                  {screenStream
                    ? <video ref={videoRef} autoPlay muted className="w-full h-full object-contain" />
                    : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                        <Monitor size={32} />
                        <span className="font-mono text-xs">Экран не выбран</span>
                      </div>
                    )
                  }
                </div>

                {/* Захват экрана */}
                <div className="space-y-3">
                  <button onClick={captureScreen}
                    className={`w-full flex items-center gap-3 p-4 border transition text-left ${
                      selectedScreen ? "border-neon-cyan bg-neon-cyan/5" : "border-border hover:border-neon-cyan hover:bg-neon-cyan/5"
                    }`}>
                    <Monitor size={20} className={selectedScreen ? "neon-text-cyan" : "text-muted-foreground"} />
                    <div>
                      <div className="font-display text-sm">Захват экрана</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {selectedScreen || "Нажми чтобы выбрать экран или окно"}
                      </div>
                    </div>
                    {selectedScreen && <div className="ml-auto w-2 h-2 rounded-full bg-neon-acid animate-pulse" />}
                  </button>

                  <button onClick={captureMic}
                    className={`w-full flex items-center gap-3 p-4 border transition text-left ${
                      selectedMic ? "border-neon-cyan bg-neon-cyan/5" : "border-border hover:border-neon-cyan hover:bg-neon-cyan/5"
                    }`}>
                    <Mic size={20} className={selectedMic ? "neon-text-cyan" : "text-muted-foreground"} />
                    <div>
                      <div className="font-display text-sm">Звуковая карта / Микрофон</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {selectedMic || "Нажми чтобы выбрать микрофон"}
                      </div>
                    </div>
                    {selectedMic && <div className="ml-auto w-2 h-2 rounded-full bg-neon-acid animate-pulse" />}
                  </button>
                </div>

                {(selectedScreen || selectedMic) && (
                  <div className="flex gap-3">
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 border border-border/40 bg-background/40 text-muted-foreground font-display text-xs tracking-widest uppercase">
                      Публикация через WHIP — в разработке
                    </div>
                    <button onClick={stopPreview}
                      className="px-4 py-3 border border-border hover:border-red-500 hover:text-red-400 transition font-display text-xs">
                      Стоп
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Основная страница ─────────────────────────────────────────────────────────
function StreamsPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  const [streams,    setStreams]    = useState<LiveStream[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [selected,   setSelected]   = useState<LiveStream | null>(null);
  const [goLiveOpen, setGoLiveOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchStreams = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/streams/live`);
      const data = await res.json();
      setStreams(data.streams || []);
      setLastUpdate(new Date());
      setError(null);
    } catch {
      setError("Не удалось загрузить трансляции");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreams();
    // Обновляем каждые 60 секунд
    const interval = setInterval(fetchStreams, 60_000);
    return () => clearInterval(interval);
  }, [fetchStreams]);

  return (
    <PageShell eyebrow={t("streams.eyebrow")} title={t("streams.title")} subtitle={t("streams.subtitle")}>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {loading
            ? <div className="font-mono text-xs text-muted-foreground animate-pulse">Подключение к сети…</div>
            : <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Users size={12} />
                {streams.length > 0
                  ? <>{streams.length} стрим{streams.length > 1 ? "а" : ""} в эфире</>
                  : "Нет активных трансляций"
                }
                {lastUpdate && (
                  <span className="text-muted-foreground/50">
                    · обновлено {lastUpdate.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
          }
          <button onClick={fetchStreams}
            className="p-1.5 border border-border hover:neon-border transition">
            <RefreshCw size={12} className={loading ? "animate-spin neon-text-cyan" : "text-muted-foreground"} />
          </button>
        </div>

        {/* Кнопка "Начать трансляцию" */}
        <button onClick={() => setGoLiveOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-display text-sm tracking-[0.2em] uppercase transition pulse-glow">
          <Radio size={16} /> Начать трансляцию
        </button>
      </div>

      {/* Контент */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="hud-corners border border-border bg-surface/40 animate-pulse">
              <div className="aspect-video bg-background/60" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-border/40 rounded w-3/4" />
                <div className="h-3 bg-border/40 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="hud-corners p-10 border border-border text-center">
          <AlertTriangle size={32} className="neon-text-acid mx-auto mb-3" />
          <div className="font-display text-xl neon-text-violet mb-2">Ошибка соединения</div>
          <p className="font-mono text-sm text-muted-foreground mb-4">{error}</p>
          <button onClick={fetchStreams}
            className="px-5 py-2 border border-border hover:neon-border font-display text-xs uppercase tracking-widest transition">
            Повторить
          </button>
        </div>
      ) : streams.length === 0 ? (
        <div className="hud-corners p-16 border border-border text-center">
          <Radio size={40} className="text-muted-foreground mx-auto mb-4 opacity-30" />
          <div className="font-display text-2xl neon-text-violet mb-2">Эфир пуст</div>
          <p className="font-mono text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Сейчас ни один кибер не стримит. Стань первым — нажми «Начать трансляцию»
            и запусти стрим на Twitch с аккаунтом подключённым к CyberEden.
          </p>
          <button onClick={() => setGoLiveOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-display text-sm tracking-[0.2em] uppercase transition">
            <Radio size={16} /> Начать первым
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {streams.map(s => (
            <StreamCard key={s.id} stream={s} onClick={() => setSelected(s)} />
          ))}
        </div>
      )}

      {/* Модал: просмотр стрима */}
      {selected && <StreamModal stream={selected} onClose={() => setSelected(null)} />}

      {/* Модал: начать трансляцию */}
      {goLiveOpen && <GoLiveModal user={user} onClose={() => setGoLiveOpen(false)} />}

    </PageShell>
  );
}
