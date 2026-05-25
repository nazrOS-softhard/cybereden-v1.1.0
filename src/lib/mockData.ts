import rostn from "@/assets/rostn.jpg";
import drone from "@/assets/item-drone.jpg";
import visor from "@/assets/item-visor.jpg";
import arm from "@/assets/item-arm.jpg";
import rostnFull from "@/assets/rostn-full.png";

// ДОБАВЛЕННЫЕ НОВЫЕ КАРТИНКИ (с маленькими n)
import biohn from "@/assets/biohn.png";
import biohnfull from "@/assets/biohnfull.png";
import blan from "@/assets/blan.png";
import blanfull from "@/assets/blanfull.png";
import clon from "@/assets/clon.png";
import clonfull from "@/assets/clonfull.png";
import pin from "@/assets/pin.png";
import pinfull from "@/assets/pinfull.png";

export type Sensor = { label: string; unit: string; value: number; min: number; max: number };
export type Slider = { label: string; value: number; min: number; max: number; unit: string };

export type Item = {
  id: string;
  name: string;
  category: string;
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
  // --- biohN ---
  {
    id: "biohn",
    name: "biohN",
    category: "БИОХАКИНГ",
    price: 248000,
    status: "in_stock",
    image: biohn,
    expandedImage: biohnfull,
    short: "Интеллектуальный биотехнологический модуль для автономных биоэкспериментов",
    description:
      "Интеллектуальный биотехнологический модуль nazrOS для создания автономных экспериментальных биосред внутри цифровой инфраструктуры КиберэдэН.\n\nbiohN объединяет: климатический контроль, систему мониторинга среды, нейроаналитику параметров, модульную биоинженерию, цифровую синхронизацию с HUD-системой.\n\nКомплекс предназначен для исследований замкнутых экосистем, культивирования биосред, анализа микроклимата, автономных bio-pipeline процессов, интеграции биотехнологий в цифровую инфраструктуру.\n\nОсобенности: бесшумная архитектура, сенсорная система нового поколения, неоновая HUD-индикация, автономные режимы контроля, интеграция с AI-модулями nazrOS.",
    sensors: [
      { label: "Температура среды", unit: "°C", value: 38, min: 20, max: 80 },
      { label: "Влажность", unit: "%", value: 42, min: 0, max: 100 },
      { label: "Сигнал био-нейро", unit: "dBm", value: -52, min: -100, max: 0 },
    ],
    sliders: [
      { label: "Тактовая частота", value: 3.4, min: 1, max: 6, unit: "ГГц" },
      { label: "Мощность", value: 65, min: 10, max: 100, unit: "%" },
      { label: "Охлаждение", value: 50, min: 0, max: 100, unit: "%" },
    ],
  },
  // --- cloN ---
  {
    id: "clon",
    name: "cloN",
    category: "ЦИФРОВЫЕ СУЩНОСТИ",
    price: 6400,
    status: "in_stock",
    image: clon,
    expandedImage: clonfull,
    short: "Цифровая сущность-аватар для присутствия в сетевой среде",
    description:
      "Цифровая сущность-аватар внутри экосистемы КиберэдэН, предназначенная для визуального присутствия пользователя в сетевой среде nazrOS.\n\ncloN — это гибрид цифровой личности, HUD-профиля и игровой сигнатуры активности.\n\nСистема включает: кастомизацию внешности, 16-bit / cyber визуализацию, сигнатуры активности, систему XP, интеграцию с трансляциями и событиями.\n\nВнутри cloN отображаются: инженерный уровень, медиа-активность, инфраструктурный статус, достижения, цифровые артефакты пользователя.\n\nОсобенности: поддержка анимированных аватаров, HUD-паспорт пользователя, LIVE-индикаторы, системные статусы, редкость профиля.",
    sensors: [
      { label: "Яркость аватара", unit: "нт", value: 1200, min: 100, max: 3000 },
      { label: "Температура ядра", unit: "°C", value: 34, min: 20, max: 60 },
      { label: "Заряд цифровой сущности", unit: "%", value: 73, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Прозрачность HUD", value: 60, min: 0, max: 100, unit: "%" },
      { label: "Контраст", value: 75, min: 0, max: 100, unit: "%" },
      { label: "Частота обновления", value: 240, min: 60, max: 360, unit: "Гц" },
    ],
  },
  // --- blaN ---
  {
    id: "blan",
    name: "blaN",
    category: "ИНЖЕНЕРНЫЕ СИСТЕМЫ",
    price: 8900,
    status: "in_stock",
    image: blan,
    expandedImage: blanfull,
    short: "Мобильная инженерная станция для управления цифровой инфраструктурой",
    description:
      "Мобильная инженерная станция nazrOS для разработки, диагностики и управления цифровой инфраструктурой КиберэдэН.\n\nblaN создан как портативное ядро разработчика цифровой среды.\n\nУстройство сочетает: высокопроизводительную вычислительную систему, модульную архитектуру, инструменты инженерного обслуживания, бесшумную работу, интеграцию с HUD-средой.\n\nПредназначение: разработка frontend/backend систем, работа с Unreal Engine, управление репозиториями, деплой цифровой среды, обслуживание серверной инфраструктуры.\n\nОсобенности: встроенные инженерные инструменты, модульный корпус, cyber-интерфейс, автономная рабочая станция, поддержка LIVE-разработки.",
    sensors: [
      { label: "Мощность", unit: "дБм", value: 28, min: 0, max: 40 },
      { label: "Полоса пропускания", unit: "МГц", value: 40, min: 1, max: 100 },
      { label: "КСВ", unit: "дБ", value: 1.2, min: 1, max: 3 },
    ],
    sliders: [
      { label: "Усиление", value: 78, min: 0, max: 100, unit: "%" },
    ],
  },
  // --- piN ---
  {
    id: "pin",
    name: "piN",
    category: "ПРОИЗВОДСТВО",
    price: 12800,
    status: "in_stock",
    image: pin,
    expandedImage: pinfull,
    short: "Гибридный производственный модуль для цифрового моделирования и прототипирования",
    description:
      "Гибридный бесшумный производственный модуль nazrOS, совмещающий цифровое моделирование и физическое прототипирование.\n\npiN разработан как инженерный мост между цифровой средой и физическим производством.\n\nСистема объединяет: 3D-печать, модульную сборку, цифровое управление, мониторинг процессов, интеграцию с cybereden pipeline.\n\nПредназначение: создание корпусов устройств, производство инженерных компонентов, сборка прототипов, изготовление деталей инфраструктуры, работа с модульными системами.\n\nОсобенности: бесшумный режим работы, двойная производственная система, HUD-мониторинг, AI-контроль процессов, интеграция с инженерной экосистемой nazrOS.",
    sensors: [
      { label: "Температура печати", unit: "°C", value: 220, min: 0, max: 400 },
      { label: "Скорость печати", unit: "мм/с", value: 80, min: 0, max: 200 },
      { label: "Калибровка", unit: "%", value: 96, min: 0, max: 100 },
    ],
    sliders: [
      { label: "Сила хвата", value: 55, min: 0, max: 100, unit: "%" },
      { label: "Скорость отклика", value: 80, min: 0, max: 100, unit: "%" },
      { label: "Чувствительность", value: 65, min: 0, max: 100, unit: "%" },
    ],
  },
  // --- СТАРЫЕ КАРТОЧКИ (остальные, без изменений) ---
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
      "Портативная утилита для обхода ICE-защиты. Совместима с большинством систем nazrOS. Требует верификации уровня доступа.",
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
  { id: "a1",
     title: "Архитектура нулевого доверия в 2090",
      topic: "Кибербезопасность",
       excerpt: "Почему периметр умер и что пришло на смену.",
        body: "Zero Trust как практика, а не маркетинг. Сегментация на уровне нейронных запросов, политики на основе поведения и непрерывная аттестация контекстов. Разбираем кейсы корпораций Aoyama и SynLine.",
         readTime: 7 },

{
  id: "a2",
  title: "KILLNET",
  topic: "Хакинг",
  excerpt: "Как хакерские группировки стали частью цифровой геополитики",
  body: `
<div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">

  <!-- ВИДЕО -->
  <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
    <iframe 
      width="100%" 
      height="400" 
      src="https://rutube.ru/embed/ЗАМЕНИТЕ_НА_РЕАЛЬНЫЙ_ID" 
      title="Документальный материал о Killnet" 
      frameborder="0" 
      allowfullscreen
      style="width: 100%; height: 400px; display: block;"
    ></iframe>
  </div>

  <h2 style="font-size: 28px; color: #f97316; border-left: 4px solid #f97316; padding-left: 16px; margin-top: 0;">
    Как хакерские группировки стали частью цифровой геополитики
  </h2>

  <p style="font-size: 16px; margin-bottom: 20px;">
    За последние годы термин «хакерская группировка» перестал ассоциироваться исключительно с подпольными форумами и анонимными чатами. Современные цифровые объединения всё чаще становятся полноценными участниками глобального информационного пространства.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Одним из наиболее обсуждаемых русскоязычных объединений стала группа 
    <strong style="color: #fb923c;">Killnet</strong>.
  </p>

  <blockquote style="border-left: 4px solid #f97316; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Цифровое пространство стало новым полем противостояния»
  </blockquote>

  <h3 style="font-size: 22px; color: #fb923c; margin-top: 32px;">
    Что такое Killnet
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Killnet — известное русскоязычное хактивистское объединение, получившее широкую медийную известность благодаря сериям DDoS-атак и информационным операциям против зарубежных цифровых платформ, инфраструктур и организаций.
  </p>

  <p style="font-size: 16px; margin-bottom: 12px;">
    В медиа Killnet чаще всего связывали с:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">DDoS-атаками</li>
    <li style="margin-bottom: 6px;">информационными операциями</li>
    <li style="margin-bottom: 6px;">медиа-активностью</li>
    <li style="margin-bottom: 6px;">координацией через Telegram</li>
    <li style="margin-bottom: 6px;">цифровым активизмом</li>
  </ul>

  <h3 style="font-size: 22px; color: #fb923c; margin-top: 32px;">
    Почему это стало феноменом
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Ранее хакерские сообщества существовали преимущественно в закрытых пространствах: форумах, IRC-сетях, darknet-площадках.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Но новые цифровые объединения начали работать иначе:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">использование публичных медиа</li>
    <li style="margin-bottom: 6px;">формирование визуальной айдентики</li>
    <li style="margin-bottom: 6px;">создание цифрового бренда</li>
    <li style="margin-bottom: 6px;">активность в соцсетях</li>
    <li style="margin-bottom: 6px;">работа с информационными потоками</li>
  </ul>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Фактически современные хактивистские группы стали частью цифровой медиасреды.
  </p>

  <h3 style="font-size: 22px; color: #fb923c; margin-top: 32px;">
    Как изменился образ хакера
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Образ хакера давно вышел за пределы фильмов 90-х. Сегодня это:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">аналитики</li>
    <li style="margin-bottom: 6px;">сетевые исследователи</li>
    <li style="margin-bottom: 6px;">специалисты по инфраструктуре</li>
    <li style="margin-bottom: 6px;">OSINT-комьюнити</li>
    <li style="margin-bottom: 6px;">специалисты по цифровой безопасности</li>
  </ul>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Вместе с этим вырос интерес и к самой культуре кибербезопасности:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">сетевой анонимности</li>
    <li style="margin-bottom: 6px;">шифрованию данных</li>
    <li style="margin-bottom: 6px;">цифровой приватности</li>
    <li style="margin-bottom: 6px;">OSINT-инструментам</li>
    <li style="margin-bottom: 6px;">инфраструктурной защите</li>
  </ul>

  <blockquote style="border-left: 4px solid #a855f7; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Информация стала новой инфраструктурой современного мира»
  </blockquote>

  <h3 style="font-size: 22px; color: #fb923c; margin-top: 32px;">
    Почему тема важна для Киберэдэн
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Киберэдэн изучает цифровую среду не только как интерфейс, но и как экосистему.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Именно поэтому темы:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">кибербезопасности</li>
    <li style="margin-bottom: 6px;">цифровой этики</li>
    <li style="margin-bottom: 6px;">сетевой архитектуры</li>
    <li style="margin-bottom: 6px;">OSINT</li>
    <li style="margin-bottom: 6px;">цифровой идентичности</li>
  </ul>

  <p style="font-size: 16px; margin-bottom: 20px;">
    становятся частью новой цифровой культуры.
  </p>

</div>
`,
  readTime: 7
},

  {
  id: "a3",
  title: "UNIGINE",
  topic: "Геймдев",
  excerpt: "Российский движок для серьёзных симуляций",
  body: `
<div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">

  <h2 style="font-size: 28px; color: #ec4899; border-left: 4px solid #ec4899; padding-left: 16px; margin-top: 0;">
    UNIGINE — российский движок для серьёзных симуляций
  </h2>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Когда говорят про игровые движки, большинство сразу вспоминают Unity или Unreal Engine. Но внутри русскоязычного тех-сообщества уже много лет существует собственная технологическая платформа — <strong style="color: #f472b6;">UNIGINE</strong>.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Это не просто «ещё один движок». UNIGINE изначально создавался как высокоточная система визуализации для: промышленных симуляторов, цифровых двойников, военных и инженерных тренажёров, научных комплексов, VR/AR-сред, масштабных 3D-сцен. И только потом вокруг него начал формироваться полноценный gamedev-слой.
  </p>

  <blockquote style="border-left: 4px solid #ec4899; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «UNIGINE — это не просто движок. Это инженерная философия визуализации»
    <br />
    <span style="font-style: normal; color: #888;">— разработчик UNIGINE</span>
  </blockquote>

  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Чем UNIGINE отличается от массовых движков
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    В отличие от большинства игровых движков, UNIGINE ориентирован не на мобильные гиперказуалки, а на:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">огромные пространства без потери точности</li>
    <li style="margin-bottom: 6px;">стабильный FPS в тяжёлых сценах</li>
    <li style="margin-bottom: 6px;">физически корректный рендер</li>
    <li style="margin-bottom: 6px;">инженерную визуализацию</li>
    <li style="margin-bottom: 6px;">работу с GIS и реальными картами</li>
    <li style="margin-bottom: 6px;">корпоративные и государственные проекты</li>
  </ul>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Именно поэтому движок часто используют там, где ошибка визуализации может стоить слишком дорого.
  </p>

  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Почему о нём снова начали говорить
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    После изменений мирового рынка ПО и проблем с зарубежными сервисами интерес к локальным технологиям резко вырос. В русскоязычном комьюнити начались обсуждения: возможно ли создавать собственные игровые экосистемы, как строить независимый gamedev-стек, чем заменить иностранные middleware-системы, какие движки можно развивать внутри СНГ.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    На этом фоне UNIGINE снова оказался в центре внимания.
  </p>

  <blockquote style="border-left: 4px solid #ec4899; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Русскоязычный геймдев — это не просто индустрия. Это культурный код»
    <br />
    <span style="font-style: normal; color: #888;">— разработчик UNIGINE</span>
  </blockquote>

  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Российские студии и инди-сцена
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Внутри СНГ gamedev давно существует особая эстетика: постсоветский sci-fi, индустриальные пространства, мрачный киберпанк, техно-нуар, заброшенные научные комплексы, цифровая дистопия.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Многие инди-разработчики вдохновляются: S.T.A.L.K.E.R., Escape From Tarkov, Atomic Heart, Pathologic, российскими мод-сценами. Из-за этого русскоязычный геймдев часто ощущается более «грязным», тяжёлым и атмосферным, чем западный.
  </p>

  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Моддинг как основа комьюнити
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Отдельная часть русскоязычного gamedev-комьюнити выросла не из студий, а из моддинга. Именно мод-сцена научила тысячи людей: работать с картами, писать игровые скрипты, создавать интерфейсы, заниматься реверсом игровых файлов, строить собственные игровые механики.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Многие будущие разработчики начинали именно с: модов для GTA, Source Engine, Minecraft-сборок, SAMP, STALKER SDK, Garry's Mod.
  </p>

  <blockquote style="border-left: 4px solid #ec4899; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Моддинг — это школа, где учатся создавать миры»
    <br />
    <span style="font-style: normal; color: #888;">— разработчик UNIGINE</span>
  </blockquote>

</div>
`,
  readTime: 9
},

  {
  id: "a4",
  title: "TEAM YANDEX",
  topic: "Киберспорт",
  excerpt: "как корпорации заходят в цифровой спорт",
  body: `
<div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">

  <!-- ВИДЕО -->
  <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
    <iframe 
      width="100%" 
      height="400" 
      src="https://rutube.ru/embed/VIDEO_ID" 
      title="Интервью с капитаном Team Yandex" 
      frameborder="0" 
      allowfullscreen
      style="width: 100%; height: 400px; display: block;"
    ></iframe>
  </div>

  <h2 style="font-size: 28px; color: #06b6d4; border-left: 4px solid #06b6d4; padding-left: 16px; margin-top: 0;">
    Как корпорации заходят в цифровой спорт
  </h2>

  <p style="font-size: 16px; margin-bottom: 20px;">
    В последние годы русскоязычная киберспортивная сцена начала постепенно менять свой внешний вид. Если раньше экосистема строилась вокруг независимых организаций, энтузиастов и локальных клубов, то сейчас в цифровой спорт начинают заходить крупные технологические компании.
  </p>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Одним из наиболее заметных примеров стала команда <strong style="color: #22d3ee;">Team Yandex</strong>. Появление Team Yandex — это не просто запуск очередного состава по дисциплинам. Это сигнал о том, что IT-корпорации начинают воспринимать киберспорт как часть цифровой инфраструктуры будущего.
  </p>

  <blockquote style="border-left: 4px solid #06b6d4; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Мы не просто играем — мы строим цифровую культуру»
    <br />
    <span style="font-style: normal; color: #888;">— капитан Team Yandex</span>
  </blockquote>

  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Что такое Team Yandex
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Team Yandex — киберспортивное направление экосистемы Яндекса, созданное как медийная и технологическая площадка вокруг игровых дисциплин, стриминга и цифровых соревнований.
  </p>

  <p style="font-size: 16px; margin-bottom: 12px;">Проект начал активно появляться в медиа через:</p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">турниры</li>
    <li style="margin-bottom: 6px;">стриминговые интеграции</li>
    <li style="margin-bottom: 6px;">участие игроков и контент-мейкеров</li>
    <li style="margin-bottom: 6px;">собственные цифровые активности</li>
  </ul>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Главная особенность Team Yandex заключается не только в бренде. Команда использует инфраструктурный подход: аналитика, цифровые сервисы, облачные технологии, AI-инструменты, рекомендательные алгоритмы, интеграция с медиасредой. Фактически это попытка соединить: IT + медиа + киберспорт + цифровое комьюнити.
  </p>

  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Почему это важно для русскоязычного комьюнити
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Российская киберспортивная сцена долгое время существовала как отдельная субкультура. Но сейчас начинается новая эпоха:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">киберспорт становится частью цифровой экономики</li>
    <li style="margin-bottom: 6px;">команды превращаются в медиаэкосистемы</li>
    <li style="margin-bottom: 6px;">турниры становятся технологическими платформами</li>
    <li style="margin-bottom: 6px;">стриминг становится полноценной инфраструктурой</li>
  </ul>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Team Yandex показывает, что большие IT-компании готовы инвестировать не только в сервисы, но и в цифровую культуру.
  </p>

  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Как меняется киберспорт
  </h3>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Раньше команда = игроки. Теперь команда это:
  </p>

  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">бренд</li>
    <li style="margin-bottom: 6px;">визуальный стиль</li>
    <li style="margin-bottom: 6px;">цифровая идентичность</li>
    <li style="margin-bottom: 6px;">HUD-интерфейсы</li>
    <li style="margin-bottom: 6px;">live production</li>
    <li style="margin-bottom: 6px;">AI-анализ матчей</li>
  </ul>

  <p style="font-size: 16px; margin-bottom: 20px;">
    Киберспорт начинает выглядеть как операционная система. Именно поэтому современные команды всё чаще используют: motion design, интерфейсные HUD-элементы, анимированные панели, digital-айдентику, футуристические UI.
  </p>

  <blockquote style="border-left: 4px solid #a855f7; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Киберспорт — это не игра. Это инфраструктура цифрового будущего»
    <br />
    <span style="font-style: normal; color: #888;">— Team Yandex</span>
  </blockquote>

</div>
`,
  readTime: 6},

  { id: "a5",
     title: "Кто владеет твоими снами?",
      topic: "Цифровая этика",
       excerpt: "Сны как данные — правовой вакуум.",
        body: "После анонса DreamCache корпорации получили доступ к слоям REM-памяти. Что говорят регуляторы Сектора 4.",
         readTime: 10 },

  { id: "a6",
     title: "ICE-машины 2090: что под капотом",
      topic: "Кибербезопасность",
       excerpt: "Активная защита: от ловушек до контратак.",
        body: "Технический разбор современных Intrusion Countermeasures Electronics и их слабых мест.",
         readTime: 8 },
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
  { id: "e13", title: "КиберХак 2027: БЕЗОПАСНОСТЬ БУДУЩЕГО", type: "ХАКАТОНЫ", date: "20.08.2027", location: "Эрарта · г. Санкт-Петербург", description: "Главный хакатон киберсистемы nazrOS. 48 часов непрерывного кодинга, менторство от топ-специалистов и призовой фонд." },
  { id: "e14", title: "назрОС РазрабКонф 2027", type: "ХАКАТОНЫ", date: "08.09.2027", location: "ЦДП · г. Москва", description: "Конференция разработчиков киберсистемы nazrOS. Доклады, открытые мастерские, нетворкинг." },
  { id: "e15", title: "ПИКСЕЛИ", type: "ХАКАТОНЫ", date: "02.06.2027", location: "Иннополис · г. Казань", description: "12-часовой геймджем для инди-разработчиков. Тема объявляется в момент старта." },
  { id: "e16", title: "TWS: Плесетск", type: "ХАКАТОНЫ", date: "06.04.2027 – 12.04.2027", location: "Плесетск · Архангельская область", description: "The Week Space — цифровое космическое событие в рамках Российской недели космоса. Инженеры, дизайнеры, разработчики, медиа-артисты и исследователи собираются в единой среде будущего для обсуждения технологий, космической инфраструктуры и цифровых систем нового поколения." 
},
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
  { id: "c1", handle: "@f00rtime", rank: "ОПЕРАТОР", xp: 482300, status: "online", streaming: true },
  { id: "c2", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "ghost", streaming: false },
  { id: "c3", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c4", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c5", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c6", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c7", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c8", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c9", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c10", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c11", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
  { id: "c12", handle: "@TBA", rank: "НАБЛЮДАТЕЛЬ", xp: 0, status: "offline" },
];

// DATACENTER Assets
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
  "3D/Device Files",
  "Медиа модули",
  "Цифровые протоколы",
  "Цифровые сущности",
  "КиберэдэН Stream Files",
  "Unreal Engine Assets",
  "Game Design Files",
  "AI/NPC Modules",
  "World Files",
  "Cinematic Files"
];

export const datacenterAssets: Asset[] = [
  // Цифровые артефакты
  { id: "a1", name: "HUD_MainInterface_v3", category: "Цифровые артефакты", format: "PSB", size: "245 MB", xp: 1500, badge: "CORE" },
  // ... [добавьте остальные 23 файла из примера]
];
