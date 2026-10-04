"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import SectionCard from "../../../components/shared/SectionCard";
import StatusBadge from "../../../components/shared/StatusBadge";
import ProgressBar from "../../../components/shared/ProgressBar";

type AnalysisSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

type AnalysisCategory =
  | "FIGHTING"
  | "POSITIONING"
  | "ROTATIONS"
  | "RESOURCES"
  | "ENDGAME"
  | "MECHANICS"
  | "DECISION_MAKING";

type AnalysisFinding = {
  id: string;
  category: AnalysisCategory;
  severity: AnalysisSeverity;
  title: string;
  description: string;
  timestamp?: string | null;
  confidence?: number | null;
  recommendation?: string | null;
};

type Analysis = {
  id: string;
  userId: string;
  matchId: string;
  replayId?: string | null;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  createdAt: string;
  completedAt?: string | null;
  overallScore?: number | null;
  summary?: string | null;
  findings: AnalysisFinding[];
  match: {
    id: string;
    eventName?: string | null;
    eventRound?: string | null;
    playedAt: string;
    placement: number;
    eliminations: number;
    damage?: number | null;
    points?: number | null;
  };
};

const categoryLabels: Record<AnalysisCategory, string> = {
  FIGHTING: "Fighting",
  POSITIONING: "Positioning",
  ROTATIONS: "Rotations",
  RESOURCES: "Resources",
  ENDGAME: "Endgame",
  MECHANICS: "Mechanics",
  DECISION_MAKING: "Decision Making",
};

const severityConfig: Record<
  AnalysisSeverity,
  {
    label: string;
    status: "success" | "warning" | "danger" | "info";
  }
> = {
  LOW: {
    label: "Low",
    status: "success",
  },
  MEDIUM: {
    label: "Medium",
    status: "warning",
  },
  HIGH: {
    label: "High",
    status: "danger",
  },
  CRITICAL: {
    label: "Critical",
    status: "danger",
  },
};

function formatCategory(category: AnalysisCategory) {
  return categoryLabels[category] ?? category;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getFindingIcon(category: AnalysisCategory) {
  switch (category) {
    case "FIGHTING":
      return "⚔";
    case "POSITIONING":
      return "◈";
    case "ROTATIONS":
      return "↗";
    case "RESOURCES":
      return "▣";
    case "ENDGAME":
      return "◎";
    case "MECHANICS":
      return "✦";
    case "DECISION_MAKING":
      return "◆";
    default:
      return "•";
  }
}

export default function AnalysisPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAnalyses() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/analysis", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load analysis data.");
      }

      const data: Analysis[] = await response.json();

      setAnalyses(data);

      if (data.length > 0) {
        setSelectedId(data[0].id);
      } else {
        setSelectedId(null);
      }
    } catch (err) {
      console.error("Analysis loading error:", err);
      setError("We couldn't load your gameplay analysis.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalyses();
  }, []);

  const selectedAnalysis = useMemo(() => {
    if (!selectedId) {
      return null;
    }

    return (
      analyses.find((analysis) => analysis.id === selectedId) ?? null
    );
  }, [analyses, selectedId]);

  const categoryScores = useMemo(() => {
    if (!selectedAnalysis) {
      return [];
    }

    const scores: Record<string, number> = {};

    selectedAnalysis.findings.forEach((finding) => {
      const category = formatCategory(finding.category);

      const score =
        finding.severity === "CRITICAL"
          ? 45
          : finding.severity === "HIGH"
            ? 60
            : finding.severity === "MEDIUM"
              ? 75
              : 90;

      if (scores[category] === undefined) {
        scores[category] = score;
      } else {
        scores[category] = Math.min(scores[category], score);
      }
    });

    return Object.entries(scores).map(([category, score]) => ({
      category,
      score,
    }));
  }, [selectedAnalysis]);

  const strengths = useMemo(() => {
    if (!selectedAnalysis) {
      return [];
    }

    return Array.from(
      new Set(
        selectedAnalysis.findings
          .filter(
            (finding) =>
              finding.severity === "LOW" ||
              (finding.severity === "MEDIUM" &&
                (finding.category === "FIGHTING" ||
                  finding.category === "MECHANICS")),
          )
          .map((finding) => formatCategory(finding.category)),
      ),
    );
  }, [selectedAnalysis]);

  const weaknesses = useMemo(() => {
    if (!selectedAnalysis) {
      return [];
    }

    return Array.from(
      new Set(
        selectedAnalysis.findings
          .filter(
            (finding) =>
              finding.severity === "HIGH" ||
              finding.severity === "CRITICAL",
          )
          .map((finding) => formatCategory(finding.category)),
      ),
    );
  }, [selectedAnalysis]);

  if (loading) {
    return (
      <div className="cm-page">
        <PageHeader
          eyebrow="Gameplay intelligence"
          title="Analysis"
          description="Review AI-generated insights from your competitive matches."
        />

        <div className="cm-card flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="text-sm font-medium text-slate-700">
              Loading gameplay analysis...
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Connecting to your CompMind data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cm-page">
        <PageHeader
          eyebrow="Gameplay intelligence"
          title="Analysis"
          description="Review AI-generated insights from your competitive matches."
        />

        <SectionCard>
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-600">
              !
            </div>

            <h2 className="text-lg font-semibold text-slate-950">
              Analysis unavailable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={loadAnalyses}
              className="cm-button cm-button-primary mt-5"
            >
              Try again
            </button>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="cm-page">
        <PageHeader
          eyebrow="Gameplay intelligence"
          title="Analysis"
          description="Review AI-generated insights from your competitive matches."
        />

        <SectionCard>
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
              ◈
            </div>

            <h2 className="text-xl font-semibold text-slate-950">
              No analysis yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Upload a replay and CompMind will analyse your gameplay,
              identify weaknesses and create personalised recommendations.
            </p>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="cm-page">
      <PageHeader
        eyebrow="Gameplay intelligence"
        title="Analysis"
        description="Turn your matches into specific, actionable improvements."
        actions={
          <button
            type="button"
            onClick={loadAnalyses}
            className="cm-button cm-button-secondary"
          >
            Refresh
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <SectionCard
          title="Analyses"
          description={`${analyses.length} analysis${
            analyses.length === 1 ? "" : "es"
          }`}
        >
          <div className="space-y-2">
            {analyses.map((analysis) => {
              const active = analysis.id === selectedId;

              return (
                <button
                  key={analysis.id}
                  type="button"
                  onClick={() => setSelectedId(analysis.id)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {analysis.match.eventName ?? "Gameplay Analysis"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {analysis.match.eventRound ?? "Match"} ·{" "}
                        {formatDate(analysis.match.playedAt)}
                      </p>
                    </div>

                    {analysis.overallScore !== null &&
                      analysis.overallScore !== undefined && (
                        <span className="text-lg font-bold text-slate-950">
                          {analysis.overallScore}
                        </span>
                      )}
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span>#{analysis.match.placement}</span>
                    <span>•</span>
                    <span>{analysis.match.eliminations} elims</span>
                  </div>
                </button>
              );
            })}
          </div>
        </SectionCard>

        {selectedAnalysis && (
          <div className="min-w-0 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="cm-card p-5">
                <p className="text-sm font-medium text-slate-500">
                  Analysis Score
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-slate-950">
                    {selectedAnalysis.overallScore ?? "—"}
                  </span>

                  {selectedAnalysis.overallScore !== null &&
                    selectedAnalysis.overallScore !== undefined && (
                      <span className="mb-1 text-sm text-slate-500">
                        / 100
                      </span>
                    )}
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Overall gameplay performance
                </p>
              </div>

              <div className="cm-card p-5">
                <p className="text-sm font-medium text-slate-500">
                  Placement
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                  #{selectedAnalysis.match.placement}
                </p>

                <p className="mt-2 truncate text-xs text-slate-500">
                  {selectedAnalysis.match.eventName ??
                    "Competitive match"}
                </p>
              </div>

              <div className="cm-card p-5">
                <p className="text-sm font-medium text-slate-500">
                  Eliminations
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                  {selectedAnalysis.match.eliminations}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Confirmed eliminations
                </p>
              </div>

              <div className="cm-card p-5">
                <p className="text-sm font-medium text-slate-500">
                  Analysis Status
                </p>

                <div className="mt-4">
                  <StatusBadge
                    status={
                      selectedAnalysis.status === "COMPLETED"
                        ? "success"
                        : selectedAnalysis.status === "PROCESSING"
                          ? "processing"
                          : selectedAnalysis.status === "FAILED"
                            ? "danger"
                            : "warning"
                    }
                  >
                    {selectedAnalysis.status}
                  </StatusBadge>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  {selectedAnalysis.completedAt
                    ? `Completed ${formatDate(
                        selectedAnalysis.completedAt,
                      )}`
                    : "Processing"}
                </p>
              </div>
            </div>

            <SectionCard
              title="AI Summary"
              description="CompMind's current interpretation of this match."
            >
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg text-blue-600 shadow-sm">
                    ✦
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Gameplay overview
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {selectedAnalysis.summary ??
                        "CompMind has analysed this match and identified several areas for improvement."}
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <div className="grid gap-6 lg:grid-cols-2">
              <SectionCard
                title="Strengths"
                description="Areas where the analysis indicates positive performance."
              >
                {strengths.length > 0 ? (
                  <div className="space-y-3">
                    {strengths.map((strength) => (
                      <div
                        key={strength}
                        className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-600">
                          ✓
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-950">
                            {strength}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Positive performance identified
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No specific strengths were identified.
                  </p>
                )}
              </SectionCard>

              <SectionCard
                title="Priority weaknesses"
                description="The areas that should receive the most attention."
              >
                {weaknesses.length > 0 ? (
                  <div className="space-y-3">
                    {weaknesses.map((weakness) => (
                      <div
                        key={weakness}
                        className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-red-600">
                          !
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-950">
                            {weakness}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            High-priority improvement area
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No high-priority weaknesses were identified.
                  </p>
                )}
              </SectionCard>
            </div>

            {categoryScores.length > 0 && (
              <SectionCard
                title="Analysis breakdown"
                description="Category-level signals extracted from the findings."
              >
                <div className="space-y-5">
                  {categoryScores.map(({ category, score }) => (
                    <ProgressBar
                      key={category}
                      label={category}
                      value={score}
                      showPercentage
                    />
                  ))}
                </div>
              </SectionCard>
            )}

            <SectionCard
              title="Detailed findings"
              description={`${selectedAnalysis.findings.length} gameplay finding${
                selectedAnalysis.findings.length === 1
                  ? ""
                  : "s"
              } detected`}
            >
              <div className="space-y-4">
                {selectedAnalysis.findings.map((finding) => {
                  const severity = severityConfig[finding.severity];

                  return (
                    <div
                      key={finding.id}
                      className="rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            {getFindingIcon(finding.category)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-slate-950">
                                {finding.title}
                              </h3>

                              <StatusBadge status={severity.status}>
                                {severity.label}
                              </StatusBadge>
                            </div>

                            <p className="mt-1 text-xs font-medium text-slate-500">
                              {formatCategory(finding.category)}
                              {finding.timestamp
                                ? ` · ${finding.timestamp}`
                                : ""}
                            </p>
                          </div>
                        </div>

                        {finding.confidence !== null &&
                          finding.confidence !== undefined && (
                            <div className="shrink-0 text-right">
                              <p className="text-xs text-slate-500">
                                Confidence
                              </p>

                              <p className="mt-1 text-sm font-semibold text-slate-950">
                                {Math.round(
                                  finding.confidence * 100,
                                )}
                                %
                              </p>
                            </div>
                          )}
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {finding.description}
                      </p>

                      {finding.recommendation && (
                        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Recommendation
                          </p>

                          <p className="mt-1 text-sm leading-6 text-slate-700">
                            {finding.recommendation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard
              title="Match details"
              description="The competitive match used for this analysis."
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Event
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {selectedAnalysis.match.eventName ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Round
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {selectedAnalysis.match.eventRound ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Damage
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {selectedAnalysis.match.damage?.toLocaleString(
                      "en-GB",
                    ) ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Points
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-950">
                    {selectedAnalysis.match.points ?? "—"}
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
}