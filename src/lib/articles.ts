// src/lib/articles.ts
// Публикации журнала CyberEden.
// Добавить статью — вставь объект в конец массива перед ];
//
// Доступные топики:
// "Кибербезопасность" | "Геймдев" | "Киберспорт" | "Хакинг" | "Цифровая этика"

import type { Article } from "@/lib/mockData";
import claudecode from "@/assets/claudecode.png";
import clonfull from "@/assets/clonfull.png";
import enginedayN from "@/assets/enginedayN.png";
import freshN from "@/assets/freshN.png";
import iotjur from "@/assets/iotjur.png";
import modeN from "@/assets/modeN.png";
import rusdarknet from "@/assets/rusdarknet.png";
import socialf from "@/assets/socialF.png";
import sporN from "@/assets/sporN.png";
import technroomN from "@/assets/technroomN.png";

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
<p>Если вы когда-нибудь делали игру, вы знаете этот путь: модель в Blender, текстуры в Substance Painter, анимация в Maya, звук в Ableton, сборка в Unreal. Каждый шаг — это экспорт, импорт, конвертация, потеря данных.</p>
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
<p>В этой серии обзоров мы разберём каждый модуль страННо через призму <strong>геймдева</strong>: как лепить персонажей в «Руках», как настраивать AI в «Поле», как делать взрывы в «Глюке» и как генерировать бесконечные миры в «Колодце».</p>
<p>страННо — это не просто игровой движок. Это <strong>новый способ думать о разработке игр и создании киновселенных</strong>.</p>
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
}, 

{
  "id": "a52",
  "title": "Модуль «Глюк»: VFX для игр от частиц до разрушений",
  "topic": "Геймдев",
  "excerpt": "Как в страННо рождаются взрывы, дым, магия и погодные эффекты — и почему это работает без экспорта в другие программы.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Глюк»: VFX для игр от частиц до разрушений</h2>

<p>У игры есть физика — она даёт ощущение веса. Есть логика — она даёт правила. Но есть <strong>зрелище</strong>. Именно за него отвечает модуль <strong style="color:#fb923c;">«Глюк»</strong>.</p>

<p>«Глюк» — это система визуальных эффектов, встроенная в страННо. Здесь рождаются взрывы, дым, магические заклинания, световые вспышки, погодные явления и цифровые глитчи. И всё это <strong>без единого экспорта</strong> в сторонние программы.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Глюк» — это не плагин. Это слой, на котором строится визуальный язык игры.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри «Глюка»</h3>

<p>Модуль охватывает все уровни визуальной выразительности:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Системы частиц</strong> — для дыма, огня, искр, пыли, магии, снега, дождя.</li>
<li><strong style="color:#fb923c;">Динамические эффекты</strong> — взрывы, разрушения, разрывы, вспышки.</li>
<li><strong style="color:#fb923c;">Погодные системы</strong> — ливень, туман, метель, гроза.</li>
<li><strong style="color:#fb923c;">Постобработка</strong> — свечение, размытие, глитч, хроматическая аберрация.</li>
<li><strong style="color:#fb923c;">Световые эффекты</strong> — неоновые контуры, импульсное освещение, лазеры.</li>
</ul>

<p>Все эффекты настраиваются в реальном времени: параметры частиц, силы, цвета и траектории можно менять прямо во время тестового прохождения.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает в геймдеве</h3>

<p>Представьте, что вы делаете сцену с взрывом:</p>

<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Вы открываете «Глюк» и создаёте систему частиц.</li>
<li>Настраиваете форму, цвет, скорость и разлёт частиц.</li>
<li>Указываете триггер — например, событие из «Поля» (нажатие кнопки или гибель врага).</li>
<li>Сценарий готов: при взрыве частицы разлетаются, свет вспыхивает, и всё это происходит в реальном времени.</li>
</ol>

<p>В классическом пайплайне это выглядело бы так: Blender → Unity → настройка эффекта через отдельный плагин. В страННо — <strong>один модуль, одна сцена, один клик</strong>.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Эффект, созданный в «Глюке», сразу готов к геймплею. Ему не нужно переходить через этап экспорта.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно для инди-команд</h3>

<p>Визуальные эффекты часто становятся «последним штрихом», который откладывают до самого конца проекта. Потому что для них нужны либо дорогие ассеты, либо отдельные специалисты.</p>

<p>«Глюк» меняет это: благодаря встроенной системе частиц и постобработки, разработчик может создавать зрелищные сцены <strong>без внешних зависимостей</strong>.</p>

<p>В следующей статье мы разберём модуль <strong style="color:#fb923c;">«Колодец»</strong> — процедурную генерацию миров, которая позволяет создавать бесконечные ландшафты и подземелья.</p>
</div>`
}, 

{
  "id": "a53",
  "title": "Модуль «Колодец»: процедурная генерация миров без ручной расстановки",
  "topic": "Геймдев",
  "excerpt": "Как страННо создаёт бесконечные ландшафты, города и подземелья с помощью алгоритмов, а не кистей.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Колодец»: процедурная генерация миров без ручной расстановки</h2>

<p>В мире геймдева есть два подхода к созданию пространств: <strong>ручной</strong> и <strong>процедурный</strong>. Первый даёт контроль, но отнимает недели. Второй даёт масштаб, но требует сложных алгоритмов.</p>

<p>В страННо за второй подход отвечает модуль <strong style="color:#fb923c;">«Колодец»</strong>.</p>

<p>«Колодец» — это система процедурной генерации, встроенная в движок. Она создаёт ландшафты, города, пещеры и целые миры <strong>по математическим правилам</strong>, а не по кистям художника.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Колодец» не рисует мир. Он выращивает его по заданным параметрам.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри «Колодца»</h3>

<p>Модуль включает несколько слоёв генерации:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Ландшафты</strong> — горы, равнины, реки, океаны, созданные на основе шумов Перлина и алгоритмов эрозии.</li>
<li><strong style="color:#fb923c;">Города и поселения</strong> — процедурная расстановка зданий, дорог, освещения и зелёных зон.</li>
<li><strong style="color:#fb923c;">Подземелья</strong> — пещеры, коридоры, комнаты, созданные с помощью алгоритмов BSP (Binary Space Partitioning).</li>
<li><strong style="color:#fb923c;">Растительность</strong> — деревья, кусты, трава, распределённые по климатическим зонам.</li>
<li><strong style="color:#fb923c;">Текстуры</strong> — процедурное создание материалов прямо на основе рельефа (скалы, песок, снег, трава).</li>
</ul>

<p>Каждый слой можно настраивать отдельно: плотность, масштаб, случайность, правила размещения.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает в геймдеве</h3>

<p>Вы хотите создать открытый мир для RPG. Вместо того чтобы расставлять каждый камень вручную, вы делаете так:</p>

<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Открываете «Колодец» и задаёте параметры: размер мира, тип биома (лес, пустыня, тундра).</li>
<li>Выбираете плотность гор и рек, процент зданий и растительности.</li>
<li>Нажимаете «Сгенерировать» — мир появляется за несколько секунд.</li>
<li>Вы можете вносить правки вручную поверх процедурной основы (добавить город, убрать дерево).</li>
</ol>

<p>Такой подход позволяет создавать <strong>бесконечные миры</strong> за время, которое раньше уходило на одну комнату.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«В «Колодце» нет понятия «закончить». Есть понятие «настроить параметры заново».»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно для инди-команд</h3>

<p>Процедурная генерация часто воспринимается как что-то сложное, доступное только большим студиям. «Колодец» делает её <strong>инструментом для любого разработчика</strong>.</p>

<p>Геймдизайнер может быстро создавать прототипы уровней без участия художника. Художник может сгенерировать основу и дорабатывать детали вручную. А разработчик может менять параметры прямо в процессе тестирования.</p>

<p>В следующей статье мы разберём модуль <strong style="color:#fb923c;">«Студия»</strong> — цифровое кинопроизводство и монтаж прямо внутри страННо.</p>
</div>`
}, 

{
  "id": "a54",
  "title": "Модуль «Студия»: цифровое кинопроизводство и монтаж без выхода из движка",
  "topic": "Геймдев",
  "excerpt": "Как страННо позволяет снимать кат-сцены, монтировать трейлеры и делать финальный рендер, не покидая рабочей сцены.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Студия»: цифровое кинопроизводство и монтаж без выхода из движка</h2>

<p>Игра — это не только геймплей. Это ещё и <strong>подача</strong>. Кат-сцены, трейлеры, титры, вступления. Всё это создаёт первое впечатление и удерживает внимание игрока.</p>

<p>В классическом пайплайне для этого нужно было выходить из движка, открывать отдельный редактор монтажа и заново собирать сцену. В страННо этот этап происходит внутри модуля <strong style="color:#fb923c;">«Студия»</strong>.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Студия» превращает страННо в полноценный кинематографический конвейер.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри «Студии»</h3>

<p>Модуль включает все инструменты, необходимые для цифрового кинопроизводства:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Виртуальные павильоны</strong> — готовые сцены с освещением, камерами и декорациями.</li>
<li><strong style="color:#fb923c;">Система камер</strong> — управление фокусным расстоянием, глубиной резкости, движением по заданным траекториям.</li>
<li><strong style="color:#fb923c;">Световые установки</strong> — точечные, направленные, объёмные источники света с реалистичной физикой.</li>
<li><strong style="color:#fb923c;">Монтажный таймлайн</strong> — нелинейный монтаж с дорожками для видео, звука, титров и эффектов.</li>
<li><strong style="color:#fb923c;">Цветокоррекция</strong> — настройка цветовых профилей, LUT, контраста и насыщенности прямо в реальном времени.</li>
<li><strong style="color:#fb923c;">Синхронизация с игрой</strong> — кат-сцены могут запускаться по триггерам из «Поля» и использовать персонажей и локации из текущего проекта.</li>
</ul>

<p>Все инструменты работают на единой сцене — те же персонажи, те же текстуры, то же освещение, что и в игровых уровнях.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает в геймдеве</h3>

<p>Вы делаете RPG и хотите добавить эффектное вступление:</p>

<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Открываете «Студию» на той же сцене, где находится ваш главный герой.</li>
<li>Настраиваете камеру, добавляете движение по кругу, меняете фокус.</li>
<li>Добавляете диалоговые реплики на аудио-дорожку.</li>
<li>Настраиваете цветокоррекцию — например, тёплый вечерний свет.</li>
<li>Сохраняете кат-сцену как отдельный ассет, который запускается в «Поле» по триггеру.</li>
</ol>

<p>Всё это делается <strong>внутри одного пространства</strong>, без экспорта видео в сторонние редакторы.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Студия» делает разработчика и режиссёра одним лицом.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно для инди-команд</h3>

<p>Кат-сцены часто становятся «дорогим удовольствием», которое отдают внешним студиям или откладывают на потом. «Студия» делает их <strong>доступными каждому</strong>.</p>

<p>Геймдизайнер может сам собрать трейлер для Steam без участия видеомонтажёра. А разработчик может проверить, как выглядит сцена, прямо во время тестирования геймплея.</p>

<p>В следующей статье мы разберём модуль <strong style="color:#fb923c;">«Точки»</strong> — нодовый композитинг и шейдеры в реальном времени.</p>
</div>`
}, 

{
  "id": "a55",
  "title": "Модуль «Точки»: нодовый композитинг и шейдеры в реальном времени",
  "topic": "Геймдев",
  "excerpt": "Как в страННо создаются визуальные эффекты и материалы через визуальные ноды, а не через строки кода.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Точки»: нодовый композитинг и шейдеры в реальном времени</h2>

<p>В играх визуальный стиль часто определяется не только моделями и текстурами, но и тем, <strong>как свет взаимодействует с поверхностью</strong>. Именно это создаёт ощущение реализма или, наоборот, стилизации.</p>

<p>В страННо за создание материалов, шейдеров и композитных эффектов отвечает модуль <strong style="color:#fb923c;">«Точки»</strong>.</p>

<p>«Точки» — это нодовая система, где визуальные эффекты собираются из блоков, а не пишутся на языках шейдеров. Это делает создание материалов доступным для художников и геймдизайнеров.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Точки» превращают шейдеры в визуальный конструктор, а не в головоломку для программиста.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри «Точек»</h3>

<p>Модуль включает все необходимые инструменты для работы с материалами и эффектами:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Нодовая система</strong> — визуальное программирование шейдеров через соединение блоков (узлов).</li>
<li><strong style="color:#fb923c;">Создание материалов</strong> — настройка цвета, отражения, шероховатости, прозрачности, эмиссии.</li>
<li><strong style="color:#fb923c;">Процедурные текстуры</strong> — генерация текстур (шум, волны, клетки) прямо внутри нодового графа.</li>
<li><strong style="color:#fb923c;">Композитинг</strong> — наложение слоёв, смешивание, маскирование, цветокоррекция в реальном времени.</li>
<li><strong style="color:#fb923c;">Интеграция с «Глюком»</strong> — шейдеры могут управлять частицами и эффектами прямо из нодов.</li>
</ul>

<p>Каждый нод имеет настраиваемые параметры, а результат отображается на сцене в реальном времени.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает в геймдеве</h3>

<p>Вы хотите создать материал для магического кристалла:</p>

<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Открываете «Точки» и создаёте новый материал.</li>
<li>Добавляете нод для цвета, нод для свечения (эмиссии), нод для прозрачности.</li>
<li>Соединяете их в единый граф.</li>
<li>Подключаете процедурную текстуру (например, шум) для создания мерцания.</li>
<li>Применяете материал к объекту на сцене — кристалл начинает светиться.</li>
</ol>

<p>Всё это происходит <strong>без написания ни одной строки кода</strong>.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Точки» дают художнику контроль над тем, что раньше было доступно только программистам.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно для инди-команд</h3>

<p>Шейдеры часто становятся барьером: художники не умеют их писать, а программисты не умеют их визуально настраивать. «Точки» стирают этот барьер.</p>

<p>Геймдизайнер может прототипировать визуальные эффекты без программиста. А программист может создавать сложные шейдеры, не отвлекаясь на синтаксис языков.</p>

<p>В следующей статье мы разберём модуль <strong style="color:#fb923c;">«Шина»</strong> — музыкальную и аудио-среду страННо.</p>
</div>`
}, 

{
  "id": "a56",
  "title": "Модуль «Шина»: музыка и пространственный звук прямо в движке",
  "topic": "Геймдев",
  "excerpt": "Как страННо создаёт игровые саундтреки, звуки окружения и пространственный аудио без выхода из проекта.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Модуль «Шина»: музыка и пространственный звук прямо в движке</h2>

<p>Игра — это не только картинка. Это ещё и <strong>звук</strong>. Шаги, ветер, музыка, диалоги, взрывы. Всё это создаёт атмосферу и удерживает игрока внутри мира.</p>

<p>В страННо за звук отвечает модуль <strong style="color:#fb923c;">«Шина»</strong>.</p>

<p>«Шина» — это полноценная аудио-среда, встроенная в движок. Она позволяет создавать музыку, звуковые эффекты и пространственное аудио <strong>внутри одного проекта</strong>, без импорта и экспорта.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Шина» делает звук такой же частью проекта, как модели или текстуры.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри «Шины»</h3>

<p>Модуль включает все инструменты для работы со звуком:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">Синтезаторы</strong> — генерация звуков с нуля (волны, шумы, импульсы).</li>
<li><strong style="color:#fb923c;">Пространственный звук</strong> — позиционирование источников звука в 3D-пространстве (затухание, панорамирование, отражения).</li>
<li><strong style="color:#fb923c;">Аудио-эффекты</strong> — реверберация, дисторшн, эквалайзер, сжатие.</li>
<li><strong style="color:#fb923c;">Музыкальные дорожки</strong> — создание саундтреков с помощью встроенного секвенсора.</li>
<li><strong style="color:#fb923c;">Интеграция с геймплеем</strong> — звуки могут запускаться по событиям из «Поля» (шаги, выстрелы, диалоги).</li>
</ul>

<p>Все звуки синхронизируются с визуальной сценой в реальном времени.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает в геймдеве</h3>

<p>Вы делаете хоррор-игру и хотите создать атмосферу страха:</p>

<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Открываете «Шину» и создаёте аудио-сцену.</li>
<li>Добавляете источник звука, например, синтезированный низкочастотный гул.</li>
<li>Позиционируете его в пространстве — он будет звучать громче, когда игрок приближается.</li>
<li>Настраиваете эффекты: реверберацию для пещеры, дисторшн для напряжения.</li>
<li>Сохраняете сцену и подключаете её к событиям в «Поле» (например, при входе в комнату).</li>
</ol>

<p>Всё это делается <strong>внутри одного пространства</strong>, без экспорта звуков в сторонние редакторы.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">««Шина» позволяет делать звук, который реагирует на то, что происходит на сцене.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно для инди-команд</h3>

<p>Звук часто становится «последним этапом», который отдают на аутсорс или делают в последний момент. «Шина» делает его <strong>доступным каждому</strong>.</p>

<p>Геймдизайнер может быстро создать звук для прототипа без звукорежиссёра. А разработчик может проверить, как звук синхронизируется с событиями, прямо во время тестирования.</p>

<p>В следующей статье мы соберём всё вместе и покажем, как модули страННо работают как <strong>единый игровой движок</strong>.</p>
</div>`
}, 

{
  "id": "a57",
  "title": "страННо как единый игровой движок: итоговый разбор",
  "topic": "Геймдев",
  "excerpt": "Почему страННо — это не просто набор модулей, а полноценный движок для создания игр, где всё связано в единую экосистему.",
  "readTime": 8,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">страННо как единый игровой движок: итоговый разбор</h2>

<p>Мы прошли через девять модулей страННо: <strong style="color:#fb923c;">«Руки»</strong>, <strong style="color:#fb923c;">«Мульт»</strong>, <strong style="color:#fb923c;">«Поле»</strong>, <strong style="color:#fb923c;">«Яблочко»</strong>, <strong style="color:#fb923c;">«Глюк»</strong>, <strong style="color:#fb923c;">«Колодец»</strong>, <strong style="color:#fb923c;">«Студия»</strong>, <strong style="color:#fb923c;">«Точки»</strong>, <strong style="color:#fb923c;">«Шина»</strong>. Каждый из них решает свою задачу. Но вместе они создают то, чего нет ни в одном другом инструменте: <strong>единый игровой движок</strong>.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«страННо не заменяет отдельные программы. Он заменяет необходимость в них.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Один пайплайн — одна игра</h3>

<p>Вспомним классический путь создания игры:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Модель в Blender.</li>
<li>Анимация в Maya.</li>
<li>Текстуры в Substance Painter.</li>
<li>Звук в Pro Tools.</li>
<li>Сборка в Unreal.</li>
<li>Кат-сцены в Premiere.</li>
</ul>

<p>Между каждым шагом — экспорт, импорт, конвертация, потеря данных. Это не просто долго. Это <strong>системная проблема</strong>.</p>

<p>В страННо этот путь выглядит так:</p>

<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong style="color:#fb923c;">«Руки»</strong> — создаёте модель.</li>
<li><strong style="color:#fb923c;">«Мульт»</strong> — оживляете её.</li>
<li><strong style="color:#fb923c;">«Колодец»</strong> — генерируете мир.</li>
<li><strong style="color:#fb923c;">«Поле»</strong> — пишете логику.</li>
<li><strong style="color:#fb923c;">«Яблочко»</strong> — добавляете физику.</li>
<li><strong style="color:#fb923c;">«Глюк»</strong> — накладываете эффекты.</li>
<li><strong style="color:#fb923c;">«Точки»</strong> — настраиваете шейдеры.</li>
<li><strong style="color:#fb923c;">«Шина»</strong> — добавляете звук.</li>
<li><strong style="color:#fb923c;">«Студия»</strong> — собираете кат-сцены.</li>
</ol>

<p>И всё это <strong>внутри одного пространства</strong>. Никаких экспортов, никаких импортов, никаких потерь данных.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«В страННо нет разрыва между этапами. Есть только продолжение.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это меняет геймдев</h3>

<p>Для инди-команды из 1–3 человек каждый час, потраченный на конвертацию, — это час, не потраченный на геймплей. страННо возвращает это время.</p>

<p>Для большой студии страННо означает, что художник, аниматор, звукорежиссёр и геймдизайнер могут работать над одной сценой <strong>в реальном времени</strong>, без ожидания импортов и конфликтов версий.</p>

<p>Это не просто «сборка в одном окне». Это <strong>другой способ думать о разработке игр</strong>.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что дальше</h3>

<p>Мы показали, как страННо работает сейчас. Но это только начало.</p>

<p>В следующих публикациях мы расскажем:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Как страННо подключается к <strong style="color:#fb923c;">языку Союз</strong> для написания сложной логики.</li>
<li>Как мы внедряем <strong style="color:#fb923c;">облачный рендеринг</strong> для тяжёлых проектов.</li>
<li>Как <strong style="color:#fb923c;">Web-Native</strong> и <strong style="color:#fb923c;">Application Streaming</strong> делают движок доступным на любом устройстве.</li>
</ul>

<p>страННо — это не просто следующий редактор. Это <strong>новый стандарт того, как мы создаём цифровые миры</strong>.</p>
</div>`
},
{
  "id": "c1",
  "title": "КефирННо: единый чат, который сам раскладывает мысли",
  "topic": "КефирННо",
  "excerpt": "Почему мы перестали создавать отдельные чаты и сделали одного ИИ-агента, который сам распределяет всё по проектам.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">КефирННо: единый чат, который сам раскладывает мысли</h2>

<p>ChatGPT, DeepSeek, Claude — у них есть одна общая проблема: <strong>каждая тема требует отдельного чата</strong>.</p>

<p>Ты обсуждаешь дизайн «Атома» — создаёшь чат. Ты пишешь код для страННо — новый чат. Ты говоришь с заказчиком — ещё один чат. Через месяц у тебя 40 чатов, и ты не помнишь, где лежало важное решение.</p>

<p>КефирННо решает эту проблему кардинально.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«В КефирННо есть <strong>один чат</strong>. Всё остальное делает ИИ.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает</h3>

<p>Ты открываешь КефирННо и говоришь с Аджной — ИИ-агентом, который понимает контекст. Ты можешь обсуждать всё в одном потоке: от философии до кода.</p>

<p>Аджна <strong>автоматически</strong> определяет, к какому проекту или теме относится твой запрос. Она не просто отвечает — она <strong>структурирует</strong>.</p>

<p>В конце разговора ты видишь:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Мысли и идеи — распределёнными по проектам.</li>
<li>Людей, с которыми ты обсуждал тему (даже из разных мессенджеров).</li>
<li>Файлы, ссылки и генерации — в разделе «Артефакты».</li>
<li>Визуальную карту, где всё это связано.</li>
</ul>

<p>Ты не создаёшь отдельные чаты. Ты не управляешь структурой — система строит её за тебя.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«КефирННо — это не ИИ-чат. Это <strong>ИИ-агент, который умеет раскладывать мысли по полочкам</strong>.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Пример из жизни</h3>

<p>Представь: ты обсуждаешь DeepSeek с пятью людьми в разных местах — в Telegram, VK, по почте, в SMS.</p>

<p>КефирННо собирает все диалоги, Аджна анализирует их, и в конце недели ты видишь:</p>
<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Карту с нодами: «DeepSeek» и имена твоих собеседников.</li>
<li>Сжатую выжимку — о чём говорили и к каким выводам пришли.</li>
<li>Ссылки и файлы — в разделе «Артефакты».</li>
<li>Генерации — в разделе «Проекты».</li>
</ol>

<p>Ты не ищешь информацию. Ты <strong>видишь</strong> её.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что в этом цикле</h3>

<p>В следующих публикациях мы разберём, как Аджна определяет темы, как диалоги превращаются в проекты, как выглядит визуализация мыслей, и почему КефирННо — это не очередной чат-бот, а <strong>новый способ думать</strong>.</p>
</div>`
},
{
  "id": "c2",
  "title": "Аджна: как ИИ-агент понимает, о чём ты говоришь",
  "topic": "КефирННо",
  "excerpt": "Знакомство с Аджной — ИИ-агентом, который живёт внутри КефирННо и понимает твой язык лучше, чем ты сам.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Аджна: как ИИ-агент понимает, о чём ты говоришь</h2>

<p>Аджна — это ИИ-агент, встроенный в КефирННо. Она не просто отвечает — она <strong>понимает</strong>.</p>

<p>В отличие от обычного чат-бота, Аджна знает, какие у тебя проекты, с кем ты общаешься и что для тебя важно. Она видит твой граф знаний и <strong>автоматически</strong> определяет, куда направить твоё сообщение.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Аджна не просто болтает. Она <strong>раскладывает</strong> твои мысли по полочкам.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как она понимает, о чём ты говоришь</h3>

<p>Каждое твоё сообщение проходит через <strong>Intent Classifier</strong> — классификатор намерений. Это специальный слой, который определяет, что ты хочешь сделать:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong>Создать:</strong> ты хочешь добавить новую идею или начать проект.</li>
<li><strong>Поиск:</strong> ты ищешь что-то из прошлого.</li>
<li><strong>Связать:</strong> ты хочешь соединить две сущности.</li>
<li><strong>Обобщить:</strong> ты просишь выжимку по теме.</li>
<li><strong>Архивировать:</strong> ты закрываешь тему.</li>
</ul>

<p>После классификации Аджна направляет твоё сообщение в нужное русло: создаёт ноду, добавляет связь или генерирует текст.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как она знает, что с чем связано</h3>

<p>Аджна использует <strong>граф знаний</strong> — сеть связей между всеми твоими мыслями, людьми и проектами.</p>

<p>Когда ты говоришь «DeepSeek», она не просто ищет это слово. Она смотрит, с кем ты обсуждал эту тему, какие файлы прикреплял, какие выводы делал. И <strong>строит связи</strong> между ними.</p>

<p>Зачем тебе Аджна? Ты можешь говорить с ней о чём угодно. Она не создаёт для каждой темы отдельный чат — она просто <strong>раскладывает</strong> всё по нужным полкам.</p>

<p>В конце дня ты открываешь КефирННо и видишь <strong>визуализацию</strong> того, как твои мысли сложились в единую картину.</p>

<p>Аджна — это не просто ИИ. Это <strong>твой второй мозг, который всегда помнит, что для тебя важно</strong>.</p>

<p>В следующей публикации мы разберём <strong style="color:#fb923c;">«Поток»</strong> — ленту, где ты видишь всё, что происходило в твоём цифровом мире.</p>
</div>`
},
 {
  "id": "c3",
  "title": "Поток: куда попадает всё, что ты сказал",
  "topic": "КефирННо",
  "excerpt": "Визуальная лента, где ты видишь, как твои мысли, диалоги и файлы складываются в единую картину.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Поток: куда попадает всё, что ты сказал</h2>

<p>Ты говоришь с Аджной. Она понимает, о чём ты. Но куда девается весь этот разговор?</p>

<p>В КефирННо ответ на этот вопрос называется <strong style="color:#fb923c;">«Поток»</strong>.</p>

<p>Поток — это визуальная лента, в которую собираются все твои взаимодействия с системой. Ты не управляешь ею — ты просто <strong>наблюдаешь</strong>, как твои мысли и диалоги превращаются в структуру.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Поток — это зеркало твоего цифрового сознания.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что видно в Потоке</h3>

<p>Поток отображает не просто список сообщений. Это <strong>смысловая лента</strong>, которая группирует события:</p>

<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Новые мысли, которые ты записал.</li>
<li>Диалоги с людьми, которые были обработаны.</li>
<li>Документы, которые ты загрузил.</li>
<li>Связи, которые автоматически построила Аджна.</li>
</ul>

<p>Каждый элемент в Потоке — это <strong>событие</strong>. Оно связано с проектом, человеком или темой.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно</h3>

<p>В классических приложениях ты видишь только один срез: список сообщений, список файлов, список проектов. Поток показывает <strong>всё вместе</strong>.</p>

<p>Ты можешь увидеть, как твой утренний диалог с коллегой превратился в документ, а вечерняя заметка — в новый проект. Ты видишь <strong>эволюцию</strong> своих мыслей.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Поток не требует от тебя сортировки. Он просто показывает, что произошло.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Пример с DeepSeek</h3>

<p>Представь, что ты обсуждаешь DeepSeek с пятью людьми. В Потоке это будет выглядеть как:</p>
<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Нода «DeepSeek» появляется в ленте.</li>
<li>К ней прикрепляются твои диалоги с каждым собеседником.</li>
<li>Автоматически появляются ссылки и файлы.</li>
<li>Аджна формирует краткую выжимку.</li>
</ol>

<p>Ты не открываешь каждую переписку отдельно. Ты <strong>видишь</strong> всю картину целиком.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что дальше</h3>

<p>В следующей публикации мы разберём, как Поток превращается в <strong style="color:#fb923c;">«Проекты»</strong> — структурированные контейнеры для твоих мыслей.</p>
</div>`
},
 {
  "id": "c4",
  "title": "Проекты: как диалоги превращаются в структуру",
  "topic": "КефирННо",
  "excerpt": "Из хаоса переписок рождаются проекты — автоматически, без твоего участия.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Проекты: как диалоги превращаются в структуру</h2>

<p>В Потоке ты видишь, что происходит. Но по-настоящему ценной информация становится, когда она собирается в <strong>проекты</strong>.</p>

<p>Проекты в КефирННо — это не папки, которые ты создаёшь вручную. Это <strong>автоматические контейнеры</strong>, которые Аджна формирует на основе твоих диалогов, файлов и тем.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Каждый проект — это живая сущность. Он растёт по мере того, как ты говоришь.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как создаются проекты</h3>

<p>Когда Аджна анализирует твой диалог, она ищет повторяющиеся темы, упоминания файлов и имена людей. Если она видит, что несколько событий связаны одной темой — она <strong>автоматически создаёт проект</strong>.</p>

<p>Например, ты обсуждаешь DeepSeek с разными людьми. Аджна видит, что все эти диалоги связаны одной темой. Она создаёт проект «DeepSeek» и собирает в него:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Все сообщения из диалогов.</li>
<li>Все файлы и ссылки.</li>
<li>Все выводы и выжимки.</li>
</ul>

<p>Тебе не нужно создавать папку вручную. Проект появляется сам.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что внутри проекта</h3>

<p>Каждый проект содержит:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong>Описание</strong> — выжимка из диалогов.</li>
<li><strong>Участники</strong> — люди, с которыми ты говорил.</li>
<li><strong>Файлы и ссылки</strong> — всё, что прикреплялось.</li>
<li><strong>Хронология</strong> — когда и с кем обсуждалось.</li>
</ul>

<p>Ты можешь редактировать проект: добавлять теги, менять название, вручную привязывать файлы. Но основа — создаётся автоматически.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Проект — это не просто папка. Это <strong>срез твоей цифровой деятельности</strong> по конкретной теме.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это важно</h3>

<p>В классических приложениях ты тратишь время на организацию. Ты создаёшь папки, перетаскиваешь файлы, называешь проекты. КефирННо делает это за тебя.</p>

<p>Твой ум освобождается для того, чтобы <strong>думать</strong>, а не чтобы <strong>организовывать</strong>.</p>

<p>В следующей публикации мы разберём, как проекты связаны с людьми и как Аджна строит граф знаний.</p>
</div>`
},
{
  "id": "c5",
  "title": "Память: граф знаний и связи между людьми",
  "topic": "КефирННо",
  "excerpt": "Как Аджна связывает твой разговор про DeepSeek с конкретным человеком и строит сеть твоих отношений.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Память: граф знаний и связи между людьми</h2>

<p>Проекты — это структура. Но без связей между ними они остаются изолированными островами.</p>

<p>В КефирННо связи строит <strong>Память</strong> — слой, который отвечает за граф знаний и отношения между людьми.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Память — это не архив. Это <strong>живая сеть</strong>, которая растёт с каждым твоим диалогом.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как Память строит связи</h3>

<p>Каждый раз, когда ты обсуждаешь тему с человеком, Аджна фиксирует это как <strong>связь</strong>.</p>

<p>Связь — это не просто «ты говорил с этим человеком». Это:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong>Кто:</strong> имя собеседника.</li>
<li><strong>Что:</strong> тема диалога.</li>
<li><strong>Когда:</strong> время и частота общения.</li>
<li><strong>Результат:</strong> какие выводы и файлы появились.</li>
</ul>

<p>Эти связи накапливаются и формируют <strong>граф знаний</strong>.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что видно в графе знаний</h3>

<p>Ты открываешь раздел «Память» и видишь:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Всех людей, с которыми ты когда-либо общался.</li>
<li>Какие темы ты с ними обсуждал.</li>
<li>Какие проекты родились из этих диалогов.</li>
</ul>

<p>Ты можешь кликнуть на человека и увидеть всю историю ваших взаимодействий: сообщения, файлы, ссылки, проекты.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Пример с DeepSeek</h3>

<p>Ты обсуждаешь DeepSeek с пятью людьми. В графе знаний это выглядит как:</p>
<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Пять нод с именами твоих собеседников.</li>
<li>Каждая нода связана с проектом «DeepSeek».</li>
<li>У каждой связи есть вес — например, «часто», «важно», «недавно».</li>
</ol>

<p>Ты видишь не просто диалоги. Ты видишь <strong>структуру твоих отношений</strong>.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Память — это не хранилище. Это <strong>инструмент для понимания</strong> того, как ты связан с миром.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что дальше</h3>

<p>В следующей публикации мы разберём <strong style="color:#fb923c;">«Артефакты»</strong> — раздел, где хранятся все результаты твоей работы.</p>
</div>`
},
{
  "id": "c6",
  "title": "Артефакты: генерации и результаты работы",
  "topic": "КефирННо",
  "excerpt": "Код, письма, тексты, документы — всё, что ты создал с помощью Аджны, хранится не в чате, а в разделе «Артефакты».",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Артефакты: генерации и результаты работы</h2>

<p>Когда ты просишь Аджну написать код, сгенерировать письмо или создать план — результат её работы не остаётся в чате. Он попадает в раздел <strong style="color:#fb923c;">«Артефакты»</strong>.</p>

<p>Артефакты — это коллекция всех результатов твоей работы с ИИ.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Артефакт — это не просто текст. Это <strong>материализованная мысль</strong>.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что такое артефакт</h3>

<p>Артефактом может быть:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong>Код</strong> — функция на Союзе или Python.</li>
<li><strong>Текст</strong> — готовое письмо, пост, статья.</li>
<li><strong>Документ</strong> — отчёт, спецификация, резюме.</li>
<li><strong>Схема</strong> — нодовая диаграмма или чертёж.</li>
</ul>

<p>Все артефакты хранятся в структурированном виде. Ты можешь их редактировать, переименовывать, экспортировать или отправлять.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему артефакты не в чате</h3>

<p>В классических чат-ботах результат остаётся в ленте сообщений. Ты должен листать историю, чтобы найти его. В КефирННо артефакты вынесены в отдельный раздел.</p>

<p>Ты можешь зайти в «Артефакты» через неделю и найти нужный код или письмо за пару кликов. Они всегда под рукой.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Артефакты — это твоя библиотека результатов. Система помнит, что ты создал.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как артефакты связаны с проектами</h3>

<p>Артефакты не существуют сами по себе. Они привязаны к проектам.</p>

<p>Когда Аджна генерирует артефакт, она автоматически прикрепляет его к проекту, к которому относится диалог. Ты видишь, какой код или письмо появился в каком проекте.</p>

<p>В следующей публикации мы разберём <strong style="color:#fb923c;">«Карту мыслей»</strong> — самую наглядную часть КефирННо.</p>
</div>`
},
 {
  "id": "c7",
  "title": "Карта мыслей: визуализация твоего мышления",
  "topic": "КефирННо",
  "excerpt": "Интерактивная карта, где ты видишь, как связаны твои проекты, люди и артефакты.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Карта мыслей: визуализация твоего мышления</h2>

<p>Проекты. Люди. Артефакты. Поток. Всё это существует в КефирННо. Но <strong>как это всё выглядит вместе</strong>?</p>

<p>Ответ — <strong style="color:#fb923c;">«Карта мыслей»</strong>.</p>

<p>Карта мыслей — это интерактивная визуализация всего твоего цифрового мира. Ты видишь ноды, связи, группы и можешь перемещаться по ним.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Карта мыслей — это не схема. Это <strong>вид на твой разум сверху</strong>.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что видно на карте</h3>

<p>Карта отображает:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong>Проекты</strong> — крупные ноды.</li>
<li><strong>Люди</strong> — связаны с проектами.</li>
<li><strong>Артефакты</strong> — прикреплены к проектам.</li>
<li><strong>Темы</strong> — метки, которые объединяют несколько проектов.</li>
</ul>

<p>Всё это соединено линиями. Ты видишь, как связан проект с человеком, а человек — с артефактом.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Пример с DeepSeek</h3>

<p>На карте это выглядит так:</p>
<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Одна большая нода «Проект DeepSeek» в центре.</li>
<li>От неё идут линии к пяти нодам с именами твоих собеседников.</li>
<li>К проекту прикреплены артефакты: код, письма, заметки.</li>
</ol>

<p>Ты кликаешь на ноду и видишь детали: кто, когда, что.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Зачем тебе карта</h3>

<p>Карта мыслей — это не просто красивый интерфейс. Это <strong>инструмент для навигации</strong>.</p>

<p>Ты можешь:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Быстро найти забытый проект по связям.</li>
<li>Увидеть, с кем ты чаще всего обсуждаешь ту или иную тему.</li>
<li>Понять, как твоя цифровая активность связана в единую картину.</li>
</ul>

<p>Карта мыслей — это твой <strong>командный центр</strong>. Ты видишь, как выглядит твоя цифровая жизнь, прямо сейчас.</p>

<p>В следующей публикации мы разберём <strong style="color:#fb923c;">«Семантический поиск»</strong> — как искать в КефирННо по смыслу, а не по словам.</p>
</div>`
},
{
  "id": "c8",
  "title": "Семантический поиск: почему искать по смыслу лучше, чем по словам",
  "topic": "КефирННо",
  "excerpt": "Как КефирННо находит то, что ты забыл — даже если ты не помнишь точных слов.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Семантический поиск: почему искать по смыслу лучше, чем по словам</h2>

<p>Ты когда-нибудь пытался найти старую переписку, но помнил только «что-то про DeepSeek и какую-то ссылку»? В обычных приложениях ты бы перебирал чаты. В КефирННо ты просто <strong>описываешь суть</strong> — и Аджна находит.</p>

<p>Это называется <strong style="color:#fb923c;">«Семантический поиск»</strong>.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«Ты ищешь не по словам. Ты ищешь по смыслу.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Как это работает</h3>

<p>Вместо того чтобы искать точное совпадение слов, КефирННо превращает твой запрос в <strong>эмбеддинг</strong> — математический вектор, который описывает смысл. Затем он сравнивается с эмбеддингами всех твоих объектов и находит те, которые ближе всего по смыслу.</p>

<p>Ты можешь написать: <em>«найди переписку, где мы обсуждали, почему DeepSeek дешевле OpenAI»</em> — и КефирННо найдёт именно ту переписку, даже если в ней не было слов «дешевле» или «OpenAI».</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Почему это меняет всё</h3>

<p>Ключевые слова — это ограничение. Ты должен точно знать, что искал. Семантический поиск работает иначе: ты описываешь <strong>ситуацию</strong> — система находит <strong>результат</strong>.</p>

<p>Ты можешь искать по:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Ощущению: «тот раз, когда я был зол».</li>
<li>Собеседнику: «всё, что я обсуждал с Сергеем про ИИ».</li>
<li>Теме: «всё про квантовые вычисления».</li>
</ul>

<p>Ты не управляешь структурой. Ты просто <strong>говоришь</strong>, что ищешь.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«КефирННо понимает не твои слова. Он понимает твои намерения.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что дальше</h3>

<p>В следующей публикации мы заглянем <strong>под капот</strong> — как КефирННо обрабатывает диалоги и строит граф знаний на техническом уровне.</p>
</div>`
},
{
  "id": "c9",
  "title": "Как это работает: технический разбор КефирННо",
  "topic": "КефирННо",
  "excerpt": "От мессенджеров до графа знаний: как устроен пайплайн обработки данных и RAG.",
  "readTime": 7,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Как это работает: технический разбор КефирННо</h2>

<p>За красивым интерфейсом и умным ИИ скрывается несколько слоёв, которые превращают хаос в структуру.</p>

<p>КефирННо построен на стеке: <strong>React Native</strong> для приложения, <strong>Supabase</strong> для хранения и <strong>pgvector</strong> для семантического поиска.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«КефирННо — это не магия. Это <strong>слоёная инженерия</strong>.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Пайплайн обработки диалога</h3>

<p>Когда ты отправляешь сообщение в чат, происходит следующее:</p>
<ol style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li><strong>Классификация</strong> — система определяет твоё намерение (создать, найти, связать).</li>
<li><strong>Генерация эмбеддинга</strong> — текст превращается в вектор (через OpenAI или Ollama).</li>
<li><strong>Поиск связей</strong> — pgvector ищет объекты с похожим смыслом.</li>
<li><strong>Принятие решения</strong> — Аджна выбирает, что делать: создать ноду, связать объекты или сгенерировать ответ.</li>
</ol>

<p>Весь процесс занимает от 300 мс до 2 секунд.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Граф знаний и RAG</h3>

<p>Граф знаний хранится в таблице <code>object_links</code> в PostgreSQL. Каждая связь имеет тип («связано», «создано», «упомянуто») и вес.</p>

<p>RAG (Retrieval-Augmented Generation) работает так: при запросе система сначала находит 10–20 релевантных объектов через pgvector, передаёт их в LLM как контекст, и только затем генерирует ответ.</p>

<p>Это гарантирует, что ответ всегда основан на <strong>твоих данных</strong>, а не на общих знаниях модели.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Откуда берутся диалоги</h3>

<p>КефирННо подключается к твоим аккаунтам через API и собирает переписки. Затем они проходят тот же пайплайн: классификация, эмбеддинг, создание нод и связей.</p>

<p>Ты не вносишь данные вручную — ты просто <strong>живёшь своей жизнью</strong>, а система структурирует её за тебя.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«КефирННо — это не база данных. Это <strong>автоматический архив твоей жизни</strong>.»</blockquote>

<p>В финальной публикации мы подведём итог: почему КефирННо — это не просто чат, а новый способ мышления.</p>
</div>`
},
{
  "id": "c10",
  "title": "Итог: почему КефирННо — это не просто чат",
  "topic": "КефирННо",
  "excerpt": "КефирННо — это не очередной ИИ-чат. Это новый способ структурировать свои мысли и проекты без лишних усилий.",
  "readTime": 6,
  "body": `<div style="max-width:800px;margin:0 auto;font-family:sans-serif;line-height:1.8;color:#e0e0e0;background:#0a0a14;padding:20px;border-radius:8px;">
<h2 style="font-size:28px;color:#f97316;border-left:4px solid #f97316;padding-left:16px;margin-top:0;">Итог: почему КефирННо — это не просто чат</h2>

<p>Мы прошли через десять публикаций. Мы разобрали, как работает Аджна, как выглядит Поток, как создаются проекты и как строится Карта мыслей.</p>

<p>Но главное, что мы поняли: КефирННо — это <strong>не просто чат с ИИ</strong>. Это среда, которая превращает хаос твоих диалогов в структурированные знания.</p>

<blockquote style="border-left:4px solid #f97316;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«КефирННо — это не очередной инструмент. Это <strong>новый способ мыслить</strong>.»</blockquote>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что мы создали</h3>

<p>Мы создали систему, которая:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Не требует от тебя создавать отдельные чаты для каждой темы.</li>
<li>Автоматически собирает диалоги из разных мессенджеров.</li>
<li>Строит граф знаний, где люди, проекты и идеи связаны.</li>
<li>Визуализирует всё это в виде интерактивной карты.</li>
<li>Ищет по смыслу, а не по точным словам.</li>
</ul>

<p>Всё это — в одном приложении.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Кому это нужно</h3>

<p>КефирННо нужен тем, кто:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Ведёт много проектов и общается с десятками людей.</li>
<li>Хочет структурировать свои знания без ручной работы.</li>
<li>Устал открывать 20 чатов в поисках одной переписки.</li>
</ul>

<p>КефирННо — это не просто приложение. Это <strong>твой цифровой помощник</strong>, который сам раскладывает мысли по полочкам.</p>

<h3 style="font-size:22px;color:#fb923c;margin-top:32px;">Что дальше</h3>

<p>КефирННо продолжает развиваться. В следующих версиях появятся:</p>
<ul style="color:#d1d5db;padding-left:20px;margin-bottom:20px;">
<li>Локальная работа без интернета (через Ollama).</li>
<li>Более глубокая интеграция с экосистемой nazrOS.</li>
<li>Полноценная оболочка для цифровой памяти.</li>
</ul>

<p>КефирННо — это только начало.</p>

<blockquote style="border-left:4px solid #a855f7;padding-left:16px;margin:20px 0;font-style:italic;color:#a1a1aa;">«КефирННо — это <strong>единое окно твоего мышления</strong>. И оно всегда открыто.»</blockquote>
</div>`
}
  

];
