import { NextResponse } from "next/server";
import { getContract } from "@/lib/contracts";
import { buildDocumentExcerpt } from "@/lib/editor/document-excerpt";
import { editorFallbackReply } from "@/lib/editor/context";
import { chatWithOllama } from "@/lib/guide/ollama";
import { getActiveUser } from "@/lib/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const documentTitle =
      typeof body.documentTitle === "string" ? body.documentTitle : "Contract";
    const contractId =
      typeof body.contractId === "string" ? body.contractId : null;

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    let documentExcerpt = buildDocumentExcerpt(null);
    if (contractId) {
      const user = await getActiveUser();
      const contract = await getContract(user.id, contractId);
      documentExcerpt = buildDocumentExcerpt(contract?.documentText);
    }

    const ollamaReply = await chatWithOllama([
      {
        role: "system",
        content: `You are a legal drafting assistant for BriefcaseOS. Analyze the document "${documentTitle}" and answer briefly with practical contract advice. Document text:\n\n${documentExcerpt}`,
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
