# 🚀 Руководство по внесению изменений в CyberEden (nazrOS)

Полное пошаговое руководство по реализации всех обновлений проекта.

---

## 📋 Содержание изменений

1. ✅ Расширение маркета (8 карточек вместо 4)
2. ✅ Фильтры дашборда по ролям
3. ✅ Расширение профиля (АКТИВЫ, ЗНАНИЯ, OAuth)
4. ✅ Новая система событий (ТРАНСЛЯЦИИ, ТУРНИРЫ, ХАКАТОНЫ, ДЕПЫ)

---

## 🔧 Подробное руководство по файлам

### 1️⃣ Обновление `src/lib/mockData.ts`

**Шаг 1:** Откройте файл `src/lib/mockData.ts`

**Шаг 2: Расширение товаров (items)**
- Найдите строку: `export const items: Item[] = [`
- Добавьте 4 новых товара после существующих:
  - `ICE-breaker v2` (утилиты, 3200 XP)
  - `Dream patch` (нейротехнологии, 1200 XP)
  - `Signal Booster X` (коммуникации, 2800 XP)
  - `Core Optimizer Pro` (системное ПО, 4500 XP)
  - `HUD Skin: Neon Edition` (интерфейсы, 890 XP)

Каждый товар включает:
```typescript
{
  id: "unique-id",
  name: "Название",
  category: "Категория",
  price: 1000,
  status: "in_stock|low|preorder",
  image: importedImage,
  short: "Краткое описание",
  description: "Полное описание",
  sensors: [...],
  sliders: [...]
}
```

**Шаг 3: Обновление киберов (cybers)**
- Найдите строку: `export const cybers: Cyber[] = [`
- Замените тип ранга с `string` на перечисление:
  ```typescript
  rank: "НАБЛЮДАТЕЛЬ" | "ОПЕРАТОР" | "АРХИТЕКТОР ЯДРА" | "ГЛАВНЫЙ РАЗРАБОТЧИК"
  ```
- Добавьте поле: `streaming?: boolean;`
- Расширьте список с 6 на 12 киберов с правильными ролями
- Сортируйте по убыванию XP

**Шаг 4: Обновление событий (events)**
- Найдите строку: `export const events: Event[] = [`
- Измените тип:
  ```typescript
  type: "ТРАНСЛЯЦИИ" | "ТУРНИРЫ" | "ХАКАТОНЫ" | "ДЕПЫ"
  ```
- Замените все события на новые 24 события (по 6 в каждой категории)
- Используйте новые названия и описания из задания

---

### 2️⃣ Обновление `src/routes/dashboard.tsx`

**Шаг 1:** Откройте файл `src/routes/dashboard.tsx`

**Шаг 2: Добавьте импорты**
В начало файла добавьте:
```typescript
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
```

**Шаг 3: Добавьте константу ролей**
Перед функцией `DashboardPage()` добавьте:
```typescript
const roles = ["ВСЕ", "НАБЛЮДАТЕЛЬ", "ОПЕРАТОР", "АРХИТЕКТОР ЯДРА", "ГЛАВНЫЙ РАЗРАБОТЧИК"] as const;
```

**Шаг 4: Добавьте state и фильтрацию**
В начало компонента добавьте:
```typescript
const [selectedRole, setSelectedRole] = useState<(typeof roles)[number]>("ВСЕ");

const filtered = useMemo(() => {
  if (selectedRole === "ВСЕ") return cybers;
  return cybers.filter((c) => c.rank === selectedRole);
}, [selectedRole]);

const sorted = [...filtered].sort((a, b) => b.xp - a.xp);
```

**Шаг 5: Добавьте блок фильтров**
После `px-5 py-3` div'а добавьте:
```jsx
<div className="flex flex-wrap gap-2">
  {roles.map((role) => (
    <button
      key={role}
      onClick={() => setSelectedRole(role)}
      className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all ${
        role === selectedRole
          ? "neon-border-cyan neon-text-cyan"
          : "border-border text-muted-foreground"
      }`}
    >
      {role}
    </button>
  ))}
</div>
```

**Шаг 6: Обновите строки киберов**
Замените:
```tsx
cybers.map((c, i) => (...))
```
на:
```tsx
sorted.map((c, i) => (
  <Link
    key={c.id}
    to="/profile"
    className="... cursor-pointer group"
  >
    {/* строка с добавлением indicator для streaming */}
    {c.streaming && (
      <span className="ml-2 text-[10px] neon-text-acid">● STREAM</span>
    )}
  </Link>
))
```

---

### 3️⃣ Обновление `src/routes/profile.tsx`

**Шаг 1:** Откройте файл `src/routes/profile.tsx`

**Шаг 2: Обновите импорты**
Замените импорты иконок на:
```typescript
import { Trophy, Github, Twitch, Globe, ShoppingBag, Upload, BookOpen, Calendar, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
```

**Шаг 3: Добавьте новые данные**
Перед функцией добавьте:
```typescript
const assets = [
  { id: "a1", name: "neural_map_v3.zip", size: "245 MB", xp: 500 },
  { id: "a2", name: "protocol_lib.json", size: "12 MB", xp: 250 },
];

const knowledge = [
  { title: "Архитектура Zero Trust", progress: 85, xp: 1200, type: "Статья" },
  { title: "Эксплойты нейро-API", progress: 60, xp: 800, type: "Видео" },
  { title: "Основы HUD-дизайна", progress: 45, xp: 600, type: "Курс" },
];
```

**Шаг 4: Сделайте аккаунты интерактивными**
Замените `div` на `button`:
```typescript
<button
  className={`flex items-center gap-3 p-3 border transition ${
    a.connected
      ? "border-border bg-background/40 hover:neon-border-acid"
      : "border-border bg-background/20 hover:border-neon-cyan cursor-pointer"
  }`}
>
```

**Шаг 5: Добавьте загрузку аватарки**
В avatar card добавьте label:
```jsx
<label className="absolute inset-0 ... cursor-pointer">
  <div className="flex flex-col items-center gap-2">
    <Upload size={24} />
    <span className="text-xs">Загрузить аватар</span>
  </div>
  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
</label>
```

**Шаг 6: Добавьте section АКТИВЫ**
После inventory добавьте новую секцию:
```jsx
<section className="hud-corners p-6 border border-border bg-surface/40">
  <div className="flex items-center gap-2 mb-4">
    <Zap size={14} className="neon-text-cyan" />
    <div className="font-display text-sm neon-text-violet">АКТИВЫ</div>
  </div>
  {/* Список активов и loader */}
  <label className="flex items-center gap-2 p-3 border-2 border-dashed">
    <Upload size={16} />
    <span>Загрузить файл</span>
    <input type="file" onChange={handleAssetUpload} className="hidden" />
  </label>
</section>
```

**Шаг 7: Добавьте section ЗНАНИЯ**
После АКТИВЫ добавьте:
```jsx
<section className="hud-corners p-6 border border-border bg-surface/40">
  <div className="flex items-center gap-2 mb-4">
    <BookOpen size={14} className="neon-text-cyan" />
    <div className="font-display text-sm neon-text-violet">ЗНАНИЯ</div>
  </div>
  {/* Progress bars для каждого курса */}
  {knowledge.map((item) => (
    <div key={item.title}>
      <div className="flex justify-between">
        <span>{item.title}</span>
        <span className="neon-text-acid">+{item.xp} XP</span>
      </div>
      <div className="w-full bg-background/40 h-2 mt-1">
        <div className="bg-neon-cyan h-full" style={{width: `${item.progress}%`}} />
      </div>
    </div>
  ))}
</section>
```

**Шаг 8: Добавьте ссылки на рынок и события**
В inventory section добавьте:
```jsx
<Link to="/market" className="text-[10px] neon-text-acid">
  Перейти →
</Link>
```

В achievements section добавьте:
```jsx
<Link to="/events" className="text-[10px] neon-text-acid">
  События →
</Link>
```

---

### 4️⃣ Обновление `src/routes/events.tsx`

**Шаг 1:** Откройте файл `src/routes/events.tsx`

**Шаг 2: Обновите типы фильтров**
Замените:
```typescript
const types = ["Все", "Стрим", "Турнир", "Митап", "Хакатон"] as const;
```
на:
```typescript
const types = ["ВСЕ", "ТРАНСЛЯЦИИ", "ТУРНИРЫ", "ХАКАТОНЫ", "ДЕПЫ"] as const;
```

**Шаг 3: Обновите начальное значение**
Замените:
```typescript
const [type, setType] = useState<(typeof types)[number]>("Все");
```
на:
```typescript
const [type, setType] = useState<(typeof types)[number]>("ВСЕ");
```

**Шаг 4: Обновите условие фильтрации**
Замените:
```typescript
type === "Все" ? events
```
на:
```typescript
type === "ВСЕ" ? events
```

**Шаг 5: Обновите отображение даты**
Замените в NeonCard:
```jsx
meta={`${e.date} · ${e.location}`}
```
на:
```jsx
meta={`${e.date ? e.date + " · " : ""}${e.location}`}
```

**Шаг 6: Обновите мета в модале**
Замените в ExpandedCardModal:
```jsx
{ label: "Дата", value: active.date }
```
на:
```jsx
{ label: "Дата", value: active.date || "Постоянно" }
```

**Шаг 7: Скройте текст для ДЕПЫ**
Добавьте условие:
```jsx
{active.type !== "ДЕПЫ" && (
  <p className="text-muted-foreground">
    Регистрация открыта...
  </p>
)}
```

---

## 📦 Подготовка к деплою на Cloudflare

### Предварительные требования
```bash
npm install
npm run build
```

### Файлы конфигурации

**`wrangler.toml`** (для Cloudflare Workers):
```toml
name = "cybereden"
main = "src/server.ts"
compatibility_date = "2024-01-01"

[env.production]
vars = { ENVIRONMENT = "production" }
```

**`vercel.json`** (уже есть, проверьте наличие):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### Процесс деплоя на Cloudflare Pages

1. **Подготовьте репозиторий на GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CyberEden with all updates"
   git push -u origin main
   ```

2. **Создайте Pages проект в Cloudflare**
   - Зайдите в Cloudflare Dashboard
   - Pages → Create a project
   - Выберите ваш репозиторий
   - Установите settings:
     - Framework: Vite
     - Build command: `npm run build`
     - Build output directory: `dist`

3. **Установите переменные окружения (если требуются)**
   - Pages → Settings → Environment variables

---

## 🧪 Локальное тестирование

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшена локально
npm run preview
```

---

## ✅ Чеклист проверки

После внесения всех изменений проверьте:

- [ ] Маркет отображает 8+ карточек
- [ ] Дашборд имеет фильтры по 5 ролям
- [ ] Киберы в дашборде сортируются по XP
- [ ] Клик на кибера ведёт в профиль
- [ ] Профиль содержит загрузку аватарки
- [ ] Профиль содержит АКТИВЫ с загрузкой файлов
- [ ] Профиль содержит ЗНАНИЯ с прогресс-барами
- [ ] Профиль ссылается на маркет и события
- [ ] События отображаются по 4 категориям
- [ ] ДЕПЫ событий не имеют даты
- [ ] Все ссылки между страницами работают
- [ ] На мобильных устройствах корректно отображается

---

## 🚀 Деплой шаги

1. **Подготовьте архив**
   ```bash
   cd /path/to/project
   git archive --format=zip HEAD > cybereden-release.zip
   ```

2. **Загрузите на GitHub**
   ```bash
   git push --all
   git push --tags
   ```

3. **Создайте Release**
   - GitHub → Releases → New Release
   - Укажите версию (e.g., v1.1.0)
   - Добавьте изменения в description
   - Загрузите архив

4. **Деплой на Cloudflare Pages**
   - Pages → Your Project → Deployments
   - Автоматический деплой при push на main

---

## 📞 Поддержка

Если возникают ошибки:
1. Проверьте типы в `mockData.ts`
2. Убедитесь, что импорты правильно указаны
3. Запустите `npm run build` для проверки ошибок сборки
4. Очистите node_modules: `rm -rf node_modules && npm install`

---

**Версия документа:** 1.0  
**Дата:** 23.05.2024  
**Статус:** Ready for production
