import { createFileRoute } from '@tanstack/react-router'
import { PageShell } from '@/components/PageShell'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/jobs/$slug')({
  component: JobPage,
})

// Инструкции для каждой вакансии
const instructions: Record<string, { title: string; steps: string[] }> = {
  'inzhener-sborshchik': {
    title: 'Инженер-сборщик устройств',
    steps: [
      '1. Создайте аккаунт на GitHub: https://github.com/join',
      '2. Установите Git: https://git-scm.com/downloads',
      '3. Настройте Git: git config --global user.name "Ваше имя" && git config --global user.email "ваш.email@example.com"',
      '4. Создайте аккаунт на Twitch: https://www.twitch.tv/signup',
      '5. Зарегистрируйтесь в КиберэдэН: https://cybereden.ru',
      '6. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '7. Создайте ветку: git checkout -b feature/ваша-задача',
      '8. Запустите проект локально: npm install && npm run dev',
      '9. Выполните задание (сборка устройства, пайка плат, монтаж корпусов)',
      '10. Сделайте коммит: git add . && git commit -m "feat: добавил сборку cloN"',
      '11. Отправьте изменения: git push origin feature/ваша-задача',
      '12. Откройте Pull Request в GitHub',
      '13. Получите вознаграждение устройством nazrOS',
    ],
  },
  'operator-3d-pechati': {
    title: 'Оператор 3D-печати',
    steps: [
      '1. Создайте аккаунт на GitHub: https://github.com/join',
      '2. Установите Git и настройте его',
      '3. Зарегистрируйтесь в КиберэдэН',
      '4. Клонируйте репозиторий с моделями: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Установите и настройте 3D-принтер (piN)',
      '6. Выберите модель из папки assets/',
      '7. Настройте параметры печати (температура, скорость, заполнение)',
      '8. Запустите печать и контролируйте процесс',
      '9. Проведите постобработку деталей (очистка, шлифовка)',
      '10. Сделайте фото и отчёт о выполненной работе',
      '11. Создайте коммит и пуш: git commit -m "feat: напечатал корпус для cloN"',
      '12. Откройте Pull Request с отчётом и фотографиями',
    ],
  },
  'razrabotchik-vstraivaemykh-sistem': {
    title: 'Разработчик встраиваемых систем',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Клонируйте репозиторий с прошивками: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '4. Установите Arduino IDE или PlatformIO',
      '5. Выберите устройство для прошивки (cloN, blaN, biohN, rostN, piN, visioN)',
      '6. Откройте проект прошивки в IDE',
      '7. Внесите изменения (добавьте новую функцию, исправьте баг)',
      '8. Соберите прошивку (Build)',
      '9. Подключите устройство через USB-C и прошейте (Upload)',
      '10. Проверьте работоспособность устройства',
      '11. Сделайте коммит: git add . && git commit -m "fix: исправил ошибку в прошивке cloN"',
      '12. Отправьте изменения: git push origin feature/ваша-задача',
      '13. Откройте Pull Request с описанием изменений',
      '14. Получите вознаграждение устройством nazrOS',
    ],
  },
  'inzhener-tekhnik-tsod': {
    title: 'Инженер-техник ЦОД',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Ознакомьтесь с документацией ЦОД nazrOS',
      '4. Установите систему мониторинга (Prometheus + Grafana)',
      '5. Настройте уведомления о сбоях',
      '6. Выполните плановое обслуживание серверов',
      '7. Замените комплектующие (при необходимости)',
      '8. Ведите журнал обслуживания в GitHub',
      '9. Создайте коммит: git add . && git commit -m "docs: обновил журнал обслуживания"',
      '10. Откройте Pull Request с отчётом',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  'razrabotchik-stranno': {
    title: 'Разработчик страННо (C++/Rust)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите компилятор C++ (gcc) и Rust (rustup)',
      '4. Клонируйте репозиторий страННо: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Установите Emscripten для компиляции в WASM',
      '6. Запустите сборку: make build-wasm',
      '7. Внесите изменения в ядро (добавьте новую ноду, исправьте баг)',
      '8. Пересоберите проект и запустите тесты',
      '9. Сделайте коммит: git add . && git commit -m "feat: добавил новую ноду для композитинга"',
      '10. Отправьте изменения: git push origin feature/ваша-задача',
      '11. Откройте Pull Request с описанием изменений',
      '12. Получите вознаграждение устройством nazrOS',
    ],
  },
  'frontend-razrabotchik': {
    title: 'Frontend-разработчик (Next.js)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите Node.js (версия 20+) и pnpm',
      '4. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Установите зависимости: pnpm install',
      '6. Запустите проект локально: pnpm run dev',
      '7. Выполните задачу (разработка новой страницы, компонента)',
      '8. Сделайте коммит: git add . && git commit -m "feat: добавил страницу журнала"',
      '9. Отправьте изменения: git push origin feature/ваша-задача',
      '10. Откройте Pull Request в GitHub',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  'golang-razrabotchik': {
    title: 'Golang-разработчик (бэкенд)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите Go (golang.org/dl)',
      '4. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Создайте новую ветку: git checkout -b feature/ваша-задача',
      '6. Напишите микросервис на Go для обработки событий',
      '7. Запустите тесты: go test ./...',
      '8. Сделайте коммит: git add . && git commit -m "feat: добавил микросервис для событий"',
      '9. Отправьте изменения: git push origin feature/ваша-задача',
      '10. Откройте Pull Request в GitHub',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  'angular-razrabotchik': {
    title: 'Angular-разработчик (административные панели)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите Node.js и Angular CLI: npm install -g @angular/cli',
      '4. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Создайте новую ветку: git checkout -b feature/ваша-задача',
      '6. Создайте административную панель для управления заказами',
      '7. Запустите проект: ng serve',
      '8. Сделайте коммит: git add . && git commit -m "feat: добавил админ-панель для заказов"',
      '9. Отправьте изменения: git push origin feature/ваша-задача',
      '10. Откройте Pull Request в GitHub',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  'react-native-razrabotchik': {
    title: 'React Native-разработчик (мобильное приложение)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите Node.js и Expo CLI: npm install -g expo-cli',
      '4. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Создайте новую ветку: git checkout -b feature/ваша-задача',
      '6. Создайте мобильное приложение (КефирННо или КиберэдэН)',
      '7. Запустите Expo: npx expo start',
      '8. Сделайте коммит: git add . && git commit -m "feat: добавил экран для профиля"',
      '9. Отправьте изменения: git push origin feature/ваша-задача',
      '10. Откройте Pull Request в GitHub',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  'smm-menedzher': {
    title: 'SMM-менеджер (киберпанк-эстетика)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Создайте аккаунт в Telegram, VK, TikTok',
      '4. Изучите стиль nazrOS (неон, киберпанк, HUD-интерфейсы)',
      '5. Создайте контент-план на неделю',
      '6. Опубликуйте пост в Telegram-канале nazrOS',
      '7. Сделайте скриншот и отчёт',
      '8. Создайте коммит: git add . && git commit -m "feat: опубликовал пост в Telegram"',
      '9. Отправьте изменения: git push origin feature/ваша-задача',
      '10. Откройте Pull Request с отчётом',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  'komyuniti-menedzher': {
    title: 'Комьюнити-менеджер',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Создайте аккаунт в Discord и Telegram',
      '4. Изучите сообщество Киберов',
      '5. Проведите ивент (хакатон, стрим, турнир)',
      '6. Сделайте отчёт об ивенте',
      '7. Создайте коммит: git add . && git commit -m "feat: провёл ивент для сообщества"',
      '8. Отправьте изменения: git push origin feature/ваша-задача',
      '9. Откройте Pull Request с отчётом',
      '10. Получите вознаграждение устройством nazrOS',
    ],
  },
  'tekhnicheskiy-pisatel': {
    title: 'Технический писатель',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '4. Изучите документацию по устройствам nazrOS (cloN, blaN, biohN, rostN, piN, visioN)',
      '5. Создайте новую ветку: git checkout -b feature/ваша-задача',
      '6. Напишите гайд по сборке cloN или запуску стрима',
      '7. Сделайте коммит: git add . && git commit -m "docs: добавил гайд по сборке cloN"',
      '8. Отправьте изменения: git push origin feature/ваша-задача',
      '9. Откройте Pull Request с документацией',
      '10. Получите вознаграждение устройством nazrOS',
    ],
  },
  'igrovoy-dizayner': {
    title: 'Игровой дизайнер (CyberEden desktop)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите Godot или Unreal Engine',
      '4. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Создайте новую ветку: git checkout -b feature/ваша-задача',
      '6. Разработайте квест (например, "Как получить загранпаспорт")',
      '7. Проведите тестирование квеста',
      '8. Сделайте коммит: git add . && git commit -m "feat: добавил квест про загранпаспорт"',
      '9. Отправьте изменения: git push origin feature/ваша-задача',
      '10. Откройте Pull Request с описанием квеста',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  '3d-modeler': {
    title: '3D-моделлер (игровые ассеты)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите Blender',
      '4. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Создайте новую ветку: git checkout -b feature/ваша-задача',
      '6. Создайте 3D-модель (персонаж, оружие, элемент окружения)',
      '7. Экспортируйте модель в FBX или glTF',
      '8. Сделайте коммит: git add . && git commit -m "feat: добавил 3D-модель для игры"',
      '9. Отправьте изменения: git push origin feature/ваша-задача',
      '10. Откройте Pull Request с моделью',
      '11. Получите вознаграждение устройством nazrOS',
    ],
  },
  'ui-ux-dizayner': {
    title: 'UI/UX-дизайнер (игры)',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Установите Figma',
      '4. Клонируйте репозиторий: git clone https://github.com/nazrOS-softhard/cybereden-v1.1.0.git',
      '5. Создайте новую ветку: git checkout -b feature/ваша-задача',
      '6. Создайте дизайн интерфейса (HUD, меню, экран)',
      '7. Сделайте коммит: git add . && git commit -m "feat: добавил дизайн HUD"',
      '8. Отправьте изменения: git push origin feature/ваша-задача',
      '9. Откройте Pull Request с дизайном',
      '10. Получите вознаграждение устройством nazrOS',
    ],
  },
  'pr-menedzher': {
    title: 'PR-менеджер',
    steps: [
      '1. Создайте аккаунт на GitHub',
      '2. Зарегистрируйтесь в КиберэдэН',
      '3. Создайте аккаунт в Telegram, VK, X (Twitter)',
      '4. Подготовьте пресс-релиз о новом устройстве nazrOS',
      '5. Отправьте пресс-релиз в СМИ',
      '6. Сделайте отчёт об упоминаниях',
      '7. Создайте коммит: git add . && git commit -m "feat: отправил пресс-релиз"',
      '8. Отправьте изменения: git push origin feature/ваша-задача',
      '9. Откройте Pull Request с отчётом',
      '10. Получите вознаграждение устройством nazrOS',
    ],
  },
}

function JobPage() {
  const { slug } = Route.useParams()
  const job = instructions[slug]

  if (!job) {
    return (
      <PageShell
        eyebrow="// Ошибка"
        title="Инструкция не найдена"
        subtitle="Такой вакансии не существует"
      >
        <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
          <p className="text-red-500">Вернитесь на страницу вакансий.</p>
          <Link to="/salary" className="mt-4 inline-block text-sm neon-text-cyan hover:underline">
            ← Вернуться к экономике устройств
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell
      eyebrow={`// Инструкция для ${job.title}`}
      title={job.title}
      subtitle="Пошаговое руководство"
    >
      <div className="hud-corners p-6 border border-border bg-surface/30 backdrop-blur-sm">
        <ol className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground">
          {job.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </PageShell>
  )
}