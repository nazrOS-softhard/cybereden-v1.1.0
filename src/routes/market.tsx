import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

// ── Читаемый рендер описания с переносами строк ────────────────────────────────
function Description({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        if (line.startsWith("⚡")) {
          return (
            <div key={i} className="flex items-center gap-2 font-mono text-[11px] neon-text-acid border border-neon-acid/30 bg-neon-acid/5 px-3 py-2">
              {line}
            </div>
          );
        }
        if (line.startsWith("▸") || /^\d{2}\./.test(line.trim())) {
          return (
            <div key={i} className="font-display text-sm neon-text-cyan tracking-widest mt-4 first:mt-0">
              {line}
            </div>
          );
        }
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
          return (
            <div key={i} className="pl-4 text-muted-foreground text-xs font-mono">
              {line}
            </div>
          );
        }
        return <p key={i} className="text-foreground/80">{line}</p>;
      })}
    </div>
  );
}

function MarketPage() {
  const { t } = useI18n();
  const { user } = useAuth();         // ← берём юзера для deeplink
  const [openId, setOpenId] = useState<string | null>(null);
  const active = items.find(i => i.id === openId) ?? null;

  const isCybervoucher = active?.id === "cybervaucher_nazrOS";

  // Формируем Telegram deeplink с user ID чтобы бот привязал покупку к аккаунту
  // Бот получает: /start cybervaucher_USERID
  // Если юзер не авторизован — просто открываем бота без ID
  const telegramUrl = user
    ? `https://t.me/cybereden_market_bot?start=cybervaucher_${user.id}`
    : "https://t.me/cybereden_market_bot?start=cybervaucher";

  return (
    <PageShell eyebrow={t("market.eyebrow")} title={t("market.title")} subtitle={t("market.subtitle")}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(it => (
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
