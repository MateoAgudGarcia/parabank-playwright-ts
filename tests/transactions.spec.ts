import { test } from '@playwright/test';
import { LoginPage } from '../src/login.page';
import { RegisterPanel } from '../src/register.panel';
import { AccountServicesPanel } from '../src/account-services.panel';
import { AccountType, OpenAccountPanel } from '../src/open-account.panel';

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

test.describe('Make some transactions', () => {
  test('Register a new account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let register: RegisterPanel;
    let accountServices: AccountServicesPanel;
    let openNewAccount: OpenAccountPanel;
    await test.step('Register as a new user', async () => {
      register = await loginPage.registerAsNewUser();
      await register.fillForm();
      await register.clickRegister();
      accountServices = await register.verifyUserHasBeenCreated();
    });
    await test.step('Open a new bank account', async () => {
      openNewAccount = await accountServices.clickOpenNewAccount();
      await openNewAccount.openNewAccount(AccountType.SAVINGS);
      const newAccountId = await openNewAccount.getNewAccountId();
      await openNewAccount.validateNewAccountCreation(newAccountId);
    });
  });
});
