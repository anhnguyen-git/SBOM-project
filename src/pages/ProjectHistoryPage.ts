/**
 * AdministrationPage - Administration page
 * Language-agnostic selectors support both EN and JA
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class ProjectHistoryPage extends BasePage {
  protected url = "http://35.74.242.225:20010/dashboard/projects";

  private controls = {

    bomUploadUser: {
      type: "textbox",
      xpath: this.isJA() ?
        "(//div[span[.='BOMアップロードユーザー']])[1]/following-sibling::div[1]" :
        "(//div[span[.='BOM Upload User']])[1]/following-sibling::div[1]"
    } as Control,

    bomUploadDate: {
      type: "textbox",
      xpath: this.isJA() ?
        "(//div[span[.='BOMアップロード日時']])[1]/following-sibling::div[1]" :
        "(//div[span[.='BOM Upload Date']])[1]/following-sibling::div[1]"
    } as Control,

    numberOfChangedComponents: {
      type: "textbox",
      xpath: this.isJA() ?
        "(//div[span[.='変更されたコンポーネント数']])[1]/following-sibling::div" :
        "(//div[span[.='Number of changed Components']])[1]/following-sibling::div"
    } as Control,

    //Total Risk Core
    totalRiskCoreCurrentVersion: {
      type: "menuitem",
      xpath: this.isJA() ?
        "(//div[span[.='現在のバージョン']])[1]/following-sibling::div[1]" :
        "(//div[span[.='Current Version']])[1]/following-sibling::div[1]",
      description: "Total Risk Core Current Version"
    } as Control,

    totalRiskCoreRevisionVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "(//div[span[.='リビジョン']])[1]/following-sibling::div" :
        "(//div[span[.='Revision']])[1]/following-sibling::div",
      description: "Total Risk Core Revision Version"
    } as Control,

    revisionDateInTotalRiskScore: {
      type: "textbox",
      xpath: this.isJA() ?
        "(//div[span[.='リビジョン']])[1]/span[2]" :
        "(//div[span[.='Revision']])[1]/span[2]"
    } as Control,

    scoresOfChange: {
      type: "textbox",
      xpath: "//span[contains(@class,'period')]/span[contains(@class, 'percent-change')]",
    } as Control,

    //Total Risk by Severity
    //Critical
    criticalCurrentVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '致命的']]/following-sibling::div[1]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'Critical']]/following-sibling::div[1]",
    } as Control,

    criticalRevisionVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '致命的']]/following-sibling::div[2]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'Critical']]/following-sibling::div[2]",
    } as Control,

    //High
    highCurrentVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '高']]/following-sibling::div[1]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'High']]/following-sibling::div[1]",
    } as Control,

    highRevisionVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '高']]/following-sibling::div[2]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'High']]/following-sibling::div[2]",
    } as Control,

    //Medium
    mediumCurrentVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '中']]/following-sibling::div[1]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'Medium']]/following-sibling::div[1]",
    } as Control,

    mediumRevisionVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '中']]/following-sibling::div[2]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'Medium']]/following-sibling::div[2]",
    } as Control,

    //Low
    lowCurrentVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '低']]/following-sibling::div[1]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'Low']]/following-sibling::div[1]",
    } as Control,

    lowRevisionVersion: {
      type: "textbox",
      xpath: this.isJA() ?
        "//div[contains(@class, 'ant-col')][.//div[text() = '低']]/following-sibling::div[2]" :
        "//div[contains(@class, 'ant-col')][.//div[text() = 'Low']]/following-sibling::div[2]",
    } as Control,

    //Revision dropdown

    currentRevisionLabel: {
      type: "textbox",
      xpath: "//div[contains(@class,'select__control')]//div[contains(@class, 'single-value')]",
    } as Control,

    openRevisionDropdown: {
      type: "listitem",
      xpath: "//div[contains(@class,'select__control')]//div[contains(@class, 'dropdown')]",
    } as Control,

    revisionOption: {
      type: "option",
      dynamic: "//div[contains(@class, 'option') and normalize-space(text())= '{0}']",
    } as Control,

    searchByComponentChangedNameInput: {
      type: "searchbox",
      xpath: this.isJA() ?
        "//div[div[.='コンポーネント変更']]//span[contains(@class,'ant-input-search')]//input" :
        "//div[div[.='Component Changed']]//span[contains(@class,'ant-input-search')]//input"
    } as Control,

    searchByComponentChangedNameButton: {
      type: "button",
      xpath: this.isJA() ?
        "//div[div[.='コンポーネント変更']]//span[contains(@class,'ant-input-search')]//button" :
        "//div[div[.='Component Changed']]//span[contains(@class,'ant-input-search')]//button"
    } as Control,

    searchByComponentNameInListOfRevisionInput: {
      type: "searchbox",
      xpath: this.isJA() ?
        "//div[h4[contains(., 'コンポーネント一覧 Revision')]]/following-sibling::div//span[contains(@class,'ant-input-search')]//input" :
        "//div[h4[contains(., 'Component list of Revision')]]/following-sibling::div//span[contains(@class,'ant-input-search')]//input"
    } as Control,

    searchByComponentNameInListOfRevisionButton: {
      type: "button",
      xpath: this.isJA() ?
        "//div[h4[contains(., 'コンポーネント一覧 Revision')]]/following-sibling::div//span[contains(@class,'ant-input-search')]//button" :
        "//div[h4[contains(., 'Component list of Revision')]]/following-sibling::div//span[contains(@class,'ant-input-search')]//button"
    } as Control,
  };

  readonly Items = this.items(this.controls);

  async goto() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }
}