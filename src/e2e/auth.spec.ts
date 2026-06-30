import { test, expect } from "@playwright/test";

test("register creates account and redirects to login", async ({ page }) => {
  await page.goto("/register");
  await page.getByLabel("Email").fill("e2e-register@capytal.test");
  await page.getByLabel("Password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await expect(page).toHaveURL(/\/login/);
});

test("login with valid credentials redirects to home", async ({ page }) => {
  await page.goto("/register");
  await page.getByLabel("Email").fill("e2e-login@capytal.test");
  await page.getByLabel("Password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await page.waitForURL(/\/login/);

  await page.getByLabel("Email").fill("e2e-login@capytal.test");
  await page.getByLabel("Password").fill("TestPass123!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL("/");
});

test("sign out redirects to login", async ({ page }) => {
  await page.goto("/register");
  await page.getByLabel("Email").fill("e2e-signout@capytal.test");
  await page.getByLabel("Password").fill("TestPass123!");
  await page.getByRole("button", { name: /create/i }).click();
  await page.waitForURL(/\/login/);

  await page.getByLabel("Email").fill("e2e-signout@capytal.test");
  await page.getByLabel("Password").fill("TestPass123!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL("/");

  await page.getByRole("button", { name: /sign out/i }).click();
  await expect(page).toHaveURL(/\/login/);
});
