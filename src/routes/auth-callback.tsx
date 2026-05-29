
/**
 * src/routes/auth-callback.tsx
 *
 * Маршрут: /auth-callback
 *
 * Бэкенд после OAuth редиректит сюда:
 *   https://cybereden.vercel.app/auth-callback?token=<JWT>
 *
 * Читает токен → login() → /profile
 */

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth-callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const called     = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const params = new URLSearchParams(window.location.search);
    const token  = params.get("token");
    const err    = params.get("auth_error");

    if (err || !token) {
      console.error("OAuth error:", err ?? "no token");
      navigate({ to: "/" });
      return;
    }

    login(token).then(() => navigate({ to: "/profile" }));
  }, [login, navigate]);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center">
      <div className="hud-corners p-10 border border-border bg-surface/40 backdrop-blur text-center">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan animate-pulse">
          Идентификация кибера...
        </div>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
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
