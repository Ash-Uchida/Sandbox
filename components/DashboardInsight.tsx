"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readAiInsightsEnabled } from "@/components/NotificationSettings";

type Props = {
  contractName?: string | null;
};

export default function DashboardInsight({ contractName }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(readAiInsightsEnabled());
  }, []);

  if (dismissed || !enabled) {
    return null;
  }

  const subject = contractName ?? "your portfolio";

  return (
    <div className="lg:col-span-3 bg-inverse-surface text-inverse-on-surface p-lg rounded-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-sm text-tertiary-fixed mb-md">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-label-md">AI LEGAL INSIGHT</span>
        </div>
        <h4 className="font-headline-md text-headline-md mb-sm">
          Unusual Liability Clause Detected
        </h4>
        <p className="max-w-2xl text-surface-variant font-body-md leading-relaxed opacity-90">
          The limitation of liability in &apos;{subject}&apos; exceeds standard
          industry benchmarks by 20%. Consider renegotiating the indemnity cap.
        </p>
      </div>
      <div className="mt-lg flex gap-md">
        <Link
          href="/linter"
          className="bg-primary-container text-on-primary px-md py-sm rounded font-label-md"
        >
          Review Clause
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="border border-outline-variant text-inverse-on-surface px-md py-sm rounded font-label-md"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
