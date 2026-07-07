import type { Metadata } from "next";
import UserMenu from "@/components/UserMenu";

export const metadata: Metadata = {
  title: "Compliance Linter | BriefcaseOS",
};

export default function LinterPage() {
  return (
    <main className="flex-1 h-screen overflow-y-auto relative flex flex-col">
      {/* TopAppBar (Shared Component) */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center h-[64px] px-lg bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <button className="p-sm hover:bg-surface-container-low rounded-lg transition-colors">
            <span className="material-symbols-outlined text-primary" data-icon="menu_open">
              menu_open
            </span>
          </button>
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Compliance Audit - Master Service Agreement
          </h1>
        </div>
        <button className="bg-surface-container-low text-primary px-md py-sm rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors border border-outline-variant/30">
          Export PDF
        </button>
      </header>

      {/* Content Area */}
      <div className="p-lg max-w-5xl mx-auto w-full">
        {/* Audit Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-lg flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded bg-error/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-error" data-icon="report">
                report
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                Critical Errors
              </p>
              <p className="font-headline-sm text-headline-sm text-on-surface">1</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-lg flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded bg-tertiary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary-container" data-icon="warning">
                warning
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                Warnings
              </p>
              <p className="font-headline-sm text-headline-sm text-on-surface">2</p>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-lg flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" data-icon="verified_user">
                verified_user
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                Score
              </p>
              <p className="font-headline-sm text-headline-sm text-on-surface">84/100</p>
            </div>
          </div>
        </div>

        {/* Linter List */}
        <div className="space-y-md">
          <div className="flex items-center justify-between mb-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Active Issues</h2>
            <span className="text-on-surface-variant font-body-sm text-body-sm italic">
              Scan completed 2 minutes ago
            </span>
          </div>

          {/* Card 1: High Risk */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex shadow-sm group hover:border-error/50 transition-colors">
            <div className="w-1 bg-error"></div>
            <div className="p-lg flex-1 flex items-start gap-lg">
              <div className="mt-xs">
                <span
                  className="material-symbols-outlined text-error text-[32px]"
                  data-icon="dangerous"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  dangerous
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="bg-error/10 text-error px-sm py-xs rounded text-[10px] font-bold uppercase tracking-widest">
                    High Risk
                  </span>
                  <span className="text-on-surface-variant font-label-md text-label-md">
                    Section 4.2 • Regulatory Compliance
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
                  Overturned case cited in Section 4
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed mb-md">
                  The document cites <i>Smith v. Global Logistics Corp.</i> which was
                  overturned by the Supreme Court in Q3 2023. Continuing to reference this
                  precedent may invalidate the liability protections in this agreement.
                </p>
                <div className="flex items-center gap-md">
                  <button className="bg-primary-container text-white px-lg py-sm rounded-lg font-label-md text-label-md flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary-container/20">
                    <span className="material-symbols-outlined text-sm" data-icon="auto_fix_high">
                      auto_fix_high
                    </span>
                    Auto-Fix
                  </button>
                  <button className="text-on-surface-variant px-md py-sm rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                    View Context
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Warning */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex shadow-sm group hover:border-tertiary-container/50 transition-colors">
            <div className="w-1 bg-tertiary-container"></div>
            <div className="p-lg flex-1 flex items-start gap-lg">
              <div className="mt-xs">
                <span
                  className="material-symbols-outlined text-tertiary-container text-[32px]"
                  data-icon="warning"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="bg-tertiary-container/10 text-tertiary-container px-sm py-xs rounded text-[10px] font-bold uppercase tracking-widest">
                    Warning
                  </span>
                  <span className="text-on-surface-variant font-label-md text-label-md">
                    Section 12 • Indemnity
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
                  Indemnity clause violates state law
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed mb-md">
                  The broad indemnification language provided may be unenforceable under
                  California Civil Code Section 2782. Suggesting narrowing the scope to
                  negligent acts or omissions.
                </p>
                <div className="flex items-center gap-md">
                  <button className="bg-primary-container text-white px-lg py-sm rounded-lg font-label-md text-label-md flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary-container/20">
                    <span className="material-symbols-outlined text-sm" data-icon="auto_fix_high">
                      auto_fix_high
                    </span>
                    Auto-Fix
                  </button>
                  <button className="text-on-surface-variant px-md py-sm rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                    View Context
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Warning */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex shadow-sm group hover:border-tertiary-container/50 transition-colors">
            <div className="w-1 bg-tertiary-container"></div>
            <div className="p-lg flex-1 flex items-start gap-lg">
              <div className="mt-xs">
                <span
                  className="material-symbols-outlined text-tertiary-container text-[32px]"
                  data-icon="info"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  info
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-sm mb-xs">
                  <span className="bg-tertiary-container/10 text-tertiary-container px-sm py-xs rounded text-[10px] font-bold uppercase tracking-widest">
                    Warning
                  </span>
                  <span className="text-on-surface-variant font-label-md text-label-md">
                    Section 18 • Dispute Resolution
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
                  Ambiguous jurisdiction reference
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed mb-md">
                  The clause mentions &quot;local courts&quot; without specifying a particular
                  city, county, or state. This ambiguity often leads to forum selection
                  disputes.
                </p>
                <div className="flex items-center gap-md">
                  <button className="bg-primary-container text-white px-lg py-sm rounded-lg font-label-md text-label-md flex items-center gap-sm hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary-container/20">
                    <span className="material-symbols-outlined text-sm" data-icon="auto_fix_high">
                      auto_fix_high
                    </span>
                    Auto-Fix
                  </button>
                  <button className="text-on-surface-variant px-md py-sm rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                    View Context
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Inspector Placeholder (Visual Detail) */}
        <div className="mt-xl pt-xl border-t border-outline-variant flex flex-col items-center">
          <div className="w-12 h-1 bg-primary-container/20 rounded-full mb-md"></div>
          <p className="text-on-surface-variant font-label-md text-label-md mb-lg">
            ADVANCED AI ANALYSIS IN PROGRESS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-md w-full">
            <div className="h-32 rounded-lg bg-surface-container-low/50 border border-dashed border-outline-variant flex flex-col items-center justify-center p-md text-center">
              <span className="material-symbols-outlined text-primary mb-sm opacity-50" data-icon="balance">
                balance
              </span>
              <span className="text-on-surface-variant font-label-md text-[10px] uppercase">
                Precedent Library
              </span>
            </div>
            <div className="h-32 rounded-lg bg-surface-container-low/50 border border-dashed border-outline-variant flex flex-col items-center justify-center p-md text-center">
              <span className="material-symbols-outlined text-primary mb-sm opacity-50" data-icon="gavel">
                gavel
              </span>
              <span className="text-on-surface-variant font-label-md text-[10px] uppercase">
                Judicial Bias Check
              </span>
            </div>
            <div className="h-32 rounded-lg bg-surface-container-low/50 border border-dashed border-outline-variant flex flex-col items-center justify-center p-md text-center">
              <span className="material-symbols-outlined text-primary mb-sm opacity-50" data-icon="history_edu">
                history_edu
              </span>
              <span className="text-on-surface-variant font-label-md text-[10px] uppercase">
                Linguistic Drift
              </span>
            </div>
            <div className="h-32 rounded-lg bg-surface-container-low/50 border border-dashed border-outline-variant flex flex-col items-center justify-center p-md text-center">
              <span className="material-symbols-outlined text-primary mb-sm opacity-50" data-icon="psychology">
                psychology
              </span>
              <span className="text-on-surface-variant font-label-md text-[10px] uppercase">
                Semantic Analysis
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
