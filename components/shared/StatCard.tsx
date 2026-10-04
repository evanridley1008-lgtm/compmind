import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: ReactNode;
};

export default function StatCard({
  label,
  value,
  description,
  trend,
  trendPositive,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {icon}
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={
                trendPositive
                  ? "font-semibold text-emerald-600"
                  : "font-semibold text-slate-500"
              }
            >
              {trend}
            </span>
          )}

          {description && (
            <span className="text-slate-400">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
