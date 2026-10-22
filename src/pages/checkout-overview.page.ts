import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItem: Locator;
  readonly summaryInfo: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.inventoryItem = page.getByTestId('inventory-item');
    this.summaryInfo = page.locator('.summary_info');
    this.cancelButton = page.getByTestId('cancel');
    this.finishButton = page.getByTestId('finish');
  }
}
