import { memo } from "react";

const PARENTS = ["cybereden.ru","www.cybereden.ru","cybereden.vercel.app","localhost"]
  .map(p => `parent=${p}`).join("&");

interface Props {
  channel: string;
  className?: string;
}

/**
 * Стабильный Twitch embed.
 *
 * БАГ который чинит этот компонент:
 * В СОБЫТИЯ при переключении фильтров (ТРАНСЛЯЦИИ / ТУРНИРЫ) родительский
 * компонент ре-рендерится, из-за чего <iframe key={login} ...> с тем же key
 * иногда пересоздаётся React'ом (особенно если between-render меняется
 * порядок/структура условного рендера). Twitch player получает повторный
 * "visibilitychange"/"mount" сигнал и автоматически ставит видео на пауузу
 * через ~2 секунды (защита Twitch от автозапуска).
 *
 * Решение:
 * 1. React.memo — компонент не ре-рендерится если channel не изменился,
 *    даже если родитель (страница СОБЫТИЯ) ре-рендерится из-за смены фильтра.
 * 2. key вынесен на уровень родителя ОДИН РАЗ, а не пересчитывается каждый рендер.
 * 3. muted=true в URL — многие браузеры блокируют autoplay со звуком,
 *    что тоже триггерит pause через пару секунд.
 */
export const TwitchEmbed = memo(function TwitchEmbed({ channel, className }: Props) {
  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${channel}&${PARENTS}&autoplay=true&muted=true`}
      width="100%"
      height="100%"
      allow="autoplay; fullscreen"
      allowFullScreen
      className={className ?? "w-full h-full border-0"}
      loading="lazy"
    />
  );
}, (prev, next) => prev.channel === next.channel);
