import type { ContractStatus } from "@prisma/client";

export type CreateContractInput = {
  name: string;
  clientId: string;
  status?: ContractStatus;
};

const STATUSES = new Set<ContractStatus>([
  "draft",
  "in_review",
  "compliant",
  "at_risk",
  "pending",
]);

export function parseCreateContractInput(body: unknown): CreateContractInput {
  if (!body || typeof body !== "object") {
    throw new Error("Request body must be a JSON object.");
  }

  const { name, clientId, status } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Contract name is required.");
  }
  if (typeof clientId !== "string" || !clientId.trim()) {
    throw new Error("Client ID is required.");
  }
  if (status !== undefined && (typeof status !== "string" || !STATUSES.has(status as ContractStatus))) {
    throw new Error("Invalid contract status.");
  }

  return {
    name: name.trim(),
    clientId: clientId.trim(),
    status: status as ContractStatus | undefined,
  };
}
