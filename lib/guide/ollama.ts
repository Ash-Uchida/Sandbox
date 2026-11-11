type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function chatWithOllama(
  messages: ChatMessage[],
): Promise<string | null> {
  const baseUrl = process.env.OLLAMA_URL ?? "http://127.0.0.1:11434";
  const model = process.env.OLLAMA_MODEL ?? "llama3.2";

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages, stream: false }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      message?: { content?: string };
    };
    return data.message?.content?.trim() ?? null;
  } catch {
    return null;
  }
}
