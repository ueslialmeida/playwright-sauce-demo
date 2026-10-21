import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

// Força o uso de um estado de armazenamento limpo para cada teste, garantindo que não haja dados persistentes de testes anteriores.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('testes de login', () => {
  test('deve permitir login com credenciais válidas', async ({ page }) => {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_PASSWORD) {
      throw new Error(
        'As variáveis de ambiente SAUCE_USERNAME e SAUCE_PASSWORD não estão definidas.',
      );
    }

    const username = process.env.SAUCE_USERNAME;
    const password = process.env.SAUCE_PASSWORD;

    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login(username, password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('secondary-header')).toBeVisible();
  });

  test('deve rejeitar login com credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
