"use client";

import { useMemo, useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import SectionCard from "../../../components/shared/SectionCard";
import ProgressBar from "../../../components/shared/ProgressBar";
import StatusBadge from "../../../components/shared/StatusBadge";

type ObjectiveStatus = "Not started" | "In progress" | "Completed";

type Objective = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Intermediate" | "Advanced" | "Elite";
  duration: number;
  progress: number;
  status: ObjectiveStatus;
};

const initialObjectives: Objective[] = [
  {
    id: 1,
    title: "Piece Control Activation",
    description:
      "High-speed edits, protected piece placement and controlled right-hand peeks.",
    category: "Mechanics",
    difficulty: "Elite",
    duration: 20,
    progress: 100,
    status: "Completed",
  },
  {
    id: 2,
    title: "Fight Conversion Drills",
    description:
      "Convert early damage advantages into eliminations without giving opponents reset opportunities.",
    category: "Fighting",
    difficulty: "Advanced",
    duration: 25,
    progress: 60,
    status: "In progress",
  },
  {
    id: 3,
    title: "Early Rotation Practice",
    description:
      "Read the next zone and move before the storm forces you into exposed rotations.",
    category: "Rotations",
    difficulty: "Advanced",
    duration: 20,
    progress: 0,
    status: "Not started",
  },
  {
    id: 4,
    title: "Mid-Game Positioning",
    description:
      "Practise taking protected positions with fewer angles exposed to surrounding players.",
    category: "Positioning",
    difficulty: "Advanced",
    duration: 20,
    progress: 0,
    status: "Not started",
  },
  {
    id: 5,
    title: "Moving Zone Layer Discipline",
    description:
      "Maintain the correct layer and avoid unnecessary late-game movement.",
    category: "Endgame",
    difficulty: "Elite",
    duration: 25,
    progress: 0,
    status: "Not started",
  },
];

const categoryScores = [
  { name: "Mechanics", score: 91, change: "+4" },
  { name: "Fighting", score: 76, change: "+2" },
  { name: "Positioning", score: 68, change: "-3" },
  { name: "Rotations", score: 63, change: "-6" },
  { name: "Endgame", score: 71, change: "+3" },
];

function getStatusBadge(status: ObjectiveStatus) {
  if (status === "Completed") return "success" as const;
  if (status === "In progress") return "processing" as const;
  return "neutral" as const;
}

function getDifficultyStyle(difficulty: Objective["difficulty"]) {
  if (difficulty === "Elite") {
    return "bg-purple-50 text-purple-700 border-purple-100";
  }

  if (difficulty === "Advanced") {
    return "bg-blue-50 text-blue-700 border-blue-100";
  }

  return "bg-slate-50 text-slate-600 border-slate-200";
}

export default function TrainingPage() {
  const [objectives, setObjectives] =
    useState<Objective[]>(initialObjectives);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Mechanics",
    "Fighting",
    "Positioning",
    "Rotations",
    "Endgame",
  ];

  const filteredObjectives = useMemo(() => {
    if (selectedCategory === "All") {
      return objectives;
    }

    return objectives.filter(
      (objective) => objective.category === selectedCategory,
    );
  }, [objectives, selectedCategory]);

  const completedCount = objectives.filter(
    (objective) => objective.status === "Completed",
  ).length;

  const overallProgress = Math.round(
    objectives.reduce((total, objective) => total + objective.progress, 0) /
      objectives.length,
  );

  const totalMinutes = objectives.reduce(
    (total, objective) => total + objective.duration,
    0,
  );

  function advanceObjective(id: number) {
    setObjectives((current) =>
      current.map((objective) => {
        if (objective.id !== id) {
          return objective;
        }

        if (objective.status === "Not started") {
          return {
            ...objective,
            status: "In progress",
            progress: 25,
          };
        }

        if (objective.status === "In progress") {
          const nextProgress = Math.min(objective.progress + 25, 100);

          return {
            ...objective,
            progress: nextProgress,
            status:
              nextProgress >= 100 ? "Completed" : ("In progress" as const),
          };
        }

        return {
          ...objective,
          status: "Not started",
          progress: 0,
        };
      }),
    );
  }

  function generateRoutine() {
    setObjectives([
      {
        id: 101,
        title: "Mechanics Activation",
        description:
          "Warm up edits, piece control and movement before entering competitive games.",
        category: "Mechanics",
        difficulty: "Elite",
        duration: 15,
        progress: 0,
        status: "Not started",
      },
      {
        id: 102,
        title: "Fight Conversion",
        description:
          "Practise converting first damage into controlled eliminations.",
        category: "Fighting",
        difficulty: "Advanced",
        duration: 25,
        progress: 0,
        status: "Not started",
      },
      {
        id: 103,
        title: "Early Rotation Practice",
        description:
          "Focus on identifying safe routes and rotating before the zone closes.",
        category: "Rotations",
        difficulty: "Advanced",
        duration: 20,
        progress: 0,
        status: "Not started",
      },
      {
        id: 104,
        title: "Endgame Layer Discipline",
        description:
          "Practise maintaining a strong layer through moving zones.",
        category: "Endgame",
        difficulty: "Elite",
        duration: 25,
        progress: 0,
        status: "Not started",
      },
    ]);

    setSelectedCategory("All");
  }

  return (
    <div className="cm-page">
      <PageHeader
        eyebrow="PERSONALISED DEVELOPMENT"
        title="Training"
        description="Turn your gameplay analysis into a focused competitive training plan."
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={generateRoutine}
              className="cm-button cm-button-primary"
            >
              Generate Routine
            </button>

            <button type="button" className="cm-button cm-button-secondary">
              Training History
            </button>
          </div>
        }
      />

      {/* Overview */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="cm-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Today's Progress
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {overallProgress}%
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-600">
              {completedCount}/{objectives.length}
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar value={overallProgress} />
          </div>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Planned Training
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Across today's objectives
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Training Streak
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">6 days</p>

          <p className="mt-1 text-sm font-medium text-emerald-600">
            Personal best: 11 days
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Weekly Training
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">4h 35m</p>

          <p className="mt-1 text-sm text-slate-500">
            76% of weekly target
          </p>
        </div>
      </div>

      {/* AI recommendation */}
      <div className="mt-6">
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white">
          <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    AI Focus
                  </span>

                  <span className="text-xs font-medium text-slate-500">
                    Based on your latest analysis
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold text-slate-950">
                  Prioritise rotations this week
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Your mechanics are already one of your strongest areas.
                  Recent analysis shows that late rotations are creating more
                  avoidable pressure during mid-game and endgame situations.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-blue-100 bg-white p-4 text-center">
                <p className="text-xs font-medium text-slate-500">
                  Rotation Score
                </p>
                <p className="mt-1 text-3xl font-bold text-slate-950">63</p>
                <p className="text-xs font-semibold text-red-600">
                  -6 recently
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Detected Pattern
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                Late zone movement
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Three recent matches contained late rotations.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Recommended Drill
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                Early Rotation Practice
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                20 minutes focused on zone reads and safe routes.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Target
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                Rotation score 70+
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Maintain the target across your next 10 analysed matches.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Training objectives */}
      <div className="mt-6">
        <SectionCard
          title="Today's Training"
          description="Complete objectives to build your daily training progress."
        >
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredObjectives.map((objective) => (
              <div
                key={objective.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-950">
                        {objective.title}
                      </h3>

                      <StatusBadge
                        status={getStatusBadge(objective.status)}
                      >
                        {objective.status}
                      </StatusBadge>

                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${getDifficultyStyle(
                          objective.difficulty,
                        )}`}
                      >
                        {objective.difficulty}
                      </span>
                    </div>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                      {objective.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                      <span>{objective.category}</span>
                      <span>•</span>
                      <span>{objective.duration} minutes</span>
                    </div>
                  </div>

                  <div className="w-full lg:w-64">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        Progress
                      </span>

                      <span className="text-xs font-bold text-slate-900">
                        {objective.progress}%
                      </span>
                    </div>

                    <ProgressBar value={objective.progress} />

                    <button
                      type="button"
                      onClick={() => advanceObjective(objective.id)}
                      className={`cm-button mt-3 w-full ${
                        objective.status === "Completed"
                          ? "cm-button-secondary"
                          : "cm-button-primary"
                      }`}
                    >
                      {objective.status === "Not started"
                        ? "Start Training"
                        : objective.status === "In progress"
                          ? "Log Progress"
                          : "Reset Objective"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredObjectives.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <p className="font-semibold text-slate-900">
                No objectives in this category
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Generate a new routine to create focused objectives.
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Weekly focus */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Weekly Focus"
          description="Your current performance areas and their direction."
        >
          <div className="space-y-5">
            {categoryScores.map((category) => {
              const improving = category.change.startsWith("+");

              return (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {category.name}
                      </p>

                      <p
                        className={`text-xs font-medium ${
                          improving ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {category.change} this period
                      </p>
                    </div>

                    <span className="text-lg font-bold text-slate-950">
                      {category.score}
                    </span>
                  </div>

                  <ProgressBar value={category.score} />
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          title="CompMind Training Principle"
          description="How your training system is designed to work."
        >
          <div className="space-y-4">
            <TrainingPrinciple
              number="01"
              title="Analyse"
              description="CompMind identifies patterns from your gameplay."
            />

            <TrainingPrinciple
              number="02"
              title="Prioritise"
              description="The system turns your biggest weaknesses into focused objectives."
            />

            <TrainingPrinciple
              number="03"
              title="Practise"
              description="Complete targeted drills instead of generic practice."
            />

            <TrainingPrinciple
              number="04"
              title="Measure"
              description="Your scores and match data show whether the training is working."
            />
          </div>
        </SectionCard>
      </div>

      {/* Bottom callout */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-blue-300">
              CompMind
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Train for the weaknesses that actually affect your games.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Your training plan will eventually update automatically as new
              replays are analysed and your performance changes.
            </p>
          </div>

          <button
            type="button"
            onClick={generateRoutine}
            className="cm-button shrink-0 bg-white text-slate-950 hover:bg-slate-100"
          >
            Regenerate Plan
          </button>
        </div>
      </div>
    </div>
  );
}

function TrainingPrinciple({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
        {number}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}