import { prisma } from "./prisma";
import type { User } from "@prisma/client";

const DEMO_EMAIL = "demo@briefcaseos.test";

const clerkEnabled =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY;

/**
 * Returns the demo user (creating it if needed). Used when Clerk auth is off
 * or no one is signed in.
 */
export async function getOrCreateDemoUser(): Promise<User> {
  return prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: { email: DEMO_EMAIL, name: "Demo Counselor" },
  });
}

/**
 * The user whose data the app should show. When Clerk is configured and a user
 * is signed in, syncs them into the `users` table and returns that row.
 * Otherwise falls back to the demo user.
 */
export async function getActiveUser(): Promise<User> {
  if (clerkEnabled) {
    // Imported lazily so the app runs without Clerk configured.
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const { userId } = await auth();

    if (userId) {
      const cu = await currentUser();
      const email =
        cu?.primaryEmailAddress?.emailAddress ??
        cu?.emailAddresses?.[0]?.emailAddress ??
        `${userId}@clerk.local`;
      const name =
        [cu?.firstName, cu?.lastName].filter(Boolean).join(" ") ||
        cu?.username ||
        null;

      return prisma.user.upsert({
        where: { clerkId: userId },
        update: { email, name, imageUrl: cu?.imageUrl ?? null, lastLoginAt: new Date() },
        create: { clerkId: userId, email, name, imageUrl: cu?.imageUrl ?? null },
      });
    }
  }

  return getOrCreateDemoUser();
}
