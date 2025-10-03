// tests/bp-simulator-redirect.spec.ts
import { test, expect } from '@playwright/test';

test('legacy /bp-simulator redirects to /business-plan-simulator', async ({ page, request }) => {
  const res = await request.get('/bp-simulator', { maxRedirects: 0 });
  expect(res.status()).toBe(308); // or 307/308 based on your config
  const loc = res.headers()['location'];
  expect(loc).toBe('/business-plan-simulator');

  await page.goto('/bp-simulator');
  await expect(page).toHaveURL(/\/business-plan-simulator$/);
});

test('Portability page loads', async ({ page }) => {
  await page.goto('/en/portability');
  await expect(page).toHaveTitle(/Portability/i);
});