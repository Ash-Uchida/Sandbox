import { NextResponse } from "next/server";
import { createContract, listContracts } from "@/lib/contracts";
import { parseCreateContractInput } from "@/lib/contract-input";
import { parseContractUploadForm } from "@/lib/contract-upload";
import { getActiveUser } from "@/lib/user";

export async function GET() {
  const user = await getActiveUser();
  const items = await listContracts(user.id);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  try {
    const user = await getActiveUser();
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const upload = await parseContractUploadForm(formData);
      const contract = await createContract(user.id, {
        name: upload.name,
        clientId: upload.clientId,
        fileName: upload.fileName,
        documentText: upload.documentText,
        status: "draft",
      });
      return NextResponse.json({ contract }, { status: 201 });
    }

    const body = await request.json();
    const input = parseCreateContractInput(body);
    const contract = await createContract(user.id, input);
    return NextResponse.json({ contract }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
