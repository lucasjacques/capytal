import { test, expect } from "@playwright/test";

test("home page renders Capytal heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /capytal/i })).toBeVisible();
});
