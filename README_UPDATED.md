# 🌐 CyberEden (nazrOS) v1.1.0

**Киберпанк-платформа для взаимодействия, обучения и соревнований в цифровой экосистеме будущего.**

![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4?logo=tailwindcss)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.0-000000)

---

## ✨ Что нового в v1.1.0

### 🛍️ Маркет
- ✅ Расширено с 4 до 8+ карточек товаров
- ✅ Новые категории: Утилиты, Нейротехнологии, Коммуникации, Системное ПО, Интерфейсы
- ✅ Каждый товар с полными характеристиками и датчиками

### 👥 Дашборд
- ✅ Система фильтрации по 4 ролям:
  - 🔍 **НАБЛЮДАТЕЛЬ** - базовый уровень доступа
  - ⚙️ **ОПЕРАТОР** - управление системами
  - 🏗️ **АРХИТЕКТОР ЯДРА** - проектирование инфраструктуры
  - 🎯 **ГЛАВНЫЙ РАЗРАБОТЧИК** - полный контроль
- ✅ Киберы сортируются по XP (от большего к меньшему)
- ✅ Клик на никнейм ведёт в профиль
- ✅ Индикатор активных трансляций (STREAM)
- ✅ Обновленные статусы (online/ghost/offline)

### 👤 Профиль
- ✅ **АКТИВЫ** - загрузка файлов с анализом нейросетью и начисленем XP
- ✅ **ЗНАНИЯ** - отслеживание прогресса чтения статей и просмотра видео
  - Визуализация прогресса через прогресс-бары
  - Начисление XP за завершение
- ✅ **Загрузка аватарки** с конвертацией в 16-битный формат
- ✅ **OAuth-авторизация** для GitHub и Twitch (интерактивные кнопки)
- ✅ **Ссылки на маркет** из инвентаря
- ✅ **Ссылки на события** из достижений

### 🎪 Мероприятия
- ✅ Система фильтрации по 4 категориям:
  - 📡 **ТРАНСЛЯЦИИ** (6 событий)
    - HUD CORE LIVE, PHANTOM BUILD, SYSTEM TEST
    - DEVICE ASSEMBLY, LIVE DEBUG SESSION, MOTION STREAM
  - 🏆 **ТУРНИРЫ** (6 событий)
    - CORE WAR, NEXUS GRID CUP, SIGNAL BROADCAST LEAGUE
    - INTERFACE CLASH, CODE RUSH, BLACK PROTOCOL ARENA
  - 💻 **ХАКАТОНЫ** (6 событий)
    - HACK THE CORE, HUD OVERDRIVE, SIGNAL LIVE JAM
    - PROTOCOL JAM, HARDWARE NIGHT, SIMULATION EVENT
  - 🏢 **ДЕПЫ** (6 отделов)
    - Portal, Signal, Pirate Station
    - Black! Factory, CXEMA, LOSHADKA

---

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- npm или pnpm

### Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/cybereden.git
cd cybereden

# Установите зависимости
npm install

# Запустите dev сервер
npm run dev

# Откройте в браузере
# http://localhost:5173
```

### Сборка для продакшена

```bash
# Сборка оптимизированного бандла
npm run build

# Локальный предпросмотр продакшена
npm run preview

# Проверка линтера
npm run lint
```

---

## 📁 Структура проекта

```
src/
├── components/           # React компоненты
│   ├── PageShell.tsx    # Основной контейнер страницы
│   ├── NeonCard.tsx     # Карточка с неоновым стилем
│   ├── ExpandedCardModal.tsx  # Модальное окно товара
│   └── ...
├── routes/              # TanStack Router маршруты
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Главная страница
│   ├── market.tsx       # 🛍️ Маркет
│   ├── dashboard.tsx    # 👥 Дашборд
│   ├── profile.tsx      # 👤 Профиль
│   ├── events.tsx       # 🎪 События
│   ├── journal.tsx      # 📰 Журнал
│   └── streams.tsx      # 📡 Трансляции
├── lib/
│   ├── mockData.ts      # Все данные приложения
│   ├── i18n.tsx         # Интернационализация
│   └── utils.ts         # Утилиты
├── styles.css           # Глобальные стили Tailwind
└── main.tsx             # Entry point

public/
├── _redirects           # Netlify/Cloudflare редиректы
└── [assets]             # Изображения и ресурсы
```

---

## 🎨 Технологии

| Технология | Версия | Описание |
|-----------|--------|----------|
| **React** | 18.x | UI библиотека |
| **Vite** | 5.x | Быстрый bundler |
| **TanStack Router** | 1.x | Современный роутер |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.x | Утилити-первый CSS |
| **Framer Motion** | Latest | Анимации |
| **Lucide Icons** | Latest | SVG иконки |

---

## 📚 Документация

- 📖 **[Руководство по внесению изменений](./INSTALLATION_GUIDE.md)** - Подробный гайд для разработчиков
- ☁️ **[Гайд деплоя на Cloudflare](./CLOUDFLARE_DEPLOYMENT.md)** - Инструкции по развёртыванию
- 🔗 **[Vite Documentation](https://vitejs.dev)**
- ⚛️ **[React Documentation](https://react.dev)**
- 🛣️ **[TanStack Router Docs](https://tanstack.com/router/latest)**

---

## 🔄 Git Workflow

```bash
# Создайте feature branch
git checkout -b feature/your-feature

# Сделайте изменения и коммиты
git add .
git commit -m "feat: описание вашего изменения"

# Push в GitHub
git push origin feature/your-feature

# Создайте Pull Request на GitHub
```

### Правила коммитов

```
feat:     Новая функция
fix:      Исправление ошибки
docs:     Изменения документации
style:    Форматирование кода
refactor: Рефакторинг
test:     Добавление тестов
chore:    Обновление зависимостей
```

---

## 🚀 Деплой

### Cloudflare Pages (Рекомендуется)

```bash
# 1. Подготовьте код к GitHub
git push -u origin main

# 2. В Cloudflare Dashboard:
#    - Pages → Create project
#    - Connect to Git
#    - Build command: npm install && npm run build
#    - Output directory: dist

# 3. Автоматический деплой при каждом push в main
```

### Vercel

```bash
# 1. Установите Vercel CLI
npm i -g vercel

# 2. Деплой
vercel deploy --prod
```

### Netlify

```bash
# 1. Установите Netlify CLI
npm i -g netlify-cli

# 2. Деплой
netlify deploy --prod --dir=dist
```

---

## 🎯 Roadmap

- [ ] Система аутентификации (OAuth2)
- [ ] Backend API для синхронизации данных
- [ ] Реальные трансляции (WebRTC)
- [ ] Система награждения (NFT)
- [ ] Мультиплеер игровые механики
- [ ] Mobile приложение (React Native)
- [ ] Поддержка PWA
- [ ] Даркнет интеграция

---

## 🤝 Контрибьютинг

Готовы помочь развивать CyberEden? 🚀

1. Fork репозиторий
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Коммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## 📝 Лицензия

MIT License - смотрите [LICENSE](./LICENSE) для деталей

---

## 🔗 Ссылки

- 🌐 **Live Demo:** https://cybereden.pages.dev
- 📦 **GitHub:** https://github.com/yourusername/cybereden
- 🐛 **Issues:** https://github.com/yourusername/cybereden/issues
- 💬 **Discussions:** https://github.com/yourusername/cybereden/discussions

---

## 📞 Контакты

- 📧 Email: dev@cybereden.io
- 🐦 Twitter: [@cybereden_io](https://twitter.com)
- 💬 Discord: [Присоединиться](https://discord.gg/cybereden)

---

## 🙏 Спасибо

Спасибо всем, кто способствует развитию CyberEden! 

- Дизайн вдохновлён киберпанк-эстетикой
- Компоненты основаны на современных best practices
- Доступность - наш приоритет

---

**Версия:** 1.1.0  
**Последнее обновление:** 23.05.2024  
**Статус:** Production Ready ✅

---

> **"В будущем, где цифровое и физическое слиты воедино, сообщество создаёт реальность."** — CyberEden
