import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/10 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 flex-wrap">
          <Link to="/" className="text-xs text-muted-foreground hover:text-white">
            Главная
          </Link>
          <Link to="/dashboard" className="text-xs text-muted-foreground hover:text-white">
            Дашборд
          </Link>
          <Link to="/journal" className="text-xs text-muted-foreground hover:text-white">
            Журнал
          </Link>
          <Link to="/lab" className="text-xs text-muted-foreground hover:text-white">
            Техлаб
          </Link>
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-white">
            Политика конфиденциальности
          </Link>
          <Link to="/salary" className="text-xs text-muted-foreground hover:text-white">
            Экономика Киберов
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} nazrOS
        </div>
      </div>
    </footer>
  );
}