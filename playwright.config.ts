// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  retries: 0,
  use: {
    headless: true,
    baseURL: process.env.E2E_BASE_URL ?? 'https://www.execpartners.ch',
  },
});