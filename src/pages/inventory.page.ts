import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly secondaryHeader: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.title = page.getByTestId('title');
  }
}
