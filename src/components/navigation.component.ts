import { Locator, Page } from '@playwright/test';

export class NavigationComponent {
  readonly page: Page;
  readonly burgerMenuButton: Locator;
  readonly allItemsLink: Locator;
  readonly dynamicCatalogLink: Locator;
  readonly lazyLoadLink: Locator;
  readonly spinnerLink: Locator;
  readonly sliderLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
    this.dynamicCatalogLink = page.getByTestId('dynamic-catalog-sidebar-link');
    this.lazyLoadLink = page.getByTestId('dynamic-catalog-lazy-load-link');
    this.spinnerLink = page.getByTestId('dynamic-catalog-spinner-link');
    this.sliderLink = page.getByTestId('dynamic-catalog-slider-link');
    this.aboutLink = page.getByTestId('about-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.cartButton = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }
}
