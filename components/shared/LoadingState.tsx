type LoadingStateProps = {
  label?: string;
  fullPage?: boolean;
};

export default function LoadingState({
  label = "Loading...",
  fullPage = false,
}: LoadingStateProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullPage ? "min-h-[60vh]" : "min-h-40"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}
