// КАРТЫ УСТРОЙСТВ
import rostn from "@/assets/rostn.jpg";
import rostnFull from "@/assets/rostn-full.png";
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

// КАРТЫ  СОФТА

// МЕРОПРИЯТИЯ ДЕПЫ
import northPoster from "@/assets/north-event-poster.png";

// МЕРОПРИЯТИЯ ТРАНСЛЯЦИИ

// МЕРОПРИЯТИЯ ТУРНИРЫ

// МЕРОПРИЯТИЯ ХАКАТОНЫ

// ЖУРНАЛ ЦИФРОВАЯ ЭТИКА
import ethicsPoster1 from "@/assets/ethics-poster_1.png";

//ЖУРНАЛ КИБЕРБЕЗОПАСНОСТЬ 
import cyberSecurityPoster1 from "@/assets/cybersecurity_poster_1.png";

export type Sensor = { label: string; unit: string; value: number; min: number; max: number };
export type Slider = { label: string; value: number; min: number; max: number; unit: string };

export type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "in_stock" | "low" | "preorder" | "out_of_stock"; // Объединили все используемые статусы
  image: any;         // Изменено со string на any для корректной работы с импортами ассетов
  expandedImage?: any; // Изменено со string на any для корректной работы с импортами ассетов
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
    image: biohn, // Убраны кавычки
    expandedImage: biohnfull, // Убраны кавычки
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
    image: clon, // Убраны кавычки
    expandedImage: clonfull, // Убраны кавычки
    short: "Цифровая сущность-аватар для присутствия в сетевой среде",
    description:
      "Цифровая сущность-аватар внутри экосистемы КиберэдэН, предназначенная для визуального присутствия пользователя в сетевой среде nazrOS.\n\ncloN — это гибрид цифровой личности, HUD-профиля и игровой сигнатуры активности.\n\nСистема включает: кастомизацию внешности, 16-bit / cyber визуализацию, сигнатуры активности, систему XP, интеграцию с трансляциями и событиями.\n\nВнутри cloN отображаются: инженерный уровень, медиа-активность, инфраструктурный статус, achievements, цифровые артефакты пользователя.\n\nОсобенности: поддержка анимированных аватаров, HUD-паспорт пользователя, LIVE-индикаторы, системные статусы, редкость профиля.",
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
    image: blan, // Убраны кавычки
    expandedImage: blanfull, // Убраны кавычки
    short: "Мобильная инженерная станция для управления цифровой инфраструктурой",
    description:
      "Мобильная инженерная станция nazrOS для разработки, диагностики и управления цифровой инфраструктурой КиберэдэН.\n\nblaN создан как портативное ядро разработчика цифровой среды.\n\nУстройство сочетает: высокопроизвидительную вычислительную систему, модульную архитектуру, инструменты инженерного обслуживания, бесшумную работу, интеграцию с HUD-средой.\n\nПредназначение: разработка frontend/backend систем, работа с Unreal Engine, управление репозиториями, деплой цифровой среды, обслуживание серверной инфраструктуры.\n\nОсобенности: встроенные инженерные инструменты, модульный корпус, cyber-интерфейс, автономная рабочая станция, поддержка LIVE-разработки.",
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
    image: pin, // Убраны кавычки
    expandedImage: pinfull, // Убраны кавычки
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
  // --- visioN ---
  {
    id: "visionN",
    name: "взглядН",
    category: "КИБЕР-ОПТИКА",
    price: 15400,
    status: "in_stock",
    image: vision, // Убраны кавычки
    expandedImage: visionfull, // Убраны кавычки
    short: "Носимый визуальный интерфейс с системой цифрового анализа среды",
    description:
      "взглядН — носимая система визуального анализа, предназначенная для расширения восприятия цифровой и физической среды. Устройство оснащено центральной камерой наблюдения с потоковой передачей и фиксацией данных, проекторами объёмной визуализации для построения HUD-интерфейсов, а также светодиодными лампами для адаптивной подсветки и сигнальной индикации.\n\nТехнические характеристики:\n• Камера: 4K / 60 FPS\n• Проекция: Holographic HUD\n• Подсветка: Adaptive LED\n• Подключение: nazrOS LINK / Bluetooth 5.3\n• Аккумулятор: Энергия КиберэдэН\n• Защита: IP67 / -40°C ~ +49°C\n• Вес: 68 грамм\n\nВозможности:\n• Дополненная реальность\n• Цифровые интерфейсы поверх среды\n• Запись и анализ объектов\n• Навигация в тёмных пространствах\n• Интеграция с экосистемой nazrOS\n• Подключение к КиберэдэН",
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
  // --- cybervaucher nazrOS ---
// --- cybervaucher nazrOS ---
  {
    id: "cybervaucher_nazrOS",
    name: "КИБЕРВАУЧЕР",
    category: "ИНВЕСТ",
    price: 15400,
    status: "in_stock",
    image: cybervaucher,
    expandedImage: cybervaucherfull,
    short: "Тёмная подвеска — цифровой паспорт. Квалификация инвестора + ранний доступ к устройствам, софту nazrOS и системе лояльности.",
    description: "⚡ DEV MODE\nФункционал в стадии сборки. Возможны корректировки и горячие исправления.\n\nКИБЕРВАУЧЕР — тёмная подвеска с логотипом nazrOS.\nТвой цифровой паспорт в Цифровом конгломерате nazrOS.\n\n▸ ПРИОРИТЕТЫ\n\n01. Квалификация инвестора\nАктивация через Telegram Wallet → ID в Кибле Кибера.\n\n02. Ранний доступ к устройствам nazrOS\nНовые девайсы до анонса.\n\n03. Ранний доступ к софту nazrOS\nПрошивки и модули на стадии бета-тестирования.\n\n04. Система лояльности\nСкидки и подписки у партнёров:\n\n• Международные:\nSamsung, Apple, Sony, Xiaomi, Huawei, Microsoft, Honor, Oppo, Vivo, Motorola, Nokia, OnePlus, Meizu, Lenovo, ASUS, LG, HTC, ZTE, Infinix, realme, Google, Nothing\n\n• Российские:\nIrbis, BQ, DEXP, F+, Inoi, Tecno, Vertex\n\n▸ ЛОГИКА ПРИОБРЕТЕНИЯ\n\n1. «Приобрести» → Telegram-бот\n2. Оплата через Telegram Wallet\n3. Генерация уникального ID\n4. ID отображается в Кибле Кибера",
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

export type Article = {
  id: string;
  title: string;
  topic: "Кибербезопасность" | "Геймдев" | "Киберспорт" | "Хакинг" | "Цифровая этика" | "Цифровая культура";
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
  body: `
<div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">
  <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden; border: 1px solid #22d3ee; padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #0f172a 0%, #080711 100%);">
    <div style="font-size: 48px; margin-bottom: 10px;">🛡️</div>
    <h4 style="margin: 0; color: #22d3ee; font-size: 18px; text-transform: uppercase; letter-spacing: 2px;">Zero Trust Interactive Matrix</h4>
    <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Алгоритм-тест для архитекторов систем безопасности</p>
  </div>
  <h2 style="font-size: 28px; color: #22d3ee; border-left: 4px solid #22d3ee; padding-left: 16px; margin-top: 0;">
    Архитектура нового доверия: Почему периметр умер
  </h2>
  <p style="font-size: 16px; margin-bottom: 20px;">
    Классическая концепция кибербезопасности «крепость с рвом» больше не защищает данные. Как только злоумышленник пробивает внешний периметр (VPN или корпоративный фаервол), он получает неограниченный доступ ко всей внутренней сети. 
  </p>
  <p style="font-size: 16px; margin-bottom: 20px;">
    На смену пришла концепция <strong style="color: #a855f7;">Zero Trust (Нулевое доверие)</strong>. Её главный постулат: <em>«Никому не доверяй, всегда проверяй»</em>. Проверка контекста, устройства и пользователя должна происходить непрерывно, а не только в момент авторизации.
  </p>
  <blockquote style="border-left: 4px solid #22d3ee; padding-left: 16px; margin: 20px 0; font-style: italic; color: #94a3b8;">
    «Периметра больше нет. Каждый нейронный запрос, каждый микросервис и каждый девайс — это potential точка компрометации.»
  </blockquote>
  <h3 style="font-size: 24px; color: #a855f7; margin-top: 40px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
    ⚡ Алгоритм-тест: Проектируем систему нового доверия
  </h3>
  <div style="background: #111122; border: 1px solid #334155; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
    <span style="background: #a855f7; color: #fff; padding: 2px 8px; font-size: 12px; font-weight: bold; border-radius: 4px;">ШАГ 1</span>
    <h4 style="font-size: 18px; color: #fff; margin: 10px 0;">Аутентификация субъекта и контекста</h4>
    <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 15px;">
      Ваш сотрудник успешно ввёл логин, сложный пароль и прошёл MFA (биометрию) из дома. Ваши действия?
    </p>
    <div style="margin-left: 10px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #ef4444;">❌ Вариант А:</strong> Выдать сессионный токен на 8 часов. 
        <br><span style="color: #64748b; font-size: 13px;">⚠️ <em>Ошибка архитектуры:</em> Если через 5 минут устройство перехватит инфостилер, злоумышленник будет легитимно скачивать базу данных оставшиеся 7 часов 55 минут.</span>
      </div>
      <div>
        <strong style="color: #22c55e;">✅ Вариант Б (Zero Trust):</strong> Запустить непрерывную аттестацию контекста.
        <br><span style="color: #64748b; font-size: 13px;">⚙️ <em>Как это работает:</em> Система каждые пару минут проверяет: не изменился ли IP, не запущены ли подозрительные процессы, соответствует ли поведение пользователя его стандартному профилю.</span>
      </div>
    </div>
  </div>
  <div style="background: #111122; border: 1px solid #334155; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
    <span style="background: #22d3ee; color: #000; padding: 2px 8px; font-size: 12px; font-weight: bold; border-radius: 4px;">ШАГ 2</span>
    <h4 style="font-size: 18px; color: #fff; margin: 10px 0;">Сегментация на уровне нейронных запросов</h4>
    <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 15px;">
      Вам необходимо разграничить доступ к конфиденциальным API-эндпоинтам. Какую архитектуру выбрать?
    </p>
    <div style="margin-left: 10px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #ef4444;">❌ Вариант А:</strong> Разбить сеть на стандартные подсети (VLAN) для отделов.
        <br><span style="color: #64748b; font-size: 13px;">⚠️ <em>Риск:</em> Внутри одной подсети трафик обычно не фильтруется (East-West traffic). Взлом одного бухгалтера компрометирует всю бухгалтерию.</span>
      </div>
      <div>
        <strong style="color: #22c55e;">✅ Вариант Б (Zero Trust):</strong> Микросегментация на уровне единичных запросов.
        <br><span style="color: #64748b; font-size: 13px;">⚙️ <em>Как это работает:</em> Каждый микросервис изолирован. Доступ выдается точечно (например, Контейнер_А может слать только GET-запросы в Контейнер_Б и ничего больше).</span>
      </div>
    </div>
  </div>
  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Практика рынка: Кейсы Aoyama и SynLine
  </h3>
  <p style="font-size: 16px; margin-bottom: 20px;">
    Теория Нулевого доверия звучит красиво, но как она реализуется крупными технологическими конгломератами в боевых условиях?
  </p>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: square; color: #cbd5e1;">
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">Кейс корпорации Aoyama:</strong> После инцидента с утечкой исходных кодов, инженеры Aoyama полностью отказались от корпоративного VPN. Теперь любой внутренний инструмент доступен прямо из глобальной сети, но защищен прокси-сервером, который проверяет состояние безопасности устройства (наличие патчей ОС, активный EDR) до того, как пропустить трафик к приложению.
    </li>
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">Кейс SynLine:</strong> Корпорация внедрила динамические поведенческие политики. Если системный администратор SynLine внезапно пытается подключиться к базе данных в 3 часа ночи из непривычной локации и запрашивает в 10 раз больше данных, чем обычно — система автоматически блокирует запрос и отправляет его сессию на повторную глубокую проверку, минимизируя ущерб от возможного перехвата аккаунта.
    </li>
  </ul>
  <h3 style="font-size: 22px; color: #a855f7; margin-top: 32px;">
    Резюме: Если вы строите современное приложение...
  </h3>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;"><strong style="color: #22d3ee;">Предусмотрите</strong>, что токен авторизации может быть украден (сокращайте время жизни <code style="background: #1e1e2e; padding: 2px 4px; border-radius: 4px; color: #22d3ee;">accessToken</code> и используйте механизмы ротации <code style="background: #1e1e2e; padding: 2px 4px; border-radius: 4px; color: #22d3ee;">refreshToken</code>).</li>
    <li style="margin-bottom: 6px;"><strong style="color: #22d3ee;">Защищайте</strong> каждый эндпоинт так, будто он находится в открытом доступе для всего интернета.</li>
    <li style="margin-bottom: 6px;"><strong style="color: #22d3ee;">Логируйте</strong> не просто факт входа, а контекст использования данных для последующего поведенческого анализа.</li>
  </ul>
  <p style="font-size: 15px; color: #64748b; text-align: center; margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px;">
    Материал подготовлен аналитическим отделом Киберэдэн. Информация — это новая инфраструктура. Protect it.
  </p>
</div>
`,
  readTime: 7
},
{
  id: "a2",
  title: "KILLNET",
  topic: "Хакинг",
  excerpt: "Как хакерские группировки стали частью цифровой геополитики",
  body: `
<div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">
  <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
    <iframe width="100%" height="400" src="https://rutube.ru/embed/ЗАМЕНИТЕ_НА_РЕАЛЬНЫЙ_ID" title="Документальный материал о Killnet" frameborder="0" allowfullscreen style="width: 100%; height: 400px; display: block;"></iframe>
  </div>
  <h2 style="font-size: 28px; color: #f97316; border-left: 4px solid #f97316; padding-left: 16px; margin-top: 0;">
    Как хакерские группировки стали частью цифровой геополитики
  </h2>
  <p style="font-size: 16px; margin-bottom: 20px;">
    За последние годы термин «хакерская группировка» перестал ассоциироваться исключительно с подпольными форумами и анонимными чатами. Современные цифровые объединения всё чаще становятся полноценными участниками глобального информационного пространства.
  </p>
  <p style="font-size: 16px; margin-bottom: 20px;">
    Одним из наиболее обсуждаемых русскоязычных объединений стала группа <strong style="color: #fb923c;">Killnet</strong>.
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
  <p style="font-size: 16px; margin-bottom: 12px;">В медиа Killnet чаще всего связывали с:</p>
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
  <p style="font-size: 16px; margin-bottom: 20px;">Но новые цифровые объединения начали работать иначе:</p>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">использование публичных медиа</li>
    <li style="margin-bottom: 6px;">формирование визуальной айдентики</li>
    <li style="margin-bottom: 6px;">создание цифрового бренда</li>
    <li style="margin-bottom: 6px;">активность в соцсетях</li>
    <li style="margin-bottom: 6px;">работа с информационными потоками</li>
  </ul>
  <p style="font-size: 16px; margin-bottom: 20px;">Фактически современные хактивистские группы стали частью цифровой медиасреды.</p>
  <h3 style="font-size: 22px; color: #fb923c; margin-top: 32px;">
    Как изменился образ хакера
  </h3>
  <p style="font-size: 16px; margin-bottom: 20px;">Образ хакера давно вышел за пределы фильмов 90-х. Сегодня это:</p>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">аналитики</li>
    <li style="margin-bottom: 6px;">сетевые исследователи</li>
    <li style="margin-bottom: 6px;">специалисты по инфраструктуре</li>
    <li style="margin-bottom: 6px;">OSINT-комьюнити</li>
    <li style="margin-bottom: 6px;">специалисты по цифровой безопасности</li>
  </ul>
  <p style="font-size: 16px; margin-bottom: 20px;">Вместе с этим вырос интерес и к самой культуре кибербезопасности:</p>
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
  <p style="font-size: 16px; margin-bottom: 20px;">Киберэден изучает цифровую среду не только как интерфейс, но и как экосистему.</p>
  <p style="font-size: 16px; margin-bottom: 20px;">Именно поэтому темы:</p>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">кибербезопасности</li>
    <li style="margin-bottom: 6px;">цифровой этики</li>
    <li style="margin-bottom: 6px;">сетевой архитектуры</li>
    <li style="margin-bottom: 6px;">OSINT</li>
    <li style="margin-bottom: 6px;">цифровой идентичности</li>
  </ul>
  <p style="font-size: 16px; margin-bottom: 20px;">становятся частью новой цифровой культуры.</p>
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
    Это не просто «ещё один движок». UNIGINE изначально создавался как высокоточная система визуализации для: промышленных симуляторов, цифровых двойников, военных и инженерных тренажёров, научных комплексов, VR/AR-средой, масштабных 3D-сцен. И только потом вокруг него начал формироваться полноценный gamedev-слой.
  </p>
  <blockquote style="border-left: 4px solid #ec4899; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «UNIGINE — это не просто движок. Это инженерная философия визуализации»
    <br />
    <span style="font-style: normal; color: #888;">— разработчик UNIGINE</span>
  </blockquote>
  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Чем UNIGINE отличается от массовых движков
  </h3>
  <p style="font-size: 16px; margin-bottom: 20px;">В отличие от большинства игровых движков, UNIGINE ориентирован не на мобильные гиперказуалки, а на:</p>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">огромные пространства без потери точности</li>
    <li style="margin-bottom: 6px;">стабильный FPS в тяжёлых сценах</li>
    <li style="margin-bottom: 6px;">физически корректный рендер</li>
    <li style="margin-bottom: 6px;">инженерную визуализацию</li>
    <li style="margin-bottom: 6px;">работу с GIS и реальными картами</li>
    <li style="margin-bottom: 6px;">корпоративные и государственные проекты</li>
  </ul>
  <p style="font-size: 16px; margin-bottom: 20px;">Именно поэтому движок часто используют там, где ошибка визуализации может стоить слишком дорого.</p>
  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Почему о нём снова начали говорить
  </h3>
  <p style="font-size: 16px; margin-bottom: 20px;">После изменений мирового рынка ПО и проблем с зарубежными сервисами интерес к локальным технологиям резко вырос. В русскоязычном комьюнити начались обсуждения: возможно ли создавать собственные игровые экосистемы, как строить независимый gamedev-стек, чем заменить иностранные middleware-системы, какие движки можно развивать внутри СНГ.</p>
  <p style="font-size: 16px; margin-bottom: 20px;">На этом фоне UNIGINE снова оказался в центре внимания.</p>
  <blockquote style="border-left: 4px solid #ec4899; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Русскоязычный геймдев — это не просто индустрия. Это культурный код»
    <br />
    <span style="font-style: normal; color: #888;">— разработчик UNIGINE</span>
  </blockquote>
  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Российские студии и инди-сцена
  </h3>
  <p style="font-size: 16px; margin-bottom: 20px;">Внутри СНГ gamedev давно существует особая эстетика: постсоветский sci-fi, индустриальные пространства, мрачный киберпанк, техно-нуар, заброшенные научные комплексы, цифровая дистопия.</p>
  <p style="font-size: 16px; margin-bottom: 20px;">Многие инди-разработчики вдохновляются: S.T.A.L.K.E.R., Escape From Tarkov, Atomic Heart, Pathologic, российскими мод-сценами. Из-за этого русскоязычный геймдев часто ощущается более «грязным», тяжёлым и атмосферным, чем западный.</p>
  <h3 style="font-size: 22px; color: #f472b6; margin-top: 32px;">
    Моддинг как основа комьюнити
  </h3>
  <p style="font-size: 16px; margin-bottom: 20px;">Отдельная часть русскоязычного gamedev-комьюнити выросла не из студий, а из моддинга. Именно мод-сцена научила тысячи людей: работать с картами, писать игровые скрипты, создавать интерфейсы, заниматься реверсом игровых файлов, строить собственные игровые механики.</p>
  <p style="font-size: 16px; margin-bottom: 20px;">Многие будущие разработчики начинали именно с: модов для GTA, Source Engine, Minecraft-сборок, SAMP, STALKER SDK, Garry's Mod.</p>
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
  <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
    <iframe width="100%" height="400" src="https://rutube.ru/embed/VIDEO_ID" title="Интервью с капитаном Team Yandex" frameborder="0" allowfullscreen style="width: 100%; height: 400px; display: block;"></iframe>
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
  <p style="font-size: 16px; margin-bottom: 20px;">Team Yandex показывает, что большие IT-компании готовы инвестировать не только в сервисы, но и в цифровую культуру.</p>
  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Как меняется киберспорт
  </h3>
  <p style="font-size: 16px; margin-bottom: 20px;">Раньше команда = игроки. Теперь команда это:</p>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: disc;">
    <li style="margin-bottom: 6px;">бренд</li>
    <li style="margin-bottom: 6px;">визуальный стиль</li>
    <li style="margin-bottom: 6px;">цифровая идентичность</li>
    <li style="margin-bottom: 6px;">HUD-интерфейсы</li>
    <li style="margin-bottom: 6px;">live production</li>
    <li style="margin-bottom: 6px;">AI-анализ матчей</li>
  </ul>
  <p style="font-size: 16px; margin-bottom: 20px;">
    Киберспорт начинается выглядеть как операционная система. Именно поэтому современные команды всё чаще используют: motion design, интерфейсные HUD-элементы, анимированные панели, digital-айдентику, футуристические UI.
  </p>
  <blockquote style="border-left: 4px solid #a855f7; padding-left: 16px; margin: 20px 0; font-style: italic; color: #a1a1aa;">
    «Киберспорт — это не игра. Это инфраструктура цифрового будущего»
    <br />
    <span style="font-style: normal; color: #888;">— Team Yandex</span>
  </blockquote>
</div>
`,
  readTime: 6
},
{
  id: "a5",
  title: "Правила цифрового мира",
  topic: "Цифровая культура",
  excerpt: "Почему цифровая этика начинается не с нейросетей, а с поведения людей в сети.",
  body: `
<div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">
  <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden; border: 1px solid #a855f7;">
    <img src="${ethicsPoster1}" alt="Цифровая этика" style="width: 100%; height: auto; display: block;" />
  </div>
  <h2 style="font-size: 28px; color: #a855f7; border-left: 4px solid #a855f7; padding-left: 16px; margin-top: 0;">
    Цифровая этика: правила мира без границ
  </h2>
  <p>
    Когда люди слышат словосочетание «цифровая этика», чаще всего речь сразу заходит об искусственном интеллекте, алгоритмах и больших технологических корпорациях.
  </p>
  <p>
    Однако цифровая этика начинается гораздо раньше — с обычного сообщения, комментария, публикации фотографии или электронного письма.
  </p>
  <blockquote style="border-left: 4px solid #22d3ee; padding-left: 16px; margin: 20px 0; font-style: italic; color: #94a3b8;">
    «Технологии становятся частью общества только тогда, когда общество учится пользоваться ими ответственно».
  </blockquote>
  <h3 style="font-size: 24px; color: #22d3ee; margin-top: 40px; margin-bottom: 20px;">
    ⚡ Алгоритм цифровой этики
  </h3>
  <div style="background: #111122; border: 1px solid #334155; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
    <span style="background: #22d3ee; color: #000; padding: 2px 8px; font-size: 12px; font-weight: bold; border-radius: 4px;">ШАГ 1</span>
    <h4 style="font-size: 18px; color: #fff; margin: 10px 0;">Ответственность за коммуникацию</h4>
    <p style="font-size: 14px; color: #cbd5e1;">Вам написал коллега, партнёр или знакомый.</p>
    <div style="margin-left: 10px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #ef4444;">❌ Вариант А:</strong> Игнорировать сообщение несколько дней.<br>
        <span style="color: #64748b; font-size: 13px;">Потеря доверия, задержка проектов и неопределённость.</span>
      </div>
      <div>
        <strong style="color: #22c55e;">✅ Вариант Б:</strong> Подтвердить получение сообщения и обозначить сроки ответа.<br>
        <span style="color: #64748b; font-size: 13px;">В профессиональной среде хорошим тоном считается отвечать на сообщения в течение нескольких часов, а на электронные письма — в течение одного рабочего дня.</span>
      </div>
    </div>
  </div>
  <div style="background: #111122; border: 1px solid #334155; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
    <span style="background: #a855f7; color: #fff; padding: 2px 8px; font-size: 12px; font-weight: bold; border-radius: 4px;">ШАГ 2</span>
    <h4 style="font-size: 18px; color: #fff; margin: 10px 0;">Работа с личной информацией</h4>
    <div style="margin-left: 10px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #ef4444;">❌ Вариант А:</strong> Опубликовать чужую переписку или фотографию без согласия.
      </div>
      <div>
        <strong style="color: #22c55e;">✅ Вариант Б:</strong> Получить разрешение автора перед публикацией.
      </div>
    </div>
  </div>
  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Реальные кейсы
  </h3>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: square; color: #cbd5e1;">
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">Amazon:</strong>
      Компания отказалась от экспериментальной системы подбора персонала после обнаружения гендерной предвзятости алгоритма.
    </li>
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">MIT Media Lab:</strong>
      Исследования показали различия в точности некоторых систем распознавания лиц для разных групп пользователей.
    </li>
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">Право быть забытым:</strong>
      В ряде стран пользователи могут требовать удаления устаревшей информации о себе из поисковой выдачи.
    </li>
  </ul>
  <h3 style="font-size: 22px; color: #a855f7; margin-top: 32px;">
    Практика цифровой культуры
  </h3>
  <ul style="padding-left: 24px; margin-bottom: 20px;">
    <li>Уважайте время других людей.</li>
    <li>Не распространяйте личные данные без согласия.</li>
    <li>Проверяйте источники информации.</li>
    <li>Указывайте авторов материалов.</li>
    <li>Соблюдайте цифровую приватность.</li>
    <li>Помните, что за каждым аккаунтом находится живой человек.</li>
  </ul>
  <p style="font-size: 15px; color: #64748b; text-align: center; margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px;">
    Материал подготовлен аналитическим отделом КиберэдэН.<br>
    Цифровая культура начинается с личной ответственности.
  </p>
</div>
`,
  readTime: 7
},
{
  id: "a6",
  title: "Главная уязвимость любой системы",
  topic: "Кибербезопасность",
  excerpt: "Большинство успешных атак начинаются не со взлома систем, а с ошибок людей и слабых процессов безопасности.",
  body: `
<div style="max-width: 800px; margin: 0 auto; font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">
  <div style="margin-bottom: 30px; border-radius: 8px; overflow: hidden; border: 1px solid #22d3ee;">
    <img src="${cyberSecurityPoster1}" alt="Кибербезопасность" style="width: 100%; height: auto; display: block;" />
  </div>
  <h2 style="font-size: 28px; color: #22d3ee; border-left: 4px solid #22d3ee; padding-left: 16px; margin-top: 0;">
    Кибербезопасность начинается с поведения людей
  </h2>
  <p>
    Когда говорят о кибербезопасности, многие представляют сложные системы защиты, центры мониторинга и команды специалистов.
  </p>
  <p>
    На практике большинство инцидентов начинается значительно проще — с украденного пароля, фишингового письма или невнимательного действия пользователя.
  </p>
  <blockquote style="border-left: 4px solid #a855f7; padding-left: 16px; margin: 20px 0; font-style: italic; color: #94a3b8;">
    «Самая сложная система защиты может быть обойдена одним скомпрометированным аккаунтом».
  </blockquote>
  <h3 style="font-size: 24px; color: #a855f7; margin-top: 40px; margin-bottom: 20px;">
    ⚡ Алгоритм базовой кибербезопасности
  </h3>
  <div style="background: #111122; border: 1px solid #334155; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
    <span style="background: #22d3ee; color: #000; padding: 2px 8px; font-size: 12px; font-weight: bold; border-radius: 4px;">ШАГ 1</span>
    <h4 style="font-size: 18px; color: #fff; margin: 10px 0;">Защита учётных записей</h4>
    <p style="font-size: 14px; color: #cbd5e1;">Большинство компрометаций начинается с украденных паролей.</p>
    <div style="margin-left: 10px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #ef4444;">❌ Вариант А:</strong> Использовать один пароль для нескольких сервисов.<br>
        <span style="color: #64748b; font-size: 13px;">В случае утечки злоумышленники получают доступ сразу к нескольким аккаунтам.</span>
      </div>
      <div>
        <strong style="color: #22c55e;">✅ Вариант Б:</strong> Использовать уникальные пароли и многофакторную аутентификацию (MFA).<br>
        <span style="color: #64748b; font-size: 13px;">MFA остаётся одним из наиболее эффективных способов предотвращения захвата аккаунтов.</span>
      </div>
    </div>
  </div>
  <div style="background: #111122; border: 1px solid #334155; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
    <span style="background: #a855f7; color: #fff; padding: 2px 8px; font-size: 12px; font-weight: bold; border-radius: 4px;">ШАГ 2</span>
    <h4 style="font-size: 18px; color: #fff; margin: 10px 0;">Проверка сообщений и ссылок</h4>
    <div style="margin-left: 10px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #ef4444;">❌ Вариант А:</strong> Открывать вложения и ссылки от неизвестных отправителей.
      </div>
      <div>
        <strong style="color: #22c55e;">✅ Вариант Б:</strong> Проверять адрес отправителя, домен сайта и содержание сообщения перед открытием файлов.
      </div>
    </div>
  </div>
  <div style="background: #111122; border: 1px solid #334155; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
    <span style="background: #06b6d4; color: #000; padding: 2px 8px; font-size: 12px; font-weight: bold; border-radius: 4px;">ШАГ 3</span>
    <h4 style="font-size: 18px; color: #fff; margin: 10px 0;">Обновление систем</h4>
    <div style="margin-left: 10px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #ef4444;">❌ Вариант А:</strong> Игнорировать обновления операционной системы и программ.
      </div>
      <div>
        <strong style="color: #22c55e;">✅ Вариант Б:</strong> Устанавливать обновления безопасности сразу после их выпуска.
      </div>
    </div>
  </div>
  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Реальные кейсы
  </h3>
  <ul style="padding-left: 24px; margin-bottom: 20px; list-style-type: square; color: #cbd5e1;">
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">Colonial Pipeline (2021):</strong>
      Крупнейшая топливная сеть США была вынуждена остановить часть операций после компрометации учётной записи VPN.
    </li>
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">MGM Resorts (2023):</strong>
      Злоумышленники получили доступ к внутренним системам компании через методы социальной инженерии.
    </li>
    <li style="margin-bottom: 12px;">
      <strong style="color: #fff;">MOVEit Transfer (2023):</strong>
      Уязвимость в системе передачи файлов привела к компрометации данных сотен организаций по всему миру.
    </li>
  </ul>
  <h3 style="font-size: 22px; color: #a855f7; margin-top: 32px;">
    Практика цифровой безопасности
  </h3>
  <ul style="padding-left: 24px; margin-bottom: 20px;">
    <li>Используйте менеджер паролей.</li>
    <li>Включайте многофакторную аутентификацию.</li>
    <li>Не открывайте подозрительные вложения.</li>
    <li>Проверяйте адреса сайтов перед вводом данных.</li>
    <li>Регулярно обновляйте устройства и приложения.</li>
    <li>Создавайте резервные копии важных данных.</li>
    <li>Ограничивайте доступ к конфиденциальной информации.</li>
  </ul>
  <h3 style="font-size: 22px; color: #22d3ee; margin-top: 32px;">
    Что показывают исследования
  </h3>
  <ul style="padding-left: 24px; margin-bottom: 20px;">
    <li>По данным Verizon DBIR, человеческий фактор остаётся одним из главных элементов большинства инцидентов безопасности.</li>
    <li>Фишинг и кража учётных данных стабильно входят в число наиболее распространённых способов первоначального доступа.</li>
    <li>Многофакторная аутентификация значительно снижает риск компрометации аккаунтов.</li>
    <li>Большая часть известных атак использует уже обнаруженные и опубликованные уязвимости, для которых существуют исправления.</li>
  </ul>
  <p style="font-size: 15px; color: #64748b; text-align: center; margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px;">
    Материал подготовлен аналитическим отделом КиберэдэН.<br>
    Кибербезопасность — это не продукт и не программа. Это постоянный процесс управления рисками.
  </p>
</div>
`,
  readTime: 8
},
];

export type Event = {
  id: string;
  title: string;
  type: "ТРАНСЛЯЦИИ" | "ТУРНИРЫ" | "ХАКАТОНЫ" | "ДЕПЫ";
  date: string;
  location: string;
  description: string;
  streamUrl?: string; // Добавлен необязательный параметр, так как он используется в объектах ниже
};

export const events: Event[] = [
  // ТРАНСЛЯЦИИ
 { 
   id: "e1", 
   title: "This is GameDev", 
   type: "ТРАНСЛЯЦИИ", 
   date: "Everyday", 
   location: "Twitch", 
   description: "Тени неонового кода, ритмы компиляции, холодный расчёт производительности — всё это геймдев. Разбираем архитектуру, создаём HUD-интерфейсы и строим цифровые миры.",
   streamUrl: "https://www.twitch.tv/lana_lux" 
 },
  // ТУРНИРЫ
  { 
   id: "e7", 
   title: "BLAST Slam VII", 
   type: "ТУРНИРЫ", 
   date: "26.05.2026 - 05.06.2026", 
   location: "BLAST Studio · Копенгаген", 
   description: "Арена высшего киберспортивного мастерства активирует протоколы. Холодный расчёт аналитиков, жар бескомпромиссных сражений, ритмы, заставляющие прожимать кнопки на грани рефлексов —всё это станет частью глобального цифрового противостояния.",
   streamUrl: "https://www.twitch.tv/betboom_dota_ru" 
 },
  // ХАКАТОНЫ
  { id: "e13", title: "КиберХак 2027: БЕЗОПАСНОСТЬ БУДУЩЕГО", type: "ХАКАТОНЫ", date: "20.08.2027", location: "Эрарта · Санкт-Петербург", description: "Главный хакатон киберсистемы nazrOS. 48 часов непрерывного кодинга, менторство от топ-специалистов и призовой фонд." },
  { id: "e14", title: "назрОС РазрабКонф 2027", type: "ХАКАТОНЫ", date: "08.09.2027", location: "ЦДП · Москва", description: "Конференция разработчиков киберсистемы nazrOS. Доклады, открытые мастерские, нетворкинг." },
  { id: "e15", title: "ПИКСЕЛИ", type: "ХАКАТОНЫ", date: "02.06.2027", location: "Иннополис · Казань", description: "12-часовой геймджем для инди-разработчиков. Тема объявляется в момент старта." },
  { id: "e16", title: "TWS: Плесетск", type: "ХАКАТОНЫ", date: "06.04.2027 – 12.04.2027", location: "Плесетск · Архангельская область", description: "The Week Space — цифровое космическое событие в рамках Российской недели космоса. Инженеры, дизайнеры, разработчики, медиа-артисты и исследователи собираются в единой среде будущего для обсуждения технологий, космической инфраструктуры и цифровых систем нового поколения." },
  { 
   id: "e17", 
   title: "АРКТИЧЕСКИЙ ПРОТОКОЛ", 
   type: "ХАКАТОНЫ", 
   date: "17.09.2027", 
   location: "Кластер Северного Дизайна · Мурманск", 
   description: "Креативная резиденция для дизайнеров, медиахудожников, музыкантов, разработчиков визуальных систем и цифровых креаторов. Создание арктической эстетики будущего, экспериментальных интерфейсов, цифрового искусства и аудиовизуальных пространств nazrOS." 
  },
  { 
   id: "e18", 
   title: "СИНТЕЗ: ЦИФРОВОЙ СЕЗОН", 
   type: "ХАКАТОНЫ", 
   date: "24.09.2027", 
   location: "IT-парк Цифровая Арктика · Архангельск", 
   description: "Биотехнологическое инженерное мероприятие, посвящённое разработке адаптационных автономных систем жизнеобеспечения для условий Крайнего Севера. Исследования закрытых экосистем, модульных биосред, энергоэффективных комплексов и технологий выживания в экстремальных климатических условиях." 
  },
  // ДЕПЫ
  { id: "e19", title: "PORTAL", type: "ДЕПЫ", date: "2026", location: "· Москваа", description: "Визуальное ядро nazrOS. Интерфейсы, HUD-системы, motion-дизайн и цифровая типографика. «Портал 2030–2050» — главный фестиваль будущего в Москве. Событие соберет лучших ученых, футурологов, разработчиков и звезд электронной сцены. Гостей ждут интерактивные зоны, световые инсталляции и арт-объекты цифрового искусства. Пройдет в августе-сентябре в Сколково или Москино. Вход свободный." },
  { id: "e20", title: "SIGNAL", type: "ДЕПЫ", date: "5 — 7 июня 2026", location: "· Москваа", description: "Трансляции, цифровой журнал, медиа-среда и голос экосистемы nazrOS. Силуэты бетонных цехов,вспышки неонового пламени,вибрации, запускающие скрытые коды нашего сознания — каждая деталь сольется в масштабное технологическое таинство." },
  { 
   id: "e21",
   title: "PIRATE STATION",
   type: "ДЕПЫ",
   date: "31 октября",
   location: "VK Stadium · Москва",
   description: `
<div style="font-family: sans-serif; line-height: 1.8; color: #e0e0e0; background: #0a0a14; padding: 20px; border-radius: 8px;">
  <div style="margin-bottom: 20px; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
    <img src="${northPoster}" alt="Север зовёт" style="width: 100%; height: auto; display: block;" />
  </div>
  <p style="font-size: 16px; margin-bottom: 20px;">
    Мир древних северных мифов вновь откроет врата. Тени арктических духов, холод неоновых огней, ритмы, пробуждающие древние механизмы памяти — всё это станет частью единого цифрового обряда.
  </p>
</div>
`
  },
  { id: "e22", title: "BLACK! FACTORY", type: "ДЕПЫ", date: "...", location: "Station B · Киев", description: "Экспериментальные технологии, фантомные концепты и прототипирование будущих систем nazrOS. Пространство жестких ритмов и монохромной эстетики раздвигает свои границы.Тюнинг механических систем,вспышки стробоскопического пламени,вибрации, запускающие скрытые коды нашего сознания —каждая деталь сольется в масштабное аудиовизуальное таинство." },
  { id: "e23", title: "CXEMA", type: "ДЕПЫ", date: "...", location: "Otel' · Киев", description: "Серверные системы, сборка устройств, аппаратные платформы, ЦОДы и инженерная инфраструктура nazrOS. Пространство локального андеграунда раздвигает свои границы.Бетонные стены секретных локаций,вспышки холодного пламени,вибрации, запускающие скрытые коды нашего сознания —каждая деталь сольется в масштабное техно-таинство." },
  { id: "e24", title: "LOSHADKA", type: "ДЕПЫ", date: "...", location: "... · Санкт-Петербург", description: "Архитектура мышления среды, протоколы взаимодействия и системная философия nazrOS. Пространство безумного эпатажа раздвигает свои границы.Блеск виниловых костюмов,вспышки неонового пламени,вибрации, запускающие скрытые коды нашего сознания —каждая деталь сольется в масштабное фрик-таинство." },
  { id: "e25", title: "TRIP", type: "ДЕПЫ", date: "...", location: "... · ...", description: "Экспедиции, полевые исследования, цифровые маршруты, северные протоколы автономные выезды, аудиовизуальные хроники nazrOS. Пространство биотехнологического погружения раздвигает свои границы. Психоделические текстуры,вспышки неонового пламени,вибрации, запускающие скрытые коды и умыслы нашего сознания. Каждая деталь сольется в масштабное звуковое таинство." },
  { id: "e26", title: "GAMMA", type: "ДЕПЫ", date: "03.07.2026 –06.07.2026", location: "ТехноПарк Степан Разин · Санкт-Петербург", description: "Полигон симуляций nazrOS. Пространство тотального искусства раздвигает свои границы.Стены старинного пивоваренного завода,вспышки масштабного пламени,вибрации, запускающие скрытые коды нашего сознания —каждая деталь сольется в юбилейное технологическое таинство." },
  { id: "e27", title: "PRESENT PERFECT", type: "ДЕПЫ", date: "2026", location: "К-30 · Санкт-Петербург", description: "Нарратив и связь nazrOS. Пространство современной электронной культуры раздвигает свои границы.Береговая линия Финского залива,вспышки неонового пламени,вибрации, запускающие скрытые коды нашего сознания —каждая деталь сольется в главное летнее таинство." },
  { id: "e28", title: "System108", type: "ДЕПЫ", date: "06.06.2026", location: "Blank · Санкт-Петербург", description: "Экспериментальные режимы системы, нестандартные интерфейсы, психоцифровые состояния, генеративные среды, аудиореактивные пространства, исследование восприятия nazrOS. Пространство концептуального танцевального андеграунда раздвигает свои границы.Индустриальные конструкции мегаполиса,вспышки стробоскопического пламени,вибрации, запускающие скрытые коды нашего сознания —каждая деталь сольется в масштабное musical-таинство." },
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
  "Объёмные модели",
  "Медиа модули",
  "Цифровые протоколы",
  "Цифровые сущности",
  "Стрим-файлы КиберэдэН",
  "Модели игровых движоков",
  "Файлы разработчиков игр",
  "ИИ-боты",
  "Пространства и уровни",
  "Кинематографические файлы"
];

export const datacenterAssets: Asset[] = [
  // Цифровые артефакты
  { id: "a1", name: "Интерфейс Спутникого терминал Сфера", category: "Цифровые артефакты", format: "SVG", size: "245 MB", xp: 1500, badge: "ALPHA" },
];
