import { test, expect } from '@playwright/test';
import { InventoryPage, ProductDetailPage } from '@pages/index';
import { NavigationComponent } from '@components/navigation.component';

type ProductItem = { title: string; price: number };

async function scanProductItems(
  inventoryPage: InventoryPage,
): Promise<ProductItem[]> {
  const items = inventoryPage.page.locator('[data-test="inventory-item"]');
  await expect(items.first()).toBeVisible();

  return items.evaluateAll((els) =>
    els.map((el) => ({
      title: el
        .querySelector('[data-test="inventory-item-name"]')!
        .textContent!.trim(),
      price: Number(
        el
          .querySelector('[data-test="inventory-item-price"]')!
          .textContent!.replace('$', ''),
      ),
    })),
  );
}

const orderCases = [
  {
    value: 'az',
    label: 'Name (A to Z)',
    cmp: (a: ProductItem, b: ProductItem) => a.title.localeCompare(b.title),
  },
  {
    value: 'za',
    label: 'Name (Z to A)',
    cmp: (a: ProductItem, b: ProductItem) => b.title.localeCompare(a.title),
  },
  {
    value: 'lohi',
    label: 'Price (low to high)',
    cmp: (a: ProductItem, b: ProductItem) => a.price - b.price,
  },
  {
    value: 'hilo',
    label: 'Price (high to low)',
    cmp: (a: ProductItem, b: ProductItem) => b.price - a.price,
  },
];

test.describe('testes para o catálogo de produtos', () => {
  let inventoryPage: InventoryPage;
  let productDetailPage: ProductDetailPage;
  let navigationComponent: NavigationComponent;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    navigationComponent = new NavigationComponent(page);
    await page.goto('/inventory.html');
  });

  for (const { value, label, cmp } of orderCases) {
    test(`deve ordenar por ${label}`, async () => {
      const original = await scanProductItems(inventoryPage);
      const esperado = [...original].sort(cmp);

      await inventoryPage.sortSelect.selectOption(value);

      // toHaveText com array faz auto-retry até a lista bater (ou estourar o timeout)
      await expect(inventoryPage.inventoryItemTitle).toHaveText(
        esperado.map((p) => p.title),
      );
      await expect(inventoryPage.inventoryItemPrice).toHaveText(
        esperado.map((p) => `$${p.price}`),
      );
    });
  }

  test('deve por padrão ordernar por Name (A to Z)', async () => {
    await expect(inventoryPage.sortSelect).toHaveValue('az');

    // Captura os títulos dos produtos reais da página
    const productTitles = inventoryPage.inventoryItemTitle;

    // Verifica se os títulos estão em ordem alfabética
    await expect(productTitles).toHaveText(
      [...(await productTitles.allTextContents())].sort((a, b) =>
        a.localeCompare(b),
      ),
    );
  });

  test('não deve alterar a quantidade de itens ao ordenar', async () => {
    await inventoryPage.sortSelect.selectOption('hilo');
    await expect(inventoryPage.inventoryItem).toHaveCount(6);
  });

  test('deve exibir detalhes do produto ao clicar no título', async ({
    page,
  }) => {
    await inventoryPage.backpackTitleLink.click();
    await expect(inventoryPage.page).toHaveURL(/inventory-item\.html/);

    await page.waitForTimeout(1000); // Aguarda um curto período para garantir que a remoção seja processada

    await expect(productDetailPage.productTitle).toHaveText(
      'Sauce Labs Backpack',
    );
    await expect(productDetailPage.productDescription).toBeVisible();
    await expect(productDetailPage.productPrice).toHaveText('$29.99');
    await expect(productDetailPage.productImage).toBeVisible();
    await expect(productDetailPage.addToCartButton).toBeVisible();
  });

  test('deve ser possível adicionar produto no carrinho a partir da página de detalhes do produto', async () => {
    await inventoryPage.backpackTitleLink.click();
    await expect(inventoryPage.page).toHaveURL(/inventory-item\.html/);
    await productDetailPage.addToCartButton.click();
    await expect(navigationComponent.cartBadge).toHaveText('1');
  });
});
