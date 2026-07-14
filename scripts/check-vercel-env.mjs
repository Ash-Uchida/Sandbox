const url = process.env.DATABASE_URL;
const directUrl = process.env.DIRECT_DATABASE_URL;

if (!url) {
  console.error(`
DATABASE_URL is missing on Vercel.

Add it in: Vercel → briefcase-os → Settings → Environment Variables
Use your Neon connection string (not localhost). Enable "Production".
`);
  process.exit(1);
}

if (url.includes("localhost") || url.includes("127.0.0.1")) {
  console.error(`
DATABASE_URL points to localhost. Vercel cannot reach your local Postgres.

Replace it with your hosted Neon URL in Vercel Environment Variables.
`);
  process.exit(1);
}

if (url.includes("-pooler") && !directUrl) {
  console.error(`
DATABASE_URL uses Neon's pooler (-pooler in the hostname).
Prisma migrations cannot run through the pooler.

In Neon → Connect → copy the "Direct connection" string and add it in Vercel as:
  DIRECT_DATABASE_URL

Keep DATABASE_URL as the pooled string for runtime queries.
Or set DATABASE_URL to the direct string for both (works for small apps).
`);
  process.exit(1);
}

if (directUrl && (directUrl.includes("localhost") || directUrl.includes("-pooler"))) {
  console.error(`
DIRECT_DATABASE_URL must be Neon's direct connection (no localhost, no -pooler).
`);
  process.exit(1);
}
