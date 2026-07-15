import type { Metadata } from "next";
import Link from "next/link";
import DashboardInsight from "@/components/DashboardInsight";
import DashboardInteractive from "@/components/DashboardInteractive";
import UploadContractButton from "@/components/UploadContractButton";
import { MobileMenuButton } from "@/components/MobileNav";
import { NotificationButton } from "@/components/NotificationButton";
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
    <main className="app-main flex h-screen flex-1 flex-col overflow-y-auto bg-surface-bright dark:bg-background">
      {/* TopAppBar */}
      <header className="sticky top-0 z-40 flex h-[64px] w-full items-center justify-between border-b border-outline-variant bg-surface-bright/80 px-lg backdrop-blur-md dark:border-outline-variant/40 dark:bg-background/80">
        <div className="flex items-center gap-md min-w-0">
          <MobileMenuButton />
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface truncate">
            {contracts[0]?.name ?? "Project Dashboard"}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-lg">
          <NotificationButton />
        </div>
      </header>

      <div className="p-lg lg:p-xl max-w-[1200px] mx-auto w-full space-y-lg">
        {/* Hero / Quick Actions */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-lg bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-sm">
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

        <DashboardInteractive contracts={contracts} />

        {/* AI Insight */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-lg">
          <DashboardInsight />
          <div className="lg:col-span-2 bg-surface-container-high p-lg rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-sm">
                Library Trends
              </h4>
              <ul className="space-y-sm">
                <li>
                  <Link href="/library" className="flex items-center gap-sm text-body-sm hover:text-primary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    New GDPR Amendments (2024)
                  </Link>
                </li>
                <li>
                  <Link href="/library" className="flex items-center gap-sm text-body-sm hover:text-primary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Standardized SaaS Terms
                  </Link>
                </li>
                <li>
                  <Link href="/library" className="flex items-center gap-sm text-body-sm hover:text-primary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    California Privacy Rights update
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
