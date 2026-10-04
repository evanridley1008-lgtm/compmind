"use client";

import { useEffect, useMemo, useState } from "react";

type RoutineStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED";

type RoutineObjective = {
  id: string;
  title: string;
  category: string;
  duration: number;
  status: RoutineStatus;
  progress: number;
  routineId: string;
};

type Routine = {
  id: string;
  title: string;
  description: string | null;
  dayOfWeek: number | null;
  objectives: RoutineObjective[];
};

const categoryStyles: Record<string, string> = {
  Mechanics: "bg-blue-50 text-blue-700",
  Fighting: "bg-violet-50 text-violet-700",
  Rotations: "bg-amber-50 text-amber-700",
  Endgame: "bg-emerald-50 text-emerald-700",
  Aim: "bg-rose-50 text-rose-700",
  Positioning: "bg-cyan-50 text-cyan-700",
  Preparation: "bg-slate-100 text-slate-600",
  Competition: "bg-orange-50 text-orange-700",
  Review: "bg-indigo-50 text-indigo-700",
};

const statusStyles: Record<RoutineStatus, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-600",
  IN_PROGRESS: "bg-blue-50 text-blue-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
};

const statusLabels: Record<RoutineStatus, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

const dayLabels: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const dayFullLabels: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function getObjectiveDescription(objective: RoutineObjective) {
  const descriptions: Record<string, string> = {
    "Piece Control Warm-up":
      "Run controlled piece-control drills focused on clean edits, protected peaks and fast resets.",
    "Edit Speed Drills":
      "Build faster, cleaner edits while maintaining consistency and control.",
    "Aim Control":
      "Focus on controlled tracking and shotgun accuracy during realistic Fortnite fights.",
    "Fight Conversion Drills":
      "Practice converting opening damage advantages into safe eliminations instead of overextending.",
    "Box Fight Conversion":
      "Practice turning first damage into controlled fight wins without giving opponents unnecessary opportunities.",
    "Early Rotation Practice":
      "Focus on leaving areas earlier and reaching stronger positions before congestion.",
    "Mid-Game Rotation Review":
      "Review previous games and identify the earliest safe timing to rotate before zones become congested.",
    "Mid-Game Positioning":
      "Practice taking protected positions with fewer exposed angles during the mid game.",
    "Protected Angle Practice":
      "Practice maintaining cover and reducing the number of angles opponents can pressure.",
    "Moving Zone Layer Discipline":
      "Practice staying protected while maintaining options for moving zones.",
    "Endgame Positioning":
      "Build stronger layers and positioning decisions during moving zones and stacked endgames.",
    "Tournament Warm-up":
      "Prepare mechanics, movement and decision-making before entering a competitive session.",
    "Competitive Matches":
      "Apply the week's training priorities in real competitive matches.",
    "Post-Match Review":
      "Review important fights, rotations and decisions immediately after competitive games.",
    "Weekly VOD Review":
      "Review the week's strongest and weakest games to identify recurring patterns.",
    "Performance Review":
      "Review scores, objectives and results before preparing the next training cycle.",
  };

  return (
    descriptions[objective.title] ??
    `Practice ${objective.category.toLowerCase()} skills with a focused ${objective.duration}-minute session.`
  );
}

function getTodayDay() {
  return new Date().getDay();
}

export default function RoutinePage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [selectedDay, setSelectedDay] = useState("Today");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const todayDay = getTodayDay();

  async function loadRoutines() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/routine");

      if (!response.ok) {
        throw new Error("Failed to load routines.");
      }

      const data = (await response.json()) as Routine[];

      setRoutines(data);
    } catch (err) {
      console.error(err);
      setError("We couldn't load your routine.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRoutines();
  }, []);

  const selectedDayNumber = useMemo(() => {
    if (selectedDay === "Today") {
      return todayDay;
    }

    const entry = Object.entries(dayLabels).find(
      ([, label]) => label === selectedDay,
    );

    return entry ? Number(entry[0]) : todayDay;
  }, [selectedDay, todayDay]);

  const selectedRoutine = useMemo(() => {
    return routines.find(
      (routine) => routine.dayOfWeek === selectedDayNumber,
    );
  }, [routines, selectedDayNumber]);

  const routineObjectives = selectedRoutine?.objectives ?? [];

  const completedCount = routineObjectives.filter(
    (item) => item.status === "COMPLETED",
  ).length;

  const inProgressCount = routineObjectives.filter(
    (item) => item.status === "IN_PROGRESS",
  ).length;

  const totalMinutes = useMemo(
    () =>
      routineObjectives.reduce(
        (total, item) => total + item.duration,
        0,
      ),
    [routineObjectives],
  );

  const completedMinutes = useMemo(
    () =>
      routineObjectives
        .filter((item) => item.status === "COMPLETED")
        .reduce((total, item) => total + item.duration, 0),
    [routineObjectives],
  );

  const completion =
    routineObjectives.length === 0
      ? 0
      : Math.round(
          (completedCount / routineObjectives.length) * 100,
        );

  async function updateObjective(
    objectiveId: string,
    status: RoutineStatus,
    progress: number,
  ) {
    try {
      setUpdatingId(objectiveId);
      setError("");

      const response = await fetch("/api/routine", {
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
        throw new Error("Failed to update routine objective.");
      }

      await loadRoutines();
    } catch (err) {
      console.error(err);
      setError("We couldn't update that routine objective.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function cycleStatus(objective: RoutineObjective) {
    if (objective.status === "NOT_STARTED") {
      await updateObjective(objective.id, "IN_PROGRESS", 50);
      return;
    }

    if (objective.status === "IN_PROGRESS") {
      await updateObjective(objective.id, "COMPLETED", 100);
      return;
    }

    await updateObjective(objective.id, "NOT_STARTED", 0);
  }

  async function generateRoutine() {
    /*
     * The generation engine will eventually use the Analysis system.
     *
     * For now we reset the existing routine objectives so the user
     * can begin another training cycle without creating duplicate
     * database records.
     */
    try {
      setError("");

      for (const objective of routineObjectives) {
        await updateObjective(
          objective.id,
          "NOT_STARTED",
          0,
        );
      }

      setShowAddModal(false);

      await loadRoutines();
    } catch (err) {
      console.error(err);
      setError("We couldn't regenerate your routine.");
    }
  }

  const weekButtons = [
    { label: "Today", day: todayDay },
    { label: "Mon", day: 1 },
    { label: "Tue", day: 2 },
    { label: "Wed", day: 3 },
    { label: "Thu", day: 4 },
    { label: "Fri", day: 5 },
    { label: "Sat", day: 6 },
    { label: "Sun", day: 0 },
  ];

  if (loading) {
    return (
      <div className="cm-page">
        <div className="mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            Personal Training
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Routine
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Loading your personalised weekly routine.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>

        <div className="mt-6 h-[500px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
      </div>
    );
  }

  return (
    <div className="cm-page">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            Personal Training
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Routine
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Turn your CompMind findings into a structured weekly training
            routine and build consistency over time.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="cm-button cm-button-secondary"
          >
            + Add Objective
          </button>

          <button
            type="button"
            onClick={generateRoutine}
            className="cm-button cm-button-primary"
            disabled={updatingId !== null}
          >
            ✦ Generate Routine
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Week selector */}
      <div className="mb-6 flex overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        {weekButtons.map((day) => (
          <button
            key={day.label}
            type="button"
            onClick={() => setSelectedDay(day.label)}
            className={`min-w-[76px] flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              selectedDay === day.label
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Routine Completion
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <p className="text-2xl font-bold text-slate-950">
              {completion}%
            </p>

            <span className="text-xs font-semibold text-blue-600">
              {completedCount}/{routineObjectives.length}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Training Time
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {completedMinutes}m
          </p>

          <p className="mt-2 text-xs text-slate-400">
            of {totalMinutes}m planned
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Active Objectives
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {inProgressCount}
          </p>

          <p className="mt-2 text-xs text-blue-600">
            Currently in progress
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Current Streak
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            6 days
          </p>

          <p className="mt-2 text-xs text-emerald-600">
            Keep building consistency
          </p>
        </div>
      </div>

      {/* AI recommendation */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-white shadow-sm">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm">
                ✦
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
                  CompMind Recommendation
                </p>

                <h2 className="mt-1 text-base font-bold text-slate-950">
                  Prioritise rotations this week
                </h2>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                  Your recent analysis shows that rotation timing is currently
                  one of your largest improvement opportunities. The routine
                  has therefore increased rotation and endgame work.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={generateRoutine}
              className="cm-button cm-button-secondary shrink-0"
              disabled={updatingId !== null}
            >
              Regenerate
            </button>
          </div>
        </div>
      </section>

      {/* Main routine */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="cm-card overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-950">
                {selectedDay === "Today"
                  ? "Today's Training"
                  : `${dayFullLabels[selectedDayNumber]}'s Training`}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Complete each section to build your training streak.
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-400">
              {routineObjectives.length} objectives
            </span>
          </div>

          {routineObjectives.length === 0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                ○
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-950">
                No routine scheduled
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                There isn't a routine assigned to this day yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {routineObjectives.map((item, index) => {
                const completed = item.status === "COMPLETED";
                const inProgress = item.status === "IN_PROGRESS";
                const updating = updatingId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-5 transition ${
                      completed
                        ? "bg-emerald-50/20"
                        : "hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => cycleStatus(item)}
                        disabled={updating}
                        aria-label={`Change status for ${item.title}`}
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-bold transition ${
                          completed
                            ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                            : inProgress
                              ? "border-blue-200 bg-blue-50 text-blue-600"
                              : "border-slate-200 bg-white text-slate-400 hover:border-blue-300 hover:text-blue-600"
                        }`}
                      >
                        {updating ? "…" : completed ? "✓" : index + 1}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`text-sm font-bold ${
                                  completed
                                    ? "text-slate-500 line-through"
                                    : "text-slate-950"
                                }`}
                              >
                                {item.title}
                              </h3>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                  categoryStyles[item.category] ??
                                  "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {item.category}
                              </span>
                            </div>

                            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                              {getObjectiveDescription(item)}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                statusStyles[item.status]
                              }`}
                            >
                              {statusLabels[item.status]}
                            </span>

                            <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                              {item.duration} min
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                completed
                                  ? "bg-emerald-500"
                                  : inProgress
                                    ? "bg-blue-600"
                                    : "bg-slate-300"
                              }`}
                              style={{
                                width: `${Math.max(
                                  0,
                                  Math.min(100, item.progress),
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Weekly overview */}
        <aside className="space-y-6">
          <section className="cm-card overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-bold text-slate-950">
                Weekly Focus
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your current improvement priorities.
              </p>
            </div>

            <div className="space-y-4 p-5">
              {[
                {
                  name: "Rotations",
                  score: 63,
                  priority: "High",
                },
                {
                  name: "Positioning",
                  score: 68,
                  priority: "High",
                },
                {
                  name: "Endgame",
                  score: 71,
                  priority: "Medium",
                },
                {
                  name: "Fighting",
                  score: 76,
                  priority: "Medium",
                },
              ].map((focus) => (
                <div key={focus.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {focus.name}
                      </p>

                      <p className="text-[11px] text-slate-400">
                        {focus.priority} priority
                      </p>
                    </div>

                    <span className="text-sm font-bold text-slate-950">
                      {focus.score}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${focus.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cm-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                ✓
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-950">
                  Training Streak
                </h2>

                <p className="text-xs text-slate-400">
                  Consistency matters
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-end gap-2">
              <span className="text-4xl font-black tracking-tight text-slate-950">
                6
              </span>

              <span className="mb-1 text-sm font-medium text-slate-500">
                days
              </span>
            </div>

            <div className="mt-4 flex gap-1.5">
              {["M", "T", "W", "T", "F", "S", "S"].map(
                (day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="flex-1 text-center"
                  >
                    <div
                      className={`mx-auto flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${
                        index < 6
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {index < 6 ? "✓" : day}
                    </div>

                    <p className="mt-1 text-[9px] font-semibold text-slate-400">
                      {day}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300">
              CompMind Principle
            </p>

            <p className="mt-3 text-base font-bold leading-6">
              Train the weakness. Maintain the strength.
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Your routine automatically prioritises the areas where your
              recent gameplay shows the greatest opportunity for improvement.
            </p>
          </section>
        </aside>
      </div>

      {/* Add objective modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAddModal(false);
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                +
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-950">
                Add Training Objective
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                In the full training system, you will be able to choose from
                your CompMind recommendations or create your own objective.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="cm-button cm-button-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  generateRoutine();
                }}
                className="cm-button cm-button-primary"
                disabled={updatingId !== null}
              >
                Generate From Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}