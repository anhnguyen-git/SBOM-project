"use strict";
/**
 * EolEosComponentsPage - EOL/EOS Components listing page
 * Language-agnostic selectors support both EN and JA
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EolEosComponentsPage = void 0;
const BasePage_1 = require("./BasePage");
class EolEosComponentsPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/dashboard/eol-eos-components";
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
            eolStartDate: {
                type: "textbox",
                css: 'input[date-range="start"]:first-of-type',
                description: "EOL start date input"
            },
            eolEndDate: {
                type: "textbox",
                css: 'input[date-range="end"]:first-of-type',
                description: "EOL end date input"
            },
            eosStartDate: {
                type: "textbox",
                css: 'input[date-range="start"]:last-of-type',
                description: "EOS start date input"
            },
            eosEndDate: {
                type: "textbox",
                css: 'input[date-range="end"]:last-of-type',
                description: "EOS end date input"
            },
            // Action buttons
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
            eolEosComponentsTable: {
                type: "grid",
                css: 'main table, [role="table"]',
                description: "EOL/EOS components data table"
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
    async setEolDateRange(startDate, endDate) {
        await this.formEnter([
            this.$(this.controls.eolStartDate, startDate),
            this.$(this.controls.eolEndDate, endDate)
        ]);
    }
    async setEosDateRange(startDate, endDate) {
        await this.formEnter([
            this.$(this.controls.eosStartDate, startDate),
            this.$(this.controls.eosEndDate, endDate)
        ]);
    }
    async refreshData() {
        await this.formEnter([this.controls.refreshButton]);
    }
}
exports.EolEosComponentsPage = EolEosComponentsPage;
