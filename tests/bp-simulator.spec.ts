import { test, expect } from '@playwright/test';

test('BP Simulator renders in the correct order', async ({ page }) => {
  await page.goto('/en/bp-simulator');

  // Sections in order by headings
  const headings = await page.locator('h2').allTextContents();
  expect(headings[0]).toContain('Basic Candidate Information');
  expect(headings[1]).toContain('Business Development Strategy — Page 1');
  expect(headings[2]).toContain('Net New Money');
  expect(headings[3]).toContain('Revenue, Costs & Net Margin');
  expect(headings[4]).toContain('Business Development Strategy — Page 2');

  // Final Analysis present & export buttons visible
  await expect(page.getByRole('button', { name: /Export PDF/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Export CSV/i })).toBeVisible();
});