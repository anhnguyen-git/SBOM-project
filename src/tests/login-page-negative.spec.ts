/**
 * Login Page Negative Tests - Verifies elements that should NOT exist
 */

import { test, expect } from "@playwright/test";
import { SBomLoginPage } from "../pages/SBomLoginPage";

test.describe("Login Page Negative Tests", () => {
    test("should verify that no register link exists on login page", async ({ page }) => {
        const loginPage = new SBomLoginPage(page);
        await loginPage.goto();

        // Wait for page to be fully loaded (wait for login button to be visible)
        await page.waitForSelector('button:has-text("Log in")', { state: 'visible' });
        await expect(page.locator('a:has-text("register")')).toHaveCount(0);
        await expect(page.locator('a[href*="register"]')).toHaveCount(0);
    });
});
