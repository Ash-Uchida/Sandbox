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
   (enforced in `proxy.ts`); the top-bar shows the real user.

## Database (Postgres + Prisma)

1. Set `DATABASE_URL` in `.env.local` (local Postgres, or hosted Neon/Supabase).
2. Create the schema:
   ```bash
   npm run db:migrate      # creates tables from prisma/schema.prisma
   npm run db:studio       # optional: browse data
   ```
Schema lives in `prisma/schema.prisma` (`User`, `Contract`).

## Testing (Playwright)

```bash
npx playwright install     # one-time: download browsers
npm run test:e2e           # runs tests in tests/e2e (boots the dev server)
npm run test:e2e:ui        # interactive runner
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
lib/                # prisma client, helpers
prisma/             # schema + migrations
tests/e2e/          # Playwright specs
docs/               # feature stories + backlog (see docs/MISSING_FEATURES.md)
```

The original static mockups remain under `project_dashboard/`,
`split_screen_editor/`, and `compliance_linter/` as visual reference.
