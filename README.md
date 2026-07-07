# BriefcaseOS

AI workspace for corporate transactional law. Next.js (App Router) + TypeScript +
Tailwind, with Clerk for auth, Postgres + Prisma for data, and Playwright for E2E.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 (tokens in `tailwind.config.ts`, see `briefcaseos_visual_language/DESIGN.md`) |
| Auth | Clerk (`@clerk/nextjs`) — env-gated |
| Database | PostgreSQL via Prisma |
| E2E tests | Playwright |
| MCP | Neon (Cursor dev tooling + optional runtime API) |
| Containers | Docker + Compose |

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values (optional to start)
npm run dev                  # http://localhost:3000
```

The app runs **without** any env vars: auth stays off and screens render with
sample content. Add credentials when you're ready (below).

## Routes

- `/` → redirects to `/dashboard`
- `/dashboard` — contract dashboard
- `/editor` — split-screen document editor
- `/linter` — compliance linter
- `/sign-in`, `/sign-up` — Clerk (active only when Clerk keys are set)

## Authentication (Clerk)

1. Create an app at <https://dashboard.clerk.com> and copy the API keys.
2. Put them in `.env.local`:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
3. Restart `npm run dev`. Now `/dashboard`, `/editor`, `/linter` require login
   (enforced in `middleware.ts`); the top-bar shows the real user.

## Database (Postgres + Prisma)

1. Set `DATABASE_URL` in `.env.local` (local Postgres, or hosted Neon/Supabase).
2. Create the schema:
   ```bash
   npm run db:migrate      # creates tables from prisma/schema.prisma
   npm run db:studio       # optional: browse data
   ```
Schema lives in `prisma/schema.prisma` (`User`, `Contract`).

## MCP (Phase 4)

**Cursor dev tooling** — `.cursor/mcp.json` points at [Neon MCP](https://mcp.neon.tech/mcp).
Reload Cursor after cloning. Authenticate Neon when prompted (or run `npx neonctl init`).

**Runtime API** — optional integration for the app backend:

1. Set in `.env` / `.env.local`:
   - `MCP_SERVER_URL=https://mcp.neon.tech/mcp`
   - `NEON_API_KEY` (or `MCP_API_KEY`) from the Neon console
2. While logged in, `GET /api/mcp` lists tools exposed by the server (health check).

## Docker (Phase 5)

Run the full stack (Postgres + app) with one command:

```bash
cp .env.example .env    # fill Clerk keys if you want auth in the container
docker compose up --build
```

- App: <http://localhost:3000>
- Postgres: `localhost:5432` (user/pass/db: `postgres` / `postgres` / `briefcaseos`)
- Migrations run automatically on container start (`docker-entrypoint.sh`).

## Testing

Unit tests (Vitest) cover pure logic and need no database:

```bash
npm test                   # run unit tests once (tests/unit)
npm run test:watch         # watch mode
```

End-to-end tests (Playwright) drive the real app:

```bash
npx playwright install     # one-time: download browsers
npm run dev                # in one terminal (required locally)
npm run test:e2e           # in another — auth + navigation specs
npm run test:e2e:ui        # interactive runner
```

Locally, start `npm run dev` first (Playwright does not auto-boot the app unless
`CI=true`). With Clerk keys in `.env.local`, `tests/e2e/auth.spec.ts` verifies
logged-out redirects to `/sign-in`; navigation tests run in CI where Clerk is off.

The e2e suite talks to the database, so set `DATABASE_URL` (and run
`npm run db:migrate && npm run db:seed`) before running it.

## CI/CD

A single GitHub Actions pipeline lives in
[`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml). It runs on every
pull request and every push to `main`:

1. **Lint** — `npm run lint` (ESLint / Next core-web-vitals).
2. **Unit test** — `npm test` (Vitest).
3. **Build** — `npm run build` (Next.js standalone output).
4. **E2E** — `npm run e2e` (Playwright) against a Postgres service container.
5. **Package** — zip the standalone build into a runnable artifact.
6. **Release** — on `main`, publish the zip as a GitHub Release and deploy the
   Playwright report to GitHub Pages.

So a PR clearly shows whether it's ready for `main`, and whatever lands on
`main` is packaged and released automatically.

## Deploy to Vercel (live app)

GitHub Pages in this repo publishes the **Playwright test report**, not the app.
Use Vercel for the live BriefcaseOS site.

### 1. Connect the repo

1. Go to [vercel.com/new](https://vercel.com/new) and import `Ash-Uchida/Sandbox` (project name: **briefcase-os**).
2. Framework should auto-detect **Next.js**. Root directory: `.` (repo root).
3. Build command: uses `vercel-build` (`prisma migrate deploy && next build`).

### 2. Add environment variables (Vercel dashboard)

Copy from your local `.env` / `.env.local` into **Settings → Environment Variables**
for **Production** (and Preview if you want PR previews):

| Variable | Required |
|---|---|
| `DATABASE_URL` | Yes — Neon connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes |
| `CLERK_SECRET_KEY` | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Optional (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Optional (`/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Optional (`/dashboard`) |
| `MCP_SERVER_URL`, `NEON_API_KEY` | Optional |

Local `.env` is **not** uploaded to git or Vercel automatically — paste each value
into the Vercel UI.

### 3. Configure Clerk for production

In [Clerk Dashboard](https://dashboard.clerk.com) → your app → **Domains**:

- Add your Vercel URL (e.g. `https://briefcase-os.vercel.app` or your team subdomain)
- Allow redirect URLs: `https://briefcase-os.vercel.app/*` (use your actual domain)

Redeploy after saving env vars and Clerk domains.

### 4. Deploy from CLI (optional)

```bash
npm i -g vercel
vercel login
vercel link
vercel --prod
```

## Project layout

```
app/
  (app)/            # authenticated app shell (shared sidebar layout)
    dashboard/
    editor/
    linter/
  sign-in/  sign-up/
  layout.tsx        # root layout (fonts, Clerk provider)
components/          # Sidebar, UserMenu, ...
lib/                # prisma client, mcp client, helpers
prisma/             # schema + migrations
.cursor/mcp.json    # Neon MCP for Cursor (no secrets in repo)
Dockerfile          # production image (standalone Next.js)
docker-compose.yml  # local app + Postgres
tests/e2e/          # Playwright specs
docs/               # feature stories + backlog (see docs/MISSING_FEATURES.md)
```

The original static mockups remain under `project_dashboard/`,
`split_screen_editor/`, and `compliance_linter/` as visual reference.
