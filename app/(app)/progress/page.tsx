import PageHeader from "../../../components/shared/PageHeader";
import SectionCard from "../../../components/shared/SectionCard";
import ProgressBar from "../../../components/shared/ProgressBar";

const scores = [
  { name: "Mechanics", current: 91, previous: 86 },
  { name: "Fighting", current: 76, previous: 72 },
  { name: "Positioning", current: 68, previous: 74 },
  { name: "Rotations", current: 63, previous: 69 },
  { name: "Resources", current: 82, previous: 77 },
  { name: "Endgame", current: 71, previous: 67 },
];

export default function ProgressPage() {
  return (
    <div className="cm-page">
      <PageHeader
        eyebrow="IMPROVEMENT TRACKING"
        title="Progress"
        description="Track how your competitive performance changes over time."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="cm-card p-5">
          <p className="text-sm text-slate-500">Overall Score</p>
          <p className="mt-2 text-3xl font-bold">78</p>
          <p className="mt-1 text-sm text-emerald-600">+4 this month</p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm text-slate-500">Training Sessions</p>
          <p className="mt-2 text-3xl font-bold">42</p>
          <p className="mt-1 text-sm text-slate-500">This month</p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm text-slate-500">Current Streak</p>
          <p className="mt-2 text-3xl font-bold">6 days</p>
          <p className="mt-1 text-sm text-emerald-600">Keep going</p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm text-slate-500">Objectives</p>
          <p className="mt-2 text-3xl font-bold">18</p>
          <p className="mt-1 text-sm text-slate-500">Completed</p>
        </div>
      </div>

      <div className="mt-6">
        <SectionCard
          title="Performance Progress"
          description="Current scores compared with your previous baseline."
        >
          <div className="space-y-6">
            {scores.map((score) => {
              const difference = score.current - score.previous;

              return (
                <div key={score.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {score.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Previous: {score.previous}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">{score.current}</p>
                      <p
                        className={`text-xs ${
                          difference >= 0
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {difference >= 0 ? "+" : ""}
                        {difference}
                      </p>
                    </div>
                  </div>

                  <ProgressBar value={score.current} />
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Recent Improvements">
          <div className="space-y-3">
            {[
              "Mechanics score increased by 5 points",
              "Resources score increased by 5 points",
              "Endgame score increased by 4 points",
              "Fighting score increased by 4 points",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Current Focus">
          <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
              Priority
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-950">
              Rotations
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your rotation score has dropped from 69 to 63. CompMind recommends
              focusing on earlier zone reads and safer mid-game movement.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}