import { test, expect } from "@playwright/test";

test("register creates account and redirects to login", async ({
  page,
  browserName,
}) => {
  await page.goto("/register");
  await page
    .getByLabel("Email")
    .fill(`e2e-register-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByLabel("Confirm password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await expect(page).toHaveURL(/\/login/);
});

test("login with valid credentials redirects to home", async ({
  page,
  browserName,
}) => {
  await page.goto("/register");
  await page.getByLabel("Email").fill(`e2e-login-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByLabel("Confirm password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await page.waitForURL(/\/login/);

  await page.getByLabel("Email").fill(`e2e-login-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL("/");
});

test("sign out redirects to login", async ({ page, browserName }) => {
  await page.goto("/register");
  await page
    .getByLabel("Email")
    .fill(`e2e-signout-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByLabel("Confirm password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await page.waitForURL(/\/login/);

  await page
    .getByLabel("Email")
    .fill(`e2e-signout-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL("/");

  await page.getByRole("button", { name: /sign out/i }).click();
  await expect(page).toHaveURL(/\/login/);
});

test("login with wrong password shows error", async ({ page, browserName }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(`e2e-login-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("WrongPass!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByText("Invalid email or password.")).toBeVisible();
});

test("login preserves email on error", async ({ page, browserName }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(`e2e-login-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("WrongPass!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page.getByLabel("Email")).toHaveValue(
    `e2e-login-${browserName}@capytal.test`,
  );
});

test("register with duplicate email shows error", async ({
  page,
  browserName,
}) => {
  const email = `e2e-dup-${browserName}@capytal.test`;
  await page.goto("/register");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByLabel("Confirm password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await page.waitForURL(/\/login/);

  await page.goto("/register");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByLabel("Confirm password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await expect(page).toHaveURL(/\/register/);
  await expect(
    page.getByText("An account with this email already exists."),
  ).toBeVisible();
});

test("register with mismatched passwords shows error", async ({
  page,
  browserName,
}) => {
  await page.goto("/register");
  await page
    .getByLabel("Email")
    .fill(`e2e-mismatch-${browserName}@capytal.test`);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123!");
  await page.getByLabel("Confirm password").fill("DifferentPass!");
  await page.getByRole("button", { name: /create/i }).click();
  await expect(page).toHaveURL(/\/register/);
  await expect(page.getByText("Passwords do not match.")).toBeVisible();
});
