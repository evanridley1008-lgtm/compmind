export type MatchCategory =
  | "Tournament"
  | "Ranked"
  | "Pub";

export type MatchType =
  | "fncs"
  | "victory-cup"
  | "cash-cup"
  | "reload"
  | "ranked-cup"
  | "ranked"
  | "battle-royale"
  | "zero-build";

export type GameMode =
  | "Solo"
  | "Duos"
  | "Trios"
  | "Squads";

export type MatchStats = {
  placement: number;
  eliminations: number;
  damage: number;
  survivalTime?: string;
  killsPerMinute?: number;
};

export type Match = {
  id: string;

  userId: string;

  category: MatchCategory;
  type: MatchType;

  eventId?: string;
  eventName?: string;
  eventRound?: string;

  mode: GameMode;

  playedAt: string;

  points?: number;
  rankChange?: number;

  stats: MatchStats;

  analyzed: boolean;
  analysisId?: string;
};
