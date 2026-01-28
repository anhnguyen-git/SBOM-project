/**
 * ComponentsPage - Components listing and search page
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class ComponentsPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard/components";

  private controls = {
    // Page stats
    projectsAtRiskHeading: {
      type: "heading",
      css: 'h3:has-text("Projects at Risk"), h3:has-text("リスクのあるプロジェクト")',
      description: "Projects at Risk heading"
    } as Control,

    componentsAtRiskHeading: {
      type: "heading",
      css: 'h3:has-text("Components at Risk"), h3:has-text("リスクのあるコンポーネント")',
      description: "Components at Risk heading"
    } as Control,

    totalRiskScoreHeading: {
      type: "heading",
      css: 'h3:has-text("Total Risk Score"), h3:has-text("総リスクスコア")',
      description: "Total Risk Score heading"
    } as Control,

    purlCombobox: {
      type: "combobox",
      css: '[role="combobox"]',
      description: "PURL selector combobox"
    } as Control,

    purlTextbox: {
      type: "textbox",
      css: '[role="textbox"], input[role="textbox"]',
      description: "PURL search input"
    } as Control,

    searchButton: {
      type: "button",
      css: 'button:has-text("Search"), button:has-text("検索")',
      description: "Search button"
    } as Control,

    exportButton: {
      type: "button",
      css: 'button:has-text("Export"), button:has-text("エクスポート")',
      description: "Export button"
    } as Control,

    refreshButton: {
      type: "button",
      css: 'img[aria-label="sync"]',
      description: "Refresh button"
    } as Control,

    columnSettingsButton: {
      type: "button",
      css: 'img[aria-label="insert-row-right"]',
      description: "Column settings button"
    } as Control,

    // Table
    componentsTable: {
      type: "grid",
      css: 'main table, [role="table"]',
      description: "Components data table"
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

  async searchByPurl(purl: string) {
    await this.formEnter([
      this.$(this.controls.purlTextbox, purl),
      this.controls.searchButton
    ]);
  }

  async refreshData() {
    await this.formEnter([this.controls.refreshButton]);
  }

 
}
