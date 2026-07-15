# Test Plan — Capytal v0.1.0

## Objective

Validate the authentication feature end-to-end — from the database layer up
to the UI — using a layered testing strategy that covers unit, integration,
and E2E concerns. Each layer targets a different risk surface and is chosen
for what it can verify most efficiently.

---

## Scope

**In scope (Phase 0):**

- User registration (`createUser`)
- Credential verification (`verifyCredentials`)
- Login flow (form → session → redirect)
- Sign-out flow
- Protected route behavior (unauthenticated redirect)

**Out of scope (Phase 0):**

- Rate limiting and brute force protection
- Session expiry and token refresh
- Email confirmation flow (tracked separately)
- Password reset
- OAuth providers

---

## Testing Layers

### Unit — not applicable for Phase 0 auth

The core auth logic (`createUser`, `verifyCredentials`) depends on a real
database and bcrypt — there are no pure functions worth isolating at this
stage. Unit tests will become relevant in Phase 1 when business logic
(allocation calculations, buy targets) can be tested without side effects.

### Integration

**Tool:** Vitest with `@vitest-environment node`  
**Location:** `src/test/auth.integration.test.ts`  
**Database:** real local PostgreSQL (Docker)

Integration tests target `src/lib/auth-service.ts` directly, bypassing the
HTTP and framework layers. They verify that the database operations and
password hashing behave correctly in isolation from Next.js.

Each test runs against a real database connection. A test email
(`test@capytal.test`) is used and cleaned up in `afterEach` to keep tests
independent.

**What is tested:**

- `createUser` stores a user with a bcrypt-hashed password
- `createUser` rejects duplicate emails
- `verifyCredentials` returns a user object for valid credentials
- `verifyCredentials` returns null for a wrong password
- `verifyCredentials` returns null for an unknown email

### E2E

**Tool:** Playwright (Chromium)  
**Location:** `src/e2e/auth.spec.ts`  
**Server:** production build (`yarn build && yarn start`) via `webServer` config

E2E tests drive a real browser against the full application stack. They
verify the user-facing flows from form interaction to URL navigation,
covering what integration tests cannot: page redirects, session cookies,
and middleware-enforced route protection.

A `globalSetup` script (`playwright.global-setup.ts`) cleans all
`%@capytal.test` users from the database before each run to ensure a
consistent starting state.

**What is tested:**

- Registering an account redirects to `/login`
- Logging in with valid credentials redirects to `/`
- Signing out redirects to `/login`
- Unauthenticated users visiting `/` are redirected to `/login`

---

## CI Integration

Tests run automatically on every push via GitHub Actions:

| Step             | Tool       | Command         |
| ---------------- | ---------- | --------------- |
| Lint             | ESLint     | `yarn lint`     |
| Type check       | TypeScript | `yarn build`    |
| Unit/Integration | Vitest     | `yarn test:run` |
| E2E              | Playwright | `yarn test:e2e` |

E2E tests in CI are restricted to Chromium. Firefox and WebKit run locally
only.

---

## Detailed Test Documents

- [Login](auth/login.md)
- Register _(coming soon)_
- Sign-out _(coming soon)_
