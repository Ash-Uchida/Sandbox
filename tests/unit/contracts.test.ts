import { describe, expect, it } from "vitest";
import type { Contract } from "@prisma/client";
import { computeDashboardStats } from "@/lib/contracts";

function contract(overrides: Partial<Contract> = {}): Contract {
  const now = new Date("2026-01-01T00:00:00.000Z");
  return {
    id: "c1",
    ownerId: "u1",
    name: "Sample Contract",
    clientId: "client-1",
    status: "draft",
    complianceScore: null,
    renewalDate: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe("computeDashboardStats", () => {
  it("returns zeroed stats for no contracts", () => {
    expect(computeDashboardStats([])).toEqual({
      activeReviews: 0,
      pendingReviews: 0,
      highRisk: 0,
      complianceRate: 0,
      nextRenewal: null,
    });
  });

  it("counts in_review and pending contracts as active reviews", () => {
    const stats = computeDashboardStats([
      contract({ id: "a", status: "in_review" }),
      contract({ id: "b", status: "pending" }),
      contract({ id: "c", status: "compliant" }),
    ]);
    expect(stats.activeReviews).toBe(2);
    expect(stats.pendingReviews).toBe(1);
  });

  it("counts at_risk contracts as high risk", () => {
    const stats = computeDashboardStats([
      contract({ id: "a", status: "at_risk" }),
      contract({ id: "b", status: "at_risk" }),
      contract({ id: "c", status: "compliant" }),
    ]);
    expect(stats.highRisk).toBe(2);
  });

  it("averages compliance scores and rounds to one decimal", () => {
    const stats = computeDashboardStats([
      contract({ id: "a", complianceScore: 90 }),
      contract({ id: "b", complianceScore: 95 }),
      contract({ id: "c", complianceScore: null }),
    ]);
    expect(stats.complianceRate).toBe(92.5);
  });

  it("picks the earliest renewal date as the next renewal", () => {
    const stats = computeDashboardStats([
      contract({ id: "a", renewalDate: new Date("2026-06-01T00:00:00.000Z") }),
      contract({ id: "b", renewalDate: new Date("2026-03-01T00:00:00.000Z") }),
      contract({ id: "c", renewalDate: null }),
    ]);
    expect(stats.nextRenewal).toBe("2026-03-01T00:00:00.000Z");
  });
});
