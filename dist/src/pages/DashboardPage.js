"use strict";
/**
 * DashboardPage - Main Dashboard page with overview and serious incidents
 * Language-agnostic selectors support both EN and JA
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPage = void 0;
const BasePage_1 = require("./BasePage");
class DashboardPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/dashboard";
        this.controls = {
            // Navigation menu items - using aria-label for language independence
            dashboardMenuItem: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="dashboard"])',
                description: "Dashboard menu item"
            },
            projectsMenuItem: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="product"])',
                description: "Projects menu item"
            },
            componentsMenuItem: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="container"])',
                description: "Components menu item"
            },
            vulnerabilitiesMenuItem: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="safety"])',
                description: "Vulnerabilities menu item"
            },
            vulnerabilityAuditMenuItem: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="project"]):has-text("Audit")',
                description: "Vulnerability Audit menu item"
            },
            policyViolationAuditMenuItem: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("Policy")',
                description: "Policy Violation Audit menu item"
            },
            eolEosComponentsMenuItem: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("EOL")',
                description: "EOL/EOS Components menu item"
            },
            languageButton: {
                type: "button",
                css: this.isJA() ? 'button:has-text("JA")' : 'button:has-text("EN")',
                description: "Language selector button"
            },
            globalButton: {
                type: "button",
                css: 'button:has([aria-label="global"])',
                description: "Global settings button"
            },
            notificationBell: {
                type: "img",
                css: '[aria-label="bell"]',
                description: "Notification bell icon"
            },
            userProfileButton: {
                type: "button",
                css: 'button:has-text("R")',
                description: "User profile button"
            },
            // Dashboard content - Serious Incidents table
            seriousIncidentsHeading: {
                type: "heading",
                css: 'h3:has-text("Serious Incidents"), h3:has-text("重大インシデント")',
                description: "Serious Incidents section heading"
            },
            refreshButton: {
                type: "button",
                css: '[aria-label="sync"], img[aria-label="sync"]',
                description: "Refresh button"
            },
            columnSettingsButton: {
                type: "button",
                css: 'img[aria-label="insert-row-right"]',
                description: "Column settings button"
            },
            // Summary section
            summaryHeading: {
                type: "heading",
                css: 'h3:has-text("Summary"), h3:has-text("概要")',
                description: "Summary section heading"
            },
            // CVSS Severity chart
            cvssSeverityHeading: {
                type: "heading",
                css: 'h5:has-text("CVSS Severity"), h5:has-text("CVSS重大度")',
                description: "CVSS Severity chart heading"
            },
            // License chart
            licenseHeading: {
                type: "heading",
                css: 'h5:has-text("License"), h5:has-text("ライセンス")',
                description: "License chart heading"
            },
            // Quick Access section
            quickAccessHeading: {
                type: "heading",
                css: 'h3:has-text("Quick Access"), h3:has-text("クイックアクセス")',
                description: "Quick Access section heading"
            },
            mostRecentHeading: {
                type: "heading",
                css: 'h5:has-text("Most Recent"), h5:has-text("最近の項目")',
                description: "Most Recent section heading"
            },
            mostVisitedHeading: {
                type: "heading",
                css: 'h5:has-text("Most Visited"), h5:has-text("よく訪問する項目")',
                description: "Most Visited section heading"
            },
            // Logo
            logo: {
                type: "img",
                css: '[aria-label="Logo"]',
                description: "Application logo"
            }
        };
        this.Items = this.items(this.controls);
    }
    async goto() {
        await this.page.goto(this.url);
        await this.waitForPageLoad();
    }
    async navigateToProjects() {
        await this.formEnter([this.controls.projectsMenuItem]);
        await this.waitForNavigation();
    }
    async navigateToComponents() {
        await this.formEnter([this.controls.componentsMenuItem]);
        await this.waitForNavigation();
    }
    async navigateToVulnerabilities() {
        await this.formEnter([this.controls.vulnerabilitiesMenuItem]);
        await this.waitForNavigation();
    }
    async navigateToVulnerabilityAudit() {
        await this.formEnter([this.controls.vulnerabilityAuditMenuItem]);
        await this.waitForNavigation();
    }
    async navigateToPolicyViolationAudit() {
        await this.formEnter([this.controls.policyViolationAuditMenuItem]);
        await this.waitForNavigation();
    }
    async navigateToEolEosComponents() {
        await this.formEnter([this.controls.eolEosComponentsMenuItem]);
        await this.waitForNavigation();
    }
    async refreshData() {
        await this.formEnter([this.controls.refreshButton]);
    }
    async switchToJapanese() {
        await this.formEnter([this.controls.languageButton]);
        await this.waitForPageLoad();
    }
}
exports.DashboardPage = DashboardPage;
