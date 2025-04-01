# Parabank Playwright TS [![Playwright Tests](https://github.com/MateoAgudGarcia/parabank-playwright-ts/actions/workflows/playwright-deployment.yml/badge.svg)](https://github.com/MateoAgudGarcia/parabank-playwright-ts/actions/workflows/playwright-deployment.yml)

This repository contains a Proof of Concept (PoC) for end-to-end testing using [Playwright](https://playwright.dev/) with TypeScript. The project is designed to test the Parabank application.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 22 or higher is recommended).
- **Parabank Application**: The tests are designed to run against the Parabank application, which serves as the target for this Proof of Concept.

## How to Clone the Repository

To clone this repository, use the following command:

```bash
git clone https://github.com/MateoAgudGarcia/parabank-playwright-ts.git
```

This will create a local copy of the repository on your machine. Navigate to the project directory to start working with it:

```bash
cd parabank-playwright-ts
```

## Project Structure

```
parabank-playwright-ts/
├── tests/                # Test files
├── reports/              # Generated test reports
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Base URL

The Parabank application serves as a mock banking application designed for testing purposes. It provides a controlled environment to simulate various banking operations, making it ideal for end-to-end testing scenarios. The tests in this project are configured to interact with this application. If needed, you can update the `baseURL` in the `playwright.config.ts` file to point to a different instance of the Parabank application.

## How to Run Tests

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the tests:

   ```bash
   npx playwright test
   ```

3. Generate a report:
   ```bash
   npx playwright show-report
   ```

## Browsers Used

The tests are executed across the following browsers:

- Chromium
- Firefox
- WebKit

## Test Reports

Test reports are automatically generated after each test run and stored in the `reports/` directory. These reports are configured to be retained as artifacts for 30 days.

## Repository

This repository is named `parabank-playwright-ts` and is intended for demonstrating the capabilities of Playwright with TypeScript in a PoC setup.
