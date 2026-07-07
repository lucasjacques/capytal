# Capytal

## Tech Stack

### Frontend

- **Next.js** — React framework for the web application and routing
- **React** — UI library for building interactive interfaces
- **TypeScript** — Static typing and improved developer experience
- **shadcn/ui** — Accessible, customizable component library built on Radix UI and Tailwind
- **Lucide** — Icon library, default icon set for shadcn/ui

### Backend

- **Next.js API Routes / Server Actions** — Backend logic and server-side features

### Database

- **PostgreSQL** — Relational database for persistent data storage
- **Drizzle ORM** — Type-safe ORM for database schema and queries

### Infrastructure & Deployment

- **Vercel** — Hosting, deployment, and serverless infrastructure

### Development Tools

- **ESLint** — Code linting and quality enforcement
- **Prettier** — Code formatting
- **Git & GitHub** — Version control and collaboration

## Getting Started

### Prerequisites

Make sure you have the following installed before running the project:

- **Node.js** `v22.x` or higher — [nodejs.org](https://nodejs.org)
- **Yarn** `v4.x` (Berry) — enabled via Corepack (`corepack enable`)

### Local Development

This project uses Docker for the local PostgreSQL database. Install Docker Desktop before continuing — on Windows, enable the WSL 2 backend and use Linux containers.

If Docker is slow, increase CPU/RAM in Docker Desktop settings.

### Installation

```bash
# Clone the repository
git clone https://github.com/lucasjacques/capytal.git
cd capytal

# Install dependencies
yarn install
```

### Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Then configure each variable:

- **`DATABASE_URL`** — points to your PostgreSQL instance. If using Docker, the value in `.env.example` works out of the box after `docker compose up -d`.
- **`AUTH_SECRET`** — secret key for signing Auth.js tokens. Generate one with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### Database Setup

Start the database and apply migrations:

```bash
docker compose up -d
yarn db:migrate
```

Only needed once per environment (or after schema changes).

### Running Locally

With Docker running and migrations applied, start the dev server:

```bash
yarn dev
```

The app will be available at `http://localhost:3000`.

## AI-Assisted Development

Capytal adopts an AI-assisted development workflow through “Cinnamon, the Capybara” — a shared AI agent/persona used across tools such as ChatGPT and Claude Code.

The agent is responsible for supporting architecture discussions, implementation planning, documentation, development workflows, and product decisions while maintaining a consistent project context and communication style across the development environment.

This approach helps accelerate iteration, improve development consistency, and explore modern AI-augmented software engineering practices.

## Documentation

Project-related documentation is organized inside the `/docs` directory.

Current documents:

- [`vision.md`](./docs/vision.md)  
  Defines the long-term vision, goals and purpose of Capytal.

- [`roadmap.md`](./docs/roadmap.md)  
  Describes the planned project phases, milestones and feature evolution.

- [`decisions.md`](./docs/decisions.md)  
  Records non-obvious technical and architectural decisions with their reasoning.

- [`devlog.md`](./docs/devlog.md)  
  Weekly engineering journal tracking progress, decisions, and learnings.

- [`design.md`](./docs/design.md)  
  Visual conventions — typography, color palette, component styles, and UI libraries.

## Testing

Capytal adopts a multi-layer testing strategy covering business logic, server-side behavior, and full user flows end-to-end.

| Layer       | Tool                      | Scope                                  |
| ----------- | ------------------------- | -------------------------------------- |
| Unit        | Vitest + Testing Library  | UI components and utility logic        |
| Integration | Vitest (Node environment) | Auth service functions against real DB |
| E2E         | Playwright (Chromium)     | Register, login, and sign-out flows    |

Tests run automatically on every push via the pre-push hook (unit + integration) and on every push/PR via CI (unit + integration + E2E).

**Test documentation:**

- [`tests/test-plan.md`](./docs/tests/test-plan.md) — overall strategy, layers, scope, and CI integration
- [`tests/auth/login.md`](./docs/tests/auth/login.md) — login flow test cases and coverage map
- [`tests/auth/register.md`](./docs/tests/auth/register.md) — register flow test cases and coverage map
- [`tests/auth/logout.md`](./docs/tests/auth/logout.md) — sign out flow test cases and coverage map

## Contributing

- Run `yarn test:e2e` manually before pushing any UI-related changes — E2E tests are not bound to the pre-push hook due to server dependency
- Unit tests run automatically on every push via the pre-push hook
- CI runs unit tests + Chromium E2E on every push and PR
