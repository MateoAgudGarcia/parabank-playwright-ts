import { test, type Locator, type Page } from '@playwright/test';
import { ParabankPage } from './parabank.page';
import { RegisterPanel } from './register.panel';

export class LoginPage extends ParabankPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly forgotLoginInfo: Locator;
  readonly register: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.username = this.leftPanel.locator('input[name="username"]');
    this.password = this.leftPanel.locator('input[name="password"]');
    this.submit = this.leftPanel.locator('input[type="submit"]');
    this.forgotLoginInfo = this.leftPanel.locator('a', {
      hasText: 'Forgot login info?',
    });
    this.register = this.leftPanel.locator('a', { hasText: 'Register' });
  }

  /**
   * Navigates to the login page.
   * @param {string} username Username to be used for login.
   * @param {string} password Password to be used for login.
   * @returns {Promise<void>}
   */
  async loginWithCredentials(
    username: string,
    password: string,
  ): Promise<void> {
    await test.step(`Fill in username: "${username}" and password: "${password}"`, async () => {
      await this.username.fill(username);
      await this.password.fill(password);
    });
    await test.step('Click on submit button', async () => {
      await this.submit.waitFor({ state: 'visible' });
      await this.submit.click();
    });
  }

  /**
   * Clicks on the "Register" link to navigate to the registration page.
   * @returns {Promise<RegisterPanel>}
   */
  async registerAsNewUser(): Promise<RegisterPanel> {
    await test.step('Click on "Register" link', async () => {
      await this.register.waitFor({ state: 'visible' });
      await this.register.click();
    });
    return new RegisterPanel(this.page);
  }
}
