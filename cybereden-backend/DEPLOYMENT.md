# 🚀 Пошаговый план развертывания CyberEden Backend

## Этап 1: Подготовка на Cloudflare

### 1.1 Создать аккаунт на Cloudflare
- Перейти на https://dash.cloudflare.com
- Создать бесплатный аккаунт или использовать существующий

### 1.2 Создать D1 базу данных

```bash
# Установить Wrangler CLI
npm install -g wrangler

# Авторизоваться
wrangler login

# Создать D1 базу данных
wrangler d1 create cybereden-db

# Результат будет содержать:
# [[d1_databases]]
# binding = "DB"
# database_name = "cybereden-db"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
# preview_database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 1.3 Создать R2 buckets

```bash
# Bucket для аватаров
wrangler r2 bucket create cybereden-avatars

# Bucket для активов
wrangler r2 bucket create cybereden-assets

# В production версия:
# Без -preview для продакшена
```

### 1.4 Создать KV namespace

```bash
# Для кэширования OAuth state
wrangler kv:namespace create AUTH_CACHE

# Результат:
# [[kv_namespaces]]
# binding = "AUTH_CACHE"
# id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# preview_id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 1.5 Создать R2 API token

1. Перейти на https://dash.cloudflare.com/?to=/:account/r2/api-tokens
2. Click "Create API token"
3. Выбрать "Edit" permissions для R2
4. Copy: Access Key ID и Secret Access Key
5. Сохранить в `.env` и `wrangler.toml`

## Этап 2: Настроить OAuth приложения

### 2.1 GitHub OAuth

1. Перейти на https://github.com/settings/developers
2. Click "New OAuth App"
3. Заполнить:
   - Application name: `CyberEden`
   - Homepage URL: `https://cybereden.com`
   - Authorization callback URL: `https://api.cybereden.com/auth/github/callback`
   - (для локальной разработки: `http://localhost:8787/auth/github/callback`)
4. Copy Client ID и Client Secret
5. Добавить в `wrangler.toml`:
   ```toml
   GITHUB_CLIENT_ID = "xxx"
   GITHUB_CLIENT_SECRET = "xxx"
   ```

### 2.2 Twitch OAuth

1. Перейти на https://dev.twitch.tv/console/apps
2. Click "Create Application"
3. Заполнить:
   - Application Name: `CyberEden`
   - OAuth Redirect URL: `https://api.cybereden.com/auth/twitch/callback`
   - (для локальной разработки: `http://localhost:8787/auth/twitch/callback`)
4. Click "Manage"
5. Copy Client ID и Client Secret
6. Добавить в `wrangler.toml`:
   ```toml
   TWITCH_CLIENT_ID = "xxx"
   TWITCH_CLIENT_SECRET = "xxx"
   ```

## Этап 3: Обновить wrangler.toml

Скопировать все ID из предыдущих шагов в `wrangler.toml`:

```toml
[d1_databases]
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # Из шага 1.2
preview_database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

[[r2_buckets]]
bucket_name = "cybereden-avatars"

[[r2_buckets]]
bucket_name = "cybereden-assets"

[[kv_namespaces]]
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # Из шага 1.4
preview_id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

[vars]
GITHUB_CLIENT_ID = "xxx"
GITHUB_CLIENT_SECRET = "xxx"
TWITCH_CLIENT_ID = "xxx"
TWITCH_CLIENT_SECRET = "xxx"
JWT_SECRET = "super-secret-key-change-in-production"
```

## Этап 4: Локальная разработка и тестирование

### 4.1 Запустить локальный сервер

```bash
npm install
npm run dev

# Сервер будет на http://localhost:8787
```

### 4.2 Создать и заполнить БД

```bash
# Применить миграции
npm run db:migrate

# Проверить базу:
wrangler d1 execute cybereden-db --file src/db/schema.sql --local
```

### 4.3 Протестировать API

```bash
# Health check
curl http://localhost:8787/health

# Получить активы
curl http://localhost:8787/assets

# Поиск пользователей
curl http://localhost:8787/search/users?q=test
```

### 4.4 Настроить фронтенд

В фронтенд-проекте CyberEden:

```typescript
// src/config/api.ts
export const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
    ? 'https://api.cybereden.com'
    : 'http://localhost:8787';
```

## Этап 5: Развертывание на Production

### 5.1 Создать production D1 (опционально)

```bash
# Если нужна отдельная production БД
wrangler d1 create cybereden-db-prod
```

### 5.2 Обновить route в wrangler.toml

```toml
[env.production]
routes = [
  { pattern = "api.cybereden.com/*", zone_name = "cybereden.com" }
]
```

### 5.3 Развернуть на Cloudflare

```bash
# Staging (preview)
npm run deploy

# Production
npm run deploy:prod
```

### 5.4 Применить миграции на production

```bash
# Для production базы
wrangler d1 execute cybereden-db --file src/db/schema.sql --env production
```

### 5.5 Обновить GitHub/Twitch OAuth callback URLs

После получения final API URL на Cloudflare:

**GitHub:**
1. https://github.com/settings/developers
2. Обновить Authorization callback URL на production URL

**Twitch:**
1. https://dev.twitch.tv/console/apps
2. Обновить OAuth Redirect URL на production URL

## Этап 6: Настройка домена

### 6.1 Подключить домен к Cloudflare

1. Перейти на https://dash.cloudflare.com
2. Add site
3. Выбрать Cloudflare nameservers
4. Обновить nameservers у registrar

### 6.2 Создать CNAME record

1. DNS управление в Cloudflare
2. Add record:
   - Type: CNAME
   - Name: api
   - Target: your-worker.workers.dev
   - Proxy status: Proxied

## Этап 7: Мониторинг и обслуживание

### 7.1 Отслеживать логи

```bash
# Real-time логи
wrangler tail

# Или через Cloudflare Dashboard:
# https://dash.cloudflare.com -> Workers -> Logs
```

### 7.2 Проверять метрики

- CPU Time
- Requests
- Errors
- Bandwidth

### 7.3 Резервные копии D1

```bash
# Экспортировать БД
wrangler d1 backup-download cybereden-db

# Сохранить в безопасном месте
```

## Этап 8: Улучшения и оптимизация

### 8.1 Включить caching

```typescript
// В worker.ts
const cacheKey = new URL(request.url).pathname;
const cache = caches.default;

const cachedResponse = await cache.match(cacheKey);
if (cachedResponse) return cachedResponse;
```

### 8.2 Добавить rate limiting

```typescript
// В middleware/auth.ts
const limited = await rateLimit(
  env.AUTH_CACHE,
  `${ip}:${endpoint}`,
  10,
  60
);
```

### 8.3 Добавить логирование в Sentry

```bash
npm install @sentry/node

// В worker.ts
Sentry.captureException(error);
```

## 🔍 Troubleshooting

### Ошибка: "Database not found"
```bash
# Проверить database_id в wrangler.toml
wrangler d1 list

# Пересоздать если нужно
wrangler d1 delete cybereden-db --force
wrangler d1 create cybereden-db
```

### Ошибка: "R2 bucket not found"
```bash
# Проверить bucket names
wrangler r2 bucket list

# Создать если не существует
wrangler r2 bucket create cybereden-avatars
```

### OAuth не работает
1. Проверить callback URL в GitHub/Twitch
2. Проверить GITHUB_CLIENT_ID и SECRET в wrangler.toml
3. Проверить API_URL в env

### Проблемы с CORS
```toml
# Убедиться что CORS_ORIGINS содержит фронтенд URL
CORS_ORIGINS = "http://localhost:5173,https://cybereden.com"
```

## ✅ Чек-лист Развертывания

- [ ] D1 база данных создана и связана в wrangler.toml
- [ ] R2 buckets созданы (avatars и assets)
- [ ] KV namespace создан для AUTH_CACHE
- [ ] R2 API token создан и добавлен в wrangler.toml
- [ ] GitHub OAuth приложение создано и настроено
- [ ] Twitch OAuth приложение создано и настроено
- [ ] JWT_SECRET установлен (сильный пароль)
- [ ] CORS_ORIGINS обновлены для фронтенда
- [ ] Локальная разработка протестирована
- [ ] БД миграции применены
- [ ] API endpoints протестированы
- [ ] Развернуто на staging
- [ ] Протестировано на staging
- [ ] Развернуто на production
- [ ] Production OAuth URLs обновлены
- [ ] Домен подключен и работает

## 📞 Поддержка

Если возникают проблемы:
1. Проверить логи: `wrangler tail`
2. Проверить Cloudflare Dashboard
3. Проверить GitHub/Twitch OAuth settings
4. Пересоздать необходимые ресурсы
