import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CompMind",
  description:
    "Learn how CompMind collects, uses, stores, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:py-24">
        <div className="mb-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            ← Back to CompMind
          </a>

          <div className="mt-10">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              Legal
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-base text-slate-500">
              Last updated: October 5, 2026
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <div className="space-y-10 text-[15px] leading-7 text-slate-600">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                1. Introduction
              </h2>
              <p>
                Welcome to CompMind. CompMind is a competitive gaming
                improvement platform designed to help players analyse their
                gameplay, identify weaknesses, and improve their performance.
              </p>
              <p className="mt-3">
                This Privacy Policy explains what information we may collect,
                how we use it, how we protect it, and the choices you have
                regarding your information when you use CompMind.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                2. Information We Collect
              </h2>

              <p>
                Depending on how you use CompMind, we may collect the following
                categories of information:
              </p>

              <h3 className="mt-5 font-semibold text-slate-900">
                Account information
              </h3>
              <p className="mt-2">
                This may include information such as your name, email address,
                username, account identifiers, and authentication information.
              </p>

              <h3 className="mt-5 font-semibold text-slate-900">
                Gaming information
              </h3>
              <p className="mt-2">
                If you connect a gaming account or use gameplay-related
                features, CompMind may process information associated with that
                account, such as Fortnite player information, match statistics,
                tournament results, placements, eliminations, and other
                gameplay-related information made available to the service.
              </p>

              <h3 className="mt-5 font-semibold text-slate-900">
                Replay and gameplay data
              </h3>
              <p className="mt-2">
                If you upload replay files or other gameplay information,
                CompMind may process that information to provide gameplay
                analysis, identify patterns, and generate personalised
                recommendations.
              </p>

              <h3 className="mt-5 font-semibold text-slate-900">
                Usage information
              </h3>
              <p className="mt-2">
                We may collect information about how you interact with the
                website, including pages visited, features used, device
                information, browser information, approximate location derived
                from technical information, and diagnostic information.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                3. How We Use Information
              </h2>

              <p>We may use information to:</p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Provide and operate CompMind.</li>
                <li>Create and manage user accounts.</li>
                <li>Authenticate users.</li>
                <li>Analyse gameplay and replay data.</li>
                <li>Identify gameplay strengths and weaknesses.</li>
                <li>Generate personalised training recommendations.</li>
                <li>Track player progress and performance.</li>
                <li>Provide tournament and competitive features.</li>
                <li>Process subscriptions and payments.</li>
                <li>Improve the performance and reliability of the service.</li>
                <li>Detect abuse, fraud, or security issues.</li>
                <li>Communicate important service-related information.</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                4. Gameplay and AI Analysis
              </h2>

              <p>
                CompMind may use automated systems, including artificial
                intelligence and machine-learning technologies, to analyse
                gameplay and provide recommendations.
              </p>

              <p className="mt-3">
                Gameplay information may be processed to identify patterns such
                as positioning, rotations, fights, resource management,
                decision-making, endgame performance, and other competitive
                gameplay factors.
              </p>

              <p className="mt-3">
                AI-generated recommendations are intended to assist players
                with improvement and should not be considered professional or
                guaranteed advice.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                5. Epic Games and Fortnite
              </h2>

              <p>
                CompMind may integrate with Epic Games services or use
                information associated with Fortnite accounts where supported
                by the relevant APIs or services.
              </p>

              <p className="mt-3">
                CompMind is an independent service and is not affiliated with,
                endorsed by, or sponsored by Epic Games, Inc. or Fortnite,
                unless explicitly stated otherwise.
              </p>

              <p className="mt-3">
                Any use of Epic Games services is also subject to the
                applicable Epic Games terms and privacy policies.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                6. Cookies and Similar Technologies
              </h2>

              <p>
                CompMind may use cookies, local storage, session technologies,
                and similar technologies to keep users signed in, maintain
                preferences, provide essential functionality, improve security,
                and understand how the service is used.
              </p>

              <p className="mt-3">
                Some third-party services used by CompMind may also use
                cookies or similar technologies in accordance with their own
                privacy policies.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                7. Payments and Subscriptions
              </h2>

              <p>
                If you purchase a CompMind subscription or other paid service,
                payments may be processed by third-party payment providers.
              </p>

              <p className="mt-3">
                CompMind does not need to store your full payment card number
                when payment processing is handled by an external payment
                provider. Payment providers may process payment and billing
                information according to their own privacy policies and terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                8. Third-Party Services
              </h2>

              <p>
                CompMind may use third-party providers for services such as
                hosting, authentication, analytics, databases, payment
                processing, email delivery, artificial intelligence
                processing, security, and other infrastructure.
              </p>

              <p className="mt-3">
                These providers may process information on our behalf when
                required to provide their services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                9. Data Security
              </h2>

              <p>
                We take reasonable technical and organisational measures to
                protect information against unauthorised access, alteration,
                disclosure, or destruction.
              </p>

              <p className="mt-3">
                However, no internet-based service can guarantee absolute
                security, and we cannot guarantee that information will always
                be completely secure.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                10. Data Retention
              </h2>

              <p>
                We retain information for as long as reasonably necessary to
                provide CompMind, maintain accounts, provide requested
                features, meet legal obligations, resolve disputes, enforce
                agreements, and maintain security.
              </p>

              <p className="mt-3">
                Where information is no longer required, we may delete or
                anonymise it where appropriate.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                11. Your Rights
              </h2>

              <p>
                Depending on where you live, you may have rights concerning
                your personal information, including rights to:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Request access to personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of certain information.</li>
                <li>Request restriction of certain processing.</li>
                <li>Object to certain processing.</li>
                <li>Request a copy of certain information.</li>
                <li>Withdraw consent where processing is based on consent.</li>
              </ul>

              <p className="mt-3">
                Some rights may be subject to legal limitations or exceptions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                12. Account and Data Deletion
              </h2>

              <p>
                You may request deletion of your CompMind account and
                associated personal information by contacting us.
              </p>

              <p className="mt-3">
                Certain information may need to be retained where required by
                law, necessary for legitimate business purposes, or required
                to prevent fraud or abuse.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                13. Children's Privacy
              </h2>

              <p>
                CompMind is not intended to knowingly collect personal
                information from children where such collection is prohibited
                by applicable law.
              </p>

              <p className="mt-3">
                If you believe that a child has provided personal information
                to CompMind in circumstances where this should not have
                occurred, please contact us so that we can review the matter
                and take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                14. International Data Transfers
              </h2>

              <p>
                CompMind and its service providers may process information in
                countries other than the country where you live. Where required
                by applicable law, appropriate safeguards will be used for
                international transfers of personal information.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                15. Changes to This Privacy Policy
              </h2>

              <p>
                We may update this Privacy Policy from time to time as CompMind
                develops, new features are introduced, or legal requirements
                change.
              </p>

              <p className="mt-3">
                When changes are made, the updated version will be published on
                this page and the “Last updated” date will be changed.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                16. Contact Us
              </h2>

              <p>
                If you have questions about this Privacy Policy, your personal
                information, or a request relating to your data, you can
                contact CompMind at:
              </p>

              <p className="mt-4">
                <a
                  href="mailto:evanridley1008@gmail.com"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  evanridley1008@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} CompMind. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
