
// src/lib/stages.ts
// Стадии разработки для каждого устройства и софта

import type { DeviceStage } from "@/components/DeviceStages";

// ══════════════════════════════════════════════════════════════════════════════
//  cloN — Цифровая сущность-аватар
// ══════════════════════════════════════════════════════════════════════════════
export const cloNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация",
    description: "Полная техническая документация устройства: функциональные требования, архитектура системы, перечень компонентов (BOM), базовые схемы взаимодействия модулей и принципы работы cloN.",
    px_cost: 300,
    time_estimate: "1–2 дня изучения",
    outcome: "Полное понимание архитектуры cloN. Чёткое представление что, зачем и как будет собираться.",
    tools: ["Компьютер", "PDF-ридер", "Блокнот для заметок"],
    files: [
      { name: "cloN_TRD_v1.pdf",        type: "PDF",    description: "Технические требования и спецификации" },
      { name: "cloN_Architecture.pdf",   type: "PDF",    description: "Архитектура системы" },
      { name: "cloN_BOM_v1.xlsx",        type: "PDF",    description: "Перечень всех компонентов с ценами" },
      { name: "cloN_Overview.pdf",       type: "MANUAL", description: "Обзорное руководство" },
    ],
  },
  {
    id: 2,
    title: "3D-моделирование корпуса",
    description: "STL-файлы и CAD-модели всех элементов корпуса cloN: основной корпус, крышка, кнопки, декоративные элементы. Все модели оптимизированы для FDM 3D-печати из PLA/PETG.",
    px_cost: 600,
    time_estimate: "2–5 дней печати",
    outcome: "Напечатанный корпус cloN, готовый к монтажу электроники.",
    tools: ["3D-принтер FDM (стол ≥ 150×150 мм)", "PLA или PETG пластик", "Наждачная бумага P120/P240", "Ацетон или праймер для пост-обработки"],
    files: [
      { name: "cloN_Body_Main.stl",      type: "STL", description: "Основной корпус" },
      { name: "cloN_Body_Cover.stl",     type: "STL", description: "Задняя крышка" },
      { name: "cloN_Button_Set.stl",     type: "STL", description: "Набор кнопок" },
      { name: "cloN_Stand.stl",          type: "STL", description: "Подставка" },
      { name: "cloN_3D_Print_Guide.pdf", type: "PDF", description: "Инструкция по печати и постобработке" },
      { name: "cloN_CAD_Source.step",    type: "CAD", description: "Исходные CAD-файлы для модификации" },
    ],
  },
  {
    id: 3,
    title: "Электронная схема и PCB",
    description: "Принципиальная схема, файлы разводки платы в формате Gerber для заказа у производителя, схема подключения всех модулей: дисплей, кнопки, батарея, WiFi/BT, сенсоры.",
    px_cost: 900,
    time_estimate: "1–2 недели (заказ платы)",
    outcome: "Готовая печатная плата cloN, заказанная на производстве (JLCPCB / PCBway).",
    tools: ["Паяльная станция T12/JBC", "Припой ПОС-63", "Флюс безотмывочный", "Пинцет ESD", "Мультиметр", "Лупа или микроскоп"],
    files: [
      { name: "cloN_Schematic_v2.pdf",   type: "PDF",    description: "Принципиальная схема" },
      { name: "cloN_Gerber_v2.zip",      type: "GERBER", description: "Файлы для заказа PCB" },
      { name: "cloN_BOM_PCB.csv",        type: "PDF",    description: "Список компонентов для пайки" },
      { name: "cloN_Solder_Guide.pdf",   type: "MANUAL", description: "Инструкция по пайке SMD/THT" },
    ],
  },
  {
    id: 4,
    title: "Прошивка и программное обеспечение",
    description: "Исходный код прошивки на C/C++ (Arduino-совместимый). Управление дисплеем, кнопками, WiFi-стеком, синхронизация с API nazrOS. Инструкция по прошивке через USB.",
    px_cost: 1200,
    time_estimate: "3–7 дней разработки",
    outcome: "Прошитое устройство с рабочим UI и подключением к сети.",
    tools: ["Arduino IDE или PlatformIO", "USB-кабель Type-C", "Компьютер (Win/Mac/Linux)", "Python 3.x (для скриптов)"],
    files: [
      { name: "cloN_Firmware_v1.zip",    type: "CODE",   description: "Исходный код прошивки" },
      { name: "cloN_Flash_Guide.pdf",    type: "MANUAL", description: "Инструкция по прошивке" },
      { name: "cloN_UI_Assets.zip",      type: "CODE",   description: "Ресурсы интерфейса (иконки, шрифты)" },
      { name: "cloN_API_Docs.pdf",       type: "PDF",    description: "Документация API для разработчиков" },
    ],
  },
  {
    id: 5,
    title: "Интеграция с nazrOS",
    description: "SDK и конфигурационные файлы для подключения cloN к экосистеме nazrOS. Синхронизация профиля, XP, трансляций и событий. Настройка WebSocket-соединения с KiberEden.",
    px_cost: 1500,
    time_estimate: "2–3 дня настройки",
    outcome: "cloN подключён к CyberEden. XP, статус и активность синхронизируются в реальном времени.",
    tools: ["Компьютер", "Стабильный WiFi", "Аккаунт CyberEden"],
    files: [
      { name: "nazrOS_SDK_cloN.zip",     type: "CODE",   description: "SDK для интеграции с nazrOS" },
      { name: "cloN_Config_Template.json", type: "CODE", description: "Шаблон конфигурации" },
      { name: "cloN_Integration_Guide.pdf", type: "MANUAL", description: "Инструкция по подключению к CyberEden" },
    ],
  },
  {
    id: 6,
    title: "Финальная сборка и тестирование",
    description: "Пошаговое руководство финальной сборки устройства: установка платы в корпус, подключение всех компонентов, финальная пайка разъёмов. Чек-лист тестирования всех функций.",
    px_cost: 1800,
    time_estimate: "1–2 дня сборки",
    outcome: "Полностью собранный и протестированный cloN, готовый к использованию.",
    tools: ["Отвёртки Phillips/Torx", "Термоусадка", "Суперклей / термоклей", "Тестер батареи"],
    files: [
      { name: "cloN_Assembly_Guide.pdf", type: "MANUAL", description: "Пошаговая инструкция сборки с фото" },
      { name: "cloN_Test_Checklist.pdf", type: "PDF",    description: "Чек-лист финального тестирования" },
      { name: "cloN_Troubleshoot.pdf",   type: "MANUAL", description: "Устранение типичных проблем" },
    ],
  },
  {
    id: 7,
    title: "Сертификация и сообщество",
    description: "Финальная стадия. Регистрация устройства в реестре nazrOS, получение уникального серийного номера, доступ в закрытый канал сборщиков cloN. Твоё устройство официально становится частью экосистемы.",
    px_cost: 500,
    time_estimate: "1 час",
    outcome: "Серийный номер устройства, значок 'Собрал сам' в профиле CyberEden, доступ в закрытое сообщество.",
    tools: ["Аккаунт CyberEden"],
    files: [
      { name: "cloN_Serial_Register.pdf", type: "PDF",  description: "Инструкция по регистрации серийного номера" },
      { name: "cloN_Community_Guide.pdf", type: "MANUAL", description: "Правила и ресурсы сообщества сборщиков" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  ростН — Домашняя интеллектуальная теплица
// ══════════════════════════════════════════════════════════════════════════════
export const rostNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация",
    description: "Полная техническая документация устройства: функциональные требования, архитектура системы, перечень компонентов (BOM), схемы расположения датчиков и принципы работы автоматизированной теплицы ростН.",
    px_cost: 130,
    time_estimate: "1–2 дня изучения",
    outcome: "Полное понимание архитектуры ростН. Чёткое представление о принципах работы автоматизированного гроубокса.",
    tools: ["Компьютер", "PDF-ридер", "Блокнот для заметок"],
    files: [
      { name: "rostN_TRD_v1.pdf",        type: "PDF",    description: "Технические требования и спецификации" },
      { name: "rostN_Architecture.pdf",  type: "PDF",    description: "Архитектура системы" },
      { name: "rostN_BOM_v1.xlsx",       type: "PDF",    description: "Перечень всех компонентов с ценами" },
      { name: "rostN_Overview.pdf",      type: "MANUAL", description: "Обзорное руководство" },
    ],
  },
  {
    id: 2,
    title: "3D-моделирование корпуса",
    description: "STL-файлы и CAD-модели всех элементов корпуса ростН: основной корпус теплицы, крышка, отсек для электроники, крепления для датчиков и светодиодных панелей. Все модели оптимизированы для FDM 3D-печати из PLA/PETG.",
    px_cost: 500,
    time_estimate: "3–7 дней печати",
    outcome: "Напечатанный корпус ростН, готовый к монтажу электроники и светильников.",
    tools: ["3D-принтер FDM (стол ≥ 200×200 мм)", "PLA или PETG пластик", "Наждачная бумага P120/P240", "Ацетон или праймер для пост-обработки"],
    files: [
      { name: "rostN_Body_Main.stl",     type: "STL", description: "Основной корпус теплицы" },
      { name: "rostN_Body_Cover.stl",    type: "STL", description: "Крышка" },
      { name: "rostN_Electronic_Bay.stl", type: "STL", description: "Отсек для электроники" },
      { name: "rostN_Sensor_Mounts.stl", type: "STL", description: "Крепления для датчиков" },
      { name: "rostN_LED_Mounts.stl",    type: "STL", description: "Крепления для светодиодных панелей" },
      { name: "rostN_3D_Print_Guide.pdf", type: "PDF", description: "Инструкция по печати и постобработке" },
      { name: "rostN_CAD_Source.step",   type: "CAD", description: "Исходные CAD-файлы для модификации" },
    ],
  },
  {
    id: 3,
    title: "Электронная схема и PCB",
    description: "Принципиальная схема, файлы разводки платы в формате Gerber для заказа у производителя, схема подключения всех модулей: датчики (температуры, влажности, освещённости, CO₂), управление светодиодными панелями, вентиляторами, системой полива и Wi-Fi модуль.",
    px_cost: 800,
    time_estimate: "1–2 недели (заказ платы)",
    outcome: "Готовая печатная плата ростН, заказанная на производстве (JLCPCB / PCBway).",
    tools: ["Паяльная станция T12/JBC", "Припой ПОС-63", "Флюс безотмывочный", "Пинцет ESD", "Мультиметр", "Лупа или микроскоп"],
    files: [
      { name: "rostN_Schematic_v2.pdf",  type: "PDF",    description: "Принципиальная схема" },
      { name: "rostN_Gerber_v2.zip",     type: "GERBER", description: "Файлы для заказа PCB" },
      { name: "rostN_BOM_PCB.csv",       type: "PDF",    description: "Список компонентов для пайки" },
      { name: "rostN_Solder_Guide.pdf",  type: "MANUAL", description: "Инструкция по пайке SMD/THT" },
    ],
  },
  {
    id: 4,
    title: "Прошивка и программное обеспечение",
    description: "Исходный код прошивки на C/C++ (Arduino-совместимый). Управление датчиками, светодиодными панелями (расписание освещения), вентиляцией, системой полива. Логика автоматического регулирования микроклимата. Инструкция по прошивке через USB.",
    px_cost: 1000,
    time_estimate: "3–7 дней разработки",
    outcome: "Прошитое устройство с рабочими алгоритмами автоматизации и подключением к сети.",
    tools: ["Arduino IDE или PlatformIO", "USB-кабель Type-C", "Компьютер (Win/Mac/Linux)", "Python 3.x (для скриптов)"],
    files: [
      { name: "rostN_Firmware_v1.zip",   type: "CODE",   description: "Исходный код прошивки" },
      { name: "rostN_Flash_Guide.pdf",   type: "MANUAL", description: "Инструкция по прошивке" },
      { name: "rostN_UI_Assets.zip",     type: "CODE",   description: "Ресурсы интерфейса (иконки, шрифты)" },
      { name: "rostN_API_Docs.pdf",      type: "PDF",    description: "Документация API для разработчиков" },
    ],
  },
  {
    id: 5,
    title: "Интеграция с nazrOS",
    description: "SDK и конфигурационные файлы для подключения ростН к экосистеме nazrOS. Синхронизация данных с датчиков, управление режимами полива и освещения через приложение ростН. Настройка WebSocket-соединения с CyberEden.",
    px_cost: 1300,
    time_estimate: "2–3 дня настройки",
    outcome: "ростН подключён к CyberEden. Данные с датчиков и статус системы синхронизируются в реальном времени через приложение ростН.",
    tools: ["Компьютер", "Стабильный WiFi", "Аккаунт CyberEden"],
    files: [
      { name: "nazrOS_SDK_rostN.zip",    type: "CODE",   description: "SDK для интеграции с nazrOS" },
      { name: "rostN_Config_Template.json", type: "CODE", description: "Шаблон конфигурации" },
      { name: "rostN_Integration_Guide.pdf", type: "MANUAL", description: "Инструкция по подключению к CyberEden" },
    ],
  },
  {
    id: 6,
    title: "Финальная сборка и тестирование",
    description: "Пошаговое руководство финальной сборки устройства: установка платы в корпус, подключение датчиков, светодиодных панелей, вентиляторов и системы полива. Чек-лист тестирования всех функций: автоматический полив, расписание освещения, контроль температуры и влажности.",
    px_cost: 1500,
    time_estimate: "1–2 дня сборки",
    outcome: "Полностью собранный и протестированный ростН, готовый к использованию.",
    tools: ["Отвёртки Phillips/Torx", "Термоусадка", "Суперклей / термоклей", "Тестер батареи"],
    files: [
      { name: "rostN_Assembly_Guide.pdf", type: "MANUAL", description: "Пошаговая инструкция сборки с фото" },
      { name: "rostN_Test_Checklist.pdf", type: "PDF",    description: "Чек-лист финального тестирования" },
      { name: "rostN_Troubleshoot.pdf",   type: "MANUAL", description: "Устранение типичных проблем" },
    ],
  },
  {
    id: 7,
    title: "Сертификация и сообщество",
    description: "Финальная стадия. Регистрация устройства в реестре nazrOS, получение уникального серийного номера, доступ в закрытый канал сборщиков ростН. Твоё устройство официально становится частью экосистемы nazrOS.",
    px_cost: 400,
    time_estimate: "1 час",
    outcome: "Серийный номер устройства, значок 'Собрал сам' в профиле CyberEden, доступ в закрытое сообщество.",
    tools: ["Аккаунт CyberEden"],
    files: [
      { name: "rostN_Serial_Register.pdf", type: "PDF",  description: "Инструкция по регистрации серийного номера" },
      { name: "rostN_Community_Guide.pdf", type: "MANUAL", description: "Правила и ресурсы сообщества сборщиков" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  biohN — Биотехнологический модуль
// ══════════════════════════════════════════════════════════════════════════════
export const biohNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация",
    description: "Технические требования к биотехнологическому модулю, архитектура системы мониторинга, спецификации датчиков (температура, влажность, CO2, pH), перечень компонентов.",
    px_cost: 500,
    time_estimate: "2–3 дня изучения",
    outcome: "Полное понимание принципов работы biohN и требований к компонентам.",
    tools: ["Компьютер", "PDF-ридер"],
    files: [
      { name: "biohN_TRD_v1.pdf",        type: "PDF",    description: "Технические требования" },
      { name: "biohN_Architecture.pdf",   type: "PDF",    description: "Архитектура системы" },
      { name: "biohN_BOM_v1.xlsx",        type: "PDF",    description: "Перечень компонентов" },
    ],
  },
  {
    id: 2,
    title: "Корпус и механическая конструкция",
    description: "3D-модели биокамеры, крышек, держателей датчиков, системы вентиляции. Все элементы из биосовместимого PETG. Включает модели для герметизации и уплотнений.",
    px_cost: 1000,
    time_estimate: "3–7 дней печати",
    outcome: "Напечатанный и подготовленный корпус биокамеры.",
    tools: ["3D-принтер FDM", "PETG пластик", "Уплотнительная лента", "Дрель"],
    files: [
      { name: "biohN_Chamber.stl",       type: "STL", description: "Основная биокамера" },
      { name: "biohN_SensorMount.stl",   type: "STL", description: "Держатели датчиков" },
      { name: "biohN_VentSystem.stl",    type: "STL", description: "Система вентиляции" },
      { name: "biohN_Lid.stl",           type: "STL", description: "Крышка камеры" },
    ],
  },
  {
    id: 3,
    title: "Электроника и сенсоры",
    description: "Схема подключения датчиков (DHT22, MH-Z19, pH-metro, EC-sensor), управляющей платы ESP32, реле управления нагревателем, помпой и вентилятором. Gerber-файлы управляющей платы.",
    px_cost: 1500,
    time_estimate: "1–2 недели",
    outcome: "Собранная электроника biohN с рабочими датчиками.",
    tools: ["Паяльная станция", "Мультиметр", "Осциллограф (опционально)", "Пинцет ESD"],
    files: [
      { name: "biohN_Schematic.pdf",     type: "PDF",    description: "Принципиальная схема" },
      { name: "biohN_Gerber.zip",        type: "GERBER", description: "PCB файлы" },
      { name: "biohN_Sensor_Wiring.pdf", type: "MANUAL", description: "Схема подключения датчиков" },
    ],
  },
  {
    id: 4,
    title: "Программное обеспечение мониторинга",
    description: "Прошивка ESP32 для сбора данных со всех датчиков, PID-регуляция температуры и влажности, WebSocket-стрим данных, интерфейс на OLED-дисплее.",
    px_cost: 2000,
    time_estimate: "1 неделя",
    outcome: "Работающая система мониторинга с автоматическим управлением параметрами среды.",
    tools: ["Arduino IDE", "ESP32 USB-драйвер", "PlatformIO (опционально)"],
    files: [
      { name: "biohN_Firmware.zip",      type: "CODE", description: "Прошивка ESP32" },
      { name: "biohN_FlashGuide.pdf",    type: "MANUAL", description: "Инструкция по прошивке" },
    ],
  },
  {
    id: 5,
    title: "Интеграция с nazrOS и HUD",
    description: "Подключение biohN к CyberEden через MQTT/WebSocket. Отображение данных биомониторинга в HUD-профиле кибера, автоматическое начисление ПХ за активность.",
    px_cost: 2500,
    time_estimate: "3–5 дней",
    outcome: "Данные biohN отображаются в профиле CyberEden в реальном времени.",
    tools: ["Компьютер", "WiFi сеть"],
    files: [
      { name: "biohN_nazrOS_SDK.zip",    type: "CODE",   description: "SDK интеграции" },
      { name: "biohN_MQTT_Config.json",  type: "CODE",   description: "Конфигурация MQTT" },
    ],
  },
  {
    id: 6,
    title: "Биохимические протоколы",
    description: "Научные протоколы для работы с биомодулем: культивирование микроорганизмов, мониторинг роста, анализ данных. Включает базовые безопасные эксперименты.",
    px_cost: 3000,
    time_estimate: "Постоянное использование",
    outcome: "Набор рабочих биохимических протоколов для экспериментов.",
    tools: ["Перчатки", "Защитные очки", "Стерильная посуда", "Дистиллированная вода"],
    files: [
      { name: "biohN_Protocols_v1.pdf",  type: "PDF",    description: "Базовые протоколы экспериментов" },
      { name: "biohN_Safety_Guide.pdf",  type: "MANUAL", description: "Правила безопасности" },
    ],
  },
  {
    id: 7,
    title: "Финальная сборка и калибровка",
    description: "Полная сборка biohN: монтаж электроники в корпус, герметизация, подключение всех систем, калибровка датчиков по реперным точкам, финальное тестирование.",
    px_cost: 3500,
    time_estimate: "2–3 дня",
    outcome: "Полностью собранный и откалиброванный биотехнологический модуль nazrOS.",
    tools: ["Все предыдущие инструменты", "Калибровочные растворы pH 4.0/7.0", "Термометр-эталон"],
    files: [
      { name: "biohN_Assembly_Final.pdf", type: "MANUAL", description: "Финальная инструкция сборки" },
      { name: "biohN_Calibration.pdf",    type: "MANUAL", description: "Протокол калибровки датчиков" },
      { name: "biohN_QA_Checklist.pdf",   type: "PDF",    description: "Чек-лист приёмки" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  blaN — Инженерная станция
// ══════════════════════════════════════════════════════════════════════════════
export const blaNStages: DeviceStage[] = [
  {
    id: 1, title: "Проектная документация",
    description: "Спецификации инженерной станции: вычислительная платформа, модульная архитектура, интерфейсы подключения, требования к питанию и охлаждению.",
    px_cost: 400, time_estimate: "1–2 дня",
    outcome: "Полный перечень компонентов и понимание архитектуры blaN.",
    tools: ["Компьютер"],
    files: [
      { name: "blaN_TRD_v1.pdf",         type: "PDF",    description: "Технические требования" },
      { name: "blaN_BOM.xlsx",           type: "PDF",    description: "Список компонентов" },
    ],
  },
  {
    id: 2, title: "Корпус инженерной станции",
    description: "3D-модели модульного корпуса blaN: основная рама, панели, крепления для плат, система вентиляции, отсек батареи, лицевая панель с индикаторами.",
    px_cost: 800, time_estimate: "5–10 дней печати",
    outcome: "Собранный корпус blaN из PETG.",
    tools: ["3D-принтер (стол ≥ 220×220 мм)", "PETG", "Метизы M3"],
    files: [
      { name: "blaN_Frame.stl",          type: "STL", description: "Основная рама" },
      { name: "blaN_Panels.stl",         type: "STL", description: "Боковые панели" },
      { name: "blaN_FrontPanel.stl",     type: "STL", description: "Лицевая панель" },
      { name: "blaN_BatteryHolder.stl",  type: "STL", description: "Отсек батареи" },
    ],
  },
  {
    id: 3, title: "Вычислительная платформа",
    description: "Схема подключения основного вычислительного модуля (Raspberry Pi CM4 или аналог), памяти, NVMe-накопителя, интерфейсов GPIO, USB-хаба, дисплейного выхода.",
    px_cost: 1200, time_estimate: "1–2 недели",
    outcome: "Рабочая вычислительная платформа с Linux/nazrOS.",
    tools: ["Паяльная станция", "Мультиметр", "USB Type-C адаптер"],
    files: [
      { name: "blaN_Compute_Schematic.pdf", type: "PDF",    description: "Схема вычислительного модуля" },
      { name: "blaN_CM4_Gerber.zip",        type: "GERBER", description: "PCB для CM4 baseboard" },
    ],
  },
  {
    id: 4, title: "Система питания и интерфейсы",
    description: "Схема питания от АКБ 18650 (3-4S), BMS, DC-DC конвертеры, USB PD-контроллер для быстрой зарядки, разъёмы всех внешних интерфейсов.",
    px_cost: 1600, time_estimate: "1 неделя",
    outcome: "Автономная система питания с 6–12 часами работы.",
    tools: ["Паяльная станция", "Держатель 18650 ячеек", "Мультиметр"],
    files: [
      { name: "blaN_PowerSystem.pdf",    type: "PDF",    description: "Схема системы питания" },
      { name: "blaN_BMS_Config.pdf",     type: "MANUAL", description: "Конфигурация BMS" },
    ],
  },
  {
    id: 5, title: "Программное обеспечение nazrOS",
    description: "Образ операционной системы nazrOS для blaN, скрипты установки инженерного ПО: VSCode Server, Docker, Git, инструменты разработки, синхронизация с CyberEden.",
    px_cost: 2000, time_estimate: "3–5 дней настройки",
    outcome: "Полноценная рабочая инженерная станция с разработческим окружением.",
    tools: ["microSD ≥ 32GB", "SD-ридер", "Стабильный WiFi"],
    files: [
      { name: "nazrOS_blaN_Image.img.gz", type: "CODE",   description: "Образ nazrOS" },
      { name: "blaN_Setup_Script.sh",     type: "CODE",   description: "Скрипт первоначальной настройки" },
      { name: "blaN_DevEnv_Guide.pdf",    type: "MANUAL", description: "Настройка dev-окружения" },
    ],
  },
  {
    id: 6, title: "Модульные расширения",
    description: "Документация на модульные расширения blaN: GPIO-hat для электроники, SDR-модуль для радиосвязи, камерный модуль, сенсорный экран. Схемы и файлы.",
    px_cost: 2400, time_estimate: "По необходимости",
    outcome: "Набор расширений для кастомизации blaN под конкретные задачи.",
    tools: ["Паяльник", "Разъёмы JST/GPIO"],
    files: [
      { name: "blaN_GPIO_Hat.pdf",       type: "PDF",    description: "GPIO-модуль расширения" },
      { name: "blaN_SDR_Module.pdf",     type: "PDF",    description: "SDR-радиомодуль" },
      { name: "blaN_Screen_Module.pdf",  type: "PDF",    description: "Сенсорный дисплей" },
    ],
  },
  {
    id: 7, title: "Финальная сборка",
    description: "Пошаговая инструкция финальной сборки blaN: установка всех компонентов, кабель-менеджмент, финальное тестирование, регистрация в nazrOS.",
    px_cost: 2800, time_estimate: "1–2 дня",
    outcome: "Готовая инженерная станция blaN, зарегистрированная в назрОС.",
    tools: ["Все предыдущие инструменты", "Термоклей"],
    files: [
      { name: "blaN_FinalAssembly.pdf",  type: "MANUAL", description: "Финальная инструкция" },
      { name: "blaN_QA_Test.pdf",        type: "PDF",    description: "Приёмочные испытания" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  piN — Производственный модуль
// ══════════════════════════════════════════════════════════════════════════════
export const piNStages: DeviceStage[] = [
  {
    id: 1, title: "Проектная документация",
    description: "Технические требования к производственному модулю: кинематика, приводы, точность позиционирования, рабочее пространство, управляющая электроника.",
    px_cost: 350, time_estimate: "1–2 дня",
    outcome: "Понимание полной системы piN перед началом сборки.",
    tools: ["Компьютер"],
    files: [
      { name: "piN_TRD_v1.pdf",          type: "PDF",    description: "Технические требования" },
      { name: "piN_BOM.xlsx",            type: "PDF",    description: "Перечень компонентов" },
    ],
  },
  {
    id: 2, title: "Механическая конструкция",
    description: "3D-модели механической части piN: несущая рама, линейные направляющие, каретки, крепления двигателей, система натяжения ремней, рабочий стол.",
    px_cost: 700, time_estimate: "7–14 дней печати + сборка",
    outcome: "Собранная механическая часть piN, готовая к установке электроники.",
    tools: ["3D-принтер (≥ 300×300 мм стол)", "PETG/ASA пластик", "Направляющие V-Slot 2020/3030", "Линейные подшипники"],
    files: [
      { name: "piN_Frame.stl",           type: "STL", description: "Несущая рама" },
      { name: "piN_Carriage_X.stl",      type: "STL", description: "Каретка X-оси" },
      { name: "piN_Carriage_Y.stl",      type: "STL", description: "Каретка Y-оси" },
      { name: "piN_Hotend_Mount.stl",    type: "STL", description: "Крепление экструдера" },
      { name: "piN_Bed_Frame.stl",       type: "STL", description: "Рама рабочего стола" },
    ],
  },
  {
    id: 3, title: "Управляющая электроника",
    description: "Схема управляющей электроники: плата на основе STM32/RP2040, драйверы шаговых двигателей TMC2209, датчики концевых выключателей, нагрев стола и хотэнда.",
    px_cost: 1050, time_estimate: "1–2 недели",
    outcome: "Рабочая управляющая плата piN с тихими драйверами TMC.",
    tools: ["Паяльная станция", "Мультиметр", "Осциллограф"],
    files: [
      { name: "piN_Controller_Schematic.pdf", type: "PDF",    description: "Схема контроллера" },
      { name: "piN_Controller_Gerber.zip",    type: "GERBER", description: "PCB контроллера" },
      { name: "piN_Wiring_Diagram.pdf",       type: "MANUAL", description: "Схема подключения" },
    ],
  },
  {
    id: 4, title: "Прошивка (Klipper / Marlin fork)",
    description: "Форк прошивки Klipper адаптированный для piN, конфигурационные файлы, калибровочные процедуры (bed leveling, PID, Input Shaper), профили материалов.",
    px_cost: 1400, time_estimate: "3–5 дней настройки",
    outcome: "Откалиброванный piN с прошивкой, готовый к первой печати.",
    tools: ["Raspberry Pi или BTT CB1", "MicroSD 8GB", "SSH-клиент"],
    files: [
      { name: "piN_Klipper_Config.zip",  type: "CODE",   description: "Конфигурация Klipper" },
      { name: "piN_Calibration_Guide.pdf", type: "MANUAL", description: "Полная инструкция калибровки" },
      { name: "piN_Material_Profiles.zip", type: "CODE",  description: "Профили PLA/PETG/ABS/ASA" },
    ],
  },
  {
    id: 5, title: "Интеграция с nazrOS",
    description: "Подключение piN к экосистеме nazrOS: мониторинг печати из CyberEden, телеметрия, уведомления, начисление ПХ за произведённые детали других устройств nazrOS.",
    px_cost: 1750, time_estimate: "2–3 дня",
    outcome: "piN виден в CyberEden, данные о производстве синхронизируются.",
    tools: ["WiFi", "Аккаунт CyberEden"],
    files: [
      { name: "piN_nazrOS_Plugin.zip",   type: "CODE",   description: "Плагин интеграции с nazrOS" },
      { name: "piN_Moonraker_Config.yaml", type: "CODE", description: "Конфигурация Moonraker API" },
    ],
  },
  {
    id: 6, title: "Расширение: фрезерный модуль",
    description: "Опциональный модуль преобразования piN в ЧПУ-фрезер: шпиндель 300W, крепление, защита, конфигурация для CNC-обработки алюминия и дерева.",
    px_cost: 2100, time_estimate: "1–2 недели доработки",
    outcome: "piN превращается в гибридный 3D-принтер + ЧПУ-фрезер.",
    tools: ["Шпиндель 300W/500W", "Фрезы по металлу", "Пылесос для стружки"],
    files: [
      { name: "piN_CNC_Mount.stl",       type: "STL",    description: "Крепление шпинделя" },
      { name: "piN_CNC_Config.zip",      type: "CODE",   description: "Конфигурация для ЧПУ" },
      { name: "piN_CNC_Guide.pdf",       type: "MANUAL", description: "Инструкция по фрезеровке" },
    ],
  },
  {
    id: 7, title: "Финальная сборка и сертификация",
    description: "Финальная сборка, тест-прогон с тестовыми моделями, регистрация серийного номера производственного модуля в nazrOS, доступ в сообщество производителей.",
    px_cost: 2450, time_estimate: "1 день",
    outcome: "Сертифицированный производственный модуль piN в экосистеме nazrOS.",
    tools: ["Тестовые файлы для печати"],
    files: [
      { name: "piN_TestPrint_Cube.stl",  type: "STL",    description: "Тестовые модели" },
      { name: "piN_Certificate.pdf",     type: "PDF",    description: "Сертификат производителя" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  visionN — Оптический интерфейс
// ══════════════════════════════════════════════════════════════════════════════
export const visionNStages: DeviceStage[] = [
  {
    id: 1, title: "Проектная документация",
    description: "Оптические требования ВЗГЛЯДН: разрешение камеры, угол обзора, тип проектора, требования к питанию, эргономика крепления.",
    px_cost: 450, time_estimate: "1–2 дня",
    outcome: "Полное понимание оптической системы ВЗГЛЯДН.",
    tools: ["Компьютер"],
    files: [
      { name: "visionN_TRD_v1.pdf",      type: "PDF", description: "Технические требования" },
      { name: "visionN_BOM.xlsx",        type: "PDF", description: "Компоненты и поставщики" },
    ],
  },
  {
    id: 2, title: "Оптическая система",
    description: "Расчёт и схема оптической системы: подбор линз для проектора, угол зрения камеры, компенсация дисторсии, схема лазерных указателей, параметры LED-матрицы.",
    px_cost: 900, time_estimate: "1 неделя",
    outcome: "Откалиброванная оптическая система с правильной фокусировкой.",
    tools: ["Оптические тесты (распечатанные шаблоны)", "Рулетка", "Штангенциркуль"],
    files: [
      { name: "visionN_Optics_Calc.pdf", type: "PDF",    description: "Оптические расчёты" },
      { name: "visionN_Lens_Selection.pdf", type: "MANUAL", description: "Руководство по линзам" },
    ],
  },
  {
    id: 3, title: "Корпус и крепление",
    description: "3D-модели оправы ВЗГЛЯДН: основной корпус, крепление на голову/очки, отсек для платы и батареи, защитные стёкла, вентиляционные отверстия.",
    px_cost: 1350, time_estimate: "3–7 дней",
    outcome: "Готовый корпус ВЗГЛЯДН весом менее 80 г.",
    tools: ["3D-принтер", "Эластичный TPU пластик (крепления)", "PETG (корпус)"],
    files: [
      { name: "visionN_Housing.stl",     type: "STL", description: "Основной корпус" },
      { name: "visionN_HeadMount.stl",   type: "STL", description: "Крепление на голову" },
      { name: "visionN_LensHolder.stl",  type: "STL", description: "Держатели линз" },
    ],
  },
  {
    id: 4, title: "Электронная начинка",
    description: "Схема миниатюрной платы на ESP32-S3 с камерой OV5640, DLP-проектором на DMD-матрице, IMU MPU6050, аккумулятором LiPo 500mAh, зарядкой TP4056.",
    px_cost: 1800, time_estimate: "1–2 недели",
    outcome: "Рабочая плата ВЗГЛЯДН с камерой и проектором.",
    tools: ["Паяльная станция (температура ≥ 350°C для мелкого SMD)", "Бинокуляр/микроскоп", "Горячий воздух"],
    files: [
      { name: "visionN_PCB_Schematic.pdf", type: "PDF",    description: "Принципиальная схема" },
      { name: "visionN_PCB_Gerber.zip",    type: "GERBER", description: "PCB файлы" },
      { name: "visionN_SMD_Guide.pdf",     type: "MANUAL", description: "Руководство по пайке SMD" },
    ],
  },
  {
    id: 5, title: "Прошивка и AR-движок",
    description: "Прошивка ESP32-S3 с AR-оверлеями, потоковым видео, трекингом маркеров, интеграцией с HUD nazrOS. Конфигурация WiFi-стрима и BLE-управления.",
    px_cost: 2250, time_estimate: "1–2 недели",
    outcome: "ВЗГЛЯДН с базовым AR-интерфейсом и HUD-наложениями.",
    tools: ["Arduino IDE", "ESP-IDF (опционально)"],
    files: [
      { name: "visionN_Firmware.zip",    type: "CODE",   description: "Прошивка ESP32-S3" },
      { name: "visionN_AR_Engine.zip",   type: "CODE",   description: "AR-движок (маркеры, HUD)" },
    ],
  },
  {
    id: 6, title: "Интеграция nazrOS и стриминг",
    description: "Подключение ВЗГЛЯДН к CyberEden: прямой стриминг POV-видео в трансляции, отображение данных профиля в AR-оверлее, управление через телефон.",
    px_cost: 2700, time_estimate: "3–5 дней",
    outcome: "ВЗГЛЯДН стримит видео прямо в CyberEden с AR-оверлеями.",
    tools: ["Смартфон (для управления)", "WiFi"],
    files: [
      { name: "visionN_Stream_Module.zip", type: "CODE",   description: "Модуль стриминга" },
      { name: "visionN_CyberEden_SDK.zip", type: "CODE",   description: "SDK для CyberEden" },
    ],
  },
  {
    id: 7, title: "Финальная сборка и калибровка",
    description: "Финальная сборка ВЗГЛЯДН в корпус, юстировка оптики, калибровка AR-трекинга, настройка комфортного ношения, регистрация в назрОС.",
    px_cost: 3150, time_estimate: "1 день",
    outcome: "Готовый носимый AR-интерфейс ВЗГЛЯДН, зарегистрированный в nazrOS.",
    tools: ["Тонкие отвёртки", "Калибровочные AR-маркеры (распечатать)"],
    files: [
      { name: "visionN_FinalAssembly.pdf", type: "MANUAL", description: "Финальная инструкция" },
      { name: "visionN_Calibration_Markers.pdf", type: "PDF", description: "Калибровочные маркеры" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  страНно — AI-ассистент (СОФТ)
// ══════════════════════════════════════════════════════════════════════════════
export const strannoStages: DeviceStage[] = [
  {
    id: 1, title: "Техническое задание",
    description: "Полное ТЗ на страНно: описание целевой аудитории, список функций, требования к моделям (LLaMA 3 / Mistral / GPT-4), интеграции, API-спецификация.",
    px_cost: 200, time_estimate: "1 день изучения",
    outcome: "Чёткое понимание что строим и почему именно так.",
    tools: ["Компьютер"],
    files: [
      { name: "stranno_TRD_v1.pdf",      type: "PDF", description: "Техническое задание" },
      { name: "stranno_Research.pdf",    type: "PDF", description: "Исследование аналогов" },
    ],
  },
  {
    id: 2, title: "Архитектура и стек",
    description: "Архитектура страНно: выбор базовой LLM, fine-tuning стратегия, RAG-система для контекстных знаний, API-слой, система памяти разговоров, деплой-схема.",
    px_cost: 400, time_estimate: "2–3 дня",
    outcome: "Готовая архитектурная схема с обоснованием каждого технического решения.",
    tools: ["Компьютер", "draw.io или Excalidraw"],
    files: [
      { name: "stranno_Architecture.pdf", type: "PDF",  description: "Архитектурная схема" },
      { name: "stranno_TechStack.pdf",    type: "PDF",  description: "Обоснование стека технологий" },
    ],
  },
  {
    id: 3, title: "Базовые алгоритмы обработки",
    description: "Исходный код модулей препроцессинга текста, токенизации, prompt-engineering шаблоны, система оценки качества ответов, базовые цепочки LangChain.",
    px_cost: 600, time_estimate: "1–2 недели",
    outcome: "Работающий прототип с базовой обработкой запросов.",
    tools: ["Python 3.11+", "pip: langchain, openai, transformers", "8GB+ RAM"],
    files: [
      { name: "stranno_Core_v1.zip",     type: "CODE",   description: "Ядро обработки запросов" },
      { name: "stranno_Prompts_v1.json", type: "CODE",   description: "Библиотека промптов" },
      { name: "stranno_Setup.pdf",       type: "MANUAL", description: "Инструкция по запуску" },
    ],
  },
  {
    id: 4, title: "Обучение и дообучение модели",
    description: "Dataset для fine-tuning страНно на задачи нестандартного мышления, скрипты обучения LoRA/QLoRA, оценка качества через benchmarks, экспорт весов модели.",
    px_cost: 800, time_estimate: "1–4 недели (зависит от GPU)",
    outcome: "Дообученная модель страНно с улучшенными показателями нестандартного мышления.",
    tools: ["GPU 12GB+ VRAM (RTX 3060/4060 и выше)", "CUDA 12+", "Python, PyTorch"],
    files: [
      { name: "stranno_Dataset_v1.json", type: "CODE",   description: "Датасет для обучения (5k примеров)" },
      { name: "stranno_TrainScript.py",  type: "CODE",   description: "Скрипт обучения LoRA" },
      { name: "stranno_Eval_Script.py",  type: "CODE",   description: "Скрипт оценки качества" },
    ],
  },
  {
    id: 5, title: "API и интеграции",
    description: "FastAPI-сервер для страНно, Telegram-бот интерфейс, WebSocket для real-time ответов, интеграция с CyberEden, система ключей доступа, rate limiting.",
    px_cost: 1000, time_estimate: "1 неделя",
    outcome: "Полноценный API страНно с документацией и интеграцией в nazrOS.",
    tools: ["Python", "Docker", "Сервер или VPS"],
    files: [
      { name: "stranno_API_Server.zip",  type: "CODE",   description: "FastAPI сервер" },
      { name: "stranno_Docker_Compose.yml", type: "CODE", description: "Docker конфигурация" },
      { name: "stranno_API_Docs.pdf",    type: "PDF",    description: "Документация API" },
    ],
  },
  {
    id: 6, title: "Деплой и мониторинг",
    description: "Инфраструктура деплоя страНно: Kubernetes манифесты, CI/CD pipeline, система мониторинга (Prometheus/Grafana), A/B тестирование версий, backup стратегия.",
    px_cost: 1200, time_estimate: "3–5 дней",
    outcome: "страНно задеплоен в production с мониторингом и автоматическими деплоями.",
    tools: ["Kubernetes или Docker Swarm", "GitHub Actions", "VPS 4CPU/16GB RAM"],
    files: [
      { name: "stranno_K8s_Manifests.zip", type: "CODE",   description: "Kubernetes манифесты" },
      { name: "stranno_CI_CD.yml",         type: "CODE",   description: "GitHub Actions pipeline" },
      { name: "stranno_Monitoring.zip",    type: "CODE",   description: "Конфиги мониторинга" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  кефирНно — Утилита данных (СОФТ)
// ══════════════════════════════════════════════════════════════════════════════
export const kefirnoStages: DeviceStage[] = [
  {
    id: 1, title: "Техническое задание",
    description: "ТЗ на кефирНно: поддерживаемые форматы (CSV, JSON, XML, Excel, Parquet), типы трансформаций, производительность, API-интерфейс, CLI-интерфейс.",
    px_cost: 150, time_estimate: "0.5 дня",
    outcome: "Чёткое ТЗ с примерами входных/выходных данных.",
    tools: ["Компьютер"],
    files: [{ name: "kefirno_TRD_v1.pdf", type: "PDF", description: "Техническое задание" }],
  },
  {
    id: 2, title: "Архитектура парсера",
    description: "Архитектура многоформатного парсера: plugin-система для форматов, AST-представление данных, схема пайплайнов трансформации, модель типов данных.",
    px_cost: 300, time_estimate: "1–2 дня",
    outcome: "Готовая архитектура с поддержкой расширяемости.",
    tools: ["Компьютер", "Python 3.11+"],
    files: [
      { name: "kefirno_Architecture.pdf", type: "PDF",  description: "Архитектурная схема" },
      { name: "kefirno_DataModel.py",     type: "CODE", description: "Базовые модели данных" },
    ],
  },
  {
    id: 3, title: "Алгоритмы очистки и нормализации",
    description: "Реализация алгоритмов: дедупликация, определение и заполнение пропусков, нормализация типов, валидация схемы, обработка выбросов, стандартизация форматов дат/чисел.",
    px_cost: 450, time_estimate: "1 неделя",
    outcome: "Рабочий модуль очистки данных с покрытием 95%+ тест-кейсов.",
    tools: ["Python", "pandas, polars, pydantic", "pytest"],
    files: [
      { name: "kefirno_Cleaner_v1.zip",  type: "CODE",   description: "Модуль очистки данных" },
      { name: "kefirno_Tests.zip",       type: "CODE",   description: "Тест-кейсы" },
    ],
  },
  {
    id: 4, title: "CLI и Python API",
    description: "Командная строка кефирНно (typer-based CLI) и Python API с типизацией. Документация, примеры использования, интеграционные тесты.",
    px_cost: 600, time_estimate: "3–5 дней",
    outcome: "Публично используемый CLI/API кефирНно с документацией.",
    tools: ["Python", "typer, rich, httpx"],
    files: [
      { name: "kefirno_CLI.zip",         type: "CODE",   description: "CLI интерфейс" },
      { name: "kefirno_API_Docs.pdf",    type: "PDF",    description: "Документация API" },
      { name: "kefirno_Examples.zip",    type: "CODE",   description: "Примеры использования" },
    ],
  },
  {
    id: 5, title: "Деплой и интеграция с nazrOS",
    description: "Публикация кефирНно на PyPI, Docker-образ, интеграция в пайплайны nazrOS, webhook для автоматической обработки данных из CyberEden.",
    px_cost: 750, time_estimate: "2–3 дня",
    outcome: "кефирНно опубликован на PyPI и интегрирован в nazrOS.",
    tools: ["PyPI аккаунт", "Docker", "GitHub"],
    files: [
      { name: "kefirno_PyPI_Setup.zip",  type: "CODE",   description: "Конфиг публикации PyPI" },
      { name: "kefirno_Dockerfile",      type: "CODE",   description: "Docker образ" },
      { name: "kefirno_nazrOS_Hook.py",  type: "CODE",   description: "Webhook для nazrOS" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  Экспорт маппинга item_id → stages
// ══════════════════════════════════════════════════════════════════════════════
export const ITEM_STAGES: Record<string, DeviceStage[]> = {
  clon:    cloNStages,
  rostn:   rostNStages,
  biohn:   biohNStages,
  blan:    blaNStages,
  pin:     piNStages,
  visionN: visionNStages,
  stranno: strannoStages,
  kefirno: kefirnoStages,
  // cybervaucher_nazrOS — стадий нет (физический продукт с NX-кодом)
};
