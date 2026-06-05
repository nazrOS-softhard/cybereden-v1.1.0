// КАРТЫ УСТРОЙСТВ
import rostn     from "@/assets/rostn.jpg";
import rostnFull from "@/assets/rostn-full.png";
import biohn     from "@/assets/biohn.png";
import biohnfull from "@/assets/biohnfull.png";
import blan      from "@/assets/blan.png";
import blanfull  from "@/assets/blanfull.png";
import clon      from "@/assets/clon.png";
import clonfull  from "@/assets/clonfull.png";
import pin       from "@/assets/pin.png";
import pinfull   from "@/assets/pinfull.png";
import vision    from "@/assets/vision.png";
import visionfull from "@/assets/visionfull.png";
import cybervaucher     from "@/assets/cybervaucher.png";
import cybervaucherfull from "@/assets/cybervaucher.png";

// МЕРОПРИЯТИЯ
import northPoster from "@/assets/north-event-poster.png";

// ─── Плейсхолдер для карточек без изображения ────────────────────────────────
const PLACEHOLDER_STRANNO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23a855f7'/%3E%3Cstop offset='1' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ctext x='200' y='220' text-anchor='middle' fill='white' font-size='60' font-family='monospace'%3EстраНно%3C/text%3E%3C/svg%3E";

const PLACEHOLDER_KEFIRNO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2322d3ee'/%3E%3Cstop offset='1' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ctext x='200' y='220' text-anchor='middle' fill='white' font-size='55' font-family='monospace'%3EкефирНно%3C/text%3E%3C/svg%3E";

export type Sensor = { label: string; unit: string; value: number; min: number; max: number };
export type Slider = { label: string; value: number; min: number; max: number; unit: string };

// marketCategory используется фильтром в маркете
export type MarketCategory = "УСТРОЙСТВА" | "СОФТ" | "ИНОЕ";

export type Item = {
  id: string;
  name: string;
  category: string;
  marketCategory: MarketCategory;
  price: number;
  status: "in_stock" | "low" | "preorder";
  image: string;
  expandedImage?: string;
  short: string;
  description: string;
  sensors: Sensor[];
  sliders: Slider[];
};

export const items: Item[] = [

  // ── УСТРОЙСТВА ──────────────────────────────────────────────────────────────

  {
    id: "biohn",
    name: "biohN",
    category: "БИОХАКИНГ",
    marketCategory: "УСТРОЙСТВА",
    price: 248000,
    status: "in_stock",
    image: biohn,
    expandedImage: biohnfull,
    short: "Интеллектуальный биотехнологический модуль для автономных биоэкспериментов",
    description:
      "Интеллектуальный биотехнологический модуль nazrOS для создания автономных экспериментальных биосред внутри цифровой инфраструктуры КиберэдэН.\n\nbiohN объединяет: климатический контроль, систему мониторинга среды, нейроаналитику параметров, модульную биоинженерию, цифровую синхронизацию с HUD-системой.\n\nКомплекс предназначен для исследований замкнутых экосистем, культивирования биосред, анализа микроклимата, автономных bio-pipeline процессов, интеграции биотехнологий в цифровую инфраструктуру.\n\nОсобенности: бесшумная архитектура, сенсорная система нового поколения, неоновая HUD-индикация, автономные режимы контроля, интеграция с AI-модулями nazrOS.",
    sensors: [
      { label: "Температура среды", unit: "°C",  value: 38,  min: 20,   max: 80  },
      { label: "Влажность",         unit: "%",   value: 42,  min: 0,    max: 100 },
      { label: "Сигнал био-нейро",  unit: "dBm", value: -52, min: -100, max: 0   },
    ],
    sliders: [
      { label: "Тактовая частота", value: 3.4, min: 1,  max: 6,   unit: "ГГц" },
      { label: "Мощность",         value: 65,  min: 10, max: 100, unit: "%"   },
      { label: "Охлаждение",       value: 50,  min: 0,  max: 100, unit: "%"   },
    ],
  },

  {
    id: "clon",
    name: "cloN",
    category: "ЦИФРОВЫЕ СУЩНОСТИ",
    marketCategory: "УСТРОЙСТВА",
    price: 6400,
    status: "in_stock",
    image: clon,
    expandedImage: clonfull,
    short: "Цифровая сущность-аватар для присутствия в сетевой среде",
    description:
      "Цифровая сущность-аватар внутри экосистемы КиберэдэН, предназначенная для визуального присутствия пользователя в сетевой среде nazrOS.\n\ncloN — это гибрид цифровой личности, HUD-профиля и игровой сигнатуры активности.\n\nСистема включает: кастомизацию внешности, 16-bit / cyber визуализацию, сигнатуры активности, систему XP, интеграцию с трансляциями и событиями.\n\nВнутри cloN отображаются: инженерный уровень, медиа-активность, инфраструктурный статус, достижения, цифровые артефакты пользователя.\n\nОсобенности: поддержка анимированных аватаров, HUD-паспорт пользователя, LIVE-индикаторы, системные статусы, редкость профиля.",
    sensors: [
      { label: "Яркость аватара",         unit: "нт", value: 1200, min: 100, max: 3000 },
      { label: "Температура ядра",        unit: "°C", value: 34,   min: 20,  max: 60   },
      { label: "Заряд цифровой сущности", unit: "%",  value: 73,   min: 0,   max: 100  },
    ],
    sliders: [
      { label: "Прозрачность HUD",   value: 60,  min: 0,  max: 100, unit: "%"  },
      { label: "Контраст",           value: 75,  min: 0,  max: 100, unit: "%"  },
      { label: "Частота обновления", value: 240, min: 60, max: 360, unit: "Гц" },
    ],
  },

  {
    id: "blan",
    name: "blaN",
    category: "ИНЖЕНЕРНЫЕ СИСТЕМЫ",
    marketCategory: "УСТРОЙСТВА",
    price: 8900,
    status: "in_stock",
    image: blan,
    expandedImage: blanfull,
    short: "Мобильная инженерная станция для управления цифровой инфраструктурой",
    description:
      "Мобильная инженерная станция nazrOS для разработки, диагностики и управления цифровой инфраструктурой КиберэдэН.\n\nblaN создан как портативное ядро разработчика цифровой среды.\n\nУстройство сочетает: высокопроизводительную вычислительную систему, модульную архитектуру, инструменты инженерного обслуживания, бесшумную работу, интеграцию с HUD-средой.\n\nПредназначение: разработка frontend/backend систем, работа с Unreal Engine, управление репозиториями, деплой цифровой среды, обслуживание серверной инфраструктуры.\n\nОсобенности: встроенные инженерные инструменты, модульный корпус, cyber-интерфейс, автономная рабочая станция, поддержка LIVE-разработки.",
    sensors: [
      { label: "Мощность",             unit: "дБм", value: 28,  min: 0, max: 40  },
      { label: "Полоса пропускания",   unit: "МГц", value: 40,  min: 1, max: 100 },
      { label: "КСВ",                  unit: "дБ",  value: 1.2, min: 1, max: 3   },
    ],
    sliders: [
      { label: "Усиление", value: 78, min: 0, max: 100, unit: "%" },
    ],
  },

  {
    id: "pin",
    name: "piN",
    category: "ПРОИЗВОДСТВО",
    marketCategory: "УСТРОЙСТВА",
    price: 12800,
    status: "in_stock",
    image: pin,
    expandedImage: pinfull,
    short: "Гибридный производственный модуль для цифрового моделирования и прототипирования",
    description:
      "Гибридный бесшумный производственный модуль nazrOS, совмещающий цифровое моделирование и физическое прототипирование.\n\npiN разработан как инженерный мост между цифровой средой и физическим производством.\n\nСистема объединяет: 3D-печать, модульную сборку, цифровое управление, мониторинг процессов, интеграцию с cybereden pipeline.\n\nПредназначение: создание корпусов устройств, производство инженерных компонентов, сборка прототипов, изготовление деталей инфраструктуры, работа с модульными системами.\n\nОсобенности: бесшумный режим работы, двойная производственная система, HUD-мониторинг, AI-контроль процессов, интеграция с инженерной экосистемой nazrOS.",
    sensors: [
      { label: "Температура печати", unit: "°C",  value: 220, min: 0,  max: 400 },
      { label: "Скорость печати",    unit: "мм/с", value: 80, min: 0,  max: 200 },
      { label: "Калибровка",         unit: "%",   value: 96,  min: 0,  max: 100 },
    ],
    sliders: [
      { label: "Сила хвата",         value: 55, min: 0, max: 100, unit: "%" },
      { label: "Скорость отклика",   value: 80, min: 0, max: 100, unit: "%" },
      { label: "Чувствительность",   value: 65, min: 0, max: 100, unit: "%" },
    ],
  },

  {
    id: "visionN",
    name: "ВЗГЛЯДН",
    category: "КИБЕР-ОПТИКА",
    marketCategory: "УСТРОЙСТВА",
    price: 15400,
    status: "in_stock",
    image: vision,
    expandedImage: visionfull,
    short: "Носимый визуальный интерфейс с системой цифрового анализа среды",
    description:
      "ВЗГЛЯДН — носимая система визуального анализа, предназначенная для расширения восприятия цифровой и физической среды.\n\nУстройство оснащено:\n• Центральной камерой наблюдения с потоковой передачей\n• Проекторами объёмной визуализации для HUD-интерфейсов\n• Светодиодными лампами для адаптивной подсветки\n\n▸ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ\n\n• Камера: 4K / 60 FPS\n• Проекция: Holographic HUD\n• Подсветка: Adaptive LED\n• Подключение: nazrOS LINK / Bluetooth 5.3\n• Защита: IP67 / -40°C ~ +49°C\n• Вес: 68 грамм\n\n▸ ВОЗМОЖНОСТИ\n\n• Дополненная реальность\n• Цифровые интерфейсы поверх среды\n• Запись и анализ объектов\n• Навигация в тёмных пространствах\n• Интеграция с экосистемой nazrOS",
    sensors: [
      { label: "Оптическая мощность", unit: "дБм", value: 28, min: 0, max: 40  },
      { label: "Температура сенсора", unit: "°C",  value: 34, min: 20, max: 60 },
      { label: "Заряд батареи",       unit: "%",   value: 73, min: 0, max: 100  },
    ],
    sliders: [
      { label: "Яркость HUD",   value: 60, min: 0, max: 100, unit: "%" },
      { label: "Контрастность", value: 75, min: 0, max: 100, unit: "%" },
    ],
  },

  // ── СОФТ ────────────────────────────────────────────────────────────────────

  {
    id: "stranno",
    name: "страНно",
    category: "НЕЙРОНЕТ",
    marketCategory: "СОФТ",
    price: 2400,
    status: "preorder",
    image: PLACEHOLDER_STRANNO,
    expandedImage: PLACEHOLDER_STRANNO,
    short: "Нейросетевой генератор нестандартных решений. Думает иначе.",
    description:
      "⚡ DEV MODE\nФункционал в стадии сборки. Возможны корректировки.\n\nстраНно — экспериментальный AI-ассистент, обученный на нестандартных паттернах мышления.\n\n▸ ФУНКЦИОНАЛЬНОСТЬ\n\n01. Генерация нестандартных решений\nНа основе контекста задачи предлагает неочевидные пути.\n\n02. Анализ паттернов\nИщет связи там, где другие не видят.\n\n03. Интеграция с nazrOS\nРаботает внутри цифровой инфраструктуры КиберэдэН.\n\n04. Адаптивное обучение\nЧем больше задач — тем точнее результат.\n\n▸ СТАТУС\nПредзаказ. Релиз после набора 100 пользователей.",
    sensors: [],
    sliders: [],
  },

  {
    id: "kefirno",
    name: "кефирНно",
    category: "УТИЛИТЫ",
    marketCategory: "СОФТ",
    price: 800,
    status: "preorder",
    image: PLACEHOLDER_KEFIRNO,
    expandedImage: PLACEHOLDER_KEFIRNO,
    short: "Утилита форматирования и очистки данных nazrOS.",
    description:
      "⚡ DEV MODE\nФункционал в стадии сборки. Возможны корректировки.\n\nкефирНно — утилита очистки и нормализации данных.\n\n▸ ФУНКЦИОНАЛЬНОСТЬ\n\n01. Форматирование\nПриводит данные к стандарту nazrOS.\n\n02. Очистка\nУдаляет дублирующиеся, повреждённые и устаревшие данные.\n\n03. Нормализация\nАвтоматически подбирает схему под тип входных данных.\n\n04. Пакетная обработка\nОбрабатывает массивы данных одной командой.\n\n▸ СТАТУС\nПредзаказ. Релиз Q3 2026.",
    sensors: [],
    sliders: [],
  },

  // ── ИНОЕ ────────────────────────────────────────────────────────────────────

  {
    id: "cybervaucher_nazrOS",
    name: "КИБЕРВАУЧЕР",
    category: "ИНВЕСТ",
    marketCategory: "ИНОЕ",
    price: 15400,
    status: "in_stock",
    image: cybervaucher,
    expandedImage: cybervaucherfull,
    short: "Тёмная подвеска — цифровой паспорт. Квалификация инвестора + ранний доступ к устройствам, софту nazrOS и системе лояльности.",
    description:
      "⚡ DEV MODE\nФункционал в стадии сборки. Возможны корректировки и горячие исправления.\n\nКИБЕРВАУЧЕР — тёмная подвеска с логотипом nazrOS.\nТвой цифровой паспорт в Цифровом конгломерате nazrOS.\n\n▸ ПРИОРИТЕТЫ\n\n01. Квалификация инвестора\nАктивация через Telegram Wallet → ID в Кибле Кибера.\n\n02. Ранний доступ к устройствам nazrOS\nНовые девайсы до анонса.\n\n03. Ранний доступ к софту nazrOS\nПрошивки и модули на стадии бета-тестирования.\n\n04. Система лояльности\nСкидки и подписки у партнёров:\n\n• Международные:\nSamsung, Apple, Sony, Xiaomi, Huawei, Microsoft, Honor, Oppo, Vivo, Motorola, Nokia, OnePlus, Meizu, Lenovo, ASUS, LG, HTC, ZTE, Infinix, realme, Google, Nothing\n\n• Российские:\nIrbis, BQ, DEXP, F+, Inoi, Tecno, Vertex\n\n▸ ЛОГИКА ПРИОБРЕТЕНИЯ\n\n1. «Приобрести» → Telegram-бот\n2. Оплата через Telegram Wallet\n3. Генерация уникального ID в формате NX-XXXXXXXX\n4. ID отображается в Кибле Кибера",
    sensors: [
      { label: "Оптическая мощность", unit: "дБм", value: 28, min: 0,  max: 40  },
      { label: "Температура сенсора", unit: "°C",  value: 34, min: 20, max: 60  },
      { label: "Заряд батареи",       unit: "%",   value: 73, min: 0,  max: 100 },
    ],
    sliders: [
      { label: "Яркость HUD",   value: 60, min: 0, max: 100, unit: "%" },
      { label: "Контрастность", value: 75, min: 0, max: 100, unit: "%" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// СТАТЬИ ЖУРНАЛА
// ══════════════════════════════════════════════════════════════════════════════

export type Article = {
  id: string;
  title: string;
  topic: "Кибербезопасность" | "Геймдев" | "Киберспорт" | "Хакинг" | "Цифровая этика";
  excerpt: string;
  body: string;
  readTime: number;
};

export const articles: Article[] = [
  {
    id: "a1",
    title: "Архитектура нового доверия",
    topic: "Кибербезопасность",
    excerpt: "Почему периметр умер и что пришло на смену.",
    readTime: 7,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">Архитектура нового доверия: Почему периметр умер</h2>
<p>Классическая концепция кибербезопасности «крепость с рвом» больше не защищает данные. На смену пришла концепция <strong style="color:#a855f7;">Zero Trust (Нулевое доверие)</strong>. Её главный постулат: <em>«Никому не доверяй, всегда проверяй»</em>.</p>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Периметра больше нет. Каждый нейронный запрос, каждый микросервис и каждый девайс — это potential точка компрометации.»</blockquote>
<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Алгоритм: Проектируем систему нового доверия</h3>
<div style="background:#111122;border:1px solid #334155;padding:20px;border-radius:6px;margin-bottom:24px;">
<span style="background:#a855f7;color:#fff;padding:2px 8px;font-size:12px;font-weight:bold;border-radius:4px;">ШАГ 1</span>
<h4 style="font-size:18px;color:#fff;margin:10px 0;">Аутентификация субъекта и контекста</h4>
<p style="font-size:14px;color:#cbd5e1;margin-bottom:15px;">Ваш сотрудник успешно ввёл логин, сложный пароль и прошёл MFA из дома. Ваши действия?</p>
<div style="margin-left:10px;">
<div style="margin-bottom:12px;"><strong style="color:#ef4444;">❌ Вариант А:</strong> Выдать сессионный токен на 8 часов.<br><span style="color:#64748b;font-size:13px;">⚠️ Если через 5 минут устройство перехватит инфостилер — злоумышленник будет легитимно работать оставшиеся 7:55.</span></div>
<div><strong style="color:#22c55e;">✅ Вариант Б (Zero Trust):</strong> Запустить непрерывную аттестацию контекста.<br><span style="color:#64748b;font-size:13px;">⚙️ Система каждые несколько минут проверяет IP, процессы и поведение пользователя.</span></div>
</div></div>
<div style="background:#111122;border:1px solid #334155;padding:20px;border-radius:6px;margin-bottom:24px;">
<span style="background:#22d3ee;color:#000;padding:2px 8px;font-size:12px;font-weight:bold;border-radius:4px;">ШАГ 2</span>
<h4 style="font-size:18px;color:#fff;margin:10px 0;">Микросегментация</h4>
<div style="margin-left:10px;">
<div style="margin-bottom:12px;"><strong style="color:#ef4444;">❌ VLAN по отделам:</strong> внутри подсети трафик не фильтруется — East-West attack.</div>
<div><strong style="color:#22c55e;">✅ Микросегментация на уровне запросов:</strong> Каждый микросервис изолирован. Доступ — точечно.</div>
</div></div>
<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Чек-лист для разработчика</h3>
<ul style="padding-left:24px;margin-bottom:20px;">
<li style="margin-bottom:6px;"><strong style="color:#22d3ee;">Сокращай</strong> время жизни accessToken, используй ротацию refreshToken.</li>
<li style="margin-bottom:6px;"><strong style="color:#22d3ee;">Защищай</strong> каждый эндпоинт как будто он открыт для всего интернета.</li>
<li style="margin-bottom:6px;"><strong style="color:#22d3ee;">Логируй</strong> контекст использования данных для поведенческого анализа.</li>
</ul>
</div>`,
  },

  {
    id: "a2",
    title: "KILLNET",
    topic: "Хакинг",
    excerpt: "Как хакерские группировки стали частью цифровой геополитики.",
    readTime: 7,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Как хакерские группировки стали частью цифровой геополитики</h2>
<p>За последние годы термин «хакерская группировка» перестал ассоциироваться исключительно с подпольными форумами. Современные цифровые объединения — полноценные участники глобального информационного пространства.</p>
<p>Одним из наиболее обсуждаемых стала группа <strong style="color:#fb923c;">Killnet</strong> — русскоязычное хактивистское объединение, получившее широкую известность благодаря DDoS-атакам и информационным операциям.</p>
<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Цифровое пространство стало новым полем противостояния»</blockquote>
<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это стало феноменом</h3>
<p>Новые объединения работают принципиально иначе: публичные медиа, визуальная айдентика, цифровой бренд, активность в соцсетях. Фактически хактивисты стали частью цифровой медиасреды.</p>
<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как изменился образ хакера</h3>
<p>Сегодня это: аналитики, сетевые исследователи, OSINT-комьюнити, специалисты по цифровой безопасности. Выросший интерес — к сетевой анонимности, шифрованию данных, цифровой приватности.</p>
<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Информация стала новой инфраструктурой современного мира»</blockquote>
</div>`,
  },

  {
    id: "a3",
    title: "UNIGINE",
    topic: "Геймдев",
    excerpt: "Российский движок для серьёзных симуляций.",
    readTime: 9,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#ec4899;border-left:4px solid #ec4899;padding-left:16px;margin-top:0;">UNIGINE — российский движок для серьёзных симуляций</h2>
<p><strong style="color:#f472b6;">UNIGINE</strong> изначально создавался как высокоточная система визуализации для промышленных симуляторов, цифровых двойников, военных тренажёров, VR/AR-сред. И только потом вокруг него начал формироваться полноценный gamedev-слой.</p>
<blockquote style="border-left:4px solid #ec4899;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«UNIGINE — это не просто движок. Это инженерная философия визуализации»</blockquote>
<h3 style="font-size:22px;color:#f472b6;margin-top:32px;">Чем UNIGINE отличается от массовых движков</h3>
<ul style="padding-left:24px;margin-bottom:20px;list-style-type:disc;">
<li>Огромные пространства без потери точности</li><li>Стабильный FPS в тяжёлых сценах</li>
<li>Физически корректный рендер</li><li>Работа с GIS и реальными картами</li>
<li>Корпоративные и государственные проекты</li>
</ul>
<h3 style="font-size:22px;color:#f472b6;margin-top:32px;">Российские студии и инди-сцена</h3>
<p>Внутри СНГ gamedev имеет особую эстетику: постсоветский sci-fi, индустриальные пространства, мрачный киберпанк. S.T.A.L.K.E.R., Escape From Tarkov, Atomic Heart — именно это ощущение.</p>
<h3 style="font-size:22px;color:#f472b6;margin-top:32px;">Моддинг как основа комьюнити</h3>
<p>Тысячи разработчиков начинали с модов: GTA, Source Engine, SAMP, STALKER SDK, Garry's Mod. Моддинг — это школа, где учатся создавать миры.</p>
</div>`,
  },

  {
    id: "a4",
    title: "TEAM YANDEX",
    topic: "Киберспорт",
    excerpt: "Как корпорации заходят в цифровой спорт.",
    readTime: 6,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<div style="margin-bottom:30px;border-radius:8px;overflow:hidden;border:1px solid #333;">
<iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Team Yandex" frameborder="0" allowfullscreen style="width:100%;height:400px;display:block;"></iframe>
</div>
<h2 style="font-size:28px;color:#06b6d4;border-left:4px solid #06b6d4;padding-left:16px;margin-top:0;">Как корпорации заходят в цифровой спорт</h2>
<p>В последние годы в цифровой спорт начинают заходить крупные технологические компании. Наиболее заметный пример — <strong style="color:#22d3ee;">Team Yandex</strong>.</p>
<blockquote style="border-left:4px solid #06b6d4;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Мы не просто играем — мы строим цифровую культуру» — Team Yandex</blockquote>
<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Как меняется киберспорт</h3>
<p>Раньше команда = игроки. Теперь команда — это бренд, визуальный стиль, цифровая идентичность, HUD-интерфейсы, live production, AI-анализ матчей. Киберспорт начинает выглядеть как операционная система.</p>
<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Киберспорт — это не игра. Это инфраструктура цифрового будущего»</blockquote>
</div>`,
  },

  {
    id: "a5",
    title: "Кто владеет твоими снами?",
    topic: "Цифровая этика",
    excerpt: "Сны как данные — правовой вакуум.",
    readTime: 10,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#a855f7;border-left:4px solid #a855f7;padding-left:16px;margin-top:0;">Кто владеет твоими снами?</h2>
<p>После анонса DreamCache крупные технологические корпорации получили потенциальный доступ к слоям REM-памяти через нейроинтерфейсы. Регуляторы молчат. Что происходит на самом деле?</p>
<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Правовой вакуум нейроданных</h3>
<p>Законодательство большинства стран до сих пор не содержит определения «нейроданные». Это означает, что мысли, воспоминания и образы, зафиксированные BCI-устройствами, формально не защищены персональными данными.</p>
<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Мы защитили биометрию, но забыли защитить сознание»</blockquote>
<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Что говорят регуляторы</h3>
<p>ЕС начал разработку «Нейроправ» — расширения GDPR на данные мозговой активности. В России аналогичные инициативы пока на стадии обсуждения. США разделены: бизнес-лобби против регулирования, гражданские организации требуют немедленных мер.</p>
<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Что делать прямо сейчас</h3>
<ul style="padding-left:24px;">
<li style="margin-bottom:6px;">Читать пользовательские соглашения нейроустройств</li>
<li style="margin-bottom:6px;">Требовать opt-out для сбора нейроданных</li>
<li style="margin-bottom:6px;">Поддерживать законодательные инициативы по нейроправам</li>
</ul>
</div>`,
  },

  {
    id: "a6",
    title: "ICE-машины 2090: что под капотом",
    topic: "Кибербезопасность",
    excerpt: "Активная защита: от ловушек до контратак.",
    readTime: 8,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">ICE-машины: технический разбор систем активной защиты</h2>
<p>Intrusion Countermeasures Electronics (ICE) — не просто фантастический термин. Современные системы активной киберзащиты всё больше напоминают ICE из киберпанк-прозы Гибсона.</p>
<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Что такое активная защита</h3>
<p>В отличие от пассивных фаерволов и антивирусов, активные системы не ждут атаки — они выходят навстречу. Honeypot-сети заманивают злоумышленников в ловушку, собирая данные об их тактиках. Deception Technology создаёт целые фиктивные инфраструктуры.</p>
<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Слабые места современных ICE</h3>
<ul style="padding-left:24px;list-style-type:disc;">
<li style="margin-bottom:6px;">Высокая стоимость внедрения и сопровождения</li>
<li style="margin-bottom:6px;">Ложные срабатывания на легитимный трафик</li>
<li style="margin-bottom:6px;">Уязвимость самих систем защиты</li>
<li style="margin-bottom:6px;">Правовые ограничения на контратаки</li>
</ul>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Лучшая защита — заставить атакующего думать, что он уже внутри»</blockquote>
</div>`,
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// СОБЫТИЯ
// ══════════════════════════════════════════════════════════════════════════════

export type Event = {
  id: string;
  title: string;
  type: "ТРАНСЛЯЦИИ" | "ТУРНИРЫ" | "ХАКАТОНЫ" | "ДЕПЫ";
  date: string;
  location: string;
  description: string;
  streamUrl?: string;
};

export const events: Event[] = [
  { id: "e1",  title: "This is GameDev",          type: "ТРАНСЛЯЦИИ", date: "Everyday",               location: "Twitch",                          description: "Тени неонового кода, ритмы компиляции — всё это геймдев. Разбираем архитектуру, создаём HUD-интерфейсы и строим цифровые миры.", streamUrl: "https://www.twitch.tv/lana_lux" },
  { id: "e7",  title: "BLAST Slam VII",            type: "ТУРНИРЫ",   date: "26.05.2026 - 05.06.2026", location: "BLAST Studio · Копенгаген",        description: "Арена высшего киберспортивного мастерства. Холодный расчёт аналитиков, жар бескомпромиссных сражений.", streamUrl: "https://www.twitch.tv/betboom_dota_ru" },
  { id: "e13", title: "КиберХак 2027",             type: "ХАКАТОНЫ",  date: "20.08.2027",              location: "Эрарта · Санкт-Петербург",         description: "Главный хакатон киберсистемы nazrOS. 48 часов непрерывного кодинга, менторство и призовой фонд." },
  { id: "e14", title: "назрОС РазрабКонф 2027",    type: "ХАКАТОНЫ",  date: "08.09.2027",              location: "ЦДП · Москва",                     description: "Конференция разработчиков киберсистемы nazrOS. Доклады, открытые мастерские, нетворкинг." },
  { id: "e15", title: "ПИКСЕЛИ",                   type: "ХАКАТОНЫ",  date: "02.06.2027",              location: "Иннополис · Казань",               description: "12-часовой геймджем для инди-разработчиков. Тема объявляется в момент старта." },
  { id: "e16", title: "TWS: Плесетск",             type: "ХАКАТОНЫ",  date: "06.04.2027 – 12.04.2027", location: "Плесетск · Архангельская область",  description: "The Week Space — цифровое космическое событие в рамках Российской недели космоса." },
  { id: "e17", title: "АРКТИЧЕСКИЙ ПРОТОКОЛ",      type: "ХАКАТОНЫ",  date: "17.09.2027",              location: "Кластер Северного Дизайна · Мурманск", description: "Креативная резиденция для дизайнеров, медиахудожников и цифровых креаторов." },
  { id: "e18", title: "СИНТЕЗ: ЦИФРОВОЙ СЕЗОН",    type: "ХАКАТОНЫ",  date: "24.09.2027",              location: "IT-парк Цифровая Арктика · Архангельск", description: "Биотехнологическое инженерное мероприятие для Крайнего Севера." },
  { id: "e19", title: "PORTAL",                    type: "ДЕПЫ",      date: "2026",                    location: "· Москва",                         description: "Визуальное ядро nazrOS. Интерфейсы, HUD-системы, motion-дизайн и цифровая типографика." },
  { id: "e20", title: "SIGNAL",                    type: "ДЕПЫ",      date: "5 — 7 июня 2026",         location: "· Москва",                         description: "Трансляции, цифровой журнал, медиа-среда и голос экосистемы nazrOS." },
  { id: "e21", title: "PIRATE STATION",            type: "ДЕПЫ",      date: "31 октября",              location: "VK Stadium · Москва",              description: `<div style="font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;"><div style="margin-bottom:20px;border-radius:8px;overflow:hidden;border:1px solid #333;"><img src="${northPoster}" alt="Pirate Station" style="width:100%;height:auto;display:block;" /></div><p>Мир древних северных мифов вновь откроет врата. Тени арктических духов, холод неоновых огней — часть единого цифрового обряда.</p></div>` },
  { id: "e22", title: "BLACK! FACTORY",            type: "ДЕПЫ",      date: "...",                     location: "Station B · Киев",                 description: "Экспериментальные технологии, фантомные концепты и прототипирование будущих систем nazrOS." },
  { id: "e23", title: "CXEMA",                     type: "ДЕПЫ",      date: "...",                     location: "Otel' · Киев",                     description: "Серверные системы, сборка устройств, аппаратные платформы, ЦОДы и инженерная инфраструктура nazrOS." },
  { id: "e24", title: "LOSHADKA",                  type: "ДЕПЫ",      date: "...",                     location: "... · Санкт-Петербург",            description: "Архитектура мышления среды, протоколы взаимодействия и системная философия nazrOS." },
  { id: "e25", title: "TRIP",                      type: "ДЕПЫ",      date: "...",                     location: "... · ...",                        description: "Экспедиции, полевые исследования, цифровые маршруты, аудиовизуальные хроники nazrOS." },
  { id: "e26", title: "GAMMA",                     type: "ДЕПЫ",      date: "03.07.2026 – 06.07.2026", location: "ТехноПарк Степан Разин · Санкт-Петербург", description: "Полигон симуляций nazrOS. Пространство тотального искусства." },
  { id: "e27", title: "PRESENT PERFECT",           type: "ДЕПЫ",      date: "2026",                    location: "К-30 · Санкт-Петербург",           description: "Нарратив и связь nazrOS. Береговая линия Финского залива." },
  { id: "e28", title: "System108",                 type: "ДЕПЫ",      date: "06.06.2026",              location: "Blank · Санкт-Петербург",          description: "Экспериментальные режимы системы, нестандартные интерфейсы, психоцифровые состояния nazrOS." },
];

// ══════════════════════════════════════════════════════════════════════════════
// КИБЕРЫ (статичный список для дашборда — заменяется реальными данными из API)
// ══════════════════════════════════════════════════════════════════════════════

export type Cyber = {
  id: string;
  handle: string;
  rank: "НАБЛЮДАТЕЛЬ" | "ОПЕРАТОР" | "АРХИТЕКТОР ЯДРА" | "ГЛАВНЫЙ РАЗРАБОТЧИК";
  xp: number;
  status: "online" | "ghost" | "offline";
  streaming?: boolean;
};

export const cybers: Cyber[] = [
  { id: "c1",  handle: "@f00rtime", rank: "ОПЕРАТОР",    xp: 482300, status: "online",   streaming: true  },
  { id: "c2",  handle: "@TBA",      rank: "НАБЛЮДАТЕЛЬ", xp: 0,      status: "ghost",    streaming: false },
  { id: "c3",  handle: "@TBA",      rank: "НАБЛЮДАТЕЛЬ", xp: 0,      status: "offline"  },
  { id: "c4",  handle: "@TBA",      rank: "НАБЛЮДАТЕЛЬ", xp: 0,      status: "offline"  },
  { id: "c5",  handle: "@TBA",      rank: "НАБЛЮДАТЕЛЬ", xp: 0,      status: "offline"  },
];

// ══════════════════════════════════════════════════════════════════════════════
// ДАТАЦЕНТР
// ══════════════════════════════════════════════════════════════════════════════

export type Asset = {
  id: string;
  name: string;
  category: string;
  format: string;
  size: string;
  xp: number;
  badge?: "LIVE"|"NEW"|"CORE"|"SYSTEM"|"FEATURED"|"RESTRICTED"|"EXPERIMENTAL"|"ALPHA"|"BETA"|"CLASSIFIED";
};

export const assetCategories = [
  "Цифровые артефакты",    "Системные модули",          "Объёмные модели",
  "Медиа модули",          "Цифровые протоколы",        "Цифровые сущности",
  "Стрим-файлы КиберэдэН", "Модели игровых движоков",   "Файлы разработчиков игр",
  "ИИ-боты",               "Пространства и уровни",     "Кинематографические файлы",
];

export const datacenterAssets: Asset[] = [
  { id: "da1", name: "Интерфейс Спутникого терминал Сфера", category: "Цифровые артефакты", format: "SVG", size: "245 MB", xp: 1500, badge: "ALPHA" },
];
