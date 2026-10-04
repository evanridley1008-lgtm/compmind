"use client";

import { useState } from "react";

type Category = {
  name: string;
  score: number;
  change: number;
  description: string;
  priority: "High" | "Medium" | "Low";
};

type Objective = {
  id: number;
  title: string;
  category: string;
  description: string;
  progress: number;
  target: string;
  minutes: number;
};

const categories: Category[] = [
  {
    name: "Mechanics",
    score: 91,
    change: 4,
    description: "Editing, building and movement execution.",
    priority: "Low",
  },
  {
    name: "Fighting",
    score: 76,
    change: 2,
    description: "Fight selection, pressure and conversion.",
    priority: "Medium",
  },
  {
    name: "Positioning",
    score: 68,
    change: -3,
    description: "Space control, angles and safe positioning.",
    priority: "High",
  },
  {
    name: "Rotations",
    score: 63,
    change: -6,
    description: "Timing and pathing between zones.",
    priority: "High",
  },
  {
    name: "Resources",
    score: 82,
    change: 5,
    description: "Materials, ammo and healing management.",
    priority: "Low",
  },
  {
    name: "Endgame",
    score: 71,
    change: 3,
    description: "Layer selection, timing and closing games.",
    priority: "Medium",
  },
];

const initialObjectives: Objective[] = [
  {
    id: 1,
    title: "Rotate earlier into moving zones",
    category: "Rotations",
    description:
      "Begin your main rotation earlier when the next zone pulls away from your current position.",
    progress: 62,
    target: "Complete 10 controlled early rotations",
    minutes: 30,
  },
  {
    id: 2,
    title: "Improve mid-game positioning",
    category: "Positioning",
    description:
      "Avoid exposing yourself to multiple angles when taking space around POIs.",
    progress: 44,
    target: "Finish 8 games with no unnecessary crossfire deaths",
    minutes: 25,
  },
  {
    id: 3,
    title: "Convert more opening damage",
    category: "Fighting",
    description:
      "After creating a significant damage advantage, apply pressure instead of immediately disengaging.",
    progress: 31,
    target: "Convert 5 damage advantages into eliminations",
    minutes: 20,
  },
  {
    id: 4,
    title: "Maintain endgame layer discipline",
    category: "Endgame",
    description:
      "Prioritise stronger layers and avoid unnecessary downward movement during moving zones.",
    progress: 76,
    target: "Maintain preferred layer for 5 endgames",
    minutes: 30,
  },
];

const findings = [
  {
    category: "Rotations",
    severity: "High",
    title: "Three late rotations detected",
    description:
      "You began your main rotation after the zone had already closed significantly.",
    match: "FNCS Round 1 · Game 4",
    time: "12:48",
  },
  {
    category: "Positioning",
    severity: "High",
    title: "Exposed to multiple angles",
    description:
      "You held an open angle while another player had a clear line of sight from your right.",
    match: "Ranked Solo",
    time: "08:31",
  },
  {
    category: "Fighting",
    severity: "Medium",
    title: "Damage advantage not converted",
    description:
      "You dealt 112 damage but disengaged before establishing pressure.",
    match: "Victory Cup · Game 3",
    time: "06:42",
  },
  {
    category: "Mechanics",
    severity: "Low",
    title: "Strong piece control sequence",
    description:
      "Fast edit timing and controlled piece placement created a favourable close-range engagement.",
    match: "Ranked Solo",
    time: "10:17",
  },
];

function ScoreRing({ score }: { score: number }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-32 w-32">
      <svg
        className="h-32 w-32 -rotate-90"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-slate-100"
        />

        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          className="text-blue-600 transition-all duration-700"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-950">
          {score}
        </span>

        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Overall
        </span>
      </div>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: "High" | "Medium" | "Low";
}) {
  const styles = {
    High: "bg-red-50 text-red-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[priority]}`}
    >
      {priority} Priority
    </span>
  );
}

export default function ImprovementPage() {
  const [objectives, setObjectives] =
    useState(initialObjectives);

  function completeObjective(id: number) {
    setObjectives((current) =>
      current.map((objective) =>
        objective.id === id
          ? {
              ...objective,
              progress: Math.min(
                100,
                objective.progress + 10
              ),
            }
          : objective
      )
    );
  }

  const averageCategoryScore = Math.round(
    categories.reduce(
      (total, category) => total + category.score,
      0
    ) / categories.length
  );

  const completedObjectives = objectives.filter(
    (objective) => objective.progress >= 100
  ).length;

  return (
    <div className="cm-page">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
          Performance Intelligence
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Improvement
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Turn your gameplay data into clear priorities and measurable
          improvement.
        </p>
      </div>

      {/* Hero */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <ScoreRing score={78} />

              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Current performance level
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  Competitive
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                  Your strongest areas are mechanics and resource
                  management. The largest opportunities currently come
                  from rotations and positioning.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    +6% this month
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Based on 24 analysed matches
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Improvement focus
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-950">
              Rotations
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This is currently your largest measurable performance
              gap.
            </p>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Current score
                </span>

                <span className="text-xs font-bold text-slate-950">
                  63 / 100
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: "63%" }}
                />
              </div>
            </div>

            <button
              type="button"
              className="cm-button cm-button-primary mt-5 w-full"
              onClick={() => {
                document
                  .getElementById("objectives")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              View training objectives
            </button>
          </div>
        </div>
      </section>

      {/* Category scores */}
      <section className="mb-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Performance breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current performance across CompMind's analysis
              categories.
            </p>
          </div>

          <span className="hidden text-xs font-semibold text-slate-400 sm:block">
            Average: {averageCategoryScore}/100
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="cm-card cm-card-hover p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {category.description}
                  </p>
                </div>

                <PriorityBadge
                  priority={category.priority}
                />
              </div>

              <div className="mt-5 flex items-end justify-between">
                <span className="text-3xl font-bold tracking-tight text-slate-950">
                  {category.score}
                </span>

                <span
                  className={`text-xs font-bold ${
                    category.change >= 0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {category.change >= 0 ? "+" : ""}
                  {category.change}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${category.score}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section id="objectives" className="mb-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Active objectives
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current personalised training priorities.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {completedObjectives}/{objectives.length} completed
          </span>
        </div>

        <div className="space-y-3">
          {objectives.map((objective) => (
            <div
              key={objective.id}
              className="cm-card p-5"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-950">
                      {objective.title}
                    </h3>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                      {objective.category}
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                    {objective.description}
                  </p>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-slate-500">
                        Progress
                      </span>

                      <span className="text-xs font-bold text-slate-700">
                        {objective.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${objective.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span>
                      Target: {objective.target}
                    </span>

                    <span>
                      {objective.minutes} min
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={objective.progress >= 100}
                  onClick={() =>
                    completeObjective(objective.id)
                  }
                  className={`cm-button shrink-0 ${
                    objective.progress >= 100
                      ? "bg-emerald-50 text-emerald-700"
                      : "cm-button-secondary"
                  }`}
                >
                  {objective.progress >= 100
                    ? "Completed"
                    : "Log Progress"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Findings */}
      <section className="mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-950">
            Recent findings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Examples of the decisions CompMind has identified from
            your analysed gameplay.
          </p>
        </div>

        <div className="cm-card overflow-hidden">
          <div className="divide-y divide-slate-100">
            {findings.map((finding, index) => (
              <div
                key={`${finding.title}-${index}`}
                className="p-5 transition hover:bg-slate-50/70"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                      finding.severity === "High"
                        ? "bg-red-50 text-red-600"
                        : finding.severity === "Medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {finding.severity === "High"
                      ? "!"
                      : finding.severity === "Medium"
                        ? "•"
                        : "✓"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-950">
                        {finding.title}
                      </h3>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                        {finding.category}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {finding.description}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-3 text-xs text-slate-400">
                      <span>{finding.match}</span>
                      <span>•</span>
                      <span>{finding.time}</span>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      finding.severity === "High"
                        ? "bg-red-50 text-red-700"
                        : finding.severity === "Medium"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {finding.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            AI
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              CompMind Insight
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-950">
              Your mechanics are ahead of your decision-making.
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Your recent gameplay suggests that mechanical execution
              is not currently the biggest limitation on performance.
              Focusing your next training block on rotation timing and
              positioning should give you more opportunities to use
              those mechanics effectively.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
