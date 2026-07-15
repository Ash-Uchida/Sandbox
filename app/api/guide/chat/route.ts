import { NextResponse } from "next/server";
import { getGuideContext, fallbackReply } from "@/lib/guide/context";
import { chatWithOllama } from "@/lib/guide/ollama";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const context = getGuideContext();
    const ollamaReply = await chatWithOllama([
      {
        role: "system",
        content: `You are BriefcaseOS Site Guide. Answer briefly using only this help doc:\n\n${context}`,
      },
      { role: "user", content: message },
    ]);

    return NextResponse.json({
      reply: ollamaReply ?? fallbackReply(message),
      provider: ollamaReply ? "ollama" : "fallback",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not process your question." },
      { status: 500 },
    );
  }
}
