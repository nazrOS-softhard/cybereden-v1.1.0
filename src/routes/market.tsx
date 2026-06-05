import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell }         from "@/components/PageShell";
import { NeonCard }          from "@/components/NeonCard";
import { ExpandedCardModal } from "@/components/ExpandedCardModal";
import { DeviceSensorPanel } from "@/components/DeviceSensorPanel";
import { items }             from "@/lib/mockData";
import { useI18n }           from "@/lib/i18n";
import { useAuth }           from "@/lib/auth";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Market · nazrOS" },
      { name: "description", content: "Устройства, софт и инвест-инструменты CyberEden." },
    ],
  }),
  component: MarketPage,
});

const statusLabel: Record<string, string> = {
  in_stock: "В наличии",
  low:      "Мало",
  preorder: "Предзаказ",
};

// ── Категории для фильтра ─────────────────────────────────────────────────────
const MARKET_FILTERS = ["ВСЕ", "УСТРОЙСТВА", "СОФТ", "ИНОЕ"] as const;
type MarketFilter = (typeof MARKET_FILTERS)[number];

// ── Маппинг id → категория фильтра ────────────────────────────────────────────
const ITEM_FILTER_MAP: Record<string, MarketFilter> = {
  biohn:                "УСТРОЙСТВА",
  clon:                 "УСТРОЙСТВА",
  blan:                 "УСТРОЙСТВА",
  pin:                  "УСТРОЙСТВА",
  visionN:              "УСТРОЙСТВА",
  stranno:              "СОФТ",
  kefirno:              "СОФТ",
  cybervaucher_nazrOS:  "ИНОЕ",
};

// ── Читаемый рендер описания ──────────────────────────────────────────────────
function Description({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;
        if (line.startsWith("⚡")) return (
          <div key={i} className="flex items-center gap-2 font-mono text-[11px] neon-text-acid border border-neon-acid/30 bg-neon-acid/5 px-3 py-2">{line}</div>
        );
        if (line.startsWith("▸") || /^\d{2}\./.test(line.trim())) return (
          <div key={i} className="font-display text-sm neon-text-cyan tracking-widest mt-4 first:mt-0">{line}</div>
        );
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) return (
          <div key={i} className="pl-4 text-muted-foreground text-xs font-mono">{line}</div>
        );
        return <p key={i} className="text-foreground/80">{line}</p>;
      })}
    </div>
  );
}

function MarketPage() {
  const { t }    = useI18n();
  const { user } = useAuth();

  const [filter, setFilter] = useState<MarketFilter>("ВСЕ");
  const [openId, setOpenId] = useState<string | null>(null);

  const active         = items.find(i => i.id === openId) ?? null;
  const isCybervoucher = active?.id === "cybervaucher_nazrOS";

  const telegramUrl = user
    ? `https://t.me/cybereden_market_bot?start=cybervaucher_${user.id}`
    : "https://t.me/cybereden_market_bot?start=cybervaucher";

  // Фильтрованный список
  const filtered = useMemo(() => {
    if (filter === "ВСЕ") return items;
    return items.filter(it => (ITEM_FILTER_MAP[it.id] ?? "УСТРОЙСТВА") === filter);
  }, [filter]);

  const countOf = (f: MarketFilter) =>
    f === "ВСЕ" ? items.length : items.filter(it => (ITEM_FILTER_MAP[it.id] ?? "УСТРОЙСТВА") === f).length;

  return (
    <PageShell eyebrow={t("market.eyebrow")} title={t("market.title")} subtitle={t("market.subtitle")}>

      {/* ── Фильтры ──────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2 items-center">
        {MARKET_FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${
              f === filter
                ? "border-neon-cyan neon-text-cyan bg-neon-cyan/10"
                : "border-border text-muted-foreground hover:border-border hover:text-foreground"
            }`}>
            {f}
            <span className={`text-[10px] px-1 ${f === filter ? "neon-text-cyan" : "text-muted-foreground/60"}`}>
              {countOf(f)}
            </span>
          </button>
        ))}
      </div>

      {/* ── Карточки ─────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="hud-corners p-16 border border-border text-center">
          <div className="font-display text-xl neon-text-violet mb-2">Нет позиций</div>
          <p className="font-mono text-xs text-muted-foreground">В этой категории пока нет товаров</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(it => (
            <NeonCard
              key={it.id}
              layoutId={`card-${it.id}`}
              onClick={() => setOpenId(it.id)}
              image={it.image}
              eyebrow={it.category}
              title={it.name}
              meta={`${it.price.toLocaleString("ru-RU")} ПХ`}
            >
              {it.short}
            </NeonCard>
          ))}
        </div>
      )}

      {/* ── Развёрнутая карточка ─────────────────────────────────────────── */}
      <ExpandedCardModal
        open={!!active}
        layoutId={active ? `card-${active.id}` : "_"}
        onClose={() => setOpenId(null)}
        eyebrow={active?.category}
        title={active?.name ?? ""}
        image={active?.expandedImage ?? active?.image}
        cta={isCybervoucher ? "Приобрести в Telegram" : t("market.cta")}
        ctaHref={isCybervoucher ? telegramUrl : undefined}
        meta={
          active
            ? [
                { label: "Цена",      value: `${active.price.toLocaleString("ru-RU")} XP` },
                { label: "Категория", value: active.category },
                { label: "Статус",    value: statusLabel[active.status] ?? active.status },
              ]
            : []
        }
      >
        {active && (
          <>
            <Description text={active.description} />
            {active.sensors?.length > 0 && (
              <div className="border-t border-border pt-6 mt-4">
                <DeviceSensorPanel sensors={active.sensors} sliders={active.sliders} />
              </div>
            )}
          </>
        )}
      </ExpandedCardModal>
    </PageShell>
  );
}
