"use strict";
/**
 * PolicyViolationAuditPage - Policy Violation Audit with filters
 * Language-agnostic selectors support both EN and JA
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyViolationAuditPage = void 0;
const BasePage_1 = require("./BasePage");
class PolicyViolationAuditPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/dashboard/policy-audit";
        this.controls = {
            // Filter section
            filtersHeading: {
                type: "heading",
                css: 'h3:has-text("Filters"), h3:has-text("フィルタ")',
                description: "Filters heading"
            },
            clearAllButton: {
                type: "button",
                css: 'button:has-text("Clear All"), button:has-text("すべてクリア")',
                description: "Clear All filters button"
            },
            // Projects filter
            showInactiveProjectsCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"]',
                description: "Show inactive projects checkbox"
            },
            // Violation State checkboxes
            warnCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"] + label:has-text("WARN")',
                description: "WARN violation state checkbox"
            },
            informCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"] + label:has-text("INFORM")',
                description: "INFORM violation state checkbox"
            },
            failCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"] + label:has-text("FAIL")',
                description: "FAIL violation state checkbox"
            },
            // Text search
            textSearchInput: {
                type: "textbox",
                css: 'input[placeholder*="Search"], input[placeholder*="検索"]',
                description: "Text search input"
            },
            // Search in checkboxes
            policyNameCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"] + label:has-text("Policy Name"), input[type="checkbox"] + label:has-text("ポリシー名")',
                description: "Search in Policy Name checkbox"
            },
            componentCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"] + label:has-text("Component"), input[type="checkbox"] + label:has-text("コンポーネント")',
                description: "Search in Component checkbox"
            },
            licenseCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"] + label:has-text("License"), input[type="checkbox"] + label:has-text("ライセンス")',
                description: "Search in License checkbox"
            },
            projectNameCheckbox: {
                type: "checkbox",
                css: 'input[type="checkbox"] + label:has-text("Project Name"), input[type="checkbox"] + label:has-text("プロジェクト名")',
                description: "Search in Project Name checkbox"
            },
            // Policies filter
            policiesCombobox: {
                type: "combobox",
                css: '[role="combobox"]',
                description: "Policies selector combobox"
            },
            // Action buttons
            exportButton: {
                type: "button",
                css: 'button:has-text("Export"), button:has-text("エクスポート")',
                description: "Export button"
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
            // Table
            policyViolationTable: {
                type: "grid",
                css: 'main table, [role="table"]',
                description: "Policy violation audit data table"
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
    async clearAllFilters() {
        await this.formEnter([this.controls.clearAllButton]);
    }
    async searchByText(searchText) {
        await this.formEnter([
            this.$(this.controls.textSearchInput, searchText)
        ]);
    }
    async setViolationStateFilter(warn, inform, fail) {
        await this.formEnter([
            this.$(this.controls.warnCheckbox, warn),
            this.$(this.controls.informCheckbox, inform),
            this.$(this.controls.failCheckbox, fail)
        ]);
    }
    async refreshData() {
        await this.formEnter([this.controls.refreshButton]);
    }
}
exports.PolicyViolationAuditPage = PolicyViolationAuditPage;
