import { test, expect } from "@playwright/test";

test("BP Simulator page renders with title and marker text", async ({ page }) => {
  await page.goto("/business-plan-simulator");

  // Title
  await expect(page).toHaveTitle(/BP Simulator – Executive Partners/);

  // Pick the inner <main> that actually contains the page content
  const contentMain = page.getByRole("main").last();
  await expect(contentMain).toContainText("BP Simulator is live.");

  // ✅ Header nav: link is marked as current
  const primaryNav = page.getByLabel("Primary");
  const headerLink = primaryNav.getByRole("link", { name: "BP Simulator" });
  await expect(headerLink).toHaveAttribute("aria-current", "page");

  // ✅ Footer nav: link exists but is not marked current
  const footerNav = page.getByLabel("Company");
  const footerLink = footerNav.getByRole("link", { name: "BP Simulator" });
  await expect(footerLink).not.toHaveAttribute("aria-current", "page");
});