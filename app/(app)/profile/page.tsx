"use client";

import { useState } from "react";

const stats = [
  {
    label: "CompMind Rating",
    value: "11,410",
    change: "+184",
    positive: true,
  },
  {
    label: "Tournament PR",
    value: "11,410",
    change: "+620",
    positive: true,
  },
  {
    label: "K/D",
    value: "3.42",
    change: "+0.31",
    positive: true,
  },
  {
    label: "Top 10 Rate",
    value: "41.7%",
    change: "+4.8%",
    positive: true,
  },
];

const recentResults = [
  {
    event: "Cyberpunk Cup",
    date: "Sep 19, 2026",
    placement: "#5,908",
    eliminations: 27,
    matches: 11,
    points: "—",
  },
  {
    event: "Reload Duos Victory Cup",
    date: "Sep 11, 2026",
    placement: "#8,753",
    eliminations: 18,
    matches: 6,
    points: "—",
  },
  {
    event: "Duos Ranked Event 3",
    date: "Sep 8, 2026",
    placement: "#2,494",
    eliminations: 21,
    matches: 8,
    points: "—",
  },
  {
    event: "Duos Ranked Event 1",
    date: "Sep 5, 2026",
    placement: "#4,958",
    eliminations: 16,
    matches: 7,
    points: "—",
  },
];

const achievements = [
  {
    icon: "🏆",
    title: "First Tournament Win",
    description: "Won your first tracked competitive event.",
    unlocked: true,
  },
  {
    icon: "⚡",
    title: "10+ Elimination Game",
    description: "Recorded a game with 10 or more eliminations.",
    unlocked: true,
  },
  {
    icon: "🎯",
    title: "100 Eliminations",
    description: "Reach 100 competitive eliminations.",
    unlocked: true,
  },
  {
    icon: "🔥",
    title: "7 Day Streak",
    description: "Train consistently for seven consecutive days.",
    unlocked: false,
  },
  {
    icon: "📈",
    title: "Rating Breakthrough",
    description: "Reach a CompMind Rating of 12,000.",
    unlocked: false,
  },
  {
    icon: "👑",
    title: "Elite Competitor",
    description: "Reach the Elite competitive performance tier.",
    unlocked: false,
  },
];

const strengths = [
  { label: "Mechanics", value: 91 },
  { label: "Fighting", value: 76 },
  { label: "Resources", value: 82 },
];

const weaknesses = [
  { label: "Rotations", value: 63 },
  { label: "Positioning", value: 68 },
  { label: "Endgame", value: 71 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "results" | "achievements"
  >("overview");

  const [editing, setEditing] = useState(false);

  const [displayName, setDisplayName] = useState("MŸKO");
  const [bio, setBio] = useState(
    "Competitive Fortnite player focused on improving tournament performance."
  );

  return (
    <div className="cm-page">
      {/* Profile hero */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500" />

        <div className="px-5 pb-6 sm:px-7">
          <div className="-mt-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-slate-950 text-2xl font-black text-white shadow-lg">
                MŸ
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                    {displayName}
                  </h1>

                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    Pro
                  </span>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    EU
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Fortnite Competitive Player
                </p>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  {bio}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="cm-button cm-button-secondary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>

              <button
                type="button"
                className="cm-button cm-button-primary"
              >
                Share Profile
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-slate-100 pt-5 text-xs text-slate-500">
            <span>
              <strong className="text-slate-950">12</strong> tournaments
            </span>

            <span>
              <strong className="text-slate-950">96</strong> eliminations
            </span>

            <span>
              <strong className="text-slate-950">1</strong> tournament win
            </span>

            <span>
              Member since <strong className="text-slate-950">2026</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {[
          ["overview", "Overview"],
          ["results", "Tournament Results"],
          ["achievements", "Achievements"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() =>
              setActiveTab(
                id as "overview" | "results" | "achievements"
              )
            }
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === id
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <>
          {/* Stats */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="cm-card p-5">
                <p className="text-xs font-semibold text-slate-500">
                  {stat.label}
                </p>

                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-2xl font-black tracking-tight text-slate-950">
                    {stat.value}
                  </p>

                  <span
                    className={`text-xs font-bold ${
                      stat.positive
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[72%] rounded-full bg-blue-500" />
                </div>
              </div>
            ))}
          </section>

          {/* Performance */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="cm-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Competitive Performance
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your CompMind Rating over recent competitive play.
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  +18.4%
                </span>
              </div>

              <div className="mt-7">
                <div className="flex h-56 items-end gap-2">
                  {[35, 42, 39, 48, 46, 55, 51, 62, 59, 68, 73, 82].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="group relative flex h-full flex-1 items-end"
                      >
                        <div
                          className="w-full rounded-t-md bg-blue-100 transition group-hover:bg-blue-500"
                          style={{ height: `${height}%` }}
                        />

                        {index === 11 && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2 py-1 text-[10px] font-bold text-white">
                            11,410
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>

                <div className="mt-3 flex justify-between text-[10px] font-semibold text-slate-400">
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                </div>
              </div>
            </div>

            <div className="cm-card p-6">
              <div>
                <h2 className="text-base font-bold text-slate-950">
                  Performance Breakdown
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest AI analysis scores.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      Mechanics
                    </span>
                    <span className="text-xs font-bold text-slate-950">
                      91
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[91%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      Fighting
                    </span>
                    <span className="text-xs font-bold text-slate-950">
                      76
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[76%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      Positioning
                    </span>
                    <span className="text-xs font-bold text-slate-950">
                      68
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[68%] rounded-full bg-amber-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      Rotations
                    </span>
                    <span className="text-xs font-bold text-slate-950">
                      63
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[63%] rounded-full bg-red-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      Endgame
                    </span>
                    <span className="text-xs font-bold text-slate-950">
                      71
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[71%] rounded-full bg-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strengths / weaknesses */}
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="cm-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  ✓
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Strengths
                  </h2>

                  <p className="text-xs text-slate-500">
                    Areas currently performing well.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {strengths.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-semibold text-slate-700">
                        {item.label}
                      </span>

                      <span className="text-sm font-bold text-emerald-600">
                        {item.value}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cm-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  !
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Current Focus
                  </h2>

                  <p className="text-xs text-slate-500">
                    Areas CompMind recommends improving.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {weaknesses.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-semibold text-slate-700">
                        {item.label}
                      </span>

                      <span className="text-sm font-bold text-amber-600">
                        {item.value}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="cm-button cm-button-primary mt-6 w-full"
              >
                View Improvement Plan
              </button>
            </div>
          </section>
        </>
      )}

      {/* Results */}
      {activeTab === "results" && (
        <section className="cm-card mt-6 overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-5">
            <h2 className="text-base font-bold text-slate-950">
              Tournament History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your recent competitive results tracked by CompMind.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {recentResults.map((result) => (
              <div
                key={`${result.event}-${result.date}`}
                className="p-5 transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">
                      {result.event}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {result.date}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Placement
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-950">
                        {result.placement}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Matches
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-950">
                        {result.matches}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Eliminations
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-950">
                        {result.eliminations}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Points
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-950">
                        {result.points}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {activeTab === "achievements" && (
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className={`rounded-2xl border p-5 ${
                achievement.unlocked
                  ? "border-slate-200 bg-white shadow-sm"
                  : "border-slate-100 bg-slate-50/60 opacity-70"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                  {achievement.icon}
                </div>

                {achievement.unlocked ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Unlocked
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Locked
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-sm font-bold text-slate-950">
                {achievement.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                {achievement.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update how your competitive profile appears.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Display Name
                </label>

                <input
                  value={displayName}
                  onChange={(event) =>
                    setDisplayName(event.target.value)
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Bio
                </label>

                <textarea
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  rows={4}
                  className="cm-input resize-none py-3"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="cm-button cm-button-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setEditing(false)}
                className="cm-button cm-button-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
