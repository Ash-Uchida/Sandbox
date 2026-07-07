# LexCursor

AI workspace for corporate transactional law. Next.js (App Router) + TypeScript +
Tailwind, with Clerk for auth, Postgres + Prisma for data, and Playwright for E2E.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 (tokens in `tailwind.config.ts`, see `lexcursor_visual_language/DESIGN.md`) |
| Auth | Clerk (`@clerk/nextjs`) — env-gated |
| Database | PostgreSQL via Prisma |
| E2E tests | Playwright |

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
lib/                # prisma client, helpers
prisma/             # schema + migrations
tests/e2e/          # Playwright specs
docs/               # feature stories + backlog (see docs/MISSING_FEATURES.md)
```

The original static mockups remain under `project_dashboard/`,
`split_screen_editor/`, and `compliance_linter/` as visual reference.
