"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type FieldErrors = {
  username?: string;
  email?: string;
  password?: string;
  terms?: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const nextErrors: FieldErrors = {};

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername) {
      nextErrors.username = "Please enter a username.";
    } else if (cleanUsername.length < 3) {
      nextErrors.username = "Username must be at least 3 characters.";
    } else if (cleanUsername.length > 20) {
      nextErrors.username = "Username must be 20 characters or fewer.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      nextErrors.username =
        "Username can only contain letters, numbers and underscores.";
    }

    if (!cleanEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Please enter a password.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      nextErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      nextErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      nextErrors.password = "Password must contain at least one number.";
    }

    if (!termsAccepted) {
      nextErrors.terms = "You must agree to the terms to continue.";
    }

    setErrors(nextErrors);

    return {
      valid: Object.keys(nextErrors).length === 0,
      cleanUsername,
      cleanEmail,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setGeneralError("");

    const validation = validate();

    if (!validation.valid) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: validation.cleanUsername,
          email: validation.cleanEmail,
          password,
          termsAccepted,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field) {
          setErrors({
            [data.field]: data.error || "Please check this field.",
          });
        } else {
          setGeneralError(
            data.error || "Something went wrong while creating your account.",
          );
        }

        return;
      }

      setErrors({});

      /*
       * The signup API now creates the user's session.
       * Send the newly-created user directly into onboarding.
       */
      router.push("/onboarding");
      router.refresh();
    } catch {
      setGeneralError(
        "Unable to connect to CompMind. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20">
                C
              </span>

              <span className="text-lg font-black tracking-tight">
                COMPMIND
              </span>
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold text-blue-600">
                GET STARTED
              </p>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Create your CompMind account.
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Build your profile, analyse your gameplay and start
                improving with a clear plan.
              </p>
            </div>

            {generalError && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold"
                >
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Your username"
                  disabled={submitting}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                {errors.username && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  disabled={submitting}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                {errors.email && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a strong password"
                  disabled={submitting}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <p className="mt-2 text-xs text-slate-400">
                  8+ characters with uppercase, lowercase and a number.
                </p>

                {errors.password && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) =>
                      setTermsAccepted(event.target.checked)
                    }
                    disabled={submitting}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm leading-5 text-slate-500">
                    I agree to the CompMind terms and understand that
                    gameplay analysis is provided for competitive
                    improvement.
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.terms}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating account..." : "Create account"}
              </button>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </section>

        <section className="hidden bg-slate-950 px-12 py-16 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="mx-auto max-w-lg">
            <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              Competitive improvement platform
            </div>

            <h2 className="text-4xl font-black leading-tight">
              Stop guessing.
              <br />
              Start improving.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
              CompMind turns your competitive gameplay into clear,
              actionable improvement.
            </p>

            <div className="mt-10 space-y-4">
              {[
                [
                  "01",
                  "Analyse your gameplay",
                  "Find the decisions and patterns affecting your performance.",
                ],
                [
                  "02",
                  "Find your weaknesses",
                  "Turn repeated mistakes into measurable improvement areas.",
                ],
                [
                  "03",
                  "Train with purpose",
                  "Get focused objectives instead of wasting hours practising randomly.",
                ],
                [
                  "04",
                  "Track your progress",
                  "See whether your gameplay is actually improving over time.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="mb-3 text-xs font-black text-blue-400">
                    {number}
                  </div>

                  <h3 className="font-bold">{title}</h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}