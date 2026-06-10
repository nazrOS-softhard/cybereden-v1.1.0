import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import labn from "@/assets/lab.png";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Лаборатория · nazrOS" },
      { name: "description", content: "Интерактивная технологическая лаборатория nazrOS." },
    ],
  }),
  component: LabPage,
});

// ── Зоны лаборатории ──────────────────────────────────────────────────────────
interface LabZone {
  id: string;
  label: string;
  labelShort: string;
  x: number;   // % от ширины
  y: number;   // % от высоты
  image: labn;
  color: string;
  description: string;
  protocol: string[];
  linkedDevice?: string;
  linkedRoute?: string;
}

const ZONES: LabZone[] = [
  {
    id: "sanitary",
    label: "Санитарный модуль",
    labelShort: "САНИТАР",
    x: 12, y: 28,
    color: "#22d3ee",
    description: "Принимать душ минимум 2 раза в день. Соблюдать личную гигиену. Поддерживать чистоту пространства.",
    protocol: ["Душ утром и вечером", "Личная гигиена после туалета", "Чистота поверхностей"],
  },
  {
    id: "compute",
    label: "Вычислительное ядро",
    labelShort: "ЯДРО",
    x: 45, y: 20,
    color: "#a855f7",
    description: "Главный центр управления. Контролировать температуру и нагрузку. Очищать систему от мусора. Резервное копирование.",
    protocol: ["Мониторинг температуры CPU/GPU", "Очистка от мусора еженедельно", "Бэкап важных данных", "Обновление ПО перед сессией"],
    linkedDevice: "blaN",
    linkedRoute: "/market",
  },
  {
    id: "sleep",
    label: "Жилой модуль (Сон)",
    labelShort: "СОН",
    x: 14, y: 60,
    color: "#6366f1",
    description: "Спать не менее 8 часов каждые 16 часов. Не использовать зону отдыха для работы. Без восстановления система деградирует.",
    protocol: ["8 часов сна", "Режим отхода 23:00–07:00", "Маска + беруши", "Темнота и тишина"],
  },
  {
    id: "storage",
    label: "Хранение",
    labelShort: "ХРАНЕНИЕ",
    x: 14, y: 82,
    color: "#f97316",
    description: "Стирать вещи не реже 1 раза в 3–4 дня. Сортировать предметы по функциям. Избавляться от лишнего. Хаос в вещах — хаос в системе.",
    protocol: ["Стирка раз в 3–4 дня", "Сортировка по функциям", "Ликвидация лишнего"],
  },
  {
    id: "rostn",
    label: "Био-модуль (ростН)",
    labelShort: "РОСTН",
    x: 72, y: 18,
    color: "#22c55e",
    description: "Соблюдать световой режим растений. Контролировать полив. Не нарушать цикл роста. Контроль живого — контроль среды.",
    protocol: ["Световой режим 16/8", "Полив по расписанию", "Мониторинг EC и pH", "Не менять температуру резко"],
    linkedDevice: "rostN",
    linkedRoute: "/market",
  },
  {
    id: "printing",
    label: "3D-Печать (пиН)",
    labelShort: "3D ПЕЧАТЬ",
    x: 80, y: 32,
    color: "#22d3ee",
    description: "Проверять модель перед запуском. Контролировать материал. Не оставлять процесс без наблюдения. Очищать рабочую поверхность.",
    protocol: ["Проверка модели в слайсере", "Контроль первого слоя", "Мониторинг каждые 30 мин", "Очистка после завершения"],
    linkedDevice: "piN",
    linkedRoute: "/market",
  },
  {
    id: "sewing",
    label: "Швейный модуль",
    labelShort: "ШИТЬЁ",
    x: 80, y: 52,
    color: "#ec4899",
    description: "Модифицировать одежду под задачу. Поддерживать инструменты в чистоте. Хранить материалы организованно. Среда продолжается в том, что ты носишь.",
    protocol: ["Организация ниток и фурнитуры", "Заточка игл", "Чистка швейной машины"],
  },
  {
    id: "engineering",
    label: "Инженерный стол (blaN)",
    labelShort: "ИНЖ.СТОЛ",
    x: 72, y: 72,
    color: "#f97316",
    description: "Возвращать инструменты на место. Проверять исправность перед работой. Не оставлять незавершённые сборки. Порядок ускоряет сборку.",
    protocol: ["Каждый инструмент на своё место", "Проверка инструментов перед работой", "Завершать сборки до конца"],
    linkedDevice: "blaN",
    linkedRoute: "/market",
  },
  {
    id: "kitchen",
    label: "Кухонный модуль",
    labelShort: "КУХНЯ",
    x: 42, y: 85,
    color: "#eab308",
    description: "Готовить простую и полезную еду. Соблюдать режим питания. Очищать поверхности после использования. Топливо влияет на точность мышления.",
    protocol: ["3 приёма пищи в день", "Чистка поверхностей после готовки", "Еда заранее (prep)"],
  },
  {
    id: "network",
    label: "Сетевой узел",
    labelShort: "СЕТЬ",
    x: 58, y: 85,
    color: "#22d3ee",
    description: "Контролировать подключение. Защищать доступ. Обновлять сетевые компоненты. Связь — это продолжение системы.",
    protocol: ["VPN всегда включён", "Мониторинг трафика", "Обновление роутера/фаервола"],
    linkedDevice: "cloN",
    linkedRoute: "/market",
  },
  {
    id: "portal",
    label: "PORTAL",
    labelShort: "PORTAL",
    x: 87, y: 12,
    color: "#a855f7",
    description: "PORTAL — визуальное ядро nazrOS. Интерфейсы, HUD-системы, motion-дизайн и цифровая типографика. Мероприятие nazrOS.",
    protocol: ["Визуальная айдентика nazrOS", "HUD-системы и интерфейсы", "Motion-design"],
    linkedRoute: "/events",
  },
  {
    id: "pod",
    label: "Капсула восстановления",
    labelShort: "КАПСУЛА",
    x: 48, y: 60,
    color: "#22d3ee",
    description: "Зона восстановления и медитации. 20–30 минут дневного отдыха. Изоляция от внешних раздражителей. Перезапуск системы без полного выключения.",
    protocol: ["Nidra / медитация 20 мин", "Полная изоляция от экранов", "Дыхательные техники 4-7-8"],
  },
];

// ── Панель информации о зоне ──────────────────────────────────────────────────
function ZonePanel({ zone, onClose }: { zone: LabZone; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute top-4 right-4 w-80 bg-surface/95 border backdrop-blur-md z-20 overflow-hidden"
      style={{ borderColor: zone.color + "60" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: zone.color + "40", backgroundColor: zone.color + "15" }}>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: zone.color }}>
            Модуль
          </div>
          <div className="font-display text-lg" style={{ color: zone.color }}>{zone.label}</div>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 transition">
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
          {zone.description}
        </p>

        {/* Протокол */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: zone.color }}>
            Протокол эксплуатации
          </div>
          <div className="space-y-1.5">
            {zone.protocol.map((p, i) => (
              <div key={i} className="flex items-start gap-2 font-mono text-xs">
                <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: zone.color }} />
                <span className="text-muted-foreground">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Связанное устройство */}
        {zone.linkedRoute && (
          <Link to={zone.linkedRoute as any}
            className="flex items-center justify-between px-3 py-2 border transition hover:opacity-80"
            style={{ borderColor: zone.color + "40", backgroundColor: zone.color + "10" }}>
            <span className="font-mono text-xs" style={{ color: zone.color }}>
              {zone.linkedDevice ? `→ Устройство: ${zone.linkedDevice}` : "→ Перейти"}
            </span>
            <ExternalLink size={12} style={{ color: zone.color }} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ── Основная страница ─────────────────────────────────────────────────────────
function LabPage() {
  const [activeZone, setActiveZone] = useState<LabZone | null>(null);

  const handleZoneClick = (zone: LabZone) => {
    setActiveZone(prev => prev?.id === zone.id ? null : zone);
  };

  return (
    <div className="relative z-10 min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] neon-text-cyan mb-2">
            nazrOS · Технологическая лаборатория
          </div>
          <h1 className="font-display text-4xl neon-text-violet">Операционная среда</h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            Интерактивная карта лаборатории. Нажми на зону чтобы узнать протокол.
          </p>
        </div>

        {/* Интерактивная карта */}
        <div className="relative w-full" style={{ paddingBottom: "66%" }}>
          <div className="absolute inset-0 border border-border bg-surface/20 backdrop-blur overflow-hidden">

            {/* Фоновая сетка */}
            <div className="absolute inset-0 hud-grid opacity-20" />
            <div className="absolute inset-0 hud-scanlines opacity-10 pointer-events-none" />

            {/* Зоны */}
            {ZONES.map(zone => (
              <button
                key={zone.id}
                onClick={() => handleZoneClick(zone)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              >
                {/* Пульсирующий маркер */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ backgroundColor: zone.color, animationDuration: "2s" }} />
                  <div className="relative w-3 h-3 rounded-full border-2 transition-all group-hover:scale-150"
                    style={{
                      backgroundColor: activeZone?.id === zone.id ? zone.color : "transparent",
                      borderColor: zone.color,
                    }}
                  />
                </div>

                {/* Подпись */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap">
                  <div className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: zone.color, borderColor: zone.color + "60", backgroundColor: "#0a0a14cc" }}>
                    {zone.labelShort}
                  </div>
                </div>
              </button>
            ))}

            {/* Легенда */}
            <div className="absolute bottom-4 left-4 space-y-1">
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-2">
                Нажми на точку
              </div>
              {[
                { color: "#22d3ee", label: "Вычисление / Связь" },
                { color: "#a855f7", label: "Творчество / UI" },
                { color: "#22c55e", label: "Био-модули" },
                { color: "#f97316", label: "Инженерия / Хранение" },
                { color: "#6366f1", label: "Восстановление" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="font-mono text-[9px] text-muted-foreground">{l.label}</span>
                </div>
              ))}
            </div>

            {/* Инфопанель выбранной зоны */}
            <AnimatePresence>
              {activeZone && (
                <ZonePanel zone={activeZone} onClose={() => setActiveZone(null)} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Список всех зон под картой */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ZONES.map(zone => (
            <button key={zone.id} onClick={() => handleZoneClick(zone)}
              className={`text-left p-3 border transition-all ${
                activeZone?.id === zone.id ? "bg-surface/60" : "bg-surface/20 hover:bg-surface/40"
              }`}
              style={{ borderColor: activeZone?.id === zone.id ? zone.color + "60" : undefined }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }} />
                <div className="font-display text-xs" style={{ color: zone.color }}>{zone.label}</div>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground line-clamp-2">
                {zone.protocol[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Общие правила */}
        <div className="mt-8 hud-corners p-6 border border-border bg-surface/20 backdrop-blur">
          <div className="font-display text-sm neon-text-violet mb-4 tracking-widest">ОБЩИЕ ПРАВИЛА СРЕДЫ</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              "Соблюдай режим и дисциплину",
              "Поддерживай чистоту и порядок",
              "Контролируй качество процессов",
              "Развивай среду и себя",
              "Не нарушай баланс работы и отдыха",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-1.5 flex-shrink-0" />
                <span className="font-mono text-xs text-muted-foreground">{rule}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 font-mono text-[11px] text-center neon-text-acid">
            НЕ ИГНОРИРУЙ ПРОТОКОЛ · СРЕДА ОТВЕЧАЕТ СОСТОЯНИЮ РАЗРАБОТЧИКА · ТЫ УПРАВЛЯЕШЬ СИСТЕМОЙ
          </div>
        </div>
      </div>
    </div>
  );
}
