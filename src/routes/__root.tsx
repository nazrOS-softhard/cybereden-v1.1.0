import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { TopNav } from "@/components/TopNav";
import { RainBackground } from "@/components/RainBackground";
import { LanguageProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center hud-corners p-10 border border-border bg-surface/40 backdrop-blur">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan">
          Signal lost
        </div>
        <h1 className="mt-3 font-display text-7xl neon-text-violet">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Узел не отвечает. Маршрут вне сетки nazrOS.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2 bg-primary text-primary-foreground font-display text-xs tracking-[0.25em] uppercase pulse-glow"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center hud-corners p-10 border border-border bg-surface/40 backdrop-blur">
        <div className="font-mono text-xs uppercase tracking-[0.4em] neon-text-cyan">
          System fault
        </div>
        <h1 className="mt-3 font-display text-2xl neon-text-violet">Сбой подсистемы</h1>
        <p className="mt-2 text-sm text-muted-foreground">Попробуйте повторить запрос.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-5 py-2 bg-primary text-primary-foreground font-display text-xs tracking-[0.25em] uppercase"
          >
            Retry
          </button>
          <a
            href="/"
            className="px-5 py-2 border border-border font-display text-xs tracking-[0.25em] uppercase hover:neon-border"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CyberEden · nazrOS" },
      {
        name: "description",
        content:
          "CyberEden — киберпанк-платформа nazrOS. Маркет имплантов, журнал, события, стримы и дашборд.",
      },
      { name: "author", content: "nazrOS" },
      { property: "og:title", content: "CyberEden · nazrOS" },
      {
        property: "og:description",
        content: "Маркет имплантов, журнал, события, стримы и дашборд под управлением nazrOS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <RainBackground />
        <TopNav />
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
