"use client";

import { useMemo, useState } from "react";

type LeaderboardPlayer = {
  rank: number;
  previousRank: number;
  username: string;
  region: string;
  points: number;
  tournaments: number;
  wins: number;
  top10s: number;
  eliminations: number;
  trend: "up" | "down" | "same";
};

const players: LeaderboardPlayer[] = [
  {
    rank: 1,
    previousRank: 2,
    username: "Veno",
    region: "EU",
    points: 18420,
    tournaments: 24,
    wins: 7,
    top10s: 18,
    eliminations: 284,
    trend: "up",
  },
  {
    rank: 2,
    previousRank: 1,
    username: "Peterbot",
    region: "NA",
    points: 18180,
    tournaments: 22,
    wins: 8,
    top10s: 17,
    eliminations: 301,
    trend: "down",
  },
  {
    rank: 3,
    previousRank: 4,
    username: "Kami",
    region: "EU",
    points: 17640,
    tournaments: 21,
    wins: 6,
    top10s: 16,
    eliminations: 267,
    trend: "up",
  },
  {
    rank: 4,
    previousRank: 3,
    username: "Mero",
    region: "NA",
    points: 17120,
    tournaments: 23,
    wins: 5,
    top10s: 17,
    eliminations: 251,
    trend: "down",
  },
  {
    rank: 5,
    previousRank: 6,
    username: "Queasy",
    region: "EU",
    points: 16580,
    tournaments: 20,
    wins: 5,
    top10s: 15,
    eliminations: 239,
    trend: "up",
  },
  {
    rank: 6,
    previousRank: 5,
    username: "Tayson",
    region: "EU",
    points: 16140,
    tournaments: 19,
    wins: 4,
    top10s: 14,
    eliminations: 226,
    trend: "down",
  },
  {
    rank: 7,
    previousRank: 8,
    username: "Acorn",
    region: "NA",
    points: 15870,
    tournaments: 21,
    wins: 4,
    top10s: 15,
    eliminations: 218,
    trend: "up",
  },
  {
    rank: 8,
    previousRank: 7,
    username: "Malibuca",
    region: "EU",
    points: 15420,
    tournaments: 18,
    wins: 4,
    top10s: 13,
    eliminations: 207,
    trend: "down",
  },
  {
    rank: 9,
    previousRank: 10,
    username: "MŸKO",
    region: "EU",
    points: 11410,
    tournaments: 12,
    wins: 1,
    top10s: 5,
    eliminations: 96,
    trend: "up",
  },
  {
    rank: 10,
    previousRank: 9,
    username: "Savage",
    region: "EU",
    points: 11280,
    tournaments: 15,
    wins: 2,
    top10s: 6,
    eliminations: 104,
    trend: "down",
  },
];

const regions = ["Global", "EU", "NA", "OCE", "ASIA", "BR", "ME"];

const leaderboardTypes = [
  "CompMind Rating",
  "Tournament Points",
  "Tournament Wins",
  "Eliminations",
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}

export default function LeaderboardsPage() {
  const [region, setRegion] = useState("Global");
  const [type, setType] = useState("CompMind Rating");
  const [search, setSearch] = useState("");

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = player.username
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRegion =
        region === "Global" || player.region === region;

      return matchesSearch && matchesRegion;
    });
  }, [region, search]);

  const topThree = players.slice(0, 3);

  return (
    <div className="cm-page">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
          Competitive Rankings
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Leaderboards
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Track competitive performance, tournament results and CompMind
          rankings across the competitive community.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="cm-input min-w-[190px] cursor-pointer"
          >
            {leaderboardTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="cm-input min-w-[120px] cursor-pointer"
          >
            {regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full lg:w-[260px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            ⌕
          </span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search player..."
            className="cm-input pl-9"
          />
        </div>
      </div>

      {/* Featured top 3 */}
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {topThree.map((player, index) => {
          const position = index + 1;

          return (
            <div
              key={player.username}
              className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm ${
                position === 1
                  ? "border-blue-200"
                  : "border-slate-200"
              }`}
            >
              {position === 1 && (
                <div className="absolute right-4 top-4 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  #1
                </div>
              )}

              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black ${
                    position === 1
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {position}
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {player.region}
                  </p>

                  <h2 className="text-lg font-bold text-slate-950">
                    {player.username}
                  </h2>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Rating
                  </p>

                  <p className="mt-1 text-2xl font-black text-slate-950">
                    {formatNumber(player.points)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Wins
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-950">
                    {player.wins}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Player's position */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/50">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
              M
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Your Ranking
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-950">
                MŸKO
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Global Rank
              </p>

              <p className="mt-1 text-xl font-black text-slate-950">
                #9
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Rating
              </p>

              <p className="mt-1 text-xl font-black text-slate-950">
                11,410
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Movement
              </p>

              <p className="mt-1 text-xl font-black text-emerald-600">
                ↑ 1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main leaderboard */}
      <section className="cm-card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-950">
              {type}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {region === "Global"
                ? "Players across all regions"
                : `Players competing in ${region}`}
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {filteredPlayers.length} players
          </span>
        </div>

        {/* Desktop header */}
        <div className="hidden grid-cols-[70px_minmax(180px,1fr)_120px_110px_110px_110px_80px] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 lg:grid">
          <span>Rank</span>
          <span>Player</span>
          <span>Rating</span>
          <span>Tournaments</span>
          <span>Wins</span>
          <span>Eliminations</span>
          <span>Trend</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredPlayers.map((player) => (
            <div
              key={player.username}
              className="px-5 py-4 transition hover:bg-slate-50/70"
            >
              <div className="grid gap-4 lg:grid-cols-[70px_minmax(180px,1fr)_120px_110px_110px_110px_80px] lg:items-center">
                {/* Rank */}
                <div className="flex items-center gap-3 lg:block">
                  <span className="text-lg font-black text-slate-950">
                    #{player.rank}
                  </span>

                  <span className="text-xs text-slate-400 lg:hidden">
                    {player.region}
                  </span>
                </div>

                {/* Player */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
                    {player.username.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {player.username}
                    </p>

                    <p className="text-xs text-slate-400">
                      {player.region} · {player.top10s} Top 10s
                    </p>
                  </div>
                </div>

                {/* Mobile stats */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:contents">
                  <div className="rounded-xl bg-slate-50 px-3 py-2 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 lg:hidden">
                      Rating
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-950 lg:mt-0">
                      {formatNumber(player.points)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-2 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 lg:hidden">
                      Tournaments
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-950 lg:mt-0">
                      {player.tournaments}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-2 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 lg:hidden">
                      Wins
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-950 lg:mt-0">
                      {player.wins}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-2 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 lg:hidden">
                      Eliminations
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-950 lg:mt-0">
                      {player.eliminations}
                    </p>
                  </div>
                </div>

                {/* Trend */}
                <div className="hidden lg:block">
                  {player.trend === "up" && (
                    <span className="font-bold text-emerald-600">
                      ↑ {player.previousRank - player.rank}
                    </span>
                  )}

                  {player.trend === "down" && (
                    <span className="font-bold text-red-500">
                      ↓ {player.rank - player.previousRank}
                    </span>
                  )}

                  {player.trend === "same" && (
                    <span className="font-bold text-slate-400">
                      —
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredPlayers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                ⌕
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-950">
                No players found
              </h3>

              <p className="mt-1.5 text-sm text-slate-500">
                Try a different player name or region.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Explanation */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="cm-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
            01
          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-950">
            Compete
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Play tournaments and CompMind events to build your competitive
            record.
          </p>
        </div>

        <div className="cm-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 font-bold text-violet-600">
            02
          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-950">
            Improve
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Use replay analysis and personalised training to improve your
            performance.
          </p>
        </div>

        <div className="cm-card p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
            03
          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-950">
            Climb
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Build your competitive history and climb the CompMind
            leaderboard.
          </p>
        </div>
      </section>
    </div>
  );
}