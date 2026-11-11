import type { Contract } from "@prisma/client";

export type StatusBadge = { label: string; className: string };

/** Maps a contract status to the badge label + Tailwind classes used on the dashboard. */
export function getContractStatusBadge(contract: Pick<Contract, "status" | "complianceScore">): StatusBadge {
  switch (contract.status) {
    case "compliant":
      return {
        label: `${contract.complianceScore ?? 0}% COMPLIANT`,
        className: "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant",
      };
    case "at_risk":
      return {
        label: `${contract.complianceScore ?? 0}% AT RISK`,
        className: "bg-error-container text-on-error-container",
      };
    case "pending":
      return {
        label: "PENDING REVIEW",
        className: "bg-secondary-fixed text-on-secondary-fixed-variant",
      };
    case "in_review":
      return {
        label: "IN REVIEW",
        className: "bg-secondary-fixed text-on-secondary-fixed-variant",
      };
    default:
      return {
        label: "DRAFT",
        className: "bg-surface-container-high text-on-surface-variant",
      };
  }
}
