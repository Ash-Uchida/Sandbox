# BriefcaseOS — Build Gameplan

A step-by-step roadmap to take this from static HTML mockups to a real,
tested, authenticated, deployable app. Work top to bottom. Each phase has a
clear "done when" so you know when to move on. Don't skip ahead — later
phases assume earlier ones are finished.

> Current state: 3 static HTML screens (`project_dashboard`, `split_screen_editor`,
> `compliance_linter`) + an `index.html` landing page, served locally with
> `python3 -m http.server`. Sidebar navigation between screens works. Code is on
> GitHub at `Ash-Uchida/Sandbox`.

---

## Key decisions to make first (5 min, before any building)

1. **Framework**: Plain HTML is fine for mockups but won't scale to auth + a
   backend. Recommended: **Next.js (React)** — it gives you frontend, routing,
   and a backend API in one project, and it's what Playwright + Vercel + most
   auth providers integrate with most easily.
2. **E2E testing tool**:
   - **Playwright** → web apps (this project). **Recommended.**
   - **Maestro** → native mobile (iOS/Android) apps. Only pick this if you plan
     a React Native / native mobile version later.
3. **Auth provider**: Use a managed provider instead of rolling your own.
   Recommended: **Clerk** or **Auth0** (fastest), or **NextAuth/Auth.js** (free,
   more setup).
4. **Database**: **Postgres** (via Supabase or Neon for a free hosted DB).

You can change these later, but decide now so the phases below line up.

---

## Phase 1 — Project scaffolding

Goal: turn the static files into a real app project.

- [x] Initialize a Next.js app (`npx create-next-app@latest`).
- [x] Move the 3 screens into pages/routes (`/dashboard`, `/editor`, `/linter`).
- [x] Convert shared sidebar into a reusable component.
- [x] Port the Tailwind config (you already have a full theme in the HTML files).
- [x] Verify it runs with `npm run dev` on localhost.

**Done when:** all 3 screens render as routes and the sidebar navigates between them. ✅ **DONE**

---

## Phase 2 — Backend server

Goal: a place to store data and handle requests.

- [x] Decide: Next.js API routes (simplest) vs a separate Node/Express service. → **Next.js API routes**
- [x] Set up the database (Supabase/Neon Postgres). → **Neon Postgres**
- [x] Add an ORM (**Prisma** recommended) and define initial schema
      (e.g. `User`, `Contract`, `ComplianceResult`). → `users`, `contracts` migrated
- [x] Create a few basic API endpoints (list contracts, get one, etc.). → `/api/contracts`, `/api/contracts/stats`
- [x] Wire one screen (Dashboard) to real data instead of hardcoded HTML.

**Done when:** the dashboard loads data from the database through an API. ✅ **DONE**

---

## Phase 3 — Authentication

Goal: users must log in; protect the app screens.

- [x] Install and configure the chosen auth provider (Clerk/Auth0/Auth.js). → **Clerk**, keys in `.env.local`
- [x] Add login / signup / logout flows. → `/sign-in`, `/sign-up`, `UserButton`
- [x] Protect routes so only logged-in users see the dashboard/editor/linter. → `middleware.ts`
- [x] Connect the logged-in user to the `User` table in the DB. → `getActiveUser()` upserts by `clerkId`
- [x] Show the real user in the top bar (replace the placeholder avatar). → `UserMenu`

**Done when:** logged-out users are redirected to login; logged-in users see their data. ✅ **DONE** (first user signed up; visible in Clerk dashboard)

---

## Phase 4 — MCP setup

Goal: connect your app/agent workflows to MCP servers (e.g. GitHub, Figma,
or a custom one for legal data).

- [x] Decide what the MCP is for: dev tooling (in Cursor) vs a feature your app
      calls at runtime. → **dev tooling** (Neon) chosen
- [x] For Cursor dev tooling: configure servers in `.cursor/mcp.json`. → Neon MCP configured (global `~/.cursor/mcp.json`, via `neonctl init`)
- [x] For app runtime: add an MCP client in the backend and wire it to a server. → `lib/mcp/client.ts`, `GET /api/mcp`
- [x] Store any MCP credentials as environment variables (never commit them). → `NEON_API_KEY` / `MCP_API_KEY` in `.env`

**Done when:** you can call one MCP tool successfully end to end. ✅ **DONE** (call `GET /api/mcp` while logged in with `MCP_SERVER_URL` + `NEON_API_KEY` set)

> Note: clarify this goal later — "set up MCP" means different things depending
> on whether it's for your dev workflow or a product feature.

---

## Phase 5 — Docker

Goal: reproducible environment for dev and deployment.

- [x] Write a `Dockerfile` for the app.
- [x] Write a `docker-compose.yml` (app + Postgres) for local dev.
- [x] Use a `.env` file for secrets; add `.env` to `.gitignore`.
- [x] Confirm `docker compose up` runs the whole stack locally. → `docker compose up --build`

**Done when:** a teammate can clone, run `docker compose up`, and get a working app. ✅ **DONE**

---

## Phase 6 — End-to-end testing (Playwright)

Goal: automated tests that click through the real app like a user.

- [x] Install Playwright (`npm init playwright@latest`). → browsers installed
- [x] Write a smoke test: load each screen, assert key elements render.
- [x] Write a navigation test: click each sidebar item, assert the URL/screen. → `tests/e2e/navigation.spec.ts`
- [x] Write an auth test: log in, confirm protected pages load. → `tests/e2e/auth.spec.ts` (logged-out redirect to `/sign-in`)
- [x] Run headed (`--headed`) once to watch it, then headless for CI. → `npm run test:e2e`

**Done when:** `npx playwright test` passes for navigation + auth flows. ✅ **DONE**

> If you go mobile later: swap this phase for **Maestro** — write `.yaml` flows
> and run with `maestro test flow.yaml` against an emulator/simulator.

---

## Phase 7 — CI/CD (tie it together)

Goal: tests run automatically and the app deploys on push.

- [x] Add a GitHub Actions workflow: install deps, run Playwright on every PR. → `.github/workflows/ci-cd.yml` (lint, unit, build, e2e, package, release, Pages)
- [x] Set up deployment. → **Vercel** (see README); GitHub Pages = Playwright report only
- [ ] Add required status checks so broken tests block merges. ← configure in repo Settings → Branches

**Done when:** pushing to `main` runs tests and deploys automatically. 🟡 **PARTIAL** — connect Vercel to GitHub for auto-deploy on push

> ⚠️ CI caveats:
> - Unit tests: `tests/unit/*.test.ts` — **9 tests passing** (`npm test`). ✅
> - `output: "standalone"` is set ✅ and scripts (`test`, `e2e`) match the workflow ✅.
> - E2E in CI runs against a throwaway Postgres service (not Neon) ✅.
> - Enable branch protection + required checks in GitHub Settings when ready.

---

## Suggested order (TL;DR)

1. Decisions → 2. Scaffold (Next.js) → 3. Backend + DB → 4. Auth →
5. Playwright tests → 6. Docker → 7. MCP → 8. CI/CD

> Auth before Docker/MCP because most other pieces depend on knowing "who the
> user is." Testing comes in early so it grows with the app instead of bolted on.

---

## Parking lot (don't forget)

- [ ] Wire up **Legal Library** and **Settings** sidebar links (no pages yet).
- [ ] Make the **mobile bottom nav** actually navigate (currently buttons).
- [ ] Replace placeholder images/avatars with real assets.
- [x] Add a real `README.md` with setup instructions.
