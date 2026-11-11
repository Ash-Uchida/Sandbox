import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import SettingsAiPanel from "@/components/SettingsAiPanel";
import SettingsAccountPanel from "@/components/SettingsAccountPanel";
import NotificationSettings from "@/components/NotificationSettings";
import WorkspaceSettings from "@/components/WorkspaceSettings";
import { MobileMenuButton } from "@/components/MobileNav";
import { getActiveUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "Settings | BriefcaseOS",
};

export const dynamic = "force-dynamic";

const memberSinceFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default async function SettingsPage() {
  const user = await getActiveUser();

  return (
    <main className="app-main flex h-screen flex-1 flex-col overflow-y-auto bg-surface-bright dark:bg-background">
      <header className="sticky top-0 z-40 flex h-[64px] w-full items-center border-b border-outline-variant bg-surface-bright/80 px-lg backdrop-blur-md dark:border-outline-variant/40 dark:bg-background/80">
        <div className="flex min-w-0 items-center gap-md">
          <MobileMenuButton />
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface dark:text-surface-bright">
            Settings
          </h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[720px] space-y-lg p-lg lg:p-xl">
        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Profile
          </h2>
          <div className="flex items-start gap-md">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt=""
                className="h-14 w-14 rounded-full border border-outline-variant/30 object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-outline-variant/30 bg-primary/10">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
              </div>
            )}
            <dl className="grid flex-1 grid-cols-1 gap-md text-body-md sm:grid-cols-2">
              <div>
                <dt className="font-label-md text-on-surface-variant dark:text-surface-variant">
                  Name
                </dt>
                <dd className="text-on-surface dark:text-surface-bright">
                  {user.name ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="font-label-md text-on-surface-variant dark:text-surface-variant">
                  Email
                </dt>
                <dd className="break-all text-on-surface dark:text-surface-bright">
                  {user.email}
                </dd>
              </div>
              <div>
                <dt className="font-label-md text-on-surface-variant dark:text-surface-variant">
                  Member since
                </dt>
                <dd className="text-on-surface dark:text-surface-bright">
                  {memberSinceFmt.format(new Date(user.createdAt))}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Appearance
          </h2>
          <ThemeToggle />
        </section>

        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            AI Assistant
          </h2>
          <SettingsAiPanel />
        </section>

        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Notifications
          </h2>
          <NotificationSettings />
        </section>

        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Workspace
          </h2>
          <WorkspaceSettings />
        </section>

        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Account & security
          </h2>
          <SettingsAccountPanel />
        </section>

        <section className="space-y-sm rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            About BriefcaseOS
          </h2>
          <dl className="grid grid-cols-1 gap-md text-body-md sm:grid-cols-2">
            <div>
              <dt className="font-label-md text-on-surface-variant dark:text-surface-variant">
                Version
              </dt>
              <dd className="text-on-surface dark:text-surface-bright">0.1.0</dd>
            </div>
            <div>
              <dt className="font-label-md text-on-surface-variant dark:text-surface-variant">
                Help
              </dt>
              <dd>
                <Link href="/dashboard" className="font-semibold text-primary hover:underline">
                  Open dashboard
                </Link>
                {" · "}
                <span className="text-on-surface-variant dark:text-surface-variant">
                  Use the <strong>?</strong> guide in the sidebar
                </span>
              </dd>
            </div>
          </dl>
          <p className="text-body-sm leading-relaxed text-on-surface-variant dark:text-surface-variant">
            Legal AI workspace for contract review, compliance linting, and
            document editing. Built for counselors managing a contract portfolio.
          </p>
        </section>
      </div>
    </main>
  );
}
