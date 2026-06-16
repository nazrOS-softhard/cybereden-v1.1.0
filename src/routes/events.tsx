import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { NeonCard } from "@/components/NeonCard";
import { ExpandedCardModal } from "@/components/ExpandedCardModal";
import { events } from "@/lib/mockData";
import { useI18n } from "@/lib/i18n";

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
  const [hostname, setHostname] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
    }
  }, []);

  const active = events.find((e) => e.id === openId) ?? null;

  const filtered = useMemo(
    () => (type === "ВСЕ" ? events : events.filter((e) => e.type === type)),
    [type],
  );

  const safeStreamUrl = useMemo(() => {
    if (!active?.streamUrl) return undefined;
    
    try {
      const url = new URL(active.streamUrl);
      if (url.hostname.includes("twitch.tv") && hostname) {
        url.searchParams.set("parent", hostname);
      }
      return url.toString();
    } catch {
      if (hostname) {
        const separator = active.streamUrl.includes("?") ? "&" : "?";
        return `${active.streamUrl}${separator}parent=${hostname}`;
      }
      return active.streamUrl;
    }
  }, [active?.streamUrl, hostname]);

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((e) => (
          <NeonCard
            key={e.id}
            onClick={() => setOpenId(e.id)}
            eyebrow={e.type}
            title={e.title}
            // ❌ Убрали image={e.image} — фото не будет в свернутой карточке
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
      </div>

      <ExpandedCardModal
        open={!!active}
        layoutId={active ? `event-${active.id}` : "_"}
        onClose={() => setOpenId(null)}
        eyebrow={active?.type}
        title={active?.title ?? ""}
        // ✅ Оставляем image здесь — в модалке фото будет
        image={active?.image}
        cta={t("events.cta")}
        streamUrl={safeStreamUrl}
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
            <div className="mb-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                ОПИСАНИЕ
              </div>
              <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                {active.description}
              </div>
            </div>
            
            {active.type !== "ДЕПЫ" && (
              <p className="text-muted-foreground">
                Регистрация открыта. Участникам с верифицированным аккаунтом nazrOS — бонус
                +500 ПХ за участие.
              </p>
            )}
          </>
        )}
      </ExpandedCardModal>
    </PageShell>
  );
}