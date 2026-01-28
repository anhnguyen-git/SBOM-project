/**
 * AdministrationPage - Administration page
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class UsersPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard/administration/user-management/users";

  private controls = {
    //User lists
    createUserButton: {
      type: "button",
      xpath: this.isJA() ?
        "//span[text() = 'ユーザー作成']/parent::button" :
        "//span[text() = 'Create User']/parent::button",
      description: "Create User button"
    } as Control,

    searchByUsernameInput: {
      type: "searchbox",
      xpath: "//span[contains(@class,'ant-input-search')]//input"
    } as Control,

    searchButton: {
      type: "button",
      xpath: "//span[contains(@class,'ant-input-search')]//button"
    } as Control,

    //Create User dialog
    createFirstnameInput: {
      type: "textbox",
      xpath: "//input[@name = 'first_name']"
    } as Control,

    createLastnameInput: {
      type: "textbox",
      xpath: "//input[@name = 'last_name']"
    } as Control,

    createUsernameInput: {
      type: "textbox",
      xpath: "//input[@name = 'username']"
    } as Control,

    createEmailInput: {
      type: "textbox",
      xpath: "//input[@name = 'email']"
    } as Control,

    createDepartmentInput: {
      type: "textbox",
      xpath: "//input[@id='react-select-11-input']"
    } as Control,

    createTeamInput: {
      type: "textbox",
      xpath: "//input[@id='react-select-12-input']"
    } as Control,

    superAdminCheckbox: {
      type: "checkbox",
      xpath: "//input[@name = 'super_admin']"
    } as Control,

    cancelCreateButton: {
      type: "button",
      xpath: "//form//button[@type = 'button']"
    } as Control,

    confirmCreateButton: {
      type: "button",
      xpath: "//button[@type = 'submit']"
    } as Control,

    //Edit User
    deleteUserButton: {
      type: "button",
      xpath: "//button[span[@aria-label = 'delete']]",
      description: "Delete User button"
    } as Control,

    confirmDeleteYesButton: {
      type: "button",
      xpath: this.isJA() ? '//button[.="はい"]' : '//button[.="Yes"]'
    } as Control,

    editButton: {
      type: "button",
      xpath: "//span[contains(@class, 'anticon-edit')]"
    } as Control,

    editFirstnameInput: {
      type: "textbox",
      xpath: "//input[@name = 'first_name']"
    } as Control,

    editLastnameInput: {
      type: "textbox",
      xpath: "//input[@name = 'last_name']"
    } as Control,

    editDepartmentInput: {
      type: "textbox",
      xpath: "//input[@id = 'react-select-21-input']"
    } as Control,

    removeAllDepartmentsButton: {
      type: "button",
      xpath: this.isJA() ?
        "//div[div[span[.='部署*']]]//div[contains(@class,'select__clear')]" :
        "//div[div[span[.='Department*']]]//div[contains(@class,'select__clear')]"
    } as Control,

    editTeamInput: {
      type: "textbox",
      xpath: "//input[@id = 'react-select-22-input']"
    } as Control,

    removeAllTeamsButton: {
      type: "button",
      xpath: this.isJA() ?
        "//div[div[span[.='チーム*']]]//div[contains(@class,'select__clear')]" :
        "//div[div[span[.='Team*']]]//div[contains(@class,'select__clear')]"
    } as Control,

    removeByNameButton: {
      type: "button",
      dynamic: "//div[@aria-label='Remove {0}']"
    } as Control,

    editDescriptionInput: {
      type: "textbox",
      xpath: "//textarea[@name = 'description']"
    } as Control,

    activeUserToggle: {
      type: "button",
      xpath: "//button[@name = 'status']"
    } as Control,

    cancelEditButton: {
      type: "button",
      xpath: "//button[contains(@class, 'cancel')]"
    } as Control,

    saveButton: {
      type: "button",
      xpath: "//button[contains(@class, 'primary')]"
    } as Control,
  };

  readonly Items = this.items(this.controls);

  async goto() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }
}