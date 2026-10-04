"use client";

import { useEffect, useRef, useState } from "react";

type ReplayStatus =
  | "Ready"
  | "Processing"
  | "Completed"
  | "Failed";

type ApiReplay = {
  id: string;
  fileName: string;
  fileSize: number | null;
  fileUrl: string | null;
  status: "UPLOADED" | "PROCESSING" | "COMPLETED" | "FAILED";
  uploadedAt: string;
  processedAt: string | null;
  match: {
    id: string;
    category: string;
    type: string;
    mode: string;
    eventName: string | null;
    eventRound: string | null;
    playedAt: string;
    placement: number;
    eliminations: number;
    survivalTime: number | null;
  } | null;
  analysis: {
    id: string;
    status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
    overallScore: number | null;
    findings: {
      id: string;
    }[];
  } | null;
};

type Replay = {
  id: string;
  name: string;
  size: string;
  uploaded: string;
  status: ReplayStatus;
  matchType: string;
  duration: string;
  score?: number;
  findings?: number;
};

function mapStatus(status: ApiReplay["status"]): ReplayStatus {
  switch (status) {
    case "PROCESSING":
      return "Processing";
    case "COMPLETED":
      return "Completed";
    case "FAILED":
      return "Failed";
    case "UPLOADED":
    default:
      return "Ready";
  }
}

function formatFileSize(bytes: number | null) {
  if (!bytes || bytes <= 0) {
    return "—";
  }

  const megabytes = bytes / 1024 / 1024;

  if (megabytes < 1) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${megabytes.toFixed(1)} MB`;
}

function formatUploadedDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatMatchType(match: ApiReplay["match"]) {
  if (!match) {
    return "Unidentified match";
  }

  if (match.eventName) {
    return match.eventRound
      ? `${match.eventName} · ${match.eventRound}`
      : match.eventName;
  }

  return `${match.type.replaceAll("_", " ")} · ${match.mode}`;
}

function formatDuration(seconds: number | null) {
  if (!seconds || seconds <= 0) {
    return "—";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function mapReplay(replay: ApiReplay): Replay {
  return {
    id: replay.id,
    name: replay.fileName,
    size: formatFileSize(replay.fileSize),
    uploaded: formatUploadedDate(replay.uploadedAt),
    status: mapStatus(replay.status),
    matchType: formatMatchType(replay.match),
    duration: formatDuration(replay.match?.survivalTime ?? null),
    score: replay.analysis?.overallScore ?? undefined,
    findings: replay.analysis?.findings?.length ?? undefined,
  };
}

function StatusBadge({ status }: { status: ReplayStatus }) {
  const styles: Record<ReplayStatus, string> = {
    Ready: "bg-slate-100 text-slate-600",
    Processing: "bg-blue-50 text-blue-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Failed: "bg-red-50 text-red-700",
  };

  const dots: Record<ReplayStatus, string> = {
    Ready: "bg-slate-400",
    Processing: "bg-blue-500",
    Completed: "bg-emerald-500",
    Failed: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

export default function ReplaysPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [replays, setReplays] = useState<Replay[]>([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function loadReplays() {
    try {
      setError("");

      const response = await fetch("/api/replays", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load replays.");
      }

      setReplays(
        Array.isArray(data)
          ? data.map((replay: ApiReplay) => mapReplay(replay))
          : [],
      );
    } catch (loadError) {
      console.error(loadError);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load replays.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReplays();
  }, []);

  async function addReplay(file: File) {
    if (!file.name.toLowerCase().endsWith(".replay")) {
      alert("Please select a Fortnite .replay file.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const response = await fetch("/api/replays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload replay.");
      }

      const createdReplay = mapReplay(data as ApiReplay);

      setReplays((current) => [createdReplay, ...current]);
    } catch (uploadError) {
      console.error(uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload replay.",
      );
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (file) {
      addReplay(file);
    }

    event.target.value = "";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      addReplay(file);
    }
  }

  function analyseReplay(id: string) {
    /*
     * Real analysis processing will be connected after the
     * replay-analysis backend is built.
     *
     * For now this keeps the existing visual workflow while
     * the replay itself is already persisted in the database.
     */
    setReplays((current) =>
      current.map((replay) =>
        replay.id === id
          ? {
              ...replay,
              status: "Processing",
            }
          : replay,
      ),
    );

    setTimeout(() => {
      setReplays((current) =>
        current.map((replay) =>
          replay.id === id
            ? {
                ...replay,
                status: "Completed",
                score: 81,
                findings: 10,
              }
            : replay,
        ),
      );
    }, 1800);
  }

  const completed = replays.filter(
    (replay) => replay.status === "Completed",
  ).length;

  const processing = replays.filter(
    (replay) => replay.status === "Processing",
  ).length;

  const scores = replays
    .map((replay) => replay.score)
    .filter((score): score is number => score !== undefined);

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((total, score) => total + score, 0) /
            scores.length,
        )
      : 0;

  return (
    <div className="cm-page">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            Gameplay Intelligence
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Replays
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Upload your Fortnite replays and let CompMind analyse your
            gameplay, identify weaknesses and generate training objectives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="cm-button cm-button-primary disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "+ Upload Replay"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".replay"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={loadReplays}
            className="font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Total Replays
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {loading ? "—" : replays.length}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Uploaded to CompMind
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Analysed
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {loading ? "—" : completed}
          </p>

          <p className="mt-2 text-xs text-emerald-600">
            Analysis available
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Processing
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {loading ? "—" : processing}
          </p>

          <p className="mt-2 text-xs text-blue-600">
            Being analysed
          </p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm font-medium text-slate-500">
            Avg. Analysis Score
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-950">
            {loading ? "—" : averageScore || "—"}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Across analysed games
          </p>
        </div>
      </div>

      {/* Upload */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`mb-8 cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-10 ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
        }`}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
          ↑
        </div>

        <h2 className="mt-4 text-base font-bold text-slate-950">
          Drop a Fortnite replay here
        </h2>

        <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-slate-500">
          Drag and drop a .replay file here, or click to browse your
          computer.
        </p>

        <p className="mt-3 text-xs font-medium text-slate-400">
          Your replay will appear here before analysis begins.
        </p>
      </div>

      {/* Replay list */}
      <section className="cm-card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-950">
              Your Replays
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Review uploaded gameplay and launch analysis.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {loading
              ? "Loading..."
              : `${replays.length} replay${replays.length === 1 ? "" : "s"}`}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="px-5 py-12 text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading your replays...
              </p>
            </div>
          ) : replays.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-400">
                ▶
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-950">
                No replays yet
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-500">
                Upload your first Fortnite replay and it will appear here.
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="cm-button cm-button-primary mt-5"
              >
                Upload Your First Replay
              </button>
            </div>
          ) : (
            replays.map((replay) => (
              <div
                key={replay.id}
                className="p-5 transition hover:bg-slate-50/70"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Replay identity */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      ▶
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-bold text-slate-950">
                          {replay.name}
                        </h3>

                        <StatusBadge status={replay.status} />
                      </div>

                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                        <span>{replay.matchType}</span>
                        <span>•</span>
                        <span>{replay.duration}</span>
                        <span>•</span>
                        <span>{replay.size}</span>
                        <span>•</span>
                        <span>{replay.uploaded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Analysis result */}
                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    {replay.score !== undefined && (
                      <div className="rounded-xl bg-slate-50 px-4 py-2 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Score
                        </p>

                        <p className="mt-0.5 text-lg font-bold text-slate-950">
                          {replay.score}
                        </p>
                      </div>
                    )}

                    {replay.findings !== undefined && (
                      <div className="rounded-xl bg-slate-50 px-4 py-2 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Findings
                        </p>

                        <p className="mt-0.5 text-lg font-bold text-slate-950">
                          {replay.findings}
                        </p>
                      </div>
                    )}

                    {replay.status === "Completed" && (
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            "The full analysis viewer will be connected in the Analysis system.",
                          )
                        }
                        className="cm-button cm-button-secondary"
                      >
                        View Analysis
                      </button>
                    )}

                    {replay.status === "Ready" && (
                      <button
                        type="button"
                        onClick={() => analyseReplay(replay.id)}
                        className="cm-button cm-button-primary"
                      >
                        Analyse Replay
                      </button>
                    )}

                    {replay.status === "Processing" && (
                      <div className="flex min-h-10 items-center gap-2 rounded-lg bg-blue-50 px-4 text-sm font-semibold text-blue-700">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                        Analysing...
                      </div>
                    )}

                    {replay.status === "Failed" && (
                      <button
                        type="button"
                        onClick={() => analyseReplay(replay.id)}
                        className="cm-button cm-button-secondary"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* How analysis works */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="cm-card p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
            1
          </div>

          <h3 className="text-sm font-bold text-slate-950">
            Upload
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Upload your Fortnite replay file after a game or tournament.
          </p>
        </div>

        <div className="cm-card p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 font-bold text-violet-600">
            2
          </div>

          <h3 className="text-sm font-bold text-slate-950">
            Analyse
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            CompMind processes the gameplay and identifies important
            decisions, mistakes and strengths.
          </p>
        </div>

        <div className="cm-card p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
            3
          </div>

          <h3 className="text-sm font-bold text-slate-950">
            Improve
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Your findings become personalised training objectives and
            long-term improvement data.
          </p>
        </div>
      </section>
    </div>
  );
}