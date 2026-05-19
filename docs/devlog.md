# Dev Log

Weekly engineering journal tracking progress, decisions, and learnings.

---

## Phase 0 Plan — Engineering Foundation

Target: functional foundation with auth, testing, database, and CI/CD in place.

| Week | Dates     | Focus                                                     | Status         |
| ---- | --------- | --------------------------------------------------------- | -------------- |
| 1    | May 11–15 | Project scaffolding, Next.js setup, code quality tooling  | ✅ Done        |
| 2    | May 18–22 | Testing setup (Vitest, React Testing Library, Playwright) | 🔄 In progress |
| 3    | May 25–29 | Database layer (Docker, PostgreSQL, Drizzle ORM)          | 📋 Planned     |
| 4    | Jun 01–05 | Authentication (Auth.js, registration, login, sessions)   | 📋 Planned     |
| 5    | Jun 08–12 | Protected routes, CI/CD (GitHub Actions), v0.0 wrap-up    | 📋 Planned     |

---

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
