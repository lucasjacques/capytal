# Sign Out Flow — Test Document

## Objective

Verify that a signed-in user can sign out and that the session is properly
cleared, returning them to an unauthenticated state.

---

## Preconditions

- A registered user exists in the database.
- The user is currently signed in with an active session.

---

## Test Cases

### TC-LOGOUT-01 — Sign out clears session and redirects to login

**Given** a signed-in user is on a protected page  
**When** they click the sign out button  
**Then** their session is cleared and they are redirected to `/login`

**Covered by:** E2E — `sign out redirects to login`

---

## Coverage Map

| Layer | Tool       | Cases covered |
| ----- | ---------- | ------------- |
| E2E   | Playwright | TC-LOGOUT-01  |

---

## Known Gaps

- **No integration-level test** — sign out is only verified end-to-end via
  the UI. The underlying `signOut` call is Auth.js framework code, not
  project business logic, so it wasn't a priority for unit/integration
  coverage.
- **Protected route access after sign out** — not explicitly tested that a
  signed-out user is blocked from re-accessing `/` directly (relies on the
  `authorized` callback in `auth.config.ts`, covered indirectly by the
  proxy matcher but not by a dedicated test).
- **Session expiry / token invalidation** — deferred to Phase 1.
