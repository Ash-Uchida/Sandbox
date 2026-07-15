"use client";

import { ActionFeedbackButton } from "@/components/Toast";

export default function LinterExportButton() {
  return (
    <ActionFeedbackButton
      feedback="PDF export will be available in a future release."
      className="bg-surface-container-low text-primary px-md py-sm rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors border border-outline-variant/30"
    >
      Export PDF
    </ActionFeedbackButton>
  );
}
