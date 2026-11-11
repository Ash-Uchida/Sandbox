export type LinterIssue = {
  id: string;
  severity: "error" | "warning";
  sectionLabel: string;
  title: string;
  summary: string;
  contextTitle: string;
  contextExcerpt: string;
  matchPatterns: RegExp[];
};

export const LINTER_ISSUES: LinterIssue[] = [
  {
    id: "high-risk",
    severity: "error",
    sectionLabel: "Section 4.2 • Regulatory Compliance",
    title: "Overturned case cited in Section 4",
    summary:
      "The document cites Smith v. Global Logistics Corp. which was overturned by the Supreme Court in Q3 2023. Continuing to reference this precedent may invalidate the liability protections in this agreement.",
    contextTitle: "Section 4.2 — Limitation of Liability",
    contextExcerpt:
      "4.2 LIMITATION OF LIABILITY. Neither Landlord nor Tenant shall be liable for any consequential, indirect, special, punitive, or exemplary damages. In no event shall Landlord's liability under this Lease exceed the total amount of rent paid by Tenant during the preceding twelve (12) month period.",
    matchPatterns: [
      /4\.2/i,
      /limitation of liability/i,
      /smith v\./i,
      /section 4\b/i,
    ],
  },
  {
    id: "indemnity",
    severity: "warning",
    sectionLabel: "Section 12 • Indemnity",
    title: "Indemnity clause violates state law",
    summary:
      "The broad indemnification language provided may be unenforceable under California Civil Code Section 2782. Suggesting narrowing the scope to negligent acts or omissions.",
    contextTitle: "Section 12 — Indemnity",
    contextExcerpt:
      "12.1 Provider shall indemnify, defend, and hold harmless Client from any and all claims, damages, losses, and expenses arising out of or relating to the services performed under this Agreement, regardless of whether such claims arise from the negligence of Client or any third party.",
    matchPatterns: [/indemnif/i, /section 12/i, /section 6\.3/i, /hold harmless/i],
  },
  {
    id: "jurisdiction",
    severity: "warning",
    sectionLabel: "Section 18 • Dispute Resolution",
    title: "Ambiguous jurisdiction reference",
    summary:
      'The clause mentions "local courts" without specifying a particular city, county, or state. This ambiguity often leads to forum selection disputes.',
    contextTitle: "Section 18 — Dispute Resolution",
    contextExcerpt:
      "18.3 Any dispute arising under this Agreement shall be resolved exclusively in the local courts having jurisdiction over the parties, and each party submits to the personal jurisdiction of such courts.",
    matchPatterns: [
      /local courts/i,
      /section 18/i,
      /dispute resolution/i,
      /dispute venue/i,
    ],
  },
];

export function getLinterIssue(issueId: string | null | undefined): LinterIssue | null {
  if (!issueId) {
    return null;
  }
  return LINTER_ISSUES.find((issue) => issue.id === issueId) ?? null;
}

export function paragraphMatchesIssue(paragraph: string, issue: LinterIssue): boolean {
  return issue.matchPatterns.some((pattern) => pattern.test(paragraph));
}

export function findFirstMatchingParagraphIndex(
  paragraphs: string[],
  issue: LinterIssue,
): number {
  return paragraphs.findIndex((paragraph) =>
    paragraphMatchesIssue(paragraph, issue),
  );
}

/** Split uploaded plain text into matchable blocks (paragraphs or lines). */
export function splitDocumentParagraphs(documentText: string): string[] {
  const blocks = documentText
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length > 1) {
    return blocks;
  }

  return documentText
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
