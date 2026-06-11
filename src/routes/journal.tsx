import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle, X } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { NeonCard }  from "@/components/NeonCard";
import { articles }  from "@/lib/mockData";
import { useI18n }   from "@/lib/i18n";
import { useAuth, apiPost } from "@/lib/auth";
import nazrosLogo from "@/assets/nazros-logo.png";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal · nazrOS" },
      { name: "description", content: "Журнал CyberEden: хакинг, киберспорт, цифровая этика." },
    ],
  }),
  component: JournalPage,
});

const topics = ["Все", "Кибербезопасность", "Геймдев", "Киберспорт", "Хакинг", "Цифровая этика"] as const;

// Маппинг темы → тип контента (для knowledge API)
const TOPIC_TO_TYPE: Record<string, string> = {
  "Кибербезопасность": "Алгоритм",
  "Геймдев":           "Интервью",
  "Киберспорт":        "Интервью",
  "Хакинг":            "Публикация",
  "Цифровая этика":    "Публикация",
};

// ── Хук: отслеживаем прогресс скролла внутри div ────────────────────────────
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const scrollable = scrollHeight - clientHeight;
    if (scrollable <= 0) { setProgress(100); return; }
    const pct = Math.round((scrollTop / scrollable) * 100);
    setProgress(Math.min(100, pct));
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [ref, onScroll]);

  return progress;
}

// ── XP toast ──────────────────────────────────────────────────────────────────
function XpToast({ xp, visible }: { xp: number; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && xp > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-20 right-6 z-[200] px-4 py-2 border border-neon-acid bg-surface/90 backdrop-blur font-mono text-sm neon-text-acid flex items-center gap-2"
        >
          <CheckCircle size={14} /> +{xp} ПХ начислено
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Expanded article modal с прогресс-трекером ────────────────────────────────
function ArticleModal({
  article, onClose,
}: {
  article: NonNullable<ReturnType<typeof articles.find>>;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const progress  = useScrollProgress(scrollRef);

  const [savedProgress, setSavedProgress] = useState(0);
  const [xpEarned,      setXpEarned]      = useState(0);
  const [showToast,     setShowToast]      = useState(false);
  const [isSaving,      setIsSaving]       = useState(false);
  const [lightboxOpen,  setLightboxOpen]   = useState(false);
  const lastSavedRef    = useRef(0);

  const type     = TOPIC_TO_TYPE[article.topic] || "Публикация";
  const slug     = `article-${article.id}`;
  const category = article.topic.toLowerCase().replace(/\s+/g, '-');

  // Регистрируем открытие (10% прогресс)
  useEffect(() => {
    if (!user) return;
    apiPost("/api/knowledge/progress", {
      slug, title: article.title, type, category, progress: 10,
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.earned_xp) setXpEarned(d.earned_xp);
        if (d?.progress)  setSavedProgress(d.progress);
      })
      .catch(() => {});
    lastSavedRef.current = 10;
  }, [article.id, user]);

  // Сохраняем прогресс когда он вырос на ≥10% с последнего сохранения
  useEffect(() => {
    if (!user) return;
    if (isSaving) return;
    if (progress <= lastSavedRef.current) return;
    if (progress - lastSavedRef.current < 10 && progress < 100) return;

    setIsSaving(true);
    lastSavedRef.current = progress;

    apiPost("/api/knowledge/progress", {
      slug, title: article.title, type, category, progress,
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.xp_delta && d.xp_delta > 0) {
          setXpEarned(prev => prev + d.xp_delta);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
        if (d?.progress) setSavedProgress(d.progress);
      })
      .catch(() => {})
      .finally(() => setIsSaving(false));
  }, [progress, user, slug, article, type, category, isSaving]);

  // Закрытие: сохраняем финальный прогресс
  const handleClose = useCallback(async () => {
    if (user && progress > lastSavedRef.current) {
      await apiPost("/api/knowledge/progress", {
        slug, title: article.title, type, category, progress,
      }).catch(() => {});
    }
    onClose();
  }, [user, progress, slug, article, type, category, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  // Эффективный % для отображения
  const displayPct = Math.max(progress, savedProgress);

  return (
    <>
      <XpToast xp={xpEarned} visible={showToast} />

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md"
        onClick={handleClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        className="fixed inset-2 sm:inset-4 md:inset-8 z-50 bg-surface neon-border overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-border z-10">
          <motion.div
            className="h-full bg-neon-cyan"
            animate={{ width: `${displayPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border flex-shrink-0 pt-5">
          <button onClick={handleClose}
            className="inline-flex items-center gap-2 px-3 py-2 border border-border hover:neon-border-cyan font-mono text-xs uppercase tracking-widest transition">
            <ArrowLeft size={14} /> Back
          </button>

          <div className="flex items-center gap-4">
            {/* Прогресс */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <BookOpen size={12} className={displayPct >= 100 ? "neon-text-acid" : "neon-text-cyan"} />
              <span className={displayPct >= 100 ? "neon-text-acid" : ""}>
                {displayPct >= 100 ? "Прочитано ✓" : `${displayPct}% прочитано`}
              </span>
            </div>
            {/* ПХ */}
            {xpEarned > 0 && (
              <div className="font-mono text-xs neon-text-acid">+{xpEarned} ПХ</div>
            )}
            {/* Тип */}
            <div className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1">
              {type}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">

            {/* Meta */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-widest neon-text-cyan border border-neon-cyan/30 px-2 py-1">
                {article.topic}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {article.readTime} мин чтения
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl neon-text-violet mb-8 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg font-display neon-text-cyan mb-8">{article.excerpt}</p>

            {/* Изображение статьи — кликабельное */}
            {article.image && (
              <div className="mb-8 cursor-pointer">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full max-h-[500px] object-contain rounded-md border border-neon-cyan/20 bg-background/40 transition hover:opacity-80"
                  onClick={() => setLightboxOpen(true)}
                />
              </div>
            )}

            {/* Основное тело — рендерим HTML из mockData */}
            <div
              className="prose-custom text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-border">
              <p className="text-muted-foreground text-sm flex items-center gap-2 flex-wrap">
                Доступ предоставлен в режиме ознакомительного протокола. Вы подключены к открытому архиву
                <span className="inline-flex items-center gap-1 text-white font-semibold">
                  <img src={nazrosLogo} alt="nazrOS" className="h-5 w-auto opacity-90" />
                  nazrOS
                </span>
              </p>

              {/* Прогресс в конце */}
              {!user && (
                <div className="mt-4 p-3 border border-neon-cyan/20 bg-neon-cyan/5 font-mono text-xs text-muted-foreground">
                  💡 Войди в CyberEden чтобы прогресс чтения сохранялся и начислялись ПХ
                </div>
              )}

              {user && displayPct >= 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 border border-neon-acid/40 bg-neon-acid/5 font-mono text-xs neon-text-acid flex items-center gap-2"
                >
                  <CheckCircle size={14} />
                  Материал полностью прочитан! Итого начислено: +{xpEarned} ПХ
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="flex-shrink-0 px-6 py-3 border-t border-border bg-surface/80 backdrop-blur flex items-center gap-4">
          <div className="flex-1 bg-background/40 border border-border h-2">
            <motion.div
              className="bg-neon-cyan h-full transition-all"
              animate={{ width: `${displayPct}%` }}
            />
          </div>
          <div className="font-mono text-xs text-muted-foreground whitespace-nowrap">
            {displayPct}% · {type}
          </div>
          {user && (
            <div className="font-mono text-xs neon-text-acid whitespace-nowrap">
              +{xpEarned} ПХ
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox — увеличенное изображение */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-[10000] p-2 bg-surface/50 hover:bg-surface/80 rounded-full border border-border transition"
          >
            <X size={28} className="neon-text-cyan" />
          </button>
          
          <img 
            src={article.image} 
            alt={article.title} 
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </>
  );
}

// ── Страница журнала ──────────────────────────────────────────────────────────
function JournalPage() {
  const { t } = useI18n();
  const [topic,  setTopic]  = useState<(typeof topics)[number]>("Все");
  const [openId, setOpenId] = useState<string | null>(null);
  const active = articles.find(a => a.id === openId) ?? null;

  const filtered = useMemo(
    () => (topic === "Все" ? articles : articles.filter(a => a.topic === topic)),
    [topic],
  );

  return (
    <PageShell eyebrow={t("journal.eyebrow")} title={t("journal.title")} subtitle={t("journal.subtitle")}>

      {/* Фильтры тем */}
      <div className="mb-8 flex flex-wrap gap-2">
        {topics.map(tp => (
          <button key={tp} onClick={() => setTopic(tp)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest border transition-all ${
              tp === topic ? "neon-border neon-text-violet" : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            {tp === "Все" ? t("filter.all") : tp}
          </button>
        ))}
      </div>

      {/* Карточки — без изображений */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(a => (
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

      {/* Expanded modal с трекингом */}
      <AnimatePresence>
        {active && (
          <ArticleModal
            key={active.id}
            article={active}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}
