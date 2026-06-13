import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell }         from "@/components/PageShell";
import { NeonCard }          from "@/components/NeonCard";
import { ExpandedCardModal } from "@/components/ExpandedCardModal";
import { DeviceSensorPanel } from "@/components/DeviceSensorPanel";
import { items }             from "@/lib/mockData";
import { ITEM_STAGES }       from "@/lib/stages";
import { useI18n }           from "@/lib/i18n";
import { useAuth }           from "@/lib/auth";
import type { MarketCategory } from "@/lib/mockData";
import { SoftCollectionModal } from "@/components/SoftCollectionModal";
import { SOFT_COLLECTIONS } from "@/lib/stages";

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
  { key: "ВСЕ",       label: "Все"       },
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

  const [filter, setFilter] = useState<MarketCategory | "ВСЕ">("ВСЕ");
  const [openId, setOpenId] = useState<string | null>(null);
  const [softModalOpen, setSoftModalOpen] = useState(false);
  const [selectedSoftItem, setSelectedSoftItem] = useState<typeof items[0] | null>(null);
  
  // ✅ Состояние для галереи
  const [galleryIndex, setGalleryIndex] = useState<Record<string, number>>({});

  const active         = items.find(i => i.id === openId) ?? null;
  const isCybervoucher = active?.id === "cybervaucher_nazrOS";
  const activeStages   = active ? ITEM_STAGES[active.id] : undefined;

  const telegramUrl = user
    ? `https://t.me/cybereden_market_bot?start=cybervaucher_${user.id}`
    : "https://t.me/cybereden_market_bot?start=cybervaucher";

  const filtered = useMemo(() =>
    filter === "ВСЕ" ? items : items.filter(it => it.marketCategory === filter),
    [filter],
  );

  const countOf = (key: typeof filter) =>
    key === "ВСЕ" ? items.length : items.filter(it => it.marketCategory === key).length;

  const handleCardClick = (it: typeof items[0]) => {
    if (it.marketCategory === "СОФТ") {
      setSelectedSoftItem(it);
      setSoftModalOpen(true);
    } else {
      setOpenId(it.id);
    }
  };

  // ✅ Функции для галереи
  const handleGalleryPrev = (itemId: string, length: number) => {
    setGalleryIndex(prev => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) - 1 + length) % length
    }));
  };

  const handleGalleryNext = (itemId: string, length: number) => {
    setGalleryIndex(prev => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) + 1) % length
    }));
  };

  return (
    <PageShell
      eyebrow={t("market.eyebrow")}
      title={t("market.title")}
      subtitle={t("market.subtitle")}
    >
      {/* ── Фильтры ──────────────────────────────────────────────────────── */}
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

      {/* ── Карточки ─────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="hud-corners p-16 border border-border text-center">
          <div className="font-display text-xl neon-text-violet mb-2">Нет позиций</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(it => (
            <NeonCard
              key={it.id}
              layoutId={`card-${it.id}`}
              onClick={() => handleCardClick(it)}
              image={it.image}
              eyebrow={it.category}
              title={it.name}
              meta={`${it.price.toLocaleString("ru-RU")} ПХ`}
              
              // ✅ Добавляем пропсы для галереи
              galleryImages={it.gallery}
              currentIndex={galleryIndex[it.id] || 0}
              onPrev={() => handleGalleryPrev(it.id, it.gallery?.length || 1)}
              onNext={() => handleGalleryNext(it.id, it.gallery?.length || 1)}
            >
              {it.short}
              {/* Значок стадий */}
              {ITEM_STAGES[it.id] && (
                <div className="mt-2 font-mono text-[10px] neon-text-acid">
                  ◈ {ITEM_STAGES[it.id].length} стадий сборки
                </div>
              )}
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
        images={active?.gallery ?? []}
        cta={isCybervoucher ? "Приобрести в Telegram" : t("market.cta")}
        ctaHref={isCybervoucher ? telegramUrl : undefined}
        stages={activeStages}
        itemId={active?.id}
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

      {/* ── SoftCollectionModal для софта ───────────────────────────────── */}
      {softModalOpen && selectedSoftItem && (
        <SoftCollectionModal
          open={softModalOpen}
          onClose={() => setSoftModalOpen(false)}
          itemId={selectedSoftItem.id}
          itemName={selectedSoftItem.name}
          price={selectedSoftItem.price}
          collection={SOFT_COLLECTIONS[selectedSoftItem.id]}
        />
      )}
    </PageShell>
  );
}
