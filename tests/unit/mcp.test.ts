import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { isMcpConfigured } from "@/lib/mcp/client";

describe("isMcpConfigured", () => {
  const original = process.env.MCP_SERVER_URL;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.MCP_SERVER_URL;
    } else {
      process.env.MCP_SERVER_URL = original;
    }
  });

  it("returns false when MCP_SERVER_URL is unset", () => {
    delete process.env.MCP_SERVER_URL;
    expect(isMcpConfigured()).toBe(false);
  });

  it("returns true when MCP_SERVER_URL is set", () => {
    process.env.MCP_SERVER_URL = "https://mcp.neon.tech/mcp";
    expect(isMcpConfigured()).toBe(true);
  });
});
