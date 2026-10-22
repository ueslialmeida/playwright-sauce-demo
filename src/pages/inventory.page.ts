import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly secondaryHeader: Locator;
  readonly title: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.title = page.getByTestId('title');
    this.addToCartButton = page.getByText('Add to cart');
    this.removeFromCartButton = page.getByText('Remove');
  }
}
