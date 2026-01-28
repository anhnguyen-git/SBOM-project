"use strict";
/**
 * VulnerabilitiesPage - Page Object for Vulnerabilities Dashboard
 * Handles vulnerabilities listing and filtering
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VulnerabilitiesPage = void 0;
const BasePage_1 = require("./BasePage");
class VulnerabilitiesPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/dashboard/vulnerabilities";
        this.controls = {
            // Statistics Section - Verified: Uses nth-of-type for unique targeting → works in both EN and JA
            projectsAtRiskHeading: {
                type: "heading",
                css: "main > div:first-child > div > div:nth-of-type(1) h3",
                description: "Projects at Risk heading (EN/JA: リスクのあるプロジェクト)"
            },
            componentsAtRiskHeading: {
                type: "heading",
                css: "main > div:first-child > div > div:nth-of-type(2) h3",
                description: "Components at Risk heading (EN/JA: リスクのあるコンポーネント)"
            },
            totalRiskScoreHeading: {
                type: "heading",
                css: "main > div:first-child > div > div:nth-of-type(3) h3",
                description: "Total Risk Score heading (EN/JA: 総リスクスコア)"
            },
            // Search Control - Verified: searchbox role → matchCount = 1 (works in both EN and JA)
            searchBox: {
                type: "searchbox",
                css: "input[type='search'], input[role='searchbox'], searchbox",
                description: "Search vulnerabilities by CVE ID"
            },
            // Table Control - Verified: main table → matchCount = 1
            vulnerabilitiesTable: {
                type: "grid",
                css: "main table",
                description: "Vulnerabilities data table"
            },
            // Language selector - Verified: button global → matchCount = 1  
            languageButton: {
                type: "button",
                name: "global",
                description: "Language selector button"
            },
            // Vulnerabilities menu item - Verified: XPath → matchCount = 1
            vulnerabilitiesMenuItem: {
                type: "menuitem",
                xpath: "//li[@role='menuitem' and contains(., 'Vulnerabilities')]",
                description: "Vulnerabilities menu item in sidebar"
            }
        };
        this.Items = this.items(this.controls);
    }
    async goto() {
        await this.page.goto(this.url);
        await this.waitForPageLoad('networkidle');
    }
    async clickVulnerabilitiesMenu() {
        // Support both English and Japanese - exact match to avoid matching "Vulnerability Audit"
        const vulnMenu = this.page.locator('[role="menuitem"]').filter({ hasText: /^(safety )?Vulnerabilities$/ }).or(this.page.locator('[role="menuitem"]').filter({ hasText: /^(safety )?脆弱性$/ }));
        await vulnMenu.click();
        await this.waitForNavigation('networkidle');
    }
    async searchByCVE(cveId) {
        await this.formEnter([
            this.$(this.controls.searchBox, cveId)
        ]);
    }
    async getTableHeaders() {
        const tableLocator = this.getLocator(this.controls.vulnerabilitiesTable);
        const headers = await tableLocator.locator('thead th').allTextContents();
        return headers.map(h => h.trim());
    }
    async switchToJapanese() {
        await this.formEnter([this.controls.languageButton]);
        await this.page.waitForTimeout(1000);
        // Click Japanese option - using menuitem selector
        const japaneseOption = this.page.locator('[role="menuitem"]:has-text("Japanese")');
        await japaneseOption.click();
        await this.page.waitForTimeout(1500);
    }
}
exports.VulnerabilitiesPage = VulnerabilitiesPage;
