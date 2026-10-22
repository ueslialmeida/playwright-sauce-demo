import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly title: Locator;
  readonly header: Locator;
  readonly backToHomeButton: Locator;
  readonly generateOrderPdfButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.header = page.getByTestId('complete-header');
    this.backToHomeButton = page.getByTestId('back-to-products');
    this.generateOrderPdfButton = page.getByTestId('generate-pdf-order');
  }
}
