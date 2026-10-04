export type TrainingDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "elite";

export type TrainingObjectiveStatus =
  | "not-started"
  | "in-progress"
  | "completed";

export type TrainingObjective = {
  id: string;

  title: string;
  description: string;

  category: string;

  difficulty: TrainingDifficulty;

  estimatedMinutes: number;

  status: TrainingObjectiveStatus;

  target?: string;

  progress: number;
};

export type TrainingPlan = {
  id: string;

  userId: string;

  title: string;

  description?: string;

  createdAt: string;

  startDate?: string;
  endDate?: string;

  objectives: TrainingObjective[];

  completionPercentage: number;
};
