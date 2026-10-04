"use client";

import { useMemo, useState } from "react";

type TournamentStatus = "Upcoming" | "Live" | "Completed";

type Tournament = {
  id: string;
  name: string;
  type: string;
  status: TournamentStatus;
  date: string;
  time: string;
  region: string;
  mode: string;
  format: string;
  prize: string;
  points: number;
  placement: string;
  logo: string;
};

type CompMindStatus = "Registration Open" | "Starting Soon" | "Completed";

type CompMindTournament = {
  id: string;
  name: string;
  description: string;
  status: CompMindStatus;
  date: string;
  time: string;
  region: string;
  mode: string;
  format: string;
  prize: string;
  entrants: number;
  maxEntrants: number;
  entry: string;
  logo: string;
  featured?: boolean;
};

const tournaments: Tournament[] = [
  {
    id: "t-1",
    name: "FNCS Major",
    type: "FNCS",
    status: "Live",
    date: "Today",
    time: "7:00 PM",
    region: "Europe",
    mode: "Solo",
    format: "Round 1",
    prize: "Competitive",
    points: 42,
    placement: "#12",
    logo: "FNCS",
  },
  {
    id: "t-2",
    name: "Victory Cup",
    type: "Victory Cup",
    status: "Upcoming",
    date: "Tomorrow",
    time: "6:00 PM",
    region: "Europe",
    mode: "Duos",
    format: "Open",
    prize: "$100,000",
    points: 0,
    placement: "—",
    logo: "VC",
  },
  {
    id: "t-3",
    name: "Ranked Cup",
    type: "Ranked Cup",
    status: "Upcoming",
    date: "Oct 5",
    time: "7:00 PM",
    region: "Europe",
    mode: "Solo",
    format: "Session",
    prize: "Competitive",
    points: 0,
    placement: "—",
    logo: "RC",
  },
  {
    id: "t-4",
    name: "Cash Cup",
    type: "Cash Cup",
    status: "Completed",
    date: "Sep 29",
    time: "8:00 PM",
    region: "Europe",
    mode: "Solo",
    format: "Round 1",
    prize: "$100,000",
    points: 64,
    placement: "#17",
    logo: "CC",
  },
  {
    id: "t-5",
    name: "Reload Victory Cup",
    type: "Reload",
    status: "Completed",
    date: "Sep 27",
    time: "7:00 PM",
    region: "Europe",
    mode: "Duos",
    format: "Session",
    prize: "$50,000",
    points: 91,
    placement: "#8",
    logo: "RL",
  },
  {
    id: "t-6",
    name: "Ranked Cup Session",
    type: "Ranked Cup",
    status: "Completed",
    date: "Sep 24",
    time: "6:00 PM",
    region: "Europe",
    mode: "Solo",
    format: "Session",
    prize: "Competitive",
    points: 73,
    placement: "#9",
    logo: "RC",
  },
];

const compMindTournaments: CompMindTournament[] = [
  {
    id: "cm-1",
    name: "CompMind Open #1",
    description:
      "The first official CompMind community tournament. Compete, track your performance and see how you stack up against other players.",
    status: "Registration Open",
    date: "Oct 10",
    time: "7:00 PM",
    region: "Europe",
    mode: "Solo",
    format: "6 Matches",
    prize: "£250 Prize Pool",
    entrants: 184,
    maxEntrants: 500,
    entry: "Free",
    logo: "CM",
    featured: true,
  },
  {
    id: "cm-2",
    name: "CompMind Duo Clash",
    description:
      "Team up with your duo and compete across a structured competitive session.",
    status: "Registration Open",
    date: "Oct 12",
    time: "6:30 PM",
    region: "Europe",
    mode: "Duos",
    format: "6 Matches",
    prize: "£500 Prize Pool",
    entrants: 76,
    maxEntrants: 250,
    entry: "Free",
    logo: "CM",
  },
  {
    id: "cm-3",
    name: "CompMind Ranked Challenge",
    description:
      "A competitive challenge built around consistency, eliminations and placement.",
    status: "Starting Soon",
    date: "Oct 7",
    time: "7:30 PM",
    region: "Europe",
    mode: "Solo",
    format: "5 Matches",
    prize: "Pro Memberships",
    entrants: 221,
    maxEntrants: 300,
    entry: "Free",
    logo: "CM",
  },
  {
    id: "cm-4",
    name: "CompMind Community Cup",
    description:
      "A previous CompMind community tournament with results available for review.",
    status: "Completed",
    date: "Sep 28",
    time: "7:00 PM",
    region: "Europe",
    mode: "Solo",
    format: "6 Matches",
    prize: "£100 Prize Pool",
    entrants: 312,
    maxEntrants: 500,
    entry: "Free",
    logo: "CM",
  },
];

const filters = ["All", "Upcoming", "Live", "Completed"];

const typeStyles: Record<string, string> = {
  FNCS: "bg-violet-50 text-violet-700",
  "Victory Cup": "bg-amber-50 text-amber-700",
  "Ranked Cup": "bg-blue-50 text-blue-700",
  "Cash Cup": "bg-emerald-50 text-emerald-700",
  Reload: "bg-rose-50 text-rose-700",
};

const statusStyles: Record<TournamentStatus, string> = {
  Upcoming: "bg-blue-50 text-blue-700",
  Live: "bg-emerald-50 text-emerald-700",
  Completed: "bg-slate-100 text-slate-600",
};

const compMindStatusStyles: Record<CompMindStatus, string> = {
  "Registration Open": "bg-emerald-50 text-emerald-700",
  "Starting Soon": "bg-amber-50 text-amber-700",
  Completed: "bg-slate-100 text-slate-600",
};

export default function TournamentsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [selectedCompMindTournament, setSelectedCompMindTournament] =
    useState<CompMindTournament | null>(null);
  const [registered, setRegistered] = useState<string[]>([]);

  const filteredTournaments = useMemo(() => {
    if (filter === "All") {
      return tournaments;
    }

    return tournaments.filter(
      (tournament) => tournament.status === filter
    );
  }, [filter]);

  const upcomingCount = tournaments.filter(
    (tournament) => tournament.status === "Upcoming"
  ).length;

  const liveCount = tournaments.filter(
    (tournament) => tournament.status === "Live"
  ).length;

  const totalPoints = tournaments.reduce(
    (total, tournament) => total + tournament.points,
    0
  );

  function toggleRegistration(id: string) {
    setRegistered((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="cm-page">
      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            Competitive Hub
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Tournaments
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Discover competitive events, prepare for tournaments and compete
            directly through the CompMind ecosystem.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            alert(
              "Tournament notifications will be connected to your account later."
            )
          }
          className="cm-button cm-button-secondary"
        >
          🔔 Tournament Alerts
        </button>
      </div>

      {/* STATS */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Upcoming Events
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {upcomingCount}
          </p>

          <p className="mt-2 text-xs text-blue-600">
            Official Fortnite events
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Live Events
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {liveCount}
          </p>

          <p className="mt-2 text-xs text-emerald-600">
            Currently active
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            CompMind Events
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {compMindTournaments.length}
          </p>

          <p className="mt-2 text-xs text-violet-600">
            Hosted by CompMind
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Points Tracked
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {totalPoints}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Across recent events
          </p>
        </div>
      </div>

      {/* COMPMIND TOURNAMENTS */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-5 py-6 text-white sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black shadow-lg shadow-blue-950/30">
                C
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold">
                    CompMind Tournaments
                  </h2>

                  <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-[10px] font-bold text-blue-200 ring-1 ring-inset ring-blue-400/20">
                    OFFICIAL
                  </span>
                </div>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-300">
                  Compete in tournaments hosted by CompMind, climb the
                  leaderboard and prove your performance against the
                  community.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                alert(
                  "The full CompMind tournament directory will eventually be available here."
                )
              }
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15"
            >
              View All
            </button>
          </div>
        </div>

        {/* Featured tournament */}
        {compMindTournaments
          .filter((tournament) => tournament.featured)
          .map((tournament) => {
            const isRegistered = registered.includes(tournament.id);
            const percentage = Math.round(
              (tournament.entrants / tournament.maxEntrants) * 100
            );

            return (
              <div
                key={tournament.id}
                className="border-b border-slate-100 bg-blue-50/30 p-5 sm:p-6"
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-sm">
                      CM
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white">
                          FEATURED
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${compMindStatusStyles[tournament.status]}`}
                        >
                          {tournament.status}
                        </span>
                      </div>

                      <h3 className="mt-2 text-xl font-bold text-slate-950">
                        {tournament.name}
                      </h3>

                      <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                        {tournament.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                        <span>📅 {tournament.date}</span>
                        <span>◷ {tournament.time}</span>
                        <span>🌍 {tournament.region}</span>
                        <span>🎮 {tournament.mode}</span>
                        <span>🏆 {tournament.format}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 xl:w-[300px]">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-500">
                        Entrants
                      </span>

                      <span className="font-bold text-slate-950">
                        {tournament.entrants} / {tournament.maxEntrants}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400">
                          Prize Pool
                        </p>

                        <p className="text-sm font-bold text-slate-950">
                          {tournament.prize}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleRegistration(tournament.id)}
                        className={`cm-button ${
                          isRegistered
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "cm-button-primary"
                        }`}
                      >
                        {isRegistered ? "✓ Registered" : "Enter Tournament"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* Other CompMind tournaments */}
        <div className="divide-y divide-slate-100">
          {compMindTournaments
            .filter((tournament) => !tournament.featured)
            .map((tournament) => {
              const isRegistered = registered.includes(tournament.id);
              const percentage = Math.round(
                (tournament.entrants / tournament.maxEntrants) * 100
              );

              return (
                <button
                  key={tournament.id}
                  type="button"
                  onClick={() => setSelectedCompMindTournament(tournament)}
                  className="block w-full p-5 text-left transition hover:bg-slate-50/70"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">
                      CM
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-950">
                          {tournament.name}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${compMindStatusStyles[tournament.status]}`}
                        >
                          {tournament.status}
                        </span>
                      </div>

                      <p className="mt-1.5 line-clamp-1 text-xs text-slate-500">
                        {tournament.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span>{tournament.date}</span>
                        <span>{tournament.time}</span>
                        <span>{tournament.region}</span>
                        <span>{tournament.mode}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[430px]">
                      <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Prize
                        </p>

                        <p className="mt-1 truncate text-xs font-bold text-slate-950">
                          {tournament.prize}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Players
                        </p>

                        <p className="mt-1 text-xs font-bold text-slate-950">
                          {tournament.entrants}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 px-3 py-2 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Entry
                        </p>

                        <p className="mt-1 text-xs font-bold text-emerald-600">
                          {tournament.entry}
                        </p>
                      </div>

                      <div className="flex items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                        →
                      </div>
                    </div>
                  </div>

                  {isRegistered && (
                    <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                      ✓ You are registered for this tournament
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </section>

      {/* OFFICIAL FORTNITE EVENTS */}
      <section>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Fortnite Competitive
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Official Events
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your competitive Fortnite events and results.
            </p>
          </div>

          <p className="text-xs font-semibold text-slate-400">
            {filteredTournaments.length} event
            {filteredTournaments.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-5 flex overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="cm-card overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredTournaments.map((tournament) => (
              <button
                key={tournament.id}
                type="button"
                onClick={() => setSelectedTournament(tournament)}
                className="block w-full p-5 text-left transition hover:bg-slate-50/70"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 text-xs font-black text-white">
                    {tournament.logo}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-950">
                        {tournament.name}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          typeStyles[tournament.type] ??
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tournament.type}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[tournament.status]}`}
                      >
                        {tournament.status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span>{tournament.date}</span>
                      <span>{tournament.time}</span>
                      <span>{tournament.region}</span>
                      <span>{tournament.mode}</span>
                      <span>{tournament.format}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:w-[360px]">
                    <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Placement
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-950">
                        {tournament.placement}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Points
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-950">
                        {tournament.points}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 px-3 py-2.5 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Prize
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-slate-950">
                        {tournament.prize}
                      </p>
                    </div>

                    <div className="hidden items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                      →
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {filteredTournaments.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  🏆
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-950">
                  No tournaments found
                </h3>

                <p className="mt-1.5 text-sm text-slate-500">
                  There are no events matching this filter.
                </p>
              </div>
            )}
          </div>
        </section>
      </section>

      {/* OFFICIAL EVENT MODAL */}
      {selectedTournament && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTournament(null);
            }
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-xs font-black text-white">
                  {selectedTournament.logo}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-950">
                      {selectedTournament.name}
                    </h2>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        statusStyles[selectedTournament.status]
                      }`}
                    >
                      {selectedTournament.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedTournament.type} ·{" "}
                    {selectedTournament.region} ·{" "}
                    {selectedTournament.mode}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTournament(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close tournament details"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Date & Time
                </p>

                <p className="mt-1 text-sm font-bold text-slate-950">
                  {selectedTournament.date}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedTournament.time}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Format
                </p>

                <p className="mt-1 text-sm font-bold text-slate-950">
                  {selectedTournament.format}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedTournament.mode}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Placement
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {selectedTournament.placement}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Tournament Points
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {selectedTournament.points}
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedTournament(null)}
                className="cm-button cm-button-secondary"
              >
                Close
              </button>

              {selectedTournament.status === "Upcoming" && (
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Tournament preparation will eventually create a tournament-specific CompMind routine."
                    )
                  }
                  className="cm-button cm-button-primary"
                >
                  Prepare for Tournament
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COMPMIND TOURNAMENT MODAL */}
      {selectedCompMindTournament && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCompMindTournament(null);
            }
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="bg-slate-950 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black">
                    CM
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300">
                      CompMind Tournament
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      {selectedCompMindTournament.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      {selectedCompMindTournament.date} ·{" "}
                      {selectedCompMindTournament.time}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCompMindTournament(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close tournament details"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                  compMindStatusStyles[
                    selectedCompMindTournament.status
                  ]
                }`}
              >
                {selectedCompMindTournament.status}
              </span>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {selectedCompMindTournament.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Region</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">
                    {selectedCompMindTournament.region}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Mode</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">
                    {selectedCompMindTournament.mode}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Format</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">
                    {selectedCompMindTournament.format}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Prize</p>
                  <p className="mt-1 text-sm font-bold text-slate-950">
                    {selectedCompMindTournament.prize}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Registration
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-950">
                      {selectedCompMindTournament.entrants} /{" "}
                      {selectedCompMindTournament.maxEntrants} players
                    </p>
                  </div>

                  <span className="text-sm font-bold text-blue-600">
                    {Math.round(
                      (selectedCompMindTournament.entrants /
                        selectedCompMindTournament.maxEntrants) *
                        100
                    )}
                    %
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${Math.round(
                        (selectedCompMindTournament.entrants /
                          selectedCompMindTournament.maxEntrants) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedCompMindTournament(null)}
                className="cm-button cm-button-secondary"
              >
                Close
              </button>

              {selectedCompMindTournament.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() => {
                    toggleRegistration(selectedCompMindTournament.id);
                    setSelectedCompMindTournament(null);
                  }}
                  className={`cm-button ${
                    registered.includes(selectedCompMindTournament.id)
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "cm-button-primary"
                  }`}
                >
                  {registered.includes(selectedCompMindTournament.id)
                    ? "✓ Registered"
                    : "Enter Tournament"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}