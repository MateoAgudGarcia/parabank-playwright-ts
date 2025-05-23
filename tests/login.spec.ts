import { test } from '@playwright/test';
import { LoginPage } from '../src/pages';
import { RegisterPanel } from '../src/panel';

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to login page', async () => {
    await page.goto('/parabank/index.htm');
  });
});

test.afterEach(async ({ page }) => {
  await test.step('Attach screenshot of the final page', async () => {
    await test.info().attach('Final - Full page', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});

test.describe('Login Tests', () => {
  test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.loginWithCredentials('invalidUser', 'invalidPassword');
    });
  });

  test('Register a new user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let register: RegisterPanel;
    await test.step('Register as a new user', async () => {
      register = await loginPage.registerAsNewUser();
      await register.fillForm();
      await register.clickRegister();
    });

    await test.step('Verify user has been created', async () => {
      await register.verifyUserHasBeenCreated();
    });
  });
});
