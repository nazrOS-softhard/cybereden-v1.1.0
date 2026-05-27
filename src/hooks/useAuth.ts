
// hooks/useAuth.ts
import { useState, useCallback } from 'react';

interface User {
  id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  level: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  });

  const loginWithGitHub = useCallback(async (code: string) => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const response = await fetch(`${API_BASE_URL}/auth/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error('Auth failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setState(s => ({
        ...s,
        user: data.user,
        token: data.token,
        loading: false,
      }));
    } catch (error) {
      setState(s => ({
        ...s,
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      }));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    loginWithGitHub,
    logout,
  };
}
