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

// Публикации журнала — в отдельном файле для удобства редактирования
export { articles } from "@/lib/articles";

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