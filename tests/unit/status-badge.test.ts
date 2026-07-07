import { describe, expect, it } from "vitest";
import { getContractStatusBadge } from "@/lib/status-badge";

describe("getContractStatusBadge", () => {
  it("shows compliance score for compliant contracts", () => {
    const badge = getContractStatusBadge({ status: "compliant", complianceScore: 94 });
    expect(badge.label).toBe("94% COMPLIANT");
    expect(badge.className).toContain("tertiary-fixed");
  });

  it("shows compliance score for at-risk contracts", () => {
    const badge = getContractStatusBadge({ status: "at_risk", complianceScore: 62 });
    expect(badge.label).toBe("62% AT RISK");
    expect(badge.className).toContain("error-container");
  });

  it("uses fixed labels for pending and in_review", () => {
    expect(getContractStatusBadge({ status: "pending", complianceScore: null }).label).toBe(
      "PENDING REVIEW",
    );
    expect(getContractStatusBadge({ status: "in_review", complianceScore: null }).label).toBe(
      "IN REVIEW",
    );
  });

  it("defaults unknown statuses to DRAFT", () => {
    const badge = getContractStatusBadge({ status: "draft", complianceScore: null });
    expect(badge.label).toBe("DRAFT");
  });
});
