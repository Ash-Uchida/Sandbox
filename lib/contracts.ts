import { prisma } from "./prisma";
import type { Contract } from "@prisma/client";

export type { Contract };

/** All contracts owned by a user, newest first. */
export async function listContracts(ownerId: string): Promise<Contract[]> {
  return prisma.contract.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" },
  });
}

export type DashboardStats = {
  activeReviews: number;
  complianceRate: number;
  pendingReviews: number;
  highRisk: number;
  nextRenewal: string | null;
};

/**
 * Pure aggregation of dashboard stats from a set of contracts. Kept free of any
 * I/O so it can be unit-tested without a database.
 */
export function computeDashboardStats(contracts: Contract[]): DashboardStats {
  const activeReviews = contracts.filter(
    (c) => c.status === "in_review" || c.status === "pending",
  ).length;
  const pendingReviews = contracts.filter((c) => c.status === "pending").length;
  const highRisk = contracts.filter((c) => c.status === "at_risk").length;

  const scored = contracts.filter((c) => c.complianceScore != null);
  const complianceRate = scored.length
    ? Math.round(
        (scored.reduce((sum, c) => sum + (c.complianceScore ?? 0), 0) /
          scored.length) *
          10,
      ) / 10
    : 0;

  const renewals = contracts
    .map((c) => c.renewalDate)
    .filter((d): d is Date => d != null)
    .sort((a, b) => a.getTime() - b.getTime());
  const nextRenewal = renewals.length ? renewals[0].toISOString() : null;

  return { activeReviews, pendingReviews, highRisk, complianceRate, nextRenewal };
}

/** Aggregate stats for a user's dashboard. */
export async function getDashboardStats(ownerId: string): Promise<DashboardStats> {
  const contracts = await prisma.contract.findMany({ where: { ownerId } });
  return computeDashboardStats(contracts);
}
