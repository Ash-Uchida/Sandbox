import { EDITOR_DOCUMENT_EXCERPT } from "@/lib/editor/context";

const MAX_EXCERPT_CHARS = 6_000;

export function buildDocumentExcerpt(
  documentText: string | null | undefined,
): string {
  if (!documentText?.trim()) {
    return EDITOR_DOCUMENT_EXCERPT;
  }

  const trimmed = documentText.trim();
  if (trimmed.length <= MAX_EXCERPT_CHARS) {
    return trimmed;
  }

  return `${trimmed.slice(0, MAX_EXCERPT_CHARS)}\n\n...[document truncated for AI context]`;
}
