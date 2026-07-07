import type { Metadata } from "next";
import UserMenu from "@/components/UserMenu";
import { getActiveUser } from "@/lib/user";
import { listContracts, getDashboardStats } from "@/lib/contracts";
import { getContractStatusBadge } from "@/lib/status-badge";

export const metadata: Metadata = {
  title: "Project Dashboard | LexCursor",
};

// Reads live data per request (not prerendered at build time).
export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const shortDateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

export default async function DashboardPage() {
  const user = await getActiveUser();
  const [contracts, stats] = await Promise.all([
    listContracts(user.id),
    getDashboardStats(user.id),
  ]);

  return (
    <main className="flex-1 h-screen overflow-y-auto relative flex flex-col">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-40 flex justify-between items-center h-[64px] px-lg bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-primary md:hidden">
            menu_open
          </span>
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Project Alpha - Master Service Agreement
          </h1>
        </div>
        <div className="flex items-center gap-lg">
          <div className="hidden sm:flex items-center bg-surface-container-low px-md py-xs rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-sm">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-body-sm w-48 outline-none"
              placeholder="Search contracts..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-sm">
            <button className="material-symbols-outlined p-xs rounded-full hover:bg-surface-container-low transition-colors">
              notifications
            </button>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="p-lg lg:p-xl max-w-[1200px] mx-auto w-full space-y-lg">
        {/* Hero / Quick Actions */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-lg bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-xs">
              Welcome back, Counselor.
            </h2>
            <p className="text-on-surface-variant font-body-md max-w-xl">
              You have{" "}
              <span className="font-semibold text-primary">
                {stats.pendingReviews} pending{" "}
                {stats.pendingReviews === 1 ? "review" : "reviews"}
              </span>{" "}
              and {stats.highRisk} high-risk{" "}
              {stats.highRisk === 1 ? "contract" : "contracts"} across your
              portfolio.
            </p>
          </div>
          <button className="relative z-10 flex items-center gap-sm bg-primary text-on-primary px-lg py-md rounded-lg font-label-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95">
            <span className="material-symbols-outlined">upload_file</span>
            Upload New Contract
          </button>
          <div className="absolute right-[-5%] top-[-50%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </section>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/20 flex items-center gap-md">
            <div className="p-sm bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">
                pending_actions
              </span>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">
                Active Reviews
              </p>
              <p className="font-headline-sm text-headline-sm">
                {stats.activeReviews}
              </p>
            </div>
          </div>
          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/20 flex items-center gap-md">
            <div className="p-sm bg-tertiary/10 rounded-lg">
              <span className="material-symbols-outlined text-tertiary">
                verified
              </span>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">
                Compliance Rate
              </p>
              <p className="font-headline-sm text-headline-sm">
                {stats.complianceRate}%
              </p>
            </div>
          </div>
          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/20 flex items-center gap-md">
            <div className="p-sm bg-secondary/10 rounded-lg">
              <span className="material-symbols-outlined text-secondary">
                calendar_today
              </span>
            </div>
            <div>
              <p className="text-label-md text-on-surface-variant">
                Next Renewal
              </p>
              <p className="font-headline-sm text-headline-sm">
                {stats.nextRenewal
                  ? shortDateFmt.format(new Date(stats.nextRenewal))
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Contracts */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
          <div className="px-lg py-md border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Recent Contracts
            </h3>
            <button className="text-primary font-label-md flex items-center gap-xs hover:underline">
              View All
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>
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
                          contract.status === "at_risk"
                            ? "active-cursor-effect"
                            : ""
                        }`}
                      >
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-md">
                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                              description
                            </span>
                            <span className="font-body-md font-semibold">
                              {contract.name}
                            </span>
                          </div>
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
                          <button className="material-symbols-outlined text-outline hover:text-primary">
                            more_vert
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-lg">
          <div className="lg:col-span-3 bg-inverse-surface text-surface p-lg rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-sm text-tertiary-fixed mb-md">
                <span className="material-symbols-outlined">auto_awesome</span>
                <span className="font-label-md">AI LEGAL INSIGHT</span>
              </div>
              <h4 className="font-headline-md text-headline-md mb-sm">
                Unusual Liability Clause Detected
              </h4>
              <p className="text-surface-variant font-body-md opacity-90">
                The limitation of liability in &apos;Project Alpha&apos; exceeds
                standard industry benchmarks by 20%. Consider renegotiating the
                indemnity cap.
              </p>
            </div>
            <div className="mt-lg flex gap-md">
              <button className="bg-primary-container text-on-primary px-md py-sm rounded font-label-md">
                Review Clause
              </button>
              <button className="border border-outline-variant text-surface px-md py-sm rounded font-label-md">
                Dismiss
              </button>
            </div>
          </div>
          <div className="lg:col-span-2 bg-surface-container-high p-lg rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-sm">
                Library Trends
              </h4>
              <ul className="space-y-sm">
                <li className="flex items-center gap-sm text-body-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  New GDPR Amendments (2024)
                </li>
                <li className="flex items-center gap-sm text-body-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Standardized SaaS Terms
                </li>
                <li className="flex items-center gap-sm text-body-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  California Privacy Rights update
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
