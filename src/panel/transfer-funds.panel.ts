import { faker } from '@faker-js/faker';
import { Locator, Page, test, expect } from '@playwright/test';
import { ParabankPage } from '..';

export class TransferFundsPanel extends ParabankPage {
  private readonly transferApp: Locator;
  private readonly amountInput: Locator;
  private readonly transferButton: Locator;
  private readonly fromAccountSelect: Locator;
  private readonly toAccountSelect: Locator;
  private readonly result: Locator;
  private readonly resultTitle: Locator;
  private readonly firstParagraph: Locator;
  private readonly secondParagraph: Locator;
  private readonly amount: number;

  constructor(page: Page) {
    super(page);
    this.transferApp = this.rightPanel.locator('div#transferApp');
    this.amountInput = this.transferApp.locator('input#amount');
    this.transferButton = this.transferApp.locator('input.button');
    this.fromAccountSelect = this.transferApp.locator('select#fromAccountId');
    this.toAccountSelect = this.transferApp.locator('select#toAccountId');
    this.result = this.rightPanel.locator('#showResult');
    this.resultTitle = this.result.locator('h1.title');
    this.firstParagraph = this.result.locator('p:nth-child(2)');
    this.secondParagraph = this.result.locator('p:nth-child(3)');
    this.amount = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 });
  }

  /**
   * Enters the transfer amount into the input field.
   * @param {number} amount The amount to transfer.
   * @returns {Promise<void>}
   */
  async enterAmount(amount: number): Promise<void> {
    await test.step(`Enter transfer amount: ${amount}`, async () => {
      await this.amountInput.fill(`${amount}`);
    });
  }

  /**
   * Selects the "from" account for the transfer.
   * @param {string} accountId The ID of the account to transfer from.
   * @returns {Promise<void>}
   */
  async selectFromAccount(accountId: string): Promise<void> {
    await test.step(`Select "from" account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: accountId });
    });
  }

  /**
   * Selects the "to" account for the transfer.
   * @param {string} accountId The ID of the account to transfer to.
   * @returns {Promise<void>}
   */
  async selectToAccount(accountId: string): Promise<void> {
    await test.step(`Select "to" account: ${accountId}`, async () => {
      await this.toAccountSelect.selectOption({ value: accountId });
    });
  }

  /**
   * Clicks the "Transfer" button to initiate the transfer.
   * @returns {Promise<void>}
   */
  async clickTransferButton(): Promise<void> {
    await test.step('Click on "Transfer" button', async () => {
      await this.transferButton.click();
    });
  }

  /**
   * Performs a funds transfer by filling out the form and submitting it.
   * @param {string} toAccountId The ID of the account to transfer to.
   * @returns {Promise<void>}
   */
  async transferFunds(toAccountId: string): Promise<void> {
    await test.step('Perform funds transfer', async () => {
      await this.enterAmount(this.amount);
      await this.selectToAccount(toAccountId);
      await this.clickTransferButton();
    });
  }

  /**
   * Validates the transfer result with the expected details.
   * @param {string} toAccountId The ID of the account to transfer to.
   * @returns {Promise<void>}
   */
  async validateTransferResult(toAccountId: string): Promise<void> {
    await test.step(`Validate transfer result to account: ${toAccountId} with an amount: ${this.amount}`, async () => {
      await expect(this.result).toBeVisible();
      await expect(this.resultTitle).toHaveText('Transfer Complete!');
      const fromAccountRegex = /\d{5}/;
      const expectedFirstParagraph = new RegExp(
        `\\$${this.amount.toFixed(2)} has been transferred from account #${fromAccountRegex.source} to account #${toAccountId}\\.`,
      );
      await expect(this.firstParagraph).toHaveText(expectedFirstParagraph);
      await expect(this.secondParagraph).toHaveText(
        'See Account Activity for more details.',
      );
    });
  }
}
