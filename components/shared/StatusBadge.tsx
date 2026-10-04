type Status =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "processing";

type StatusBadgeProps = {
  status: Status;
  children: React.ReactNode;
  dot?: boolean;
};

const statusStyles: Record<Status, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/10",
  danger: "bg-red-50 text-red-700 ring-red-600/10",
  info: "bg-blue-50 text-blue-700 ring-blue-600/10",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/10",
  processing: "bg-violet-50 text-violet-700 ring-violet-600/10",
};

const dotStyles: Record<Status, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-slate-400",
  processing: "bg-violet-500",
};

export default function StatusBadge({
  status,
  children,
  dot = true,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`}
        />
      )}

      {children}
    </span>
  );
}
