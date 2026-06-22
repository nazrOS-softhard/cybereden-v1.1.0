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
import socialf from "@/assets/socialF.png";
import claudecode from "@/assets/claudecode.png";



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
  image: socialf,
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

{
  id: "a16",
  title:"ИИ — агент, который сам пишет код и коммитит",
  topic: "Цифровая этика",
  excerpt: "Разбираемся как цифровая сущность видит проект целиком, редактирует файлы и запускает команды.",
  readTime: 20,
  image: claudecode,
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">Claude Code — полный гайд: установка, команды и реальные сценарии</h2>
<p><strong style="color:#a855f7;">Claude Code</strong> — это AI-агент от компании Anthropic, который живёт в терминале или в редакторе кода и имеет прямой доступ к файлам проекта, системе контроля версий Git и командной строке.</p>
<p>Обычный Claude в браузере просто отвечает текстом. Claude Code сам действует: открывает файлы, меняет их, запускает программы и проверяет, что получилось.</p>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Это чат-бот, которому дали руки. Обычный Claude умеет рассуждать и отвечать текстом, но ничего не может сделать у вас на компьютере. Claude Code может.»</blockquote>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Чем Claude Code отличается от других инструментов</h3>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
<div style="border:1px solid #333;padding:12px;border-radius:4px;"><strong style="color:#a855f7;">Claude в браузере</strong><br>Работает во вкладке браузера. «Видит» только ваше сообщение. Отвечает текстом.</div>
<div style="border:1px solid #333;padding:12px;border-radius:4px;"><strong style="color:#22d3ee;">GitHub Copilot</strong><br>Работает внутри редактора. «Видит» открытый файл и соседние. Дополняет код построчно.</div>
<div style="border:1px solid #333;padding:12px;border-radius:4px;"><strong style="color:#a855f7;">Claude Code</strong><br>Работает в терминале или редакторе. «Видит» весь проект целиком. Читает, пишет, запускает, коммитит.</div>
</div>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Установка на macOS, Linux и Windows</h3>
<p><strong>Перед установкой:</strong> требуется платная подписка Claude Pro (от $20/мес) или доступ к API. На бесплатном плане Claude Code недоступен.</p>

<h4 style="color:#22d3ee;">macOS и Linux</h4>
<p>Откройте терминал и вставьте:</p>
<pre style="background:#111122;padding:12px;border-radius:6px;color:#94a3b8;">curl -fsSL https://claude.ai/install.sh | bash</pre>
<p>Если пользуетесь Homebrew:</p>
<pre style="background:#111122;padding:12px;border-radius:6px;color:#94a3b8;">brew install --cask claude-code</pre>

<h4 style="color:#22d3ee;">Windows</h4>
<p>Откройте PowerShell и вставьте:</p>
<pre style="background:#111122;padding:12px;border-radius:6px;color:#94a3b8;">irm https://claude.ai/install.ps1 | iex</pre>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Основные команды Claude Code</h3>
<h4 style="color:#22d3ee;">Управление сессией</h4>
<ul>
<li><code>/help</code> — показать все доступные команды</li>
<li><code>/clear</code> — очистить историю разговора</li>
<li><code>/compact</code> — сжать контекст и сэкономить токены</li>
<li><code>/exit</code> — выйти из Claude Code</li>
</ul>

<h4 style="color:#22d3ee;">Контекст и токены</h4>
<ul>
<li><code>/context</code> — показать, чем занят контекст</li>
<li><code>/cost</code> — статистика расхода токенов за сессию</li>
<li><code>/add-dir</code> — добавить ещё одну рабочую папку</li>
</ul>

<h4 style="color:#22d3ee;">Git и код-ревью</h4>
<ul>
<li><code>/review</code> — запросить ревью кода</li>
<li><code>/security-review</code> — проверить изменения на безопасность</li>
<li><code>/pr-comments</code> — посмотреть комментарии к пул-реквесту</li>
</ul>

<h4 style="color:#22d3ee;">Настройки</h4>
<ul>
<li><code>/model</code> — выбрать или сменить модель</li>
<li><code>/memory</code> — отредактировать CLAUDE.md</li>
<li><code>/mcp</code> — управлять MCP-серверами</li>
<li><code>/resume</code> — вернуться к предыдущей сессии</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Настройка CLAUDE.md и MCP</h3>
<p><strong>CLAUDE.md</strong> — это файл в корне проекта, который агент читает при каждом запуске. В нём вы описываете стек, правила кодирования, команды запуска. Создаётся командой <code>/init</code>.</p>
<p><strong>MCP (Model Context Protocol)</strong> — стандарт для подключения внешних инструментов: базы данных, API, Slack. Управляется командой <code>/mcp</code>.</p>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Как работать грамотно и экономно</h3>
<ul>
<li><strong>Планируйте.</strong> Не бросайтесь сразу с запросом «напиши мне фичу». Сначала опишите задачу и добавьте «Давай сначала обсудим идею». Нажмите <code>Shift+Tab</code> — это включит Plan Mode, где агент распишет план действий.</li>
<li><strong>Экономьте токены.</strong> Начинайте новую сессию под каждую задачу. Если сессия затянулась — сожмите её командой <code>/compact</code>.</li>
<li><strong>Безопасность.</strong> Используйте изолированные окружения и ветки только для чтения. Генерированный код нужно проверять так же внимательно, как написанный человеком.</li>
</ul>
</div>`,
},

{
  id: "a17",
  title: "ЦОДы под прицелом: как взламывают дата-центры и облачные сервисы",
  topic: "Хакинг",
  excerpt: "Почему дата-центры — не крепости, а большие мишени с открытыми воротами.",
  readTime: 20,
  image: technroomN, // можно заменить на специальную картинку для этой статьи
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">ЦОДы под прицелом: как взламывают дата-центры и облачные сервисы</h2>
<p>Дата-центры часто называют «цифровыми крепостями»: многоуровневая физическая защита, строгий контроль доступа, десятки камер, биометрия. Но за последние 5 лет более <strong>60% успешных целевых атак</strong> пришлись именно на дата-центры и облачных провайдеров.</p>
<p>В чём парадокс? Чем больше охраны, тем больше поверхность для атаки. И в этой статье мы разберём, как реально взламывают ЦОДы и почему «защищённый» — это не значит «неприступный».</p>
<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Неважно, сколько у вас замков. Важен тот, кто держит ключи.»</blockquote>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Как взламывают дата-центры (реальные векторы)</h3>
<h4 style="color:#22d3ee;">1. Физический доступ</h4>
<p>Да, именно так. В 2022 году хакеры проникли в ЦОД одного крупного облачного провайдера, <strong>притворившись инженерами по обслуживанию систем охлаждения</strong>. Они попали в серверный зал, вставили USB-устройство с вредоносным ПО в свободный порт и получили доступ к внутренней сети.</p>
<p>Физическая безопасность — это не только камеры и турникеты. Это <strong>человеческий фактор</strong>. А охранники не всегда проверяют удостоверения тех, кто выглядит «своим».</p>

<h4 style="color:#22d3ee;">2. Атаки на цепи поставок</h4>
<p>Злоумышленники внедряют вредоносное ПО ещё на этапе производства серверного оборудования (например, в прошивки или модули управления). Когда такой сервер попадает в ЦОД, он уже является <strong>трояном внутри крепости</strong>. Обнаружить такое без глубокого анализа прошивок почти невозможно.</p>

<h4 style="color:#22d3ee;">3. Социальная инженерия на сотрудников ЦОД</h4>
<p>Инженеры дата-центров — одни из самых атакуемых специалистов. Звонок от «нового коллеги с техподдержки» с просьбой сбросить пароль на аварийном сервере — стандартный сценарий. В 2023 году зафиксировано более <strong>200 инцидентов</strong>, где атака начиналась с телефонного звонка.</p>

<h4 style="color:#22d3ee;">4. Уязвимости в облачных контроллерах</h4>
<p>Облачные платформы (AWS, Azure, GCP, а также российские аналоги) управляются через панели администратора. Если разработчики оставляют <strong>тестовые ключи или незакрытые порты API</strong>, это становится точкой входа для массового компрометирования арендованных серверов.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">«Самые защищённые» — самые интересные цели</h3>
<p>Дата-центры, которые заявляют о «максимальной защищённости», часто становятся самыми привлекательными целями. Почему?</p>
<ul>
<li><strong>Высокая стоимость данных.</strong> ЦОД содержит дампы всех клиентов.</li>
<li><strong>Сложные, но устаревшие системы.</strong> Многие используют старые версии ОС и не обновляют их до патчей.</li>
<li><strong>Зависимость от сторонних сервисов.</strong> Управление часто передаётся аутсорсинговым компаниям с низким уровнем безопасности.</li>
</ul>
<p><strong>Пример:</strong> В 2024 году один из крупнейших дата-центров в Европе был атакован через стороннюю клининговую компанию — у сотрудника уборки украли пропуск, и он попал в зону с серверами.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Как защищаются реально (а не на бумаге)</h3>
<ul>
<li><strong>Многофакторная аутентификация для физического доступа</strong> — биометрия + пин-код + проверка охранником.</li>
<li><strong>Журналирование всех физических перемещений</strong> с автоматическим оповещением при отклонениях.</li>
<li><strong>Изоляция сетей управления ЦОД от интернета</strong> — воздушный зазор (air-gap) или отдельные выделенные каналы.</li>
<li><strong>Регулярный аудит прошивок</strong> оборудования от сторонних производителей.</li>
<li><strong>Использование аппаратных модулей безопасности (HSM)</strong> для шифрования ключей.</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Что в итоге?</h3>
<p>ЦОД — это цифровая крепость, но любая крепость имеет бреши. Самая большая брешь — люди и их доверие. Даже если система неуязвима технически, <strong>человеческий фактор остаётся самым слабым звеном</strong>.</p>
<p>Поэтому в экосистеме nazrOS мы относимся к безопасности дата-центров как к многослойному щиту, где каждый слой должен быть не только техническим, но и организационным.</p>
</div>`,
},

{
  id: "a18",
  title: "The International 2026: Шанхай принимает главный турнир года по Dota 2",
  topic: "Киберспорт",
  excerpt: "16 команд, швейцарская система и $1,6 млн призовых — анонс TI, который пройдёт в Китае.",
  readTime: 9,
  image: technroomN,
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">The International 2026: Шанхай принимает главный турнир года по Dota 2</h2>
<p><strong style="color:#a855f7;">The International 2026</strong> официально возвращается. Главный турнир по Dota 2 пройдёт с <strong>13 по 23 августа 2026 года</strong> в <strong>Шанхае, Китай</strong>, на арене <strong>Shanghai Oriental Sports Center</strong>.</p>

<p>Семь команд уже получили прямые приглашения. Остальные места будут разыграны в региональных квалификациях. Основная часть плей-офф состоится с 20 по 23 августа. Призовой фонд турнира стартует с <strong>$1,6 млн</strong>.</p>

<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">«Шанхай — это не просто город. Это цифровой центр Азии.»</blockquote>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">Формат турнира</h3>
<p><strong>Групповой этап:</strong></p>
<ul>
<li>16 команд играют по швейцарской системе.</li>
<li>Все матчи проходят в формате <strong>best-of-3</strong>.</li>
<li>Три лучшие команды проходят сразу в плей-офф.</li>
<li>Десять команд попадают в стыковые матчи.</li>
<li>Остальные покидают турнир.</li>
</ul>

<p><strong>Стыковые матчи:</strong></p>
<ul>
<li>Десять команд из группового этапа.</li>
<li>Пять лучших проходят в плей-офф.</li>
</ul>

<p><strong>Плей-офф:</strong></p>
<ul>
<li>8 команд.</li>
<li>Сетка <strong>double-elimination</strong>.</li>
<li>Все матчи, кроме гранд-финала — <strong>best-of-3</strong>.</li>
<li>Гранд-финал — <strong>best-of-5</strong>.</li>
</ul>

<p>Победитель получит заветный <strong>Aegis of Champions</strong> и титул сильнейшей команды мира.</p>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">Когда смотреть?</h3>
<p>Турнир начнётся <strong>13 августа 2026 года</strong>. Следите за обновлениями в разделе событий КиберэдэН.</p>
</div>`,
},

{
  id: "a19",
  title: "НЕБЕСА НАЗРОС. Стратегический манифест цифровой цивилизации",
  topic: "Цифровая этика",
  excerpt: "Полный стратегический документ проекта Небеса назрОС — от архитектуры до энергетики.",
  readTime: 120,
  image: technroomN, // Можно заменить на специальную картинку "nebesa-cover.png"
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h1 style="font-size:32px;color:#a855f7;border-bottom:2px solid #a855f7;padding-bottom:12px;">НЕБЕСА НАЗРОС</h1>
<p style="font-size:14px;color:#94a3b8;margin-top:-8px;"><em>Стратегический манифест цифровой цивилизации · Версия 1.0</em></p>

<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;margin:20px 0;font-style:italic;color:#94a3b8;">
«Мы создаём не дата-центры. Мы создаём небо, по которому текут вычисления.»
</blockquote>

<p><strong style="color:#a855f7;">«Небеса назрОС»</strong> — глобальная вычислительная инфраструктура нового поколения, объединяющая стационарные дата-центры, движущиеся автомобили, грузовые поезда, автономные платформы и персональные серверы в единую вычислительную ткань.</p>

<p>Этот документ — стратегический манифест цифровой цивилизации nazrOS.</p>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">ОГЛАВЛЕНИЕ</h3>
<ol style="color:#94a3b8;font-size:14px;font-family:monospace;">
<li>ВИДЕНИЕ: Децентрализация, масштабируемость, экономика</li>
<li>АРХИТЕКТУРА: Пять уровней инфраструктуры</li>
<li>МОБИЛЬНОЕ ОБЛАКО: Такси, автобусы, корабли как узлы</li>
<li>CloudFabric: Цифровая нервная система</li>
<li>КИБЕРЭДЭН: Цифровая государственность</li>
<li>АДЖНА: Распределённый разум системы</li>
<li>ПРОМЕТЕЙ: Энергетическая независимость</li>
<li>ГИБРИД LOGISTICS: Автономные тягачи как мобильные ЦОД</li>
<li>ДОРОЖНАЯ КАРТА: 2026–2035</li>
</ol>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">1. ВИДЕНИЕ</h3>
<p><strong>Миссия проекта:</strong> Создать независимую вычислительную экосистему, способную обеспечивать хранение данных, ИИ и цифровые сервисы без зависимости от зарубежных платформ.</p>

<p><strong>Три уровня:</strong><br>
🟢 <strong>ЗЕМЛЯ</strong> — Физическая инфраструктура (ЦОД, микро-ЦОД).<br>
🟢 <strong>АТМОСФЕРА</strong> — Периферийная инфраструктура (такси, автобусы, корабли).<br>
🟢 <strong>НЕБЕСА</strong> — Логическая облачная платформа (оркестрация, хранение, ИИ).</p>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">2. АРХИТЕКТУРА</h3>
<p>Инфраструктура строится по пяти уровням:</p>
<ul>
<li><strong>L1 — Core Cloud:</strong> Центральные дата-центры. Крупнейшие хранилища и обучение ИИ.</li>
<li><strong>L2 — Regional Cloud:</strong> Региональные ЦОД. Кэширование и локальная обработка.</li>
<li><strong>L3 — Edge Cloud:</strong> Микро-ЦОД в бизнес-центрах, технопарках, университетах.</li>
<li><strong>L4 — Vehicular Cloud:</strong> Такси, автобусы, корабли как вычислительные узлы.</li>
<li><strong>L5 — Personal Edge:</strong> Домашние серверы, ноутбуки, смартфоны пользователей.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">3. МОБИЛЬНОЕ ОБЛАКО (VEHICULAR CLOUD)</h3>
<p><strong>Каждый автомобиль становится частью облака.</strong> Машины выполняют роль Edge-серверов, узлов хранения, кэша и вычислительных узлов ИИ.</p>
<p><strong>Классы узлов:</strong></p>
<ul>
<li><strong>Edge-Taxi:</strong> Базовый узел. AMD Ryzen Embedded, 64 ГБ RAM, 4 ТБ NVMe, 5G.</li>
<li><strong>Edge-Bus:</strong> Региональный агрегатор. Соединяет десятки такси и тысячи пользователей.</li>
<li><strong>Edge-MobileDC:</strong> Мобильный дата-центр. 2–8 серверов, до 2 ПБ хранения, автономность 72 часа.</li>
<li><strong>Edge-Logistics:</strong> Грузовой транспорт. Увеличенный объём хранения.</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">4. CLOUDFABRIC — ЦИФРОВАЯ ТКАНЬ</h3>
<p><strong>CloudFabric</strong> — программно-определяемая вычислительная среда, превращающая миллионы устройств в один суперкомпьютер.</p>
<p><strong>Принцип работы:</strong> Пользователь отправляет задачу → CloudFabric ищет свободный узел (ближайший, самый дешёвый или самый безопасный) → задача выполняется.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">5. КИБЕРЭДЭН — ЦИФРОВАЯ ГОСУДАРСТВЕННОСТЬ</h3>
<p>КиберэдэН — это не сайт и не приложение. Это <strong>цифровая среда существования</strong>.</p>
<p>Каждый пользователь получает <strong>CYBER-ID</strong> и <strong>Цифровой паспорт</strong> (имя, рейтинг, история, активы).</p>
<p><strong>ПХ и GRAM:</strong></p>
<ul>
<li><strong>ПХ</strong> — опыт экосистемы. Зарабатывается проектами, публикациями, исследованиями.</li>
<li><strong>GRAM</strong> — инфраструктурная валюта. Используется для оплаты вычислений и аренды ресурсов.</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">6. АДЖНА — РАСПРЕДЕЛЁННЫЙ РАЗУМ</h3>
<p>Аджна — это <strong>коллективный интеллект системы nazrOS</strong>. Не чат-бот. Не голосовой помощник. Это разум, распределённый между CloudFabric, ЦОД, Edge-сетью, персональными устройствами.</p>
<p><strong>Задачи Аджны:</strong> Проектирование, моделирование, научные исследования, создание фильмов и игр (вместе со страННо), управление инфраструктурой.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">7. ПРОМЕТЕЙ — ЭНЕРГЕТИКА НЕБЕС</h3>
<p>Любая цивилизация упирается в энергию. <strong>«Прометей»</strong> — энергетический слой экосистемы.</p>
<p><strong>Источники:</strong> Солнечные панели (КПД 24–27%), ветряки (северные регионы), LiFePO₄ и натрий-ионные накопители, водородные технологии (с 2030), малые модульные атомные реакторы (для крупных ЦОД).</p>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">8. ГИБРИД LOGISTICS CLOUD</h3>
<p><strong>Автономные электротягачи как мобильные дата-центры.</strong></p>
<p>Каждый тягач выполняет:</p>
<ul>
<li><strong>Логистику</strong> (перевозка груза).</li>
<li><strong>Вычисления</strong> (облачные задачи).</li>
<li><strong>Энергоснабжение</strong> (тяговая батарея + солнечные панели).</li>
</ul>
<p><strong>Внутри контейнера:</strong> 6 серверных стоек (42U), до 64 GPU (NVIDIA B300), до 10 ПБ NVMe-хранилища, 1–2 МВт·ч батареи.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">9. ДОРОЖНАЯ КАРТА</h3>
<ul>
<li><strong>2026–2027:</strong> Первые узлы. Первые такси. Первые микро-ЦОД.</li>
<li><strong>2028–2030:</strong> 1 000+ узлов. Полноценная облачная платформа.</li>
<li><strong>2030–2033:</strong> Международная распределённая сеть.</li>
<li><strong>2033–2035:</strong> Глобальная инфраструктура. 10 млн+ узлов.</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">ЗАКЛЮЧЕНИЕ</h3>
<p><strong>«Небеса назрОС»</strong> — это не просто архитектура. Это философия.</p>
<ul>
<li><strong>Децентрализация</strong> — система не зависит от одной точки.</li>
<li><strong>Масштабируемость</strong> — каждый новый автомобиль увеличивает мощность.</li>
<li><strong>Экономическая вовлечённость</strong> — каждый участник получает вознаграждение.</li>
<li><strong>Автономность</strong> — даже при потере связи узлы продолжают работу.</li>
</ul>
<p style="margin-top:24px;border-top:1px solid #333;padding-top:16px;color:#94a3b8;font-size:13px;">
© 2026 Конгломерат Модули · nazrOS · КиберэдэН · Версия 1.0
</p>
</div>`,
},

{
  id: "a20",
  title: "Опубликованы стратегические документы: НИМБ и дорожная карта",
  topic: "Цифровая этика",
  excerpt: "Архитектурный свод и план разработки nazrOS доступны для ознакомления.",
  readTime: 4,
  image: technroomN,
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;margin-top:0;">Опубликованы стратегические документы: НИМБ и дорожная карта</h2>
<p>Опубликованы два документа, определяющие архитектуру и план развития экосистемы nazrOS.</p>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">1. НИМБ — Архитектурный свод</h3>
<p>Документ фиксирует архитектурные решения и терминологию на текущий момент.</p>
<p><strong>Основные разделы:</strong></p>
<ul>
<li>Главный замысел и принцип поэтапного суверенитета</li>
<li>Главная вертикаль архитектуры: Вольты → Железо → НИМБ → Двоичный код → Союз → Софт → { Исход / Действие }</li>
<li>НИМБ — процессорно-инструкционный уровень</li>
<li>Ядро назрОС как управляющая надстройка</li>
<li>Сводный словарь утверждённых терминов</li>
<li>Открытые вопросы для дальнейшего обсуждения</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">2. nazrOS — Дорожная карта</h3>
<p>Реалистичный поэтапный план разработки языка Союз, ядра nazrOS Core и интеграции с железом.</p>
<p><strong>Основные фазы:</strong></p>
<ul>
<li>Фаза 0 — Фундамент (спецификация языка, выбор стека)</li>
<li>Фазы 1–3 — Союз (фронтенд, интерпретатор, компилятор LLVM)</li>
<li>Фазы 4–5 — Ядро nazrOS Core (форк Linux, системные сервисы, пакетный менеджер)</li>
<li>Фаза 6 — Интеграция с железом (пилотное устройство)</li>
<li>Фазы 7–9 — Экосистема, бета-тестирование и релиз v1.0</li>
<li>Фаза 10 — Долгосрочная перспектива (RISC-V с расширениями)</li>
</ul>
<p>Также в документе приведены оценка необходимых ресурсов и список ключевых рисков.</p>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">3. Дополнительные материалы в номере</h3>
<ul>
<li>Разбор вакансии CPU/ISA Architect</li>
<li>Согласованный список производителей для проекта «Небеса назрОС»</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">4. Следующая публикация</h3>
<p>Завтра — технический обзор языка Союз: конструкция «ЧТО → ГДЕ → КОГДА» и её применение.</p>
</div>`,
},

{
id: "a21",
title: "Что такое НИМБ и зачем он нужен",
topic: "Цифровая этика",
excerpt: "НИМБ определяет процессорно-инструкционный уровень экосистемы nazrOS и связывает аппаратную и программную части проекта.",
readTime: 4,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Что такое НИМБ и зачем он нужен</h2><p>НИМБ является одним из фундаментальных уровней архитектуры nazrOS. Его задача — определить правила взаимодействия между аппаратной частью системы и программными инструментами более высокого уровня.</p><p>В отличие от традиционного подхода, где разработка начинается с приложений или интерфейсов, концепция nazrOS строится снизу вверх — от вычислительных процессов к пользовательскому опыту.</p><h3 style="color:#a855f7;">Ключевые задачи НИМБ</h3>
<ul>
<li>Описание инструкционного пространства системы</li>
<li>Связь между железом и языком Союз</li>
<li>Формирование единой терминологии</li>
<li>Подготовка основы для будущих вычислительных платформ</li>
</ul><p>НИМБ рассматривается как долговременный архитектурный слой, который должен сохранять совместимость между поколениями технологий внутри экосистемы nazrOS.</p>
</div>`,
},

{
id: "a22",
title: "Главная вертикаль архитектуры nazrOS",
topic: "Цифровая этика",
excerpt: "Вольты, железо, НИМБ, двоичный код, Союз и софт образуют единую технологическую цепочку.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Главная вертикаль архитектуры nazrOS</h2><p>Архитектура nazrOS описывается последовательностью уровней:</p><ul>
<li>Вольты</li>
<li>Железо</li>
<li>НИМБ</li>
<li>Двоичный код</li>
<li>Союз</li>
<li>Софт</li>
<li>Исход / Действие</li>
</ul><p>Каждый уровень зависит от предыдущего и предоставляет возможности следующему.</p><h3 style="color:#a855f7;">Почему это важно</h3><p>Подобная модель позволяет проектировать платформу как единую систему, а не как набор разрозненных компонентов.</p><p>В дальнейшем эта вертикаль станет основой всей документации nazrOS.</p>
</div>`,
},

{
id: "a23",
title: "НИМБ как процессорно-инструкционный уровень",
topic: "Цифровая этика",
excerpt: "Процессор исполняет инструкции, а НИМБ определяет их организацию и место в общей системе.",
readTime: 4,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">НИМБ как процессорно-инструкционный уровень</h2><p>НИМБ описывает пространство между физическим процессором и высокоуровневыми языками программирования.</p><p>Именно здесь определяются правила формирования инструкций, способы их интерпретации и взаимодействие с вычислительными ресурсами.</p><h3 style="color:#a855f7;">Функции уровня</h3><ul>
<li>Унификация инструкций</li>
<li>Подготовка платформенной совместимости</li>
<li>Создание основы для будущего ISA</li>
<li>Поддержка развития Союза</li>
</ul><p>Этот уровень является одним из ключевых элементов долгосрочной стратегии проекта.</p>
</div>`,
},

{
id: "a24",
title: "Почему nazrOS начинается не с интерфейса",
topic: "Цифровая этика",
excerpt: "Большинство систем строятся сверху вниз, nazrOS развивается в противоположном направлении.",
readTime: 4,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Почему nazrOS начинается не с интерфейса</h2><p>Современные операционные системы обычно оценивают по внешнему виду, приложениям и пользовательскому опыту. Однако все эти элементы находятся на вершине технологической пирамиды.</p><p>В nazrOS принят иной подход. Сначала определяется фундамент вычислений, затем язык, системные механизмы и только после этого пользовательская среда.</p><h3 style="color:#a855f7;">Преимущества подхода</h3><ul>
<li>Архитектурная целостность</li>
<li>Предсказуемость развития</li>
<li>Контроль над критическими уровнями системы</li>
<li>Возможность создавать собственные вычислительные стандарты</li>
</ul><p>Интерфейс важен, но он является следствием архитектуры, а не её причиной.</p>
</div>`,
},

{
id: "a25",
title: "Словарь терминов nazrOS",
topic: "Цифровая этика",
excerpt: "Единый понятийный аппарат позволяет избежать разночтений при развитии проекта.",
readTime: 3,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Словарь терминов nazrOS</h2><p>Каждая технологическая экосистема со временем формирует собственный язык описания процессов и сущностей.</p><p>НИМБ закрепляет основные определения, используемые внутри nazrOS.</p><h3 style="color:#a855f7;">Некоторые ключевые понятия</h3><ul>
<li>НИМБ — архитектурный свод системы</li>
<li>Союз — язык управления действиями</li>
<li>nazrOS Core — системное ядро платформы</li>
<li>Вертикаль архитектуры — последовательность уровней вычислений</li>
</ul><p>Подобный словарь помогает всем участникам проекта использовать одинаковые значения терминов независимо от направления работы.</p>
</div>`,
},

{
id: "a26",
title: "Язык Союз: философия проектирования",
topic: "Цифровая этика",
excerpt: "Союз создаётся как язык описания намерений, действий и контекста.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Язык Союз: философия проектирования</h2><p>Союз разрабатывается как язык нового поколения, ориентированный на описание действий и намерений пользователя.</p><p>Вместо концентрации на синтаксических конструкциях основной акцент делается на смысле выполняемой операции.</p><h3 style="color:#a855f7;">Основные принципы</h3><ul>
<li>Читаемость</li>
<li>Прозрачность логики</li>
<li>Предсказуемое исполнение</li>
<li>Связь с архитектурой nazrOS</li>
</ul><p>Главная цель проекта — сократить дистанцию между человеческим замыслом и выполняемой программой.</p>
</div>`,
},

{
id: "a27",
title: "Конструкция ЧТО → ГДЕ → КОГДА",
topic: "Цифровая этика",
excerpt: "Базовая модель Союза строится вокруг действия, контекста и времени выполнения.",
readTime: 4,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Конструкция ЧТО → ГДЕ → КОГДА</h2><p>Одной из центральных концепций Союза является описание операций через три фундаментальных вопроса.</p><ul>
<li>ЧТО необходимо выполнить</li>
<li>ГДЕ это должно произойти</li>
<li>КОГДА действие должно быть выполнено</li>
</ul><p>Такой подход позволяет описывать процессы ближе к человеческому мышлению и уменьшает количество промежуточных абстракций.</p><p>В будущем эта конструкция станет одной из узнаваемых особенностей языка.</p>
</div>`,
},

{
id: "a28",
title: "Почему Союз не похож на Python и C++",
topic: "Цифровая этика",
excerpt: "Союз не пытается заменить существующие языки, а предлагает иной взгляд на описание вычислений.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Почему Союз не похож на Python и C++</h2><p>Python и C++ решают широкий спектр задач и имеют десятилетия развития за спиной.</p><p>Союз создаётся с другой целью — стать частью единой архитектурной экосистемы nazrOS.</p><h3 style="color:#a855f7;">Ключевые отличия</h3><ul>
<li>Ориентация на намерения</li>
<li>Интеграция с архитектурой НИМБ</li>
<li>Единая терминология платформы</li>
<li>Подготовка к долгосрочному развитию nazrOS Core</li>
</ul><p>Поэтому Союз следует рассматривать не как альтернативу существующим языкам, а как специализированный инструмент для собственной вычислительной среды.</p>
</div>`,
},

{
id: "a29",
title: "Союз как язык управления действиями",
topic: "Цифровая этика",
excerpt: "Главная задача Союза — описывать действия, а не набор низкоуровневых инструкций.",
readTime: 4,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Союз как язык управления действиями</h2><p>Большинство языков программирования требуют описывать последовательность операций, через которые необходимо пройти компьютеру.</p><p>Союз делает акцент на конечном действии и намерении пользователя.</p><h3 style="color:#a855f7;">Основная идея</h3><ul>
<li>Описание результата вместо технических шагов</li>
<li>Понятная структура команд</li>
<li>Связь с контекстом выполнения</li>
<li>Подготовка к взаимодействию с ИИ-системами</li>
</ul><p>Подобный подход делает программы ближе к человеческому способу постановки задач.</p>
</div>`,
},
{
id: "a30",
title: "Будущее компилятора Союз",
topic: "Цифровая этика",
excerpt: "Компилятор станет мостом между языком Союз, nazrOS Core и вычислительными платформами будущего.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Будущее компилятора Союз</h2><p>Компилятор является одним из ключевых элементов всей архитектуры nazrOS.</p><p>Именно он преобразует высокоуровневые конструкции Союза в инструкции, пригодные для исполнения вычислительной системой.</p><h3 style="color:#a855f7;">Основные этапы развития</h3><ul>
<li>Интерпретатор для ранних версий языка</li>
<li>Собственный фронтенд</li>
<li>Интеграция с LLVM</li>
<li>Подготовка к собственному ISA</li>
</ul><p>В долгосрочной перспективе компилятор станет частью независимой технологической цепочки nazrOS.</p>
</div>`,
},
{
id: "a31",
title: "Дорожная карта nazrOS: общий обзор",
topic: "Цифровая этика",
excerpt: "Развитие nazrOS разбито на последовательные этапы от языка программирования до собственной вычислительной платформы.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Дорожная карта nazrOS: общий обзор</h2><p>Проект развивается поэтапно. Каждый следующий уровень опирается на результаты предыдущего.</p><h3 style="color:#a855f7;">Ключевые направления</h3><ul>
<li>Создание языка Союз</li>
<li>Разработка nazrOS Core</li>
<li>Интеграция с оборудованием</li>
<li>Формирование экосистемы</li>
<li>Исследование собственного ISA</li>
</ul><p>Такая стратегия позволяет постепенно двигаться от концепции к полноценной вычислительной платформе.</p>
</div>`,
},
{
id: "a32",
title: "Фаза 0: создание фундамента",
topic: "Цифровая этика",
excerpt: "Любая сложная система начинается с проектирования базовых принципов и спецификаций.",
readTime: 4,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Фаза 0: создание фундамента</h2><p>На нулевом этапе определяется архитектура будущей платформы.</p><h3 style="color:#a855f7;">Основные задачи</h3><ul>
<li>Формирование спецификации Союза</li>
<li>Определение архитектурных принципов</li>
<li>Выбор инструментов разработки</li>
<li>Подготовка документации</li>
</ul><p>Эта фаза практически не видна пользователям, но именно она определяет устойчивость всей дальнейшей разработки.</p>
</div>`,
},

{
id: "a33",
title: "Фазы 1–3: рождение языка Союз",
topic: "Цифровая этика",
excerpt: "Первые практические этапы посвящены появлению рабочего языка программирования.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Фазы 1–3: рождение языка Союз</h2><p>После завершения фундаментальных работ начинается создание первых рабочих компонентов языка.</p><h3 style="color:#a855f7;">Что входит в этап</h3><ul>
<li>Разработка синтаксиса</li>
<li>Создание фронтенда</li>
<li>Интерпретатор ранних версий</li>
<li>Интеграция с LLVM</li>
</ul><p>Именно на этих фазах Союз впервые становится рабочим инструментом для написания программ.</p>
</div>`,
},

{
id: "a34",
title: "Фазы 4–5: создание nazrOS Core",
topic: "Цифровая этика",
excerpt: "После появления языка начинается формирование системного ядра будущей платформы.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Фазы 4–5: создание nazrOS Core</h2><p>После формирования языка Союз начинается работа над системным уровнем платформы.</p><p>На этом этапе появляется nazrOS Core — центральный компонент экосистемы, отвечающий за взаимодействие программ, сервисов и оборудования.</p><h3 style="color:#a855f7;">Основные задачи</h3>
<ul>
<li>Создание системных сервисов</li>
<li>Формирование архитектуры ядра</li>
<li>Интеграция языка Союз</li>
<li>Подготовка платформенных API</li>
</ul><p>Именно здесь проект переходит от языка программирования к полноценной операционной платформе.</p>
</div>`,
},

{
id: "a35",
title: "Системные сервисы nazrOS",
topic: "Цифровая этика",
excerpt: "Сервисы образуют инфраструктурный слой между ядром и пользовательскими программами.",
readTime: 4,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Системные сервисы nazrOS</h2><p>Операционная система состоит не только из ядра. Большую часть повседневной работы выполняют сервисы.</p><p>Они отвечают за запуск процессов, хранение данных, взаимодействие между приложениями и доступ к ресурсам устройства.</p><h3 style="color:#a855f7;">Что входит в этот слой</h3>
<ul>
<li>Управление процессами</li>
<li>Хранение конфигураций</li>
<li>Системные журналы</li>
<li>Механизмы безопасности</li>
</ul><p>В nazrOS сервисы проектируются как единая часть архитектуры, а не как набор отдельных компонентов.</p>
</div>`,
},

{
id: "a36",
title: "Фаза 6: интеграция с железом",
topic: "Цифровая этика",
excerpt: "Следующий шаг после создания ядра — запуск платформы на реальном оборудовании.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Фаза 6: интеграция с железом</h2><p>До этого момента большинство работ происходит в программной среде.</p><p>Фаза интеграции переносит nazrOS на реальные устройства и позволяет проверить архитектурные решения на практике.</p><h3 style="color:#a855f7;">Ключевые направления</h3>
<ul>
<li>Поддержка оборудования</li>
<li>Тестирование драйверов</li>
<li>Пилотные устройства</li>
<li>Измерение производительности</li>
</ul><p>Эта стадия становится первым полноценным контактом системы с физическим миром.</p>
</div>`,
},

{
id: "a37",
title: "Фазы 7–9: формирование экосистемы",
topic: "Цифровая этика",
excerpt: "После появления рабочей платформы начинается развитие сообщества, инструментов и приложений.",
readTime: 5,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Фазы 7–9: формирование экосистемы</h2><p>Любая операционная система становится жизнеспособной только тогда, когда вокруг неё появляется экосистема.</p><p>На этом этапе внимание переносится с базовых технологий на людей и инструменты.</p><h3 style="color:#a855f7;">Основные задачи</h3>
<ul>
<li>Развитие сообщества</li>
<li>Создание SDK</li>
<li>Появление приложений</li>
<li>Бета-тестирование платформы</li>
</ul><p>Именно экосистема определяет долгосрочную устойчивость любого технологического проекта.</p>
</div>`,
},
{
id: "a38",
title: "Фаза 10: путь к собственному ISA",
topic: "Цифровая этика",
excerpt: "Долгосрочная перспектива nazrOS предполагает развитие собственных вычислительных стандартов.",
readTime: 6,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Фаза 10: путь к собственному ISA</h2><p>Наиболее амбициозная часть дорожной карты связана с исследованием собственной вычислительной архитектуры.</p><p>Речь идёт не о ближайших релизах, а о стратегическом направлении развития на годы вперёд.</p><h3 style="color:#a855f7;">Что включает направление</h3>
<ul>
<li>Исследование ISA</li>
<li>Развитие НИМБ</li>
<li>Интеграция с Союзом</li>
<li>Формирование независимой платформы</li>
</ul><p>Этот этап завершает логическую цепочку, начавшуюся с архитектурных принципов НИМБ и первых строк кода языка Союз.</p>
</div>`,
},

{
id: "a39",
title: "Почему nazrOS говорит о суверенитете вычислений",
topic: "Цифровая этика",
excerpt: "Суверенитет вычислений — одна из ключевых идей, лежащих в основе архитектуры nazrOS.",
readTime: 8,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Почему nazrOS говорит о суверенитете вычислений</h2><p>Большинство современных цифровых платформ создаются поверх уже существующих стандартов. Разработчик использует готовый процессор, готовую операционную систему, готовые языки программирования и готовые облачные сервисы.</p><p>Такой подход позволяет быстро создавать продукты, но одновременно делает разработчика зависимым от чужих решений.</p><p>В nazrOS используется другое понятие — суверенитет вычислений.</p><p>Под суверенитетом понимается способность понимать собственную технологическую цепочку от уровня вычислений до уровня пользовательских действий.</p><p>Поэтому в документах проекта так много внимания уделяется НИМБ, Союзу и архитектурной вертикали. Речь идёт не о создании очередного интерфейса, а о попытке описать вычислительную систему как единое целое.</p><p>Суверенитет здесь не означает изоляцию. Напротив, он означает понимание того, как работает технология на каждом уровне её существования.</p></div>`,
},
{
id: "a40",
title: "От вольтов до действия: путешествие одной команды",
topic: "Цифровая этика",
excerpt: "Что происходит между электрическим сигналом и действием пользователя.",
readTime: 9,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">От вольтов до действия: путешествие одной команды</h2><p>Когда пользователь нажимает кнопку, кажется, что действие происходит мгновенно.</p><p>На самом деле команда проходит огромный путь.</p><p>Сначала электрический импульс появляется на уровне физических сигналов. Затем его обрабатывает оборудование. После этого вступают в работу инструкции процессора.</p><p>Далее начинают работать двоичные представления данных, языковые конструкции, системные сервисы и прикладные программы.</p><p>Только после прохождения всей этой цепочки пользователь видит результат.</p><p>Архитектурная вертикаль nazrOS была придумана именно для того, чтобы показать этот путь целиком.</p><p>Вольты превращаются в железо. Железо взаимодействует с НИМБ. НИМБ формирует вычислительную среду. Появляется двоичный код, затем Союз, затем программное обеспечение и только потом действие.</p><p>Так возникает целостная картина вычислений.</p></div>`,
},

{
id: "a41",
title: "Зачем создавать новый язык в эпоху Python",
topic: "Цифровая этика",
excerpt: "Когда уже существуют десятки языков программирования, нужен ли ещё один?",
readTime: 8,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Зачем создавать новый язык в эпоху Python</h2><p>Каждый раз, когда появляется новый язык программирования, возникает закономерный вопрос: зачем?</p><p>Сегодня существуют Python, Rust, C++, JavaScript и множество других решений. Все они активно развиваются и используются миллионами разработчиков.</p><p>Однако язык Союз создаётся не как конкурент этим проектам.</p><p>Его задача заключается в другом — стать частью собственной архитектурной экосистемы.</p><p>Союз должен понимать логику nazrOS так же глубоко, как сама система понимает собственное устройство.</p><p>Поэтому Союз проектируется не вокруг совместимости с прошлым, а вокруг задач будущей платформы.</p><p>Главный вопрос здесь не «можно ли написать ещё один язык», а «можно ли создать язык, который будет рождён внутри архитектуры, а не подключён к ней позже».</p></div>`,
},

{
id: "a42",
title: "Проект «Небеса nazrOS»: взгляд за пределы операционной системы",
topic: "Цифровая этика",
excerpt: "Когда разговор заходит о железе, архитектура начинает выходить за пределы программного обеспечения.",
readTime: 8,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Проект «Небеса nazrOS»: взгляд за пределы операционной системы</h2><p>Любая операционная система рано или поздно сталкивается с вопросом оборудования.</p><p>Можно создавать программную платформу для существующих устройств, а можно задуматься о том, каким должно быть само устройство.</p><p>Именно здесь появляется направление «Небеса nazrOS».</p><p>Оно рассматривает аппаратную сторону экосистемы как продолжение архитектурной философии проекта.</p><p>Речь идёт не просто о совместимости с оборудованием, а о постепенном поиске форм вычислительной техники, которые будут соответствовать принципам nazrOS.</p><p>Пока это долгосрочное направление исследований, но именно такие исследования часто определяют облик технологий через десятилетия.</p></div>`,
},
{
id: "a43",
title: "Почему архитектура важнее интерфейса",
topic: "Цифровая этика",
excerpt: "Красивый интерфейс можно нарисовать за месяцы. Архитектура создаётся годами.",
readTime: 7,
image: technroomN,
body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">Почему архитектура важнее интерфейса</h2><p>Когда пользователи впервые знакомятся с новой системой, они видят интерфейс.</p><p>Но интерфейс является лишь поверхностью технологии.</p><p>Настоящие решения принимаются значительно глубже — на уровне архитектуры, взаимодействия компонентов и фундаментальных принципов.</p><p>Можно создать красивую оболочку, которая перестанет развиваться через несколько лет.</p><p>А можно построить архитектуру, которая будет поддерживать развитие десятилетиями.</p><p>Именно поэтому в nazrOS так много внимания уделяется НИМБ, дорожной карте и языку Союз. Эти элементы редко попадают на рекламные плакаты, но именно они определяют будущее системы.</p><p>Архитектура невидима. Но именно она переживает поколения интерфейсов.</p></div>`,
},

{
  id: "a44",
  title: "клоН против Flipper Zero: почему устройство nazrOS выбрало путь игры",
  topic: "Хакинг",
  excerpt: "Сравниваем философию Flipper Zero и клоН — устройства nazrOS, где изучение техники превращается в развитие цифрового существа.",
  readTime: 18,
  image: clonfull,
  body: `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">

<h2 style="font-size:28px;color:#22d3ee;border-left:4px solid #22d3ee;padding-left:16px;">КЛОН против Flipper Zero: почему устройство nazrOS выбрало путь игры</h2>

<p>Когда в мире аппаратного хакинга появился Flipper Zero, он быстро стал культовым устройством для исследователей радиопротоколов, RFID, NFC и различных цифровых интерфейсов.</p>

<p>Однако внутри экосистемы nazrOS развивается другой подход. Устройство <strong>КЛОН</strong> создаётся не просто как инструмент. Оно проектируется как цифровой спутник пользователя.</p>

<p>Главное отличие заключается не в железе. Главное отличие заключается в философии взаимодействия.</p>

<h3 style="font-size:22px;color:#a855f7;">Flipper Zero — инструмент</h3>

<p>Flipper Zero предоставляет набор функций для исследования электронных систем.</p>

<ul>
<li>RFID</li>
<li>NFC</li>
<li>Sub-GHz радиосигналы</li>
<li>IR-передатчик</li>
<li>Bluetooth</li>
<li>GPIO-интерфейсы</li>
<li>BadUSB</li>
</ul>

<p>Устройство показывает пользователю результат взаимодействия, однако практически не запоминает его историю развития как исследователя.</p>

<p>После покупки все пользователи получают приблизительно одинаковый опыт.</p>

<h3 style="font-size:22px;color:#22d3ee;">КЛОН — цифровое существо</h3>

<p>В КЛОНе пользователь развивает не только собственные навыки, но и само устройство.</p>

<p>Каждое подключение становится частью цифровой биографии.</p>

<p>Каждое исследование превращается в опыт.</p>

<p>Каждый новый протокол расширяет возможности ядра.</p>

<p>По сути устройство начинает напоминать смесь:</p>

<ul>
<li>Flipper Zero</li>
<li>Тамагочи</li>
<li>игровой RPG-персонаж</li>
<li>узел экосистемы nazrOS</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;">Механика уровней</h3>

<p>Каждое действие приносит ядру nazrOS опыт.</p>

<ul>
<li>Сканирование NFC +5 XP</li>
<li>Изучение нового устройства +15 XP</li>
<li>Подключение к неизвестному протоколу +30 XP</li>
<li>Создание собственного сценария +50 XP</li>
<li>Разработка нового модуля +100 XP</li>
</ul>

<p>Со временем пользователь получает новые уровни.</p>

<p>Вместе с ним растёт и КЛОН.</p>

<h3 style="font-size:22px;color:#a855f7;">Энергия ядра</h3>

<p>Вместо стандартного показателя заряда устройство использует концепцию энергии ядра.</p>

<p>Энергия формируется не только аккумулятором.</p>

<p>Она также отражает активность владельца.</p>

<p>Чем больше исследований проводится, тем сильнее становится цифровое ядро.</p>

<p>Неиспользуемый КЛОН постепенно переходит в спящий режим и перестаёт развиваться.</p>

<h3 style="font-size:22px;color:#22d3ee;">Протокольный стек и встроенные инструменты</h3>

<p>Под внешней оболочкой КЛОН скрывает развитую программную инфраструктуру. В отличие от Flipper Zero, где функционал жёстко ограничен прошивкой и открывается только через сторонние плагины, КЛОН изначально включает встроенную библиотеку, ориентированную на изучение протоколов.</p>

<p><strong>Набор поддерживаемых протоколов включает:</strong></p>
<ul>
<li>NFC (все режимы, включая эмуляцию карт)</li>
<li>RFID (125 кГц, 13,56 МГц, эмуляция)</li>
<li>Sub-GHz (основные частоты для России: 433, 868 МГц, с возможностью расширения)</li>
<li>IR (с поддержкой кодировок для бытовой техники и домофонов)</li>
<li>BLE (работа с Bluetooth-устройствами, логирование пакетов)</li>
<li>Wi-Fi (анализ трафика и экспериментальные режимы)</li>
<li>USB (BadUSB, HID-эмуляция, работа с накопителями)</li>
<li>GPIO (для взаимодействия с датчиками и платами)</li>
<li>SPI / I²C (для подключения к микроконтроллерам)</li>
</ul>

<p><strong>Встроенные инструменты и библиотеки:</strong></p>
<ul>
<li>Генераторы сигналов с настраиваемыми параметрами для экспериментов в диапазонах Sub-GHz и NFC.</li>
<li>Набор скриптов для быстрой эмуляции часто встречающихся устройств (домофоны, карты доступа, метки).</li>
<li>Система ведения логов с привязкой к сессиям работы, позволяющая анализировать и повторять действия.</li>
<li>Инструменты для протоколирования и анализа данных на чтение.</li>
<li>Модули для работы с оборудованием nazrOS (в учебных целях).</li>
<li>Среда для написания собственных сценариев на языке Союз.</li>
</ul>

<h3 style="font-size:22px;color:#a855f7;margin-top:32px;">🛠️ Предустановленный софт для пентеста и исследований</h3>

<p>КЛОН поставляется с предустановленным набором инструментов, покрывающим ключевые этапы тестирования на проникновение. Весь софт по умолчанию работает в режиме обучения и предназначен для изучения принципов защиты информационных систем в контролируемых и легальных условиях.</p>

<p><strong>Сетевой анализ и сканирование:</strong></p>
<ul>
<li><strong>Nmap</strong> — сканирование открытых портов, определение служб и обнаружение устройств в локальной сети.</li>
<li><strong>Wireshark</strong> — перехват и глубокий анализ сетевого трафика.</li>
<li><strong>BetterCAP</strong> — мониторинг и анализ сети в реальном времени.</li>
</ul>

<p><strong>Анализ беспроводных сетей (Wi-Fi & Bluetooth):</strong></p>
<ul>
<li><strong>Aircrack-ng</strong> — анализ защищённости Wi-Fi сетей.</li>
<li><strong>BetterCAP</strong> — мониторинг и анализ сети в реальном времени.</li>
<li><strong>Hcxdumptool</strong> — сбор PMKID и хэшей для изучения криптографии.</li>
</ul>

<p><strong>Изучение и взлом паролей (в учебных целях):</strong></p>
<ul>
<li><strong>Hydra</strong> — изучение механизмов подбора паролей (аутентификация).</li>
<li><strong>John the Ripper</strong> — инструмент для анализа и восстановления паролей.</li>
<li><strong>Hashcat</strong> — высокопроизводительный инструмент для восстановления паролей, использующий вычислительную мощность GPU для демонстрации уязвимостей.</li>
<li><strong>Crunch</strong> — генератор словарей для анализа паролей.</li>
</ul>

<p><strong>Эксплойты и веб-безопасность:</strong></p>
<ul>
<li><strong>Metasploit Framework</strong> — среда для разработки и запуска эксплойтов (учебный режим).</li>
<li><strong>Burp Suite Community</strong> — анализ безопасности веб-приложений, перехват и модификация запросов.</li>
<li><strong>Sqlmap</strong> — автоматизированное обнаружение и эксплуатация SQL-инъекций (только для легального тестирования).</li>
</ul>

<p><strong>Средства для обхода периметра:</strong></p>
<ul>
<li><strong>TOR</strong> — анонимизация трафика.</li>
<li><strong>Proxychains</strong> — туннелирование трафика через прокси-цепочки.</li>
</ul>

<blockquote style="border-left:4px solid #ff4d2d;padding-left:16px;margin:20px 0;font-style:italic;color:#bdbdbd;">
⚠️ ВСЕ ИНСТРУМЕНТЫ ПРЕДОСТАВЛЯЮТСЯ СТРОГО В ОЗНАКОМИТЕЛЬНЫХ И ОБУЧАЮЩИХ ЦЕЛЯХ. Использование программного обеспечения для несанкционированного доступа к информации, взлома сетей или нарушения конфиденциальности является нарушением законодательства РФ и стран, где может использоваться КЛОН. Администрация nazrOS не несёт ответственности за любые действия пользователей, совершённые с нарушением закона.
</blockquote>

<h3 style="font-size:22px;color:#22d3ee;">Коллекция устройств</h3>

<p>Каждое новое устройство, с которым взаимодействует КЛОН, попадает в цифровую энциклопедию.</p>

<p>Формируется личная база знаний владельца.</p>

<p>Со временем устройство начинает хранить историю десятков и сотен изученных объектов.</p>

<ul>
<li>домофоны</li>
<li>контроллеры</li>
<li>датчики</li>
<li>RFID-метки</li>
<li>NFC-карты</li>
<li>IoT-устройства</li>
<li>роботы</li>
<li>экспериментальные модули nazrOS</li>
</ul>

<h3 style="font-size:22px;color:#22d3ee;">Цифровой питомец инженера</h3>

<p>Визуально КЛОН может отображаться как цифровое существо.</p>

<p>Его внешний вид меняется по мере накопления опыта.</p>

<p>Новые способности открываются через реальные исследования.</p>

<p>Фактически пользователь выращивает собственного цифрового исследователя.</p>

<p>Не за донат.</p>

<p>Не за рекламу.</p>

<p>А за реальные знания.</p>

<h3 style="font-size:22px;color:#a855f7;">Интеграция с nazrOS</h3>

<p>Если Flipper остаётся отдельным устройством, то КЛОН является частью более крупной системы.</p>

<p>Он может синхронизироваться с экосистемой nazrOS.</p>

<ul>
<li>передавать достижения</li>
<li>обмениваться данными между устройствами</li>
<li>участвовать в коллективных исследованиях</li>
<li>получать новые сценарии работы</li>
<li>развивать цифровую личность</li>
</ul>

<p>Каждый клоН становится уникальным.</p>

<p>Два одинаковых устройства через год использования будут совершенно разными.</p>

<h3 style="font-size:22px;color:#22d3ee;">Главное различие</h3>

<p>Flipper Zero отвечает на вопрос:</p>

<blockquote style="border-left:4px solid #22d3ee;padding-left:16px;color:#bdbdbd;">
Что я могу сделать этим устройством?
</blockquote>

<p>КЛОН отвечает на другой вопрос:</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;color:#bdbdbd;">
Кем станет моё устройство вместе со мной?
</blockquote>

<p>Именно поэтому в экосистеме nazrOS КЛОН рассматривается не как гаджет, а как цифровой спутник исследователя, растущий вместе со своим владельцем.</p>

<h3 style="font-size:22px;color:#22d3ee;margin-top:32px;">🧬 Цифровая идентичность: геометрия, ранги и сигнатуры</h3>

<p>Каждый Кибер в CyberEden обладает уникальным цифровым профилем. Его суть выражается через комбинацию <strong>геометрической фигуры</strong>, <strong>цифрового уровня</strong>, <strong>цвета сигнатуры</strong> и <strong>ранга</strong>.</p>

<h4>◉ Геометрические фигуры (Тип активности)</h4>
<p>Фигура показывает, в какой сфере Кибер проявляет себя наиболее активно.</p>
<ul>
<li><strong>○ КРУГ</strong> — Социальная / Медиа (стримы, публикации, события)</li>
<li><strong>△ ТРЕУГОЛЬНИК</strong> — Инженерная / Разработка (код, архитектура, HUD)</li>
<li><strong>□ КВАДРАТ</strong> — Инфраструктура / Производство (серверы, деплои, устройства)</li>
<li><strong>⬢ ШЕСТИУГОЛЬНИК</strong> — Био / ИИ / Активные системы (AI, био-модули, нейросети)</li>
</ul>

<h4>🔢 Цифровой уровень (1–9)</h4>
<p>Число внутри фигуры показывает <strong>степень погружения</strong> в свою сферу.</p>
<ul>
<li><strong>1–3</strong> — Начинающий. Только осваивает инструменты.</li>
<li><strong>4–6</strong> — Практикующий. Самостоятельно выполняет задачи.</li>
<li><strong>7–8</strong> — Эксперт. Ведёт проекты, обучает других.</li>
<li><strong>9</strong> — CORE. Мастер высшего уровня. Управляет системным ядром.</li>
</ul>

<h4>🎨 Цвет сигнатуры (Энергетика профиля)</h4>
<p>Цвет фигуры отражает <strong>текущее состояние и энергию</strong> Кибера.</p>
<ul>
<li><strong>Magenta / Фиолетовый</strong> — Коммуникация, сигналы, живые системы.</li>
<li><strong>Cyan / Синий</strong> — Инженерия, ядро, код.</li>
<li><strong>Orange / Красный</strong> — Инфраструктура, железо, производство.</li>
<li><strong>Green / Зелёный</strong> — Био, ИИ, адаптивные системы.</li>
<li><strong>Yellow / Золотой</strong> — События, награды, легендарный статус.</li>
<li><strong>White / Белый</strong> — База, нейтральный статус.</li>
<li><strong>Black / Чёрный</strong> — Скрытый режим, призрак.</li>
<li><strong>System Neon (градиент)</strong> — Ядро системы, администратор.</li>
</ul>

<h4>🏅 Ранги Кибера (Уровни доступа)</h4>
<p>Ранг определяет <strong>права и возможности</strong> внутри экосистемы nazrOS.</p>
<ul>
<li><strong>НАБЛЮДАТЕЛЬ</strong> — Базовый. Просматривать платформу, читать журнал, участвовать в публичных мероприятиях.</li>
<li><strong>ОПЕРАТОР</strong> — Расширенный. Создавать контент, загружать файлы в датацентр, взаимодействовать с устройствами.</li>
<li><strong>АРХИТЕКТОР ЯДРА</strong> — Привилегированный. Управлять структурами, создавать новые модули, изменять логику систем.</li>
<li><strong>ГЛАВНЫЙ РАЗРАБОТЧИК</strong> — Максимальный. Полный доступ к ядру nazrOS, управление инфраструктурой, создание новых протоколов.</li>
</ul>

<h4>🧩 Сравнение рангов</h4>
<p>НАБЛЮДАТЕЛЬ → Чтение: ✅, Запись: ❌, Управление модулями: ❌, Доступ к ядру: ❌.</p>
<p>ОПЕРАТОР → Чтение: ✅, Запись: ✅, Управление модулями: ❌, Доступ к ядру: ❌.</p>
<p>АРХИТЕКТОР ЯДРА → Чтение: ✅, Запись: ✅, Управление модулями: ✅, Доступ к ядру: ❌.</p>
<p>ГЛАВНЫЙ РАЗРАБОТЧИК → Чтение: ✅, Запись: ✅, Управление модулями: ✅, Доступ к ядру: ✅.</p>

<h4>📊 Пример комбинированного профиля</h4>
<pre style="background:#111122;padding:12px;border-radius:6px;color:#94a3b8;">△8  cyan   →  АРХИТЕКТОР ЯДРА
○6  magenta  →  ОПЕРАТОР
□4  orange   →  ОПЕРАТОР
⬢7  green    →  ОПЕРАТОР
</pre>
<p>Это не просто статусы. Это визуальная идентификация Кибера внутри nazrOS.</p>

</div>`,
},

{
  "id": "a46",
  "title": "страННо как игровой движок: манифест разработчика",
  "topic": "Геймдев",
  "excerpt": "Почему мы перестали называть страННо редактором и почему это меняет подход к созданию игр.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">страННо как игровой движок: манифест разработчика</h2>
<p>Если вы когда-нибудь делали игру, вы знаете этот путь: модель в Blender, текстуры в Substance Painter, анимация в Maya, звук в Pro Tools, сборка в Unreal. Каждый шаг — это экспорт, импорт, конвертация, потеря данных.</p>
<p>Мы решили этот путь <strong style="color:#fb923c;">сократить до нуля</strong>.</p>
<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«страННо — это не просто редактор. Это игровая экосистема, в которой все этапы разработки происходят в одном пространстве.»</blockquote>
<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">От идеи до игрового процесса — без экспорта</h3>
<p>Представьте: вы создаёте персонажа в модуле <strong style="color:#fb923c;">«Руки»</strong>, тут же оживляете его в <strong style="color:#fb923c;">«Мультах»</strong>, настраиваете физику в <strong style="color:#fb923c;">«Яблочке»</strong>, пишете логику NPC в <strong style="color:#fb923c;">«Поле»</strong> — и всё это внутри одного приложения, на одной сцене.</p>
<p>Никаких импортов. Никаких конфликтов версий. Вы просто <strong>идёте дальше</strong>.</p>
<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно для геймдева</h3>
<p>Современная инди-студия — это часто 1–3 человека. Каждый час, потраченный на экспорт или исправление конвертации, — это час, не потраченный на геймплей.</p>
<p>страННо даёт разработчику <strong>единое пространство</strong>, в котором всё связано. Квесты пишутся в «Поле», частицы рождаются в «Глюке», уровни генерируются в «Колодце».</p>
<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«В страННо нет экспорта. Есть только продолжение.»</blockquote>
<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что мы расскажем дальше</h3>
<p>В этой серии статей мы разберём каждый модуль страННо через призму <strong>геймдева</strong>: как лепить персонажей в «Руках», как настраивать AI в «Поле», как делать взрывы в «Глюке» и как генерировать бесконечные миры в «Колодце».</p>
<p>страННо — это не следующий Blender. Это <strong>новый способ думать о разработке игр</strong>.</p>
</div>`
}, 

{
  "id": "a47",
  "title": "Один пайплайн — одна игра: как страННо заменяет Blender, Maya и Unreal одновременно",
  "topic": "Геймдев",
  "excerpt": "Разбираем реальную цепочку создания игрового проекта без единого экспорта или импорта.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Один пайплайн — одна игра: как страННо заменяет Blender, Maya и Unreal одновременно</h2>

<p>Вы когда-нибудь пробовали собрать даже маленькую игру без того, чтобы десять раз пересохранить модель, переконвертировать текстуры или поправить криво загруженную анимацию? Если да — вы знаете, о чём я говорю.</p>

<p>Индустрия привыкла к экосистеме «трёх китов»: <strong>Blender</strong> для модели, <strong>Substance</strong> для материалов, <strong>Unreal</strong> для сборки. Но между ними нет общей памяти. Только экспорт.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«страННо — это единый конвейер, в котором готовая модель сразу становится игровым объектом, а анимация — геймплейной механикой.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Сценарий: создаём игрового персонажа</h3>

<p>Берём стандартную задачу: нужно создать персонажа для инди-игры, добавить ему анимацию ходьбы и простую логику AI.</p>

<p><strong>В классическом подходе:</strong><br>
1. Лепим модель в Blender → экспорт в FBX.<br>
2. Идём в Substance Painter, делаем текстуры → экспорт.<br>
3. Загружаем всё в Unreal Engine → правим риг, настраиваем материалы, заново связываем скелет.<br>
4. Пишем логику AI через Blueprints или C++.</p>

<p>Каждый переход — это риск потери данных, сбитые координаты и часы отладки.</p>

<p><strong>В страННо:</strong><br>
1. Открываем модуль <strong style="color:#fb923c;">«Руки»</strong> и лепим персонажа.<br>
2. Переходим в <strong style="color:#fb923c;">«Мульт»</strong> (даже не закрывая окно) и делаем риг, добавляем анимацию ходьбы и бега.<br>
3. В <strong style="color:#fb923c;">«Поле»</strong> пишем визуальную логику AI — персонаж сам начинает патрулировать.</p>

<p>Всё. Вы не покидали среду страННо ни разу. Ваш персонаж существует как единый цифровой объект, а не как папка с разрозненными файлами.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«страННо не требует, чтобы вы сохраняли файлы перед переходом в следующий модуль. Он просто запоминает состояние.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">А что с физикой и разрушениями?</h3>

<p>Вам больше не нужно скачивать отдельные плагины для симуляции.</p>

<p>Модуль <strong style="color:#fb923c;">«Яблочко»</strong> встроен в движок: он обрабатывает твёрдые тела, жидкости, разрушения и тряпичную физику. Вы можете сразу проверить, как персонаж реагирует на удар или как разлетается стена, <strong>прямо на той же сцене</strong>.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">И главное — время</h3>

<p>Инди-разработчики работают на время. Каждый сэкономленный час конвертации — это час, который можно потратить на <strong>геймплей</strong>, на <strong>настройку камеры</strong>, на <strong>финальный билд</strong>.</p>

<p>страННо не экономит минуты. Он <strong>убирает целые этапы</strong>, которые раньше считались неизбежными.</p>

<p>В следующей статье мы разберём модуль <strong style="color:#fb923c;">«Руки»</strong> как основной инструмент создания игровых ассетов.</p>
</div>`
}, 

{
  "id": "a48",
  "title": "Модуль «Руки»: создание игровых ассетов без единого экспорта и без потери полигонов",
  "topic": "Геймдев",
  "excerpt": "Как работает объёмное моделирование в страННо и почему это быстрее, чем в Blender или Maya.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Руки»: создание игровых ассетов без единого экспорта и без потери полигонов</h2>

<p>В мире геймдева моделирование — это этап, от которого зависит всё. Персонаж, оружие, окружение, архитектура. В страННо этот этап начинается в модуле <strong style="color:#fb923c;">«Руки»</strong>.</p>

<p>«Руки» — это не просто 3D-редактор, встроенный в движок. Это <strong>единая точка входа</strong> для всех игровых объектов, которые появятся в вашем проекте.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«В «Руках» вы не создаёте файл. Вы создаёте сущность, которая сразу готова к анимации и физике.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри «Рук»</h3>

<p>Модуль объединяет три подхода к моделированию:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Полигональное моделирование</strong> — работа с мешами, экструзия, топология, зеркалирование.</li>
<li><strong style="color:#fb923c;">Цифровая скульптура</strong> — детализация с помощью кистей, работа с формами, органические поверхности.</li>
<li><strong style="color:#fb923c;">Параметрика и процедурная сборка</strong> — создание объектов по правилам, модульные конструкции, архитектурные сцены.</li>
</ul>

<p>Каждый подход работает в рамках единого пространства. Вы можете начать с полигонального блока, переключиться на скульптинг для мелких деталей, а затем использовать параметрику для тиражирования объекта по уровню.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это ускоряет геймдев</h3>

<p>В классическом пайплайне после моделирования вы должны:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Экспортировать в FBX.</li>
<li>Открыть другую программу для UV-развёртки.</li>
<li>Настроить LOD-уровни.</li>
<li>Импортировать в движок и надеяться, что масштаб не сбился.</li>
</ul>

<p>В страННо вы просто <strong>переходите из «Рук» в «Мульт» или «Поле»</strong>. Модель уже готова к анимации и геймплею. Координаты, топология и UV-карты сохраняются автоматически.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«В «Руках» нет финала. Есть только этап, который готов к продолжению.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Режимы: инженерный и художественный</h3>

<p>«Руки» поддерживают два режима работы:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Инженерный режим</strong> — точность, сетки, размеры, привязки. Для архитектурных сцен, оружия, интерфейсов.</li>
<li><strong style="color:#fb923c;">Художественный режим</strong> — свобода, кисти, органические формы. Для персонажей, монстров, природы.</li>
</ul>

<p>Переключение происходит без потери данных. Вы можете сделать инженерный каркас здания, затем в художественном режиме украсить его органическими деталями.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Куда ведёт этот модуль</h3>

<p>В следующих статьях мы покажем, как модель из «Рук» превращается в анимированного персонажа через <strong style="color:#fb923c;">«Мульт»</strong>, а затем — в полноценного NPC через <strong style="color:#fb923c;">«Поле»</strong>.</p>
</div>`
}, 

{
  "id": "a49",
  "title": "Модуль «Мульт»: анимация для игровых персонажей от риггинга до лицевой мимики",
  "topic": "Геймдев",
  "excerpt": "Как страННо превращает статичную модель из «Рук» в живого персонажа с походкой, эмоциями и боевыми движениями.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Мульт»: анимация для игровых персонажей от риггинга до лицевой мимики</h2>

<p>Модель персонажа из «Рук» — это статуя. Она выглядит хорошо, но не двигается. Чтобы превратить статую в героя игры, нужен <strong style="color:#fb923c;">«Мульт»</strong>.</p>

<p>«Мульт» — это модуль, который отвечает за всё, что связано с движением: от простой походки до сложных боевых комбо и лицевой анимации. И он встроен в страННо напрямую, без внешних риггеров или отдельных редакторов.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Мульт» берёт модель из «Рук» и сразу видит её скелет. Никакого импорта анимаций извне.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что входит в «Мульт»</h3>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Скелетная анимация</strong> — классическая работа с костями, IK и FK солверами, риггинг под игровой пайплайн.</li>
<li><strong style="color:#fb923c;">Лицевая анимация</strong> — мимика, эмоции, речь, моргание, синхронизация с аудио из «Шины».</li>
<li><strong style="color:#fb923c;">Физическая анимация</strong> — движение, управляемое физикой: волосы, ткани, хвосты, аксессуары.</li>
<li><strong style="color:#fb923c;">Процедурная анимация</strong> — движения, которые адаптируются на лету: шаги по наклонной поверхности, развороты при беге.</li>
</ul>

<p>Все эти слои накладываются на одну модель и могут быть смешаны в реальном времени.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это выглядит в геймдеве</h3>

<p>Представьте, что вы делаете игру в жанре action RPG.</p>

<p>Сценарий в страННо:</p>
<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>В «Руках» создаёте персонажа-воина.</li>
<li>Переходите в «Мульт» — скелет появляется автоматически.</li>
<li>Создаёте анимации: бег, удар мечом, блок, спринт.</li>
<li>Добавляете лицевую анимацию: гнев, улыбка, боль.</li>
<li>Переходите в «Поле» — и все эти анимации уже готовы к использованию в игровых событиях.</li>
</ol>

<p>Никаких экспортов, никаких внешних файлов. Анимация существует как часть единого цифрового объекта.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«В «Мультах» нет разницы между «анимацией для просмотра» и «анимацией для геймплея». Это одно и то же.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это критично для инди-команд</h3>

<p>В классическом подходе есть разрыв: аниматоры работают в Maya, а разработчики — в Unreal. Они говорят на разных языках, используют разные системы координат.</p>

<p>В страННо аниматор и разработчик <strong>видят одну и ту же сцену</strong>. Анимация моментально становится доступной в «Поле» для квестов, для AI, для кат-сцен.</p>

<p>Это не просто ускорение. Это <strong>смена культуры разработки</strong>.</p>

<p>В следующей статье мы разберём, как «Мульт» и «Поле» работают вместе, чтобы оживить NPC.</p>
</div>`
}, 

{
  "id": "a50",
  "title": "Модуль «Поле»: визуальное программирование игровой логики без кода",
  "topic": "Геймдев",
  "excerpt": "Как в страННо создаются квесты, NPC и игровые механики — без знания языков программирования.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Поле»: визуальное программирование игровой логики без кода</h2>

<p>У вас есть модель, есть анимация, есть мир. Но игра не начинается, пока в ней не появляется <strong>логика</strong>. Кто с кем говорит, куда идти, что делать, когда наступает событие.</p>

<p>В страННо за это отвечает модуль <strong style="color:#fb923c;">«Поле»</strong>.</p>

<p>«Поле» — это не скриптовый язык. Это <strong>визуальная среда</strong>, где правила игры собираются из блоков, а не пишутся в текстовом редакторе.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Поле» превращает геймдизайнера в создателя игр, а не просто в того, кто пишет документы.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает</h3>

<p>Вместо того чтобы писать код, вы собираете граф из нод. Каждая нода — это действие или условие:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Условие</strong>: «Игрок подошёл к NPC».</li>
<li><strong style="color:#fb923c;">Действие</strong>: «Запустить анимацию приветствия».</li>
<li><strong style="color:#fb923c;">Переход</strong>: «Открыть диалоговое окно».</li>
<li><strong style="color:#fb923c;">Выбор</strong>: «Если у игрока есть квест, показать вариант А, иначе — вариант Б».</li>
</ul>

<p>Все эти блоки соединяются в единую схему, которая и становится поведением мира.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что можно создать в «Поле»</h3>

<p>Модуль охватывает все уровни игровой логики:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Поведение NPC</strong>: патрулирование, реакция на игрока, агрессия, торговля.</li>
<li><strong style="color:#fb923c;">Квесты</strong>: цепочки заданий, условия завершения, награды.</li>
<li><strong style="color:#fb923c;">Игровые механики</strong>: открытие дверей, сбор предметов, активация ловушек.</li>
<li><strong style="color:#fb923c;">AI</strong>: выбор целей, смена состояний, реакция на окружение.</li>
</ul>

<p>Всё это собирается в общем графе, который можно редактировать даже во время тестового прохождения.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Вы меняете логику на лету — и мир сразу реагирует. Никаких перекомпиляций.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Визуальное программирование вместо кода</h3>

<p>Для геймдизайнера это означает, что он может воплощать свои идеи без участия программиста. Для программиста — что он может создавать прототипы в 10 раз быстрее.</p>

<p>«Поле» не заменяет код полностью — для сложной логики есть возможность написать кастомные скрипты на языке <strong style="color:#fb923c;">Союз</strong>. Но 80% повседневных задач покрываются визуальными блоками.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что дальше</h3>

<p>В следующей статье мы перейдём к физике. Модуль <strong style="color:#fb923c;">«Яблочко»</strong> — то, что делает мир осязаемым.</p>
</div>`
}, 

{
  "id": "a51",
  "title": "Модуль «Яблочко»: физика для геймплея от твёрдых тел до разрушений",
  "topic": "Геймдев",
  "excerpt": "Как в страННо работают столкновения, гравитация, жидкости и разрушения — и почему это важно для разработки игр.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Яблочко»: физика для геймплея от твёрдых тел до разрушений</h2>

<p>Мир в игре становится настоящим не тогда, когда он красивый, а тогда, когда он <strong>реагирует</strong>. Когда камень падает, когда вода заливает пещеру, когда стена разлетается от взрыва.</p>

<p>За это в страННо отвечает модуль <strong style="color:#fb923c;">«Яблочко»</strong>.</p>

<p>«Яблочко» — это встроенный физический движок, который работает на всех уровнях: от простой гравитации до сложных симуляций жидкостей и разрушений.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Яблочко» не требует отдельной настройки. Оно просто работает, когда вы добавляете объект на сцену.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри «Яблочка»</h3>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Твёрдые тела</strong>: столкновения, гравитация, трение, масса. Всё, что нужно для физики объектов.</li>
<li><strong style="color:#fb923c;">Жидкости</strong>: симуляция воды, лавы, слизи. Потоки, волны, смешивание.</li>
<li><strong style="color:#fb923c;">Ткани и мягкие тела</strong>: для одежды, флагов, парусов, тел с изменяемой формой.</li>
<li><strong style="color:#fb923c;">Разрушения</strong>: объекты, которые разлетаются на части при ударе или взрыве.</li>
<li><strong style="color:#fb923c;">Коллизии и триггеры</strong>: зоны, которые активируют события при входе игрока.</li>
</ul>

<p>И всё это <strong>интегрировано напрямую</strong> с «Полем» и «Глюком». Вы можете сделать так, чтобы NPC реагировал на падение предмета, или чтобы разлетевшиеся обломки создавали визуальный эффект через систему частиц.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это ускоряет геймдев</h3>

<p>В классическом пайплайне физику обычно настраивают в движке отдельно от моделирования. Это значит:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Вы должны импортировать модель.</li>
<li>Заново настроить коллизию.</li>
<li>Проверить, не сбились ли координаты.</li>
<li>Править физические параметры вручную.</li>
</ul>

<p>В страННо всё иначе:</p>

<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Вы создаёте объект в «Руках».</li>
<li>Переходите в «Яблочко» — <strong>физическая оболочка генерируется автоматически</strong>.</li>
<li>Настраиваете только то, что нужно: массу, трение, упругость.</li>
</ol>

<p>Всё остальное уже готово к геймплею.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Объект, созданный в «Руках», сразу знает, как упасть, когда его толкнут.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Физика как основа геймплея</h3>

<p>«Яблочко» — это не просто фон. Это <strong>инструмент геймдизайнера</strong>.</p>

<p>Хотите головоломку, где нужно направить поток воды на механизм? Делаете в «Яблочке». Хотите босса, который разрушает арену по мере битвы? Тоже в «Яблочке».</p>

<p>В следующей статье мы займёмся <strong style="color:#fb923c;">«Глюком»</strong> — визуальными эффектами, которые превращают механику в зрелище.</p>
</div>`
}

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