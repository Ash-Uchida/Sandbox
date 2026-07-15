const MAX_DOCUMENT_BYTES = 512_000;
const ALLOWED_EXTENSIONS = new Set([".txt", ".md", ".text"]);

export type ParsedContractUpload = {
  name: string;
  clientId: string;
  fileName: string;
  documentText: string;
};

function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
}

function nameFromFileName(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  const base = dot >= 0 ? fileName.slice(0, dot) : fileName;
  return base.replace(/[-_]+/g, " ").trim();
}

export function assertReadableContractFile(file: File): void {
  const extension = extensionOf(file.name);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    throw new Error("Upload a plain-text contract (.txt or .md).");
  }
  if (file.size === 0) {
    throw new Error("The selected file is empty.");
  }
  if (file.size > MAX_DOCUMENT_BYTES) {
    throw new Error("Contract file must be 500 KB or smaller.");
  }
}

export async function readContractFile(file: File): Promise<string> {
  assertReadableContractFile(file);
  const text = await file.text();
  if (!text.trim()) {
    throw new Error("The selected file has no readable text.");
  }
  return text;
}

export async function parseContractUploadForm(
  formData: FormData,
): Promise<ParsedContractUpload> {
  const nameField = formData.get("name");
  const clientIdField = formData.get("clientId");
  const fileField = formData.get("file");

  if (!(fileField instanceof File)) {
    throw new Error("Contract file is required.");
  }

  assertReadableContractFile(fileField);

  const clientId =
    typeof clientIdField === "string" ? clientIdField.trim() : "";
  if (!clientId) {
    throw new Error("Client ID is required.");
  }

  const documentText = (await fileField.text()).trim();
  if (!documentText) {
    throw new Error("The selected file has no readable text.");
  }

  const fileName = fileField.name;

  const name =
    typeof nameField === "string" && nameField.trim()
      ? nameField.trim()
      : nameFromFileName(fileName);

  if (!name) {
    throw new Error("Document name is required.");
  }

  return { name, clientId, fileName, documentText };
}
