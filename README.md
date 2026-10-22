# Playwright Sauce Demo E2E Tests 🎭

This repository contains End-to-End (E2E) automated tests for the [Sauce Demo](https://www.saucedemo.com/) application, developed in **TypeScript** using **Playwright**.

## 📋 Table of Contents

- [Technical Decisions & Architecture](#-technical-decisions--architecture)
- [Project Structure](#-project-structure)
- [Prerequisites & Installation](#-prerequisites--installation)
- [Running the Tests](#-running-the-tests)
- [Execution via GitHub Actions (CI/CD)](#-execution-via-github-actions-cicd)
- [Test Scenarios](#-test-scenarios)

---

## 🛠️ Technical Decisions & Architecture

This project was built focusing on maintainability, code reusability, and test automation best practices:

1. **Page Object Model (POM):** Encapsulation of elements and actions for each page inside `src/pages/`. This isolates page-specific logic from test assertions, making it easier to maintain when UI changes occur.
2. **Reusable Components:** Separation of shared components (such as navigation bars) into `src/components/` to prevent code duplication.
3. **Factory Pattern:** Implementation of `src/factories/client.factory.ts` for flexible test data generation (e.g., client/user details).
4. **Authentication Setup (`auth.setup.ts`):** Reuses authenticated state to avoid running login steps repeatedly for tests that require an active session, significantly improving suite execution time.
5. **Code Quality & Consistency:**
   - **ESLint & Prettier:** Ensures consistent code formatting and helps catch potential code smells early.
   - **Husky & Commitlint:** Enforces standardized commit messages (Conventional Commits) and executes pre-commit validations.

---

## 📁 Project Structure

```text
playwright-sauce-demo/
├── .github/
│   └── workflows/              # CI/CD Workflows for GitHub Actions
├── .husky/                     # Git hooks for linting and commit checks
├── src/
│   ├── components/             # Reusable global UI components (e.g., navigation)
│   ├── factories/              # Data factories for test inputs (e.g., client.factory.ts)
│   └── pages/                  # Page Object Model classes
├── tests/                      # Test spec files (.spec.ts)
│   ├── auth.setup.ts           # Global authentication setup
│   ├── cart.spec.ts            # Cart page test suite
│   ├── checkout.spec.ts        # Checkout process test suite
│   ├── inventory.spec.ts       # Product catalog test suite
│   └── login.spec.ts           # Login page test suite
├── .env.example                # Example environment variables configuration
├── commitlint.config.ts        # Commitlint rules configuration
├── eslint.config.ts            # ESLint rules configuration
├── playwright.config.ts        # Core Playwright framework configuration
└── package.json                # Project dependencies and npm scripts
```

---

## 🚀 Prerequisites & Installation

Ensure you have the following installed on your machine before getting started:

- [Node.js](https://nodejs.org/) (Version 18 or higher)
- **npm** package manager

### Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <REPOSITORY_URL>
   cd playwright-sauce-demo
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables:**
   Duplicate `.env.example` and rename it to `.env`, populating any required values.
   ```bash
   cp .env.example .env
   ```

---

## 🧪 Running the Tests

The following scripts are available in `package.json` for test execution and reporting:

| Script | Description |
| :--- | :--- |
| `npm run test:open` | Opens **Playwright UI**, allowing interactive step-by-step test execution and debugging. |
| `npm run test:run` | Runs all tests in **headless** mode directly in the terminal. |
| `npm run test:report` | Opens the generated HTML test report in your browser. |

---

## 🤖 Execution via GitHub Actions (CI/CD)

The repository includes a configured **GitHub Actions Workflow** that triggers automatically on Push/Pull Requests and can also be triggered **manually**:

1. Navigate to the **Actions** tab in your GitHub repository.
2. Select the test workflow from the left sidebar.
3. Click on **Run workflow**, choose the target branch, and run it.

---

## 🧪 Test Scenarios

### ✅ Covered Scenarios

* **Login:**
  * Successful login with valid credentials.
  * Failed login attempt with invalid credentials.
* **Product Catalog (Inventory):**
  * Sort products by Name (A-Z and Z-A).
  * Sort products by Price (Low to High and High to Low).
  * Navigation to the product details page.
  * Add products to cart directly from the catalog grid or the details page.
* **Shopping Cart:**
  * UI layout and element validation on the cart page.
  * Item removal from the shopping cart.
* **Checkout:**
  * Complete end-to-end checkout flow (customer details submission and order confirmation).

### ⏳ Pending / Backlog Scenarios

* **Checkout:**
  * [ ] Support and validation for multi-product checkout (two or more items in the cart simultaneously).