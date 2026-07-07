import { defineConfig, devices } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

// Load `.env.local` / `.env` so tests can detect whether Clerk is configured.
loadEnvConfig(process.cwd());

const PORT = 3000;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // In CI, boot the app automatically. Locally, run `npm run dev` first, then
  // `npm run test:e2e` (avoids Next.js dev-lock conflicts with Clerk).
  ...(process.env.CI
    ? {
        webServer: {
          command: "npm run dev",
          url: baseURL,
          timeout: 180_000,
          reuseExistingServer: false,
          stdout: /Ready in/i,
        },
      }
    : {}),
});
