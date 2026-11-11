"use client";

import { useEffect, useState } from "react";

type AiStatus = {
  connected: boolean;
  model: string;
  hasModel?: boolean;
  url: string;
};

export default function SettingsAiPanel() {
  const [status, setStatus] = useState<AiStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        const response = await fetch("/api/settings/ai-status");
        const data = await response.json();
        if (!cancelled) {
          setStatus(data);
        }
      } catch {
        if (!cancelled) {
          setStatus({
            connected: false,
            model: "llama3.2",
            url: "http://127.0.0.1:11434",
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  const indicator = loading
    ? "Checking…"
    : status?.connected && status.hasModel
      ? "Connected"
      : status?.connected
        ? "Running (model not pulled)"
        : "Offline";

  const indicatorColor =
    status?.connected && status.hasModel
      ? "bg-emerald-500"
      : status?.connected
        ? "bg-amber-500"
        : "bg-outline-variant";

  return (
    <div className="space-y-md">
      <div className="flex items-center justify-between rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 dark:border-outline-variant/40 dark:bg-surface-container-low">
        <div>
          <p className="text-sm font-semibold text-on-surface dark:text-surface-bright">
            Ollama (local AI)
          </p>
          <p className="text-body-sm text-on-surface-variant dark:text-surface-variant">
            Powers the site guide and document editor chat.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${indicatorColor}`} />
          <span className="text-xs font-semibold text-on-surface-variant dark:text-surface-variant">
            {indicator}
          </span>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-md text-body-md sm:grid-cols-2">
        <div>
          <dt className="font-label-md text-on-surface-variant dark:text-surface-variant">
            Model
          </dt>
          <dd className="text-on-surface dark:text-surface-bright">
            {status?.model ?? "llama3.2"}
          </dd>
        </div>
        <div>
          <dt className="font-label-md text-on-surface-variant dark:text-surface-variant">
            Endpoint
          </dt>
          <dd className="break-all font-code-sm text-on-surface dark:text-surface-bright">
            {status?.url ?? "—"}
          </dd>
        </div>
      </dl>

      <p className="text-body-sm leading-relaxed text-on-surface-variant dark:text-surface-variant">
        Install the{" "}
        <a
          href="https://ollama.com"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          Ollama app
        </a>{" "}
        to run AI locally. Pull the model once with{" "}
        <code className="rounded bg-surface-container-low px-1 py-0.5 text-xs dark:bg-surface-container-high">
          ollama pull {status?.model ?? "llama3.2"}
        </code>
        . When Ollama is offline, BriefcaseOS uses built-in fallback answers.
      </p>
    </div>
  );
}
