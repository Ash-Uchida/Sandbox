# LexCursor — Missing Features Inventory

The single source of truth for what LexCursor still needs. Each row maps to a
**story** (an independently deployable feature) under
[`docs/features/`](features/). Stories follow
[`docs/features/_TEMPLATE.md`](features/_TEMPLATE.md).

> Status legend: **MISSING** (nothing exists) · **PARTIAL** (some exists) ·
> **THIN** (mockup / placeholder only).
> Severity: **BLOCKER** (nothing real ships without it) · **MAJOR** · **MINOR**.

Current reality: 3 static HTML mockups (`project_dashboard`,
`split_screen_editor`, `compliance_linter`) + a landing page. No framework,
backend, auth, or persistence yet. See [GAMEPLAN.md](../GAMEPLAN.md) for phasing.

---

## §1 Foundation

| ID | Feature | Status | Severity | Effort | Story |
|---|---|---|---|---|---|
| F1.1 | Project scaffolding (Next.js + Tailwind, screens → routes) | THIN | BLOCKER | S | [features/foundation/F1.1-project-scaffolding.md](features/foundation/F1.1-project-scaffolding.md) |
| F1.2 | Authentication & session management | MISSING | BLOCKER | M | [features/foundation/F1.2-authentication.md](features/foundation/F1.2-authentication.md) |
| F1.3 | Backend API + database (Postgres/Prisma) | MISSING | BLOCKER | M | _todo_ |
| F1.4 | Org / workspace & role-based access control | MISSING | MAJOR | M | _todo_ |
| F1.5 | Dockerized dev + deploy environment | MISSING | MAJOR | S | _todo_ |
| F1.6 | CI/CD (Playwright in GitHub Actions, deploy) | MISSING | MAJOR | S | _todo_ |

## §2 Contract Management

| ID | Feature | Status | Severity | Effort | Story |
|---|---|---|---|---|---|
| C2.1 | Contract dashboard (live data) | THIN | MAJOR | M | [features/contract-management/C2.1-contract-dashboard.md](features/contract-management/C2.1-contract-dashboard.md) |
| C2.2 | Contract upload & ingestion pipeline | MISSING | MAJOR | M | _todo_ |
| C2.3 | Contract detail & version history | MISSING | MAJOR | M | _todo_ |
| C2.4 | Full-text & semantic contract search | MISSING | MINOR | M | _todo_ |

## §3 Document Editor

| ID | Feature | Status | Severity | Effort | Story |
|---|---|---|---|---|---|
| E3.1 | Split-screen document editor (live) | THIN | MAJOR | L | _todo_ |
| E3.2 | AI Inspector panel (clause suggestions) | MISSING | MAJOR | L | _todo_ |
| E3.3 | Track changes & collaborative editing | MISSING | MINOR | L | _todo_ |

## §4 Compliance Linter

| ID | Feature | Status | Severity | Effort | Story |
|---|---|---|---|---|---|
| L4.1 | Compliance analysis engine | THIN | MAJOR | L | _todo_ |
| L4.2 | Rule pack management (per jurisdiction) | MISSING | MINOR | M | _todo_ |
| L4.3 | Risk scoring & reporting | MISSING | MINOR | M | _todo_ |

## §5 Platform & MCP

| ID | Feature | Status | Severity | Effort | Story |
|---|---|---|---|---|---|
| P5.1 | MCP integration (tooling vs runtime — scope first) | MISSING | MINOR | M | _todo_ |
| P5.2 | Observability (metrics, logs, traces, alerts) | MISSING | MINOR | S | _todo_ |
| P5.3 | Audit log (privilege-sensitive access trail) | MISSING | MAJOR | M | _todo_ |

---

## How to add a story

1. Pick the next undefined row (`_todo_`) or add a new row here first.
2. Copy [`features/_TEMPLATE.md`](features/_TEMPLATE.md) into the right
   feature subfolder as `{ID}-{kebab-name}.md`.
3. Run the planning skill (`feature-planning`) — it drafts the story with a
   stronger reasoning model. Review, then link it from this table.
