/**
 * DashboardPage - Main Dashboard page with overview and serious incidents
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class DashboardPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard";

  private controls = {
    // Navigation menu items - using aria-label for language independence
    dashboardMenuItem: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="dashboard"])',
      description: "Dashboard menu item"
    } as Control,

    projectsMenuItem: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="product"])',
      description: "Projects menu item"
    } as Control,

    componentsMenuItem: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="container"])',
      description: "Components menu item"
    } as Control,

    vulnerabilitiesMenuItem: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="safety"])',
      description: "Vulnerabilities menu item"
    } as Control,

    vulnerabilityAuditMenuItem: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="project"]):has-text("Audit")',
      description: "Vulnerability Audit menu item"
    } as Control,

    policyViolationAuditMenuItem: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("Policy")',
      description: "Policy Violation Audit menu item"
    } as Control,

    eolEosComponentsMenuItem: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("EOL")',
      description: "EOL/EOS Components menu item"
    } as Control,

   
    languageButton: {
      type: "button",
      css:  this.isJA() ? 'button:has-text("JA")': 'button:has-text("EN")' ,
      description: "Language selector button"
    } as Control,

    globalButton: {
      type: "button",
      css: 'button:has([aria-label="global"])',
      description: "Global settings button"
    } as Control,

    notificationBell: {
      type: "img",
      css: '[aria-label="bell"]',
      description: "Notification bell icon"
    } as Control,

    userProfileButton: {
      type: "button",
      css: 'button:has-text("R")',
      description: "User profile button"
    } as Control,

    // Dashboard content - Serious Incidents table
    seriousIncidentsHeading: {
      type: "heading",
      css: 'h3:has-text("Serious Incidents"), h3:has-text("重大インシデント")',
      description: "Serious Incidents section heading"
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

    // Summary section
    summaryHeading: {
      type: "heading",
      css: 'h3:has-text("Summary"), h3:has-text("概要")',
      description: "Summary section heading"
    } as Control,

    // CVSS Severity chart
    cvssSeverityHeading: {
      type: "heading",
      css: 'h5:has-text("CVSS Severity"), h5:has-text("CVSS重大度")',
      description: "CVSS Severity chart heading"
    } as Control,

    // License chart
    licenseHeading: {
      type: "heading",
      css: 'h5:has-text("License"), h5:has-text("ライセンス")',
      description: "License chart heading"
    } as Control,

    // Quick Access section
    quickAccessHeading: {
      type: "heading",
      css: 'h3:has-text("Quick Access"), h3:has-text("クイックアクセス")',
      description: "Quick Access section heading"
    } as Control,

    mostRecentHeading: {
      type: "heading",
      css: 'h5:has-text("Most Recent"), h5:has-text("最近の項目")',
      description: "Most Recent section heading"
    } as Control,

    mostVisitedHeading: {
      type: "heading",
      css: 'h5:has-text("Most Visited"), h5:has-text("よく訪問する項目")',
      description: "Most Visited section heading"
    } as Control,

    // Logo
    logo: {
      type: "img",
      css: '[aria-label="Logo"]',
      description: "Application logo"
    } as Control
  };

  readonly Items = this.items(this.controls);

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
