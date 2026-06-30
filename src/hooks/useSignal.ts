import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase клиент (используй уже существующий из lib/supabase.ts если есть)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// Бесплатные STUN серверы Google
const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
];

export interface SignalParticipant {
  userId:      string;
  displayName: string;
  avatarUrl?:  string;
  hasMic:      boolean;   // хозяин выдал микрофон
  isSpeaking:  boolean;   // сейчас говорит (VAD)
  stream?:     MediaStream;
}

interface PeerState {
  conn:   RTCPeerConnection;
  stream: MediaStream | null;
}

interface UseSignalReturn {
  participants:  SignalParticipant[];
  isConnected:   boolean;
  myMicGranted:  boolean;
  isMuted:       boolean;
  connect:       (channelOwnerId: string) => Promise<void>;
  disconnect:    () => void;
  grantMic:      (userId: string) => void;
  revokeMic:     (userId: string) => void;
  toggleMute:    () => void;
  participantCount: number;
}

/**
 * СИГНАЛ — WebRTC голосовой канал через Supabase Realtime
 *
 * Каждый кибер имеет постоянный Realtime-канал "signal:{userId}".
 * Участники подключаются → обмениваются WebRTC offer/answer/ICE через broadcast.
 * Голос идёт P2P, напрямую между браузерами.
 *
 * @param myUserId    — ID текущего пользователя
 * @param isOwner     — true если это моя кибла (я хозяин канала)
 */
export function useSignal(myUserId: string | null, isOwner: boolean): UseSignalReturn {
  const [participants, setParticipants]   = useState<SignalParticipant[]>([]);
  const [isConnected,  setIsConnected]    = useState(false);
  const [myMicGranted, setMyMicGranted]   = useState(isOwner); // хозяин всегда с микрофоном
  const [isMuted,      setIsMuted]        = useState(false);

  // refs — не вызывают ре-рендер при изменении
  const channelRef    = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const peersRef      = useRef<Map<string, PeerState>>(new Map());
  const localStream   = useRef<MediaStream | null>(null);
  const ownerIdRef    = useRef<string | null>(null);
  const audioCtxRef   = useRef<AudioContext | null>(null);

  // ── Получить локальный аудио стрим ────────────────────────────────────────
  const getLocalStream = useCallback(async (): Promise<MediaStream | null> => {
    if (localStream.current) return localStream.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStream.current = stream;
      // По умолчанию микрофон выключен до разрешения хозяина
      stream.getAudioTracks().forEach(t => { t.enabled = isOwner; });
      return stream;
    } catch (e) {
      console.warn("[СИГНАЛ] Нет доступа к микрофону:", e);
      return null;
    }
  }, [isOwner]);

  // ── Создать RTCPeerConnection с участником ────────────────────────────────
  const createPeer = useCallback((remoteUserId: string, stream: MediaStream | null): RTCPeerConnection => {
    const conn = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // Добавляем свой аудио трек
    if (stream) {
      stream.getTracks().forEach(track => conn.addTrack(track, stream));
    }

    // Получаем аудио от удалённого участника
    conn.ontrack = (e) => {
      const remoteStream = e.streams[0];
      const audio = new Audio();
      audio.srcObject = remoteStream;
      audio.autoplay  = true;
      setParticipants(prev => prev.map(p =>
        p.userId === remoteUserId ? { ...p, stream: remoteStream } : p
      ));
    };

    // ICE кандидаты → шлём через Realtime
    conn.onicecandidate = (e) => {
      if (!e.candidate || !channelRef.current) return;
      channelRef.current.send({
        type: "broadcast",
        event: "ice-candidate",
        payload: { from: myUserId, to: remoteUserId, candidate: e.candidate.toJSON() },
      });
    };

    conn.onconnectionstatechange = () => {
      if (conn.connectionState === "failed" || conn.connectionState === "disconnected") {
        removePeer(remoteUserId);
      }
    };

    peersRef.current.set(remoteUserId, { conn, stream: null });
    return conn;
  }, [myUserId]);

  // ── Удалить участника ─────────────────────────────────────────────────────
  const removePeer = useCallback((userId: string) => {
    const peer = peersRef.current.get(userId);
    if (peer) { peer.conn.close(); peersRef.current.delete(userId); }
    setParticipants(prev => prev.filter(p => p.userId !== userId));
  }, []);

  // ── Подключиться к каналу кибера ──────────────────────────────────────────
  const connect = useCallback(async (channelOwnerId: string) => {
    if (!myUserId) return;
    ownerIdRef.current = channelOwnerId;

    const stream = await getLocalStream();
    const ch = supabase.channel(`signal:${channelOwnerId}`, {
      config: { broadcast: { self: false } },
    });
    channelRef.current = ch;

    // ── Входящий offer (кто-то хочет подключиться к нам) ──────────────────
    ch.on("broadcast", { event: "offer" }, async ({ payload }) => {
      if (payload.to !== myUserId) return;
      const from = payload.from as string;

      setParticipants(prev =>
        prev.find(p => p.userId === from) ? prev :
        [...prev, { userId: from, displayName: payload.displayName || from, hasMic: false, isSpeaking: false }]
      );

      const conn = createPeer(from, stream);
      await conn.setRemoteDescription(new RTCSessionDescription(payload.offer));
      const answer = await conn.createAnswer();
      await conn.setLocalDescription(answer);

      ch.send({
        type: "broadcast", event: "answer",
        payload: { from: myUserId, to: from, answer: conn.localDescription },
      });
    });

    // ── Входящий answer ────────────────────────────────────────────────────
    ch.on("broadcast", { event: "answer" }, async ({ payload }) => {
      if (payload.to !== myUserId) return;
      const peer = peersRef.current.get(payload.from);
      if (!peer) return;
      await peer.conn.setRemoteDescription(new RTCSessionDescription(payload.answer));
    });

    // ── ICE кандидат ───────────────────────────────────────────────────────
    ch.on("broadcast", { event: "ice-candidate" }, async ({ payload }) => {
      if (payload.to !== myUserId) return;
      const peer = peersRef.current.get(payload.from);
      if (!peer) return;
      try { await peer.conn.addIceCandidate(new RTCIceCandidate(payload.candidate)); } catch {}
    });

    // ── Управление микрофоном (хозяин канала) ─────────────────────────────
    ch.on("broadcast", { event: "grant-mic" }, ({ payload }) => {
      if (payload.to !== myUserId) return;
      setMyMicGranted(true);
      localStream.current?.getAudioTracks().forEach(t => { t.enabled = true; });
    });

    ch.on("broadcast", { event: "revoke-mic" }, ({ payload }) => {
      if (payload.to !== myUserId) return;
      setMyMicGranted(false);
      localStream.current?.getAudioTracks().forEach(t => { t.enabled = false; });
    });

    // ── Участник покинул канал ─────────────────────────────────────────────
    ch.on("broadcast", { event: "leave" }, ({ payload }) => {
      removePeer(payload.from);
    });

    // ── Presence: кто онлайн в канале ─────────────────────────────────────
    ch.on("presence", { event: "join" }, ({ newPresences }) => {
      setParticipants(prev => {
        const updated = [...prev];
        newPresences.forEach((p: any) => {
          if (p.userId === myUserId) return;
          if (!updated.find(x => x.userId === p.userId)) {
            updated.push({ userId: p.userId, displayName: p.displayName || p.userId, hasMic: false, isSpeaking: false });
          }
        });
        return updated;
      });
    });

    ch.on("presence", { event: "leave" }, ({ leftPresences }) => {
      leftPresences.forEach((p: any) => removePeer(p.userId));
    });

    await ch.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;

      // Объявляем своё присутствие
      await ch.track({ userId: myUserId, displayName: myUserId });

      setIsConnected(true);

      // Шлём offer всем кто уже в канале (не хозяину)
      if (channelOwnerId !== myUserId) {
        const existingPeers = Array.from(peersRef.current.keys());
        for (const peerId of existingPeers) {
          if (peerId === myUserId) continue;
          const conn   = createPeer(peerId, stream);
          const offer  = await conn.createOffer();
          await conn.setLocalDescription(offer);
          ch.send({
            type: "broadcast", event: "offer",
            payload: { from: myUserId, to: peerId, offer: conn.localDescription, displayName: myUserId },
          });
        }
      }
    });
  }, [myUserId, getLocalStream, createPeer, removePeer]);

  // ── Отключиться ───────────────────────────────────────────────────────────
  const disconnect = useCallback(() => {
    channelRef.current?.send({
      type: "broadcast", event: "leave", payload: { from: myUserId },
    });
    channelRef.current?.unsubscribe();
    channelRef.current = null;
    peersRef.current.forEach(p => p.conn.close());
    peersRef.current.clear();
    localStream.current?.getTracks().forEach(t => t.stop());
    localStream.current = null;
    setParticipants([]);
    setIsConnected(false);
    setMyMicGranted(isOwner);
  }, [myUserId, isOwner]);

  // ── Выдать / забрать микрофон (только хозяин) ─────────────────────────────
  const grantMic = useCallback((userId: string) => {
    channelRef.current?.send({
      type: "broadcast", event: "grant-mic", payload: { from: myUserId, to: userId },
    });
    setParticipants(prev => prev.map(p => p.userId === userId ? { ...p, hasMic: true } : p));
  }, [myUserId]);

  const revokeMic = useCallback((userId: string) => {
    channelRef.current?.send({
      type: "broadcast", event: "revoke-mic", payload: { from: myUserId, to: userId },
    });
    setParticipants(prev => prev.map(p => p.userId === userId ? { ...p, hasMic: false } : p));
  }, [myUserId]);

  // ── Заглушить себя ────────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    if (!myMicGranted) return;
    setIsMuted(prev => {
      const next = !prev;
      localStream.current?.getAudioTracks().forEach(t => { t.enabled = !next; });
      return next;
    });
  }, [myMicGranted]);

  // Cleanup при размонтировании
  useEffect(() => () => { disconnect(); }, []);

  return {
    participants,
    isConnected,
    myMicGranted,
    isMuted,
    connect,
    disconnect,
    grantMic,
    revokeMic,
    toggleMute,
    participantCount: participants.length,
  };
}
