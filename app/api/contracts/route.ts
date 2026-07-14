import { NextResponse } from "next/server";
import { getActiveUser } from "@/lib/user";
import { createContract, listContracts } from "@/lib/contracts";
import { parseCreateContractInput } from "@/lib/contract-input";

export async function GET() {
  const user = await getActiveUser();
  const items = await listContracts(user.id);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  try {
    const user = await getActiveUser();
    const body = await request.json();
    const input = parseCreateContractInput(body);
    const contract = await createContract(user.id, input);
    return NextResponse.json({ contract }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
