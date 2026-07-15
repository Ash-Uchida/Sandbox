"use client";

import { useState } from "react";
import styles from "@/app/(app)/editor/editor.module.css";

type Message = { role: "user" | "assistant"; content: string };

type Props = {
  documentTitle: string;
};

export default function EditorAssistant({ documentTitle }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"ollama" | "fallback" | "idle">(
    "idle",
  );

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
      const response = await fetch("/api/editor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, documentTitle }),
      });
      const data = await response.json();
      const reply =
        typeof data.reply === "string"
          ? data.reply
          : "Sorry, I could not analyze that right now.";
      setProvider(data.provider === "ollama" ? "ollama" : "fallback");
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

  return (
    <section className="flex h-[45%] flex-col border-t border-outline-variant bg-[#0B1C30] md:h-full md:flex-[0.4] md:border-t-0 md:border-l">
      <div className="flex items-center justify-between border-b border-white/10 p-md">
        <div className="flex items-center gap-sm text-white">
          <span
            className="material-symbols-outlined text-primary-fixed-dim"
            data-icon="auto_awesome"
          >
            auto_awesome
          </span>
          <span className="text-base font-semibold">AI Assistant</span>
        </div>
      </div>

      <div
        className={`flex-1 space-y-4 overflow-y-auto p-lg ${styles.customScrollbar}`}
      >
        {messages.length === 0 ? (
          <p className="text-sm text-white/60">
            Ask about Section 4.2 limitation of liability or request redline
            suggestions for this document.
          </p>
        ) : null}
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div
              key={`user-${index}`}
              className="ml-auto flex max-w-[90%] flex-col items-end gap-1"
            >
              <div className="rounded-xl rounded-tr-none border border-primary/50 bg-primary/40 p-md">
                <p className="text-sm text-white">{message.content}</p>
              </div>
            </div>
          ) : (
            <div
              key={`assistant-${index}`}
              className="flex max-w-[95%] flex-col items-start gap-1"
            >
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="material-symbols-outlined text-[18px] text-white">
                    auto_awesome
                  </span>
                </div>
                <div className="rounded-xl rounded-tl-none border border-white/10 bg-white/5 p-md">
                  <p className="text-sm text-white">{message.content}</p>
                </div>
              </div>
            </div>
          ),
        )}
        {loading ? (
          <p className="text-xs text-white/50">Analyzing document…</p>
        ) : null}
      </div>

      <div className="border-t border-white/10 bg-white/5 p-lg">
        <form onSubmit={sendMessage} className="relative">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="w-full resize-none rounded-xl border border-white/20 bg-[#0F172A] px-4 py-3 pr-24 text-sm text-white placeholder-white/40 outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30"
            placeholder="Ask BriefcaseOS..."
            rows={2}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute bottom-3 right-3 flex items-center justify-center rounded-lg bg-primary p-2 text-white transition-transform hover:scale-105 disabled:opacity-60"
            aria-label="Send message"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-white/40">
            AI Engine:{" "}
            {provider === "ollama"
              ? "Ollama (local)"
              : provider === "fallback"
                ? "BriefcaseOS (offline)"
                : "Ollama when running"}
          </span>
        </div>
      </div>
    </section>
  );
}
