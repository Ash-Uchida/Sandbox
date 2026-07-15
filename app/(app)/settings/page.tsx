import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";
import { MobileMenuButton } from "@/components/MobileNav";
import { getActiveUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "Settings | BriefcaseOS",
};

export const dynamic = "force-dynamic";

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
        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-white/5">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Appearance
          </h2>
          <ThemeToggle />
        </section>

        <section className="space-y-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-white/5">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Profile
          </h2>
          <dl className="grid grid-cols-1 gap-md text-body-md">
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
              <dd className="text-on-surface dark:text-surface-bright">
                {user.email}
              </dd>
            </div>
          </dl>
        </section>

        <section className="space-y-sm rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-lg dark:border-outline-variant/40 dark:bg-white/5">
          <h2 className="font-headline-sm text-headline-sm text-on-surface dark:text-surface-bright">
            Account
          </h2>
          <p className="text-body-sm text-on-surface-variant dark:text-surface-variant">
            Password and security are managed through Clerk. Use your profile
            button (bottom-right) to sign out or manage your session.
          </p>
        </section>
      </div>
    </main>
  );
}
