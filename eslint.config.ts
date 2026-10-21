import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  // 1. Global ignores (Global sanitization replacement for .eslintignore)
  {
    ignores: [
      'node_modules/',
      'test-results/',
      'playwright-report/',
      'blob-report/',
      'playwright/.cache/',
      'dist/',
    ],
  },

  // 2. Base configuration objects for JS and TS foundational rules
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Playwright automation-specific configuration
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'tests/**/*.ts'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      // Prevent merging code that leaves an active test.only focus
      'playwright/no-focused-test': 'error',
      // Flag accidental test.skips left behind
      'playwright/no-skipped-test': 'warn',
      'playwright/prefer-lowercase-title': 'error',
    },
  },
]);
