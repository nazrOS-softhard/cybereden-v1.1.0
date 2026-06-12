// src/lib/stages.ts
// Фактические стадии сборки устройств nazrOS
// Файлы стадий хранятся в Supabase Storage private bucket
// Доступ — только через backend signed URL после проверки разблокировки

import type { DeviceStage } from "@/components/DeviceStages";

// ══════════════════════════════════════════════════════════════════════════════
//  cloN — Цифровой тамагочи + Домашний датацентр + Персональный ключ
//  Физическое устройство: NFC/BLE/WiFi/IR/Sub-GHz + накопители + репрошивка
// ══════════════════════════════════════════════════════════════════════════════
export const cloNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация",
    description: "Архитектура cloN: три уровня — Digital Key (NFC/BLE/IR), DataCore (накопители/архив) и Control Layer (репрошивка других устройств nazrOS). Перечень модулей, схема взаимодействия с экосистемой, BOM со ссылками на поставщиков.",
    px_cost: 300,
    time_estimate: "1–2 дня изучения",
    outcome: "Понимаешь из чего состоит cloN и в какой последовательности собирать.",
    tools: ["Компьютер", "PDF-ридер"],
    files: [
      { name: "cloN_Architecture_v1.pdf",  type: "PDF",    description: "Архитектура трёх слоёв cloN" },
      { name: "cloN_BOM_v1.xlsx",          type: "PDF",    description: "Перечень компонентов с ценами и ссылками" },
      { name: "cloN_EcoSystem_Map.pdf",    type: "PDF",    description: "Схема взаимодействия с nazrOS экосистемой" },
    ],
  },
  {
    id: 2,
    title: "Корпус: форм-фактор и 3D-модели",
    description: "cloN — карманный форм-фактор 60×40×12 мм. Корпус: ударопрочный пластик + металлические вставки. STL-файлы основного корпуса, задней крышки, отсека для SIM/SD, крепления NFC-антенны. Параметры печати: PETG 0.15 мм слой, заполнение 40%.",
    px_cost: 600,
    time_estimate: "2–4 дня печати",
    outcome: "Напечатанный корпус cloN весом 26 г, готовый к монтажу.",
    tools: ["3D-принтер FDM (стол ≥ 100×100 мм)", "PETG пластик", "Наждачка P240", "UHU por клей для вставок"],
    files: [
      { name: "cloN_Body_Main.stl",        type: "STL", description: "Основной корпус" },
      { name: "cloN_Body_Back.stl",        type: "STL", description: "Задняя крышка" },
      { name: "cloN_NFC_Frame.stl",        type: "STL", description: "Рамка NFC-антенны" },
      { name: "cloN_Metal_Inserts.pdf",    type: "PDF", description: "Спецификация металлических вставок" },
      { name: "cloN_Print_Settings.pdf",   type: "MANUAL", description: "Параметры 3D-печати" },
    ],
  },
  {
    id: 3,
    title: "Электроника: плата, беспроводные протоколы",
    description: "Сердце cloN — ESP32-S3 (WiFi+BLE) + PN532 (NFC/RFID) + IR-трансивер + CC1101 (Sub-GHz 100MHz+). Дисплей: монохромный OLED 128×64. Батарея LiPo 600mAh с TP4056. PCB размер 55×35 мм, 4 слоя. Gerber-файлы для заказа на JLCPCB.",
    px_cost: 900,
    time_estimate: "1–2 недели (включая доставку PCB)",
    outcome: "Собранная плата cloN со всеми беспроводными модулями.",
    tools: ["Паяльная станция T12", "Горячий воздух", "Микроскоп/лупа", "Мультиметр", "Пинцет ESD", "Флюс безотмывочный"],
    files: [
      { name: "cloN_PCB_Schematic.pdf",    type: "PDF",    description: "Принципиальная схема" },
      { name: "cloN_PCB_Gerber_v2.zip",    type: "GERBER", description: "Gerber для заказа на JLCPCB" },
      { name: "cloN_PCB_BOM_SMD.csv",      type: "PDF",    description: "SMD компоненты для пайки" },
      { name: "cloN_Solder_Guide.pdf",     type: "MANUAL", description: "Инструкция пайки с фото каждого шага" },
    ],
  },
  {
    id: 4,
    title: "DataCore: накопители и архивная логика",
    description: "Отсек накопителей cloN: microSD слот (до 2TB), eMMC 64GB встроенный, резервный LTO-micro для долгосрочного архива. Логика доступа: LUKS-шифрование, автоматический бекап других устройств nazrOS по BLE proximity. Схема файловой системы.",
    px_cost: 1200,
    time_estimate: "3–5 дней настройки",
    outcome: "Рабочий датацентр в кармане: зашифрованные накопители + автобэкап.",
    tools: ["microSD ≥ 64GB", "USB Type-C кабель", "Linux/macOS для настройки LUKS"],
    files: [
      { name: "cloN_DataCore_Schema.pdf",  type: "PDF",  description: "Архитектура хранения данных" },
      { name: "cloN_LUKS_Setup.sh",        type: "CODE", description: "Скрипт настройки шифрования" },
      { name: "cloN_AutoBackup_Agent.zip", type: "CODE", description: "Агент автоматического бэкапа" },
    ],
  },
  {
    id: 5,
    title: "Прошивка: Digital Key Wallet + Security Modes",
    description: "Прошивка ESP32-S3 с пятью режимами: Security Audit (sandbox-анализ), Offline Secure (air-gap), Engineering GPIO, AI Control Layer, Digital Key Wallet. NFC-эмуляция карт, BLE-ключи, IR-управление техникой, Sub-GHz профили. Интерфейс на OLED.",
    px_cost: 1500,
    time_estimate: "1–2 недели",
    outcome: "cloN умеет читать/эмулировать карты, управлять техникой, работать как digital key wallet.",
    tools: ["Arduino IDE или PlatformIO", "USB Type-C", "Python 3.x"],
    files: [
      { name: "cloN_Firmware_v1.zip",      type: "CODE",   description: "Исходный код прошивки" },
      { name: "cloN_Flash_Guide.pdf",      type: "MANUAL", description: "Инструкция прошивки" },
      { name: "cloN_UI_Assets.zip",        type: "CODE",   description: "Ресурсы OLED-интерфейса" },
    ],
  },
  {
    id: 6,
    title: "cloN MESH: репрошивка устройств nazrOS",
    description: "cloN как мастер-репрошиватель экосистемы: по BLE/USB-C передаёт обновления прошивок для piN, rostN, biohN, blaN. P2P синхронизация ключей через cloN Network MESH. Протокол СLONNM v1. Trust Score система.",
    px_cost: 1800,
    time_estimate: "2–3 дня",
    outcome: "cloN управляет обновлениями всей экосистемы nazrOS без интернета.",
    tools: ["Все устройства nazrOS в наличии или эмулятор"],
    files: [
      { name: "cloNMESH_Protocol_v1.pdf",  type: "PDF",  description: "Протокол синхронизации CLONNM" },
      { name: "cloNMESH_Firmware.zip",     type: "CODE", description: "Прошивка MESH-узла" },
      { name: "TrustScore_Algorithm.pdf",  type: "PDF",  description: "Алгоритм Trust Score" },
    ],
  },
  {
    id: 7,
    title: "Финальная сборка и регистрация",
    description: "Монтаж платы в корпус, установка дисплея, кнопок, USB-C разъёма, зарядного модуля. Финальная прошивка. Упаковка в премиум-кейс. Регистрация серийного номера в nazrOS. Синхронизация с CyberEden профилем.",
    px_cost: 500,
    time_estimate: "1 день",
    outcome: "Готовый cloN с серийным номером в формате NV-XX-XXXX-XXXX, зарегистрированный в nazrOS.",
    tools: ["Отвёртки Torx T5", "Термоклей", "Стяжки 2мм"],
    files: [
      { name: "cloN_Final_Assembly.pdf",   type: "MANUAL", description: "Финальная инструкция сборки" },
      { name: "cloN_QA_Checklist.pdf",     type: "PDF",    description: "Приёмочный чек-лист" },
      { name: "cloN_Registration.pdf",     type: "PDF",    description: "Регистрация в nazrOS" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  blaN — Инженерный ноутбук-конструктор
//  16" QHD 165Hz, шипотН CPU, naparoН GPU, 32GB DDR5, выдвижной инструм. блок
// ══════════════════════════════════════════════════════════════════════════════
export const blaNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация",
    description: "blaN — не просто ноутбук. Это модульный инженерный конструктор: верхняя часть ноутбук, нижний блок — выдвижной инструментальный чемодан с кассетами. Документация включает: схему модульности, размещение отсеков, спецификации дисплея (16\" QHD 165Hz), CPU шипотН, GPU naparoН, 32GB DDR5, 1TB NVMe.",
    px_cost: 400,
    time_estimate: "2 дня изучения",
    outcome: "Полное понимание архитектуры blaN как единого инженерного организма.",
    tools: ["Компьютер"],
    files: [
      { name: "blaN_Architecture_v1.pdf",  type: "PDF", description: "Полная архитектура blaN" },
      { name: "blaN_BOM_v1.xlsx",          type: "PDF", description: "Перечень компонентов" },
      { name: "blaN_ModuleMap.pdf",        type: "PDF", description: "Карта модулей и отсеков" },
    ],
  },
  {
    id: 2,
    title: "Кейс-корпус: верхняя часть (ноутбук)",
    description: "Корпус blaN из магниевого сплава + карбоновые вставки. CAD-модели: крышка дисплея, основание с клавиатурой, петли, отсеки для портов. Вес: 2.4 кг. Размеры: 370×265×22 мм. Особенность: усиленные углы, IP53, встроенные кабельные каналы.",
    px_cost: 800,
    time_estimate: "Изготовление на заказ или 3D-печать прототипа",
    outcome: "Корпус blaN, готовый к монтажу компонентов.",
    tools: ["CNC-фрезер (заказ у производителя) или 3D-принтер для прототипа", "Дрель", "Метизы M2/M3"],
    files: [
      { name: "blaN_TopCase_CAD.step",     type: "CAD", description: "CAD-модель крышки дисплея" },
      { name: "blaN_BaseCase_CAD.step",    type: "CAD", description: "CAD-модель основания" },
      { name: "blaN_Prototype_STL.zip",    type: "STL", description: "STL для 3D-прототипа" },
      { name: "blaN_Case_Specs.pdf",       type: "PDF", description: "Спецификации корпуса" },
    ],
  },
  {
    id: 3,
    title: "Выдвижной инструментальный блок",
    description: "Нижний блок blaN — выдвижной ящик с системой быстросменных кассет. Кассеты: мультитул, набор отвёрток, кримпер, съёмник изоляции, мультиметр со щупами, переходники, патч-кабели. Механизм выдвижения: шариковые направляющие 200мм, фиксация в открытом положении.",
    px_cost: 1200,
    time_estimate: "5–10 дней (печать + сборка кассет)",
    outcome: "Полностью укомплектованный инструментальный блок blaN.",
    tools: ["3D-принтер (стол ≥ 220×220 мм)", "ASA или PETG пластик", "Шариковые направляющие 200мм", "Метизы M3"],
    files: [
      { name: "blaN_DrawerMechanism.stl",  type: "STL", description: "Механизм выдвижного блока" },
      { name: "blaN_Cassette_A_Tools.stl", type: "STL", description: "Кассета А: отвёртки, мультитул" },
      { name: "blaN_Cassette_B_Elec.stl",  type: "STL", description: "Кассета Б: кримпер, мультиметр" },
      { name: "blaN_Cassette_C_Cable.stl", type: "STL", description: "Кассета В: кабели, переходники" },
      { name: "blaN_Tool_BOM.pdf",         type: "PDF", description: "Список инструментов для закупки" },
    ],
  },
  {
    id: 4,
    title: "Вычислительная платформа",
    description: "Основная плата blaN на базе кастомного дизайна: процессор шипотН (ARM64 архитектура, 8 ядер, 5нм), GPU naparoН (дискретная графика для инженерных задач), 32GB LPDDR5, NVMe M.2 2280. Дисплей: 16\" QHD 165Hz IPS с stylus поддержкой. Батарея 80Wh 4S.",
    px_cost: 1600,
    time_estimate: "2–4 недели (заказ платы)",
    outcome: "Рабочая вычислительная платформа blaN с дисплеем и батареей.",
    tools: ["Паяльная станция", "Тепловизор (проверка нагрева)", "Antistatic mat"],
    files: [
      { name: "blaN_Mainboard_Schema.pdf", type: "PDF",    description: "Схема основной платы" },
      { name: "blaN_Mainboard_Gerber.zip", type: "GERBER", description: "Gerber файлы для производства" },
      { name: "blaN_Display_Guide.pdf",    type: "MANUAL", description: "Подключение дисплея" },
      { name: "blaN_Battery_Wiring.pdf",   type: "PDF",    description: "Схема питания 80Wh" },
    ],
  },
  {
    id: 5,
    title: "blaN OS: прошивка и инженерный софт",
    description: "Операционная система blaN на базе Linux с кастомной оболочкой nazrOS shell. Предустановлено: KiCad, FreeCAD, PlatformIO, Docker, Git, VS Code Server. Управление кассетами через GPIO: детектирование типа кассеты, профили инструментов, логирование использования.",
    px_cost: 2000,
    time_estimate: "3–5 дней настройки",
    outcome: "Полностью настроенная инженерная среда blaN OS с профилями инструментов.",
    tools: ["USB Type-C", "microSD ≥ 32GB для образа", "Стабильный интернет"],
    files: [
      { name: "blaN_OS_Image.img.gz",      type: "CODE",   description: "Образ blaN OS" },
      { name: "blaN_Setup_Script.sh",      type: "CODE",   description: "Скрипт первичной настройки" },
      { name: "blaN_GPIO_Cassette.py",     type: "CODE",   description: "Драйвер детектирования кассет" },
      { name: "blaN_Tooling_Profiles.zip", type: "CODE",   description: "Профили инструментальных кассет" },
    ],
  },
  {
    id: 6,
    title: "Сервисные отсеки и модульные интерфейсы",
    description: "blaN имеет 3 сервисных отсека: SDR-модуль (приёмник 100kHz-1.7GHz), осциллограф 2-канальный 100MHz, USB Power Delivery 100W. Все отсеки подключаются через PCIe x1 внутренний разъём. Схемы и прошивки для каждого модуля.",
    px_cost: 2400,
    time_estimate: "1–2 недели",
    outcome: "blaN с SDR-приёмником, портативным осциллографом и USB PD зарядкой.",
    tools: ["Паяльник", "PCIe x1 разъёмы", "Multimeter"],
    files: [
      { name: "blaN_SDR_Module.pdf",       type: "PDF",  description: "SDR модуль 100kHz-1.7GHz" },
      { name: "blaN_Oscilloscope_2ch.pdf", type: "PDF",  description: "2-канальный осциллограф 100MHz" },
      { name: "blaN_USBPD_Module.pdf",     type: "PDF",  description: "USB PD 100W модуль" },
    ],
  },
  {
    id: 7,
    title: "Финальная сборка и полевые испытания",
    description: "Финальный монтаж всех компонентов: основная плата → корпус → дисплей → батарея → инструментальный блок → сервисные модули. Полевые испытания: 8 часов работы от батареи, тест кримпера под нагрузкой, тест SDR в поле, проверка waterproof IP53.",
    px_cost: 2800,
    time_estimate: "2–3 дня сборки + 1 день испытаний",
    outcome: "Полностью собранный blaN, протестированный в полевых условиях. Масса 2.4 кг.",
    tools: ["Все предыдущие инструменты", "IP53 тест (разбрызгиватель воды)", "Динамометр для петель"],
    files: [
      { name: "blaN_Final_Assembly.pdf",   type: "MANUAL", description: "Финальная пошаговая инструкция" },
      { name: "blaN_Field_Test_Report.pdf", type: "PDF",   description: "Протокол полевых испытаний" },
      { name: "blaN_Serial_Registration.pdf", type: "PDF", description: "Регистрация в nazrOS" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  biohN — Городская пасека / Биотехнологический комплекс
//  Трубчатая конструкция, силиконовые соты, климат-контроль, датчики среды
// ══════════════════════════════════════════════════════════════════════════════
export const biohNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация и зоотехническое ТЗ",
    description: "biohN — компактная трубчатая система для городского пчеловодства. Пчёлы залетают в одну трубку, вылетают из другой. Внутри: силиконовые соты (пища безопасная для пчёл), камера для наблюдения, датчики. Документация: биологические требования к жилищу пчёл, безопасные материалы, схема пчелопотока.",
    px_cost: 500,
    time_estimate: "2–3 дня изучения",
    outcome: "Понимание биологии и технических требований. Готовность к строительству.",
    tools: ["Компьютер", "Консультация апиолога (опционально)"],
    files: [
      { name: "biohN_Biology_Requirements.pdf", type: "PDF", description: "Биологические требования к жилищу" },
      { name: "biohN_Architecture_v1.pdf",      type: "PDF", description: "Конструкция трубчатого улья" },
      { name: "biohN_BOM_v1.xlsx",              type: "PDF", description: "Перечень материалов и компонентов" },
      { name: "biohN_BeeFlow_Schema.pdf",        type: "PDF", description: "Схема потока пчёл" },
    ],
  },
  {
    id: 2,
    title: "Корпус улья: трубчатая конструкция и силиконовые соты",
    description: "Внешний корпус: авиационный алюминий + закалённое стекло (IP54). Внутренние соты: пищевой силикон марки LSR, безопасный для пчёл и мёда. Входная/выходная трубки с управляемыми клапанами. Три секции: жилая, медовая, лётная. Крепление: балкон/крыша/технопарк.",
    px_cost: 1000,
    time_estimate: "3–4 недели (изготовление силиконовых форм)",
    outcome: "Готовый корпус biohN с силиконовыми сотами, пригодный для заселения.",
    tools: ["Силиконовые формы (заказ или самостоятельно)", "Вакуумная камера для удаления пузырей", "Алюминиевый профиль", "Лазерный резак или ЧПУ для стекла"],
    files: [
      { name: "biohN_Frame_CAD.step",      type: "CAD", description: "CAD корпуса (алюминий)" },
      { name: "biohN_Silicone_Mold.stl",   type: "STL", description: "Форма для силиконовых сот" },
      { name: "biohN_Sections_Schema.pdf", type: "PDF", description: "Схема трёх секций" },
      { name: "biohN_Valve_Assembly.pdf",  type: "PDF", description: "Управляемые клапаны входа/выхода" },
      { name: "biohN_Silicone_Guide.pdf",  type: "MANUAL", description: "Заливка силиконовых сот" },
    ],
  },
  {
    id: 3,
    title: "Система датчиков среды и микроклимата",
    description: "Датчики: температура DHT22 (±0.3°C), влажность, CO2 MH-Z19B, качество воздуха MQ-135, PM2.5/PM10 датчик, уровень шума MEMS-микрофон, вес улья (тензодатчики 4×50кг), УФ-индекс ML8511. Камера наблюдения ESP32-CAM. Ультразвуковой датчик состояния.",
    px_cost: 1500,
    time_estimate: "1–2 недели монтажа и калибровки",
    outcome: "biohN мониторит 8 параметров среды + активность пчёл в реальном времени.",
    tools: ["Паяльник", "Мультиметр", "Калибровочный CO2-газ (опционально)"],
    files: [
      { name: "biohN_Sensors_Schema.pdf",  type: "PDF",    description: "Схема подключения всех датчиков" },
      { name: "biohN_Weight_System.pdf",   type: "PDF",    description: "Тензодатчики и весовая система" },
      { name: "biohN_Camera_Setup.pdf",    type: "MANUAL", description: "Установка ESP32-CAM" },
    ],
  },
  {
    id: 4,
    title: "Климат-контроль: нагрев, вентиляция, влажность",
    description: "Автономная климатическая система: нагреватель PTC 12V для зимовки, вентилятор с переменной скоростью PWM, ультразвуковой увлажнитель, система обогрева летка. PID-регуляция по всем параметрам. Питание 12V DC + солнечная панель (опционально).",
    px_cost: 2000,
    time_estimate: "1 неделя",
    outcome: "Автономный климат-контроль: пчёлы живут в оптимальных условиях круглый год.",
    tools: ["ESP32 (управление)", "Реле 4-канальный", "MOSFET для PWM вентилятора"],
    files: [
      { name: "biohN_Climate_PCB.pdf",     type: "PDF",    description: "Плата климат-контроля" },
      { name: "biohN_Climate_Gerber.zip",  type: "GERBER", description: "PCB для производства" },
      { name: "biohN_PID_Algorithm.pdf",   type: "PDF",    description: "PID-регуляторы для всех параметров" },
      { name: "biohN_Solar_Option.pdf",    type: "PDF",    description: "Подключение солнечной панели" },
    ],
  },
  {
    id: 5,
    title: "ПО: мобильное приложение и панель управления",
    description: "Мобильное приложение biohN: статус улья (ЗДОРОВ/СТРЕСС/ТРЕВОГА), активность пчёл в %, температура/влажность/вес в реальном времени, история активности, уведомления. WebSocket стриминг данных. Интеграция с nazrOS экосистемой.",
    px_cost: 2500,
    time_estimate: "2–3 недели разработки",
    outcome: "Мобильное приложение показывает статус улья в реальном времени с любого устройства.",
    tools: ["Node.js или Python для сервера", "React Native или Flutter для приложения"],
    files: [
      { name: "biohN_App_Source.zip",      type: "CODE",   description: "Исходный код приложения" },
      { name: "biohN_Server_API.zip",      type: "CODE",   description: "API сервер biohN" },
      { name: "biohN_Dashboard_Web.zip",   type: "CODE",   description: "Веб-панель управления" },
      { name: "biohN_Alert_System.pdf",    type: "PDF",    description: "Система уведомлений" },
    ],
  },
  {
    id: 6,
    title: "Интеграция с назрОС и biohN MESH",
    description: "biohN как узел городской экосистемы nazrOS: передаёт данные о качестве воздуха в городскую сеть, синхронизируется с другими ульями (biohN MESH через LoRa/WiFi), отображает данные в CyberEden профиле, начисляет ПХ за биомониторинг.",
    px_cost: 3000,
    time_estimate: "1 неделя",
    outcome: "biohN — полноценный узел городской биосенсорной сети nazrOS.",
    tools: ["LoRa модуль Ra-02 (если нет WiFi покрытия)"],
    files: [
      { name: "biohN_LoRa_Module.pdf",     type: "PDF",  description: "LoRa модуль для urban mesh" },
      { name: "biohN_nazrOS_SDK.zip",      type: "CODE", description: "SDK интеграции с nazrOS" },
      { name: "biohN_MESH_Protocol.pdf",   type: "PDF",  description: "Протокол biohN MESH сети" },
    ],
  },
  {
    id: 7,
    title: "Монтаж, заселение и полевые испытания",
    description: "Финальная сборка biohN: монтаж всех систем в корпус, герметизация, полевая установка (балкон/крыша). Заселение пчелиной семьи: протокол переселения роя, первичная адаптация 72 часа, проверка всех систем под нагрузкой. Зимовка: протокол подготовки.",
    px_cost: 3500,
    time_estimate: "2–3 дня (+ весенний сезон для заселения)",
    outcome: "Работающая городская пасека biohN с автономным управлением и мониторингом.",
    tools: ["Пчеловодный костюм", "Дымарь", "Стандартные ульевые рамки для переселения"],
    files: [
      { name: "biohN_Install_Guide.pdf",   type: "MANUAL", description: "Инструкция монтажа" },
      { name: "biohN_Bee_Protocol.pdf",    type: "PDF",    description: "Протокол заселения и адаптации" },
      { name: "biohN_Winter_Protocol.pdf", type: "PDF",    description: "Подготовка к зимовке" },
      { name: "biohN_QA_Checklist.pdf",    type: "PDF",    description: "Финальный чек-лист" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  piN — Настольная фабрика (FDM + DLP/SLA + Лазер + ЧПУ + Пайка)
// ══════════════════════════════════════════════════════════════════════════════
export const piNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация и выбор конфигурации",
    description: "piN — модульная настольная фабрика. Базовая конфигурация: FDM 3D-принтер (рабочая зона 300×300×400 мм, точность ±0.05мм) + DLP/SLA (точность ±0.01мм, фотополимер/биочернила). Расширенная: + лазерный гравёр 5.5W + мини-ЧПУ + вакуумный стол. Документация описывает все конфигурации.",
    px_cost: 350,
    time_estimate: "1–2 дня",
    outcome: "Выбрана конфигурация piN, понятен порядок модульного наращивания.",
    tools: ["Компьютер"],
    files: [
      { name: "piN_Config_Guide.pdf",      type: "PDF", description: "Руководство по выбору конфигурации" },
      { name: "piN_Architecture_v1.pdf",   type: "PDF", description: "Архитектура модульной платформы" },
      { name: "piN_BOM_Full.xlsx",         type: "PDF", description: "BOM всех конфигураций" },
    ],
  },
  {
    id: 2,
    title: "Шасси-платформа: универсальная основа",
    description: "Единая рама piN из профиля 3030 алюминий (650×650×900 мм), к которой крепятся все модули. Линейные направляющие HGR20 по всем осям. Корпус с фильтрацией воздуха HEPA 14 + угольный фильтр, уровень шума 18 дБ (бесшумный режим). Дверь с блокировкой.",
    px_cost: 700,
    time_estimate: "7–14 дней сборки",
    outcome: "Готовая рама piN с направляющими, готовая к монтажу производственных модулей.",
    tools: ["Профиль алюминиевый 3030", "Дрель + метчик", "Уровень", "Метизы M5/M6"],
    files: [
      { name: "piN_Frame_Assembly.pdf",    type: "MANUAL", description: "Сборка алюминиевой рамы" },
      { name: "piN_Frame_Parts.stl",       type: "STL",    description: "Печатные детали рамы" },
      { name: "piN_Linear_Rails.pdf",      type: "PDF",    description: "Монтаж направляющих HGR20" },
      { name: "piN_HEPA_Filter.pdf",       type: "PDF",    description: "Система фильтрации воздуха" },
    ],
  },
  {
    id: 3,
    title: "FDM-модуль: многоматериальный экструдер",
    description: "FDM-модуль piN: Volcano hotend до 300°C, прямой экструдер BMG, система автосмены филамента (4 катушки), датчик конца филамента. Материалы: PLA, PETG, ABS, PA, Carbon, Metal-filled, TPU. Скорость до 250 мм/с. Совместим с Klipper.",
    px_cost: 1050,
    time_estimate: "5–10 дней",
    outcome: "FDM-модуль piN печатает конструкционными и специальными материалами.",
    tools: ["Паяльник", "Термоусадка", "Wago-клеммы"],
    files: [
      { name: "piN_FDM_Toolhead.stl",     type: "STL",    description: "Печатная голова FDM" },
      { name: "piN_FDM_Schema.pdf",        type: "PDF",    description: "Схема FDM модуля" },
      { name: "piN_MultiMaterial.pdf",     type: "PDF",    description: "Система смены 4 филаментов" },
      { name: "piN_Material_Profiles.zip", type: "CODE",   description: "Профили Klipper для всех материалов" },
    ],
  },
  {
    id: 4,
    title: "DLP/SLA-модуль: фотополимерная печать",
    description: "DLP модуль piN: UV-проектор 405нм 12K LCD матрица, разрешение до 10 микрон. Поддерживает: стандартные смолы, биосовместимые смолы, биочернила (для biohN), керамику. Встроенная УФ-мойка и отверждение. Интеграция с CHITUBOX/Lychee Slicer.",
    px_cost: 1400,
    time_estimate: "1 неделя",
    outcome: "DLP-модуль piN печатает детали с микронной точностью для сложных механизмов.",
    tools: ["Нитриловые перчатки", "Защитные очки", "Изопропиловый спирт 99%"],
    files: [
      { name: "piN_DLP_Mount.stl",         type: "STL",    description: "Крепление DLP модуля" },
      { name: "piN_DLP_Schema.pdf",         type: "PDF",    description: "Схема DLP системы" },
      { name: "piN_Resin_Profiles.zip",     type: "CODE",   description: "Профили для смол" },
      { name: "piN_BioInk_Guide.pdf",       type: "PDF",    description: "Работа с биочернилами" },
    ],
  },
  {
    id: 5,
    title: "Управляющая электроника и прошивка Klipper",
    description: "Управляющая плата: BTT Octopus v1.1 + Raspberry Pi 4 (Klipper). Драйверы TMC2209 (бесшумные). Дисплей 7\" сенсорный OLED. Управление обоими модулями (FDM + DLP) из единого интерфейса. Удалённое управление через nazrOS link. Autocalibration.",
    px_cost: 1750,
    time_estimate: "5–7 дней настройки",
    outcome: "piN под управлением Klipper с autocalibration и удалённым доступом через nazrOS.",
    tools: ["microSD 16GB", "LAN-кабель для первичной настройки"],
    files: [
      { name: "piN_Klipper_Config.zip",    type: "CODE",   description: "Полный конфиг Klipper для piN" },
      { name: "piN_Octopus_Wiring.pdf",    type: "PDF",    description: "Схема подключения BTT Octopus" },
      { name: "piN_Calibration_Guide.pdf", type: "MANUAL", description: "Полный гайд калибровки" },
      { name: "piN_nazrOS_Integration.pdf", type: "PDF",   description: "Подключение к nazrOS link" },
    ],
  },
  {
    id: 6,
    title: "Расширение: лазер + ЧПУ + вакуумный стол",
    description: "Опциональные модули: лазерный гравёр xTool D1 Pro 10W (металл, дерево, кожа), мини-ЧПУ фрезер (алюминий, PETG), вакуумный стол для фиксации листовых материалов. Смена модулей: 5 минут, инструмент-less замена. Литейный модуль (центробежное литьё воска/металла) — опция.",
    px_cost: 2100,
    time_estimate: "1–2 недели",
    outcome: "piN стал полноценной настольной фабрикой: 3D-печать + гравировка + фрезеровка.",
    tools: ["Вытяжка (для лазера обязательно)", "Защитные очки OD5+ для 405нм"],
    files: [
      { name: "piN_Laser_Mount.stl",       type: "STL",    description: "Крепление лазерного модуля" },
      { name: "piN_CNC_Head.stl",          type: "STL",    description: "ЧПУ голова" },
      { name: "piN_Vacuum_Table.stl",      type: "STL",    description: "Вакуумный стол" },
      { name: "piN_LaserCNC_Config.zip",   type: "CODE",   description: "Конфиг лазера и ЧПУ" },
    ],
  },
  {
    id: 7,
    title: "Тест-производство деталей nazrOS",
    description: "Финальное испытание piN: производство реальных деталей для cloN (корпус), blaN (кассеты инструментов), biohN (силиконовые формы). Сравнение точности FDM vs DLP. Регистрация piN в nazrOS. Получение статуса «Производственный узел».",
    px_cost: 2450,
    time_estimate: "3–5 дней тест-производства",
    outcome: "piN сертифицирован как производственный узел nazrOS. Можно производить детали для других киберов.",
    tools: ["Штангенциркуль ±0.01мм", "Микрометр"],
    files: [
      { name: "piN_TestParts_cloN.stl",    type: "STL",    description: "Тестовые детали для cloN" },
      { name: "piN_TestParts_blaN.stl",    type: "STL",    description: "Тестовые детали для blaN" },
      { name: "piN_QA_Protocol.pdf",       type: "PDF",    description: "Протокол приёмки" },
      { name: "piN_nazrOS_Certificate.pdf", type: "PDF",   description: "Сертификат производственного узла" },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  rostN — Гроубокс с автономным управлением
//  Многоуровневая система выращивания, управление через приложение
// ══════════════════════════════════════════════════════════════════════════════
export const rostNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Проектная документация",
    description: "rostN — автономная система хранения семян и выращивания растений в управляемых условиях. 3 уровня выращивания (420л), LED-спектральное освещение, гидропоника, климат-контроль. Биодиверсификация, генетический банк, непрерывное производство биоресурсов. Управление через приложение. Интеграция с biohN.",
    px_cost: 450,
    time_estimate: "2 дня",
    outcome: "Понимание всей системы rostN: секции, датчики, автоматика.",
    tools: ["Компьютер"],
    files: [
      { name: "rostN_Architecture.pdf",   type: "PDF", description: "Архитектура и схема секций" },
      { name: "rostN_BOM.xlsx",           type: "PDF", description: "Перечень компонентов" },
      { name: "rostN_PlantMatrix.pdf",    type: "PDF", description: "Матрица совместимости растений" },
    ],
  },
  {
    id: 2,
    title: "Корпус: три уровня выращивания",
    description: "Корпус rostN (1800×900×600 мм): модульная конструкция из алюминиевого профиля + акриловые панели. Три независимых уровня с регулируемой высотой. Герметичные перегородки для разных микроклиматов. Интегрированные LED-ленты на каждом уровне. Дверь с магнитным замком.",
    px_cost: 900,
    time_estimate: "7–14 дней",
    outcome: "Трёхуровневый корпус rostN, готовый к монтажу гидропоники и климатики.",
    tools: ["Алюминиевый профиль 2020/3030", "Акриловые панели 5мм", "Дрель", "Угловые соединители"],
    files: [
      { name: "rostN_Frame_Assembly.pdf",  type: "MANUAL", description: "Сборка корпуса" },
      { name: "rostN_Panels_Drawing.pdf",  type: "CAD",    description: "Чертежи панелей для резки" },
      { name: "rostN_LED_Mount.stl",       type: "STL",    description: "Крепления LED-панелей" },
    ],
  },
  {
    id: 3,
    title: "Система освещения: LED-спектр",
    description: "LED-система rostN: полный фотосинтетический спектр (380-780нм), УФ-канал (315-380нм), ИК-канал для ускорения роста. Независимое управление каждым уровнем (диммирование 0-100%, таймер, симуляция рассвета/заката). Потребление: 120 кВт/сутки суммарно.",
    px_cost: 1350,
    time_estimate: "5–7 дней",
    outcome: "Трёхзонная LED-система с программируемым фотопериодом.",
    tools: ["LED-драйверы meanwell", "Алюминиевый радиатор", "PWM-контроллер"],
    files: [
      { name: "rostN_LED_Schema.pdf",      type: "PDF",    description: "Схема LED системы" },
      { name: "rostN_Spectrum_Guide.pdf",  type: "PDF",    description: "Подбор спектра по культурам" },
      { name: "rostN_PWM_Controller.zip",  type: "CODE",   description: "Прошивка PWM-контроллера" },
    ],
  },
  {
    id: 4,
    title: "Гидропонная система и питательные растворы",
    description: "Гидропоника NFT (Nutrient Film Technique) на каждом уровне: помпы, трубки, лотки, таймер подачи раствора. EC-сенсор (электропроводность питания), pH-метр автоматической коррекции. Бак 50л с перемешивателем. Система рецирку ляции. Совместимость с biohN (биостимуляция пчёлами).",
    px_cost: 1800,
    time_estimate: "1–2 недели",
    outcome: "Полная гидропонная система с автоматической коррекцией pH и EC.",
    tools: ["Химостойкие трубки", "Помпы 12V", "pH/EC-метры", "Перистальтические насосы для корректоров"],
    files: [
      { name: "rostN_Hydro_Schema.pdf",    type: "PDF",    description: "Схема гидропоники" },
      { name: "rostN_NFT_Assembly.pdf",    type: "MANUAL", description: "Сборка NFT лотков" },
      { name: "rostN_Nutrient_Recipes.pdf", type: "PDF",  description: "Рецепты питательных растворов" },
      { name: "rostN_pH_Auto_Correct.zip", type: "CODE",  description: "Автокоррекция pH" },
    ],
  },
  {
    id: 5,
    title: "Климат-контроль и мониторинг роста",
    description: "Климатическая система rostN: диапазон 18-30°C, влажность 40-80%, CO2 800-1500 ppm. Камера мониторинга роста (ESP32-CAM, time-lapse). AI-анализ состояния растений по изображению. Уведомления о болезнях, стрессе, готовности к уборке.",
    px_cost: 2250,
    time_estimate: "1–2 недели",
    outcome: "rostN автономно поддерживает оптимальный микроклимат и отслеживает рост.",
    tools: ["Увлажнитель 12V", "CO2-генератор или инжектор", "ESP32-CAM"],
    files: [
      { name: "rostN_Climate_Control.zip", type: "CODE",   description: "Система климат-контроля" },
      { name: "rostN_Growth_Monitor.py",   type: "CODE",   description: "AI-мониторинг роста" },
      { name: "rostN_Alert_System.pdf",    type: "PDF",    description: "Система уведомлений" },
    ],
  },
  {
    id: 6,
    title: "Приложение управления rostN",
    description: "Мобильное приложение: включение/выключение освещения, вентиляции, помп. График роста (история температуры, влажности, EC, pH). Камера live view + time-lapse. Расписание полива и световых циклов. Push-уведомления. Интеграция с biohN (bio-link синхронизация).",
    px_cost: 2700,
    time_estimate: "2–3 недели разработки",
    outcome: "Приложение позволяет управлять rostN с телефона из любой точки мира.",
    tools: ["Node.js сервер", "React Native или Flutter"],
    files: [
      { name: "rostN_App_Source.zip",      type: "CODE",   description: "Исходный код приложения" },
      { name: "rostN_API_Server.zip",      type: "CODE",   description: "Backend API" },
      { name: "rostN_biohN_Bridge.pdf",    type: "PDF",    description: "Интеграция с biohN" },
    ],
  },
  {
    id: 7,
    title: "Запуск, заселение культур и регистрация",
    description: "Первый запуск rostN: заливка питательного раствора, калибровка датчиков, настройка световых циклов под первые культуры. Рекомендуемые стартовые культуры: микрозелень (14 дней), листовой салат (30 дней), базилик (21 день). Регистрация в nazrOS как Биопроизводственный узел.",
    px_cost: 3150,
    time_estimate: "1 день запуска + первый цикл выращивания",
    outcome: "rostN производит первый урожай. Зарегистрирован в nazrOS как биоузел сети.",
    tools: ["Семена микрозелени/салата", "Торфяные таблетки для прорастания"],
    files: [
      { name: "rostN_FirstCrop_Guide.pdf", type: "MANUAL", description: "Руководство по первому урожаю" },
      { name: "rostN_SeedMatrix.pdf",      type: "PDF",    description: "Матрица культур и циклов" },
      { name: "rostN_nazrOS_Register.pdf", type: "PDF",    description: "Регистрация биоузла" },
    ],
  },
  export const visioNStages: DeviceStage[] = [
  {
    id: 1,
    title: "Дизайн-проект и эргономика",
    description: "Разработка эргономичного корпуса, компоновка оптического тракта, проектирование HUD-интерфейса.",
    px_cost: 500,
    time_estimate: "2 дня",
    outcome: "Проектная документация и 3D-модель корпуса",
    tools: ["Figma", "Blender"],
    files: []
  },
  {
    id: 2,
    title: "Электроника и оптика",
    description: "Сборка платы управления, калибровка камеры, настройка проектора и датчиков.",
    px_cost: 600,
    time_estimate: "3 дня",
    outcome: "Собранный прототип с базовым функционалом",
    tools: ["Паяльная станция", "Мультиметр"],
    files: []
  },
  {
    id: 3,
    title: "Прошивка и калибровка",
    description: "Загрузка прошивки, настройка HUD-интерфейса, калибровка датчиков.",
    px_cost: 400,
    time_estimate: "2 дня",
    outcome: "Рабочая прошивка с откалиброванными параметрами",
    tools: ["Arduino IDE", "USB-C кабель"],
    files: []
  },
  {
    id: 4,
    title: "Интеграция с nazrOS",
    description: "Подключение к экосистеме, синхронизация с профилем, тестирование связи.",
    px_cost: 300,
    time_estimate: "1 день",
    outcome: "Полностью интегрированное устройство",
    tools: ["nazrOS LINK-модуль"],
    files: []
  },
  {
    id: 5,
    title: "Финальная сборка и регистрация",
    description: "Финальная сборка, герметизация, регистрация в nazrOS.",
    px_cost: 200,
    time_estimate: "1 день",
    outcome: "Готовый visioN с серийным номером",
    tools: ["Отвёртки", "Термоклей"],
    files: []
  }


];

// ══════════════════════════════════════════════════════════════════════════════
//  Купаж коллекции для СОФТА (страНно, кефирНно)
//  Вместо стадий — описание что входит в коллекционное издание
// ══════════════════════════════════════════════════════════════════════════════
export type SoftCollection = {
  digital: string[];       // Цифровые компоненты
  physical: string[];      // Физические компоненты коллекционного издания
  access: string[];        // Доступы и привилегии
  downloadUrl?: string;    // URL для скачивания (если есть)
};

export const SOFT_COLLECTIONS: Record<string, SoftCollection> = {
  stranno: {
    digital: [
      "stranno v1.0 — исполняемый файл (Win/Mac/Linux)",
      "stranno API ключ — 12 месяцев безлимитного доступа",
      "Библиотека промптов nazrOS (500+ шаблонов)",
      "Датасет нестандартного мышления (5000 примеров)",
      "Исходный код LoRA fine-tune скриптов",
      "Документация stranno SDK",
    ],
    physical: [
      "Коллекционная карточка stranno (металл, матовый)",
      "Стикер-пак nazrOS (7 стикеров)",
      "Буклет «Нестандартное мышление» (24 стр, твёрдая обложка)",
    ],
    access: [
      "Ранний доступ к stranno v2.0",
      "Закрытый канал разработчиков stranno",
      "Голосование за новые функции",
    ],
  },
  kefirno: {
    digital: [
      "кефирНно v1.0 — Python пакет (PyPI + исходник)",
      "CLI инструмент кефирНно для терминала",
      "Docker образ кефирНно",
      "Набор из 50 готовых пайплайнов трансформации данных",
      "кефирНно VS Code Extension",
      "Dokumentation API + cookbook (PDF)",
    ],
    physical: [
      "Коллекционная карточка кефирНно (металл, матовый)",
      "Стикер кефирНно на ноутбук",
      "Микрофибровая тряпка для экрана с логотипом nazrOS",
    ],
    access: [
      "Ранний доступ к кефирНно v2.0",
      "Приоритетные баг-репорты",
      "+50 ПХ за регистрацию коллекции",
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════════════
//  Экспорт маппинга item_id → stages
// ══════════════════════════════════════════════════════════════════════════════
export const ITEM_STAGES: Record<string, DeviceStage[]> = {
  clon:    cloNStages,
  biohn:   biohNStages,
  blan:    blaNStages,
  pin:     piNStages,
  vision:  visioNStages, 
  rostn:   rostNStages,
  // stranno, kefirno, cybervaucher_nazrOS — без стадий (купаж / NX-код)
};
