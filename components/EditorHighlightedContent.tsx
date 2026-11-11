"use client";

import { useEffect } from "react";
import {
  findFirstMatchingParagraphIndex,
  getLinterIssue,
  paragraphMatchesIssue,
  splitDocumentParagraphs,
} from "@/lib/linter/issues";

type Props = {
  title: string;
  fileName?: string | null;
  documentText: string;
  issueId?: string | null;
};

export default function EditorHighlightedContent({
  title,
  fileName,
  documentText,
  issueId,
}: Props) {
  const issue = getLinterIssue(issueId);
  const paragraphs = splitDocumentParagraphs(documentText);

  const firstHighlightIndex = issue
    ? findFirstMatchingParagraphIndex(paragraphs, issue)
    : -1;

  useEffect(() => {
    if (!issue || firstHighlightIndex < 0) {
      return;
    }
    const element = document.getElementById("linter-highlight");
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [issue, firstHighlightIndex]);

  return (
    <div className="space-y-md font-body-md leading-[1.6] text-[#333333] dark:text-surface-bright">
      <div className="border-b border-outline-variant/20 pb-md dark:border-outline-variant/40">
        <h2 className="font-headline-sm text-center uppercase underline">
          {title}
        </h2>
        {fileName ? (
          <p className="mt-2 text-center text-xs text-on-surface-variant dark:text-surface-variant">
            Source file: {fileName}
          </p>
        ) : null}
      </div>

      {issue ? (
        <div
          className={`rounded-lg border px-md py-sm ${
            issue.severity === "error"
              ? "border-error/40 bg-error/10"
              : "border-tertiary-container/40 bg-tertiary-container/10"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant dark:text-surface-variant">
            Linter flagged — {issue.sectionLabel}
          </p>
          <p className="mt-1 text-sm font-semibold text-on-surface dark:text-surface-bright">
            {issue.title}
          </p>
          <p className="mt-1 text-sm text-on-surface-variant dark:text-surface-variant">
            {issue.summary}
          </p>
          {firstHighlightIndex < 0 ? (
            <p className="mt-2 text-xs text-on-surface-variant dark:text-surface-variant">
              No exact clause match found in this file — review the full document
              below.
            </p>
          ) : null}
        </div>
      ) : null}

      {paragraphs.map((paragraph, index) => {
        const highlighted = issue ? paragraphMatchesIssue(paragraph, issue) : false;
        const isPrimary = index === firstHighlightIndex;

        if (!highlighted) {
          return (
            <p key={`${index}-${paragraph.slice(0, 32)}`} className="whitespace-pre-wrap">
              {paragraph}
            </p>
          );
        }

        return (
          <div
            key={`${index}-${paragraph.slice(0, 32)}`}
            id={isPrimary ? "linter-highlight" : undefined}
            className="relative -mx-md scroll-mt-24 rounded-lg border-2 border-primary bg-primary/5 p-md dark:border-primary dark:bg-primary/10"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">
                flag
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                {issue?.sectionLabel}
              </span>
            </div>
            <p className="whitespace-pre-wrap">{paragraph}</p>
          </div>
        );
      })}
    </div>
  );
}
