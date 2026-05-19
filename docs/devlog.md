# Dev Log

Weekly engineering journal tracking progress, decisions, and learnings.

---

## Week 1 — May 12–16, 2026

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

### Next up

- Testing setup: Vitest, React Testing Library, Playwright
- Weekly devlog cadence: entry every Friday going forward
