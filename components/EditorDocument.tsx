"use client";

import { useEffect } from "react";
import type { SampleDocument } from "@/lib/editor/sample-document";
import {
  findFirstMatchingParagraphIndex,
  getLinterIssue,
  paragraphMatchesIssue,
} from "@/lib/linter/issues";

type Props = {
  document: SampleDocument;
  issueId?: string | null;
};

function sampleToParagraphs(document: SampleDocument): string[] {
  return document.sections.flatMap((section) => [
    section.title,
    ...section.paragraphs,
  ]);
}

export default function EditorDocument({ document: sampleDocument, issueId }: Props) {
  const issue = getLinterIssue(issueId);
  const flatParagraphs = sampleToParagraphs(sampleDocument);
  const firstHighlightIndex =
    issue && flatParagraphs.length > 0
      ? findFirstMatchingParagraphIndex(flatParagraphs, issue)
      : -1;

  useEffect(() => {
    if (!issue || firstHighlightIndex < 0) {
      return;
    }
    document.getElementById("linter-highlight")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [issue, firstHighlightIndex]);

  return (
    <div className="space-y-md text-[#333333] font-body-md leading-[1.6] dark:text-surface-bright">
      {issue ? (
        <div
          className={`rounded-lg border px-md py-sm ${
            issue.severity === "error"
              ? "border-error/40 bg-error/10"
              : "border-tertiary-container/40 bg-tertiary-container/10"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
            Linter flagged — {issue.sectionLabel}
          </p>
          <p className="mt-1 text-sm font-semibold">{issue.title}</p>
          <p className="mt-1 text-sm text-on-surface-variant">{issue.summary}</p>
          {firstHighlightIndex < 0 ? (
            <p className="mt-2 text-xs text-on-surface-variant">
              No exact clause match found in this document — review the full text below.
            </p>
          ) : null}
        </div>
      ) : null}

      <h2 className="font-headline-sm text-center mb-xl underline uppercase">
        {sampleDocument.heading}
      </h2>
      {sampleDocument.sections.map((section) => (
        <div key={section.title} className="space-y-md">
          <p>
            <span className="font-bold">{section.title}</span>
          </p>
          {section.paragraphs.map((paragraph, index) => {
            const highlighted =
              issue && paragraphMatchesIssue(paragraph, issue)
                ? true
                : !issue && section.highlightIndex === index;
            if (!highlighted) {
              return <p key={paragraph.slice(0, 24)}>{paragraph}</p>;
            }

            const isPrimary =
              issue &&
              flatParagraphs.indexOf(paragraph) === firstHighlightIndex;

            return (
              <div
                key={paragraph.slice(0, 24)}
                id={isPrimary ? "linter-highlight" : undefined}
                className="relative -mx-md scroll-mt-24 rounded-lg border-2 border-primary bg-primary/5 p-md dark:border-primary dark:bg-primary/10"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    flag
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide text-primary">
                    {issue?.sectionLabel ?? "AI flagged for review"}
                  </span>
                </div>
                <p>{paragraph}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
