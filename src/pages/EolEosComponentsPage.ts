/**
 * EolEosComponentsPage - EOL/EOS Components listing page
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class EolEosComponentsPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard/eol-eos-components";

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

    eolStartDate: {
      type: "textbox",
      css: 'input[date-range="start"]:first-of-type',
      description: "EOL start date input"
    } as Control,

    eolEndDate: {
      type: "textbox",
      css: 'input[date-range="end"]:first-of-type',
      description: "EOL end date input"
    } as Control,

    eosStartDate: {
      type: "textbox",
      css: 'input[date-range="start"]:last-of-type',
      description: "EOS start date input"
    } as Control,

    eosEndDate: {
      type: "textbox",
      css: 'input[date-range="end"]:last-of-type',
      description: "EOS end date input"
    } as Control,

    // Action buttons
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
    eolEosComponentsTable: {
      type: "grid",
      css: 'main table, [role="table"]',
      description: "EOL/EOS components data table"
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

  async setEolDateRange(startDate: string, endDate: string) {
    await this.formEnter([
      this.$(this.controls.eolStartDate, startDate),
      this.$(this.controls.eolEndDate, endDate)
    ]);
  }

  async setEosDateRange(startDate: string, endDate: string) {
    await this.formEnter([
      this.$(this.controls.eosStartDate, startDate),
      this.$(this.controls.eosEndDate, endDate)
    ]);
  }

  async refreshData() {
    await this.formEnter([this.controls.refreshButton]);
  }

  
  
}
