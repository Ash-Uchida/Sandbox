import type { Metadata } from "next";
import UserMenu from "@/components/UserMenu";
import { getActiveUser } from "@/lib/user";

export const metadata: Metadata = {
  title: "Settings | BriefcaseOS",
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getActiveUser();

  return (
    <main className="flex-1 h-screen overflow-y-auto relative flex flex-col">
      <header className="sticky top-0 w-full z-40 flex justify-between items-center h-[64px] px-lg bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant">
        <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
          Settings
        </h1>
        <UserMenu />
      </header>

      <div className="p-lg lg:p-xl max-w-[720px] mx-auto w-full space-y-lg">
        <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 space-y-md">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Profile
          </h2>
          <dl className="grid grid-cols-1 gap-md text-body-md">
            <div>
              <dt className="font-label-md text-on-surface-variant">Name</dt>
              <dd className="text-on-surface">{user.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="font-label-md text-on-surface-variant">Email</dt>
              <dd className="text-on-surface">{user.email}</dd>
            </div>
          </dl>
        </section>

        <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 space-y-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Account
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            Password, security, and connected accounts are managed through Clerk.
            Use the profile menu in the top bar to sign out or manage your session.
          </p>
        </section>
      </div>
    </main>
  );
}
