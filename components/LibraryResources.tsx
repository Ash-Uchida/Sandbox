"use client";

import { useState } from "react";

const RESOURCES = [
  {
    id: "gdpr",
    title: "GDPR Amendments (2024)",
    description: "Summary of key EU privacy regulation updates for contract review.",
    category: "Privacy",
    body: "Focus on lawful basis, data processing addenda, and cross-border transfer clauses when reviewing vendor agreements under the 2024 GDPR guidance updates.",
  },
  {
    id: "saas",
    title: "Standardized SaaS Terms",
    description: "Baseline clauses for software subscription agreements.",
    category: "Commercial",
    body: "Check subscription term, auto-renewal notice periods, SLA credits, and limitation of liability caps against your standard SaaS playbook.",
  },
  {
    id: "cpra",
    title: "California Privacy Rights Update",
    description: "CPRA obligations for vendor and customer data processing.",
    category: "Privacy",
    body: "Verify DPA language covers sale/share definitions, opt-out mechanics, and subcontractor flow-down requirements for California residents.",
  },
  {
    id: "liability",
    title: "Limitation of Liability Playbook",
    description: "Benchmark caps and carve-outs for enterprise MSAs.",
    category: "Risk",
    body: "Compare indemnity caps to trailing 12-month fees, carve-outs for confidentiality breaches, and exclusions for consequential damages.",
  },
] as const;

export default function LibraryResources() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = RESOURCES.find((resource) => resource.id === activeId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {RESOURCES.map((resource) => (
          <article
            key={resource.id}
            className="flex flex-col gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-low p-6 dark:border-outline-variant/40 dark:bg-surface-container-lowest"
          >
            <span className="inline-flex w-fit rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {resource.category}
            </span>
            <div>
              <h3 className="mb-1 text-lg font-semibold text-on-surface dark:text-surface-bright">
                {resource.title}
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant dark:text-surface-variant">
                {resource.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setActiveId((current) =>
                  current === resource.id ? null : resource.id,
                )
              }
              className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              {activeId === resource.id ? "Hide details" : "Read resource"}
              <span className="material-symbols-outlined text-[16px]">
                {activeId === resource.id ? "expand_less" : "arrow_forward"}
              </span>
            </button>
          </article>
        ))}
      </div>

      {active ? (
        <section className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 dark:border-outline-variant/40 dark:bg-inverse-surface">
          <h4 className="mb-2 text-lg font-semibold text-on-surface dark:text-surface-bright">
            {active.title}
          </h4>
          <p className="text-sm leading-relaxed text-on-surface-variant dark:text-surface-variant">
            {active.body}
          </p>
        </section>
      ) : null}
    </div>
  );
}
