import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  await test.info().attach('has title', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();

  await test.info().attach('get started link', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});
