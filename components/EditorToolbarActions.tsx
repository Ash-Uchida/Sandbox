"use client";

import { ActionFeedbackButton } from "@/components/Toast";

export default function EditorToolbarActions() {
  return (
    <div className="flex items-center gap-md">
      <ActionFeedbackButton
        feedback="Share link copied to clipboard."
        className="flex items-center gap-xs px-md py-sm font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors duration-200"
        onClick={() => {
          void navigator.clipboard?.writeText(window.location.href);
        }}
      >
        <span className="material-symbols-outlined text-[18px]">share</span>
        Share
      </ActionFeedbackButton>
      <ActionFeedbackButton
        feedback="PDF export will be available in a future release."
        className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md text-label-md hover:opacity-90 transition-all"
      >
        Export PDF
      </ActionFeedbackButton>
    </div>
  );
}
