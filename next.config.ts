import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained production server under `.next/standalone` so the
  // CI/CD pipeline can zip a runnable artifact (see .github/workflows/ci-cd.yml).
  output: "standalone",
  // Pin the workspace root so a stray lockfile in $HOME isn't picked up.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
