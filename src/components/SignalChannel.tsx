import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, Radio, Signal, Users, Check, X } from "lucide-react";
import { useSignal, type SignalParticipant } from "@/hooks/useSignal";
import { useAuth } from "@/lib/auth";

// ── Аватар участника с индикатором микрофона ──────────────────────────────────
function ParticipantAvatar({ p, isOwner, onGrant, onRevoke }: {
  p: SignalParticipant;
  isOwner: boolean;
  onGrant:  (id: string) => void;
  onRevoke: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2 px-3 border border-border bg-background/40">
      <div className="flex items-center gap-2.5">
        <div className={`w-2 h-2 rounded-full ${p.isSpeaking ? "bg-neon-acid animate-pulse" : "bg-border"}`} />
        <span className="font-mono text-xs truncate max-w-[120px]">{p.displayName}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {p.hasMic
          ? <Mic size={11} className="neon-text-acid" />
          : <MicOff size={11} className="text-muted-foreground/40" />
        }
        {/* Флажок — только для хозяина канала */}
        {isOwner && (
          p.hasMic ? (
            <button onClick={() => onRevoke(p.userId)}
              title="Забрать микрофон"
              className="p-0.5 hover:text-red-400 text-muted-foreground transition">
              <X size={11} />
            </button>
          ) : (
            <button onClick={() => onGrant(p.userId)}
              title="Выдать микрофон"
              className="p-0.5 hover:neon-text-acid text-muted-foreground transition">
              <Check size={11} />
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Компонент канала СИГНАЛ (встраивается в profile.tsx) ──────────────────────
interface Props {
  profileUserId:    string;   // id хозяина профиля (чей канал отображается)
  profileUserName:  string;   // display_name хозяина
  isOwnProfile:     boolean;  // true если это моя кибла
}

export function SignalChannel({ profileUserId, profileUserName, isOwnProfile }: Props) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const {
    participants, isConnected, myMicGranted, isMuted,
    connect, disconnect, grantMic, revokeMic, toggleMute,
    participantCount,
  } = useSignal(user?.id ?? null, isOwnProfile);

  const handleConnect = useCallback(async () => {
    if (!user) return;
    await connect(profileUserId);
  }, [connect, profileUserId, user]);

  return (
    <div className="hud-corners border border-border bg-surface/30 backdrop-blur overflow-hidden">

      {/* ── Шапка ────────────────────────────────────────────────────────── */}
      <button
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2.5">
          {/* Индикатор активности */}
          <div className="relative">
            <Radio size={14} className={isConnected ? "neon-text-acid" : "text-muted-foreground"} />
            {isConnected && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-neon-acid animate-pulse" />
            )}
          </div>
          <span className="font-display text-sm tracking-widest uppercase">СИГНАЛ</span>
          {participantCount > 0 && (
            <span className="flex items-center gap-1 font-mono text-[10px] neon-text-acid">
              <Users size={10} /> {participantCount}
            </span>
          )}
        </div>
        <div className={`font-mono text-[10px] uppercase tracking-widest ${isConnected ? "neon-text-acid" : "text-muted-foreground"}`}>
          {isConnected ? "В эфире" : "Канал открыт"}
        </div>
      </button>

      {/* ── Раскрытая панель ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-4 space-y-3">

              {/* Список участников */}
              {participants.length > 0 ? (
                <div className="space-y-1">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                    В канале
                  </div>
                  {participants.map(p => (
                    <ParticipantAvatar
                      key={p.userId} p={p}
                      isOwner={isOwnProfile}
                      onGrant={grantMic}
                      onRevoke={revokeMic}
                    />
                  ))}
                </div>
              ) : (
                <div className="font-mono text-[10px] text-muted-foreground text-center py-2">
                  {isConnected ? "Только ты в канале" : "Никого нет"}
                </div>
              )}

              {/* Подсказка для хозяина */}
              {isOwnProfile && isConnected && participants.length > 0 && (
                <div className="font-mono text-[10px] text-muted-foreground border border-border/40 px-3 py-2">
                  ✓ выдать микрофон · ✕ забрать
                </div>
              )}

              {/* Кнопки управления */}
              <div className="flex gap-2">
                {!isConnected ? (
                  <button
                    onClick={handleConnect}
                    disabled={!user}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-neon-acid/40 bg-neon-acid/10 hover:bg-neon-acid/20 font-display text-xs tracking-widest uppercase neon-text-acid transition disabled:opacity-40"
                  >
                    <Signal size={12} />
                    {isOwnProfile ? "Открыть канал" : `Войти в СИГНАЛ @${profileUserName}`}
                  </button>
                ) : (
                  <>
                    {/* Кнопка микрофона (только если выдан) */}
                    {myMicGranted && (
                      <button
                        onClick={toggleMute}
                        className={`flex items-center gap-1.5 px-3 py-2.5 border font-mono text-xs uppercase tracking-widest transition ${
                          isMuted
                            ? "border-border text-muted-foreground hover:text-foreground"
                            : "border-neon-acid/40 neon-text-acid bg-neon-acid/10"
                        }`}
                      >
                        {isMuted ? <MicOff size={12} /> : <Mic size={12} />}
                        {isMuted ? "Вкл" : "Выкл"}
                      </button>
                    )}

                    {!myMicGranted && !isOwnProfile && (
                      <div className="flex items-center gap-1.5 px-3 py-2.5 font-mono text-[10px] text-muted-foreground border border-border">
                        <MicOff size={11} /> Ожидание микрофона
                      </div>
                    )}

                    {/* Выйти */}
                    <button
                      onClick={disconnect}
                      className="flex items-center gap-1.5 px-3 py-2.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono text-xs uppercase tracking-widest transition ml-auto"
                    >
                      <PhoneOff size={12} /> Выйти
                    </button>
                  </>
                )}
              </div>

              {/* Нет аккаунта */}
              {!user && (
                <p className="font-mono text-[10px] text-muted-foreground text-center">
                  Авторизуйся чтобы войти в СИГНАЛ
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
