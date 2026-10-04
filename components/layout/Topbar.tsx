"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/matches": "Matches",
  "/replays": "Replays",
  "/analysis": "Analysis",
  "/improvement": "Improvement",
  "/routine": "Routine",
  "/tournaments": "Tournaments",
  "/leaderboards": "Leaderboards",
  "/settings": "Settings",
  "/help": "Help",
  "/profile": "Profile",
};

export default function Topbar() {
  const pathname = usePathname();

  const basePath =
    Object.keys(pageNames).find(
      (path) =>
        pathname === path || pathname.startsWith(`${path}/`)
    ) ?? "/dashboard";

  const pageName = pageNames[basePath];

  return (
    <header className="sticky top-0 z-40 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="min-w-0">
        <p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">
          CompMind
        </p>

        <h1 className="truncate text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
          {pageName}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="hidden h-10 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-400 transition hover:border-slate-300 hover:bg-white hover:text-slate-600 sm:flex sm:w-[190px]"
          aria-label="Search CompMind"
        >
          <span className="text-base">⌕</span>

          <span className="flex-1 text-left">
            Search
          </span>

          <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
            /
          </kbd>
        </button>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          aria-label="Notifications"
        >
          <span className="text-base">🔔</span>

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-blue-600" />
        </button>

        <Link
          href="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          aria-label="Open profile"
        >
          M
        </Link>
      </div>
    </header>
  );
}