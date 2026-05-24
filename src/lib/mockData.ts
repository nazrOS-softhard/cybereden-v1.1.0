import rostn from "@/assets/rostn.jpg";
import drone from "@/assets/item-drone.jpg";
import visor from "@/assets/item-visor.jpg";
import arm from "@/assets/item-arm.jpg";
import rostnFull from "@/assets/rostn-full.png"; 


export type Sensor = { label: string; unit: string; value: number; min: number; max: number };
export type Slider = { label: string; value: number; min: number; max: number; unit: string };

export type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "in_stock" | "low" | "preorder";
  image: string;
  short: string;
  description: string;
  sensors: Sensor[];
  sliders: Slider[];
};

export const items: Item[] = [
  {
    id: "neurochip-x9",
    name: "growthN",
    category: "Биотехнологии",
    price: 248000,
    status: "in_stock",
    image: rostn,
    expandedImage: rostnFull,
    short: "интеллектуальная система контролируемого культивирования",
    description:
      "growthN — урбанистическая интеллектуальная система контролируемого культивирования, разработанная внутри экосистемы nazrOS для автономного выращивания растительных культур в условиях цифровой городской среды. Обеспечивает поддержание биобаланса, автоматический контроль климата и автономное производство ресурсов.",
    sensors: [
      { label: "Зелень. ядра", unit: "°C", value: 38, min: 20, max: 80 },
      { label: "Микрозелень", unit: "%", value: 42, min: 0, max: 100 },
      { label: "Грибы", unit: "dBm", value: -52, min: -100, max: 0 },
    ],
    sliders: [
      { label: "Тактовая частота", value: 3.4, min: 1, max: 6, unit: "ГГц" },
      { label: "Мощность", value: 65, min: 10, max: 100, unit: "%" },
      { label: "Охлаждение", value: 50, min: 0, max: 100, unit: "%" },
    ],
  },
  {
    id: "drone-vex",
    name: "Дрон-разведчик VEX-02",
    category: "Дроны",
    price: 8900,
    status: "low",
    image: drone,
    short: "Бесшумный микро-дрон со стелс-покрытием.",
    description:
      "Радиус автономной работы 14 км, тепловизор, активное шумоподавление и канал прямой передачи в HUD оператора. Идеален для разведки в плотной городской застройке.",
    sensors: [
      { label: "Батарея", unit: "%", value: 88, min: 0, max: 100 },
      { label: "Высота", unit: "м", value: 120, min: 0, max: 500 },
      { label: "Шум", unit: "дБ", value: 18, min: 0, max: 60 },
    ],
    sliders: [
      { label: "Скорость", value: 40, min: 0, max: 120, unit: "км/ч" },
      { label: "Стелс-режим", value: 70, min: 0, max: 100, unit: "%" },
      { label: "Камера ISO", value: 800, min: 100, max: 6400, unit: "ISO" },
    ],
  },
  {
    id: "visor-aurora",
    name: "AR-визор «Aurora»",
    category: "Оптика",
    price: 6400,
    status: "in_stock",
    image: visor,
    short: "Голографический визор с трекингом глаз 240 Гц.",
    description:
      "Двухслойный OLED, обнаружение микро-саккад и адаптивный фокус. Поддерживает overlay-протокол nazrOS Glassware. Заряд: 14 ч активной работы.",
    sensors: [
      { label: "Яркость", unit: "нт", value: 1200, min: 100, max: 3000 },
      { label: "Темп.", unit: "°C", value: 34, min: 20, max: 60 },
      { label: "Заряд", unit: "%", value: 73, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Прозрачность HUD", value: 60, min: 0, max: 100, unit: "%" },
      { label: "Контраст", value: 75, min: 0, max: 100, unit: "%" },
      { label: "Refresh", value: 240, min: 60, max: 360, unit: "Гц" },
    ],
  },
  {
    id: "arm-vermillion",
    name: "Кибер-протез «Vermillion»",
    category: "Протезы",
    price: 24800,
    status: "preorder",
    image: arm,
    short: "Полноценная кибернетическая рука с тактильной обратной связью.",
    description:
      "Углеродный скелет, 32 микро-сервопривода, тактильный слой с разрешением 1 мм. Подключается к Neurochip X-9 без дополнительного драйвера.",
    sensors: [
      { label: "Усилие", unit: "Н", value: 220, min: 0, max: 800 },
      { label: "Темп.", unit: "°C", value: 31, min: 20, max: 70 },
      { label: "Калибровка", unit: "%", value: 96, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Сила хвата", value: 55, min: 0, max: 100, unit: "%" },
      { label: "Скорость отклика", value: 80, min: 0, max: 100, unit: "%" },
      { label: "Чувствительность", value: 65, min: 0, max: 100, unit: "%" },
    ],
  },
  {
    id: "ice-breaker-v2",
    name: "ICE-breaker v2",
    category: "Утилиты",
    price: 3200,
    status: "in_stock",
    image: visor,
    short: "Инструмент взлома защитных систем нового поколения.",
    description:
      "Портативная утилита для обхода ICE-защиты. Совместима с большинством систем назrOS. Требует верификации уровня доступа.",
    sensors: [
      { label: "Эффективность", unit: "%", value: 92, min: 0, max: 100 },
      { label: "Темп.", unit: "°C", value: 28, min: 20, max: 55 },
      { label: "Заряд", unit: "%", value: 45, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Проникновение", value: 85, min: 0, max: 100, unit: "%" },
      { label: "Скорость работы", value: 90, min: 0, max: 100, unit: "%" },
    ],
  },
  {
    id: "dream-patch",
    name: "Dream patch",
    category: "Нейротехнологии",
    price: 1200,
    status: "in_stock",
    image: rostn,
    short: "Модуль записи и воспроизведения цифровых снов.",
    description:
      "Позволяет записывать, хранить и воспроизводить цифровые сны. Интегрируется с neurochip системами. Рекомендуется использовать с осторожностью.",
    sensors: [
      { label: "Запись", unit: "%", value: 78, min: 0, max: 100 },
      { label: "Качество", unit: "бит", value: 256, min: 32, max: 512 },
      { label: "Память", unit: "%", value: 34, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Глубина REM", value: 72, min: 0, max: 100, unit: "%" },
    ],
  },
  {
    id: "signal-booster",
    name: "Signal Booster X",
    category: "Коммуникации",
    price: 2800,
    status: "in_stock",
    image: drone,
    short: "Усилитель сигнала для трансляций и стримов.",
    description:
      "Компактный передатчик сигнала для прямых трансляций в среде nazrOS. Чистота канала 99.8%. Поддерживает адаптивное кодирование.",
    sensors: [
      { label: "Мощность", unit: "дБм", value: 28, min: 0, max: 40 },
      { label: "Полоса пропускания", unit: "МГц", value: 40, min: 1, max: 100 },
      { label: "КСВ", unit: "дБ", value: 1.2, min: 1, max: 3 },
    ],
    sliders: [
      { label: "Усиление", value: 78, min: 0, max: 100, unit: "%" },
    ],
  },
  {
    id: "core-optimizer",
    name: "Core Optimizer Pro",
    category: "Системное ПО",
    price: 4500,
    status: "low",
    image: arm,
    short: "Профессиональный оптимизатор ядра операционной среды.",
    description:
      "Повышает производительность системы на 15-25%. Автоматическая оптимизация памяти, кэша и процессов. Требует прав администратора.",
    sensors: [
      { label: "Оптимизация", unit: "%", value: 85, min: 0, max: 100 },
      { label: "Нагрузка ЦП", unit: "%", value: 12, min: 0, max: 100 },
      { label: "Объём ОЗУ", unit: "ГБ", value: 2.4, min: 0, max: 8 },
    ],
    sliders: [
      { label: "Агрессивность", value: 65, min: 0, max: 100, unit: "%" },
    ],
  },
  {
    id: "hud-skin-neon",
    name: "HUD Skin: Neon Edition",
    category: "Интерфейсы",
    price: 890,
    status: "in_stock",
    image: visor,
    short: "Кастомная скин для HUD-интерфейса в неоновом стиле.",
    description:
      "Визуальный пакет для переоформления HUD с неоновым эффектом. Совместима со всеми версиями Portal. Включает 12 цветовых схем.",
    sensors: [
      { label: "Производительность", unit: "%", value: 98, min: 0, max: 100 },
      { label: "Эффект", unit: "слои", value: 8, min: 1, max: 16 },
    ],
    sliders: [
      { label: "Яркость", value: 75, min: 0, max: 100, unit: "%" },
    ],
  },
];

export type Article = {
  id: string;
  title: string;
  topic: "Кибербезопасность" | "Геймдев" | "Киберспорт" | "Хакинг" | "Цифровая этика";
  excerpt: string;
  body: string;
  readTime: number;
};

export const articles: Article[] = [
  { id: "a1", title: "Архитектура нулевого доверия в 2090", topic: "Кибербезопасность", excerpt: "Почему периметр умер и что пришло на смену.", body: "Zero Trust как практика, а не маркетинг. Сегментация на уровне нейронных запросов, политики на основе поведения и непрерывная аттестация контекстов. Разбираем кейсы корпораций Aoyama и SynLine.", readTime: 7 },
  { id: "a2", title: "Гайд по эксплойтам нейро-API", topic: "Хакинг", excerpt: "Чёрный рынок патчей: где грань.", body: "Реверс-инжиниринг прошивок Neurochip X-9 и анализ цепочки CVE-2090-1337. Этические границы и правовые риски.", readTime: 12 },
  { id: "a3", title: "Сделано в подвале: инди-игры с нейро-контролем", topic: "Геймдев", excerpt: "Шесть команд, изменивших индустрию.", body: "От прототипа в Unity до релиза с BCI-контроллером за 4 месяца. Истории, бюджеты, фейлы.", readTime: 9 },
  { id: "a4", title: "Лига Nexus Pro: разбор финала", topic: "Киберспорт", excerpt: "Как «Чёрный сурикен» обыграл фаворитов.", body: "Покадровый анализ решающего матча, метрики реакции и неожиданная тактика капитана.", readTime: 6 },
  { id: "a5", title: "Кто владеет твоими снами?", topic: "Цифровая этика", excerpt: "Сны как данные — правовой вакуум.", body: "После анонса DreamCache корпорации получили доступ к слоям REM-памяти. Что говорят регуляторы Сектора 4.", readTime: 10 },
  { id: "a6", title: "ICE-машины 2090: что под капотом", topic: "Кибербезопасность", excerpt: "Активная защита: от ловушек до контратак.", body: "Технический разбор современных Intrusion Countermeasures Electronics и их слабых мест.", readTime: 8 },
];

export type Event = {
  id: string;
  title: string;
  type: "ТРАНСЛЯЦИИ" | "ТУРНИРЫ" | "ХАКАТОНЫ" | "ДЕПЫ";
  date: string;
  location: string;
  description: string;
};

export const events: Event[] = [
  // ТРАНСЛЯЦИИ
  { id: "e1", title: "HUD CORE LIVE", type: "ТРАНСЛЯЦИИ", date: "05.08.2090", location: "Live · Channel ZERO", description: "Прямая инженерная сессия Portal и Pirate Station. Создание интерфейсов HUD-системы КиберэдэН в реальном времени." },
  { id: "e2", title: "PHANTOM BUILD", type: "ТРАНСЛЯЦИИ", date: "12.08.2090", location: "Live · Channel ZERO", description: "Разработка экспериментального концепта устройства nazrOS. Генеративный дизайн и нестандартная архитектура." },
  { id: "e3", title: "SYSTEM TEST", type: "ТРАНСЛЯЦИИ", date: "19.08.2090", location: "Live · Black Factory", description: "Тестирование цифровой среды, стресс-тест HUD и проверка стабильности модулей nazrOS." },
  { id: "e4", title: "DEVICE ASSEMBLY", type: "ТРАНСЛЯЦИИ", date: "26.08.2090", location: "Live · CXEMA", description: "Сборка серверного модуля и пайка инженерных компонентов для инфраструктуры КиберэдэН." },
  { id: "e5", title: "LIVE DEBUG SESSION", type: "ТРАНСЛЯЦИИ", date: "02.09.2090", location: "Live · Darknet", description: "Ночной дебагинг среды. Исправление визуальных багов и оптимизация интерфейсной системы." },
  { id: "e6", title: "MOTION STREAM", type: "ТРАНСЛЯЦИИ", date: "09.09.2090", location: "Live · Portal Studio", description: "Создание анимаций Framer Motion и интерфейсных переходов для операционной среды nazrOS." },
  
  // ТУРНИРЫ
  { id: "e7", title: "CORE WAR // SEASON 01", type: "ТУРНИРЫ", date: "15.08.2090", location: "Арена Сектор-7", description: "Командное инженерное соревнование департаментов nazrOS. Победитель получает контроль над сезонным ядром." },
  { id: "e8", title: "NEXUS GRID CUP", type: "ТУРНИРЫ", date: "22.08.2090", location: "Online · Nexus Arena", description: "Киберспортивный турнир по симуляционным системам и цифровым сценариям." },
  { id: "e9", title: "SIGNAL BROADCAST LEAGUE", type: "ТУРНИРЫ", date: "29.08.2090", location: "Live · Signal Studio", description: "Соревнование стримеров и медиа-операторов за лучший live-контент среды." },
  { id: "e10", title: "INTERFACE CLASH", type: "ТУРНИРЫ", date: "05.09.2090", location: "Portal Campus", description: "Турнир UI/UX архитекторов. Участники создают интерфейс за ограниченное время." },
  { id: "e11", title: "CODE RUSH", type: "ТУРНИРЫ", date: "12.09.2090", location: "Pirate Station HQ", description: "Скоростная разработка системных модулей и backend-логики nazrOS." },
  { id: "e12", title: "BLACK PROTOCOL ARENA", type: "ТУРНИРЫ", date: "19.09.2090", location: "Black Factory", description: "Закрытый турнир экспериментальных цифровых сценариев. Только приглашённые." },
  
  // ХАКАТОНЫ
  { id: "e13", title: "HACK THE CORE", type: "ХАКАТОНЫ", date: "20.08.2090", location: "Online · Darknet", description: "48 часов на создание нового системного модуля для цифровой среды nazrOS." },
  { id: "e14", title: "HUD OVERDRIVE", type: "ХАКАТОНЫ", date: "27.08.2090", location: "Portal Campus", description: "Создание полноэкранных HUD-интерфейсов и анимированных компонентов." },
  { id: "e15", title: "SIGNAL LIVE JAM", type: "ХАКАТОНЫ", date: "03.09.2090", location: "Signal Studio", description: "Создание интерактивных live-систем и стриминговых панелей." },
  { id: "e16", title: "PROTOCOL JAM", type: "ХАКАТОНЫ", date: "10.09.2090", location: "Pirate Station", description: "Разработка цифровых протоколов, логики среды и когнитивных систем." },
  { id: "e17", title: "HARDWARE NIGHT", type: "ХАКАТОНЫ", date: "17.09.2090", location: "CXEMA Lab", description: "Ночная инженерная сборка устройств и тестирование аппаратных модулей." },
  { id: "e18", title: "SIMULATION EVENT", type: "ХАКАТОНЫ", date: "24.09.2090", location: "Black Factory", description: "Создание игровых сценариев, тестовых миров и цифровых симуляций nazrOS." },
  
  // ДЕПЫ
  { id: "e19", title: "Portal", type: "ДЕПЫ", date: "", location: "Headquarters", description: "Визуальное ядро nazrOS. Интерфейсы, HUD-системы, motion-дизайн и цифровая типографика." },
  { id: "e20", title: "Signal", type: "ДЕПЫ", date: "", location: "Broadcast Center", description: "Трансляции, цифровой журнал, медиа-среда и голос экосистемы nazrOS." },
  { id: "e21", title: "Pirate Station", type: "ДЕПЫ", date: "", location: "Tech HQ", description: "Разработка ядра платформы, backend-систем, инфраструктуры и цифровой логики." },
  { id: "e22", title: "Black! Factory", type: "ДЕПЫ", date: "", location: "Experimental Lab", description: "Экспериментальные технологии, фантомные концепты и прототипирование будущих систем." },
  { id: "e23", title: "CXEMA", type: "ДЕПЫ", date: "", location: "Hardware Division", description: "Серверные системы, сборка устройств, аппаратные платформы и инженерная инфраструктура." },
  { id: "e24", title: "LOSHADKA", type: "ДЕПЫ", date: "", location: "Philosophy Lab", description: "Архитектура мышления среды, протоколы взаимодействия и системная философия nazrOS." },
];

export type Cyber = { 
  id: string; 
  handle: string; 
  rank: "НАБЛЮДАТЕЛЬ" | "ОПЕРАТОР" | "АРХИТЕКТОР ЯДРА" | "ГЛАВНЫЙ РАЗРАБОТЧИК"; 
  xp: number; 
  status: "online" | "ghost" | "offline";
  streaming?: boolean;
};

export const cybers: Cyber[] = [
  { id: "c1", handle: "@nazr.os", rank: "АРХИТЕКТОР ЯДРА", xp: 482300, status: "online", streaming: true },
  { id: "c2", handle: "@ghost_in_static", rank: "ГЛАВНЫЙ РАЗРАБОТЧИК", xp: 318940, status: "ghost" },
  { id: "c3", handle: "@vex.pilot", rank: "ОПЕРАТОР", xp: 204400, status: "online", streaming: false },
  { id: "c4", handle: "@aurora.eye", rank: "АРХИТЕКТОР ЯДРА", xp: 152780, status: "offline" },
  { id: "c5", handle: "@solaris.kid", rank: "ОПЕРАТОР", xp: 98220, status: "online" },
  { id: "c6", handle: "@spike.rin", rank: "НАБЛЮДАТЕЛЬ", xp: 64110, status: "ghost" },
  { id: "c7", handle: "@cipher_dev", rank: "ГЛАВНЫЙ РАЗРАБОТЧИК", xp: 391200, status: "online" },
  { id: "c8", handle: "@phantom_eye", rank: "АРХИТЕКТОР ЯДРА", xp: 278540, status: "online", streaming: true },
  { id: "c9", handle: "@neon_surge", rank: "ОПЕРАТОР", xp: 145670, status: "offline" },
  { id: "c10", handle: "@void_walker", rank: "ГЛАВНЫЙ РАЗРАБОТЧИК", xp: 289450, status: "online" },
  { id: "c11", handle: "@signal_echo", rank: "НАБЛЮДАТЕЛЬ", xp: 45320, status: "offline" },
  { id: "c12", handle: "@core_rush", rank: "ОПЕРАТОР", xp: 156890, status: "online", streaming: false },
];
