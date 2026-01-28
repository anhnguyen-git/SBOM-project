/**
 * Navigation Test - EN (English) - Tests navigation across all pages in English
 */

import { test, expect } from "@playwright/test";
import { SBomLoginPage } from "../pages/SBomLoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { ComponentsPage } from "../pages/ComponentsPage";
import { VulnerabilitiesPage } from "../pages/VulnerabilitiesPage";
import { VulnerabilityAuditPage } from "../pages/VulnerabilityAuditPage";
import { PolicyViolationAuditPage } from "../pages/PolicyViolationAuditPage";
import { EolEosComponentsPage } from "../pages/EolEosComponentsPage";

test.describe("SBom Navigation Tests - EN", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new SBomLoginPage(page);
    await loginPage.goto();
    await loginPage.login("rose2026", "Ntva@12345");
    
    // Ensure English language is selected
    const dashboardPage = new DashboardPage(page);
    // Language should already be EN by default
  });

  test("should verify all Dashboard page controls are visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Verify all navigation menu controls
    await dashboardPage.expectControl(dashboardPage.Items.dashboardMenuItem).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.projectsMenuItem).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.componentsMenuItem).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.vulnerabilitiesMenuItem).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.vulnerabilityAuditMenuItem).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.policyViolationAuditMenuItem).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.eolEosComponentsMenuItem).toBeVisible();

    // Verify header controls

    await dashboardPage.expectControl(dashboardPage.Items.languageButton).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.globalButton).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.notificationBell).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.userProfileButton).toBeVisible();

    // Verify dashboard content controls
    await dashboardPage.expectControl(dashboardPage.Items.seriousIncidentsHeading).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.summaryHeading).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.cvssSeverityHeading).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.licenseHeading).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.quickAccessHeading).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.mostRecentHeading).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.mostVisitedHeading).toBeVisible();
  });

  test("should verify all Projects page controls are visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToProjects();

    const projectsPage = new ProjectsPage(page);

    // Verify all heading controls
    await dashboardPage.expectControl(dashboardPage.Items.mostVisitedHeading).toBeVisible();
    await dashboardPage.expectControl(dashboardPage.Items.mostVisitedHeading).toBeVisible();
    await projectsPage.expectControl(projectsPage.Items.projectsAtRiskHeading).toBeVisible();
    await projectsPage.expectControl(projectsPage.Items.componentsAtRiskHeading).toBeVisible();
    await projectsPage.expectControl(projectsPage.Items.totalRiskScoreHeading).toBeVisible();

    // Verify tab controls
    await projectsPage.expectControl(projectsPage.Items.projectsTab).toBeVisible();
    await projectsPage.expectControl(projectsPage.Items.targetsTab).toBeVisible();

    // Verify action button controls
    await projectsPage.expectControl(projectsPage.Items.createProjectButton).toBeVisible();
    await projectsPage.expectControl(projectsPage.Items.searchButton).toBeVisible();
    await projectsPage.expectControl(projectsPage.Items.exportButton).toBeVisible();

    // Verify table control
    await projectsPage.expectControl(projectsPage.Items.projectsTable).toBeVisible();
  });

  test("should verify all Components page controls are visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToComponents();

    const componentsPage = new ComponentsPage(page);

    // Verify all heading controls
    await componentsPage.expectControl(componentsPage.Items.projectsAtRiskHeading).toBeVisible();
    await componentsPage.expectControl(componentsPage.Items.componentsAtRiskHeading).toBeVisible();
    await componentsPage.expectControl(componentsPage.Items.totalRiskScoreHeading).toBeVisible();

    // Verify search controls
    await componentsPage.expectControl(componentsPage.Items.purlCombobox).toBeVisible();
    await componentsPage.expectControl(componentsPage.Items.searchButton).toBeVisible();

    // Verify action button controls
    await componentsPage.expectControl(componentsPage.Items.exportButton).toBeVisible();

    // Verify table control
    await componentsPage.expectControl(componentsPage.Items.componentsTable).toBeVisible();
  });

  test("should verify all Vulnerabilities page controls are visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToVulnerabilities();

    const vulnerabilitiesPage = new VulnerabilitiesPage(page);

    // Verify all heading controls
    await vulnerabilitiesPage.expectControl(vulnerabilitiesPage.Items.projectsAtRiskHeading).toBeVisible();
    await vulnerabilitiesPage.expectControl(vulnerabilitiesPage.Items.componentsAtRiskHeading).toBeVisible();
    await vulnerabilitiesPage.expectControl(vulnerabilitiesPage.Items.totalRiskScoreHeading).toBeVisible();

    // Verify search control
    await vulnerabilitiesPage.expectControl(vulnerabilitiesPage.Items.searchBox).toBeVisible();

    // Verify table control
    await vulnerabilitiesPage.expectControl(vulnerabilitiesPage.Items.vulnerabilitiesTable).toBeVisible();

    // Verify language button control
    await vulnerabilitiesPage.expectControl(vulnerabilitiesPage.Items.languageButton).toBeVisible();

    // Verify menu item control
    await vulnerabilitiesPage.expectControl(vulnerabilitiesPage.Items.vulnerabilitiesMenuItem).toBeVisible();
  });

  test("should verify all Vulnerability Audit page controls are visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToVulnerabilityAudit();

    const vulnerabilityAuditPage = new VulnerabilityAuditPage(page);

    // Verify filter section controls
    await vulnerabilityAuditPage.expectControl(vulnerabilityAuditPage.Items.filtersHeading).toBeVisible();
    await vulnerabilityAuditPage.expectControl(vulnerabilityAuditPage.Items.clearAllButton).toBeVisible();

    // Verify search controls
    await vulnerabilityAuditPage.expectControl(vulnerabilityAuditPage.Items.textSearchInput).toBeVisible();

    // Verify date filter controls
    await vulnerabilityAuditPage.expectControl(vulnerabilityAuditPage.Items.publishedFromDate).toBeVisible();
    await vulnerabilityAuditPage.expectControl(vulnerabilityAuditPage.Items.publishedToDate).toBeVisible();

    // Verify action button controls
    await vulnerabilityAuditPage.expectControl(vulnerabilityAuditPage.Items.exportButton).toBeVisible();

    // Verify table control
    await vulnerabilityAuditPage.expectControl(vulnerabilityAuditPage.Items.vulnerabilityAuditTable).toBeVisible();
  });

  test("should verify all Policy Violation Audit page controls are visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToPolicyViolationAudit();

    const policyViolationAuditPage = new PolicyViolationAuditPage(page);

    // Verify filter section controls
    await policyViolationAuditPage.expectControl(policyViolationAuditPage.Items.filtersHeading).toBeVisible();
    await policyViolationAuditPage.expectControl(policyViolationAuditPage.Items.clearAllButton).toBeVisible();

    // Verify search controls
    await policyViolationAuditPage.expectControl(policyViolationAuditPage.Items.textSearchInput).toBeVisible();

    // Verify combobox control
    await policyViolationAuditPage.expectControl(policyViolationAuditPage.Items.policiesCombobox).toBeVisible();

    // Verify action button controls
    await policyViolationAuditPage.expectControl(policyViolationAuditPage.Items.exportButton).toBeVisible();

    // Verify table control
    await policyViolationAuditPage.expectControl(policyViolationAuditPage.Items.policyViolationTable).toBeVisible();
  });

  test("should verify all EOL/EOS Components page controls are visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToEolEosComponents();

    const eolEosComponentsPage = new EolEosComponentsPage(page);

    // Verify all heading controls
    await eolEosComponentsPage.expectControl(eolEosComponentsPage.Items.projectsAtRiskHeading).toBeVisible();
    await eolEosComponentsPage.expectControl(eolEosComponentsPage.Items.componentsAtRiskHeading).toBeVisible();
    await eolEosComponentsPage.expectControl(eolEosComponentsPage.Items.totalRiskScoreHeading).toBeVisible();

    // Verify action button controls
    await eolEosComponentsPage.expectControl(eolEosComponentsPage.Items.exportButton).toBeVisible();

    // Verify table control
    await eolEosComponentsPage.expectControl(eolEosComponentsPage.Items.eolEosComponentsTable).toBeVisible();
  });
});
