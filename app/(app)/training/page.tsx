"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import SectionCard from "../../../components/shared/SectionCard";
import ProgressBar from "../../../components/shared/ProgressBar";
import StatusBadge from "../../../components/shared/StatusBadge";

type ObjectiveStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

type Objective = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ELITE";
  estimatedMinutes: number;
  status: ObjectiveStatus;
  progress: number;
};

type TrainingPlan = {
  id: string;
  title: string;
  description: string | null;
  completionPercentage: number;
  objectives: Objective[];
};

const categoryScores = [
  { name: "Mechanics", score: 91, change: 4 },
  { name: "Fighting", score: 76, change: 2 },
  { name: "Positioning", score: 68, change: -3 },
  { name: "Rotations", score: 63, change: -6 },
  { name: "Endgame", score: 71, change: 3 },
];

const categoryFilters = [
  "All",
  "Mechanics",
  "Fighting",
  "Positioning",
  "Rotations",
  "Endgame",
];

function getStatusBadge(status: ObjectiveStatus) {
  if (status === "COMPLETED") {
    return {
      label: "Completed",
      style: "success" as const,
    };
  }

  if (status === "IN_PROGRESS") {
    return {
      label: "In progress",
      style: "info" as const,
    };
  }

  return {
    label: "Not started",
    style: "neutral" as const,
  };
}

function getDifficultyStyle(difficulty: Objective["difficulty"]) {
  switch (difficulty) {
    case "ELITE":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "ADVANCED":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "INTERMEDIATE":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

export default function TrainingPage() {
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  async function loadTraining() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/training");

      if (!response.ok) {
        throw new Error("Failed to load training data.");
      }

      const data = (await response.json()) as TrainingPlan;

      setTrainingPlan(data);
    } catch (err) {
      console.error(err);
      setError("We couldn't load your training plan.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTraining();
  }, []);

  async function updateObjective(
    objectiveId: string,
    status: ObjectiveStatus,
    progress?: number,
  ) {
    try {
      setUpdatingId(objectiveId);

      const response = await fetch("/api/training", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectiveId,
          status,
          progress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update objective.");
      }

      await loadTraining();
    } catch (err) {
      console.error(err);
      setError("We couldn't update that objective.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function advanceObjective(objective: Objective) {
    if (objective.status === "NOT_STARTED") {
      await updateObjective(objective.id, "IN_PROGRESS", 25);
      return;
    }

    if (objective.status === "IN_PROGRESS") {
      const nextProgress = Math.min(objective.progress + 25, 100);

      if (nextProgress >= 100) {
        await updateObjective(objective.id, "COMPLETED", 100);
      } else {
        await updateObjective(objective.id, "IN_PROGRESS", nextProgress);
      }

      return;
    }

    await updateObjective(objective.id, "NOT_STARTED", 0);
  }

  async function resetObjective(objective: Objective) {
    await updateObjective(objective.id, "NOT_STARTED", 0);
  }

  async function generateRoutine() {
    if (!trainingPlan) {
      return;
    }

    try {
      setGenerating(true);
      setError("");

      const generatedPlan = [
        {
          title: "Mechanics Activation",
          category: "Mechanics",
          progress: 0,
        },
        {
          title: "Fight Conversion",
          category: "Fighting",
          progress: 0,
        },
        {
          title: "Early Rotation Practice",
          category: "Rotations",
          progress: 0,
        },
        {
          title: "Endgame Layer Discipline",
          category: "Endgame",
          progress: 0,
        },
      ];

      for (const objective of trainingPlan.objectives) {
        await updateObjective(objective.id, "NOT_STARTED", 0);
      }

      for (let index = 0; index < generatedPlan.length; index++) {
        const generated = generatedPlan[index];
        const existing = trainingPlan.objectives.find(
          (objective) => objective.category === generated.category,
        );

        if (!existing) {
          continue;
        }

        await updateObjective(existing.id, "NOT_STARTED", generated.progress);
      }

      await loadTraining();
    } catch (err) {
      console.error(err);
      setError("We couldn't regenerate your routine.");
    } finally {
      setGenerating(false);
    }
  }

  const filteredObjectives = useMemo(() => {
    if (!trainingPlan) {
      return [];
    }

    if (activeFilter === "All") {
      return trainingPlan.objectives;
    }

    return trainingPlan.objectives.filter(
      (objective) => objective.category === activeFilter,
    );
  }, [trainingPlan, activeFilter]);

  const completedCount =
    trainingPlan?.objectives.filter(
      (objective) => objective.status === "COMPLETED",
    ).length ?? 0;

  const totalMinutes =
    trainingPlan?.objectives.reduce(
      (total, objective) => total + objective.estimatedMinutes,
      0,
    ) ?? 0;

  const activeObjectives =
    trainingPlan?.objectives.filter(
      (objective) => objective.status !== "COMPLETED",
    ).length ?? 0;

  if (loading) {
    return (
      <div className="cm-page">
        <PageHeader
          eyebrow="Training"
          title="Your training plan"
          description="Loading your personalised competitive training plan."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>

        <div className="mt-6 h-96 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    );
  }

  if (!trainingPlan) {
    return (
      <div className="cm-page">
        <PageHeader
          eyebrow="Training"
          title="Your training plan"
          description="Your personalised training plan could not be loaded."
        />

        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error || "No training plan was found."}
        </div>
      </div>
    );
  }

  return (
    <div className="cm-page">
      <PageHeader
        eyebrow="Training"
        title="Train with purpose."
        description="Turn your gameplay weaknesses into focused practice and measurable improvement."
        actions={
          <button
            type="button"
            className="cm-button cm-button-primary"
            onClick={generateRoutine}
            disabled={generating || updatingId !== null}
          >
            {generating ? "Generating..." : "Generate Routine"}
          </button>
        }
      />

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Plan completion
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {Math.round(trainingPlan.completionPercentage)}%
          </p>

          <div className="mt-3">
            <ProgressBar
              value={trainingPlan.completionPercentage}
              showPercentage={false}
            />
          </div>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Completed objectives
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {completedCount}
            <span className="text-lg font-medium text-slate-400">
              {" "}
              / {trainingPlan.objectives.length}
            </span>
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Objectives completed
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Training time
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {totalMinutes}m
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Planned practice time
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Active objectives
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {activeObjectives}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Still requiring work
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <SectionCard
          title="AI Focus"
          description="Your current training priority based on recent performance."
        >
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Priority area
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Rotations
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Your rotation score is currently your lowest major
                  performance category. CompMind recommends practising earlier
                  rotates and reducing late-zone movement.
                </p>
              </div>

              <div className="rounded-xl bg-white px-4 py-3 text-center shadow-sm">
                <p className="text-xs font-medium text-slate-500">Score</p>
                <p className="mt-1 text-2xl font-bold text-slate-950">63</p>
              </div>
            </div>

            <div className="mt-5">
              <ProgressBar
                value={63}
                label="Rotation performance"
                showPercentage
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Training Principle"
          description="The CompMind approach."
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg">
                🎯
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-950">
                Fix the weakness that costs you games.
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Training is generated from your actual gameplay rather than a
                generic routine.
              </p>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Current focus
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Earlier rotations → safer positions → stronger endgames.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Training Objectives"
        description={`${trainingPlan.objectives.length} objectives in your current plan.`}
        className="mt-6"
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {categoryFilters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredObjectives.map((objective) => {
            const badge = getStatusBadge(objective.status);
            const updating = updatingId === objective.id;

            return (
              <div
                key={objective.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-950">
                        {objective.title}
                      </h3>

                      <StatusBadge status={badge.style}>
                        {badge.label}
                      </StatusBadge>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getDifficultyStyle(
                          objective.difficulty,
                        )}`}
                      >
                        {objective.difficulty}
                      </span>
                    </div>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                      {objective.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>{objective.category}</span>
                      <span>{objective.estimatedMinutes} minutes</span>
                      <span>{Math.round(objective.progress)}% complete</span>
                    </div>

                    <div className="mt-4 max-w-2xl">
                      <ProgressBar
                        value={objective.progress}
                        showPercentage
                      />
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    {objective.status !== "COMPLETED" ? (
                      <button
                        type="button"
                        className="cm-button cm-button-primary"
                        disabled={updating}
                        onClick={() => advanceObjective(objective)}
                      >
                        {updating
                          ? "Updating..."
                          : objective.status === "NOT_STARTED"
                            ? "Start Training"
                            : "Log Progress"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="cm-button cm-button-secondary"
                        disabled={updating}
                        onClick={() => resetObjective(objective)}
                      >
                        Reset Objective
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredObjectives.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <p className="font-semibold text-slate-900">
                No objectives in this category.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try another training category.
              </p>
            </div>
          )}
        </div>
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Weekly Focus"
          description="Your current performance categories."
        >
          <div className="space-y-5">
            {categoryScores.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {category.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">
                      {category.score}
                    </span>

                    <span
                      className={`text-xs font-semibold ${
                        category.change >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {category.change >= 0 ? "+" : ""}
                      {category.change}
                    </span>
                  </div>
                </div>

                <ProgressBar
                  value={category.score}
                  showPercentage={false}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="How CompMind training works"
          description="The long-term improvement loop."
        >
          <div className="space-y-4">
            {[
              {
                number: "01",
                title: "Analyse",
                description:
                  "CompMind studies your matches and identifies recurring patterns.",
              },
              {
                number: "02",
                title: "Prioritise",
                description:
                  "The system selects the weaknesses that have the biggest impact.",
              },
              {
                number: "03",
                title: "Train",
                description:
                  "You receive specific drills designed around those weaknesses.",
              },
              {
                number: "04",
                title: "Improve",
                description:
                  "New gameplay is measured against previous performance.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="flex gap-4 rounded-xl border border-slate-200 p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">
                  {step.number}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {step.title}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              CompMind Training Engine
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Your routine should evolve as you improve.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              As more gameplay is analysed, CompMind will continuously adjust
              your training priorities, objectives and difficulty.
            </p>
          </div>

          <button
            type="button"
            className="cm-button shrink-0 bg-white text-slate-950 hover:bg-slate-100"
            onClick={generateRoutine}
            disabled={generating || updatingId !== null}
          >
            {generating ? "Regenerating..." : "Regenerate Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}