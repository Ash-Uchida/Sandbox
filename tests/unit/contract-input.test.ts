import { describe, expect, it } from "vitest";
import { parseCreateContractInput } from "@/lib/contract-input";

describe("parseCreateContractInput", () => {
  it("parses valid input", () => {
    expect(
      parseCreateContractInput({ name: "  MSA  ", clientId: " ACME-1 " }),
    ).toEqual({ name: "MSA", clientId: "ACME-1", status: undefined });
  });

  it("rejects missing name", () => {
    expect(() => parseCreateContractInput({ clientId: "ACME-1" })).toThrow(
      /name/i,
    );
  });

  it("rejects invalid status", () => {
    expect(() =>
      parseCreateContractInput({
        name: "MSA",
        clientId: "ACME-1",
        status: "invalid",
      }),
    ).toThrow(/status/i);
  });
});
