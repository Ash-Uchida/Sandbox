"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "briefcase-workspace";

type Prefs = {
  compactTables: boolean;
  openLastContract: boolean;
};

const DEFAULTS: Prefs = {
  compactTables: false,
  openLastContract: true,
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

export default function WorkspaceSettings() {
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
        label="Compact contract tables"
        description="Use tighter row spacing on the dashboard."
        checked={prefs.compactTables}
        onChange={(value) => update("compactTables", value)}
      />
      <SettingsToggle
        label="Remember last contract"
        description="Reopen the most recent contract when returning to the editor."
        checked={prefs.openLastContract}
        onChange={(value) => update("openLastContract", value)}
      />
    </div>
  );
}
