/**
 * ProjectsPage - Projects management page
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class ProjectsPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard/projects";

  private controls = {
    // Page heading and stats
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

    // Tabs
    projectsTab: {
      type: "tab",
      css: '[role="tab"]:has-text("Projects"), [role="tab"]:has-text("プロジェクト")',
      description: "Projects tab"
    } as Control,

    targetsTab: {
      type: "tab",
      css: '[role="tab"]:has-text("Targets"), [role="tab"]:has-text("ターゲット")',
      description: "Targets tab"
    } as Control,

    // Action buttons
    createProjectButton: {
      type: "button",
      css: 'button:has([aria-label="plus"]):has-text("Create"), button:has([aria-label="plus"]):has-text("作成")',
      description: "Create Project button"
    } as Control,

    searchBox: {
      type: "searchbox",
      css: '[role="searchbox"], input[role="searchbox"]',
      description: "Search by name input"
    } as Control,

    searchButton: {
      type: "button",
      css: 'button:has([aria-label="search"])',
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
    projectsTable: {
      type: "grid",
      css: 'main table, [role="table"]',
      description: "Projects data table"
    } as Control,

   
    // Breadcrumb
    dashboardBreadcrumb: {
      type: "link",
      css: '[role="navigation"] [role="link"]:has-text("Dashboard"), [role="navigation"] [role="link"]:has-text("ダッシュボード")',
      description: "Dashboard breadcrumb link"
    } as Control
  };

  readonly Items = this.items(this.controls)

  async goto() {
    
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  async createProject() {
    await this.formEnter([this.controls.createProjectButton]);
  }

  async searchByName(searchText: string) {
    await this.formEnter([
      this.$(this.controls.searchBox, searchText),
      this.controls.searchButton
    ]);
  }

  async switchToTargetsTab() {
    await this.formEnter([this.controls.targetsTab]);
  }

  async refreshData() {
    await this.formEnter([this.controls.refreshButton]);
  }


 
}
