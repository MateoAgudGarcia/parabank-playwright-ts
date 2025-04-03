import { test } from '@playwright/test';
import { LoginPage } from '../src/pages';
import {
  AccountServicesPanel,
  AccountType,
  OpenAccountPanel,
  RegisterPanel,
  TransferFundsPanel,
} from '../src/panel';

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
  test('Register a new account and transfer funds to it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let register: RegisterPanel;
    let accountServices: AccountServicesPanel;
    let openNewAccount: OpenAccountPanel;
    let transferFundsPanel: TransferFundsPanel;
    let newAccountId: string;

    await test.step('Register as a new user', async () => {
      register = await loginPage.registerAsNewUser();
      await register.fillForm();
      await register.clickRegister();
      accountServices = await register.verifyUserHasBeenCreated();
    });

    await test.step('Open a new bank account', async () => {
      openNewAccount = await accountServices.clickOpenNewAccount();
      await openNewAccount.openNewAccount(AccountType.SAVINGS);
      newAccountId = await openNewAccount.getNewAccountId();
      await openNewAccount.validateNewAccountCreation(newAccountId);
    });

    await test.step('Transfer funds to the new account', async () => {
      transferFundsPanel = await accountServices.clickTransferFunds();
      await transferFundsPanel.transferFunds(newAccountId);
      await transferFundsPanel.validateTransferResult(newAccountId);
    });
  });
});
