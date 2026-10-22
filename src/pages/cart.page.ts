import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItem: Locator;
  readonly removeFromCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.inventoryItem = page.getByTestId('inventory-item');
    this.removeFromCartButton = page.getByText('Remove');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.checkoutButton = page.getByTestId('checkout');
  }
}
