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
      <div className="space-y-6 font-mono text-sm text-muted-foreground">
        
        {/* Пункт 1 */}
        <div>
          <h2 className="font-display text-lg neon-text-cyan mb-2">
            1. Хранение данных
          </h2>
          <p>
            Мы несём ответственность за хранение ваших данных. Все данные,
            которые вы предоставляете платформе, хранятся в защищённой среде
            и не передаются третьим лицам без вашего согласия.
          </p>
        </div>

        {/* Пункт 2 */}
        <div>
          <h2 className="font-display text-lg neon-text-cyan mb-2">
            2. Интеллектуальные права (NFT)
          </h2>
          <p>
            Всё, что вы загружаете в киберпространство КиберэдэН,
            автоматически переходит в категорию NFT. При этом ваш аккаунт
            полностью владеет интеллектуальными правами на загруженный материал.
          </p>
        </div>

        {/* Пункт 3 */}
        <div>
          <h2 className="font-display text-lg neon-text-cyan mb-2">
            3. Использование скачанного
          </h2>
          <p>
            Всё, что вы скачали из киберпространства КиберэдэН, вы можете
            использовать в любых своих личных целях без ограничений.
          </p>
        </div>

        <p className="mt-8 text-xs text-muted-foreground border-t border-border pt-4">
          Последнее обновление: 10 июня 2026 года.
        </p>
      </div>
    </div>
  );
}
