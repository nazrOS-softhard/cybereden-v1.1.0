import { createLazyFileRoute } from '@tanstack/react-router'
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
            Вся деятельность nazrOS строится вокруг производства и внедрения собственных устройств.
            Поэтому Кибер получает <strong>натуральные устройства</strong> — произведённые внутри технологичного конгломерата nazrOS.
          </p>
        </div>

        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <h3 className="font-display text-lg neon-text-violet mb-3">Принципы</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Все сотрудники получают вознаграждение готовыми устройствами nazrOS (cloN, blaN, biohN, rostN, piN, visioN).</li>
            <li>Любой софт nazrOS открыт без подписок и платных дополнений.</li>
            <li>Устройства, полученные в качестве вознаграждения, являются личной собственностью сотрудника.</li>
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
              <p className="font-mono text-xs neon-text-cyan mb-1">Для сотрудника</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-xs">
                <li>Все устройства — собственность</li>
                <li>Доступ к экосистеме из дома</li>
                <li>Ценность устройств растёт</li>
              </ul>
            </div>
            <div className="p-3 border border-border/30 rounded">
              <p className="font-mono text-xs neon-text-cyan mb-1">Для nazrOS</p>
              <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-xs">
                <li>Нет банковских переводов</li>
                <li>Замкнутый цикл производства</li>
                <li>Стимулирует развитие</li>
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
                  <td className="py-2">Инженер-сборщик устройств</td>
                  <td className="py-2 text-muted-foreground">Сборка cloN, blaN, biohN по инструкциям стадий. Пайка плат, монтаж корпусов, финальное тестирование.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">Оператор 3D-печати</td>
                  <td className="py-2 text-muted-foreground">Печать корпусов, кассет и оснастки на piN. Подбор материалов, калибровка принтера, постобработка.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">Разработчик встраиваемых систем</td>
                  <td className="py-2 text-muted-foreground">Написание прошивок для устройств nazrOS на C++ и Rust. Интеграция с экосистемой через nazrOS LINK.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">Инженер-техник ЦОД</td>
                  <td className="py-2 text-muted-foreground">Обслуживание серверного оборудования ЦОД nazrOS, замена комплектующих, мониторинг инфраструктуры.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">Разработчик страННо (C++/Rust)</td>
                  <td className="py-2 text-muted-foreground">Разработка высокопроизводительного ядра страННо для WebGPU и WASM. Визуальные эффекты, физика, звук.</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2">Frontend-разработчик (Next.js)</td>
                  <td className="py-2 text-muted-foreground">Разработка интерфейсов для КиберэдэН, Дашборда, Журнала, Трансляций в стиле nazrOS.</td>
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