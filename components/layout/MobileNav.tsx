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
  { name: "Settings", href: "/settings", icon: "⚙" },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <div className="border-b border-slate-200 bg-white lg:hidden">
      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {navigation.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}