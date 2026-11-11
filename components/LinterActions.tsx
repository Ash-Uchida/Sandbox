"use client";

import Link from "next/link";
import { useState } from "react";
import { ActionFeedbackButton } from "@/components/Toast";

type Props = {
  contextTitle: string;
  contextExcerpt: string;
  editorHref?: string;
};

export default function LinterActions({
  contextTitle,
  contextExcerpt,
  editorHref,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-4">
        <ActionFeedbackButton
          feedback="Auto-fix will be available in a future release."
          className="flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2 text-sm font-semibold text-white shadow-md shadow-primary-container/20 transition-all hover:opacity-90 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">auto_fix_high</span>
          Auto-Fix
        </ActionFeedbackButton>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="rounded px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low dark:text-surface-variant dark:hover:bg-white/10"
        >
          {open ? "Hide Context" : "View Context"}
        </button>
      </div>

      {open ? (
        <div className="mt-md rounded-lg border border-outline-variant/40 bg-surface-container-low p-md dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            {contextTitle}
          </p>
          <p className="text-body-md leading-relaxed text-on-surface dark:text-surface-bright">
            {contextExcerpt}
          </p>
          {editorHref ? (
            <Link
              href={editorHref}
              className="mt-md inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Open in document editor
              <span className="material-symbols-outlined text-[16px]">
                open_in_new
              </span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
