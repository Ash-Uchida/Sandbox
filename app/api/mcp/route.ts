import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getMcpStatus } from "@/lib/mcp/client";

const clerkEnabled =
  !!process.env.CLERK_SECRET_KEY &&
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

/** GET /api/mcp — MCP health: lists tools from the configured remote server. */
export async function GET() {
  if (clerkEnabled) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const status = await getMcpStatus();
  return NextResponse.json(status);
}
