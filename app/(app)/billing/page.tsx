"use client";

import { useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import SectionCard from "../../../components/shared/SectionCard";
import StatusBadge from "../../../components/shared/StatusBadge";

const features = [
  "Unlimited gameplay analysis",
  "Advanced performance insights",
  "Personalised training objectives",
  "Detailed tournament tracking",
  "CompMind rating and leaderboard access",
  "Priority AI analysis",
];

export default function BillingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="cm-page">
      <PageHeader
        eyebrow="SUBSCRIPTION"
        title="Billing & Plan"
        description="Manage your CompMind membership and subscription."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <SectionCard
          title="Current Plan"
          description="Your current CompMind subscription."
        >
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-slate-950">Pro</p>
                <p className="mt-1 text-sm text-slate-600">
                  Full competitive improvement access
                </p>
              </div>

              <StatusBadge status="success">Active</StatusBadge>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-500">Monthly price</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">
                £9.99
                <span className="text-base font-medium text-slate-500">
                  {" "}
                  / month
                </span>
              </p>
            </div>

            <div className="mt-6 border-t border-blue-100 pt-5">
              <p className="text-sm text-slate-500">Next billing date</p>
              <p className="mt-1 font-semibold text-slate-950">
                3 November 2026
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="cm-button cm-button-secondary mt-6 w-full"
            >
              Manage Subscription
            </button>
          </div>
        </SectionCard>

        <SectionCard
          title="What's included"
          description="Everything currently available with Pro."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  ✓
                </span>

                <span className="text-sm font-medium text-slate-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="cm-card p-5">
          <p className="text-sm text-slate-500">Analyses this month</p>
          <p className="mt-2 text-2xl font-bold">24</p>
          <p className="mt-1 text-xs text-slate-500">Unlimited on Pro</p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm text-slate-500">Training objectives</p>
          <p className="mt-2 text-2xl font-bold">18</p>
          <p className="mt-1 text-xs text-slate-500">Active and completed</p>
        </div>

        <div className="cm-card p-5">
          <p className="text-sm text-slate-500">Membership since</p>
          <p className="mt-2 text-2xl font-bold">Aug 2026</p>
          <p className="mt-1 text-xs text-slate-500">2 months active</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-950">
              Subscription Management
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Stripe billing will be connected here when the production
              payment system is implemented.
            </p>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="cm-button cm-button-primary mt-6 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}