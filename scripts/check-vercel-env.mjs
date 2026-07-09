const url = process.env.DATABASE_URL;

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
