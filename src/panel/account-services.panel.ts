import { type Locator, type Page, test } from '@playwright/test';
import { ParabankPage } from '..';
import { OpenAccountPanel, TransferFundsPanel } from '.';

export class AccountServicesPanel extends ParabankPage {
  readonly accountServices: Locator;
  readonly openNewAccountLink: Locator;
  readonly accountsOverviewLink: Locator;
  readonly transferFundsLink: Locator;
  readonly billPayLink: Locator;
  readonly findTransactionsLink: Locator;
  readonly updateContactInfoLink: Locator;
  readonly requestLoanLink: Locator;
  readonly logOutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.accountServices = this.leftPanel.locator('ul');
    this.openNewAccountLink = this.accountServices.locator('li>a', {
      hasText: 'Open New Account',
    });
    this.accountsOverviewLink = this.accountServices.locator('li>a', {
      hasText: 'Accounts Overview',
    });
    this.transferFundsLink = this.accountServices.locator('li>a', {
      hasText: 'Transfer Funds',
    });
    this.billPayLink = this.accountServices.locator('li>a', {
      hasText: 'Bill Pay',
    });
    this.findTransactionsLink = this.accountServices.locator('li>a', {
      hasText: 'Find Transactions',
    });
    this.updateContactInfoLink = this.accountServices.locator('li>a', {
      hasText: 'Update Contact Info',
    });
    this.requestLoanLink = this.accountServices.locator('li>a', {
      hasText: 'Request Loan',
    });
    this.logOutLink = this.accountServices.locator('li>a', {
      hasText: 'Log Out',
    });
  }

  /**
   * Clicks on the "Open New Account" link.
   */
  async clickOpenNewAccount(): Promise<OpenAccountPanel> {
    await test.step('Click on "Open New Account" link', async () => {
      await this.openNewAccountLink.click();
    });
    return new OpenAccountPanel(this.page);
  }

  /**
   * Clicks on the "Accounts Overview" link.
   */
  async clickAccountsOverview(): Promise<void> {
    await test.step('Click on "Accounts Overview" link', async () => {
      await this.accountsOverviewLink.click();
    });
  }

  /**
   * Clicks on the "Transfer Funds" link.
   */
  async clickTransferFunds(): Promise<TransferFundsPanel> {
    await test.step('Click on "Transfer Funds" link', async () => {
      await this.transferFundsLink.click();
    });
    return new TransferFundsPanel(this.page);
  }

  /**
   * Clicks on the "Bill Pay" link.
   */
  async clickBillPay(): Promise<void> {
    await test.step('Click on "Bill Pay" link', async () => {
      await this.billPayLink.click();
    });
  }

  /**
   * Clicks on the "Find Transactions" link.
   */
  async clickFindTransactions(): Promise<void> {
    await test.step('Click on "Find Transactions" link', async () => {
      await this.findTransactionsLink.click();
    });
  }

  /**
   * Clicks on the "Update Contact Info" link.
   */
  async clickUpdateContactInfo(): Promise<void> {
    await test.step('Click on "Update Contact Info" link', async () => {
      await this.updateContactInfoLink.click();
    });
  }

  /**
   * Clicks on the "Request Loan" link.
   */
  async clickRequestLoan(): Promise<void> {
    await test.step('Click on "Request Loan" link', async () => {
      await this.requestLoanLink.click();
    });
  }

  /**
   * Clicks on the "Log Out" link.
   */
  async clickLogOut(): Promise<void> {
    await test.step('Click on "Log Out" link', async () => {
      await this.logOutLink.click();
    });
  }
}
