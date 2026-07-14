import type { Metadata } from "next";
import UserMenu from "@/components/UserMenu";
import ContractTable from "@/components/ContractTable";
import DashboardInsight from "@/components/DashboardInsight";
import UploadContractButton from "@/components/UploadContractButton";
import { getActiveUser } from "@/lib/user";
import { listContracts, getDashboardStats } from "@/lib/contracts";

export const metadata: Metadata = {
  title: "Project Dashboard | BriefcaseOS",
};

// Reads live data per request (not prerendered at build time).
export const dynamic = "force-dynamic";

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
          <UploadContractButton />
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

        <ContractTable contracts={contracts} />

        {/* AI Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-lg">
          <DashboardInsight />
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
