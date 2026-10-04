export type TournamentType =
  | "FNCS"
  | "Victory Cup"
  | "Cash Cup"
  | "Reload"
  | "Ranked Cup"
  | "Other";

export type TournamentStatus =
  | "upcoming"
  | "live"
  | "completed";

export type Tournament = {
  id: string;

  name: string;
  type: TournamentType;

  season?: string;
  chapter?: string;

  region?: string;
  platform?: string;

  status: TournamentStatus;

  startTime: string;
  endTime?: string;

  logoUrl?: string;

  pointsSystem?: {
    placementPoints?: Record<number, number>;
    eliminationPoints?: number;
  };
};
