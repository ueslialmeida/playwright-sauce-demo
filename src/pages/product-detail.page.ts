import { Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productImage: Locator;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productImage = page.locator('.inventory_details_img_container');
    this.productTitle = page.getByTestId('inventory-item-name');
    this.productDescription = page.getByTestId('inventory-item-desc');
    this.productPrice = page.getByTestId('inventory-item-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
  }
}
