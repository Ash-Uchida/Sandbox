import { readFileSync } from "node:fs";
import { join } from "node:path";

let cachedGuide: string | null = null;

export function getGuideContext(): string {
  if (cachedGuide) {
    return cachedGuide;
  }
  try {
    cachedGuide = readFileSync(
      join(process.cwd(), "docs/guide/HELP.md"),
      "utf8",
    );
  } catch {
    cachedGuide =
      "BriefcaseOS helps lawyers manage contracts, run compliance checks, and review documents.";
  }
  return cachedGuide;
}

export function fallbackReply(message: string): string {
  const q = message.toLowerCase();
  if (q.includes("upload") || q.includes("contract")) {
    return "On the Dashboard, click Upload New Contract, fill in the name and client ID, then open it from the table.";
  }
  if (q.includes("dark") || q.includes("theme")) {
    return "Open Settings (sidebar bottom) and toggle Dark mode. It applies to the whole app.";
  }
  if (q.includes("editor") || q.includes("document")) {
    return "The editor opens when you click a contract from the dashboard table—not from library cards.";
  }
  if (q.includes("linter") || q.includes("compliance")) {
    return "Compliance Linter lists active issues. Use View Context to jump to an issue on that page.";
  }
  return "I can help with BriefcaseOS navigation, uploads, and settings. Try asking how to upload a contract or enable dark mode.";
}
