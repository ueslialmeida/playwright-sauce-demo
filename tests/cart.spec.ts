import { test, expect } from '@playwright/test';
import { InventoryPage, CartPage } from '@pages/index';
import { NavigationComponent } from '@components/navigation.component';

test.describe('testes de catálogo de produtos', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let navigationComponent: NavigationComponent;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    navigationComponent = new NavigationComponent(page);
  });

  test('deve adicionar produtos ao carrinho', async ({ page }) => {
    await page.goto('/inventory.html');

    // Adiciona um produto
    await inventoryPage.backpackAddToCartButton.click();

    // Verifica se o badge do carrinho foi atualizado
    await expect(navigationComponent.cartBadge).toHaveText('1');

    // Adiciona outro produto
    await inventoryPage.fleeceJacketAddToCartButton.click();
    await expect(navigationComponent.cartBadge).toHaveText('2');

    // Acessa o carrinho
    await navigationComponent.cartButton.click();
    await expect(page).toHaveURL('/cart.html');

    // Verifica se os produtos estão no carrinho
    await expect(cartPage.inventoryItem).toHaveCount(2);
    await expect(cartPage.inventoryItem.first()).toHaveText(
      /Sauce Labs Backpack/,
    );
    await expect(cartPage.inventoryItem.nth(1)).toHaveText(
      /Sauce Labs Fleece Jacket/,
    );
  });

  test('deve remover produtos do carrinho', async ({ page }) => {
    // Acessa a página de inventário
    await page.goto('/inventory.html');

    // Adiciona um item ao carrinho
    await inventoryPage.addToCartButton.first().click();

    // Acessa o carrinho
    await navigationComponent.cartButton.click();

    // Força o Playwright a esperar a transição de página concluir
    await expect(page).toHaveURL('/cart.html');

    // Verifica se o item foi adicionado ao carrinho
    await expect(cartPage.inventoryItem).toBeVisible();

    // Remove o item do carrinho
    await cartPage.removeFromCartButton.click();
    await page.waitForTimeout(1000); // Aguarda um curto período para garantir que a remoção seja processada
    await expect(cartPage.inventoryItem).toBeHidden();
  });
});
