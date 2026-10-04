"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Step = {
  number: number;
  title: string;
  shortTitle: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Welcome to CompMind",
    shortTitle: "Welcome",
  },
  {
    number: 2,
    title: "Build your profile",
    shortTitle: "Profile",
  },
  {
    number: 3,
    title: "Connect Fortnite",
    shortTitle: "Fortnite",
  },
  {
    number: 4,
    title: "Choose your plan",
    shortTitle: "Plan",
  },
  {
    number: 5,
    title: "You're ready",
    shortTitle: "Finish",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [region, setRegion] = useState("EU");
  const [platform, setPlatform] = useState("");
  const [plan, setPlan] = useState("free");
  const [fortniteConnected, setFortniteConnected] = useState(false);

  const progress = useMemo(
    () => ((currentStep - 1) / (steps.length - 1)) * 100,
    [currentStep],
  );

  function nextStep() {
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  }

  function previousStep() {
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function finishOnboarding() {
    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-950">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left brand panel */}
        <aside className="hidden w-full max-w-[390px] flex-col justify-between bg-[#07111f] p-10 text-white lg:flex">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 text-lg font-black tracking-tight"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4f8cff] text-lg font-black">
                C
              </span>
              COMPMIND
            </Link>

            <div className="mt-24">
              <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                Getting started
              </div>

              <h1 className="max-w-[280px] text-4xl font-black leading-tight tracking-[-0.04em]">
                Build your competitive profile.
              </h1>

              <p className="mt-5 max-w-[290px] text-sm leading-7 text-slate-400">
                CompMind will use your competitive identity, goals and
                gameplay data to build a personalised improvement experience.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">Setup progress</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#4f8cff] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-xs text-slate-500">
              You can change most of these settings later.
            </p>
          </div>
        </aside>

        {/* Main */}
        <section className="flex flex-1 flex-col">
          {/* Mobile header */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-black tracking-tight"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4f8cff] text-sm font-black text-white">
                C
              </span>
              COMPMIND
            </Link>

            <span className="text-xs font-bold text-slate-400">
              Step {currentStep} of {steps.length}
            </span>
          </header>

          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
            {/* Step navigation */}
            <div className="mb-10">
              <div className="mb-4 flex items-center justify-between gap-2">
                {steps.map((step, index) => {
                  const completed = currentStep > step.number;
                  const active = currentStep === step.number;

                  return (
                    <div
                      key={step.number}
                      className="flex min-w-0 flex-1 items-center"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (step.number <= currentStep) {
                            setCurrentStep(step.number);
                          }
                        }}
                        disabled={step.number > currentStep}
                        className="flex min-w-0 items-center gap-2 disabled:cursor-default"
                      >
                        <span
                          className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black transition",
                            completed
                              ? "bg-[#4f8cff] text-white"
                              : active
                                ? "border-2 border-[#4f8cff] bg-white text-[#4f8cff]"
                                : "border border-slate-200 bg-white text-slate-400",
                          ].join(" ")}
                        >
                          {completed ? "✓" : step.number}
                        </span>

                        <span
                          className={[
                            "hidden truncate text-xs font-bold sm:block",
                            active || completed
                              ? "text-slate-900"
                              : "text-slate-400",
                          ].join(" ")}
                        >
                          {step.shortTitle}
                        </span>
                      </button>

                      {index < steps.length - 1 && (
                        <div
                          className={[
                            "mx-2 h-px flex-1",
                            currentStep > step.number
                              ? "bg-[#4f8cff]"
                              : "bg-slate-200",
                          ].join(" ")}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-slate-200 lg:hidden">
                <div
                  className="h-full rounded-full bg-[#4f8cff] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {currentStep === 1 && (
                <div className="max-w-2xl">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                    🎯
                  </div>

                  <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#4f8cff]">
                    Step 1 · Welcome
                  </p>

                  <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                    Stop guessing.
                    <br />
                    Start improving.
                  </h2>

                  <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
                    CompMind turns your competitive gameplay into a clear
                    improvement system. We'll spend the next few steps setting
                    up the information CompMind needs to make your experience
                    useful from day one.
                  </p>

                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        icon: "🎮",
                        title: "Your game",
                        text: "Connect your Fortnite identity.",
                      },
                      {
                        icon: "🧠",
                        title: "Your goals",
                        text: "Tell CompMind what you want to improve.",
                      },
                      {
                        icon: "📈",
                        title: "Your progress",
                        text: "Track improvement over time.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5"
                      >
                        <div className="text-xl">{item.icon}</div>
                        <h3 className="mt-4 text-sm font-black">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="max-w-2xl">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#4f8cff]">
                    Step 2 · Your profile
                  </p>

                  <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                    What are you trying to achieve?
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    This helps CompMind shape your future training
                    recommendations.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        value: "competitive",
                        title: "Become more competitive",
                        description:
                          "Improve results, consistency and tournament performance.",
                      },
                      {
                        value: "professional",
                        title: "Push towards pro",
                        description:
                          "Build towards high-level competitive performance.",
                      },
                      {
                        value: "consistency",
                        title: "Become more consistent",
                        description:
                          "Reduce mistakes and perform better every session.",
                      },
                      {
                        value: "improvement",
                        title: "Improve for fun",
                        description:
                          "Get better without making competition the priority.",
                      },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setGoal(item.value)}
                        className={[
                          "rounded-2xl border p-5 text-left transition",
                          goal === item.value
                            ? "border-[#4f8cff] bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white hover:border-slate-300",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-sm font-black">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                              {item.description}
                            </p>
                          </div>

                          <span
                            className={[
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black",
                              goal === item.value
                                ? "border-[#4f8cff] bg-[#4f8cff] text-white"
                                : "border-slate-300 text-transparent",
                            ].join(" ")}
                          >
                            ✓
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                        Region
                      </span>
                      <select
                        value={region}
                        onChange={(event) => setRegion(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#4f8cff] focus:ring-4 focus:ring-blue-50"
                      >
                        <option value="EU">Europe</option>
                        <option value="NAE">NA-East</option>
                        <option value="NAW">NA-West</option>
                        <option value="BR">Brazil</option>
                        <option value="OCE">Oceania</option>
                        <option value="ASIA">Asia</option>
                        <option value="ME">Middle East</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
                        Main platform
                      </span>
                      <select
                        value={platform}
                        onChange={(event) => setPlatform(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#4f8cff] focus:ring-4 focus:ring-blue-50"
                      >
                        <option value="">Select platform</option>
                        <option value="pc">PC</option>
                        <option value="playstation">PlayStation</option>
                        <option value="xbox">Xbox</option>
                        <option value="nintendo">Nintendo Switch</option>
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="max-w-2xl">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#4f8cff]">
                    Step 3 · Fortnite
                  </p>

                  <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                    Connect your Fortnite account.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                    Your Epic account will eventually allow CompMind to match
                    your competitive identity with your gameplay and
                    performance data.
                  </p>

                  <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl text-white">
                          🎮
                        </div>

                        <div>
                          <h3 className="text-base font-black">
                            Epic Games
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            Secure account connection
                          </p>
                        </div>
                      </div>

                      {fortniteConnected ? (
                        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
                          ✓ Connected
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setFortniteConnected(true)}
                          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                        >
                          Continue setup
                        </button>
                      )}
                    </div>

                    <div className="mt-7 border-t border-slate-100 pt-6">
                      <div className="flex gap-3">
                        <span className="mt-0.5 text-emerald-500">✓</span>
                        <p className="text-xs leading-5 text-slate-500">
                          We'll use the official Epic authentication flow when
                          the real integration is connected.
                        </p>
                      </div>

                      <div className="mt-3 flex gap-3">
                        <span className="mt-0.5 text-emerald-500">✓</span>
                        <p className="text-xs leading-5 text-slate-500">
                          CompMind will never ask you for your Epic password.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    For this foundation build, the button only records the
                    onboarding choice. Real Epic OAuth will replace it.
                  </p>
                </div>
              )}

              {currentStep === 4 && (
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#4f8cff]">
                    Step 4 · Your plan
                  </p>

                  <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                    Choose how you want to use CompMind.
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    You can change your subscription later. Pro checkout will
                    be connected to Stripe when billing is implemented.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setPlan("free")}
                      className={[
                        "rounded-3xl border p-6 text-left transition",
                        plan === "free"
                          ? "border-[#4f8cff] bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-slate-300",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black">Free</h3>
                        <span className="text-2xl font-black">£0</span>
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        Start building your competitive profile.
                      </p>

                      <div className="mt-6 space-y-3 text-xs font-semibold text-slate-600">
                        <div>✓ Basic player profile</div>
                        <div>✓ Limited replay analysis</div>
                        <div>✓ Basic improvement tracking</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlan("pro")}
                      className={[
                        "relative rounded-3xl border p-6 text-left transition",
                        plan === "pro"
                          ? "border-[#4f8cff] bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-slate-300",
                      ].join(" ")}
                    >
                      <span className="absolute right-5 top-5 rounded-full bg-[#4f8cff] px-2.5 py-1 text-[10px] font-black text-white">
                        PRO
                      </span>

                      <div className="flex items-center justify-between pr-12">
                        <h3 className="text-lg font-black">Pro</h3>
                        <span className="text-2xl font-black">£7.99</span>
                      </div>

                      <p className="mt-2 text-xs text-slate-500">
                        Deeper analysis and more competitive insight.
                      </p>

                      <div className="mt-6 space-y-3 text-xs font-semibold text-slate-600">
                        <div>✓ Unlimited replay analysis</div>
                        <div>✓ Personalised coaching</div>
                        <div>✓ Recurring weakness detection</div>
                        <div>✓ Advanced improvement history</div>
                      </div>
                    </button>
                  </div>

                  {plan === "pro" && (
                    <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-xs leading-5 text-blue-700">
                      Pro billing isn't connected yet. We'll connect the real
                      Stripe checkout later, so no payment will be taken
                      during this foundation build.
                    </div>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="max-w-2xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600">
                    ✓
                  </div>

                  <p className="mb-3 mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#4f8cff]">
                    Step 5 · Complete
                  </p>

                  <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                    Your CompMind setup is ready.
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
                    We've got the foundation for your competitive profile.
                    Next, CompMind will bring your Fortnite data, matches,
                    analysis and training together in one place.
                  </p>

                  <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Goal
                        </span>
                        <p className="mt-1 text-sm font-black">
                          {goal
                            ? goal === "professional"
                              ? "Push towards pro"
                              : goal === "competitive"
                                ? "Become more competitive"
                                : goal === "consistency"
                                  ? "Become more consistent"
                                  : "Improve for fun"
                            : "Not selected"}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Region
                        </span>
                        <p className="mt-1 text-sm font-black">{region}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Fortnite
                        </span>
                        <p className="mt-1 text-sm font-black">
                          {fortniteConnected ? "Connected" : "Ready to connect"}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Plan
                        </span>
                        <p className="mt-1 text-sm font-black">
                          {plan === "pro" ? "Pro" : "Free"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="mt-12 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    ← Back
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    Exit setup
                  </Link>
                )}
              </div>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (currentStep === 2 && !goal) ||
                    (currentStep === 3 && !fortniteConnected)
                  }
                  className="rounded-xl bg-[#4f8cff] px-7 py-3.5 text-sm font-black text-white shadow-sm transition hover:bg-[#3d79e6] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finishOnboarding}
                  className="rounded-xl bg-[#4f8cff] px-7 py-3.5 text-sm font-black text-white shadow-sm transition hover:bg-[#3d79e6]"
                >
                  Enter CompMind →
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
