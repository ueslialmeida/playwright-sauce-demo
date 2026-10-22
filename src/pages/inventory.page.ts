import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly secondaryHeader: Locator;
  readonly title: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly sortSelect: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemTitle: Locator;
  readonly inventoryItemPrice: Locator;

  // Elementos de produto especifico
  readonly backpackTitleLink: Locator;
  readonly backpackAddToCartButton: Locator;
  readonly fleeceJacketTitleLink: Locator;
  readonly fleeceJacketAddToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.title = page.getByTestId('title');
    this.addToCartButton = page.getByText('Add to cart');
    this.removeFromCartButton = page.getByText('Remove');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.inventoryItem = page.getByTestId('inventory-item');
    this.inventoryItemTitle = page.getByTestId('inventory-item-name');
    this.inventoryItemPrice = page.getByTestId('inventory-item-price');
    this.backpackAddToCartButton = page.getByTestId(
      'add-to-cart-sauce-labs-backpack',
    );
    this.fleeceJacketAddToCartButton = page.getByTestId(
      'add-to-cart-sauce-labs-fleece-jacket',
    );
    this.backpackTitleLink = page.getByText('Sauce Labs Backpack');
    this.fleeceJacketTitleLink = page.getByText('Sauce Labs Fleece Jacket');
  }
}
