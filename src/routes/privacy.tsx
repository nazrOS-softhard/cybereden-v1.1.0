import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl neon-text-violet mb-6">
        Политика конфиденциальности
      </h1>
      <div className="space-y-4 font-mono text-sm text-muted-foreground">
        <p>
          nazrOS уважает вашу конфиденциальность. Мы собираем только те
          данные, которые необходимы для работы платформы.
        </p>

        <div>
          <h2 className="font-display text-lg neon-text-cyan mt-4">
            1. Какие данные мы собираем
          </h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>Имя и аватар из Telegram</li>
            <li>Данные о ваших действиях на платформе</li>
            <li>Технические данные: IP, браузер, устройство</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg neon-text-cyan mt-4">
            2. Как мы используем данные
          </h2>
          <ul className="list-disc pl-4 space-y-1">
            <li>Для работы платформы</li>
            <li>Для улучшения пользовательского опыта</li>
            <li>Для аналитики</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg neon-text-cyan mt-4">
            3. Контакты
          </h2>
          <p>
            По вопросам конфиденциальности:{" "}
            <a href="mailto:privacy@nazros.ru" className="text-neon-cyan hover:underline">
              privacy@nazros.ru
            </a>
          </p>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Последнее обновление: 10 июня 2026 года.
        </p>
      </div>
    </div>
  );
}
