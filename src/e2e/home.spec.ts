import { test, expect } from "@playwright/test";

test("redirects unauthenticated users to login", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login/);
});

test("login page renders welcome heading", async ({ page }) => {
  await page.goto("/login");
  await expect(
    page.getByRole("heading", { name: /welcome back/i }),
  ).toBeVisible();
});

test("register page renders create account heading", async ({ page }) => {
  await page.goto("/register");
  await expect(
    page.getByRole("heading", { name: /create a capytal account/i }),
  ).toBeVisible();
});
