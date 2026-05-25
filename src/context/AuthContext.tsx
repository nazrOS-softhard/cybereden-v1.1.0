
/**
 * AUTH CONTEXT
 * Контекст для управления авторизацией во всем приложении
 */

import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { AuthSession, AuthUser, OAuthProvider } from '../types/auth';

export interface AuthContextType {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузить сеанс при загрузке приложения
  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const sessionData = localStorage.getItem('auth_session');

        if (token && sessionData) {
          const parsed = JSON.parse(sessionData);
          setSession(parsed);
        }
      } catch (error) {
        console.error('Failed to load session:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_session');
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const loginWithOAuth = useCallback(async (provider: OAuthProvider) => {
    setIsLoading(true);
    try {
      // Генерируем state для защиты от CSRF
      const state = Math.random().toString(36).substring(7);
      sessionStorage.setItem('oauth_state', state);

      const params = new URLSearchParams({
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID || '',
        redirect_uri: import.meta.env.VITE_TWITCH_REDIRECT_URI || 'http://localhost:5173/auth/callback',
        response_type: 'code',
        scope: provider === 'twitch' ? 'user:read:email' : 'user:email',
        state,
      });

      const authUrl = provider === 'twitch'
        ? `https://id.twitch.tv/oauth2/authorize?${params}`
        : `https://github.com/login/oauth/authorize?${params}`;

      window.location.href = authUrl;
    } catch (error) {
      console.error('OAuth login failed:', error);
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_session');
      setSession(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        if (data.session) {
          setSession(data.session);
          localStorage.setItem('auth_token', data.session.token);
          localStorage.setItem('auth_session', JSON.stringify(data.session));
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  }, []);

  const value: AuthContextType = {
    session,
    user: session?.user || null,
    isLoading,
    isAuthenticated: !!session && session.isValid,
    loginWithOAuth,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
