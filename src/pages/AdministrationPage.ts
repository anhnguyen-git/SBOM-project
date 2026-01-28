/**
 * AdministrationPage - Administration page
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class AdministrationPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard/administration/configuration/general";

  private controls = {
    // Configuration
    generalMenuItem: {
      type: "menuitem",
      xpath: this.isJA() ?
        "//span[text() = '一般']/parent::li" :
        "//span[text() = 'General']/parent::li",
      description: "General menu item"
    } as Control,

    emailMenuItem: {
      type: "menuitem",
      xpath: this.isJA() ? 
        "//span[text() = 'メール']/parent::li" :
        "//span[text() = 'Email']/parent::li",
      description: "Email menu item"
    } as Control,

    taskSchedulerMenuItem: {
      type: "menuitem",
      xpath: this.isJA() ? 
        "//span[text() = 'タスクスケジューラー']/parent::li" :
        "//span[text() = 'Task scheduler']/parent::li",
      description: "Task Scheduler menu item"
    } as Control,

    //User Management
    usersMenuItem: {
      type: "menuitem",
      xpath: this.isJA() ? 
        "//span[text() = 'ユーザー']/parent::li" :
        "//span[text() = 'Users']/parent::li",
      description: "Users menu item"
    } as Control,

    departmentsTeamsMenuItem: {
      type: "menuitem",
      xpath: this.isJA() ? 
        "//span[text() = '部署とチーム']/parent::li" :
        "//span[text() = 'Departments & Teams']/parent::li",
      description: "Departments & Teams menu item"
    } as Control
  };

  readonly Items = this.items(this.controls);

  async goto() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }
}