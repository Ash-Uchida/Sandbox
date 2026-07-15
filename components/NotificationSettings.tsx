"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "briefcase-notifications";

type Prefs = {
  complianceAlerts: boolean;
  renewalReminders: boolean;
  aiInsights: boolean;
};

const DEFAULTS: Prefs = {
  complianceAlerts: true,
  renewalReminders: true,
  aiInsights: true,
};

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULTS;
    }
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function savePrefs(prefs: Prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function SettingsToggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-left dark:border-outline-variant/40 dark:bg-surface-container-low"
    >
      <span>
        <span className="block text-sm font-semibold text-on-surface dark:text-surface-bright">
          {label}
        </span>
        <span className="block text-body-sm text-on-surface-variant dark:text-surface-variant">
          {description}
        </span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-outline-variant/40"
        }`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  function update<K extends keyof Prefs>(key: K, value: Prefs[K]) {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    savePrefs(next);
  }

  return (
    <div className="space-y-sm">
      <SettingsToggle
        label="Compliance alerts"
        description="Notify when the linter finds high-risk issues."
        checked={prefs.complianceAlerts}
        onChange={(value) => update("complianceAlerts", value)}
      />
      <SettingsToggle
        label="Renewal reminders"
        description="Remind you before contract renewal dates."
        checked={prefs.renewalReminders}
        onChange={(value) => update("renewalReminders", value)}
      />
      <SettingsToggle
        label="AI insights"
        description="Show AI-generated portfolio insights on the dashboard."
        checked={prefs.aiInsights}
        onChange={(value) => update("aiInsights", value)}
      />
      <p className="pt-1 text-body-sm text-on-surface-variant dark:text-surface-variant">
        Preferences are saved on this device. Email delivery is coming in a
        future release.
      </p>
    </div>
  );
}

export function readAiInsightsEnabled(): boolean {
  return loadPrefs().aiInsights;
}
