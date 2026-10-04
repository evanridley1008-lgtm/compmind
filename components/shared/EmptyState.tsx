import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          {icon}
        </div>
      )}

      <h3 className="text-sm font-semibold text-slate-950">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}

