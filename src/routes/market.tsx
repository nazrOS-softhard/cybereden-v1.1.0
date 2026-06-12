import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell }             from "@/components/PageShell";
import { NeonCard }              from "@/components/NeonCard";
import { ExpandedCardModal }     from "@/components/ExpandedCardModal";
import { DeviceSensorPanel }     from "@/components/DeviceSensorPanel";
import { SoftCollectionModal }   from "@/components/SoftCollectionModal";
import { items }                 from "@/lib/mockData";
import { ITEM_STAGES, SOFT_COLLECTIONS } from "@/lib/stages";
import { useI18n }               from "@/lib/i18n";
import { useAuth }               from "@/lib/auth";
import type { MarketCategory }   from "@/lib/mockData";

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

const FILTERS: { key: MarketCategory | "ВСЕ"; label: string }[] = [
  { key: "ВСЕ",        label: "Все"       },
  { key: "УСТРОЙСТВА", label: "Устройства" },
  { key: "СОФТ",       label: "Софт"      },
  { key: "ИНОЕ",       label: "Иное"      },
];

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

  const [filter,          setFilter]          = useState<MarketCategory | "ВСЕ">("ВСЕ");
  const [openId,          setOpenId]          = useState<string | null>(null);
  const [collectionItemId, setCollectionItemId] = useState<string | null>(null);

  const active         = items.find(i => i.id === openId) ?? null;
  const isCybervoucher = active?.id === "cybervaucher_nazrOS";
  const isSoft         = active?.marketCategory === "СОФТ";
  const activeStages   = active ? ITEM_STAGES[active.id] : undefined;
  const softCollection = collectionItemId ? SOFT_COLLECTIONS[collectionItemId] : null;
  const collectionItem = collectionItemId ? items.find(i => i.id === collectionItemId) : null;

  const telegramUrl = user
    ? `https://t.me/cybereden_market_bot?start=cybervaucher_${user.id}`
    : "https://t.me/cybereden_market_bot?start=cybervaucher";

  const filtered = useMemo(() =>
    filter === "ВСЕ" ? items : items.filter(it => it.marketCategory === filter),
    [filter],
  );

  const countOf = (key: typeof filter) =>
    key === "ВСЕ" ? items.length : items.filter(it => it.marketCategory === key).length;

  return (
    <PageShell eyebrow={t("market.eyebrow")} title={t("market.title")} subtitle={t("market.subtitle")}>

      {/* Фильтры */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${
              f.key === filter
                ? "border-neon-cyan neon-text-cyan bg-neon-cyan/10"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            {f.label}
            <span className={`text-[10px] px-1 ${f.key === filter ? "neon-text-cyan" : "text-muted-foreground/60"}`}>
              {countOf(f.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Карточки */}
      {filtered.length === 0 ? (
        <div className="hud-corners p-16 border border-border text-center">
          <div className="font-display text-xl neon-text-violet">Нет позиций</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(it => {
            const hasStages = !!ITEM_STAGES[it.id]?.length;
            const hasColl   = !!SOFT_COLLECTIONS[it.id];
            return (
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
                {it.marketCategory === "УСТРОЙСТВА" && (
                  <div className="mt-2 font-mono text-[10px]" style={{ color: "#ff2ea6", textShadow: "0 0 6px #ff2ea6, 0 0 12px #ff2ea6" }}>
                    ◈ {ITEM_STAGES[it.id]?.length || 7} стадий сборки
                  </div>
                )}
                {hasColl && (
                  <div className="mt-2 font-mono text-[10px] neon-text-cyan">
                    ✦ Купаж коллекции доступен
                  </div>
                )}
              </NeonCard>
            );
          })}
        </div>
      )}

      {/* Развёрнутая карточка */}
      <ExpandedCardModal
        open={!!active}
        layoutId={active ? `card-${active.id}` : "_"}
        onClose={() => setOpenId(null)}
        eyebrow={active?.category}
        title={active?.name ?? ""}
        image={active?.expandedImage ?? active?.image}
        stages={(!isSoft && !isCybervoucher) ? activeStages : undefined}
        itemId={active?.id}
        cta={
          isCybervoucher ? "Приобрести в Telegram" :
          isSoft && SOFT_COLLECTIONS[active?.id ?? ""] ? "Купаж коллекции" :
          t("market.cta")
        }
        ctaHref={isCybervoucher ? telegramUrl : undefined}
        onCtaClick={
          isSoft && active && SOFT_COLLECTIONS[active.id]
            ? () => { setOpenId(null); setCollectionItemId(active.id); }
            : undefined
        }
        meta={active ? [
          { label: "Цена",      value: `${active.price.toLocaleString("ru-RU")} XP` },
          { label: "Категория", value: active.category },
          { label: "Статус",    value: statusLabel[active.status] ?? active.status },
        ] : []}
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

      {/* Купаж коллекции */}
      {softCollection && collectionItem && (
        <SoftCollectionModal
          open={true}
          onClose={() => setCollectionItemId(null)}
          itemId={collectionItem.id}
          itemName={collectionItem.name}
          price={collectionItem.price}
          collection={softCollection}
        />
      )}
    </PageShell>
  );
}
