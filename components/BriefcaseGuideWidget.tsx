"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

type Props = {
  placement?: "sidebar" | "floating";
};

export default function BriefcaseGuideWidget({
  placement = "floating",
}: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the BriefcaseOS guide. Ask how to upload contracts, use the linter, or turn on dark mode.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) {
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const response = await fetch("/api/guide/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      const reply =
        typeof data.reply === "string"
          ? data.reply
          : "Sorry, I could not answer that right now.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Is the dev server running?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const panelClass =
    placement === "sidebar"
      ? "fixed bottom-36 left-4 z-[90] flex w-[min(92vw,360px)] flex-col overflow-hidden rounded-xl border border-outline-variant/40 bg-white shadow-2xl dark:border-outline-variant/50 dark:bg-inverse-surface"
      : "absolute bottom-14 right-0 flex w-[min(92vw,360px)] flex-col overflow-hidden rounded-xl border border-outline-variant/40 bg-white shadow-2xl dark:border-outline-variant/50 dark:bg-inverse-surface";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-on-primary shadow-lg hover:opacity-90"
        aria-label="Open BriefcaseOS guide"
        title="BriefcaseOS guide"
      >
        ?
      </button>

      {open ? (
        <div className={panelClass}>
          <div className="flex items-center justify-between border-b border-outline-variant/20 px-4 py-3 dark:border-white/10">
            <p className="text-sm font-semibold text-on-surface dark:text-surface-bright">
              Site Guide
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="material-symbols-outlined rounded-full p-1 text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-white/10"
              aria-label="Close guide"
            >
              close
            </button>
          </div>

          <div className="flex max-h-64 flex-col gap-3 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-8 bg-primary/10 text-on-surface dark:text-surface-bright"
                    : "mr-4 bg-surface-container-low text-on-surface dark:bg-white/10 dark:text-surface-bright"
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading ? (
              <p className="text-xs text-on-surface-variant">Thinking…</p>
            ) : null}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex gap-2 border-t border-outline-variant/20 p-3 dark:border-white/10"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about BriefcaseOS…"
              className="min-w-0 flex-1 rounded-lg border border-outline-variant/30 bg-surface-container-low px-3 py-2 text-sm text-on-surface outline-none focus:border-primary dark:bg-white/5 dark:text-surface-bright"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-on-primary disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
