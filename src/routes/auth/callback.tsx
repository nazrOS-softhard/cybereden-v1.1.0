
/**
 * src/routes/auth/callback.tsx
 *
 * TanStack Router маршрут /auth/callback
 * Вызывается когда бэкенд редиректит после OAuth:
 *   https://cybereden.vercel.app/auth/callback?token=<JWT>
 *
 * Читает токен → сохраняет → загружает профиль → идёт на /profile
 */

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth';

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const calledRef  = useRef(false);   // защита от двойного вызова (StrictMode)

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const token  = params.get('token');
    const error  = params.get('auth_error');

    if (error) {
      console.error('OAuth error:', error);
      navigate({ to: '/' });
      return;
    }

    if (!token) {
      navigate({ to: '/' });
      return;
    }

    // Сохраняем токен и грузим профиль, потом идём на /profile
    login(token).then(() => {
      navigate({ to: '/profile' });
    });
  }, [login, navigate]);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="hud-corners p-10 border border-border bg-surface/40 backdrop-blur text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan animate-pulse">
          Синхронизация кибера...
        </div>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-neon-cyan animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
