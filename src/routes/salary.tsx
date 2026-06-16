import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { PageShell } from '@/components/PageShell'

export const Route = createLazyFileRoute('/salary')({
  component: SalaryPage,
})

function SalaryPage() {
  return (
    <PageShell
      eyebrow="// Внутренняя экономика"
      title="Экономика устройств"
      subtitle="Какие возможности Кибера в nazrOS"
    >
      <div className="space-y-6 max-w-3xl">
        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <h3 className="font-display text-lg neon-text-violet mb-3">Концепция</h3>
          <p className="text-sm text-muted-foreground">
            Вся активность nazrOS строится вокруг производства и внедрения собственных устройств.
            Поэтому Кибер получает <strong>натуральные устройства</strong> — произведённые внутри технологичного конгломерата nazrOS.
          </p>
        </div>

        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <h3 className="font-display text-lg neon-text-violet mb-3">Принципы</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Все Киберы получают вознаграждение готовыми устройствами nazrOS.</li>
            <li>Любой софт nazrOS открыт без подписок и платных дополнений.</li>
            <li>Устройства, полученные в качестве компенсации затраченного времени, являются личной собственностью Кибера.</li>
            <li>nazrOS может выкупить устройство по стоимости производства.</li>
          </ul>
        </div>

        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <h3 className="font-display text-lg neon-text-violet mb-3">Таблица конвертации</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-mono text-xs text-muted-foreground">Устройство</th>
                  <th className="text-left py-2 font-mono text-xs text-muted-foreground">Внутренняя стоимость</th>
                  <th className="text-left py-2 font-mono text-xs text-muted-foreground">Единица оклада</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="py-2">cloN (digital key wallet)</td>
                  <td className="py-2 text-muted-foreground">186 000 ₽</td>
                  <td className="py-2 font-mono text-right">1 × cloN</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">blaN (инженерный ноутбук)</td>
                  <td className="py-2 text-muted-foreground">348 000 ₽</td>
                  <td className="py-2 font-mono text-right">1 × blaN</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">biohN (городская пасека)</td>
                  <td className="py-2 text-muted-foreground">248 000 ₽</td>
                  <td className="py-2 font-mono text-right">1 × biohN</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">rostN (гроубокс)</td>
                  <td className="py-2 text-muted-foreground">128 000 ₽</td>
                  <td className="py-2 font-mono text-right">1 × rostN</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">piN (настольная фабрика)</td>
                  <td className="py-2 text-muted-foreground">890 000 ₽</td>
                  <td className="py-2 font-mono text-right">1 × piN</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">visioN (кибер-оптика)</td>
                  <td className="py-2 text-muted-foreground">15 400 ₽</td>
                  <td className="py-2 font-mono text-right">1 × visioN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <h3 className="font-display text-lg neon-text-violet mb-3">Преимущества</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 border border-border/30 rounded">
              <p className="font-mono text-xs neon-text-cyan mb-1">Кибер</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-xs">
                <li>Все устройства — собственность</li>
                <li>Доступ к экосистемам из дома</li>
                <li>Ценность устройств растёт</li>
              </ul>
            </div>
            <div className="p-3 border border-border/30 rounded">
              <p className="font-mono text-xs neon-text-cyan mb-1">nazrOS</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-xs">
                <li>Отсутствует устаревшая система транзакций</li>
                <li>Замкнутый цикл производства</li>
                <li>Стимулирует мотивацию</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <h3 className="font-display text-lg neon-text-violet mb-3">Таблица вакансий</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-mono text-xs text-muted-foreground">Позиция</th>
                  <th className="text-left py-2 font-mono text-xs text-muted-foreground">Задачи</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'inzhener-sborshchik' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Инженер-сборщик устройств
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Сборка cloN, blaN, biohN по инструкциям стадий. Пайка плат, монтаж корпусов, финальное тестирование.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'operator-3d-pechati' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Оператор 3D-печати
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Печать корпусов, кассет и оснастки на piN. Подбор материалов, калибровка принтера, постобработка.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'razrabotchik-vstraivaemykh-sistem' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Разработчик встраиваемых систем
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Написание прошивок для устройств nazrOS на C++ и Rust. Интеграция с экосистемой через nazrOS LINK.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'inzhener-tekhnik-tsod' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Инженер-техник ЦОД
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Обслуживание серверного оборудования ЦОД nazrOS, замена комплектующих, мониторинг инфраструктуры.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'razrabotchik-stranno' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Разработчик страННо (C++/Rust)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Разработка высокопроизводительного ядра страННо для WebGPU и WASM. Визуальные эффекты, физика, звук.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'frontend-razrabotchik' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Frontend-разработчик (Next.js)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Разработка интерфейсов для КиберэдэН, Дашборда, Журнала, Трансляций в стиле nazrOS.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'golang-razrabotchik' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Golang-разработчик (бэкенд)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Разработка высокопроизводительных микросервисов для nazrOS. Обработка событий, WebSocket-серверы, аналитика в реальном времени.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'angular-razrabotchik' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Angular-разработчик (административные панели)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Разработка административных панелей для редактирования КиберэдэН.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'react-native-razrabotchik' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      React Native-разработчик (мобильное приложение)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Разработка мобильного приложения КефирННо и КиберэдэН для iOS и Android.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'smm-menedzher' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      SMM-менеджер (киберпанк-эстетика)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Ведение Telegram-канала, VK, TikTok. Создание контента в стиле nazrOS.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'komyuniti-menedzher' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Комьюнити-менеджер
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Работа с сообществом Киберов. Проведение ивентов, поддержка в чатах.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'tekhnicheskiy-pisatel' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Технический писатель
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Написание документации для стадий устройств, FAQ, гайдов, туториалов.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'igrovoy-dizayner' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      Игровой дизайнер (CyberEden desktop)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Дизайн игровых механик, квестов, сценариев для десктопной игры CyberEden.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: '3d-modeler' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      3D-моделлер (игровые ассеты)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Создание 3D-моделей персонажей, окружения и предметов для CyberEden.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'ui-ux-dizayner' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      UI/UX-дизайнер (игры)
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Дизайн интерфейсов, HUD, меню и экранов для десктопной игры CyberEden.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">
                    <Link
                      to="/jobs/$slug"
                      params={{ slug: 'pr-menedzher' }}
                      className="hover:neon-text-cyan transition-colors"
                    >
                      PR-менеджер
                    </Link>
                  </td>
                  <td className="py-2 text-muted-foreground">Взаимодействие со СМИ, подготовка пресс-релизов, организация мероприятий.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <h3 className="font-display text-lg neon-text-violet mb-3">Формулировка для вакансий</h3>
          <div className="p-4 border border-neon-cyan/20 rounded text-sm text-muted-foreground">
            <p className="italic">
              «Вознаграждение выплачивается натуральными устройствами nazrOS (cloN, blaN, biohN, rostN, piN, visioN). 
              Все программные продукты страННо, кефирННо и ядро nazrOS доступны без подписок и платных дополнений. 
              Разработчик получает устройства на руки и становится их собственником.»
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}