import { test, expect } from '@playwright/test';
import { NavigationComponent } from '@components/navigation.component';
import {
  InventoryPage,
  CartPage,
  CheckoutDataPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} from '@pages/index';
import { generateClient } from '@factories/client.factory';
import fs from 'fs';

test.describe('testes de checkout', () => {
  let navigation: NavigationComponent;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutDataPage: CheckoutDataPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    // Instanciação das páginas e componentes
    navigation = new NavigationComponent(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutDataPage = new CheckoutDataPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test('deve realizar o checkout com sucesso', async ({ page }) => {
    // Acessa a página de inventário
    await page.goto('/inventory.html');

    // Adiciona um item ao carrinho
    await inventoryPage.addToCartButton.first().click();

    // Acessa o carrinho
    await navigation.cartButton.click();

    // Força o Playwright a esperar a transição de página concluir
    await expect(page).toHaveURL('/cart.html');

    // Verifica se o item foi adicionado ao carrinho
    await expect(cartPage.inventoryItem).toBeVisible();

    // Inicia o processo de checkout
    await cartPage.checkoutButton.click();

    // Preenche os dados de checkout com um cliente gerado por uma factory
    const cliente = generateClient();
    await checkoutDataPage.fillCheckoutData(
      cliente.firstName,
      cliente.lastName,
      cliente.postalCode,
    );
    await checkoutDataPage.continueButton.click();

    // Verifica a página de resumo do checkout
    await expect(checkoutOverviewPage.inventoryItem).toBeVisible();
    await expect(checkoutOverviewPage.summaryInfo).toBeVisible();

    // Finaliza o checkout
    await checkoutOverviewPage.finishButton.click();
    await expect(checkoutCompletePage.header).toHaveText(
      'Thank you for your order!',
    );

    // Verifica se o botão de voltar para a página inicial está visível
    await expect(checkoutCompletePage.backToHomeButton).toBeVisible();

    /**
     * Validação do download do PDF do pedido
     */
    const downloadPromise = page.waitForEvent('download');

    // Baixa o PDF do pedido
    await checkoutCompletePage.generateOrderPdfButton.click();

    // Aguarda o download do PDF
    const download = await downloadPromise;

    // Valida o nome do arquivo baixado
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);

    // Salva o arquivo PDF em um diretório temporário
    const downloadPath = `playwright/.downloads/${download.suggestedFilename()}`;
    await download.saveAs(downloadPath);

    // Valida que o arquivo existe e não está vazio
    const stats = fs.statSync(downloadPath);
    expect(stats.size).toBeGreaterThan(0);

    // Valida que é realmente um PDF (magic bytes "%PDF")
    const buffer = fs.readFileSync(downloadPath);
    expect(buffer.subarray(0, 4).toString()).toBe('%PDF');
  });
});
