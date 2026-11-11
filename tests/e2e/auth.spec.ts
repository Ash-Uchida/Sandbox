import { test, expect } from "@playwright/test";

const clerkEnabled =
  !!process.env.CLERK_SECRET_KEY &&
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

test.describe("protected routes (Clerk enabled)", () => {
  test.skip(
    !clerkEnabled,
    "Set CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to run auth tests",
  );

  test("redirects logged-out users from /dashboard to sign-in", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test("redirects logged-out users from /editor and /linter to sign-in", async ({
    page,
  }) => {
    for (const path of ["/editor", "/linter", "/library", "/settings"] as const) {
      await page.goto(path);
      await expect(page).toHaveURL(/\/sign-in/);
    }
  });

  test("sign-in page is reachable while logged out", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page).toHaveURL(/\/sign-in/);
    await expect(page.getByRole("main")).toBeVisible();
  });
});
