"use client";

import { UserButton } from "@clerk/nextjs";

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function UserMenu() {
  if (!clerkEnabled) {
    return (
      <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20 bg-primary-container/20 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-[20px]">
          person
        </span>
      </div>
    );
  }

  return <UserButton />;
}
