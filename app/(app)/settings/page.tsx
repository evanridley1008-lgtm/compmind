"use client";

import { useState } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import SectionCard from "../../../components/shared/SectionCard";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className="cm-page">
      <PageHeader
        eyebrow="ACCOUNT"
        title="Settings"
        description="Manage your CompMind account and preferences."
      />

      <div className="mt-6 space-y-6">
        <SectionCard
          title="Profile"
          description="Basic information associated with your account."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Display name
              </span>
              <input className="cm-input" defaultValue="MŸKO" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                className="cm-input"
                type="email"
                defaultValue="player@example.com"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Bio
              </span>
              <textarea
                className="cm-input min-h-28 py-3"
                defaultValue="Competitive Fortnite player focused on improving tournament performance."
              />
            </label>
          </div>

          <button className="cm-button cm-button-primary mt-5">
            Save Profile
          </button>
        </SectionCard>

        <SectionCard
          title="Preferences"
          description="Control how CompMind behaves for you."
        >
          <div className="divide-y divide-slate-100">
            <SettingRow
              title="Notifications"
              description="Receive important analysis and account notifications."
              enabled={notifications}
              onChange={setNotifications}
            />

            <SettingRow
              title="Weekly improvement summary"
              description="Receive a weekly summary of your progress."
              enabled={weeklySummary}
              onChange={setWeeklySummary}
            />

            <SettingRow
              title="Dark theme"
              description="Use the alternative dark CompMind interface."
              enabled={darkTheme}
              onChange={setDarkTheme}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Connected Accounts"
          description="Gaming accounts connected to CompMind."
        >
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-5">
            <div>
              <p className="font-semibold text-slate-950">Epic Games</p>
              <p className="mt-1 text-sm text-slate-500">
                MŸKO · Connected
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Connected
            </span>
          </div>
        </SectionCard>

        <SectionCard
          title="Danger Zone"
          description="Actions that affect your account."
        >
          <button className="cm-button border border-red-200 bg-red-50 text-red-700 hover:bg-red-100">
            Sign Out
          </button>
        </SectionCard>
      </div>
    </div>
  );
}

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}