import { test, type Locator, type Page } from '@playwright/test';
import { ParabankPage } from './parabank.page';
import { faker } from '@faker-js/faker';

export class RegisterPanel extends ParabankPage {
  readonly firstNameInput: Locator;
  readonly firstName: string;
  readonly lastNameInput: Locator;
  readonly lastName: string;
  readonly streetAddressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatedPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.rightPanel.locator(
      'input[id="customer.firstName"]',
    );
    this.lastNameInput = this.rightPanel.locator(
      'input[id="customer.lastName"]',
    );
    this.streetAddressInput = this.rightPanel.locator(
      'input[id="customer.address.street"]',
    );
    this.cityInput = this.rightPanel.locator(
      'input[id="customer.address.city"]',
    );
    this.stateInput = this.rightPanel.locator(
      'input[id="customer.address.state"]',
    );
    this.zipCodeInput = this.rightPanel.locator(
      'input[id="customer.address.zipCode"]',
    );
    this.phoneNumberInput = this.rightPanel.locator(
      'input[id="customer.phoneNumber"]',
    );
    this.ssnInput = this.rightPanel.locator('input[id="customer.ssn"]');
    this.usernameInput = this.rightPanel.locator(
      'input[id="customer.username"]',
    );
    this.passwordInput = this.rightPanel.locator(
      'input[id="customer.password"]',
    );
    this.repeatedPasswordInput = this.rightPanel.locator(
      'input[id="repeatedPassword"]',
    );
    this.submitButton = this.rightPanel.locator('input[type="submit"]');
    this.registerButton = this.rightPanel.locator('input[value="Register"]');
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
  }

  /**
   * Fills the first name input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillFirstName(): Promise<void> {
    await test.step(`Fill first name: "${this.firstName}"`, async () => {
      await this.firstNameInput.fill(this.firstName);
    });
  }

  /**
   * Fills the last name input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillLastName(): Promise<void> {
    await test.step(`Fill last name: "${this.lastName}"`, async () => {
      await this.lastNameInput.fill(this.lastName);
    });
  }

  /**
   * Fills the street address input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillStreetAddress(): Promise<void> {
    const streetAddress = faker.location.streetAddress();
    await test.step(`Fill street address: "${streetAddress}"`, async () => {
      await this.streetAddressInput.fill(streetAddress);
    });
  }

  /**
   * Fills the city input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillCity(): Promise<void> {
    const city = faker.location.city();
    await test.step(`Fill city: "${city}"`, async () => {
      await this.cityInput.fill(city);
    });
  }

  /**
   * Fills the state input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillState(): Promise<void> {
    const state = faker.location.state();
    await test.step(`Fill state: "${state}"`, async () => {
      await this.stateInput.fill(state);
    });
  }

  /**
   * Fills the zip code input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillZipCode(): Promise<void> {
    const zipCode = faker.location.zipCode();
    await test.step(`Fill zip code: "${zipCode}"`, async () => {
      await this.zipCodeInput.fill(zipCode);
    });
  }

  /**
   * Fills the phone number input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillPhoneNumber(): Promise<void> {
    const phoneNumber = faker.phone.number({ style: 'international' });
    await test.step(`Fill phone number: "${phoneNumber}"`, async () => {
      await this.phoneNumberInput.fill(phoneNumber);
    });
  }

  /**
   * Fills the SSN input field with a random 9-digit value.
   * @returns {Promise<void>}
   */
  private async fillSSN(): Promise<void> {
    const ssn = faker.finance.accountNumber(9);
    await test.step(`Fill SSN: "${ssn}"`, async () => {
      await this.ssnInput.fill(ssn);
    });
  }

  /**
   * Fills the username input field with a random value.
   * @returns {Promise<void>}
   */
  private async fillUsername(): Promise<void> {
    const username = faker.internet.username({
      firstName: this.firstName,
      lastName: this.lastName,
    });
    await test.step(`Fill username: "${username}"`, async () => {
      await this.usernameInput.fill(username);
    });
  }

  /**
   * Fills the password and repeated password input fields with the same random value.
   * @returns {Promise<void>}
   */
  private async fillPassword(): Promise<void> {
    const password = faker.internet.password();
    await test.step(`Fill password and repeated password: "${password}"`, async () => {
      await this.passwordInput.fill(password);
      await this.repeatedPasswordInput.fill(password);
    });
  }

  /**
   * Fills the entire registration form with random values.
   * @returns {Promise<void>}
   */
  async fillForm(): Promise<void> {
    await test.step('Fill registration form', async () => {
      await this.fillFirstName();
      await this.fillLastName();
      await this.fillStreetAddress();
      await this.fillCity();
      await this.fillState();
      await this.fillZipCode();
      await this.fillPhoneNumber();
      await this.fillSSN();
      await this.fillUsername();
      await this.fillPassword();
    });
  }

  /**
   * Clicks the submit button to submit the registration form.
   * @returns {Promise<void>}
   */
  async clickRegister(): Promise<void> {
    await test.step('Click register button', async () => {
      await this.registerButton.waitFor({ state: 'visible' });
      await this.registerButton.click();
    });
  }
}
