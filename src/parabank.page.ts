import { type Locator, type Page } from '@playwright/test';

export class ParabankPage {
  readonly page: Page;
  readonly mainPanel: Locator;
  readonly topPanel: Locator;
  readonly headerPanel: Locator;
  readonly leftMenu: Locator;
  readonly headerButtonMenu: Locator;
  readonly bodyPanel: Locator;
  readonly leftPanel: Locator;
  readonly rightPanel: Locator;
  readonly footerMainPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainPanel = page.locator('#mainPanel');
    this.topPanel = this.mainPanel.locator('#topPanel');
    this.headerPanel = this.mainPanel.locator('#headerPanel');
    this.leftMenu = this.headerPanel.locator('.leftmenu');
    this.headerButtonMenu = this.headerPanel.locator('.button');
    this.bodyPanel = this.mainPanel.locator('#bodyPanel');
    this.leftPanel = this.bodyPanel.locator('#leftPanel');
    this.rightPanel = this.bodyPanel.locator('#rightPanel');
    this.footerMainPanel = page.locator('#footerPanel');
  }
}
