import { NextResponse } from "next/server";
import { getActiveUser } from "@/lib/user";
import { getDashboardStats } from "@/lib/contracts";

export async function GET() {
  const user = await getActiveUser();
  const stats = await getDashboardStats(user.id);
  return NextResponse.json(stats);
}
