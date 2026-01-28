"use strict";
/**
 * ComponentsPage - Components listing and search page
 * Language-agnostic selectors support both EN and JA
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentsPage = void 0;
const BasePage_1 = require("./BasePage");
class ComponentsPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/dashboard/components";
        this.controls = {
            // Page stats
            projectsAtRiskHeading: {
                type: "heading",
                css: 'h3:has-text("Projects at Risk"), h3:has-text("リスクのあるプロジェクト")',
                description: "Projects at Risk heading"
            },
            componentsAtRiskHeading: {
                type: "heading",
                css: 'h3:has-text("Components at Risk"), h3:has-text("リスクのあるコンポーネント")',
                description: "Components at Risk heading"
            },
            totalRiskScoreHeading: {
                type: "heading",
                css: 'h3:has-text("Total Risk Score"), h3:has-text("総リスクスコア")',
                description: "Total Risk Score heading"
            },
            purlCombobox: {
                type: "combobox",
                css: '[role="combobox"]',
                description: "PURL selector combobox"
            },
            purlTextbox: {
                type: "textbox",
                css: '[role="textbox"], input[role="textbox"]',
                description: "PURL search input"
            },
            searchButton: {
                type: "button",
                css: 'button:has-text("Search"), button:has-text("検索")',
                description: "Search button"
            },
            exportButton: {
                type: "button",
                css: 'button:has-text("Export"), button:has-text("エクスポート")',
                description: "Export button"
            },
            refreshButton: {
                type: "button",
                css: 'img[aria-label="sync"]',
                description: "Refresh button"
            },
            columnSettingsButton: {
                type: "button",
                css: 'img[aria-label="insert-row-right"]',
                description: "Column settings button"
            },
            // Table
            componentsTable: {
                type: "grid",
                css: 'main table, [role="table"]',
                description: "Components data table"
            },
            // Breadcrumb
            dashboardBreadcrumb: {
                type: "link",
                css: '[role="navigation"] [role="link"]:has-text("Dashboard"), [role="navigation"] [role="link"]:has-text("ダッシュボード")',
                description: "Dashboard breadcrumb link"
            }
        };
        this.Items = this.items(this.controls);
    }
    async goto() {
        await this.page.goto(this.url);
        await this.waitForPageLoad();
    }
    async searchByPurl(purl) {
        await this.formEnter([
            this.$(this.controls.purlTextbox, purl),
            this.controls.searchButton
        ]);
    }
    async refreshData() {
        await this.formEnter([this.controls.refreshButton]);
    }
}
exports.ComponentsPage = ComponentsPage;
