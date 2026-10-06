import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f9fc] text-slate-950">
      {/* =========================================================
          NAVIGATION
      ========================================================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/10 transition group-hover:bg-blue-600">
              C
            </div>

            <span className="text-[17px] font-black tracking-[-0.02em]">
              COMPMIND
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-[13px] font-semibold text-slate-500 md:flex">
            <a
              href="#features"
              className="transition hover:text-slate-950"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-slate-950"
            >
              How it works
            </a>

            <a
              href="#pricing"
              className="transition hover:text-slate-950"
            >
              Pricing
            </a>

            <a
              href="#about"
              className="transition hover:text-slate-950"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:block"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-blue-600"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="pointer-events-none absolute right-[-200px] top-[300px] h-[500px] w-[500px] rounded-full bg-indigo-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 lg:pb-28 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              COMPETITIVE IMPROVEMENT PLATFORM
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[78px]">
              Play better.
              <span className="block text-blue-600">
                Know why.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              CompMind turns your competitive gameplay into clear,
              actionable improvement. Analyse your performance, discover
              recurring weaknesses and know exactly what to work on next.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Start improving
              </Link>

              <a
                href="#how-it-works"
                className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                See how it works
              </a>
            </div>

            <p className="mt-4 text-[11px] font-medium text-slate-400">
              Built for competitive Fortnite players
            </p>
          </div>

          {/* =====================================================
              PRODUCT PREVIEW
          ===================================================== */}
          <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
            <div className="absolute -inset-4 rounded-[32px] bg-blue-500/5 blur-2xl" />

            <div className="relative rounded-[26px] border border-slate-200 bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:p-3">
              <div className="overflow-hidden rounded-[20px] border border-slate-100 bg-[#f8fafc]">
                {/* Fake browser bar */}
                <div className="flex h-11 items-center gap-2 border-b border-slate-200 bg-white px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />

                  <div className="mx-auto hidden h-6 max-w-sm flex-1 rounded-lg bg-slate-50 sm:block" />
                </div>

                <div className="p-4 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Dashboard
                      </p>

                      <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">
                        Competitive overview
                      </h2>
                    </div>

                    <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:flex">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-slate-600">
                        EU
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardStat
                      label="PR"
                      value="11,410"
                      positive="+8.4%"
                    />

                    <DashboardStat
                      label="K/D"
                      value="3.42"
                      positive="+12.1%"
                    />

                    <DashboardStat
                      label="Avg. placement"
                      value="#18.4"
                      positive="+6.2%"
                    />

                    <DashboardStat
                      label="Matches analysed"
                      value="127"
                      positive="+24"
                    />
                  </div>

                  <div className="mt-3 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-400">
                            Performance
                          </p>

                          <p className="mt-1 font-bold">
                            Improvement trend
                          </p>
                        </div>

                        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                          +18.7%
                        </span>
                      </div>

                      <div className="mt-8 flex h-36 items-end gap-1.5">
                        {[
                          28, 34, 31, 43, 39, 50, 48, 57, 54, 68, 64, 78,
                          73, 88, 83, 95,
                        ].map((height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-blue-500/80 transition hover:bg-blue-600"
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-xs font-medium text-slate-400">
                        Current focus
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <h3 className="text-lg font-black">
                          Rotations
                        </h3>

                        <span className="rounded-lg bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-600">
                          63%
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        Your recent matches show inconsistent rotation
                        timing before endgame.
                      </p>

                      <div className="mt-5 h-2 rounded-full bg-slate-100">
                        <div className="h-full w-[63%] rounded-full bg-blue-500" />
                      </div>

                      <div className="mt-5 space-y-2">
                        <TinyRow label="Positioning" value="82%" />
                        <TinyRow label="Fighting" value="76%" />
                        <TinyRow label="Endgame" value="69%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">
          <TrustItem number="01" text="Analyse" />
          <TrustItem number="02" text="Understand" />
          <TrustItem number="03" text="Train" />
          <TrustItem number="04" text="Improve" />
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section id="features" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                The platform
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                Your gameplay
                <span className="block text-slate-400">
                  has patterns.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-slate-500">
                CompMind is designed to turn those patterns into useful
                information you can actually train.
              </p>

              <Link
                href="/signup"
                className="mt-8 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
              >
                Build your profile
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                number="01"
                title="Replay Analysis"
                text="Break down gameplay and identify the decisions that matter instead of watching hours of footage without direction."
              />

              <FeatureCard
                number="02"
                title="Weakness Detection"
                text="Find recurring problems across matches so you can work on the actual reason your performance is inconsistent."
              />

              <FeatureCard
                number="03"
                title="Personalised Training"
                text="Turn analysis into specific objectives for mechanics, fighting, positioning, rotations and endgame."
              />

              <FeatureCard
                number="04"
                title="Progress Tracking"
                text="See whether your performance is changing over time with measurable competitive data."
              />

              <FeatureCard
                number="05"
                title="Competitive Profile"
                text="Keep your results, statistics, match history and improvement journey organised in one place."
              />

              <FeatureCard
                number="06"
                title="Tournaments"
                text="Follow competitive events, track results and compete through the CompMind platform."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section
        id="how-it-works"
        className="border-y border-slate-200 bg-[#f7f9fc]"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              How CompMind works
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              From gameplay to a plan.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
              A simple improvement loop designed around competitive
              players.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Play"
              text="Play your matches normally and build your competitive history."
            />

            <ProcessCard
              number="02"
              title="Analyse"
              text="Review your performance and discover patterns across your gameplay."
            />

            <ProcessCard
              number="03"
              title="Improve"
              text="Use targeted training objectives and measure your progress."
            />
          </div>

          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid items-center gap-4 md:grid-cols-5">
              <ProcessPill
                title="Gameplay"
                subtitle="Your matches"
              />

              <Arrow />

              <ProcessPill
                title="Analysis"
                subtitle="Find patterns"
              />

              <Arrow />

              <ProcessPill
                title="Training"
                subtitle="Fix weaknesses"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONNECTION
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                Competitive profile
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                One profile.
                <span className="block text-slate-400">
                  Your whole journey.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
                Connect a supported game account and keep your competitive
                identity, statistics, results and improvement history
                together.
              </p>

              <div className="mt-8 space-y-4">
                <Bullet text="Competitive player profile" />
                <Bullet text="Statistics and tournament results" />
                <Bullet text="Match and improvement history" />
                <Bullet text="Personalised development objectives" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-blue-100/40 blur-3xl" />

              <div className="relative rounded-[28px] border border-slate-200 bg-[#f8fafc] p-4 shadow-2xl shadow-slate-200/50 sm:p-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">
                      M
                    </div>

                    <div>
                      <p className="font-black">Competitive profile</p>

                      <p className="mt-1 text-xs text-slate-400">
                        Connected account
                      </p>
                    </div>

                    <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-600">
                      ✓
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <ProfileStat
                      label="PR"
                      value="11,410"
                    />

                    <ProfileStat
                      label="K/D"
                      value="3.42"
                    />

                    <ProfileStat
                      label="Region"
                      value="EU"
                    />

                    <ProfileStat
                      label="Matches"
                      value="127"
                    />
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-950 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Current focus
                        </p>

                        <p className="mt-1 text-sm font-bold text-white">
                          Rotation consistency
                        </p>
                      </div>

                      <span className="text-sm font-black text-blue-400">
                        63%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRICING
      ========================================================= */}
      <section
        id="pricing"
        className="border-y border-slate-200 bg-[#f7f9fc]"
      >
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Pricing
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Start free.
              <span className="block text-slate-400">
                Improve further when you're ready.
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Build your competitive foundation without committing to a
              subscription.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
            <PricingCard
              name="Free"
              price="£0"
              description="Everything you need to start building your competitive profile."
              features={[
                "Competitive profile",
                "Match history",
                "Core statistics",
                "Basic training objectives",
              ]}
              button="Create free account"
              href="/signup"
            />

            <PricingCard
              name="Pro"
              price="Coming soon"
              description="Advanced tools for players serious about long-term improvement."
              features={[
                "Advanced replay analysis",
                "Deeper weakness detection",
                "Personalised training",
                "Advanced progress tracking",
              ]}
              button="Join CompMind"
              href="/signup"
              featured
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT / APPLICATION INFORMATION
      ========================================================= */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:py-24">
          <div className="rounded-[28px] border border-slate-200 bg-[#f8fafc] p-7 sm:p-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                  About CompMind
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl">
                  Competitive improvement, in one place.
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                  CompMind is an independent software platform designed
                  to help competitive Fortnite players analyse gameplay,
                  identify weaknesses and improve through personalised
                  training and performance insights.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Application
                </p>

                <p className="mt-1 font-black">
                  CompMind
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Website
                </p>

                <p className="mt-2 text-sm font-bold text-slate-800">
                  compmind.xyz
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Contact
                </p>

                <a
                  href="mailto:evanridley1008@gmail.com"
                  className="mt-2 block break-all text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  evanridley1008@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
              <p className="text-xs leading-6 text-slate-500">
                CompMind is an independent service and is not affiliated
                with, sponsored by, or endorsed by Epic Games. References
                to third-party games and services are used only to
                describe compatibility and functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-6 lg:py-28">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-xl shadow-blue-600/20">
            C
          </div>

          <h2 className="mt-7 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Stop guessing what to fix.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Build a better understanding of your gameplay and turn it
            into your next competitive advantage.
          </p>

          <Link
            href="/signup"
            className="mt-9 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Start with CompMind
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-6">
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white">
                    C
                  </div>

                  <span className="text-sm font-black text-white">
                    COMPMIND
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-600">
                  Competitive improvement, built for players.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
                <a
                  href="#features"
                  className="transition hover:text-white"
                >
                  Features
                </a>

                <a
                  href="#pricing"
                  className="transition hover:text-white"
                >
                  Pricing
                </a>

                <a
                  href="#about"
                  className="transition hover:text-white"
                >
                  About
                </a>

                <Link
                  href="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy
                </Link>

                <Link
                  href="/login"
                  className="transition hover:text-white"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="transition hover:text-white"
                >
                  Sign up
                </Link>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-900 pt-5">
              <p className="text-[11px] leading-5 text-slate-700">
                © {new Date().getFullYear()} CompMind. All rights
                reserved. CompMind is an independent service and is not
                affiliated with, sponsored by, or endorsed by Epic Games.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ===============================================================
   COMPONENTS
=============================================================== */

function DashboardStat({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-semibold text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-xl font-black tracking-tight">
          {value}
        </p>

        <span className="text-[10px] font-black text-emerald-600">
          {positive}
        </span>
      </div>
    </div>
  );
}

function TinyRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-slate-600">{value}</span>
    </div>
  );
}

function TrustItem({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3 px-3 py-5">
      <span className="text-[10px] font-black text-blue-600">
        {number}
      </span>

      <span className="text-xs font-bold text-slate-500">
        {text}
      </span>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-[#f8fafc] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-blue-600 shadow-sm ring-1 ring-slate-200 transition group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
          {number}
        </span>

        <span className="text-xl text-slate-200 transition group-hover:text-blue-200">
          ↗
        </span>
      </div>

      <h3 className="mt-8 text-xl font-black tracking-tight">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function ProcessCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-black tracking-[-0.05em] text-slate-200">
          {number}
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
          →
        </span>
      </div>

      <h3 className="mt-8 text-xl font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function ProcessPill({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 text-center">
      <p className="text-sm font-black">{title}</p>

      <p className="mt-1 text-xs text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden text-center text-xl font-black text-slate-300 md:block">
      →
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-emerald-600">
        ✓
      </span>

      <span className="text-sm font-semibold text-slate-700">
        {text}
      </span>
    </div>
  );
}

function ProfileStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-black">
        {value}
      </p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  button,
  href,
  featured = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl border bg-white p-7 shadow-sm sm:p-8 ${
        featured
          ? "border-blue-200 shadow-xl shadow-blue-100/40"
          : "border-slate-200"
      }`}
    >
      {featured && (
        <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
          Coming soon
        </div>
      )}

      <p className="text-sm font-black text-slate-500">
        {name}
      </p>

      <div className="mt-4">
        <span className="text-3xl font-black tracking-tight">
          {price}
        </span>
      </div>

      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-7 space-y-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[10px] font-black text-blue-600">
              ✓
            </span>

            <span className="text-sm font-semibold text-slate-700">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={href}
        className={`mt-8 block rounded-xl px-5 py-3.5 text-center text-sm font-black transition ${
          featured
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
            : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        {button}
      </Link>
    </div>
  );
}