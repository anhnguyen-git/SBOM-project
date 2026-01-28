/**
 * PolicyViolationAuditPage - Policy Violation Audit with filters
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class PolicyViolationAuditPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard/policy-audit";

  private controls = {
    // Filter section
    filtersHeading: {
      type: "heading",
      css: 'h3:has-text("Filters"), h3:has-text("フィルタ")',
      description: "Filters heading"
    } as Control,

    clearAllButton: {
      type: "button",
      css: 'button:has-text("Clear All"), button:has-text("すべてクリア")',
      description: "Clear All filters button"
    } as Control,

    // Projects filter
    showInactiveProjectsCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"]',
      description: "Show inactive projects checkbox"
    } as Control,

    // Violation State checkboxes
    warnCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"] + label:has-text("WARN")',
      description: "WARN violation state checkbox"
    } as Control,

    informCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"] + label:has-text("INFORM")',
      description: "INFORM violation state checkbox"
    } as Control,

    failCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"] + label:has-text("FAIL")',
      description: "FAIL violation state checkbox"
    } as Control,

    // Text search
    textSearchInput: {
      type: "textbox",
      css: 'input[placeholder*="Search"], input[placeholder*="検索"]',
      description: "Text search input"
    } as Control,

    // Search in checkboxes
    policyNameCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"] + label:has-text("Policy Name"), input[type="checkbox"] + label:has-text("ポリシー名")',
      description: "Search in Policy Name checkbox"
    } as Control,

    componentCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"] + label:has-text("Component"), input[type="checkbox"] + label:has-text("コンポーネント")',
      description: "Search in Component checkbox"
    } as Control,

    licenseCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"] + label:has-text("License"), input[type="checkbox"] + label:has-text("ライセンス")',
      description: "Search in License checkbox"
    } as Control,

    projectNameCheckbox: {
      type: "checkbox",
      css: 'input[type="checkbox"] + label:has-text("Project Name"), input[type="checkbox"] + label:has-text("プロジェクト名")',
      description: "Search in Project Name checkbox"
    } as Control,

    // Policies filter
    policiesCombobox: {
      type: "combobox",
      css: '[role="combobox"]',
      description: "Policies selector combobox"
    } as Control,

    // Action buttons
    exportButton: {
      type: "button",
      css: 'button:has-text("Export"), button:has-text("エクスポート")',
      description: "Export button"
    } as Control,

    refreshButton: {
      type: "button",
      css: '[aria-label="sync"], img[aria-label="sync"]',
      description: "Refresh button"
    } as Control,

    columnSettingsButton: {
      type: "button",
      css: 'img[aria-label="insert-row-right"]',
      description: "Column settings button"
    } as Control,

    // Table
    policyViolationTable: {
      type: "grid",
      css: 'main table, [role="table"]',
      description: "Policy violation audit data table"
    } as Control,

   

    // Breadcrumb
    dashboardBreadcrumb: {
      type: "link",
      css: '[role="navigation"] [role="link"]:has-text("Dashboard"), [role="navigation"] [role="link"]:has-text("ダッシュボード")',
      description: "Dashboard breadcrumb link"
    } as Control
  };

  readonly Items = this.items(this.controls);

  async goto() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  async clearAllFilters() {
    await this.formEnter([this.controls.clearAllButton]);
  }

  async searchByText(searchText: string) {
    await this.formEnter([
      this.$(this.controls.textSearchInput, searchText)
    ]);
  }

  async setViolationStateFilter(warn: boolean, inform: boolean, fail: boolean) {
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
