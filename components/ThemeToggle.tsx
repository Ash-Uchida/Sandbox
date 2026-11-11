"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex w-full items-center justify-between rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-left dark:border-outline-variant/50 dark:bg-surface-container-low"
    >
      <span className="text-sm font-semibold text-on-surface dark:text-surface-bright">
        Dark mode
      </span>
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${
          theme === "dark" ? "bg-primary" : "bg-outline-variant/40"
        }`}
        aria-hidden="true"
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            theme === "dark" ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
