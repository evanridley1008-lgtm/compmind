import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-[#101828]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20">
              C
            </div>

            <span className="text-xl font-bold tracking-tight">
              COMPMIND
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-blue-600">
              Features
            </a>

            <a href="#how-it-works" className="transition hover:text-blue-600">
              How it works
            </a>

            <a href="#about" className="transition hover:text-blue-600">
              About
            </a>

            <a href="#pricing" className="transition hover:text-blue-600">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:pb-32 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Built for competitive Fortnite
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Stop guessing.
              <span className="block text-blue-600">
                Start improving.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              CompMind analyses your competitive gameplay, finds the
              patterns holding you back and turns them into a clear
              training plan.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-2xl bg-blue-600 px-7 py-4 text-center text-base font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Start improving
              </Link>

              <a
                href="#how-it-works"
                className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-center text-base font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600"
              >
                See how it works
              </a>
            </div>

            <p className="mt-5 text-xs font-medium text-slate-400">
              Connect a supported game account and build your competitive
              profile.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mx-auto mt-20 max-w-6xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-300/40">
              <div className="rounded-2xl bg-[#f8fafc] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Player Dashboard
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Welcome back, MŸKO
                    </h2>
                  </div>

                  <div className="hidden rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 sm:block">
                    EU · PRO
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Stat
                    label="CompMind Rating"
                    value="11,410"
                    change="+8.4%"
                  />

                  <Stat
                    label="K/D"
                    value="3.42"
                    change="+12.1%"
                  />

                  <Stat
                    label="Avg. Placement"
                    value="#18.4"
                    change="-6.2%"
                  />

                  <Stat
                    label="Games Analysed"
                    value="127"
                    change="+24"
                  />
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          Performance
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          Improvement over time
                        </p>
                      </div>

                      <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                        +18.7%
                      </span>
                    </div>

                    <div className="mt-8 flex h-40 items-end gap-2">
                      {[32, 42, 38, 55, 51, 67, 62, 74, 69, 82, 78, 94].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-lg bg-blue-500/80 transition hover:bg-blue-600"
                            style={{ height: `${height}%` }}
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-sm text-slate-500">
                      Current focus
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      Rotations
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Your analysis shows that earlier rotation decisions
                      are currently limiting your endgame consistency.
                    </p>

                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[63%] rounded-full bg-blue-500" />
                    </div>

                    <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
                      <span>Current level</span>
                      <span>63 / 100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              One competitive system
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Everything you need to improve.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              CompMind connects your competitive data, gameplay analysis
              and training into one continuous improvement system.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              number="01"
              title="Replay Analysis"
              description="Upload your gameplay and break down the decisions, fights and rotations that actually matter."
            />

            <Feature
              number="02"
              title="Find Your Weaknesses"
              description="Identify recurring patterns across your matches instead of judging yourself from one bad game."
            />

            <Feature
              number="03"
              title="Personalised Training"
              description="Turn your weaknesses into specific training objectives built around what you actually need."
            />

            <Feature
              number="04"
              title="Track Improvement"
              description="Measure whether your mechanics, fighting, positioning and endgame performance are improving."
            />

            <Feature
              number="05"
              title="Competitive Profile"
              description="Keep your Fortnite statistics, results, achievements and competitive history in one place."
            />

            <Feature
              number="06"
              title="Compete"
              description="Enter CompMind tournaments, track results and compare your performance against other players."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-slate-200 bg-[#f7faff]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              The CompMind system
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Play. Analyse. Improve.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
              CompMind creates a continuous feedback loop between what you
              play, what you do wrong and what you practise next.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-5">
            {[
              ["01", "CONNECT", "Connect your supported game account."],
              ["02", "PLAY", "Play your matches normally."],
              ["03", "ANALYSE", "Understand what actually happened."],
              ["04", "TRAIN", "Work directly on your weaknesses."],
              ["05", "IMPROVE", "Measure the difference over time."],
            ].map(([number, title, description]) => (
              <div key={number} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 font-black text-white shadow-lg shadow-blue-600/20">
                  {number}
                </div>

                <h3 className="mt-5 font-black">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid items-center gap-6 sm:grid-cols-5">
              <FlowStep
                title="Gameplay"
                description="Your matches"
              />

              <FlowArrow />

              <FlowStep
                title="Analysis"
                description="Find patterns"
              />

              <FlowArrow />

              <FlowStep
                title="Training"
                description="Fix weaknesses"
              />
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm font-semibold text-slate-600">
                Then the cycle repeats — with better data every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Account connection */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Your competitive identity
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Connect once.
                <span className="block text-blue-600">
                  Build your profile automatically.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-500">
                Connect your supported game account to CompMind and build
                a competitive profile around the player you actually use.
              </p>

              <div className="mt-8 space-y-4">
                <Check text="Competitive player profile" />
                <Check text="Competitive statistics and results" />
                <Check text="One profile for your improvement history" />
              </div>

              <Link
                href="/signup"
                className="mt-9 inline-flex rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Create your account
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm sm:p-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white">
                    M
                  </div>

                  <div>
                    <p className="text-lg font-bold text-slate-950">
                      MŸKO
                    </p>

                    <p className="text-sm text-slate-500">
                      Game account · Connected
                    </p>
                  </div>

                  <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Connected
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MiniStat label="Region" value="EU" />
                  <MiniStat label="Rating" value="11,410" />
                  <MiniStat label="K/D" value="3.42" />
                  <MiniStat label="Analysed" value="127" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="border-t border-slate-200 bg-[#f7faff]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Simple plans
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Start free. Go further when you're ready.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Build your competitive profile for free, then unlock deeper
              analysis and advanced improvement tools with Pro.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <PricingCard
              name="Free"
              price="£0"
              description="Build your competitive foundation."
              features={[
                "Competitive profile",
                "Match history",
                "Basic statistics",
                "Training objectives",
              ]}
              button="Get started"
              href="/signup"
            />

            <PricingCard
              name="Pro"
              price="Coming soon"
              description="For players serious about improving."
              features={[
                "Advanced replay analysis",
                "AI-powered weaknesses",
                "Personalised training",
                "Advanced progress tracking",
              ]}
              button="Learn more"
              href="/signup"
              featured
            />
          </div>
        </div>
      </section>

      {/* About / Publisher */}
      <section
        id="about"
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-8 shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              About CompMind
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              A competitive improvement platform built for players.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              CompMind is an independent software platform designed to
              help competitive Fortnite players analyse gameplay,
              identify weaknesses and improve through personalised
              training and performance insights.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <InfoCard
                label="Application"
                value="CompMind"
              />

              <InfoCard
                label="Publisher"
                value="Evan Ridley"
              />

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Contact
                </p>

                <a
                  href="mailto:evanridley1008@gmail.com"
                  className="mt-2 block break-all font-bold text-blue-600 transition hover:text-blue-700"
                >
                  evanridley1008@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Website
              </p>

              <p className="mt-2 font-bold text-slate-950">
                https://compmind.xyz
              </p>
            </div>

            <p className="mt-8 text-sm leading-6 text-slate-500">
              CompMind is an independent service and is not affiliated
              with, sponsored by, or endorsed by Epic Games. References
              to third-party games and services are used only where
              necessary to describe compatibility and functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Your next level starts with knowing what to fix.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Stop relying on guesswork. Start building a competitive
            improvement system.
          </p>

          <Link
            href="/signup"
            className="mt-9 inline-flex rounded-2xl bg-white px-8 py-4 font-bold text-blue-600 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Get started with CompMind
          </Link>

          <p className="mt-4 text-sm text-blue-100">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-white underline underline-offset-4"
              >
              Log in
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">
                  C
                </div>

                <div className="text-lg font-black text-white">
                  COMPMIND
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Competitive gameplay analysis and improvement tools for
                Fortnite players.
              </p>

              <p className="mt-5 text-sm font-semibold text-slate-400">
                Operated by Evan Ridley
              </p>

              <a
                href="mailto:evanridley1008@gmail.com"
                className="mt-1 block text-sm text-slate-500 transition hover:text-white"
              >
                evanridley1008@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap gap-x-7 gap-y-4 text-sm text-slate-400">
              <a
                href="#features"
                className="transition hover:text-white"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="transition hover:text-white"
              >
                How it works
              </a>

              <a
                href="#about"
                className="transition hover:text-white"
              >
                About
              </a>

              <a
                href="#pricing"
                className="transition hover:text-white"
              >
                Pricing
              </a>

              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Policy
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

          <div className="mt-10 border-t border-slate-800 pt-6">
            <p className="text-xs leading-5 text-slate-600">
              © {new Date().getFullYear()} CompMind. All rights reserved.
            </p>

            <p className="mt-2 max-w-4xl text-xs leading-5 text-slate-600">
              CompMind is an independent service and is not affiliated
              with, sponsored by, or endorsed by Epic Games.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-2xl font-black">{value}</p>

        <span className="text-xs font-bold text-emerald-600">
          {change}
        </span>
      </div>
    </div>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
        {number}
      </div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function FlowStep({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        ✓
      </div>

      <p className="mt-3 font-bold text-slate-950">{title}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden text-center text-2xl font-bold text-slate-300 sm:block">
      →
    </div>
  );
}

function Check({ text }: { text: string }) {
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

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-bold text-slate-950">
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
      className={`relative rounded-3xl border bg-white p-7 shadow-sm ${
        featured
          ? "border-blue-300 ring-2 ring-blue-100"
          : "border-slate-200"
      }`}
    >
      {featured && (
        <div className="absolute right-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
          Coming soon
        </div>
      )}

      <p className="text-sm font-bold text-slate-500">
        {name}
      </p>

      <p className="mt-3 text-3xl font-black text-slate-950">
        {price}
      </p>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-black text-blue-600">
              ✓
            </span>

            <span className="text-sm font-medium text-slate-700">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={href}
        className={`mt-8 block rounded-2xl px-5 py-3.5 text-center text-sm font-bold transition ${
          featured
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
            : "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600"
        }`}
      >
        {button}
      </Link>
    </div>
  );
}