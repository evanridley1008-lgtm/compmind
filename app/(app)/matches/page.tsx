"use client";

import { useEffect, useMemo, useState } from "react";

type Filter = "All" | "Tournaments" | "Ranked" | "Pubs";

type MatchType =
  | "ranked"
  | "fncs"
  | "victory-cup"
  | "cash-cup"
  | "reload"
  | "ranked-cup"
  | "pub"
  | "zero-build";

type ApiMatch = {
  id: string;
  playedAt: string;
  category: "TOURNAMENT" | "RANKED" | "PUB";
  type:
    | "FNCS"
    | "VICTORY_CUP"
    | "CASH_CUP"
    | "RELOAD"
    | "RANKED_CUP"
    | "RANKED"
    | "BATTLE_ROYALE"
    | "ZERO_BUILD";
  mode: "SOLO" | "DUOS" | "TRIOS" | "SQUADS";
  eventId?: string | null;
  eventName?: string | null;
  eventRound?: string | null;
  placement: number;
  eliminations: number;
  damage?: number | null;
  survivalTime?: number | null;
  killsPerMinute?: number | null;
  points?: number | null;
  rankChange?: number | null;
  analyzed: boolean;
  analysis?: {
    id: string;
    status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
    overallScore?: number | null;
  } | null;
};

type Match = {
  id: string;
  type: MatchType;
  tournamentName?: string;
  tournamentRound?: string;
  points?: number;
  mode: string;
  time: string;
  placement: number;
  eliminations: number;
  rankChange?: number;
  damage?: number;
  survivalTime?: string;
  killsPerMinute?: number;
  rank?: string;
  analyzed: boolean;
  analysisStatus?: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  analysisScore?: number;
};

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "All" },
  { label: "Tournaments", value: "Tournaments" },
  { label: "Ranked", value: "Ranked" },
  { label: "Pubs", value: "Pubs" },
];

function convertMatchType(
  type: ApiMatch["type"],
): MatchType {
  switch (type) {
    case "FNCS":
      return "fncs";
    case "VICTORY_CUP":
      return "victory-cup";
    case "CASH_CUP":
      return "cash-cup";
    case "RELOAD":
      return "reload";
    case "RANKED_CUP":
      return "ranked-cup";
    case "RANKED":
      return "ranked";
    case "ZERO_BUILD":
      return "zero-build";
    case "BATTLE_ROYALE":
    default:
      return "pub";
  }
}

function formatMode(mode: ApiMatch["mode"]) {
  switch (mode) {
    case "SOLO":
      return "Solo";
    case "DUOS":
      return "Duos";
    case "TRIOS":
      return "Trios";
    case "SQUADS":
      return "Squads";
    default:
      return mode;
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatSurvivalTime(seconds?: number | null) {
  if (
    seconds === null ||
    seconds === undefined ||
    !Number.isFinite(seconds)
  ) {
    return undefined;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}m ${remainingSeconds
    .toString()
    .padStart(2, "0")}s`;
}

function getCategory(
  type: MatchType,
): "Tournament" | "Ranked" | "Pub" {
  if (
    type === "fncs" ||
    type === "victory-cup" ||
    type === "cash-cup" ||
    type === "reload" ||
    type === "ranked-cup"
  ) {
    return "Tournament";
  }

  if (type === "ranked") {
    return "Ranked";
  }

  return "Pub";
}

function getMatchTitle(match: Match) {
  switch (match.type) {
    case "fncs":
      return "FNCS";
    case "victory-cup":
      return "Victory Cup";
    case "cash-cup":
      return "Cash Cup";
    case "reload":
      return "Reload";
    case "ranked-cup":
      return "Ranked Cup";
    case "ranked":
      return "Ranked Battle Royale";
    case "zero-build":
      return "Zero Build";
    default:
      return "Battle Royale";
  }
}

function getMatchSubtitle(match: Match) {
  if (match.tournamentRound) {
    return `${match.tournamentRound} • ${match.mode} • ${match.time}`;
  }

  return `${match.mode} • ${match.time}`;
}

function getLogoPath(type: MatchType) {
  switch (type) {
    case "fncs":
      return "/fortnite/logos/fncs.png";

    case "victory-cup":
      return "/fortnite/logos/victory-cup.png";

    case "cash-cup":
      return "/fortnite/logos/cash-cup.png";

    case "reload":
      return "/fortnite/logos/reload.png";

    case "ranked-cup":
      return "/fortnite/logos/ranked-cup.png";

    case "ranked":
      return "/fortnite/logos/ranked.png";

    case "zero-build":
      return "/fortnite/logos/zero-build.png";

    case "pub":
    default:
      return "/fortnite/logos/battle-royale.png";
  }
}

function getAccent(type: MatchType) {
  switch (type) {
    case "fncs":
      return "from-blue-600/15 via-cyan-500/5 to-transparent";

    case "victory-cup":
      return "from-amber-500/15 via-yellow-500/5 to-transparent";

    case "cash-cup":
      return "from-emerald-500/15 via-green-500/5 to-transparent";

    case "reload":
      return "from-purple-500/15 via-fuchsia-500/5 to-transparent";

    case "ranked-cup":
      return "from-indigo-500/15 via-blue-500/5 to-transparent";

    case "ranked":
      return "from-blue-500/15 via-sky-500/5 to-transparent";

    case "zero-build":
      return "from-orange-500/15 via-yellow-500/5 to-transparent";

    default:
      return "from-slate-500/10 via-slate-500/5 to-transparent";
  }
}

function getBadgeClass(type: MatchType) {
  switch (type) {
    case "fncs":
      return "bg-blue-50 text-blue-700 ring-blue-200";

    case "victory-cup":
      return "bg-amber-50 text-amber-700 ring-amber-200";

    case "cash-cup":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";

    case "reload":
      return "bg-purple-50 text-purple-700 ring-purple-200";

    case "ranked-cup":
      return "bg-indigo-50 text-indigo-700 ring-indigo-200";

    case "ranked":
      return "bg-sky-50 text-sky-700 ring-sky-200";

    case "zero-build":
      return "bg-orange-50 text-orange-700 ring-orange-200";

    default:
      return "bg-slate-50 text-slate-600 ring-slate-200";
  }
}

function Logo({
  type,
  large = false,
}: {
  type: MatchType;
  large?: boolean;
}) {
  return (
    <div
      className={[
        "relative shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        large ? "h-24 w-24" : "h-16 w-16",
      ].join(" ")}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getAccent(type)}`}
      />

      <img
        src={getLogoPath(type)}
        alt={`${getMatchTitle({
          id: "",
          type,
          mode: "",
          time: "",
          placement: 0,
          eliminations: 0,
          analyzed: false,
        })} logo`}
        className={[
          "relative z-10 h-full w-full object-contain p-2.5",
          large ? "p-3" : "p-2",
        ].join(" ")}
        onError={(event) => {
          const image = event.currentTarget;

          image.style.display = "none";

          const fallback = image.parentElement?.querySelector(
            "[data-logo-fallback]",
          ) as HTMLElement | null;

          if (fallback) {
            fallback.style.display = "flex";
          }
        }}
      />

      <div
        data-logo-fallback
        className="absolute inset-0 hidden items-center justify-center bg-slate-50"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {type === "fncs"
            ? "FNCS"
            : type === "victory-cup"
              ? "VC"
              : type === "cash-cup"
                ? "CC"
                : type === "reload"
                  ? "RL"
                  : type === "ranked-cup"
                    ? "RC"
                    : type === "ranked"
                      ? "R"
                      : type === "zero-build"
                        ? "ZB"
                        : "BR"}
        </span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">
        {value}
      </p>

      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

function convertApiMatch(match: ApiMatch): Match {
  const type = convertMatchType(match.type);

  return {
    id: match.id,
    type,
    tournamentName: match.eventName ?? undefined,
    tournamentRound: match.eventRound ?? undefined,
    points: match.points ?? undefined,
    mode: formatMode(match.mode),
    time: formatDate(match.playedAt),
    placement: match.placement,
    eliminations: match.eliminations,
    rankChange: match.rankChange ?? undefined,
    damage: match.damage ?? undefined,
    survivalTime: formatSurvivalTime(match.survivalTime),
    killsPerMinute: match.killsPerMinute ?? undefined,
    analyzed: match.analyzed,
    analysisStatus: match.analysis?.status,
    analysisScore:
      match.analysis?.overallScore ?? undefined,
  };
}

export default function MatchesPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedMatch, setSelectedMatch] =
    useState<Match | null>(null);

  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMatches() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/matches", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load matches.");
      }

      const data: ApiMatch[] = await response.json();

      setMatches(data.map(convertApiMatch));
    } catch (err) {
      console.error("Matches loading error:", err);
      setError("We couldn't load your matches.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  const filteredMatches = useMemo(() => {
    if (filter === "All") {
      return matches;
    }

    if (filter === "Tournaments") {
      return matches.filter(
        (match) => getCategory(match.type) === "Tournament",
      );
    }

    if (filter === "Ranked") {
      return matches.filter(
        (match) => getCategory(match.type) === "Ranked",
      );
    }

    return matches.filter(
      (match) => getCategory(match.type) === "Pub",
    );
  }, [filter, matches]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-7">
            <p className="mb-1 text-sm font-semibold text-blue-600">
              Performance
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Matches
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review your Fortnite matches, tournament results and ranked
              progression.
            </p>
          </div>

          <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="text-sm font-semibold text-slate-700">
                Loading matches...
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Connecting to your CompMind data.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-7">
            <p className="mb-1 text-sm font-semibold text-blue-600">
              Performance
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Matches
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review your Fortnite matches, tournament results and ranked
              progression.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-600">
              !
            </div>

            <h2 className="text-lg font-bold text-slate-950">
              Matches unavailable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={loadMatches}
              className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* HEADER */}

        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-blue-600">
              Performance
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Matches
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review your Fortnite matches, tournament results and ranked
              progression.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadMatches}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Refresh
            </button>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Total matches
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {matches.length}
              </p>
            </div>
          </div>
        </div>

        {/* FILTERS */}

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((item) => {
            const active = filter === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* MATCH COUNT */}

        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">
            {filteredMatches.length}{" "}
            {filteredMatches.length === 1 ? "match" : "matches"}
          </p>

          <p className="hidden text-xs text-slate-400 sm:block">
            Click a match to view performance
          </p>
        </div>

        {/* MATCH LIST */}

        <div className="space-y-3">
          {filteredMatches.map((match) => {
            const category = getCategory(match.type);

            return (
              <button
                key={match.id}
                type="button"
                onClick={() => setSelectedMatch(match)}
                className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-[1px] hover:border-slate-300 hover:shadow-md"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getAccent(
                    match.type,
                  )} opacity-0 transition group-hover:opacity-100`}
                />

                <div className="relative flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center">
                  {/* LOGO + MATCH NAME */}

                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <Logo type={match.type} />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                          {getMatchTitle(match)}
                        </h2>

                        <span
                          className={[
                            "rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                            getBadgeClass(match.type),
                          ].join(" ")}
                        >
                          {category}
                        </span>

                        {match.analyzed && (
                          <span className="rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 ring-1 ring-inset ring-green-200">
                            Analysed
                          </span>
                        )}
                      </div>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {getMatchSubtitle(match)}
                      </p>
                    </div>
                  </div>

                  {/* DESKTOP STATS */}

                  <div className="hidden items-center gap-10 lg:flex">
                    <Stat
                      label="Placement"
                      value={`#${match.placement}`}
                    />

                    <Stat
                      label="Eliminations"
                      value={String(match.eliminations)}
                    />

                    {category === "Tournament" ? (
                      <Stat
                        label="Points"
                        value={String(match.points ?? 0)}
                      />
                    ) : category === "Ranked" ? (
                      <Stat
                        label="Rank"
                        value={match.rank ?? "—"}
                        sub={
                          match.rankChange !== undefined
                            ? `+${match.rankChange}%`
                            : undefined
                        }
                      />
                    ) : (
                      <Stat
                        label="Damage"
                        value={
                          match.damage?.toLocaleString("en-GB") ?? "—"
                        }
                      />
                    )}
                  </div>

                  {/* MOBILE STATS */}

                  <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 lg:hidden">
                    <Stat
                      label="Place"
                      value={`#${match.placement}`}
                    />

                    <Stat
                      label="Elims"
                      value={String(match.eliminations)}
                    />

                    {category === "Tournament" ? (
                      <Stat
                        label="Points"
                        value={String(match.points ?? 0)}
                      />
                    ) : category === "Ranked" ? (
                      <Stat
                        label="Change"
                        value={`+${match.rankChange ?? 0}%`}
                      />
                    ) : (
                      <Stat
                        label="Damage"
                        value={
                          match.damage?.toLocaleString("en-GB") ?? "—"
                        }
                      />
                    )}
                  </div>

                  {/* ACTION */}

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 lg:border-0 lg:pt-0">
                    <span className="text-xs font-semibold text-slate-400">
                      Match #{match.id.slice(-6)}
                    </span>

                    <span className="text-sm font-semibold text-blue-600 transition group-hover:translate-x-0.5">
                      View match →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* EMPTY */}

        {filteredMatches.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-semibold text-slate-900">
              No matches found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try selecting another filter.
            </p>
          </div>
        )}
      </div>

      {/* MATCH DETAILS MODAL */}

      {selectedMatch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedMatch(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <Logo type={selectedMatch.type} large />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-950">
                        {getMatchTitle(selectedMatch)}
                      </h2>

                      <span
                        className={[
                          "rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                          getBadgeClass(selectedMatch.type),
                        ].join(" ")}
                      >
                        {getCategory(selectedMatch.type)}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {getMatchSubtitle(selectedMatch)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMatch(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* PRIMARY STATS */}

            <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100 sm:grid-cols-4">
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Placement
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  #{selectedMatch.placement}
                </p>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Eliminations
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {selectedMatch.eliminations}
                </p>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {getCategory(selectedMatch.type) === "Tournament"
                    ? "Points"
                    : getCategory(selectedMatch.type) === "Ranked"
                      ? "Rank change"
                      : "Damage"}
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {getCategory(selectedMatch.type) === "Tournament"
                    ? selectedMatch.points ?? "—"
                    : getCategory(selectedMatch.type) === "Ranked"
                      ? selectedMatch.rankChange !== undefined
                        ? `+${selectedMatch.rankChange}%`
                        : "—"
                      : selectedMatch.damage?.toLocaleString(
                          "en-GB",
                        ) ?? "—"}
                </p>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Survival
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {selectedMatch.survivalTime ?? "—"}
                </p>
              </div>
            </div>

            {/* MORE STATS */}

            <div className="p-5 sm:p-6">
              <h3 className="text-sm font-bold text-slate-950">
                Match statistics
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Damage
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {selectedMatch.damage?.toLocaleString(
                      "en-GB",
                    ) ?? "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Kills / Min
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {selectedMatch.killsPerMinute?.toFixed(2) ?? "—"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Mode
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {selectedMatch.mode}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Type
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {getCategory(selectedMatch.type)}
                  </p>
                </div>
              </div>

              {/* COMPMIND ANALYSIS */}

              <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
                <div className="border-b border-blue-100 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-blue-950">
                        CompMind analysis
                      </p>

                      <p className="mt-1 text-xs text-blue-700">
                        AI gameplay analysis for this match
                      </p>
                    </div>

                    {selectedMatch.analyzed ? (
                      <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-600 shadow-sm">
                        {selectedMatch.analysisStatus === "COMPLETED"
                          ? "Completed"
                          : selectedMatch.analysisStatus ??
                            "Analysed"}
                      </span>
                    ) : (
                      <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                        Ready
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  {selectedMatch.analyzed ? (
                    <div>
                      <p className="text-sm leading-6 text-blue-900/80">
                        This match has been processed by CompMind.
                        Your gameplay findings, weaknesses and
                        recommendations are available in Analysis.
                      </p>

                      {selectedMatch.analysisScore !== undefined && (
                        <div className="mt-4 rounded-xl border border-blue-100 bg-white p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Analysis score
                          </p>

                          <p className="mt-1 text-2xl font-bold text-slate-950">
                            {selectedMatch.analysisScore}
                            <span className="ml-1 text-sm font-medium text-slate-400">
                              / 100
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm leading-6 text-blue-900/80">
                      Once replay analysis is connected, CompMind
                      will identify your biggest mistakes, strongest
                      decisions, fight quality, positioning,
                      rotations, resource usage and endgame
                      performance for this match.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-4">
              <p className="text-xs text-slate-400">
                Match #{selectedMatch.id.slice(-6)}
              </p>

              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}