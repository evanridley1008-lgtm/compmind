"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "⌂" },
  { name: "Matches", href: "/matches", icon: "▣" },
  { name: "Replays", href: "/replays", icon: "▶" },
  { name: "Analysis", href: "/analysis", icon: "◈" },
  { name: "Improvement", href: "/improvement", icon: "↗" },
  { name: "Routine", href: "/routine", icon: "✓" },
  { name: "Tournaments", href: "/tournaments", icon: "🏆" },
  { name: "Leaderboards", href: "/leaderboards", icon: "♛" },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: "⚙" },
  { name: "Help", href: "/help", icon: "?" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:min-h-screen lg:flex-col">
      <div className="flex h-[82px] shrink-0 items-center border-b border-slate-100 px-6">
        <Link
          href="/dashboard"
          className="group flex items-center gap-2"
          aria-label="CompMind dashboard"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-sm transition group-hover:bg-blue-700">
            C
          </div>

          <div>
            <div className="text-[18px] font-black tracking-[-0.04em] text-slate-950">
              COMP<span className="text-blue-600">MIND</span>
            </div>

            <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Competitive Intelligence
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm transition ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.name}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="my-6 h-px bg-slate-100" />

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Account
        </p>

        <nav className="space-y-1">
          {secondaryNavigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 border-t border-slate-100 p-4">
        <Link
          href="/profile"
          className="group flex items-center gap-3 rounded-xl border border-transparent bg-slate-50 p-3 transition hover:border-slate-200 hover:bg-slate-100"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            M
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-950">
              MŸKO
            </p>

            <p className="text-xs text-slate-400">
              EU · Pro
            </p>
          </div>

          <span className="text-slate-400 transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </aside>
  );
}