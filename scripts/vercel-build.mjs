import { spawnSync } from "node:child_process";

function fail(message) {
  console.error(message);
  process.exit(1);
}

const url = process.env.DATABASE_URL;

if (!url) {
  fail(`
DATABASE_URL is missing on Vercel.

Add it in: Vercel → briefcase-os → Settings → Environment Variables
Use your Neon connection string (not localhost). Enable "Production".
`);
}

if (url.includes("localhost") || url.includes("127.0.0.1")) {
  fail(`
DATABASE_URL points to localhost. Vercel cannot reach your local Postgres.

Replace it with your hosted Neon URL in Vercel Environment Variables.
`);
}

const env = { ...process.env };

if (!env.DIRECT_DATABASE_URL && url.includes("-pooler")) {
  env.DIRECT_DATABASE_URL = url.replace("-pooler", "");
  console.log(
    "Using derived DIRECT_DATABASE_URL for migrations (Neon direct connection).",
  );
}

if (
  env.DIRECT_DATABASE_URL &&
  (env.DIRECT_DATABASE_URL.includes("localhost") ||
    env.DIRECT_DATABASE_URL.includes("-pooler"))
) {
  fail(`
DIRECT_DATABASE_URL must be Neon's direct connection (no localhost, no -pooler).
`);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npx", ["prisma", "migrate", "deploy"]);
run("npx", ["next", "build"]);
