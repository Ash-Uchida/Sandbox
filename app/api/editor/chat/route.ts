import { NextResponse } from "next/server";
import { chatWithOllama } from "@/lib/guide/ollama";
import {
  EDITOR_DOCUMENT_EXCERPT,
  editorFallbackReply,
} from "@/lib/editor/context";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const documentTitle =
      typeof body.documentTitle === "string" ? body.documentTitle : "Contract";

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const ollamaReply = await chatWithOllama([
      {
        role: "system",
        content: `You are a legal drafting assistant for BriefcaseOS. Analyze the document "${documentTitle}" and answer briefly with practical contract advice. Document excerpt:\n\n${EDITOR_DOCUMENT_EXCERPT}`,
      },
      { role: "user", content: message },
    ]);

    return NextResponse.json({
      reply: ollamaReply ?? editorFallbackReply(message),
      provider: ollamaReply ? "ollama" : "fallback",
    });
  } catch {
    return NextResponse.json(
      { error: "Could not process your question." },
      { status: 500 },
    );
  }
}
