# Dev Log

Weekly engineering journal tracking progress, decisions, and learnings.

---

## Phase 0 Plan — Engineering Foundation

Target: functional foundation with auth, testing, database, and CI/CD in place.

### Initial Plan

| Week | Dates     | Focus                                                     | Status                                               |
| ---- | --------- | --------------------------------------------------------- | ---------------------------------------------------- |
| 1    | May 11–15 | Project scaffolding, Next.js setup, code quality tooling  | ✅ Done                                              |
| 2    | May 18–22 | Testing setup (Vitest, React Testing Library, Playwright) | ✅ Done (Delivered @2026-05-19 - ahead of schedule)  |
| 3    | May 25–29 | Database layer (Docker, PostgreSQL, Drizzle ORM)          | ✅ Done                                              |
| 4    | Jun 01–05 | Authentication (Auth.js, registration, login, sessions)   | ⚠️ Partial — backend done, login/register UI pending |
| 5    | Jun 08–12 | Protected routes, CI/CD (GitHub Actions), v0.1.0 wrap-up  | ✅ Done                                              |

### Scope Additions

| #   | Item                | Reason                                                                                                               | Status     |
| --- | ------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1   | Frontend Foundation | Planned in roadmap from the start but omitted from the weekly schedule — UI polish needed for portfolio presentation | 📋 Planned |

| Week | Dates     | Focus                                                                  | Status         |
| ---- | --------- | ---------------------------------------------------------------------- | -------------- |
| 6    | Jun 15–19 | No work done                                                           | ⏭️ Skipped     |
| 7    | Jun 22–26 | Frontend Foundation, Vercel deployment, v0.1.0 wrap-up + retrospective | 🔄 In progress |

---

## Week 6 — Jun 15–19, 2026

No work done this week.

## Week 5 — Jun 08–12, 2026

### Planned

- Login and registration pages (UI) — carried over from Week 4
- Protected routes working end-to-end
- CI/CD with GitHub Actions
- v0.1.0 wrap-up

### What was built

- Login, registration, and sign-out flows completed (carried over from Week 4)
- GitHub Actions CI pipeline set up: lint, type check, unit tests, and E2E
- Husky pre-push hook added — runs unit tests before every push
- Playwright E2E tests updated to test auth redirect behavior instead of page content
- `webServer` added to `playwright.config.ts` — Playwright starts the server automatically before E2E tests
- CI E2E restricted to Chromium only (Firefox and WebKit run locally)
- `AUTH_TRUST_HOST=true` added to fix Auth.js `UntrustedHost` error in CI
- Contributing section added to README

### Decisions made

- Vitest configured to exclude `src/e2e/**` — prevents Playwright test files from being picked up by the unit test runner
- E2E tests not bound to the pre-push hook — server dependency makes it impractical; CI covers it instead

### Learnings

- Corepack must be enabled before `setup-node` in GitHub Actions, otherwise Yarn cache detection fails
- Playwright needs a running server — `webServer` config handles this automatically in both local and CI environments
- Auth.js blocks requests from untrusted hosts by default; `AUTH_TRUST_HOST=true` is required in non-production environments where the host isn't in the allowlist

### Planned for next week

- Vercel deployment
- Merge `chore/initial-setup` → `main`
- Tag `v0.1.0`
- Week 6: Frontend Foundation (Tailwind polish on login, register, and home pages)

## Week 4 — Jun 01–05, 2026

### Planned

- Authentication: Auth.js setup, credentials provider, registration and login flow, protected routes

### What was built

- Auth.js v5 (beta) installed and configured with credentials provider
- API route `/api/auth/[...nextauth]` created
- Edge-compatible `auth.config.ts` split from main `auth.ts` to support Next.js 16 proxy
- `src/proxy.ts` created (Next.js 16 renamed middleware → proxy)
- Environment setup improved: `AUTH_SECRET` generation documented in README
- Docker local development instructions added to README

> Full authentication flow not completed — login/register UI not delivered and carried over to Week 5.

### Decisions made

- Split auth config into `auth.config.ts` (edge-safe) and `auth.ts` (Node.js) — required because Next.js 16 proxy runs in Edge Runtime, which doesn't support Node.js built-ins like `bcryptjs`

### Learnings

- Next.js 16 renamed `middleware.ts` → `proxy.ts` and requires export named `proxy` or default
- Edge Runtime is a restricted environment — no Node.js built-ins, no database drivers, JWT-only
- Auth.js v5 handles the JWT verification in the proxy layer; actual credential checks stay server-side

### Planned for next week

- Login and registration pages (UI)
- Protected routes working end-to-end
- CI/CD with GitHub Actions
- v0.1.0 wrap-up

## Week 3 — May 25–29, 2026

### Planned

- Database layer (Docker, PostgreSQL, Drizzle ORM)

### What was built

- Database layer fully completed: Docker + PostgreSQL container, Drizzle ORM configured, `users` schema defined, first migration applied

### Decisions made

- JWT strategy chosen over database sessions for Auth (simpler for MVP stage)
- `users` table kept minimal — only what auth needs: `id`, `email`, `passwordHash`, `createdAt`

### Learnings

- Drizzle generates human-readable migration filenames (e.g. `0000_faithful_whizzer.sql`) — these should always be committed alongside schema changes
- Docker volumes persist database data across container restarts

### Planned for next week

- Authentication: Auth.js setup, credentials provider, registration and login flow, protected routes

## Week 2 — May 18–22, 2026

### Planned

- Testing setup (Vitest, React Testing Library, Playwright)

### What was built

- Testing setup: Vitest + React Testing Library for unit tests, Playwright for E2E tests across Chromium, Firefox, and WebKit
- First unit test and E2E test written and passing
- Docker + PostgreSQL: containerized local database with `docker-compose.yml`
- Started database layer: Drizzle ORM installed, `drizzle.config.ts` and `src/db/index.ts` created (migration pending)

> Delivered testing setup ahead of schedule — started database layer (Week 3 scope) within the same week.

### Decisions made

- Vitest chosen over Jest — faster, native TypeScript support, no extra config for ESM
- Playwright configured to run against all three major browser engines
- Docker chosen over Neon for PostgreSQL — more educational, teaches containerization

### Learnings

- Yarn Berry requires manual installation of peer packages (e.g. `vite`, `@testing-library/dom`)
- Browser binaries are stored globally in `AppData`, not in the project — never committed
- `.env` holds real credentials, `.env.example` is the committed template

### Planned for next week

- Complete database layer: schema, first migration, verify connection
- Start authentication: Auth.js setup, registration and login flow

## Week 1 — May 11–15, 2026

### What was built

- Initialized Yarn Berry workspace with project scaffolding
- Set up Next.js 16 manually with TypeScript, Tailwind v4, App Router, and `src/` directory structure
- Configured code quality tooling: Prettier, ESLint 9 (flat config), Husky pre-commit hook with lint-staged

### Decisions made

- Chose Docker over Neon for PostgreSQL — more educational, teaches containerization
- Skipped `create-next-app` due to conflict with existing files — manual install gave better visibility into each dependency
- Switched Yarn linker from PnP to `node-modules` — Turbopack incompatibility with PnP required the change

### Learnings

- Yarn Berry (v4) removed classic shorthands like `yarn i` — commands must be explicit
- `noEmit: true` in tsconfig tells TypeScript to only type-check, not compile — Next.js handles compilation
- ESLint 9 uses a new flat config format; bridging old-style configs (like `next/core-web-vitals`) via `FlatCompat` has rough edges

### Planned for next week

- Testing setup: Vitest, React Testing Library, Playwright
- Weekly devlog cadence: entry every Friday going forward
