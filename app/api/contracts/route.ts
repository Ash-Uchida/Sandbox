import { NextResponse } from "next/server";
import { getActiveUser } from "@/lib/user";
import { listContracts } from "@/lib/contracts";

export async function GET() {
  const user = await getActiveUser();
  const items = await listContracts(user.id);
  return NextResponse.json({ items });
}
