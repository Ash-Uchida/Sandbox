import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export type McpStatus = {
  configured: boolean;
  serverUrl: string | null;
  toolCount: number;
  tools: { name: string; description?: string }[];
  error?: string;
};

/** True when a remote MCP server URL is set (runtime integration). */
export function isMcpConfigured(): boolean {
  return !!process.env.MCP_SERVER_URL;
}

function authHeaders(): Record<string, string> {
  const key = process.env.MCP_API_KEY ?? process.env.NEON_API_KEY;
  return key ? { Authorization: `Bearer ${key}` } : {};
}

async function connectMcpClient(): Promise<Client> {
  const serverUrl = process.env.MCP_SERVER_URL;
  if (!serverUrl) {
    throw new Error("MCP_SERVER_URL is not set");
  }

  const client = new Client({ name: "briefcase-os", version: "0.1.0" });
  const baseUrl = new URL(serverUrl);
  const headers = authHeaders();

  try {
    const transport = new StreamableHTTPClientTransport(baseUrl, {
      requestInit: { headers },
    });
    await client.connect(transport);
    return client;
  } catch {
    const transport = new SSEClientTransport(baseUrl, {
      requestInit: { headers },
    });
    await client.connect(transport);
    return client;
  }
}

/** List tools exposed by the configured MCP server (e.g. Neon). */
export async function getMcpStatus(): Promise<McpStatus> {
  if (!isMcpConfigured()) {
    return {
      configured: false,
      serverUrl: null,
      toolCount: 0,
      tools: [],
    };
  }

  const serverUrl = process.env.MCP_SERVER_URL ?? null;
  let client: Client | undefined;

  try {
    client = await connectMcpClient();
    const { tools } = await client.listTools();
    const mapped = tools.map((t) => ({
      name: t.name,
      description: t.description,
    }));
    return {
      configured: true,
      serverUrl,
      toolCount: mapped.length,
      tools: mapped,
    };
  } catch (err) {
    return {
      configured: true,
      serverUrl,
      toolCount: 0,
      tools: [],
      error: err instanceof Error ? err.message : "Failed to connect to MCP server",
    };
  } finally {
    await client?.close().catch(() => undefined);
  }
}
