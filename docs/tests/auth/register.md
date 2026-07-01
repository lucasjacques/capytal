# Register Flow — Test Document

## Objective

Verify that new users can create an account with valid input, that passwords
are never stored in plain text, and that duplicate emails are rejected.

---

## Preconditions

- The application is running and the `/register` page is accessible.
- No user with the test email already exists in the database.

---

## Test Cases

### TC-REGISTER-01 — Valid input creates account and redirects to login

**Given** a visitor enters a new email and password  
**When** they submit the register form  
**Then** a user record is created and they are redirected to `/login`

**Covered by:** E2E — `register creates account and redirects to login`

---

### TC-REGISTER-02 — Password is hashed before storage

**Given** a visitor registers with a plain-text password  
**When** the stored user record is inspected  
**Then** the database contains a bcrypt hash, not the original password

**Covered by:** Integration — `createUser > creates a user with a hashed password`

---

### TC-REGISTER-03 — Duplicate email is rejected

**Given** a user with a given email already exists  
**When** a new registration is submitted with the same email  
**Then** the operation throws and no second user record is created

**Covered by:** Integration — `createUser > rejects duplicate email`

---

## Coverage Map

| Layer       | Tool       | Cases covered      |
| ----------- | ---------- | ------------------ |
| Integration | Vitest     | TC-REGISTER-02, 03 |
| E2E         | Playwright | TC-REGISTER-01     |

---

## Known Gaps

- **Duplicate email UX** — the form currently throws an unhandled error
  instead of showing a friendly message. Tracked for `fix/auth-error-handling`.
- **Password strength validation** — no minimum length/complexity rules
  enforced client- or server-side. Deferred to Phase 1.
- **Password confirmation field** — not present on the register form yet.
  Tracked for `fix/auth-error-handling`.
- **Email format validation** — relies on the HTML `type="email"` input only;
  no server-side validation test exists.
