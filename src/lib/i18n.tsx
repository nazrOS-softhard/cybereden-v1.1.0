import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";

type Dict = Record<string, { ru: string; en: string }>;

const dict: Dict = {
  // Nav
  "nav.home": { ru: "Главная", en: "Home" },
  "nav.dashboard": { ru: "Дашборд", en: "Dashboard" },
  "nav.journal": { ru: "Журнал", en: "Journal" },
  "nav.streams": { ru: "Трансляции", en: "Streams" },
  "nav.events": { ru: "События", en: "Events" },
  "nav.market": { ru: "Маркет", en: "Market" },
  "nav.profile": { ru: "Профиль", en: "Profile" },

  // Home
  "home.boot": { ru: "// загрузка · сектор 4 · 02:18", en: "// boot · sector 4 · 02:18 AM" },
  "home.tagline": {
    ru: "Операционная система ночного города. Маркет, журнал, события, стримы и сетевая аналитика — в одном неоновом интерфейсе.",
    en: "Operating system of the night city. Market, journal, events, streams and network analytics — in one neon interface.",
  },
  "home.cta.market": { ru: "Войти в маркет", en: "Enter market" },
  "home.cta.hud": { ru: "Открыть HUD", en: "Open HUD" },
  "home.nodes.eyebrow": { ru: "// узлы сети", en: "// network nodes" },
  "home.nodes.title.a": { ru: "Шесть модулей", en: "Six modules" },
  "home.nodes.title.b": { ru: "одной системы", en: "of one system" },
  "node.market.desc": { ru: "Импланты, дроны, оптика", en: "Implants, drones, optics" },
  "node.journal.desc": { ru: "Хакинг, этика, киберспорт", en: "Hacking, ethics, esports" },
  "node.events.desc": { ru: "Турниры, митапы, хакатоны", en: "Tournaments, meetups, hackathons" },
  "node.streams.desc": { ru: "Прямые включения", en: "Live broadcasts" },
  "node.dashboard.desc": { ru: "Сетка и метрики", en: "Grid and metrics" },
  "node.profile.desc": { ru: "Инвентарь и ачивки", en: "Inventory and achievements" },

  // Dashboard
  "dash.eyebrow": { ru: "// hud · сетка 04", en: "// hud · grid 04" },
  "dash.title": { ru: "Дашборд", en: "Dashboard" },
  "dash.subtitle": {
    ru: "Состояние сетки CyberEden в реальном времени.",
    en: "Realtime state of the CyberEden grid.",
  },
  "dash.kpi.nodes": { ru: "Активные узлы", en: "Active nodes" },
  "dash.kpi.xp": { ru: "XP за 24ч", en: "XP traded · 24h" },
  "dash.kpi.streams": { ru: "Открытые стримы", en: "Open streams" },
  "dash.kpi.threat": { ru: "Индекс угроз", en: "Threat index" },
  "dash.cybers": { ru: "КИБЕРЫ · ТОП", en: "CYBERS · TOP RANKED" },
  "dash.sync": { ru: "синхр. · live", en: "sync · live" },

  // Journal
  "journal.eyebrow": { ru: "// поток передач", en: "// transmission feed" },
  "journal.title": { ru: "Журнал", en: "Journal" },
  "journal.subtitle": {
    ru: "Лонгриды, разборы и манифесты от обитателей сетки.",
    en: "Longreads, breakdowns and manifestos from grid dwellers.",
  },
  "journal.readTime": { ru: "мин чтения", en: "min read" },
  "journal.cta": { ru: "Читать полностью", en: "Read full" },

  // Events
  "events.eyebrow": { ru: "// календарь", en: "// live calendar" },
  "events.title": { ru: "События", en: "Events" },
  "events.subtitle": {
    ru: "Турниры Nexus Pro, хакатоны darknet и митапы инженеров.",
    en: "Nexus Pro tournaments, darknet hackathons and engineer meetups.",
  },
  "events.cta": { ru: "Участвовать", en: "Join" },

  // Market
  "market.eyebrow": { ru: "// сектор маркет", en: "// sector market" },
  "market.title": { ru: "Маркет", en: "Market" },
  "market.subtitle": {
    ru: "Сертифицированный кибер-арсенал. Цены в XP. Доставка через дроп-боксы Сектора-4.",
    en: "Certified cyber arsenal. Prices in XP. Delivery via Sector-4 drop boxes.",
  },
  "market.cta": { ru: "Приобрести", en: "Acquire" },

  // Streams
  "streams.eyebrow": { ru: "// live · channel zero", en: "// live · channel zero" },
  "streams.title": { ru: "Стримы", en: "Streams" },
  "streams.subtitle": {
    ru: "Идут прямо сейчас. Без рекламы, без премодерации.",
    en: "Live right now. No ads, no pre-moderation.",
  },

  // Profile
  "profile.eyebrow": { ru: "/ кибла кибера", en: "/ cyberqibla" },
  "profile.subtitle": { ru: "Исследователь цифровых аномалий · Black! Factory · <span class='text-yellow-400'>△</span> · 3 ", en: "Digital Anomaly Researcher · Black! Factory · <span class='text-yellow-400'>△</span> · 3" },
  "profile.accounts": { ru: "ПОДКЛЮЧЁННЫЕ АККАУНТЫ", en: "CONNECTED ACCOUNTS" },
  "profile.inventory": { ru: "ИНВЕНТАРЬ", en: "INVENTORY" },
  "profile.achievements": { ru: "ДОСТИЖЕНИЯ", en: "ACHIEVEMENTS" },

  // Common
  "filter.all": { ru: "Все", en: "All" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nazros.lang");
      if (saved === "en" || saved === "ru") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("nazros.lang", l);
    } catch {}
  };

  const t = (key: string) => dict[key]?.[lang] ?? key;
  const toggle = () => setLang(lang === "ru" ? "en" : "ru");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>{children}</LangContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
