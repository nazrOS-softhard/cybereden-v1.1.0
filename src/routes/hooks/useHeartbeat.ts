
/**
 * src/hooks/useHeartbeat.ts
 *
 * Отправляет POST /api/auth/heartbeat каждые 5 минут пока юзер авторизован.
 * Это обновляет last_login в БД → дашборд показывает "online".
 *
 * Использование: вызови один раз в __root.tsx или AuthProvider.
 */

import { useEffect } from 'react';
import { getToken } from '@/lib/auth';

const API            = (import.meta.env.VITE_API_URL || 'https://cybereden-v1-1-0.vercel.app').replace(/\/$/, '');
const INTERVAL_MS    = 5 * 60 * 1000;   // 5 минут
const VISIBILITY_KEY = 'heartbeat_ts';

async function sendHeartbeat() {
  const token = getToken();
  if (!token) return;

  try {
    await fetch(`${API}/api/auth/heartbeat`, {
      method:  'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    sessionStorage.setItem(VISIBILITY_KEY, String(Date.now()));
  } catch {
    // Игнорируем ошибки сети — не критично
  }
}

export function useHeartbeat() {
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    // Первый пинг сразу при монтировании (обновляем last_login при каждом входе на сайт)
    sendHeartbeat();

    // Периодический пинг
    const interval = setInterval(sendHeartbeat, INTERVAL_MS);

    // Пинг при возврате на вкладку (пользователь переключился и вернулся)
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        const last  = Number(sessionStorage.getItem(VISIBILITY_KEY) || 0);
        const since = Date.now() - last;
        // Пингуем если с последнего раза прошло > 2 мин
        if (since > 2 * 60 * 1000) sendHeartbeat();
      }
    };

    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);
}
