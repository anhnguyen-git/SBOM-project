import { test } from "@playwright/test";
import { SBomLoginPage } from "../pages/SBomLoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { getLang } from "../helpers/utils";

test.describe("SBom Dashboard Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SBomLoginPage(page);
    await loginPage.goto();
    await loginPage.login("abc.xyz.123", "&jt&28EbVfvn@");
  });

  test("Controls should be gotten by language", async ({ page }) => {
    //  switch language
    await page.locator(`//span[@aria-label='global']/ancestor::button`).click();
    await page
      .locator(`//span[contains(text(), 'Japanese')]/ancestor::li`)
      .click();
    await page.waitForTimeout(2_000);

    const lang = await getLang(page);
    let dashboardPage = new DashboardPage(page, lang);

    const logContent = async (control: any) => {
      console.log("[LOG]", control, await dashboardPage.getContents(control));
    };

    // dashboardPage.Items.languageButton
    await logContent(dashboardPage.Items.languageButton);

    // seriousIncidentsHeading
    await logContent(dashboardPage.Items.seriousIncidentsHeading);

    // summaryHeading
    await logContent(dashboardPage.Items.summaryHeading);

    // cvssSeverityHeading
    await logContent(dashboardPage.Items.cvssSeverityHeading);

    // licenseHeading
    await logContent(dashboardPage.Items.licenseHeading);

    // quickAccessHeading
    await logContent(dashboardPage.Items.quickAccessHeading);

    // mostRecentHeading
    await logContent(dashboardPage.Items.mostRecentHeading);

    // mostVisitedHeading
    await logContent(dashboardPage.Items.mostVisitedHeading);
  });

  test("", async ({ page }) => {});
});