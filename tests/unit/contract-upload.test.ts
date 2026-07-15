import { describe, expect, it } from "vitest";
import { assertReadableContractFile } from "@/lib/contract-upload";

describe("assertReadableContractFile", () => {
  it("accepts txt and md files", () => {
    expect(() =>
      assertReadableContractFile(
        new File(["clause"], "lease.txt", { type: "text/plain" }),
      ),
    ).not.toThrow();
    expect(() =>
      assertReadableContractFile(
        new File(["# NDA"], "nda.md", { type: "text/markdown" }),
      ),
    ).not.toThrow();
  });

  it("rejects unsupported extensions", () => {
    expect(() =>
      assertReadableContractFile(
        new File(["%PDF"], "contract.pdf", { type: "application/pdf" }),
      ),
    ).toThrow(/plain-text/i);
  });

  it("rejects empty files", () => {
    expect(() =>
      assertReadableContractFile(new File([], "empty.txt", { type: "text/plain" })),
    ).toThrow(/empty/i);
  });
});
