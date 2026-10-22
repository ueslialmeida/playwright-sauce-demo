import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/index';
import { AUTH_FILE } from '../playwright.config';

setup('autenticar usuário', async ({ page }) => {
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

  // Garante que o login concluiu antes de salvar o estado
  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: AUTH_FILE });
});
