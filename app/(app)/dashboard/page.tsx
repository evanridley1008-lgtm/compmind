import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../lib/auth/session";

const stats = [
  {
    label: "PR",
    value: "11,410",
    change: "+420",
    description: "This season",
  },
  {
    label: "K/D",
    value: "3.42",
    change: "+0.31",
    description: "Last 30 days",
  },
  {
    label: "Avg. Placement",
    value: "#18.4",
    change: "↑ 4.2",
    description: "Last 30 days",
  },
  {
    label: "Games Analysed",
    value: "127",
    change: "+18",
    description: "This month",
  },
];

const matches = [
  {
    mode: "Ranked Solo",
    placement: "#4",
    eliminations: "8",
    kd: "4.00",
    date: "Today, 16:42",
    result: "Strong",
  },
  {
    mode: "Reload Duos",
    placement: "#7",
    eliminations: "11",
    kd: "5.50",
    date: "Today, 15:18",
    result: "Strong",
  },
  {
    mode: "Ranked Solo",
    placement: "#23",
    eliminations: "4",
    kd: "1.33",
    date: "Yesterday, 20:41",
    result: "Review",
  },
  {
    mode: "FNCS Practice",
    placement: "#12",
    eliminations: "7",
    kd: "3.50",
    date: "Yesterday, 18:06",
    result: "Good",
  },
];

const performance = [
  { label: "Mon", value: 58 },
  { label: "Tue", value: 64 },
  { label: "Wed", value: 61 },
  { label: "Thu", value: 72 },
  { label: "Fri", value: 68 },
  { label: "Sat", value: 79 },
  { label: "Sun", value: 84 },
];

const goalLabels: Record<string, string> = {
  competitive: "Become more competitive",
  professional: "Push towards pro",
  consistency: "Become more consistent",
  improvement: "Improve for fun",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const displayName = user.displayName?.trim() || user.username;
  const firstName = displayName.split(" ")[0] || displayName;

  const goal = user.onboardingGoal
    ? goalLabels[user.onboardingGoal] ?? user.onboardingGoal
    : "Build your competitive profile";

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-7 lg:px-10">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-7 text-white shadow-sm sm:p-9">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-sm font-semibold text-blue-100">
            Competitive Dashboard
          </p>

          <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
            Welcome back, {firstName}.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Your latest gameplay data is ready. Keep building consistency,
            identify your weaknesses and turn every match into progress.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/replays/upload"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              Analyse a replay
            </Link>

            <Link
              href="/improvement"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              View improvement
            </Link>
          </div>
        </div>

        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />
      </section>

      {/* Profile context */}
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Player
          </p>

          <p className="mt-2 text-lg font-black text-slate-900">
            {displayName}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            @{user.username}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Region
          </p>

          <p className="mt-2 text-lg font-black text-slate-900">
            {user.region ?? "Not set"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Competitive region
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Current goal
          </p>

          <p className="mt-2 text-lg font-black text-slate-900">
            {goal}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            From your onboarding profile
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>

              <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                {stat.change}
              </span>
            </div>

            <p className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-900">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {stat.description}
            </p>
          </div>
        ))}
      </section>

      {/* Main analytics */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        {/* Performance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Performance
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Weekly performance
              </h3>
            </div>

            <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
              Last 7 days
            </div>
          </div>

          <div className="mt-8">
            <div className="flex h-56 items-end gap-3 sm:gap-5">
              {performance.map((day) => (
                <div
                  key={day.label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="flex h-full w-full items-end">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-blue-400 transition hover:from-blue-700 hover:to-blue-500"
                      style={{ height: `${day.value}%` }}
                    />
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {day.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
            <div>
              <p className="text-xs text-slate-400">Current score</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                84%
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">Improvement</p>
              <p className="mt-1 text-lg font-bold text-emerald-600">
                +18.7%
              </p>
            </div>
          </div>
        </div>

        {/* Weakness */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Biggest weakness
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Fight Selection
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-lg">
              ⚡
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black tracking-[-0.05em] text-slate-900">
                64%
              </span>

              <span className="text-sm font-semibold text-orange-500">
                Needs work
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
                style={{ width: "64%" }}
              />
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            You are taking too many low-value fights before moving into
            stronger positions. Your recent analyses show several avoidable
            engagements.
          </p>

          <Link
            href="/analysis"
            className="mt-6 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            View weakness analysis
          </Link>
        </div>
      </section>

      {/* Recent matches + training */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        {/* Matches */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Match history
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Recent matches
              </h3>
            </div>

            <Link
              href="/matches"
              className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {matches.map((match) => (
              <Link
                href="/matches/1"
                key={`${match.mode}-${match.date}`}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
                    {match.placement.replace("#", "")}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {match.mode}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {match.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-7">
                  <div>
                    <p className="text-xs text-slate-400">Elims</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {match.eliminations}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">K/D</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {match.kd}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      match.result === "Strong"
                        ? "bg-emerald-50 text-emerald-600"
                        : match.result === "Review"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {match.result}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Training */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Today&apos;s training
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Your objective
              </h3>
            </div>

            <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-600">
              2 / 4
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                ✓
              </div>

              <span className="text-sm font-semibold text-slate-600 line-through">
                10 min edit warm-up
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
              <div className="h-7 w-7 rounded-full border-2 border-blue-500" />

              <span className="text-sm font-bold text-slate-800">
                Fight selection drills
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <div className="h-7 w-7 rounded-full border-2 border-slate-300" />

              <span className="text-sm font-semibold text-slate-600">
                3 endgame simulations
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
              <div className="h-7 w-7 rounded-full border-2 border-slate-300" />

              <span className="text-sm font-semibold text-slate-600">
                Review one analysed match
              </span>
            </div>
          </div>

          <Link
            href="/routine"
            className="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Open routine
          </Link>
        </div>
      </section>

      {/* Replay CTA */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                ▶
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
                  Replay analysis
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  Find out what is holding you back.
                </h3>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Upload a Fortnite replay and CompMind will turn your gameplay
              into actionable insights, weaknesses and training objectives.
            </p>
          </div>

          <Link
            href="/replays/upload"
            className="shrink-0 rounded-xl bg-blue-600 px-6 py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Upload replay
          </Link>
        </div>
      </section>
    </div>
  );
}