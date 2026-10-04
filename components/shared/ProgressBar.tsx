type ProgressBarProps = {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function ProgressBar({
  value,
  label,
  showPercentage = true,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, value));

  const height = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  }[size];

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label ? (
            <span className="text-xs font-medium text-slate-600">
              {label}
            </span>
          ) : (
            <span />
          )}

          {showPercentage && (
            <span className="text-xs font-semibold text-slate-700">
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-slate-100 ${height}`}
      >
        <div
          className={`h-full rounded-full bg-blue-600 transition-all duration-500 ${height}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
