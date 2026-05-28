
/**
 * src/lib/auth.ts
 * Центральная авторизация CyberEden.
 * Оборачивает приложение через <AuthProvider>, даёт хук useAuth().
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

// ─── Константы ────────────────────────────────────────────────────────────────
export const TOKEN_KEY = 'auth_token';   // единый ключ во всём проекте
const API = import.meta.env.VITE_API_URL || 'https://cybereden-v1-1-0.vercel.app';

// ─── Типы ─────────────────────────────────────────────────────────────────────
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
  created_at: string;
  last_login: string;
}

interface AuthCtx {
  user: CyberUser | null;
  token: string | null;
  loading: boolean;
  /** Сохранить токен и загрузить профиль */
  login: (token: string) => Promise<void>;
  /** Удалить токен, сбросить user */
  logout: () => void;
  /** Перезагрузить профиль с сервера */
  refreshUser: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthCtx | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getToken(): string | null { return localStorage.getItem(TOKEN_KEY); }
function saveToken(t: string)       { localStorage.setItem(TOKEN_KEY, t); }
function clearToken()               { localStorage.removeItem(TOKEN_KEY); }

async function loadMe(token: string): Promise<CyberUser | null> {
  try {
    const res = await fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) { clearToken(); return null; }
    const json = await res.json();
    return json.user as CyberUser;
  } catch {
    return null;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,    setUser]    = useState<CyberUser | null>(null);
  const [token,   setToken]   = useState<string | null>(getToken);
  const [loading, setLoading] = useState(true);

  // При монтировании — проверяем сохранённый токен
  useEffect(() => {
    const saved = getToken();
    if (!saved) { setLoading(false); return; }
    loadMe(saved).then(u => {
      setUser(u);
      setToken(u ? saved : null);
      setLoading(false);
    });
  }, []);

  const login = useCallback(async (newToken: string) => {
    saveToken(newToken);
    setToken(newToken);
    setLoading(true);
    const u = await loadMe(newToken);
    setUser(u);
    if (!u) clearToken();
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
    fetch(`${API}/api/auth/logout`, { method: 'POST' }).catch(() => {});
  }, []);

  const refreshUser = useCallback(async () => {
    const t = getToken();
    if (!t) return;
    const u = await loadMe(t);
    setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth: нет AuthProvider выше в дереве');
  return ctx;
}

// ─── API helpers (используются в profile.tsx и других) ────────────────────────
export async function apiPost(path: string, body?: FormData | object) {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const isForm = body instanceof FormData;
  if (!isForm) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers,
    body: isForm ? body : JSON.stringify(body),
  });
  return res;
}

export async function apiGet(path: string) {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { headers });
  return res;
}

export async function apiDelete(path: string) {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { method: 'DELETE', headers });
  return res;
}

/** Получить OAuth URL и открыть */
export async function startOAuth(provider: 'github' | 'twitch') {
  try {
    const res = await fetch(`${API}/api/auth/${provider}`);
    const { url } = await res.json();
    window.location.href = url;
  } catch {
    alert(`Не удалось запустить OAuth ${provider}`);
  }
}
