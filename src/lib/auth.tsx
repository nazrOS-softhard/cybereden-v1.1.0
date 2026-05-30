import React, {
  createContext, useContext, useState, useEffect, useCallback,
} from 'react';

export const TOKEN_KEY = 'auth_token';

const API   = (import.meta.env.VITE_API_URL          || 'https://cybereden-v1-1-0.vercel.app').replace(/\/$/, '');
const GH_ID =  import.meta.env.VITE_GITHUB_CLIENT_ID || '';
const TW_ID =  import.meta.env.VITE_TWITCH_CLIENT_ID || '';
const TIMEOUT_MS = 12_000;

// ── Fetch с таймаутом ─────────────────────────────────────────────────────────
async function timedFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(input, { ...init, signal: ctrl.signal });
    clearTimeout(timer);
    return res;
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error('Сервер не отвечает. Проверь соединение и попробуй позже.');
    }
    throw err;
  }
}

// ── Авторизованный fetch ──────────────────────────────────────────────────────
function authHeaders(extra?: Record<string, string>): Record<string, string> {
  const token = getToken();
  return { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extra };
}

export interface CyberUser {
  id: string;
  display_name: string;
  github_username: string | null;
  twitch_username: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  xp: number;
  level: number;
  is_public: boolean;
  is_investor?: boolean;   // ← значок инвестора
  created_at: string;
  last_login: string;
}

interface AuthCtx {
  user: CyberUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

export const getToken   = ()           => localStorage.getItem(TOKEN_KEY);
export const saveToken  = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = ()          => localStorage.removeItem(TOKEN_KEY);

// ── API helpers ───────────────────────────────────────────────────────────────
export async function apiGet(path: string) {
  return timedFetch(`${API}${path}`, { headers: authHeaders() });
}

export async function apiPost(path: string, body?: FormData | Record<string, unknown>) {
  const isForm = body instanceof FormData;
  return timedFetch(`${API}${path}`, {
    method: 'POST',
    headers: authHeaders(isForm ? {} : { 'Content-Type': 'application/json' }),
    body: isForm ? body : JSON.stringify(body),
  });
}

/** PATCH — обновление профиля, настроек и т.д. */
export async function apiPatch(path: string, body: Record<string, unknown>) {
  return timedFetch(`${API}${path}`, {
    method: 'PATCH',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });
}

export async function apiDelete(path: string) {
  return timedFetch(`${API}${path}`, { method: 'DELETE', headers: authHeaders() });
}

// ── loadMe ────────────────────────────────────────────────────────────────────
async function loadMe(token: string): Promise<CyberUser | null> {
  try {
    const res = await timedFetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) { clearToken(); return null; }
    return (await res.json()).user as CyberUser;
  } catch { return null; }
}

// ── startOAuth ────────────────────────────────────────────────────────────────
export function startOAuth(provider: 'github' | 'twitch', linkUserId?: string) {
  const nonce = Math.random().toString(36).slice(2, 10);
  const state = btoa(linkUserId ? `link:${linkUserId}:${nonce}` : `new:${nonce}`);
  const cb    = `${API}/api/auth`;

  if (provider === 'github') {
    if (!GH_ID) { alert('VITE_GITHUB_CLIENT_ID не задан.'); return; }
    const p = new URLSearchParams({ client_id: GH_ID, redirect_uri: `${cb}/github/callback`, scope: 'read:user user:email', state });
    window.location.href = `https://github.com/login/oauth/authorize?${p}`;
  } else {
    if (!TW_ID) { alert('VITE_TWITCH_CLIENT_ID не задан.'); return; }
    const p = new URLSearchParams({ client_id: TW_ID, redirect_uri: `${cb}/twitch/callback`, response_type: 'code', scope: 'user:read:email', state });
    window.location.href = `https://id.twitch.tv/oauth2/authorize?${p}`;
  }
}

// ── AuthProvider ──────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,    setUser]       = useState<CyberUser | null>(null);
  const [token,   setTokenState] = useState<string | null>(getToken);
  const [loading, setLoading]    = useState(true);

  useEffect(() => {
    const saved = getToken();
    if (!saved) { setLoading(false); return; }
    loadMe(saved).then(u => {
      setUser(u); setTokenState(u ? saved : null);
      if (!u) clearToken(); setLoading(false);
    });
  }, []);

  const login = useCallback(async (t: string) => {
    saveToken(t); setTokenState(t); setLoading(true);
    const u = await loadMe(t);
    setUser(u); if (!u) clearToken(); setLoading(false);
  }, []);

  const logout = useCallback(() => {
    clearToken(); setTokenState(null); setUser(null);
    fetch(`${API}/api/auth/logout`, { method: 'POST' }).catch(() => {});
  }, []);

  const refreshUser = useCallback(async () => {
    const t = getToken(); if (!t) return;
    const u = await loadMe(t);
    if (u) setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth: нет AuthProvider');
  return ctx;
}
