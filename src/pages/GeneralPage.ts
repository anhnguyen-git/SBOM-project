
import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";
import { CustomTableControls } from "./CustomizeTableControl";
// import { addAbortListener } from "stream";
export class GeneralPage extends BasePage {

  get table(): CustomTableControls {
    return new CustomTableControls(this.page);
  }

  protected url = "https://automationexercise.com/";

  protected controls = {
    //====================================
    // Header=============================
    currentLanguageButton: {
      type: "button",
      css: this.isJA() ? 'button:has-text("JA")' : 'button:has-text("EN")'
    } as Control,
    languageSelectorButton: {
      type: "button",
      css: 'button:has([aria-label="global"])'
    } as Control,
    languageOption: {
      type: "menuitem",
      dynamic: '.ant-dropdown-menu-item:has-text("{0}")',
      description: "Language option"
    } as Control,
    notificationBell: {
      type: "img",
      css: '[aria-label="bell"]',
      description: "Notification bell icon"
    } as Control,
    userProfileButton: {
      type: "button",
      xpath: '//span[@aria-label="bell"]//following-sibling::button[contains(@class,"ant-dropdown-trigger")]'
    } as Control,
    logOutButton: {
      type: "img",
      css: '[aria-label="logout"]',
    } as Control,
    setUp2FAAuthenButton: {
      type: "img",
      css: '[aria-label="safety-certificate"]',
    } as Control,
    confirm2FASetupYesButton: {
      type: "button",
      xpath: this.isJA() ? '//button[.="はい"]' : '//button[.="Yes"]'
    } as Control,
    //================================================
    // PORFORLIO ========
    //================================================
    projectsNav: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="product"])',
      description: "Projects menu item"
    } as Control,
    componentsNav: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="container"])',
      description: "Components menu item"
    } as Control,
    vulnerabilitiesNav: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="safety"])',
      description: "Vulnerabilities menu item"
    } as Control,
    // AUDIT
    vulnerabitiesAuditNav: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="project"])',
      description: "Vulnerability Audit menu item"
    } as Control,
    policyViolationAuditNav: {
      type: "menuitem",
      css: this.isJA() ? '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("ポリシー違反監査")' : '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("Policy")',
      description: "Policy Violation Audit menu item"
    } as Control,
    EOLEOSComponentsNav: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("EOL")',
      description: "EOL/EOS Components menu item"
    } as Control,
    // ADMINISTRATION
    policyManagementNav: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="database"])',
      description: "Policy Management menu item"
    } as Control,
    administrationNav: {
      type: "menuitem",
      css: '[role="menuitem"]:has([aria-label="solution"])',
      description: "Administration menu item"
    } as Control
  };
  //protected override _controls = this.lst;
  readonly Items = this.items(this.controls);

  async goto() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  async Naviage2Projects() {
    await this.formEnter([this.controls.projectsNav]);
    await this.waitForNavigation();
  }

  async Naviage2Components() {
    await this.formEnter([this.controls.componentsNav]);
    await this.waitForNavigation();
  }

  async Naviage2Vulnerabilities() {
    await this.formEnter([this.controls.vulnerabilitiesNav]);
    await this.waitForNavigation();
  }
  async Naviage2VulAudit() {
    await this.formEnter([this.controls.vulnerabitiesAuditNav]);
    await this.waitForNavigation();
  }
  async Naviage2PolicyViolate() {
    await this.formEnter([this.controls.policyViolationAuditNav]);
    await this.waitForNavigation();
  }
  async Naviage2EOLEOSComponents() {
    await this.formEnter([this.controls.EOLEOSComponentsNav]);
    await this.waitForNavigation();
  }
  async Naviage2PolicyManagement() {
    await this.formEnter([this.controls.policyManagementNav]);
    await this.waitForNavigation();
  }
  async Naviage2Administration() {
    await this.formEnter([this.controls.administrationNav]);
    await this.waitForNavigation();
  }

  async openUserDropdown() {
    await this.formEnter([this.controls.userProfileButton]);
  }

  async switchToLanguage(language: string) {
    await this.formEnter([this.controls.languageSelectorButton]);

    const languageText = language === 'en' ? "English" : "Japanese (日本語)";
    const optionControl = this.$dynamicControl(this.controls.languageOption, languageText);

    await this.formEnter([optionControl]);
    await this.waitForPageLoad();
  }

  async openTwoFactorSetup() {
    await this.formEnter([this.controls.setUp2FAAuthenButton]);
  }

  async confirmSetUpTwoFactor() {
    await this.formEnter([this.controls.confirm2FASetupYesButton]);
  }

  async logOut() {
    await this.openUserDropdown();
    await this.formEnter([this.controls.logOutButton]);
    await this.waitForNavigation();
  }

  async enableTwoFactorAuth(confirm: boolean = true) {
    await this.openUserDropdown();
    await this.openTwoFactorSetup();
    this.page.once('dialog', async dialog => {
      if (dialog.type() === 'confirm') {
        if (confirm) {
          await dialog.accept();
        } else {
          await dialog.dismiss();
        }
      }
    });
    await this.confirmSetUpTwoFactor();
    await this.waitForNavigation();
  }

  async disableTwoFactorAuth() {
    await this.openUserDropdown();
    await this.openTwoFactorSetup();
    await this.confirmSetUpTwoFactor();
    await this.waitForNavigation();
  }
};