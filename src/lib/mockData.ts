// КАРТЫ УСТРОЙСТВ и СОФТА
import rostn from "@/assets/rostn.jpg";
import rostnfull from "@/assets/rostnfull.png";
import biohn from "@/assets/biohn.png";
import biohnfull from "@/assets/biohnfull.png";
import blan from "@/assets/blan.png";
import blanfull from "@/assets/blanfull.png";
import clon from "@/assets/clon.png";
import clonfull from "@/assets/clonfull.png";
import pin from "@/assets/pin.png";
import pinfull from "@/assets/pinfull.png";
import vision from "@/assets/vision.png";
import visionfull from "@/assets/visionfull.png";
import cybervaucher from "@/assets/cybervaucher.png";
import cybervaucherfull from "@/assets/cybervaucherfull.png";
import stranno from "@/assets/stranno.png";
import kefirnno from "@/assets/kefirnno.png";

// ГАЛЛЕРЕЯ УСТРОЙСТВ и СОФТА
import strannoScreen1 from "@/assets/stranno-screen1.png";
import kefirnnoScreen1 from "@/assets/kefirnno-screen1.png";

// МЕРОПРИЯТИЯ
import northPoster from "@/assets/north-event-poster.png";
import cyberhack from "@/assets/cyberhack.png";
import arcticprotocol from "@/assets/arcticprotocol.png";
import razrabconf from "@/assets/razrabconf.png";
import pikseli from "@/assets/pikseli.png";
import sintez from "@/assets/sintez.png";


// ЖУРНАЛ
import enginedayN from "@/assets/enginedayN.png";
import freshN from "@/assets/freshN.png";
import modeN from "@/assets/modeN.png";
import sporN from "@/assets/sporN.png";
import technroomN from "@/assets/technroomN.png";
import rusdarknet from "@/assets/rusdarknet.png";
import iotjur from "@/assets/iotjur.png";

// ─── Плейсхолдер для карточек без изображения ────────────────────────────────
const PLACEHOLDER_STRANNO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23a855f7'/%3E%3Cstop offset='1' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ctext x='200' y='220' text-anchor='middle' fill='white' font-size='60' font-family='monospace'%3EстраНно%3C/text%3E%3C/svg%3E";

const PLACEHOLDER_KEFIRNO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2322d3ee'/%3E%3Cstop offset='1' stop-color='%230f172a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ctext x='200' y='220' text-anchor='middle' fill='white' font-size='55' font-family='monospace'%3EкефирНно%3C/text%3E%3C/svg%3E";

export type Sensor = { label: string; unit: string; value: number; min: number; max: number };
export type Slider = { label: string; value: number; min: number; max: number; unit: string };




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
  gallery?: string[];
};

export const items: Item[] = [
  // ── УСТРОЙСТВА ──────────────────────────────────────────────────────────────
  {
    id: "biohn",
    name: "biohN",
    category: "БИОТЕХНОЛОГИИ",
    marketCategory: "УСТРОЙСТВА",
    price: 248000,
    status: "in_stock",
    image: biohn,
    expandedImage: biohnfull,
    short: "Городская биотехнологическая пасека для мониторинга опылителей и исследования городской экосистемы.",
    description:
      "biohN — интеллектуальный биотехнологический комплекс nazrOS для размещения пчелиных колоний в городской и пригородной среде.\n\nУстройство представляет собой автономную подвесную станцию, внутри которой расположены силиконовые соты, датчики среды, камеры наблюдения и система мониторинга активности колонии.\n\nПчёлы попадают внутрь через входной канал станции, взаимодействуют с внутренней экосистемой и покидают устройство через отдельный выходной канал.\n\nУстройство оснащено:\n• Системой мониторинга колонии\n• Камерами наблюдения\n• Датчиками температуры и влажности\n• Анализаторами окружающей среды\n• Микроскопическим модулем наблюдения\n• Системой удалённого доступа\n\n▸ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ\n\n• Тип: городская автономная пасека\n• Конструкция: подвесная станция\n• Соты: модульные силиконовые\n• Камеры: Full HD / Timelapse\n• Подключение: Wi-Fi / nazrOS LINK\n• Питание: автономное\n\n▸ ВОЗМОЖНОСТИ\n\n• Мониторинг активности колонии\n• Анализ окружающей среды\n• Исследование поведения опылителей\n• Ведение цифрового журнала наблюдений\n• Онлайн-трансляция из улья\n• Сбор экологической статистики\n• Интеграция с экосистемой nazrOS\n\n▸ ЦИФРОВАЯ АНАЛИТИКА\n\n• История развития колонии\n• Карта активности пчёл\n• Архив наблюдений\n• Аналитика микроклимата\n• Рекомендации системы\n• Интеграция с КиберэдэН",
    sensors: [
      { label: "Температура улья", unit: "°C", value: 34, min: 20, max: 45 },
      { label: "Влажность", unit: "%", value: 61, min: 0, max: 100 },
      { label: "Активность колонии", unit: "%", value: 78, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Вентиляция", value: 55, min: 0, max: 100, unit: "%" },
      { label: "Мониторинг", value: 90, min: 0, max: 100, unit: "%" },
      { label: "Автоматизация", value: 80, min: 0, max: 100, unit: "%" },
    ],
    gallery: [biohn, biohnfull],
  },
  {
    id: "rostn",
    name: "rostN",
    category: "БИОТЕХНОЛОГИИ",
    marketCategory: "УСТРОЙСТВА",
    price: 128000,
    status: "in_stock",
    image: rostn,
    expandedImage: rostnfull,
    short: "Автономная домашняя теплица с системой мониторинга и управления через приложение ростН.",
    description:
      "ростН — домашняя интеллектуальная теплица для выращивания растений, обучения агротехнологиям и проведения биологических экспериментов в контролируемой среде.\n\nУстройство оснащено:\n• Автоматической системой освещения\n• Управлением вентиляцией и микроклиматом\n• Системой полива и дозирования\n• Камерами наблюдения за стадиями роста\n• Комплексом датчиков среды\n• Интеграцией с приложением ростН\n\n▸ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ\n\n• Освещение: Full Spectrum LED\n• Камеры: 1080p / Timelapse\n• Подключение: Wi-Fi / Bluetooth\n• Контроль климата: автоматический\n• Управление: приложение ростН\n• Питание: 220 В\n\n▸ ВОЗМОЖНОСТИ\n\n• Отслеживание стадий роста растений\n• Ведение цифрового дневника выращивания\n• Уведомления о состоянии среды\n• Аналитика роста по данным камер\n• Рекомендации по уходу\n• Удалённое управление оборудованием\n• Интеграция с экосистемой nazrOS",
    sensors: [
      { label: "Температура", unit: "°C", value: 24, min: 0, max: 50 },
      { label: "Влажность", unit: "%", value: 67, min: 0, max: 100 },
      { label: "Освещённость", unit: "lx", value: 5400, min: 0, max: 10000 },
    ],
    sliders: [
      { label: "Мощность света", value: 80, min: 0, max: 100, unit: "%" },
      { label: "Вентиляция", value: 55, min: 0, max: 100, unit: "%" },
      { label: "Полив", value: 40, min: 0, max: 100, unit: "%" },
    ],
    gallery: [rostn, rostnfull],
  },
  {
    id: "clon",
    name: "cloN",
    category: "ИНФРАСТРУКТУРНЫЕ СИСТЕМЫ",
    marketCategory: "УСТРОЙСТВА",
    price: 186000,
    status: "in_stock",
    image: clon,
    expandedImage: clonfull,
    short: "Персональный сервер экосистемы nazrOS для хранения данных, управления устройствами и развития цифрового ядра пользователя.",
    description:
      "cloN — персональный центр управления цифровой инфраструктурой пользователя внутри экосистемы nazrOS.\n\nУстройство объединяет функции домашнего сервера, системы резервного копирования, управляющего узла устройств и цифрового ядра пользователя.\n\nВнутри cloN развивается цифровая сущность, которая получает новые возможности по мере подключения оборудования, накопления данных и расширения инфраструктуры.\n\nУстройство оснащено:\n• Вычислительным ядром nazrOS\n• Локальным облачным хранилищем\n• Системой резервирования данных\n• Контроллером устройств экосистемы\n• Модулем цифровой сущности cloN\n• Системой обновления прошивок\n\n▸ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ\n\n• Процессор: Infrastructure Computing Unit\n• Хранилище: до 128 ТБ\n• Резервирование: RAID-массивы\n• Подключение: Ethernet / Wi-Fi / nazrOS LINK\n• Режим работы: 24/7\n• Охлаждение: пассивное / активное\n• Корпус: модульная архитектура\n\n▸ ВОЗМОЖНОСТИ\n\n• Хранение данных экосистемы\n• Локальное облако пользователя\n• Централизованное резервное копирование\n• Управление устройствами nazrOS\n• Синхронизация цифровых сред\n• Хранение архивов проектов\n• Распространение обновлений прошивок\n• Контроль состояния инфраструктуры\n\n▸ ЦИФРОВОЕ ЯДРО\n\n• Развитие цифровой сущности cloN\n• Получение опыта за подключение устройств\n• Формирование цифровой истории пользователя\n• Интеграция с КиберэдэН\n• Интеграция с кефирННо\n• Интеграция со страННо\n\n▸ ИНТЕГРАЦИЯ С ЭКОСИСТЕМОЙ\n\n• blaN — инженерные станции\n• piN — производственные модули\n• biohN — биотехнологические комплексы\n• rostN — исследовательские станции\n• КиберэдэН — цифровая инфраструктура\n• Ядро назрОС — единая система управления",
    sensors: [
      { label: "Загрузка ядра", unit: "%", value: 42, min: 0, max: 100 },
      { label: "Использование хранилища", unit: "%", value: 61, min: 0, max: 100 },
      { label: "Температура системы", unit: "°C", value: 37, min: 20, max: 80 },
    ],
    sliders: [
      { label: "Резервирование", value: 85, min: 0, max: 100, unit: "%" },
      { label: "Производительность", value: 72, min: 0, max: 100, unit: "%" },
      { label: "Синхронизация", value: 90, min: 0, max: 100, unit: "%" },
    ],
    gallery: [clon, clonfull],
  },
  {
    id: "blan",
    name: "blaN",
    category: "ИНЖЕНЕРНЫЕ СИСТЕМЫ",
    marketCategory: "УСТРОЙСТВА",
    price: 348000,
    status: "in_stock",
    image: blan,
    expandedImage: blanfull,
    short: "Инженерный ноутбук-конструктор со встроенным инструментальным модулем.",
    description:
      "blaN — мобильная инженерная станция, объединяющая производительный ноутбук и полноценный комплект инструментов для обслуживания цифровой и физической инфраструктуры.\n\nУстройство оснащено:\n• Модульным корпусом\n• Выдвижным инструментальным отсеком\n• Сменными инструментальными кассетами\n• Сервисными отсеками хранения\n• Системой быстрого доступа к инструментам\n\nВнутри могут размещаться:\n• Отвёртки\n• Кримпер\n• Мультитул\n• Щупы\n• Мультиметр\n• Кабели и переходники\n• Инструменты для обжима проводов\n\n▸ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ\n\n• Экран: 16\" IPS / OLED\n• Процессор: инженерная конфигурация\n• Память: до 128 ГБ\n• Накопители: до 8 ТБ\n• Подключение: Wi-Fi 7 / Bluetooth / Ethernet\n• Корпус: модульный алюминиевый сплав\n\n▸ ВОЗМОЖНОСТИ\n\n• Разработка программного обеспечения\n• Диагностика оборудования\n• Работа в полевых условиях\n• Ремонт и обслуживание техники\n• Инженерные расчёты\n• Интеграция с устройствами nazrOS",
    sensors: [
      { label: "Температура CPU", unit: "°C", value: 58, min: 20, max: 100 },
      { label: "Загрузка системы", unit: "%", value: 47, min: 0, max: 100 },
      { label: "Заряд батареи", unit: "%", value: 82, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Производительность", value: 75, min: 0, max: 100, unit: "%" },
      { label: "Охлаждение", value: 60, min: 0, max: 100, unit: "%" },
      { label: "Яркость", value: 80, min: 0, max: 100, unit: "%" },
    ],
    gallery: [blan, blanfull],
  },
  {
    id: "pin",
    name: "piN",
    category: "ПРОИЗВОДСТВЕННЫЕ СИСТЕМЫ",
    marketCategory: "УСТРОЙСТВА",
    price: 890000,
    status: "in_stock",
    image: pin,
    expandedImage: pinfull,
    short: "Персональная фабрика полного цикла для создания деталей, корпусов и прототипов.",
    description:
      "piN — многофункциональный производственный комплекс, объединяющий несколько технологий цифрового производства в едином корпусе.\n\nУстройство может включать:\n• FDM-печать пластиками\n• SLA-печать фотополимерами\n• SLS-печать порошковыми материалами\n• Металлическое напыление\n• Лазерную гравировку\n• Мини-ЧПУ обработку\n• Термообработку изделий\n• Литейный модуль\n\n▸ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ\n\n• Рабочая область: до 1000×1000×1000 мм\n• Материалы: PLA, PETG, ABS, Nylon, Resin, Carbon, Metal Powder\n• Лазер: до 40 Вт\n• Точность: до 0.01 мм\n• Подключение: Wi-Fi / Ethernet\n\n▸ ВОЗМОЖНОСТИ\n\n• Производство деталей\n• Создание прототипов\n• Изготовление корпусов устройств\n• Печать инженерных компонентов\n• Изготовление оснастки\n• Производство малых серий изделий\n• Интеграция с экосистемой nazrOS",
    sensors: [
      { label: "Температура камеры", unit: "°C", value: 42, min: 0, max: 120 },
      { label: "Загрузка производства", unit: "%", value: 61, min: 0, max: 100 },
      { label: "Остаток материала", unit: "%", value: 74, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Скорость печати", value: 70, min: 0, max: 100, unit: "%" },
      { label: "Мощность лазера", value: 50, min: 0, max: 100, unit: "%" },
      { label: "Охлаждение", value: 65, min: 0, max: 100, unit: "%" },
    ],
    gallery: [pin, pinfull],
  },
  {
    id: "vision",
    name: "visioN",
    category: "КИБЕР-ОПТИКА",
    marketCategory: "УСТРОЙСТВА",
    price: 15400,
    status: "in_stock",
    image: vision,
    expandedImage: visionfull,
    short: "Носимый визуальный интерфейс с системой цифрового анализа среды",
    description:
      "вглядН — носимая система визуального анализа, предназначенная для расширения восприятия цифровой и физической среды.\n\nУстройство оснащено:\n• Центральной камерой наблюдения с потоковой передачей\n• Проекторами объёмной визуализации для HUD-интерфейсов\n• Светодиодными лампами для адаптивной подсветки\n\n▸ ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ\n\n• Камера: 4K / 60 FPS\n• Проекция: Holographic HUD\n• Подсветка: Adaptive LED\n• Подключение: nazrOS LINK / Bluetooth 5.3\n• Защита: IP67 / -40°C ~ +49°C\n• Вес: 68 грамм\n\n▸ ВОЗМОЖНОСТИ\n\n• Дополненная реальность\n• Цифровые интерфейсы поверх среды\n• Запись и анализ объектов\n• Навигация в тёмных пространствах\n• Интеграция с экосистемой nazrOS",
    sensors: [
      { label: "Оптическая мощность", unit: "дБм", value: 28, min: 0, max: 40 },
      { label: "Температура сенсора", unit: "°C", value: 34, min: 20, max: 60 },
      { label: "Заряд батареи", unit: "%", value: 73, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Яркость HUD", value: 60, min: 0, max: 100, unit: "%" },
      { label: "Контрастность", value: 75, min: 0, max: 100, unit: "%" },
    ],
    gallery: [vision, visionfull],
  },
  // ── СОФТ ────────────────────────────────────────────────────────────────────
  {
    id: "stranno",
    name: "straNNo",
    category: "ПРОИЗВОДСТВЕННЫЕ СИСТЕМЫ",
    marketCategory: "СОФТ",
    price: 149000,
    status: "preorder",
    image: stranno,
    expandedImage: stranno,
    gallery: [stranno, strannoScreen1],
    short: "Цифровая производственная среда для создания фильмов, игровых миров, виртуальных студий и симуляций.",
    description:
      "⚡ DEV MODE\nФункционал в стадии сборки. Возможны корректировки.\n\nstraNNo — цифровая производственная киберсистема от nazrOS.\n\n▸ ВОЗМОЖНОСТИ\n\n01. Объёмное моделирование (Руки)\nСкульптинг, параметрика, полигональное моделирование.\n\n02. Скелетная и процедурная анимация (Мульт)\nРиггинг, лицевая анимация, IK-солверы.\n\n03. Система визуальных эффектов (Глюк)\nVFX, частицы, дым, огонь, глитчи.\n\n04. Нодовый композитинг (Точки)\nПроцедурные графы, шейдеры.\n\n05. Аудио-среда (Шина)\nПространственный звук, синтезаторы.\n\n06. Игровые пространства (Поле)\nNPC, логика, интерактив.\n\n07. Цифровое кинопроизводство (Студия)\nМонтаж, виртуальные павильоны.\n\n08. Процедурная генерация миров (Колодец)\nЛандшафты, текстуры, шумы.\n\n09. Библиотека ассетов\nХранение 3D-моделей, текстур, звуков.\n\n10. Маркетплейс (Лавка)\nТорговля цифровыми мирами и модулями.\n\n▸ ПОДДЕРЖИВАЕМЫЕ ФОРМАТЫ\n\nВнутренний контейнер .stranno, импорт/экспорт FBX, glTF, OBJ, WAV.\n\n▸ ТЕХНОЛОГИЧЕСКИЙ СТЕК\n\nWeb-Native: WebGPU + WASM (C++/Rust) + React\nApplication Streaming: C++ + Vulkan + Docker + Kubernetes + WebRTC\n\n▸ СТАТУС\nПредзаказ. Релиз после завершения этапа 5 (Месяцы 33-36).",
    sensors: [],
    sliders: [],
  },
  {
    id: "kefirno",
    name: "kefirNNo",
    category: "ИНФРАСТРУКТУРНЫЕ СИСТЕМЫ",
    marketCategory: "СОФТ",
    price: 24000,
    status: "preorder",
    image: kefirnno,
    expandedImage: kefirnno,
    gallery: [kefirnno, kefirnnoScreen1],
    short: "Персональная киберсреда цифровой памяти, знаний и развития.",
    description:
      "⚡ DEV MODE\nФункционал в стадии сборки. Возможны корректировки.\n\nКефирННо — персональная киберсреда накопления, структурирования и развития знаний пользователя. Система является персональным слоем экосистемы nazrOS.\n\n▸ КЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ\n\n01. Чат-интерфейс с ИИ (Аджна)\nОсновной интерфейс — беседа с ИИ, а не файловый менеджер.\n\n02. Автоматическая структура\nПользователь не управляет структурой — система строит её автоматически.\n\n03. Граф знаний\nКаждый объект имеет связи с другими объектами.\n\n04. Семантический поиск\nПоиск по смыслу, а не по ключевым словам.\n\n05. Синхронизация с nazrOS\nПротоколы синхроНнН, сигналНнН, архивНнН.\n\n06. Режимы ИИ\nОблачный (GPT-4o/Claude) / Локальный (Llama 3 / Ollama).\n\n▸ ТЕХНОЛОГИЧЕСКИЙ СТЕК\n\nReact Native + Expo + Supabase + pgvector + LLM API + Vercel\n\n▸ ПЛАТФОРМЫ\n\niOS / Android / Web (PWA)\n\n▸ ЭВОЛЮЦИЯ\n\nv1 — ИИ-память (мобильное приложение)\nv2 — ИИ-файловая система (offline-first + CRDT)\nv3 — ИИ-рабочий стол (IPC с nazrOS)\nv4 — ИИ-оболочка nazrOS\nv5 — Оболочка nazrOS (OS shell)\n\n▸ СТАТУС\nПредзаказ. Релиз Q4 2026.",
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
    short: "Тёмная подвеска — цифровой паспорт. Ранний доступ к устройствам и софту nazrOS.",
    description:
      "⚡ DEV MODE\nФункционал в стадии сборки. Возможны корректировки и горячие исправления.\n\nКИБЕРВАУЧЕР — тёмная подвеска с логотипом nazrOS.\nТвой цифровой паспорт в Цифровом конгломерате nazrOS.\n\n▸ ПРИОРИТЕТЫ\n\n01. Квалификация инвестора\nАктивация через Telegram Wallet → ID в Кибле Кибера.\n\n02. Ранний доступ к устройствам nazrOS\nНовые девайсы до анонса.\n\n03. Ранний доступ к софту nazrOS\nПрошивки и модули на стадии бета-тестирования.\n\n04. Система лояльности\nСкидки и подписки у партнёров:\n\n• Международные:\nSamsung, Apple, Sony, Xiaomi, Huawei, Microsoft, Honor, Oppo, Vivo, Motorola, Nokia, OnePlus, Meizu, Lenovo, ASUS, LG, HTC, ZTE, Infinix, realme, Google, Nothing\n\n• Российские:\nIrbis, BQ, DEXP, F+, Inoi, Tecno, Vertex\n\n▸ ЛОГИКА ПРИОБРЕТЕНИЯ\n\n1. «Приобрести» → Telegram-бот\n2. Оплата через Telegram Wallet\n3. Генерация уникального ID в формате NX-XXXXXXXX\n4. ID отображается в Кибле Кибера",
    sensors: [
      { label: "Оптическая мощность", unit: "дБм", value: 28, min: 0, max: 40 },
      { label: "Температура сенсора", unit: "°C", value: 34, min: 20, max: 60 },
      { label: "Заряд батареи", unit: "%", value: 73, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Яркость HUD", value: 60, min: 0, max: 100, unit: "%" },
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
  image?: string;
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
    id: "a6",
    title: "Операционная среда тела",
    topic: "Цифровая этика",
    excerpt: "Режим разработчика: ВКЛ. ",
    readTime: 5,
    image: freshN,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#a855f7;border-left:4px solid #a855f7;padding-left:16px;margin-top:0;">Режим разработчика nazrOS v1.0</h2>
<p>Тело — это тоже система. И как любая система, она требует правильного топлива, обслуживания и режима работы.</p>
<h3 style="color:#22d3ee;margin-top:24px;">Запуск системы (утро)</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Вода с лимоном + железо — мягкий старт без перегрузки</li>
<li><strong style="color:#fff;">Питание 1</strong> (готовится заранее): вода, мёд, орехи, лён, чиа, кунжут, корица, куркума, перец, оливковое масло</li>
<li>Добавки: кальций, D3, B12, омега-3 — лёгкая энергия без скачков</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Питание в течение дня</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li><strong style="color:#fff;">Питание 2:</strong> чечевица, морковь, лук, специи → суп-крем. Стабильная работа системы</li>
<li><strong style="color:#fff;">Питание 3:</strong> хлеб, йогурт, яйцо, зелень, горчица + магний, цинк. Восстановление перед сном</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Жидкости</h3>
<p>Зелёный чай + имбирь → фокус. Травяной → спокойствие. Поддержка в течение всего дня.</p>
<h3 style="color:#22d3ee;margin-top:24px;">Движение</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Растяжка — 15 мин ежедневно</li>
<li>Кардио — 30 мин, 3–4 раза в неделю</li>
<li>Силовые — 30–45 мин, 2–3 раза в неделю</li>
<li>Тело не должно простаивать</li>
</ul>
<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Это не план — это рабочий режим. Еда → топливо. Движение → поддержка. Добавки → усиление. Вода → среда.»</blockquote>
<h3 style="color:#22d3ee;margin-top:24px;">Правило разработчика</h3>
<ul style="padding-left:24px;list-style:disc;">
<li>Не зацикливайся — адаптируй под состояние</li>
<li>Усиливай при ресурсе, снижай при усталости</li>
<li>Адаптируй под задачу дня</li>
</ul>
</div>`,
  },
  {
    id: "a7",
    title: "Инженерный день 2.0",
    topic: "Геймдев",
    excerpt: "планы & инструменты",
    readTime: 12,
    image: enginedayN,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">Инженерный день 2.0 · nazrOS</h2>
<p style="color:#94a3b8;font-size:14px;">Планшет · Нейросети · Движки · Maya · Ассемблер · Схемы</p>
<h3 style="color:#a855f7;margin-top:24px;">Утро: планшет + перо</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Эскиз на планшете: архитектурное пятно / кинематическая схема / топология платы</li>
<li>Приложения: Concepts / Sketchbook / Notability</li>
<li>Нейросети для проектирования: Krea.ai, Midjourney, DALL-E</li>
<li>Быстрые расчёты через Matlab / Python через облачный блокнот</li>
</ul>
<h3 style="color:#a855f7;margin-top:24px;">Основной блок за компьютером (3–5 часов)</h3>
<div style="background:#111122;border:1px solid #333;padding:16px;border-radius:4px;margin-bottom:16px;">
<strong style="color:#22d3ee;">Правило 50/10:</strong> 50 минут работы → 10 минут паузы (глаза, спина, вода)
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
<div style="border:1px solid #333;padding:12px;border-radius:4px;">
<h4 style="color:#22d3ee;margin-top:0;font-size:14px;">Нейросети (30–60 мин ежедневно)</h4>
<ul style="padding-left:16px;margin:0;font-size:13px;list-style:disc;">
<li>Krea.ai — референсы, текстуры</li>
<li>ChatGPT / DeepSeek — код, документация</li>
<li>Blackbox AI — автодополнение</li>
<li>Runway, Leonardo — рендер, анимация</li>
</ul>
</div>
<div style="border:1px solid #333;padding:12px;border-radius:4px;">
<h4 style="color:#22d3ee;margin-top:0;font-size:14px;">Maya (добавлено)</h4>
<ul style="padding-left:16px;margin:0;font-size:13px;list-style:disc;">
<li>Полигональное моделирование</li>
<li>Риггинг и скелетная анимация</li>
<li>Подготовка моделей FBX / USD</li>
<li>Maya → Unreal → симуляция</li>
</ul>
</div>
<div style="border:1px solid #333;padding:12px;border-radius:4px;">
<h4 style="color:#22d3ee;margin-top:0;font-size:14px;">Unreal Engine (визуализация)</h4>
<ul style="padding-left:16px;margin:0;font-size:13px;list-style:disc;">
<li>Импорт CAD/BIM/Maya-моделей</li>
<li>Материалы, свет, камеры</li>
<li>Интерактив (конструктор / полёт)</li>
<li>Экспорт видео / виртуального тура</li>
</ul>
</div>
<div style="border:1px solid #333;padding:12px;border-radius:4px;">
<h4 style="color:#22d3ee;margin-top:0;font-size:14px;">Электроника / МК</h4>
<ul style="padding-left:16px;margin:0;font-size:13px;list-style:disc;">
<li>Схема: KiCad / EasyEDA / Altium</li>
<li>Трассировка платы</li>
<li>Прошивка: C / C++ / Rust</li>
</ul>
</div>
</div>
<h3 style="color:#a855f7;margin-top:24px;">Вечер: ручной блок (1–2 часа)</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Макетирование: картон, фанера, пластик, 3D-печать</li>
<li>Пайка: монтаж платы, тестирование узла</li>
<li>Настройка прошивки: отладка, логика, связь с ПК</li>
<li>Интеграция с Unreal Engine / Maya</li>
<li>Запись в бортовой журнал: схема, код, выводы нейросетей</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Примерная неделя</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;">
<tr style="border-bottom:1px solid #333;"><th style="padding:8px 4px;color:#22d3ee;text-align:left;">День</th><th style="padding:8px 4px;color:#22d3ee;text-align:left;">Утро</th><th style="padding:8px 4px;color:#22d3ee;text-align:left;">Основной блок</th><th style="padding:8px 4px;color:#22d3ee;text-align:left;">Вечер</th></tr>
<tr style="border-bottom:1px solid #1e1e2e;"><td style="padding:6px 4px;">Пн</td><td style="padding:6px 4px;color:#94a3b8;">Эскиз дома</td><td style="padding:6px 4px;color:#94a3b8;">BIM + Unreal</td><td style="padding:6px 4px;color:#94a3b8;">Макет из пенокартона</td></tr>
<tr style="border-bottom:1px solid #1e1e2e;"><td style="padding:6px 4px;">Вт</td><td style="padding:6px 4px;color:#94a3b8;">Кинематика</td><td style="padding:6px 4px;color:#94a3b8;">Механика + Python</td><td style="padding:6px 4px;color:#94a3b8;">3D-печать узла</td></tr>
<tr style="border-bottom:1px solid #1e1e2e;"><td style="padding:6px 4px;">Ср</td><td style="padding:6px 4px;color:#94a3b8;">Профиль крыла</td><td style="padding:6px 4px;color:#94a3b8;">Maya + Unreal</td><td style="padding:6px 4px;color:#94a3b8;">Сборка модели дрона</td></tr>
<tr style="border-bottom:1px solid #1e1e2e;"><td style="padding:6px 4px;">Чт</td><td style="padding:6px 4px;color:#94a3b8;">Схема подвески</td><td style="padding:6px 4px;color:#94a3b8;">Ассемблер + машинный код</td><td style="padding:6px 4px;color:#94a3b8;">Прошивка контроллера</td></tr>
<tr><td style="padding:6px 4px;">Пт</td><td style="padding:6px 4px;color:#94a3b8;">Топология Maya</td><td style="padding:6px 4px;color:#94a3b8;">Электроника: схема → плата</td><td style="padding:6px 4px;color:#94a3b8;">Пайка + тесты</td></tr>
</table>
</div>`,
  },
  {
    id: "a8",
    title: "Модуль восстановления системы",
    topic: "Цифровая этика",
    excerpt: "Беруши + маска = максимальный отдых.",
    readTime: 7,
    image: modeN,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#6366f1;border-left:4px solid #6366f1;padding-left:16px;margin-top:0;">Режим сна nazrOS · SLEEP_MODE: ON</h2>
<h3 style="color:#22d3ee;margin-top:24px;">За 1 час до сна</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Убрать экраны (телефон, ТВ, ноутбук) — синий свет нарушает мелатонин</li>
<li>Проветрить комнату (18–20°C)</li>
<li>Приглушить свет — настольная лампа / торшер</li>
<li>Лёгкая растяжка или дыхание 5–10 мин</li>
<li>Запись мыслей в блокнот если крутится голова</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Непосредственно перед сном</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Увлажнить лицо: лёгкий крем / гель</li>
<li>Маска для сна — полная темнота = мелатонин</li>
<li>Беруши — тишина для глубоких фаз сна</li>
<li>Поза: на спине или боку — оптимально</li>
<li>5 медленных вдохов: вдох носом 4 счёта, выдох ртом 6–8</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Правила гигиены сна</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Ложиться и вставать в одно время (±30 мин)</li>
<li>Спать 7–9 часов (взрослый здоровый человек)</li>
<li>Не есть за 2–3 часа до сна</li>
<li>Не пить кофеин после 14:00–15:00</li>
<li>Сахар минимально вечером — снижает глубину сна</li>
<li>Матрас и подушка удобные, не проваленные</li>
<li>В комнате темно и тихо: беруши + маска + плотные шторы</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Недельные ритуалы</h3>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
<div style="border:1px solid #333;padding:10px;border-radius:4px;text-align:center;"><div style="color:#22d3ee;font-size:12px;font-weight:bold;">ПН</div><div style="font-size:11px;color:#94a3b8;">Тёплая ванна (1.5 ч)</div></div>
<div style="border:1px solid #333;padding:10px;border-radius:4px;text-align:center;"><div style="color:#22d3ee;font-size:12px;font-weight:bold;">СР</div><div style="font-size:11px;color:#94a3b8;">Массаж стоп</div></div>
<div style="border:1px solid #333;padding:10px;border-radius:4px;text-align:center;"><div style="color:#22d3ee;font-size:12px;font-weight:bold;">ПТ</div><div style="font-size:11px;color:#94a3b8;">Травяной чай</div></div>
<div style="border:1px solid #333;padding:10px;border-radius:4px;text-align:center;"><div style="color:#22d3ee;font-size:12px;font-weight:bold;">ВС</div><div style="font-size:11px;color:#94a3b8;">Йога нидра 15 мин</div></div>
</div>
<blockquote style="border-left:4px solid #6366f1;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Беруши + маска = глубокая темнота и тишина = максимальный отдых. Меньше сахара вечером = глубже сон.»</blockquote>
</div>`,
  },
  {
    id: "a9",
    title: "Недельный баланс разработчика",
    topic: "Цифровая этика",
    excerpt: "Движение 10 минут. Йога = база. Резина = сила.",
    readTime: 8,
    image: sporN,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#eab308;border-left:4px solid #eab308;padding-left:16px;margin-top:0;">Спорт и движение · nazrOS v1.0</h2>
<p style="color:#94a3b8;">Недельный баланс силы, гибкости и выносливости</p>
<h3 style="color:#22d3ee;margin-top:24px;">Йога и растяжка (ежедневная база)</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Утро — 10–15 мин: суставная разминка + дыхание</li>
<li>Вечер — 10–15 мин: мягкая растяжка (спина, бёдра, шея)</li>
<li>Дополнительно — полноценный класс йоги 1 раз в неделю</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Аэро / Бег (кардио)</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:16px;">
<tr style="border-bottom:1px solid #333;"><th style="padding:8px 4px;color:#22d3ee;text-align:left;">День</th><th style="padding:8px 4px;color:#22d3ee;">Формат</th></tr>
<tr style="border-bottom:1px solid #1e1e2e;"><td style="padding:6px;">Пн</td><td style="padding:6px;color:#94a3b8;">Бег на улице 20–30 мин</td></tr>
<tr style="border-bottom:1px solid #1e1e2e;"><td style="padding:6px;">Ср</td><td style="padding:6px;color:#94a3b8;">Интервалы: 1 мин быстро / 2 мин спокойно, 15–20 мин</td></tr>
<tr><td style="padding:6px;">Пт</td><td style="padding:6px;color:#94a3b8;">Лёгкий восстановительный бег 15–20 мин</td></tr>
</table>
<h3 style="color:#22d3ee;margin-top:24px;">Силовые без веса (в комнате, с резиной)</h3>
<p style="color:#94a3b8;font-size:13px;">20–30 мин, 2–3 раза в неделю. Инвентарь: коврик, эспандер, стул.</p>
<p>Упражнения: отжимания, приседания, выпады, ягодичный мост, планка, тяга резины.</p>
<p><strong style="color:#22d3ee;">Схема:</strong> 3–4 круга × 8–15 повторений / 30–40 сек. Отдых 60–90 сек.</p>
<h3 style="color:#22d3ee;margin-top:24px;">Тренировки в клубе</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li><strong>Вт:</strong> групповой класс (силовой, функциональный) или круговая 45 мин</li>
<li><strong>Чт:</strong> самостоятельная силовая / станки / гантели 40–60 мин</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">Опционально</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Грепплинг 1–2 раза в неделю — захваты, мышцы кора, реакция</li>
<li>Плавание 1 раз в неделю — 30–45 мин, восстановление + дыхание</li>
</ul>
<blockquote style="border-left:4px solid #eab308;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Движение каждый день — даже 10 минут. Йога и растяжка — база для суставов. Резина и пол — сила без железа. Клуб — прогресс.»</blockquote>
</div>`,
  },
  {
    id: "a10",
    title: "Операционная среда разработчика",
    topic: "Цифровая этика",
    excerpt: "среда отвечает состоянию разработчика.",
    readTime: 10,
    image: technroomN,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#a855f7;border-left:4px solid #a855f7;padding-left:16px;margin-top:0;">Операционная среда разработчика nazrOS v3.0</h2>
<p style="color:#94a3b8;font-style:italic;margin-bottom:24px;">Мы создаём будущее. Мы управляем системой. Мы отвечаем за результат.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
<div style="border:1px solid #1e3a5f;padding:16px;border-radius:4px;background:#0d1f33;">
<h4 style="color:#22d3ee;margin-top:0;font-size:15px;">01 Санитарный модуль</h4>
<ul style="padding-left:16px;margin:0 0 8px;font-size:13px;list-style:disc;color:#94a3b8;">
<li>Принимать душ минимум 2 раза в день</li>
<li>Соблюдать личную гигиену</li>
<li>Поддерживать чистоту пространства</li>
</ul>
<p style="color:#22d3ee;font-size:11px;margin:0;font-weight:bold;">ЧИСТОЕ ТЕЛО — СТАБИЛЬНОЕ СОСТОЯНИЕ</p>
</div>
<div style="border:1px solid #2d1b4e;padding:16px;border-radius:4px;background:#1a0d2e;">
<h4 style="color:#a855f7;margin-top:0;font-size:15px;">02 Вычислительное ядро</h4>
<ul style="padding-left:16px;margin:0 0 8px;font-size:13px;list-style:disc;color:#94a3b8;">
<li>Контролировать температуру и нагрузку</li>
<li>Очищать систему от мусора</li>
<li>Проверять стабильность перед длительными задачами</li>
<li>Выполнять резервное копирование</li>
</ul>
<p style="color:#ef4444;font-size:11px;margin:0;font-weight:bold;">НЕСТАБИЛЬНОЕ ЯДРО ЛОМАЕТ ВСЮ СРЕДУ</p>
</div>
<div style="border:1px solid #1b2d4e;padding:16px;border-radius:4px;background:#0d1f33;">
<h4 style="color:#6366f1;margin-top:0;font-size:15px;">03 Жилой модуль (Сон)</h4>
<ul style="padding-left:16px;margin:0 0 8px;font-size:13px;list-style:disc;color:#94a3b8;">
<li>Спать не менее 8 часов каждые 16 часов</li>
<li>Соблюдать режим восстановления</li>
<li>Не использовать зону отдыха для работы</li>
</ul>
<p style="color:#ef4444;font-size:11px;margin:0;font-weight:bold;">БЕЗ ВОССТАНОВЛЕНИЯ СИСТЕМА ДЕГРАДИРУЕТ</p>
</div>
<div style="border:1px solid #3d2800;padding:16px;border-radius:4px;background:#1f1500;">
<h4 style="color:#f97316;margin-top:0;font-size:15px;">04 Хранение</h4>
<ul style="padding-left:16px;margin:0 0 8px;font-size:13px;list-style:disc;color:#94a3b8;">
<li>Стирать вещи раз в 3–4 дня</li>
<li>Сортировать предметы по функциям</li>
<li>Избавляться от лишнего</li>
</ul>
<p style="color:#f97316;font-size:11px;margin:0;font-weight:bold;">ХАОС В ВЕЩАХ — ХАОС В СИСТЕМЕ</p>
</div>
<div style="border:1px solid #1e3a5f;padding:16px;border-radius:4px;background:#0d1f33;">
<h4 style="color:#22d3ee;margin-top:0;font-size:15px;">05 Центр управления</h4>
<ul style="padding-left:16px;margin:0 0 8px;font-size:13px;list-style:disc;color:#94a3b8;">
<li>Обновлять ПО перед каждой активной сессией</li>
<li>Фиксировать задачи перед началом работы</li>
<li>Завершать сессию сохранением состояния</li>
<li>Не перегружать интерфейс лишними окнами</li>
</ul>
<p style="color:#22d3ee;font-size:11px;margin:0;font-weight:bold;">УПРАВЛЕНИЕ НАЧИНАЕТСЯ С ЧИСТОТЫ ПРОЦЕССОВ</p>
</div>
<div style="border:1px solid #1a3520;padding:16px;border-radius:4px;background:#0d1f13;">
<h4 style="color:#22c55e;margin-top:0;font-size:15px;">06 Био-модуль (ростН)</h4>
<ul style="padding-left:16px;margin:0 0 8px;font-size:13px;list-style:disc;color:#94a3b8;">
<li>Соблюдать световой режим</li>
<li>Контролировать полив</li>
<li>Следить за состоянием растений</li>
</ul>
<p style="color:#22c55e;font-size:11px;margin:0;font-weight:bold;">КОНТРОЛЬ ЖИВОГО — КОНТРОЛЬ СРЕДЫ</p>
</div>
</div>
<h3 style="color:#a855f7;margin-top:24px;">Общие правила</h3>
<ul style="padding-left:24px;list-style:disc;margin:0 0 16px;">
<li>Соблюдай режим и дисциплину</li>
<li>Поддерживай чистоту и порядок</li>
<li>Контролируй качество процессов</li>
<li>Развивай среду и себя</li>
<li>Не нарушай баланс работы и отдыха</li>
</ul>
<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Не игнорируй протокол. Среда отвечает состоянию разработчика.<br>Ты не живёшь здесь — ты управляешь системой.»</blockquote>
</div>`,
  },
  {
    id: "a11",
    title: "МССИ: многоступенчатая система сбора информации",
    topic: "Кибербезопасность",
    excerpt: "Гибридная модель разведки, где OSINT — лишь первый шаг.",
    readTime: 8,
    image: technroomN,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">МССИ: многоступенчатая система сбора информации</h2>
<p>В современном мире информация стала ключевым ресурсом. Однако объём данных, доступных из открытых источников, растёт экспоненциально. Для эффективной работы с этими данными необходима системная и структурированная модель. <strong style="color:#a855f7;">Многоступенчатая система сбора информации (МССИ)</strong> — это даже не Миротворческие Силы и Space Intelligence но гибридная модель разведки, где первый этап строится на методах OSINT, а последующие этапы углубляют анализ.</p>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«OSINT — это не только инструмент, а фундамент для более глубокого анализа. МССИ позволяет перейти от "знаю, что есть" к "знаю, что это значит и как использовать".»</blockquote>
<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Этапы МССИ</h3>
<div style="background:#111122;border:1px solid #334155;padding:20px;border-radius:6px;margin-bottom:24px;">
<span style="background:#22d3ee;color:#000;padding:2px 8px;font-size:12px;font-weight:bold;border-radius:4px;">ЭТАП 1</span>
<h4 style="font-size:18px;color:#fff;margin:10px 0;">OSINT — разведка по открытым источникам</h4>
<p style="font-size:14px;color:#cbd5e1;margin-bottom:15px;">Сбор всех доступных публичных данных, поиск в социальных сетях, работа с публичными базами данных.</p>
<p style="font-size:13px;color:#94a3b8;">Инструменты: Google Dorks, Shodan, Maltego, The Harvester, Censys, SpiderFoot.</p>
</div>
<div style="background:#111122;border:1px solid #334155;padding:20px;border-radius:6px;margin-bottom:24px;">
<span style="background:#22d3ee;color:#000;padding:2px 8px;font-size:12px;font-weight:bold;border-radius:4px;">ЭТАП 2</span>
<h4 style="font-size:18px;color:#fff;margin:10px 0;">Анализ и структурирование</h4>
<p style="font-size:14px;color:#cbd5e1;margin-bottom:15px;">Очистка и классификация данных, выявление связей, построение гипотез.</p>
<p style="font-size:13px;color:#94a3b8;">Инструменты: Maltego, Grafana, Python (Pandas, NetworkX).</p>
</div>
<div style="background:#111122;border:1px solid #334155;padding:20px;border-radius:6px;margin-bottom:24px;">
<span style="background:#22d3ee;color:#000;padding:2px 8px;font-size:12px;font-weight:bold;border-radius:4px;">ЭТАП 3</span>
<h4 style="font-size:18px;color:#fff;margin:10px 0;">Глубинный анализ и верификация</h4>
<p style="font-size:14px;color:#cbd5e1;margin-bottom:15px;">Проверка выявленных связей, перекрёстная верификация, работа с частично закрытыми источниками.</p>
<p style="font-size:13px;color:#94a3b8;">Инструменты: специализированные базы данных, анализ метаданных.</p>
</div>
<div style="background:#111122;border:1px solid #334155;padding:20px;border-radius:6px;margin-bottom:24px;">
<span style="background:#22d3ee;color:#000;padding:2px 8px;font-size:12px;font-weight:bold;border-radius:4px;">ЭТАП 4</span>
<h4 style="font-size:18px;color:#fff;margin:10px 0;">Интеграция и выводы</h4>
<p style="font-size:14px;color:#cbd5e1;margin-bottom:15px;">Формирование итогового отчёта, подготовка рекомендаций, передача данных в систему принятия решений.</p>
</div>
<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Преимущества МССИ</h3>
<ul style="padding-left:24px;margin-bottom:20px;">
<li style="margin-bottom:6px;"><strong style="color:#22d3ee;">Универсальность</strong> — модель подходит для разных сфер (безопасность, журналистика, бизнес)</li>
<li style="margin-bottom:6px;"><strong style="color:#22d3ee;">Контролируемость</strong> — каждый этап документирован</li>
<li style="margin-bottom:6px;"><strong style="color:#22d3ee;">Глубина и точность</strong> — данные проходят несколько уровней проверки</li>
<li style="margin-bottom:6px;"><strong style="color:#22d3ee;">Эффективность</strong> — OSINT как первый этап снижает затраты</li>
</ul>
<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Пример применения в кибербезопасности</h3>
<div style="background:#111122;border:1px solid #334155;padding:20px;border-radius:6px;margin-bottom:24px;">
<p style="font-size:14px;color:#cbd5e1;margin-bottom:15px;">Задача: выявление утечек данных компании.</p>
<ul style="padding-left:20px;color:#94a3b8;font-size:13px;">
<li><strong>Этап 1:</strong> Сбор упоминаний компании в OSINT-источниках</li>
<li><strong>Этап 2:</strong> Поиск утечек и открытых репозиториев</li>
<li><strong>Этап 3:</strong> Верификация найденных данных через анализ метаданных</li>
<li><strong>Этап 4:</strong> Подготовка отчёта о найденных уязвимостях</li>
</ul>
</div>
<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«МССИ — это эффективная и масштабируемая модель сбора и анализа информации, которая сочетает скорость OSINT с глубиной специализированных методов.»</blockquote>
</div>`,
  },
  {
    id: "a12",
    title: "ГеймДев: от первого запуска до первой сцены",
    topic: "Геймдев",
    excerpt: "Разработчики, которые хотят работать с UNIGINE на облачных решениях, используя экосистемы Яндекс и LANgame.",
    readTime: 15,
    image: technroomN,
    body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">Работа с UNIGINE: от первого запуска до первой сцены</h2>
<p><strong style="color:#a855f7;">UNIGINE</strong> — это профессиональная среда для симуляций и цифровых двойников. В этой статье мы разберём, как начать работу с движком, настроить его для облачной работы и создать первую сцену.</p>
<h3 style="color:#22d3ee;margin-top:24px;">1. Первый запуск: что скачать и как установить</h3>
<p>Для начала работы тебе понадобится:</p>
<ul>
<li>Скачать UNIGINE SDK с официального сайта: <a href="https://unigine.com/ru/download" style="color:#22d3ee;">https://unigine.com/ru/download</a></li>
<li>Выбрать версию: <strong>UNIGINE 2.22n</strong> (стабильная, LTS)</li>
<li>Скачать установщик для Windows и запустить его</li>
<li>Создать новый проект через Диспетчер проектов UNIGINE:
  <ul>
    <li>Название: <code>CyberEden_Level_1</code></li>
    <li>Шаблон: <code>Симуляция (пустая)</code></li>
    <li>Разрешение: <code>1920×1080</code></li>
  </ul>
</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">2. Настройка под облачные решения (для ПК-клубов)</h3>
<p>Если ты работаешь в <strong>ПК-клубе</strong> или на арендованной машине, у тебя нет постоянного диска. Вот как настроить UNIGINE для комфортной работы с <strong>Яндекс.Диском</strong>:</p>
<ul>
<li>Установи Яндекс.Диск на ПК-клуб и войди в свой аккаунт</li>
<li>Создай в облаке папку <code>unigine_projects</code>, внутри — <code>CyberEden_Level_1</code></li>
<li>Скопируй папки <code>data</code> и <code>source</code> из локального проекта в Яндекс.Диск</li>
<li>В редакторе UNIGINE перейди в <strong>Настройки → Файловая система</strong>, добавь путь <code>Y:\\unigine_projects\\CyberEden_Level_1\\data</code> и включи <strong>Автосинхронизацию</strong></li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">3. Где хранятся ассеты</h3>
<p>Основные папки ассетов в UNIGINE:</p>
<ul>
<li><code>data/core/</code> — системные шейдеры и материалы</li>
<li><code>data/scenes/</code> — все сцены проекта</li>
<li><code>data/models/</code> — 3D-модели (FBX, glTF, UNIGINE-формат)</li>
<li><code>data/textures/</code> — текстуры (PNG, JPG, TGA)</li>
<li><code>data/sounds/</code> — аудиофайлы (WAV, OGG)</li>
<li><code>data/scripts/</code> — скрипты на UnigineScript или C++</li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">4. Как создаётся первая сцена</h3>
<ul>
<li>В редакторе UNIGINE открой <strong>Файл → Новая сцена</strong>, назови её <code>ПерваяСцена</code></li>
<li>Создай примитивы: <strong>Параллелепипед</strong> (2×2×2) и <strong>Сферу</strong> (радиус 0.5)</li>
<li>Добавь <strong>Мировой свет</strong> и настрой его цвет и интенсивность</li>
<li>Добавь <strong>Камеру игрока</strong> и расположи её перед объектами</li>
<li>Сохрани сцену как <code>ПерваяСцена.unigine</code></li>
</ul>
<h3 style="color:#22d3ee;margin-top:24px;">5. Тестирование в облаке</h3>
<p>Нажми <strong>F5</strong> (Запуск) — UNIGINE откроет окно предпросмотра. Если куб и сфера освещены — первая сцена готова.</p>
<div style="margin-top:24px;border-top:1px solid #333;padding-top:12px;display:flex;align-items:center;gap:12px;">
  <img src="/assets/stranno.png" alt="страННо" style="width:40px;height:40px;object-fit:contain;border-radius:8px;border:1px solid #a855f7;" />
  <div>
    <strong style="color:#a855f7;">→</strong> Мы усиленно работаем над <strong>страННо</strong> — цифровой производственной киберсистемой для создания фильмов, игровых миров и симуляций.<br>
    <a href="/market?item=stranno" style="color:#22d3ee;">Перейти в Маркет →</a>
  </div>
</div>
</div>`,
  },

{
  id: "a15",
  title: "Российский сегмент даркнета: структура и экономика",
  topic: "Хакинг",
  excerpt: "Как устроен русскоязычный подпольный рынок данных, услуг и инструментов.",
  readTime: 25,
  image: rusdarknet,
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">Российский сегмент даркнета: структура и экономика</h2>
<p>Русскоязычный даркнет — крупнейший подпольный рынок в мире. По оценкам экспертов, через него проходит до 30% всех нелегальных транзакций в сети.</p>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Тень лежит не только на улицах, но и в сети.»</blockquote>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Ключевые площадки</h3>
<ul>
<li><strong>Hydra</strong> — крупнейшая площадка до закрытия в 2022 году (оборот $1.3 млрд за 2021 год). Hydra обслуживала более 100 000 продавцов и миллионы покупателей. Закрыта в результате международной операции <strong>«Даркхантер»</strong>.</li>
<li><strong>Mega</strong> — преемник Hydра с более строгими правилами и поддержкой криптовалют (Monero, Bitcoin). Активна с 2022 года, требует верификации продавцов.</li>
<li><strong>RuTor</strong> — трекер пиратского контента (более 5 млн пользователей). Специализируется на фильмах, сериалах, музыке и софте.</li>
<li><strong>XSS</strong> — форум хакеров и исследователей (активен с 2004 года). Здесь публикуются уязвимости, эксплойты, идёт обсуждение безопасности.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Экономика даркнета</h3>
<p>Основные товары: данные (базы, пароли), услуги (DDoS, фишинг, кастомные эксплойты), хакерские инструменты, поддельные документы, VPN-сервисы. Цены варьируются от $50 до $50 000. Например, доступ к RDP-серверу стоит $10–100, а полный пакет документов (паспорт+права) — $300–500.</p>

<p>Объём рынка русскоязычного даркнета оценивается в <strong>$3–5 млрд</strong> ежегодно. Это крупнейший нелегальный рынок в мире, опережающий китайский и английский сегменты.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Тенденции</h3>
<ul>
<li><strong>Переход на децентрализованные платформы</strong> (на блокчейне) для снижения риска закрытия. Такие платформы не имеют единого сервера, что делает их устойчивыми к атакам правоохранительных органов.</li>
<li><strong>Использование криптовалют</strong> (Monero, Bitcoin) для анонимных транзакций. Monero считается стандартом для даркнета из-за полной анонимности.</li>
<li><strong>Рост продаж APT-инструментов</strong> и эксплойтов для коммерческих систем. Например, доступ к эксплойту для Microsoft Exchange стоит $10 000–50 000.</li>
<li><strong>Автоматизация торговли</strong> — появление AI-агентов для поиска товаров и автоматического заключения сделок.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Регулирование и противодействие</h3>
<p>В России даркнет активно исследуется и мониторится. С 2018 года действует <strong>«Стратегия противодействия незаконному обороту наркотиков»</strong>, в рамках которой осуществляется блокировка даркнет-ресурсов. В 2023 году принят <strong>Федеральный закон № 434-ФЗ</strong>, который вводит уголовную ответственность за организацию даркнет-площадок.</p>

<p>Международное сотрудничество также усиливается. Операция <strong>«Даркхантер»</strong> (2022) привела к закрытию Hydra — крупнейшей даркнет-площадки в мире. Аналогичные операции проводятся в партнёрстве с Европолом и ФБР.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Эволюция даркнета</h3>
<p>Даркнет эволюционировал от единых торговых площадок (Silk Road, Hydra) до фрагментированных экосистем. Современный даркнет — это сеть из множества малых площадок, частных форумов и зашифрованных чатов (Telegram, Signal, XMPP).</p>
</div>`,
},

{
  id: "a14",
  title: "IoT-хакинг: как взламываются умные устройства",
  topic: "Хакинг",
  excerpt: "Камеры, роутеры, системы умного дома — почему они становятся точкой входа.",
  readTime: 25,
  image: iotjur,
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">IoT-хакинг: как взламываются умные устройства</h2>
<p>Интернет вещей (IoT) — самая быстрорастущая поверхность атаки. От видеокамер до холодильников — каждое устройство может стать точкой входа в сеть.</p>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Ваша кофеварка может быть умнее, чем ваш антивирус.»</blockquote>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Типичные уязвимости</h3>
<ul>
<li><strong>Стандартные пароли</strong> — admin/admin, 123456, password, 12345, qwerty. По данным <strong>Shodan</strong>, более 80% IoT-устройств в открытом доступе используют пароли по умолчанию.</li>
<li><strong>Отсутствие шифрования</strong> — передача данных в открытом виде, что позволяет перехватывать трафик с помощью снифферов (Wireshark, tcpdump).</li>
<li><strong>Необновляемая прошивка</strong> — производитель не выпускает патчи, а устройство продолжает работать с известными уязвимостями.</li>
<li><strong>Открытые порты</strong> — Telnet, SSH, HTTP доступ без авторизации. По данным <strong>Rapid7</strong>, более 1 млн устройств имеют открытый порт 23 (Telnet).</li>
<li><strong>Отсутствие сегментации сети</strong> — IoT-устройства находятся в одной сети с основными рабочими станциями.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Пример атаки: камера как точка входа</h3>
<p>Умная камера с уязвимостью в веб-интерфейсе позволяет злоумышленнику получить доступ к внутренней сети, а затем — к роутеру и всем подключённым устройствам. Реальный кейс: в 2021 году ботнет <strong>Mirai</strong> использовал уязвимости в IoT-камерах для масштабных DDoS-атак, которые достигали скорости 1.2 Тбит/с и привели к отключению крупных сайтов (Twitter, Netflix, GitHub).</p>

<p>Шаги атаки:</p>
<ol>
<li>Сканирование сети (Nmap, Zmap) в поисках устройств с открытыми портами.</li>
<li>Подбор пароля (Hydra, Medusa) по стандартным спискам.</li>
<li>Получение shell-доступа через уязвимость.</li>
<li>Перемещение по сети (pivoting) к более ценным целям.</li>
</ol>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Крупные инциденты</h3>
<ul>
<li><strong>Mirai ботнет</strong> (2016) — атака на Dyn DNS, отключение части интернета в США. Вредоносное ПО распространялось через уязвимости в IoT-камерах и роутерах.</li>
<li><strong>Reaper</strong> (2017) — эволюция Mirai с более сложными векторами атаки. Использовал 9 различных уязвимостей в устройствах разных производителей.</li>
<li><strong>IoT-уязвимости в медицинских устройствах</strong> — в 2023 году выявлены критические уязвимости в кардиостимуляторах и инфузионных насосах, что может привести к угрозе жизни пациентов.</li>
<li><strong>Уязвимость в роутерах TP-Link</strong> — в 2022 году обнаружена уязвимость, позволяющая удалённо выполнять код. Затронуто более 10 млн устройств по всему миру.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Экономика IoT-хакинга</h3>
<p>По данным <strong>Gartner</strong>, к 2025 году количество подключённых IoT-устройств достигнет 25 млрд. Это создаёт огромную поверхность атаки. Средний ущерб от IoT-атак составляет <strong>$1.5 млн</strong> на инцидент (по данным Ponemon Institute).</p>

<p>Черный рынок IoT-уязвимостей: эксплойты для роутеров продаются за $500–5 000, для промышленных IoT — до $50 000.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Как защищаться (пошаговый план)</h3>
<ol>
<li><strong>Сменить пароль по умолчанию</strong> — создать сложный пароль (20+ символов, буквы, цифры, символы).</li>
<li><strong>Обновлять прошивку производителя</strong> — проверять обновления раз в месяц.</li>
<li><strong>Изолировать IoT-устройства в отдельной VLAN</strong> — физически отделить их от основной сети.</li>
<li><strong>Отключить удалённый доступ (UPnP, Telnet, SSH)</strong> — если устройство не требует удалённого управления.</li>
<li><strong>Использовать агрегаторы умного дома с централизованной политикой безопасности</strong> — например, Home Assistant с встроенным брандмауэром.</li>
<li><strong>Мониторинг трафика</strong> — настроить SIEM-систему (Wazuh, Splunk) для обнаружения необычного поведения.</li>
<li><strong>Двухфакторная аутентификация</strong> — если устройство поддерживает.</li>
</ol>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Будущее IoT-безопасности</h3>
<p>С развитием 5G и LPWAN (LoRaWAN, NB-IoT) атаки на IoT будут становиться более изощрёнными. Основные тренды:</p>
<ul>
<li>AI-атаки на IoT — использование ИИ для поиска уязвимостей в реальном времени.</li>
<li>RaaS (Ransomware as a Service) для IoT — шифрование данных с умных устройств.</li>
<li>Защита на уровне чипа (TPM, Secure Enclave) — встраивание средств безопасности в процессоры.</li>
</ul>
</div>`,
},
{
  id: "a13",
  title: "Публичные эксплойты: оружие массового поражения в руках каждого",
  topic: "Хакинг",
  excerpt: "Почему публичные эксплойты работают лучше любой социальной инженерии, и как защититься от них.",
  readTime: 20,
  image: technroomN,
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">Публичные эксплойты: оружие массового поражения в руках каждого</h2>
<p>Социальная инженерия работает на доверии. Публичные эксплойты работают на <strong>невежестве</strong>.</p>
<p>Пока одни пытаются убедить людей перейти по ссылке, другие просто запускают готовый скрипт и получают доступ к серверам, роутерам и базам данных. Разница в том, что социальная инженерия требует подготовки, а публичный эксплойт доступен каждому.</p>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Социальная инженерия — это искусство. Публичный эксплойт — это просто запуск.»</blockquote>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Что такое публичный эксплойт</h3>
<p>Это готовый код, который использует уязвимость в ПО. Публичные эксплойты публикуются на GitHub, Exploit-DB, Packet Storm и других ресурсах. Любой желающий может загрузить и запустить их.</p>
<p>По данным <strong>Exploit-DB</strong>, на платформе более 50 000 публичных эксплойтов. Более 30% из них — удалённое выполнение кода (RCE), что позволяет получить полный контроль над системой.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Примеры реальных публичных эксплойтов</h3>
<ul>
<li><strong>Log4Shell</strong> (2021) — уязвимость в библиотеке Log4j. Публичный эксплойт позволял выполнять код на миллионах серверов. Затронул Apache, Apple, Google, Microsoft.</li>
<li><strong>BlueKeep</strong> (2019) — уязвимость в протоколе RDP. Позволяла удалённо выполнять код на Windows без аутентификации. Опубликован на GitHub.</li>
<li><strong>EternalBlue</strong> (2017) — основа для атак WannaCry и NotPetya. Использовал уязвимость в SMB. Публичный эксплойт распространился по всему миру.</li>
<li><strong>ProxyLogon</strong> (2021) — уязвимость в Microsoft Exchange. Позволяла получить доступ к почтовым ящикам и выполнять код.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Почему публичные эксплойты опаснее социальной инженерии</h3>
<p>Социальная инженерия требует понимания психологии. Публичный эксплойт требует только запуска.</p>
<ul>
<li><strong>Масштаб:</strong> Один эксплойт может поразить миллионы устройств за один день.</li>
<li><strong>Скорость:</strong> Публичный эксплойт можно запустить сразу после публикации.</li>
<li><strong>Автоматизация:</strong> Эксплойт можно встроить в сканеры (Nmap, Metasploit) и автоматически атаковать тысячи устройств.</li>
<li><strong>Входной порог:</strong> Нет необходимости общаться с людьми — достаточно запустить скрипт.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Как защищаться от публичных эксплойтов</h3>
<ul>
<li><strong>Регулярные обновления</strong> — 70% атак через публичные эксплойты происходят на устаревшем ПО. Патчи закрывают уязвимости.</li>
<li><strong>Системы обнаружения вторжений (IDS/IPS)</strong> — Snort, Suricata. Следят за активностью, связанной с известными эксплойтами.</li>
<li><strong>Сегментация сети</strong> — изоляция критичных систем от общедоступных.</li>
<li><strong>Мониторинг публичных уязвимостей</strong> — отслеживание NVD, CVE и лент безопасности.</li>
<li><strong>Сканирование сети</strong> — использование сканеров уязвимостей (OpenVAS, Nexpose).</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Психология публичных эксплойтов</h3>
<p>Почему администраторы не обновляют системы? Ответ: <strong>человеческий фактор</strong>. Но это уже не социальная инженерия, а инженерная лень. Патчи требуют перезагрузки, проверок, согласований. Это медленно. Эксплойт — быстр.</p>
<p>Публичный эксплойт — это зеркало инерции. И он работает не хуже социальной инженерии.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Будущее: автоматические эксплойты и AI</h3>
<p>С развитием AI публичные эксплойты становятся умнее. Генеративные модели могут:</p>
<ul>
<li>Анализировать код и искать уязвимости.</li>
<li>Генерировать эксплойты под конкретную версию ПО.</li>
<li>Автоматически подбирать параметры для обхода защиты.</li>
</ul>
<p>Это превращает публичные эксплойты в оружие массового поражения. Защита должна быть такой же быстрой и автоматической.</p>
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
  image?: string;           // ← отдельное поле для картинки
  description: string;
  streamUrl?: string;
};

export const events: Event[] = [
  { id: "e1", title: "This is GameDev", type: "ТРАНСЛЯЦИИ", date: "Everyday", location: "Twitch", description: "Тени неонового кода, ритмы компиляции — всё это геймдев. Разбираем архитектуру, создаём HUD-интерфейсы и строим цифровые миры.", streamUrl: "https://www.twitch.tv/lana_lux" },
  {
    id: "e7",
    title: "IEM Cologne Major 2026",
    type: "ТУРНИРЫ",
    date: "02.06.2026 - 21.06.2026",
    location: "Кельн, Германия",
    description: `Первый мейджор по Counter Strike 2 в 2026 году. 32 коллектива разыгрывают призовой фонд $1,25 млн.`,
    streamUrl: "https://www.twitch.tv/cs2_paragon_ru"
  },
  {
    id: "e13",
    title: "КиберХак 2027",
    type: "ХАКАТОНЫ",
    date: "20.08.2027",
    image: cyberhack,
    location: "Эрарта · Санкт-Петербург",
    description: "Главный хакатон киберсистемы nazrOS. 48 часов непрерывного кодинга, менторство и призовой фонд.",
  },
  {
    id: "e14",
    title: "назрОС РазрабКонф 2027",
    type: "ХАКАТОНЫ",
    date: "08.09.2027",
    image: razrabconf,
    location: "ЦДП · Москва",
    description: "Конференция разработчиков киберсистемы nazrOS. Доклады, открытые мастерские, нетворкинг.",
  },
  {
    id: "e15",
    title: "ПИКСЕЛИ",
    type: "ХАКАТОНЫ",
    date: "02.06.2027",
    image: pikseli,
    location: "Иннополис · Казань",
    description: "12-часовой геймджем для инди-разработчиков. Тема объявляется в момент старта.",
  },
  {
    id: "e16",
    title: "TWS: Плесетск",
    type: "ХАКАТОНЫ",
    date: "06.04.2027 – 12.04.2027",
    location: "Плесетск · Архангельская область",
    description: "The Week Space — цифровое космическое событие в рамках Российской недели космоса.",
  },
  {
    id: "e17",
    title: "АРКТИЧЕСКИЙ ПРОТОКОЛ",
    type: "ХАКАТОНЫ",
    date: "17.09.2027",
    image: arcticprotocol,
    location: "Кластер Северного Дизайна · Мурманск",
    description: "Креативная резиденция для дизайнеров, медиахудожников и цифровых креаторов.",
  },
  {
    id: "e18",
    title: "СИНТЕЗ: ЦИФРОВОЙ СЕЗОН",
    type: "ХАКАТОНЫ",
    date: "24.09.2027",
    image: sintez,
    location: "IT-парк Цифровая Арктика · Архангельск",
    description: "Биотехнологическое инженерное мероприятие для Крайнего Севера.",
  },
  
  { id: "e19", title: "PORTAL", type: "ДЕПЫ", date: "2026", location: "· Москва", description: "Визуальное ядро nazrOS. Интерфейсы, HUD-системы, motion-дизайн и цифровая типографика." },
  { id: "e20", title: "SIGNAL", type: "ДЕПЫ", date: "5 — 7 июня 2026", location: "· Москва", description: "Трансляции, цифровой журнал, медиа-среда и голос экосистемы nazrOS." },
  {
  id: "e21",
  title: "PIRATE STATION",
  type: "ДЕПЫ",
  date: "31 октября",
  image: northPoster,  // ← изображение вынесено в отдельное поле
  location: "VK Stadium · Москва",
  description: "Мир древних северных мифов вновь откроет врата. Тени арктических духов, холод неоновых огней — часть единого цифрового обряда.",
},
  { id: "e22", title: "BLACK! FACTORY", type: "ДЕПЫ", date: "...", location: "Station B · Киев", description: "Экспериментальные технологии, фантомные концепты и прототипирование будущих систем nazrOS." },
  { id: "e23", title: "CXEMA", type: "ДЕПЫ", date: "...", location: "Otel' · Киев", description: "Серверные системы, сборка устройств, аппаратные платформы, ЦОДы и инженерная инфраструктура nazrOS." },
  { id: "e24", title: "LOSHADKA", type: "ДЕПЫ", date: "...", location: "... · Санкт-Петербург", description: "Архитектура мышления среды, протоколы взаимодействия и системная философия nazrOS." },
  { id: "e25", title: "TRIP", type: "ДЕПЫ", date: "...", location: "... · ...", description: "Экспедиции, полевые исследования, цифровые маршруты, аудиовизуальные хроники nazrOS." },
  { id: "e26", title: "GAMMA", type: "ДЕПЫ", date: "03.07.2026 – 06.07.2026", location: "ТехноПарк Степан Разин · Санкт-Петербург", description: "Полигон симуляций nazrOS. Пространство тотального искусства." },
  { id: "e27", title: "PRESENT PERFECT", type: "ДЕПЫ", date: "2026", location: "К-30 · Санкт-Петербург", description: "Нарратив и связь nazrOS. Береговая линия Финского залива." },
  { id: "e28", title: "System108", type: "ДЕПЫ", date: "06.06.2026", location: "Blank · Санкт-Петербург", description: "Экспериментальные режимы системы, нестандартные интерфейсы, психоцифровые состояния nazrOS." },
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
  { id: "c1", handle: "@f00rtime", rank: "ОПЕРАТОР", xp: 482300, status: "online", streaming: true },
  { id: "c2", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "ghost", streaming: false },
  { id: "c3", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c4", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c5", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
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
  badge?: "LIVE" | "NEW" | "CORE" | "SYSTEM" | "FEATURED" | "RESTRICTED" | "EXPERIMENTAL" | "ALPHA" | "BETA" | "CLASSIFIED";
};

export const assetCategories = [
  "Цифровые артефакты",
  "Системные модули",
  "Объёмные модели",
  "Медиа модули",
  "Цифровые протоколы",
  "Цифровые сущности",
  "Стрим-файлы КиберэдэН",
  "Модели игровых движоков",
  "Файлы разработчиков игр",
  "ИИ-боты",
  "Пространства и уровни",
  "Кинематографические файлы",
];

export const datacenterAssets: Asset[] = [
  { id: "da1", name: "Интерфейс Спутникого терминал Сфера", category: "Цифровые артефакты", format: "SVG", size: "245 MB", xp: 1500, badge: "ALPHA" },
];