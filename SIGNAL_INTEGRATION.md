# СИГНАЛ — Интеграция в profile.tsx

## Шаг 1 — Импорт

В `src/routes/profile.tsx` добавь импорт:

```tsx
import { SignalChannel } from "@/components/SignalChannel";
```

## Шаг 2 — Вставить в JSX

В профиле есть блоки: аватар, ПХ, активы и т.д.
Добавь `<SignalChannel />` как отдельную секцию:

```tsx
{/* ── СИГНАЛ — голосовой канал ────────────────────────── */}
<SignalChannel
  profileUserId={profileUser.id}          // id кибера чей профиль
  profileUserName={profileUser.display_name}
  isOwnProfile={me?.id === profileUser.id} // true если смотришь свой профиль
/>
```

### Где именно в JSX

Рекомендую между блоком активов и инвентарём — средняя часть профиля.

## Шаг 3 — VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY

Хук `useSignal` использует Supabase напрямую.
Убедись что в `.env` фронтенда есть:

```
VITE_SUPABASE_URL=https://xxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...
```

Если у тебя уже есть `src/lib/supabase.ts` с инициализированным клиентом —
замени в `useSignal.ts` строки:

```ts
// ЗАМЕНИТЬ:
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

// НА:
import { supabase } from "@/lib/supabase";  // или как у тебя называется
```

## Как это выглядит в профиле

### Чужой профиль (@kiberX)
```
┌─────────────────────────────────────┐
│  СИГНАЛ              Канал открыт   │
├─────────────────────────────────────┤
│  В канале:                          │
│  ● @f00rtime         🎙             │
│  ○ @kiberY           🔇             │
│                                     │
│  [ Signal ⚡ Войти в СИГНАЛ @kiberX ]│
└─────────────────────────────────────┘
```

### Своя кибла
```
┌─────────────────────────────────────┐
│  ● СИГНАЛ  👥 2      В эфире        │
├─────────────────────────────────────┤
│  В канале:                          │
│  ● @kiberY   🔇  [✓] [✕]           │
│  ● @kiberZ   🎙  [✓] [✕]           │
│                                     │
│  ✓ выдать микрофон · ✕ забрать      │
│                                     │
│  [🎙 Выкл]          [📵 Выйти]      │
└─────────────────────────────────────┘
```

## Логика флажков

| Кто | Что видит | Что может |
|-----|-----------|-----------|
| Хозяин канала | ✓ / ✕ рядом с каждым | Выдавать/забирать микрофон |
| Гость с микрофоном | Своя кнопка Вкл/Выкл | Глушить себя |
| Гость без микрофона | "Ожидание микрофона" | Только слушать |
| Незалогиненный | "Авторизуйся" | Ничего |

## Supabase Realtime каналы

Один Realtime channel на пользователя: `signal:{userId}`

Broadcast events:
- `offer`         — WebRTC offer от нового участника
- `answer`        — WebRTC answer
- `ice-candidate` — ICE кандидаты для NAT traversal  
- `grant-mic`     — хозяин выдаёт микрофон участнику
- `revoke-mic`    — хозяин забирает микрофон
- `leave`         — участник покидает канал

Presence (кто онлайн в канале): встроенный Supabase Presence API.

## Никаких серверов, никаких подписок

- Signaling: Supabase Realtime (уже есть в проекте, бесплатно)
- Голос: WebRTC P2P (браузерный API)
- STUN: Google stun.l.google.com (бесплатно навсегда)
- Нет медиасервера, нет relay — голос идёт напрямую браузер → браузер
