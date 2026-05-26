import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { NeonCard } from "@/components/NeonCard";
import { ExpandedCardModal } from "@/components/ExpandedCardModal";
import { events } from "@/lib/mockData";
import { useI18n } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion"; // <--- ДОБАВЛЕН ИМПОРТ

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events · nazrOS" },
      { name: "description", content: "События CyberEden: трансляции, турниры, хакатоны, депы." },
      { property: "og:title", content: "Events · nazrOS" },
      { property: "og:description", content: "Афиша киберпанк-событий и отделов." },
    ],
  }),
  component: EventsPage,
});

const types = ["ВСЕ", "ТРАНСЛЯЦИИ", "ТУРНИРЫ", "ХАКАТОНЫ", "ДЕПЫ"] as const;

function EventsPage() {
  const { t } = useI18n();
  const [type, setType] = useState<(typeof types)[number]>("ВСЕ");
  const [openId, setOpenId] = useState<string | null>(null);
  const active = events.find((e) => e.id === openId) ?? null;

  const filtered = useMemo(
    () => (type === "ВСЕ" ? events : events.filter((e) => e.type === type)),
    [type],
  );

  return (
    <PageShell
      eyebrow={t("events.eyebrow")}
      title={t("events.title")}
      subtitle={t("events.subtitle")}
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {types.map((ty) => (
          <button
            key={ty}
            onClick={() => setType(ty)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all ${
              ty === type
                ? "neon-border-cyan neon-text-cyan"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {ty}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait"> {/* <--- ОБЁРТКА */}
        <motion.div
          key={type}
          layout={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((e) => (
            <NeonCard
              key={e.id}
              layoutId={`event-${e.id}`}
              onClick={() => setOpenId(e.id)}
              eyebrow={e.type}
              title={e.title}
              meta={`${e.date ? e.date + " · " : ""}${e.location}`}
            >
              {e.description
                .replace(/<[^>]*>/g, '')
                .replace(/\s+/g, ' ')
                .trim()
                .split(' ')
                .slice(0, 10)
                .join(' ') + '…'}
            </NeonCard>
          ))}
        </motion.div>
      </AnimatePresence>

      <ExpandedCardModal
        open={!!active}
        layoutId={active ? `event-${active.id}` : "_"}
        onClose={() => setOpenId(null)}
        eyebrow={active?.type}
        title={active?.title ?? ""}
        cta={t("events.cta")}
        meta={
          active
            ? [
                { label: "Тип", value: active.type },
                { label: "Дата", value: active.date || "Постоянно" },
                { label: "Локация", value: active.location },
              ]
            : []
        }
      >
        {active && (
          <>
            <div dangerouslySetInnerHTML={{ __html: active.description }} />
            {active.type !== "ДЕПЫ" && (
              <p className="text-muted-foreground">
                Регистрация открыта. Участникам с верифицированным аккаунтом nazrOS — бонус
                +500 XP за участие.
              </p>
            )}
          </>
        )}
      </ExpandedCardModal>
    </PageShell>
  );
}
