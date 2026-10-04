export type AnalysisCategory =
  | "fighting"
  | "positioning"
  | "rotations"
  | "resources"
  | "endgame"
  | "mechanics"
  | "decision-making";

export type AnalysisSeverity =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type AnalysisFinding = {
  id: string;

  category: AnalysisCategory;

  title: string;
  description: string;

  severity: AnalysisSeverity;

  timestamp?: string;

  confidence?: number;

  recommendation?: string;
};

export type GameplayAnalysis = {
  id: string;

  userId: string;
  matchId: string;

  status:
    | "queued"
    | "processing"
    | "completed"
    | "failed";

  createdAt: string;
  completedAt?: string;

  overallScore?: number;

  strengths: string[];
  weaknesses: string[];

  findings: AnalysisFinding[];

  summary?: string;
};
