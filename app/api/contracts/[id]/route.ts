import { NextResponse } from "next/server";
import { deleteContract } from "@/lib/contracts";
import { getActiveUser } from "@/lib/user";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const user = await getActiveUser();
    const removed = await deleteContract(user.id, id);

    if (!removed) {
      return NextResponse.json({ error: "Contract not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not delete contract." },
      { status: 500 },
    );
  }
}
