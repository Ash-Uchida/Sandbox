import { test, expect } from "@playwright/test";

const clerkEnabled =
  !!process.env.CLERK_SECRET_KEY &&
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Open-mode navigation tests. Skipped when Clerk keys are set (routes require login).
test.describe("navigation (open mode, no Clerk)", () => {
  test.skip(
    clerkEnabled,
    "Navigation tests require open mode; unset Clerk keys or run auth.spec.ts instead",
  );

  test("root redirects to the dashboard", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(
      page.getByRole("link", { name: "LexCursor" }).or(page.getByText("LexCursor")),
    ).toBeVisible();
    await expect(page.getByText("Welcome back, Counselor.")).toBeVisible();
  });

  test("sidebar navigates between the three screens", async ({ page }) => {
    await page.goto("/dashboard");

    await page.getByRole("link", { name: "Document Editor" }).click();
    await expect(page).toHaveURL(/\/editor$/);

    await page.getByRole("link", { name: "Compliance Linter" }).click();
    await expect(page).toHaveURL(/\/linter$/);

    const dashboardLink = page.getByRole("link", { name: "Project Dashboard" });
    await dashboardLink.click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(dashboardLink).toHaveAttribute("aria-current", "page");
  });
});
