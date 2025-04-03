import { expect, type Locator, type Page, test } from '@playwright/test';
import { ParabankPage } from './parabank.page';

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
}

export class OpenAccountPanel extends ParabankPage {
  readonly openAccountForm: Locator;
  readonly accountTypeSelect: Locator;
  readonly accountIdSelect: Locator;
  readonly openNewAccountButton: Locator;
  readonly result: Locator;
  readonly resultTitle: Locator;
  readonly firstParagraph: Locator;
  readonly secondParagraph: Locator;
  readonly newAccountId: Locator;

  constructor(page: Page) {
    super(page);
    this.openAccountForm = this.rightPanel.locator('#openAccountForm');
    this.accountTypeSelect = this.openAccountForm.locator('select#type');
    this.accountIdSelect = this.openAccountForm.locator('select#fromAccountId');
    this.openNewAccountButton = this.openAccountForm.locator(
      'input[value="Open New Account"]',
    );
    this.result = this.rightPanel.locator('#openAccountResult');
    this.resultTitle = this.result.locator('h1.title');
    this.firstParagraph = this.result.locator('p:nth-child(2)');
    this.secondParagraph = this.result.locator('p:nth-child(3)');
    this.newAccountId = this.secondParagraph.locator('#newAccountId');
  }

  /**
   * Selects an account type (CHECKING or SAVINGS) from the dropdown.
   * @param {AccountType} accountType The type of account to select.
   */
  async selectAccountType(accountType: AccountType): Promise<void> {
    await test.step(`Select account type: ${accountType}`, async () => {
      await this.accountTypeSelect.selectOption(accountType);
    });
  }

  /**
   * Selects an account ID from the dropdown.
   * @param {string} accountId The account ID to select.
   */
  async selectAccountId(accountId: string): Promise<void> {
    await test.step(`Select account ID: ${accountId}`, async () => {
      await this.accountIdSelect.selectOption(accountId);
    });
  }

  /**
   * Clicks the "Open New Account" button to submit the form.
   */
  async clickOpenNewAccount(): Promise<void> {
    await test.step('Click on "Open New Account" button', async () => {
      await expect(this.openNewAccountButton).toBeEnabled();
      await this.openNewAccountButton.click({ delay: 500 });
      await expect(this.openNewAccountButton).not.toBeVisible();
    });
  }

  /**
   * Fills out the form to open a new account and submits it.
   * @param {AccountType} accountType The type of account to select.
   */
  async openNewAccount(accountType: AccountType): Promise<void> {
    await test.step('Open a new account', async () => {
      await this.selectAccountType(accountType);
      await this.clickOpenNewAccount();
    });
  }

  /**
   * Validates that a new account has been created with the expected account ID.
   * @param {string} expectedAccountId The expected new account ID.
   */
  async validateNewAccountCreation(expectedAccountId: string): Promise<void> {
    await test.step(`Validate new account creation with id: ${expectedAccountId}`, async () => {
      await expect(this.result).toBeVisible();
      await expect(this.resultTitle).toHaveText('Account Opened!');
      await expect(this.firstParagraph).toHaveText(
        'Congratulations, your account is now open.',
      );
      await expect(this.secondParagraph).toHaveText(
        `Your new account number: ${expectedAccountId}`,
      );
    });
  }

  /**
   * Retrieves the new account ID.
   * @returns {Promise<string>} The new account ID.
   */
  async getNewAccountId(): Promise<string> {
    let accountId: string = '';
    await test.step('Get new account ID', async () => {
      const textContent = await this.newAccountId.textContent();
      if (!textContent) {
        throw new Error('New account ID is null or undefined');
      }
      accountId = textContent.trim();
    });
    return accountId;
  }
}
