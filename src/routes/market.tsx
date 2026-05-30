import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { NeonCard } from "@/components/NeonCard";
import { ExpandedCardModal } from "@/components/ExpandedCardModal";
import { DeviceSensorPanel } from "@/components/DeviceSensorPanel";
import { items } from "@/lib/mockData";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Market · nazrOS" },
      { name: "description", content: "Импланты, дроны, оптика и протезы CyberEden." },
      { property: "og:title", content: "Market · nazrOS" },
    ],
  }),
  component: MarketPage,
});

const statusLabel: Record<string, string> = {
  in_stock: "В наличии",
  low:      "Мало",
  preorder: "Предзаказ",
};

// ── Ссылка на Telegram-бота для покупки (замени на реальный юзернейм бота) ───
const TELEGRAM_BOT = "https://t.me/cybereden_market_bot?start=cybervaucher";

// ── Рендер описания с переносами строк ────────────────────────────────────────
function Description({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-sm leading-relaxed text-foreground/90">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        // Заголовки (▸ или 0N.)
        if (line.startsWith("▸") || /^\d{2}\./.test(line)) {
          return (
            <div key={i} className="font-display text-sm neon-text-cyan tracking-widest mt-4 first:mt-0">
              {line}
            </div>
          );
        }

        // Предупреждение ⚡ DEV MODE
        if (line.startsWith("⚡")) {
          return (
            <div key={i} className="flex items-center gap-2 font-mono text-[11px] neon-text-acid border border-neon-acid/30 bg-neon-acid/5 px-3 py-2">
              {line}
            </div>
          );
        }

        // Маркеры списка
        if (line.startsWith("•") || line.startsWith("-")) {
          return (
            <div key={i} className="pl-4 text-muted-foreground text-xs font-mono">
              {line}
            </div>
          );
        }

        // Обычный текст
        return <p key={i} className="text-foreground/80">{line}</p>;
      })}
    </div>
  );
}

function MarketPage() {
  const { t } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);
  const active = items.find((i) => i.id === openId) ?? null;

  const isCybervoucher = active?.id === "cybervaucher_nazrOS";

  return (
    <PageShell eyebrow={t("market.eyebrow")} title={t("market.title")} subtitle={t("market.subtitle")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <NeonCard
            key={it.id} layoutId={`card-${it.id}`} onClick={() => setOpenId(it.id)}
            image={it.image} eyebrow={it.category} title={it.name}
            meta={`${it.price.toLocaleString("ru-RU")} ПХ`}
          >
            {it.short}
          </NeonCard>
        ))}
      </div>

      <ExpandedCardModal
        open={!!active}
        layoutId={active ? `card-${active.id}` : "_"}
        onClose={() => setOpenId(null)}
        eyebrow={active?.category}
        title={active?.name ?? ""}
        image={active?.expandedImage ?? active?.image}
        cta={isCybervoucher ? "Приобрести в Telegram" : t("market.cta")}
        ctaHref={isCybervoucher ? TELEGRAM_BOT : undefined}
        meta={
          active
            ? [
                { label: "Цена",      value: `${active.price.toLocaleString("ru-RU")} XP` },
                { label: "Категория", value: active.category },
                { label: "Статус",    value: statusLabel[active.status] },
              ]
            : []
        }
      >
        {active && (
          <>
            {/* Читаемое описание с обработкой переносов строк */}
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
