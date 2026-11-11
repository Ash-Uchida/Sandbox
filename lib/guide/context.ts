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
  if (q.includes("delete") || q.includes("remove")) {
    return "On the Dashboard, click the trash icon on a contract row, then type the full contract name side by side to confirm deletion (like GitHub).";
  }
  if (q.includes("upload") || q.includes("contract")) {
    return "On the Dashboard, click Upload New Contract, choose a .txt or .md file from Gemini, add a client ID, then open it from the table. The full document text is stored and shown in the editor.";
  }
  if (q.includes("dark") || q.includes("theme")) {
    return "Open Settings (sidebar bottom) and toggle Dark mode under Appearance.";
  }
  if (q.includes("notification") || q.includes("alert")) {
    return "Settings → Notifications lets you toggle compliance alerts, renewal reminders, and AI insights.";
  }
  if (q.includes("ollama") || q.includes("ai")) {
    return "Settings → AI Assistant shows whether Ollama is connected. Install the Ollama app and run ollama pull llama3.2 for live AI chat.";
  }
  if (q.includes("editor") || q.includes("document")) {
    return "The editor opens when you click a contract from the dashboard table—not from library cards.";
  }
  if (q.includes("linter") || q.includes("compliance")) {
    return "Compliance Linter lists active issues. Use View Context to jump to an issue on that page.";
  }
  return "I can help with BriefcaseOS navigation, uploads, and settings. Try asking how to upload a contract or enable dark mode.";
}
