# Dev Log

Weekly engineering journal tracking progress, decisions, and learnings.

---

## Phase 0 Plan — Engineering Foundation

Target: functional foundation with auth, testing, database, and CI/CD in place.

### Initial Plan

| Week | Dates     | Focus                                                     | Status                                              |
| ---- | --------- | --------------------------------------------------------- | --------------------------------------------------- |
| 1    | May 11–15 | Project scaffolding, Next.js setup, code quality tooling  | ✅ Done                                             |
| 2    | May 18–22 | Testing setup (Vitest, React Testing Library, Playwright) | ✅ Done (Delivered @2026-05-19 - ahead of schedule) |
| 3    | May 25–29 | Database layer (Docker, PostgreSQL, Drizzle ORM)          | ✅ Done                                             |
| 4    | Jun 01–05 | Authentication (Auth.js, registration, login, sessions)   | ✅ Done (partial → completed in Week 5)             |
| 5    | Jun 08–12 | Protected routes, CI/CD (GitHub Actions), v0.1.0 wrap-up  | ✅ Done                                             |

### Scope Additions

| #   | Item                | Reason                                                                                                               | Status  |
| --- | ------------------- | -------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | Frontend Foundation | Planned in roadmap from the start but omitted from the weekly schedule — UI polish needed for portfolio presentation | ✅ Done |
| 2   | Test documentation  | Portfolio visibility into QA practices; documents test coverage, gaps, and decisions per auth flow                   | ✅ Done |

| Week | Dates         | Focus                                                                  | Status                                                                                |
| ---- | ------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 6    | Jun 15–19     | No work done                                                           | ⏭️ Skipped                                                                            |
| 7    | Jun 22–26     | Frontend Foundation, Vercel deployment, v0.1.0 wrap-up + retrospective | ✅ Done                                                                               |
| 8    | Jun 29–Jul 03 | Auth test coverage: integration + E2E tests                            | ✅ Done                                                                               |
| 9    | Jul 06–10     | Finish test docs, open PR, start auth error handling                   | ⚠️ Partial — PR open, CI failing                                                      |
| 10   | Jul 13–17     | Fix CI, merge PR, auth error handling, password confirmation, launch   | ⏭️ Skipped                                                                            |
| 11   | Jul 20–24     | Auth error handling, password confirmation, README, launch             | ⚠️ Partial — auth errors + password confirmation done; README and launch carried over |
| 12   | Jul 27–31     | README polish, public launch                                           | ⏭️ Skipped                                                                            |
| 13   | Aug 03–07     | README polish, public launch                                           | ⏭️ Skipped                                                                            |
| 14   | Aug 10–14     | README polish, public launch                                           | ⏭️ Skipped                                                                            |
| 15   | Aug 17–21     | README polish, public launch                                           | ⚠️ Partial — E2E showcase video added; README, Codecov, and launch carried over       |
| 16   | Aug 24–28     | README polish, Codecov, public launch                                  | 🔄 In progress                                                                        |

---

## Week 16 — Aug 24–28, 2026

### Planned

- README polish (description, GitHub Actions, Auth.js, Playwright browsers, video embed)
- Codecov integration
- Weekly ceremony
- Public launch

---

## Week 15 — Aug 17–21, 2026

### Planned

- README polish
- Public launch

### What was built

- Recorded E2E auth flow video using Playwright (`--video=on`) covering all auth test scenarios
- Added `docs/showcase/auth-flow-e2e.webm` (374KB, 32s) as a portfolio showcase asset

### Decisions made

- Video format chosen over Playwright HTML report — report is a developer tool, not recruiter-friendly
- All browser recordings concatenated into one video externally; Chromium used for recording
- File committed directly to repo at 374KB — no CDN needed at this size

### Planned for next week

- README polish (description, GitHub Actions, Auth.js, Playwright browsers, video embed)
- Codecov integration
- Public launch

---

## Week 14 — Aug 10–14, 2026

No work done this week.

---

## Week 13 — Aug 03–07, 2026

No work done this week.

---

## Week 12 — Jul 27–31, 2026

No work done this week.

---

## Week 11 — Jul 20–24, 2026

### Planned

- `fix/auth-error-handling`: friendly error messages for wrong credentials and duplicate email
- `feat/password-confirmation`: password confirmation field on register
- README polish
- Public launch

### What was built

- Login page: friendly error message shown on wrong credentials, email field preserved on error redirect
- Register page: password confirmation field added, friendly error messages for password mismatch and duplicate email, email preserved on error redirect
- E2E: 4 new test cases covering all new error scenarios (wrong password, preserved email on error, duplicate email, password mismatch)
- E2E: `browserName` Playwright fixture used in all test emails to prevent parallel-browser test collisions
- Roadmap backlog expanded: show/hide password toggle, inline password confirmation, test coverage tracking script, and UX items
- `fix/auth-error-handling` merged to main

### Decisions made

- Password mismatch and duplicate email handled server-side on form submit — inline real-time validation left as backlog item
- `error.cause.code` checked for Drizzle-wrapped Postgres errors (code `23505`) — Drizzle wraps the driver error, so the postgres code is not directly on the outer Error
- `browserName` Playwright fixture used in all test email addresses to prevent parallel-browser collisions in CI

### Learnings

- Drizzle ORM wraps the underlying postgres driver error — the postgres error code is on `error.cause.code`, not `error.code` directly
- Next.js `searchParams` is a `Promise<{...}>` in async page components (Next.js 15+ behavior) — must be awaited before reading query params
- Auth.js logs a `CredentialsSignin` error on every failed login — expected behavior; suppressing it requires custom error logging hooks

### Planned for next week

- README polish
- Public launch

---

## Week 10 — Jul 13–17, 2026

No work done this week.

---

## Week 9 — Jul 06–10, 2026

### Planned

- Finish test docs: `register.md` and `logout.md`
- Open PR: `test/auth-coverage` → `main`
- Start `fix/auth-error-handling`

### What was built

- `docs/tests/auth/register.md` and `docs/tests/auth/logout.md` written
- README: Testing section added, Vitest and Playwright added to tech stack, docs list updated
- `src/test/examples.test.tsx` renamed to `home.unit.test.tsx` to reflect test layer and scope
- CI: PostgreSQL service added so integration tests run against a real database in GitHub Actions
- PR `test/auth-coverage` opened

### Decisions made

- `DATABASE_URL` set at job level in CI — dotenv skips a missing `.env` and uses the environment value instead, no secrets needed for the test database

### Learnings

- GitHub Actions `services` block spins up a containerized Postgres for the job duration — health check options ensure the container is ready before steps run

### Planned for next week

- Fix remaining CI errors and merge PR `test/auth-coverage`
- `fix/auth-error-handling`
- `feat/password-confirmation`
- README polish
- Public launch

---

## Week 8 — Jun 29–Jul 03, 2026

### Planned

- Auth test coverage: integration tests for `createUser` / `verifyCredentials`, E2E tests for full auth flow

### What was built

- Integration tests for `createUser` and `verifyCredentials` — 5 tests, all passing
- E2E tests for register, login, and sign-out flows — 3 tests, all passing
- Coverage scoped to `src/lib/**` with 80% threshold — currently at 100%
- `playwright.global-setup.ts` added to clean up test users before each E2E run
- Fixed `vitest.config.ts` TypeScript error (`environmentMatchGlobs` removed in Vitest 4.x)
- `docs/tests/test-plan.md` and `docs/tests/auth/login.md` written

### Decisions made

- Coverage scoped to `src/lib/**` only — components and pages are covered by E2E, not unit/integration
- 80% threshold set as enforced minimum; currently exceeded at 100% given the small surface area
- `// @vitest-environment node` used per-file instead of the removed `environmentMatchGlobs` config option

### Learnings

- Auth.js `UntrustedHost` requires `trustHost: true` directly in `authConfig` — env var approach not reliably picked up in production mode
- After a Next.js server action redirect, Playwright must `waitForURL()` before interacting with the new page — otherwise form fields from the previous page get filled

### Planned for next week

- Finish test docs: `register.md` and `logout.md`
- Open PR: `test/auth-coverage` → `main`
- New branch: `fix/auth-error-handling`

---

## Week 7 — Jun 22–26, 2026

### Planned

- Frontend Foundation (UI polish on login, register, home pages)
- Vercel deployment
- v0.1.0 wrap-up + retrospective

### What was built

- shadcn/ui set up with Nova preset — component library foundation in place
- Design document added (`docs/design.md`) with design conventions and component guidelines
- Register, login, and home pages fully styled with shadcn/ui
- E2E tests updated to match new page headings
- `chore/initial-setup` (PR #2) and `feat/frontend-foundation` (PR #3) merged to main
- Vercel deployment live at `capytal-app.vercel.app`
- v0.1.0 tagged on GitHub
- Auth logic extracted into `src/lib/auth-service.ts` — prep for integration test coverage

### Decisions made

- shadcn/ui with Nova preset chosen for component library — consistent with design conventions, good portfolio presentation
- Auth logic separated into `auth-service.ts` — isolates credential operations from the Next.js auth wiring, making unit and integration testing straightforward

### Learnings

- shadcn/ui component installation modifies `globals.css` and `tailwind.config` — worth reviewing diffs after each add to avoid unintended style overrides

### Planned for next week

- Auth test coverage: integration tests for `createUser` / `verifyCredentials`, E2E tests for full auth flow

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
