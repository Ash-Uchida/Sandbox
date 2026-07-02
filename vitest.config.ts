import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // Mirror the `@/*` -> `./*` path alias from tsconfig.json.
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    // Unit tests only. Playwright E2E specs live in tests/e2e and are run
    // separately via `npm run e2e`.
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
  },
});
