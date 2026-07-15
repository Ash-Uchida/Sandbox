"use client";

import { useMemo, useState } from "react";
import type { Contract } from "@prisma/client";
import ContractTable from "@/components/ContractTable";

type Props = {
  contracts: Contract[];
};

export default function DashboardInteractive({ contracts }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return contracts;
    }
    return contracts.filter(
      (contract) =>
        contract.name.toLowerCase().includes(normalized) ||
        contract.clientId.toLowerCase().includes(normalized),
    );
  }, [contracts, query]);

  return (
    <div className="space-y-md">
      <div className="flex items-center bg-surface-container-lowest px-md py-sm rounded-xl border border-outline-variant/30">
        <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-sm">
          search
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent border-none text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          placeholder="Search contracts by name or client ID..."
          type="search"
          aria-label="Search contracts"
        />
      </div>
      <ContractTable contracts={filtered} query={query} />
    </div>
  );
}
