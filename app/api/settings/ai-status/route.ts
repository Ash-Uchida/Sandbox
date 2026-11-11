import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.OLLAMA_URL ?? "http://127.0.0.1:11434";
  const model = process.env.OLLAMA_MODEL ?? "llama3.2";

  try {
    const response = await fetch(`${baseUrl}/api/tags`, {
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return NextResponse.json({
        connected: false,
        model,
        url: baseUrl,
      });
    }

    const data = (await response.json()) as {
      models?: Array<{ name: string }>;
    };
    const hasModel =
      data.models?.some((entry) => entry.name.split(":")[0] === model) ?? false;

    return NextResponse.json({
      connected: true,
      model,
      hasModel,
      url: baseUrl,
    });
  } catch {
    return NextResponse.json({
      connected: false,
      model,
      url: baseUrl,
    });
  }
}
