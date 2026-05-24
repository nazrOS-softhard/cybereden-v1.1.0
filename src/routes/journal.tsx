import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { NeonCard } from "@/components/NeonCard";
import { ExpandedCardModal } from "@/components/ExpandedCardModal";
import { articles } from "@/lib/mockData";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal · nazrOS" },
      { name: "description", content: "Журнал CyberEden: хакинг, киберспорт, цифровая этика." },
      { property: "og:title", content: "Journal · nazrOS" },
      { property: "og:description", content: "Лонгриды и разборы от инженеров nazrOS." },
    ],
  }),
  component: JournalPage,
});

const topics = ["Все", "Кибербезопасность", "Геймдев", "Киберспорт", "Хакинг", "Цифровая этика"] as const;

function JournalPage() {
  const { t } = useI18n();
  const [topic, setTopic] = useState<(typeof topics)[number]>("Все");
  const [openId, setOpenId] = useState<string | null>(null);
  const active = articles.find((a) => a.id === openId) ?? null;

  const filtered = useMemo(
    () => (topic === "Все" ? articles : articles.filter((a) => a.topic === topic)),
    [topic],
  );

  return (
    <PageShell
      eyebrow={t("journal.eyebrow")}
      title={t("journal.title")}
      subtitle={t("journal.subtitle")}
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {topics.map((tp) => (
          <button
            key={tp}
            onClick={() => setTopic(tp)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all ${
              tp === topic
                ? "neon-border neon-text-violet"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tp === "Все" ? t("filter.all") : tp}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((a) => (
          <NeonCard
            key={a.id}
            layoutId={`journal-${a.id}`}
            onClick={() => setOpenId(a.id)}
            eyebrow={a.topic}
            title={a.title}
            meta={`${a.readTime} ${t("journal.readTime")}`}
          >
            {a.excerpt}
          </NeonCard>
        ))}
      </div>

      <ExpandedCardModal
        open={!!active}
        layoutId={active ? `journal-${active.id}` : "_"}
        onClose={() => setOpenId(null)}
        eyebrow={active?.topic}
        title={active?.title ?? ""}
        cta={t("journal.cta")}
        meta={
          active
            ? [
                { label: "Тема", value: active.topic },
                { label: "Время", value: `${active.readTime} мин` },
                { label: "Статус", value: "Опубликовано" },
              ]
            : []
        }
      >
        {active && (
          <>
            <p className="text-base font-display neon-text-cyan">{active.excerpt}</p>
            <p>{active.body}</p>
            <p className="text-muted-foreground">
              Полный текст материала доступен подписчикам nazrOS Premium. Подключите канал в
              профиле для немедленного доступа.
            </p>
          </>
        )}
      </ExpandedCardModal>
    </PageShell>
  );
}
