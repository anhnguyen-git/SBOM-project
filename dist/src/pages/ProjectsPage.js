"use strict";
/**
 * ProjectsPage - Projects management page
 * Language-agnostic selectors support both EN and JA
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsPage = void 0;
const BasePage_1 = require("./BasePage");
class ProjectsPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/dashboard/projects";
        this.controls = {
            // Page heading and stats
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
            // Tabs
            projectsTab: {
                type: "tab",
                css: '[role="tab"]:has-text("Projects"), [role="tab"]:has-text("プロジェクト")',
                description: "Projects tab"
            },
            targetsTab: {
                type: "tab",
                css: '[role="tab"]:has-text("Targets"), [role="tab"]:has-text("ターゲット")',
                description: "Targets tab"
            },
            // Action buttons
            createProjectButton: {
                type: "button",
                css: 'button:has([aria-label="plus"]):has-text("Create"), button:has([aria-label="plus"]):has-text("作成")',
                description: "Create Project button"
            },
            searchBox: {
                type: "searchbox",
                css: '[role="searchbox"], input[role="searchbox"]',
                description: "Search by name input"
            },
            searchButton: {
                type: "button",
                css: 'button:has([aria-label="search"])',
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
            projectsTable: {
                type: "grid",
                css: 'main table, [role="table"]',
                description: "Projects data table"
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
    async createProject() {
        await this.formEnter([this.controls.createProjectButton]);
    }
    async searchByName(searchText) {
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
exports.ProjectsPage = ProjectsPage;
