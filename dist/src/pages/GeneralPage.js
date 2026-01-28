"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralPage = void 0;
const BasePage_1 = require("./BasePage");
const CustomizeTableControl_1 = require("./CustomizeTableControl");
class GeneralPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "https://automationexercise.com/";
        this.controls = {
            //====================================
            // Header=============================
            currentLanguageButton: {
                type: "button",
                css: 'button:has-text("EN"), button:has-text("JA")'
            },
            languageSelectorButton: {
                type: "button",
                css: 'button:has([aria-label="global"])'
            },
            languageOption: {
                type: "menuitem",
                dynamic: '.ant-dropdown-menu-item:has-text("{0}")',
                description: "Language option"
            },
            notificationBell: {
                type: "img",
                css: '[aria-label="bell"]',
                description: "Notification bell icon"
            },
            userProfileButton: {
                type: "button",
                xpath: '//span[@aria-label="bell"]//following-sibling::button[contains(@class,"ant-dropdown-trigger")]'
            },
            logOutButton: {
                type: "img",
                css: '[aria-label="logout"]',
            },
            setUp2FAAuthenButton: {
                type: "img",
                css: '[aria-label="safety-certificate"]',
            },
            confirm2FASetupYesButton: {
                type: "button",
                xpath: '//button[.="Yes" or .="はい"]'
            },
            //================================================
            // PORFORLIO ========
            //================================================
            projectsNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="product"])',
                description: "Projects menu item"
            },
            componentsNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="container"])',
                description: "Components menu item"
            },
            vulnerabilitiesNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="safety"])',
                description: "Vulnerabilities menu item"
            },
            // AUDIT
            vulnerabitiesAuditNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="project"])',
                description: "Vulnerability Audit menu item"
            },
            policyViolationAuditNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("Policy"), [role="menuitem"]:has([aria-label="one-to-one"]):has-text("ポリシー違反監査")',
                description: "Policy Violation Audit menu item"
            },
            EOLEOSComponentsNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="one-to-one"]):has-text("EOL")',
                description: "EOL/EOS Components menu item"
            },
            // ADMINISTRATION
            policyManagementNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="database"])',
                description: "Policy Management menu item"
            },
            administrationNav: {
                type: "menuitem",
                css: '[role="menuitem"]:has([aria-label="solution"])',
                description: "Administration menu item"
            }
        };
        //protected override _controls = this.lst;
        this.Items = this.items(this.controls);
    }
    get table() {
        return new CustomizeTableControl_1.CustomTableControls(this.page);
    }
}
exports.GeneralPage = GeneralPage;
;
/*
async goto() {
  await this.page.goto(this.url);
  await this.waitForPageLoad();
}
async Naviage2Projects() {
  await this.formEnter([this.controls.ProjectsNav]);
  await this.waitForNavigation();
}
async Naviage2Components() {
  await this.formEnter([this.controls.ComponentsNav]);
  await this.waitForNavigation();
}
async Naviage2Vulnerabilities() {
  await this.formEnter([this.controls.VulnerabilitiesNav]);
  await this.waitForNavigation();
}
async Naviage2VulAudit() {
  await this.formEnter([this.controls.VulnerabitiesAuditNav]);
  await this.waitForNavigation();
}
async Naviage2PolicyViolate() {
  await this.formEnter([this.controls.PolicyViolationAuditNav]);
  await this.waitForNavigation();
}
async Naviage2EOLEOSComponents() {
  await this.formEnter([this.controls.EOLEOSComponentsNav]);
  await this.waitForNavigation();
}
async Naviage2PolicyManagement() {
  await this.formEnter([this.controls.PolicyManagementNav]);
  await this.waitForNavigation();
}
async Naviage2Administration() {
  await this.formEnter([this.controls.AdministrationNav]);
  await this.waitForNavigation();
}
async openUserDropdown() {
  await this.formEnter([this.controls.userProfileButton]);
}
async switchToLanguage(language: string) {
  await this.formEnter([this.controls.languageSelectorButton]);
  const languageText = language === 'EN' ? "English" : "Japanese (日本語)";
  const optionControl = this.$dynamicControl(this.controls.languageOption, languageText);
  await this.formEnter([optionControl]);
  await this.waitForPageLoad();
}
async refreshTable() {
  await this.formEnter([this.controls.refreshButton]);
}
/*
async openColumnSettings() {
  await this.formEnter([this.controls.columnSettingsButton]);
}
async goToPreviousPage() {
  await this.formEnter([this.controls.previousButton]);
}
async goToNextPage() {
  await this.formEnter([this.controls.nextButton]);
}
async goToNextFivePages() {
  await this.formEnter([this.controls.next5SheetsButton]);
}
  
protected getControls(): Record<string, Control> {
return this.controls;
}

*/ 
