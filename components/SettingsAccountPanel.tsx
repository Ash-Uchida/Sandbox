"use client";

import { UserButton } from "@clerk/nextjs";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SettingsAccountPanel() {
  if (!clerkEnabled) {
    return (
      <p className="text-body-sm leading-relaxed text-on-surface-variant dark:text-surface-variant">
        Authentication is not configured. The app is running in demo mode with a
        local demo user.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-body-sm leading-relaxed text-on-surface-variant dark:text-surface-variant">
          Manage your password, connected accounts, and active sessions through
          Clerk.
        </p>
        <p className="text-body-sm text-on-surface-variant dark:text-surface-variant">
          You can also use the profile button in the sidebar footer.
        </p>
      </div>
      <div className="flex shrink-0 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface-container-low px-4 py-3 dark:border-outline-variant/40 dark:bg-surface-container-low">
        <UserButton />
      </div>
    </div>
  );
}
