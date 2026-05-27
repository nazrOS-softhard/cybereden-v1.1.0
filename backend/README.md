# CyberEden Backend

Express + TypeScript + Supabase, задеплоен на Vercel.

## Быстрый старт

```bash
npm install
cp .env.example .env
# Заполни .env своими ключами
npm run dev
```

## Эндпоинты

| Метод | URL | Auth | Описание |
|-------|-----|------|----------|
| GET | `/health` | — | Статус сервера |
| GET | `/api/auth/github` | — | URL для OAuth GitHub |
| GET | `/api/auth/github/callback` | — | Колбэк GitHub |
| GET | `/api/auth/twitch` | — | URL для OAuth Twitch |
| GET | `/api/auth/twitch/callback` | — | Колбэк Twitch |
| GET | `/api/auth/me` | ✅ | Текущий пользователь |
| POST | `/api/auth/logout` | — | Выход |
| GET | `/api/profile` | ✅ | Профиль (кибла кибера) |
| PATCH | `/api/profile` | ✅ | Обновить профиль |
| POST | `/api/upload/avatar` | ✅ | Загрузить аватарку |
| POST | `/api/upload/asset` | ✅ | Загрузить файл в активы |
| GET | `/api/upload/assets` | ✅ | Список активов |
| DELETE | `/api/upload/assets/:id` | ✅ | Удалить актив |

✅ = требуется заголовок `Authorization: Bearer <token>`

## Деплой на Vercel

1. Пуш в репозиторий
2. Vercel Dashboard → Add Project → выбрать папку `backend`
3. Settings → Environment Variables → добавить все из `.env.example`
4. Deploy

Проверка после деплоя:
```
https://your-backend.vercel.app/health
```
