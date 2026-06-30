// src/lib/ranks.ts
// Единый источник правды для рангов CyberEden
// Импортируй rankFromXp везде где нужен ранг

export type Rank =
  | "НАБЛЮДАТЕЛЬ"
  | "ОПЕРАТОР"
  | "АРХИТЕКТОР ЯДРА"
  | "ГЛАВНЫЙ РАЗРАБОТЧИК";

export interface RankInfo {
  rank:       Rank;
  minXp:      number;
  maxXp:      number | null;  // null = без потолка
  color:      string;         // CSS класс или hex
  nextRank:   Rank | null;
  xpToNext:   (currentXp: number) => number | null;
}

export const RANK_TIERS: RankInfo[] = [
  {
    rank:     "НАБЛЮДАТЕЛЬ",
    minXp:    0,
    maxXp:    4999,
    color:    "text-muted-foreground",
    nextRank: "ОПЕРАТОР",
    xpToNext: (xp) => 5000 - xp,
  },
  {
    rank:     "ОПЕРАТОР",
    minXp:    5000,
    maxXp:    32999,
    color:    "neon-text-violet",
    nextRank: "АРХИТЕКТОР ЯДРА",
    xpToNext: (xp) => 33000 - xp,
  },
  {
    rank:     "АРХИТЕКТОР ЯДРА",
    minXp:    33000,
    maxXp:    84999,
    color:    "neon-text-cyan",
    nextRank: "ГЛАВНЫЙ РАЗРАБОТЧИК",
    xpToNext: (xp) => 85000 - xp,
  },
  {
    rank:     "ГЛАВНЫЙ РАЗРАБОТЧИК",
    minXp:    85000,
    maxXp:    null,
    color:    "neon-text-acid",
    nextRank: null,
    xpToNext: () => null,
  },
];

/** Возвращает ранг по количеству ПХ */
export function rankFromXp(xp: number): Rank {
  if (xp >= 85000) return "ГЛАВНЫЙ РАЗРАБОТЧИК";
  if (xp >= 33000) return "АРХИТЕКТОР ЯДРА";
  if (xp >= 5000)  return "ОПЕРАТОР";
  return "НАБЛЮДАТЕЛЬ";
}

/** Полная информация о ранге */
export function getRankInfo(xp: number): RankInfo {
  return RANK_TIERS.find(t => t.rank === rankFromXp(xp))!;
}

/** Прогресс до следующего ранга в % (0–100) */
export function rankProgress(xp: number): number {
  const info = getRankInfo(xp);
  if (!info.maxXp) return 100;
  const range = info.maxXp - info.minXp + 1;
  const done  = xp - info.minXp;
  return Math.min(100, Math.round((done / range) * 100));
}
