import Link from "next/link";
import type { Contract } from "@prisma/client";
import { getContractStatusBadge } from "@/lib/status-badge";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type Props = {
  contracts: Contract[];
};

export default function ContractTable({ contracts }: Props) {
  return (
    <section
      id="recent-contracts"
      className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm scroll-mt-24"
    >
      <div className="px-lg py-md border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/30">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          Recent Contracts
        </h3>
        <a
          href="#recent-contracts"
          className="text-primary font-label-md flex items-center gap-xs hover:underline"
        >
          View All
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 text-left">
              <th className="px-lg py-sm font-label-md text-on-surface-variant uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-lg py-sm font-label-md text-on-surface-variant uppercase tracking-wider">
                Client ID
              </th>
              <th className="px-lg py-sm font-label-md text-on-surface-variant uppercase tracking-wider">
                Date
              </th>
              <th className="px-lg py-sm font-label-md text-on-surface-variant uppercase tracking-wider">
                Compliance
              </th>
              <th className="px-lg py-sm font-label-md text-on-surface-variant uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {contracts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-lg py-xl text-center">
                  <div className="flex flex-col items-center gap-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[32px] opacity-60">
                      folder_open
                    </span>
                    <p className="font-body-md">No contracts yet.</p>
                    <p className="text-body-sm">
                      Upload your first contract to get started.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              contracts.map((contract) => {
                const badge = getContractStatusBadge(contract);
                return (
                  <tr
                    key={contract.id}
                    className={`hover:bg-primary-container/5 transition-colors group ${
                      contract.status === "at_risk" ? "active-cursor-effect" : ""
                    }`}
                  >
                    <td className="px-lg py-md">
                      <Link
                        href={`/editor?contract=${contract.id}`}
                        className="flex items-center gap-md"
                      >
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                          description
                        </span>
                        <span className="font-body-md font-semibold hover:text-primary">
                          {contract.name}
                        </span>
                      </Link>
                    </td>
                    <td className="px-lg py-md text-body-sm font-code-sm text-on-secondary-fixed-variant">
                      {contract.clientId}
                    </td>
                    <td className="px-lg py-md text-body-sm text-on-surface-variant">
                      {dateFmt.format(new Date(contract.createdAt))}
                    </td>
                    <td className="px-lg py-md">
                      <span
                        className={`inline-flex items-center px-sm py-xs rounded-[2px] font-label-md text-[11px] ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-lg py-md text-right">
                      <Link
                        href={`/editor?contract=${contract.id}`}
                        className="material-symbols-outlined text-outline hover:text-primary inline-flex"
                        aria-label={`Open ${contract.name}`}
                      >
                        open_in_new
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
