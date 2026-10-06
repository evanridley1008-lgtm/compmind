import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | CompMind",
  description: "CompMind Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
              CM
            </div>

            <span className="text-xl font-bold">CompMind</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            Back to CompMind
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-600">
            Legal & Privacy
          </p>

          <h1 className="text-5xl font-black tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            This Privacy Policy explains how CompMind collects, uses,
            stores, and protects information when you use our website
            and services.
          </p>

          <p className="mt-4 text-sm text-slate-400">
            Last updated: 6 October 2026
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">

          <Section title="1. About CompMind">
            <p>
              CompMind ("CompMind", "we", "us", or "our") operates
              compmind.xyz and provides competitive gaming analytics,
              performance tracking, training, and related services.
            </p>

            <p>
              This Privacy Policy explains how information may be
              collected and processed when you use CompMind.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>
              Depending on how you use CompMind, we may collect different
              types of information.
            </p>

            <h3>Account Information</h3>

            <ul>
              <li>Name or display name</li>
              <li>Email address</li>
              <li>Authentication information</li>
              <li>Account preferences</li>
              <li>Subscription information</li>
              <li>Referral or promotional information</li>
            </ul>

            <h3>Gaming and Performance Information</h3>

            <ul>
              <li>Player or account identifiers</li>
              <li>Match information</li>
              <li>Tournament information</li>
              <li>Placements and eliminations</li>
              <li>Gameplay statistics</li>
              <li>Performance statistics</li>
              <li>Uploaded replay files</li>
              <li>Gameplay analysis information</li>
              <li>Training and improvement information</li>
            </ul>

            <h3>Technical Information</h3>

            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Website usage information</li>
              <li>Error and diagnostic information</li>
            </ul>
          </Section>

          <Section title="3. How We Use Information">
            <p>
              We may use information collected through CompMind to:
            </p>

            <ul>
              <li>Create and maintain user accounts</li>
              <li>Provide CompMind features and services</li>
              <li>Analyse gameplay and performance</li>
              <li>Provide personalised training recommendations</li>
              <li>Track player improvement</li>
              <li>Display statistics and performance history</li>
              <li>Process subscriptions and payments</li>
              <li>Provide customer support</li>
              <li>Improve and develop our services</li>
              <li>Detect abuse, fraud, or security problems</li>
              <li>Maintain service security and reliability</li>
              <li>Communicate with users about their accounts</li>
              <li>Comply with applicable legal requirements</li>
            </ul>
          </Section>

          <Section title="4. Gameplay and Uploaded Data">
            <p>
              Certain CompMind features may allow users to upload
              gameplay files or provide gameplay-related information
              for analysis.
            </p>

            <p>
              Information submitted for analysis may be processed by
              CompMind systems and, where necessary to provide requested
              functionality, by service providers acting on our behalf.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>
              CompMind may use third-party providers to support services
              such as authentication, hosting, databases, analytics,
              payment processing, email delivery, security, and data
              processing.
            </p>

            <div className="my-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="font-bold text-blue-950">
                Independent service
              </p>

              <p className="mt-2 text-blue-900">
                CompMind is an independent service and is not affiliated
                with, sponsored by, or endorsed by third-party game
                publishers or developers unless explicitly stated otherwise.
              </p>
            </div>
          </Section>

          <Section title="6. Cookies">
            <p>
              CompMind may use cookies and similar technologies to support
              website functionality, maintain sessions, remember
              preferences, understand website usage, and improve security.
            </p>
          </Section>

          <Section title="7. Payments and Subscriptions">
            <p>
              If you purchase a CompMind subscription or another paid
              service, payment information may be processed by a
              third-party payment provider.
            </p>

            <p>
              Where payment processing is handled by a third-party
              provider, CompMind does not need to store complete payment
              card details.
            </p>
          </Section>

          <Section title="8. Data Security">
            <p>
              We take reasonable technical and organisational measures
              designed to protect information against unauthorised access,
              alteration, disclosure, or destruction.
            </p>

            <p>
              However, no internet-based service can guarantee complete
              security.
            </p>
          </Section>

          <Section title="9. Data Retention">
            <p>
              We may retain personal information for as long as reasonably
              necessary to provide our services, maintain accounts, comply
              with legal obligations, resolve disputes, enforce agreements,
              and protect our legitimate interests.
            </p>
          </Section>

          <Section title="10. Your Rights">
            <p>
              Depending on your location and applicable law, you may have
              rights regarding your personal information, including:
            </p>

            <ul>
              <li>Accessing personal information</li>
              <li>Correcting inaccurate information</li>
              <li>Requesting deletion of information</li>
              <li>Requesting restriction of certain processing</li>
              <li>Objecting to certain processing</li>
              <li>Requesting a copy of certain information</li>
              <li>Withdrawing consent where applicable</li>
            </ul>
          </Section>

          <Section title="11. Children's Privacy">
            <p>
              CompMind does not knowingly collect personal information
              from children where doing so would be prohibited by
              applicable law.
            </p>
          </Section>

          <Section title="12. Third-Party Websites">
            <p>
              CompMind may contain links to third-party websites or
              services. We are not responsible for the privacy practices,
              content, or security of third-party websites.
            </p>
          </Section>

          <Section title="13. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to
              reflect changes to CompMind, our services, or applicable
              legal requirements.
            </p>
          </Section>

          <Section title="14. Contact">
            <p>
              If you have questions about this Privacy Policy or
              CompMind&apos;s privacy practices, you can contact us.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-950 p-6 text-white">
              <p className="font-bold">CompMind</p>

              <p className="mt-2 text-slate-300">
                Email:{" "}
                <a
                  href="mailto:evanridley1008@gmail.com"
                  className="underline"
                >
                  evanridley1008@gmail.com
                </a>
              </p>

              <p className="text-slate-300">
                Website:{" "}
                <a
                  href="https://compmind.xyz"
                  className="underline"
                >
                  compmind.xyz
                </a>
              </p>
            </div>
          </Section>

          <Section title="15. Independent Service Disclaimer">
            <p>
              CompMind is an independent competitive gaming analytics
              and training service.
            </p>

            <p>
              References to games, platforms, publishers, developers,
              tournaments, or other third-party services are used only
              where necessary to describe functionality or identify
              compatible services.
            </p>

            <p>
              Such references do not imply ownership, sponsorship,
              partnership, affiliation, or endorsement unless explicitly
              stated.
            </p>
          </Section>

        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-slate-500">
          © 2026 CompMind. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 last:mb-0">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">
        {title}
      </h2>

      <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}