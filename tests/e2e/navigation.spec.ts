import { test, expect } from "@playwright/test";

// These tests assume Clerk is NOT configured (open mode). With Clerk keys set,
// protected routes redirect to /sign-in and these would need a test session.

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
