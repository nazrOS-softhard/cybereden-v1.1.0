# CyberEden Backend 🚀

Полнофункциональный бэкенд на Cloudflare Workers для CyberEden - платформы обмена цифровыми активами и управления профилем.

## 📋 Функции

✅ **OAuth2 Аутентификация**
- GitHub OAuth
- Twitch OAuth
- JWT токены
- Автоматическое создание профилей

✅ **Управление Профилями**
- Загрузка аватарок в R2
- Редактирование профиля
- Приватные/публичные профили
- Система уровней на основе XP

✅ **DATACENTER (Хранилище активов)**
- Загрузка файлов в R2
- Поддержка видео, аудио, изображений, моделей, документов
- Публичный доступ к файлам других киберов
- Отслеживание скачиваний

✅ **Система XP**
- Начисление XP за загрузку файлов
- Система уровней
- Таблица лидеров (по XP, загрузкам, активам)
- История XP логов

✅ **API для Фронтенда**
- RESTful API с JSON
- CORS поддержка
- Полная обработка ошибок
- Rate limiting готов к внедрению

## 🛠️ Требования

- Node.js 18+
- npm или yarn
- Аккаунт Cloudflare
- GitHub OAuth приложение
- Twitch OAuth приложение

## 📦 Установка

### 1. Клонировать репозиторий

```bash
git clone <repo-url>
cd cybereden-backend
```

### 2. Установить зависимости

```bash
npm install
# или
yarn install
```

### 3. Настроить переменные окружения

```bash
cp .env.example .env
```

Заполните `.env` следующими значениями:

```env
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
TWITCH_CLIENT_ID=xxx
TWITCH_CLIENT_SECRET=xxx
JWT_SECRET=your-super-secret-key
API_URL=http://localhost:8787
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 4. Настроить GitHub OAuth

1. Перейти на https://github.com/settings/developers
2. Создать новое OAuth приложение
3. Установить Callback URL: `http://localhost:8787/auth/github/callback`
4. Скопировать Client ID и Client Secret в `.env`

### 5. Настроить Twitch OAuth

1. Перейти на https://dev.twitch.tv/console/apps
2. Создать новое приложение
3. Установить Callback URL: `http://localhost:8787/auth/twitch/callback`
4. Скопировать Client ID и Client Secret в `.env`

## 🚀 Запуск

### Локальная разработка

```bash
npm run dev
# Запустит Worker на http://localhost:8787
```

### Создать D1 базу данных

```bash
npm run db:create
```

### Применить миграции

```bash
npm run db:migrate
```

### Развертывание на Cloudflare

```bash
# Production
npm run deploy:prod

# Staging
npm run deploy
```

## 📚 API Документация

### Аутентификация

#### POST /auth/github
```json
{
  "code": "authorization_code",
  "state": "optional_state"
}
```

**Ответ:**
```json
{
  "user": { /* User object */ },
  "token": "jwt_token",
  "expires_in": 604800
}
```

#### POST /auth/twitch
Аналогично GitHub OAuth

#### GET /auth/me
Получить текущего пользователя

**Headers:** `Authorization: Bearer <token>`

#### POST /auth/refresh
Обновить JWT токен

### Загрузка файлов

#### POST /upload/avatar
Загрузить аватар

**Headers:** `Authorization: Bearer <token>`

**Body:** FormData с полем `file`

**Ответ:**
```json
{
  "message": "Avatar uploaded successfully",
  "user": { /* Updated user */ },
  "avatar_url": "https://..."
}
```

#### POST /upload/asset
Загрузить цифровой актив

**Headers:** `Authorization: Bearer <token>`

**Body:** FormData
- `file` - файл
- `isPublic` - публичность (true/false)
- `description` - описание

**Ответ:**
```json
{
  "asset": { /* Asset object */ },
  "xp_awarded": 150,
  "new_total_xp": 500
}
```

### Активы (DATACENTER)

#### GET /assets
Получить список публичных активов

**Query параметры:**
- `page` - номер страницы (по умолчанию 1)
- `limit` - количество на странице (по умолчанию 50)
- `search` - поиск по названию файла
- `type` - фильтр по типу файла
- `sort` - сортировка: recent, popular, trending

#### GET /assets/:id
Получить информацию об активе

#### GET /assets/user/:userId
Получить активы конкретного пользователя

#### GET /assets/my
Получить мои активы

**Headers:** `Authorization: Bearer <token>`

#### GET /download/:id
Скачать файл актива

#### DELETE /assets/:id
Удалить актив

**Headers:** `Authorization: Bearer <token>`

#### PUT /assets/:id/visibility
Изменить видимость актива

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "is_public": true
}
```

### Профили

#### GET /profile
Получить мой профиль

**Headers:** `Authorization: Bearer <token>`

#### GET /profile/:userId
Получить профиль пользователя

#### PUT /profile
Обновить профиль

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "display_name": "New Name",
  "bio": "My bio",
  "is_public": true
}
```

#### GET /leaderboard
Получить таблицу лидеров

**Query параметры:**
- `limit` - количество записей (макс 500)
- `type` - xp, downloads, assets

#### GET /profile/:userId/stats
Получить статистику пользователя

#### GET /search/users
Поиск пользователей

**Query параметры:**
- `q` - поисковый запрос (мин 2 символа)
- `limit` - количество результатов

### XP System

#### POST /xp/add
Добавить XP (обычно вызывается внутри системы)

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "amount": 100,
  "reason": "Asset uploaded",
  "asset_id": "optional"
}
```

#### GET /xp/logs
Получить историю XP

**Headers:** `Authorization: Bearer <token>`

#### GET /xp/leaderboard
Таблица лидеров по XP

**Query параметры:**
- `limit` - количество (макс 500)
- `period` - all, week, month

#### GET /xp/level/:userId
Получить информацию об уровне пользователя

#### GET /stats
Получить общую статистику платформы

## 📁 Структура проекта

```
src/
├── worker.ts           # Главный файл Worker
├── types/
│   └── index.ts        # TypeScript типы
├── lib/
│   ├── auth.ts         # OAuth2 и JWT логика
│   ├── db.ts           # Работа с D1
│   └── storage.ts      # Работа с R2
├── middleware/
│   └── auth.ts         # Middleware для аутентификации
├── routes/
│   ├── auth.ts         # OAuth роуты
│   ├── upload.ts       # Загрузка файлов
│   ├── assets.ts       # Управление активами
│   ├── profile.ts      # Профили
│   └── xp.ts           # XP система
└── db/
    └── schema.sql      # Структура БД
```

## 🔐 Безопасность

- JWT токены с 7-дневным сроком действия
- CORS включен
- Валидация размера файлов
- Проверка прав доступа
- SQL injection защита (prepared statements)
- Rate limiting готов к внедрению

## 🌍 Развертывание

### Production на Cloudflare

1. Создать проект на Cloudflare
2. Настроить D1 базу данных
3. Создать R2 buckets
4. Создать KV namespace для кэширования
5. Заполнить все переменные в `wrangler.toml`
6. Запустить `npm run deploy:prod`

### Мониторинг

Все запросы логируются в консоль Cloudflare. Используйте Cloudflare Analytics для мониторинга.

## 📝 Лицензия

MIT

## 👥 Контакты

CyberEden Team

## 🤝 Вклад

Приветствуются pull requests!
