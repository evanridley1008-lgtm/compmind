"use client";

import { useState } from "react";

type TournamentStatus =
  | "Registration Open"
  | "Starting Soon"
  | "Live"
  | "Completed"
  | "Draft";

type Tournament = {
  id: string;
  name: string;
  status: TournamentStatus;
  date: string;
  time: string;
  region: string;
  mode: string;
  players: number;
  capacity: number;
  prize: string;
  featured: boolean;
};

const initialTournaments: Tournament[] = [
  {
    id: "cmp-open-1",
    name: "CompMind Open #1",
    status: "Registration Open",
    date: "Oct 10, 2026",
    time: "7:00 PM",
    region: "Europe",
    mode: "Solo",
    players: 184,
    capacity: 500,
    prize: "£250",
    featured: true,
  },
  {
    id: "cmp-duo-1",
    name: "CompMind Duo Clash",
    status: "Registration Open",
    date: "Oct 12, 2026",
    time: "6:30 PM",
    region: "Europe",
    mode: "Duos",
    players: 76,
    capacity: 250,
    prize: "£500",
    featured: false,
  },
  {
    id: "cmp-ranked-1",
    name: "CompMind Ranked Challenge",
    status: "Starting Soon",
    date: "Oct 7, 2026",
    time: "7:30 PM",
    region: "Europe",
    mode: "Solo",
    players: 221,
    capacity: 300,
    prize: "Pro Memberships",
    featured: false,
  },
  {
    id: "cmp-community-1",
    name: "CompMind Community Cup",
    status: "Completed",
    date: "Sep 28, 2026",
    time: "7:00 PM",
    region: "Europe",
    mode: "Solo",
    players: 312,
    capacity: 500,
    prize: "£100",
    featured: false,
  },
];

const statusStyles: Record<TournamentStatus, string> = {
  "Registration Open":
    "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Starting Soon": "bg-amber-50 text-amber-700 border-amber-100",
  Live: "bg-red-50 text-red-700 border-red-100",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
  Draft: "bg-blue-50 text-blue-700 border-blue-100",
};

function StatusBadge({ status }: { status: TournamentStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Live"
            ? "bg-red-500"
            : status === "Registration Open"
              ? "bg-emerald-500"
              : status === "Starting Soon"
                ? "bg-amber-500"
                : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<
    "overview" | "tournaments" | "players" | "results"
  >("overview");

  const [tournaments, setTournaments] =
    useState<Tournament[]>(initialTournaments);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTournament, setEditingTournament] =
    useState<Tournament | null>(null);

  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);

  const [newTournament, setNewTournament] = useState({
    name: "",
    date: "",
    time: "",
    region: "Europe",
    mode: "Solo",
    capacity: "500",
    prize: "£250",
    featured: false,
  });

  const totalPlayers = tournaments.reduce(
    (total, tournament) => total + tournament.players,
    0
  );

  const registrationOpen = tournaments.filter(
    (tournament) => tournament.status === "Registration Open"
  ).length;

  const liveTournaments = tournaments.filter(
    (tournament) => tournament.status === "Live"
  ).length;

  function createTournament() {
    if (!newTournament.name.trim()) return;

    const tournament: Tournament = {
      id: `cmp-${Date.now()}`,
      name: newTournament.name,
      status: "Draft",
      date: newTournament.date || "Date TBC",
      time: newTournament.time || "Time TBC",
      region: newTournament.region,
      mode: newTournament.mode,
      players: 0,
      capacity: Number(newTournament.capacity) || 500,
      prize: newTournament.prize || "TBC",
      featured: newTournament.featured,
    };

    setTournaments((current) => [tournament, ...current]);

    setNewTournament({
      name: "",
      date: "",
      time: "",
      region: "Europe",
      mode: "Solo",
      capacity: "500",
      prize: "£250",
      featured: false,
    });

    setShowCreateModal(false);
    setActiveSection("tournaments");
  }

  function deleteTournament(id: string) {
    setTournaments((current) =>
      current.filter((tournament) => tournament.id !== id)
    );

    setSelectedTournament(null);
  }

  function toggleRegistration(id: string) {
    setTournaments((current) =>
      current.map((tournament) => {
        if (tournament.id !== id) return tournament;

        return {
          ...tournament,
          status:
            tournament.status === "Registration Open"
              ? "Draft"
              : "Registration Open",
        };
      })
    );
  }

  function saveEditedTournament() {
    if (!editingTournament) return;

    setTournaments((current) =>
      current.map((tournament) =>
        tournament.id === editingTournament.id
          ? editingTournament
          : tournament
      )
    );

    setEditingTournament(null);
  }

  return (
    <div className="cm-page">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            CompMind Administration
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Admin Panel
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage tournaments, players, results and the competitive
            infrastructure behind CompMind.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="cm-button cm-button-primary"
        >
          + Create Tournament
        </button>
      </div>

      {/* Navigation */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {[
          ["overview", "Overview"],
          ["tournaments", "Tournaments"],
          ["players", "Players"],
          ["results", "Results"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() =>
              setActiveSection(
                id as
                  | "overview"
                  | "tournaments"
                  | "players"
                  | "results"
              )
            }
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              activeSection === id
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeSection === "overview" && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="cm-card p-5">
              <p className="text-xs font-semibold text-slate-500">
                Total Tournaments
              </p>

              <p className="mt-3 text-3xl font-black text-slate-950">
                {tournaments.length}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                CompMind events
              </p>
            </div>

            <div className="cm-card p-5">
              <p className="text-xs font-semibold text-slate-500">
                Registered Players
              </p>

              <p className="mt-3 text-3xl font-black text-slate-950">
                {totalPlayers}
              </p>

              <p className="mt-2 text-xs text-emerald-600">
                Across all events
              </p>
            </div>

            <div className="cm-card p-5">
              <p className="text-xs font-semibold text-slate-500">
                Open Registration
              </p>

              <p className="mt-3 text-3xl font-black text-slate-950">
                {registrationOpen}
              </p>

              <p className="mt-2 text-xs text-blue-600">
                Events accepting players
              </p>
            </div>

            <div className="cm-card p-5">
              <p className="text-xs font-semibold text-slate-500">
                Live Events
              </p>

              <p className="mt-3 text-3xl font-black text-slate-950">
                {liveTournaments}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Currently running
              </p>
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="cm-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-950">
                    Tournament Management
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Quickly manage your CompMind events.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSection("tournaments")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  View all
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {tournaments.slice(0, 4).map((tournament) => (
                  <div
                    key={tournament.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-950">
                          {tournament.name}
                        </h3>

                        <StatusBadge status={tournament.status} />
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {tournament.date} · {tournament.time} ·{" "}
                        {tournament.region} {tournament.mode}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedTournament(tournament)}
                      className="cm-button cm-button-secondary shrink-0"
                    >
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cm-card p-6">
              <h2 className="text-sm font-bold text-slate-950">
                Admin Actions
              </h2>

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                    +
                  </span>

                  <span>
                    <span className="block text-sm font-bold text-slate-950">
                      Create Tournament
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Launch a new CompMind event.
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection("players")}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 font-bold text-violet-600">
                    P
                  </span>

                  <span>
                    <span className="block text-sm font-bold text-slate-950">
                      Manage Players
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Review registrations and eligibility.
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection("results")}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 font-bold text-emerald-600">
                    R
                  </span>

                  <span>
                    <span className="block text-sm font-bold text-slate-950">
                      Manage Results
                    </span>

                    <span className="mt-0.5 block text-xs text-slate-500">
                      Publish results and update standings.
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Tournaments */}
      {activeSection === "tournaments" && (
        <section className="cm-card overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-5">
            <h2 className="text-base font-bold text-slate-950">
              CompMind Tournaments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create, edit and control every tournament from one place.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {tournaments.map((tournament) => {
              const percentage =
                tournament.capacity > 0
                  ? Math.min(
                      100,
                      (tournament.players / tournament.capacity) * 100
                    )
                  : 0;

              return (
                <div key={tournament.id} className="p-5">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-950">
                          {tournament.name}
                        </h3>

                        {tournament.featured && (
                          <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                            Featured
                          </span>
                        )}

                        <StatusBadge status={tournament.status} />
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        {tournament.date} · {tournament.time} ·{" "}
                        {tournament.region} · {tournament.mode}
                      </p>

                      <div className="mt-4 max-w-md">
                        <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-slate-400">
                          <span>
                            {tournament.players} registered
                          </span>

                          <span>{tournament.capacity} capacity</span>
                        </div>

                        <div className="h-1.5 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:min-w-[460px]">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Players
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-950">
                          {tournament.players}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Capacity
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-950">
                          {tournament.capacity}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Prize
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-950">
                          {tournament.prize}
                        </p>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTournament(tournament)
                          }
                          className="cm-button cm-button-secondary w-full"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Players */}
      {activeSection === "players" && (
        <section className="cm-card overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-5">
            <h2 className="text-base font-bold text-slate-950">
              Player Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage tournament registrations and competitive accounts.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              ["MŸKO", "EU", "CompMind Open #1", "Registered"],
              ["Veno", "EU", "CompMind Open #1", "Registered"],
              ["Peterbot", "NA", "CompMind Open #1", "Registered"],
              ["Tayson", "EU", "CompMind Duo Clash", "Registered"],
              ["Queasy", "EU", "CompMind Ranked Challenge", "Eligible"],
            ].map(([name, region, event, status]) => (
              <div
                key={`${name}-${event}`}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
                    {name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {region} · {event}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    {status}
                  </span>

                  <button
                    type="button"
                    className="cm-button cm-button-secondary"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      {activeSection === "results" && (
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="cm-card p-6">
            <h2 className="text-base font-bold text-slate-950">
              Result Processing
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Import or enter tournament results and publish standings.
            </p>

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg shadow-sm">
                ↑
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-950">
                Upload Results
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-500">
                Upload a results file or connect the tournament result
                system here later.
              </p>

              <button
                type="button"
                className="cm-button cm-button-primary mt-5"
              >
                Select Results File
              </button>
            </div>
          </div>

          <div className="cm-card p-6">
            <h2 className="text-base font-bold text-slate-950">
              Publishing
            </h2>

            <div className="mt-5 space-y-3">
              {[
                ["Calculate Points", "Convert placements and eliminations."],
                ["Update Leaderboard", "Update player rankings."],
                ["Publish Results", "Make results visible to players."],
                ["Update Profiles", "Add results to player history."],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-black text-slate-600">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="cm-button cm-button-primary mt-5 w-full"
            >
              Publish Results
            </button>
          </div>
        </section>
      )}

      {/* Tournament management modal */}
      {selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Tournament Management
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                  {selectedTournament.name}
                </h2>

                <div className="mt-2">
                  <StatusBadge status={selectedTournament.status} />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTournament(null)}
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Date", selectedTournament.date],
                ["Time", selectedTournament.time],
                ["Region", selectedTournament.region],
                ["Mode", selectedTournament.mode],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-slate-50 p-3"
                >
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setEditingTournament(selectedTournament);
                  setSelectedTournament(null);
                }}
                className="cm-button cm-button-secondary"
              >
                Edit Tournament
              </button>

              <button
                type="button"
                onClick={() =>
                  toggleRegistration(selectedTournament.id)
                }
                className="cm-button cm-button-primary"
              >
                {selectedTournament.status === "Registration Open"
                  ? "Close Registration"
                  : "Open Registration"}
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("players")}
                className="cm-button cm-button-secondary"
              >
                Manage Players
              </button>

              <button
                type="button"
                onClick={() => setActiveSection("results")}
                className="cm-button cm-button-secondary"
              >
                Manage Results
              </button>
            </div>

            <button
              type="button"
              onClick={() => deleteTournament(selectedTournament.id)}
              className="mt-4 w-full rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
              Delete Tournament
            </button>
          </div>
        </div>
      )}

      {/* Create tournament modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  New CompMind Event
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Create Tournament
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Configure a tournament that players can enter.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Tournament Name
                </label>

                <input
                  value={newTournament.name}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. CompMind Open #2"
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Date
                </label>

                <input
                  type="date"
                  value={newTournament.date}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      date: event.target.value,
                    })
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Start Time
                </label>

                <input
                  type="time"
                  value={newTournament.time}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      time: event.target.value,
                    })
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Region
                </label>

                <select
                  value={newTournament.region}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      region: event.target.value,
                    })
                  }
                  className="cm-input"
                >
                  <option>Europe</option>
                  <option>NA-East</option>
                  <option>NA-West</option>
                  <option>OCE</option>
                  <option>Asia</option>
                  <option>Brazil</option>
                  <option>Middle East</option>
                  <option>Global</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Game Mode
                </label>

                <select
                  value={newTournament.mode}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      mode: event.target.value,
                    })
                  }
                  className="cm-input"
                >
                  <option>Solo</option>
                  <option>Duos</option>
                  <option>Trios</option>
                  <option>Squads</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Player Capacity
                </label>

                <input
                  type="number"
                  min="1"
                  value={newTournament.capacity}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      capacity: event.target.value,
                    })
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Prize Pool
                </label>

                <input
                  value={newTournament.prize}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      prize: event.target.value,
                    })
                  }
                  placeholder="£250"
                  className="cm-input"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={newTournament.featured}
                  onChange={(event) =>
                    setNewTournament({
                      ...newTournament,
                      featured: event.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />

                <span>
                  <span className="block text-sm font-bold text-slate-950">
                    Feature this tournament
                  </span>

                  <span className="mt-0.5 block text-xs text-slate-500">
                    Show the event prominently on the tournaments page.
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="cm-button cm-button-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createTournament}
                disabled={!newTournament.name.trim()}
                className="cm-button cm-button-primary"
              >
                Create Tournament
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editingTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Tournament Settings
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-950">
                  Edit Tournament
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setEditingTournament(null)}
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Tournament Name
                </label>

                <input
                  value={editingTournament.name}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      name: event.target.value,
                    })
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Date
                </label>

                <input
                  value={editingTournament.date}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      date: event.target.value,
                    })
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Time
                </label>

                <input
                  value={editingTournament.time}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      time: event.target.value,
                    })
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Region
                </label>

                <select
                  value={editingTournament.region}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      region: event.target.value,
                    })
                  }
                  className="cm-input"
                >
                  <option>Europe</option>
                  <option>NA-East</option>
                  <option>NA-West</option>
                  <option>OCE</option>
                  <option>Asia</option>
                  <option>Brazil</option>
                  <option>Middle East</option>
                  <option>Global</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Mode
                </label>

                <select
                  value={editingTournament.mode}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      mode: event.target.value,
                    })
                  }
                  className="cm-input"
                >
                  <option>Solo</option>
                  <option>Duos</option>
                  <option>Trios</option>
                  <option>Squads</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Capacity
                </label>

                <input
                  type="number"
                  value={editingTournament.capacity}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      capacity: Number(event.target.value),
                    })
                  }
                  className="cm-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Prize Pool
                </label>

                <input
                  value={editingTournament.prize}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      prize: event.target.value,
                    })
                  }
                  className="cm-input"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={editingTournament.featured}
                  onChange={(event) =>
                    setEditingTournament({
                      ...editingTournament,
                      featured: event.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />

                <span className="text-sm font-semibold text-slate-700">
                  Feature this tournament
                </span>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingTournament(null)}
                className="cm-button cm-button-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveEditedTournament}
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
