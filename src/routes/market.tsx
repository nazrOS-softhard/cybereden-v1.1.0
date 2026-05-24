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
      { property: "og:description", content: "Маркет имплантов и кибер-устройств." },
    ],
  }),
  component: MarketPage,
});

const statusLabel: Record<string, string> = {
  in_stock: "В наличии",
  low: "Мало",
  preorder: "Предзаказ",
};

function MarketPage() {
  const { t } = useI18n();
  const [openId, setOpenId] = useState<string | null>(null);
  const active = items.find((i) => i.id === openId) ?? null;

  return (
    <PageShell
      eyebrow={t("market.eyebrow")}
      title={t("market.title")}
      subtitle={t("market.subtitle")}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <NeonCard
            key={it.id}
            layoutId={`card-${it.id}`}
            onClick={() => setOpenId(it.id)}
            image={it.image}
            eyebrow={it.category}
            title={it.name}
            meta={`${it.price.toLocaleString("ru-RU")} XP`}
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
        cta={t("market.cta")}
        meta={
          active
            ? [
                { label: "Цена", value: `${active.price.toLocaleString("ru-RU")} XP` },
                { label: "Категория", value: active.category },
                { label: "Статус", value: statusLabel[active.status] },
              ]
            : []
        }
      >
        {active && (
          <>
            <p>{active.description}</p>
            <div className="border-t border-border pt-6">
              <DeviceSensorPanel sensors={active.sensors} sliders={active.sliders} />
            </div>
          </>
        )}
      </ExpandedCardModal>
    </PageShell>
  );
}
