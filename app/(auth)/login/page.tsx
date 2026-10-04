"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIdentifierError("");
    setPasswordError("");
    setGeneralError("");

    let valid = true;

    if (!identifier.trim()) {
      setIdentifierError("Please enter your username or email.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field === "identifier") {
          setIdentifierError(data.error);
        } else if (data.field === "password") {
          setPasswordError(data.error);
        } else {
          setGeneralError(
            data.error || "Unable to sign you in.",
          );
        }

        return;
      }

      router.push("/dashboard");
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
                WELCOME BACK
              </p>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Sign in to CompMind.
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue analysing your gameplay and working towards
                your competitive goals.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {generalError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {generalError}
                </div>
              )}

              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-semibold"
                >
                  Username or email
                </label>

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(event.target.value)
                  }
                  placeholder="Username or email"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                {identifierError && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {identifierError}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Your password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                {passwordError && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </section>

        <section className="hidden bg-slate-950 px-12 py-16 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="mx-auto max-w-lg">
            <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              Your competitive edge
            </div>

            <h2 className="text-4xl font-black leading-tight">
              Know what is
              <br />
              holding you back.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
              CompMind connects your gameplay, analysis and training
              into one competitive improvement system.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                ["01", "Gameplay analysis"],
                ["02", "Weakness detection"],
                ["03", "Personalised training"],
                ["04", "Progress tracking"],
              ].map(([number, title]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="mb-4 text-xs font-black text-blue-400">
                    {number}
                  </div>

                  <p className="font-bold">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

