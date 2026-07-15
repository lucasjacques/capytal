# Login Flow — Test Document

## Objective

Verify that users can sign in with valid credentials, are rejected with
invalid ones, and that the resulting session state is correct in both cases.

---

## Preconditions

- A registered user exists in the database.
- The user is not currently signed in.
- The application is running and the `/login` page is accessible.

---

## Test Cases

### TC-LOGIN-01 — Valid credentials redirect to home

**Given** a registered user enters their correct email and password  
**When** they submit the login form  
**Then** they are redirected to `/` and a valid session is established

**Covered by:** E2E — `login with valid credentials redirects to home`

---

### TC-LOGIN-02 — Wrong password returns to login

**Given** a registered user enters their correct email but wrong password  
**When** they submit the login form  
**Then** they remain on `/login` and no session is created

**Covered by:** Integration — `verifyCredentials > returns null for wrong password`

---

### TC-LOGIN-03 — Unknown email returns to login

**Given** a visitor enters an email that does not exist in the database  
**When** they submit the login form  
**Then** they remain on `/login` and no session is created

**Covered by:** Integration — `verifyCredentials > returns null for unknown email`

---

### TC-LOGIN-04 — Password is never stored in plain text

**Given** a user registers and a login attempt is made  
**When** the stored credentials are inspected  
**Then** the database contains a bcrypt hash, not the original password

**Covered by:** Integration — `createUser > creates a user with a hashed password`

---

## Coverage Map

| Layer       | Tool       | Cases covered       |
| ----------- | ---------- | ------------------- |
| Integration | Vitest     | TC-LOGIN-02, 03, 04 |
| E2E         | Playwright | TC-LOGIN-01         |

---

## Known Gaps

- **Empty field submission** — HTML `required` attribute prevents submission
  in the browser; no server-side empty-input test exists. Low risk given
  Auth.js guards against missing credentials in `authorize`.
- **Rate limiting / brute force** — not in scope for Phase 0.
- **Session expiry** — JWT expiry behavior not covered; deferred to Phase 1.
