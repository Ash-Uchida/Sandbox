"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardInsight() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="lg:col-span-3 bg-inverse-surface text-surface p-lg rounded-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-sm text-tertiary-fixed mb-md">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-label-md">AI LEGAL INSIGHT</span>
        </div>
        <h4 className="font-headline-md text-headline-md mb-sm">
          Unusual Liability Clause Detected
        </h4>
        <p className="text-surface-variant font-body-md opacity-90">
          The limitation of liability in &apos;Project Alpha&apos; exceeds standard
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
          className="border border-outline-variant text-surface px-md py-sm rounded font-label-md"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
