# Architecture & Technical Decisions

This document records non-obvious technical decisions made during development,
including the reasoning behind each choice.

---

## Database: Docker (local PostgreSQL) over Neon

**Decision:** Use Docker to run PostgreSQL locally during development instead of Neon (cloud-hosted PostgreSQL).

**Why:** Chosen for the learning value. Docker teaches containerization concepts that apply across every backend project. Neon is faster to set up but hides how the database actually runs.

**Trade-off:** Slightly longer initial setup (~30–45 min one-time cost). No external service dependency during development.

---

## Next.js: Manual installation over create-next-app

**Decision:** Install Next.js and its dependencies manually instead of using `create-next-app`.

**Why:** `create-next-app` refused to run in the existing directory because of conflicting files (README.md, package.json, yarn.lock, .github/, etc.). Manual installation also provides better understanding of what each dependency does.

**Trade-off:** More steps up front, but full visibility into the setup.

---

## Next.js Router: App Router over Pages Router

**Decision:** Use the App Router (introduced in Next.js 13).

**Why:** App Router is the current standard. It uses React Server Components, has a cleaner data-fetching model, and is where Next.js development is focused going forward. Pages Router is in maintenance mode.

---

## Project structure: src/ directory

**Decision:** Place all application source code under `/src` instead of the project root.

**Why:** Keeps application code clearly separated from config files (next.config.ts, tailwind.config.ts, etc.) that live at the root. Cleaner organization as the project grows.

---

## Package manager: Yarn Berry (v4) with PnP

**Decision:** Use Yarn Berry (v4.14.1) with Plug'n'Play instead of npm or classic Yarn.

**Why:** Yarn Berry offers faster installs, strict dependency resolution, and better monorepo support if needed in the future. PnP eliminates the node_modules folder, making dependency resolution more explicit.
