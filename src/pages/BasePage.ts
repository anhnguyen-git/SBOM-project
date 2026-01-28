/**
 * INSTRUCTIONS:
 * - This is the framework's base class - DO NOT MODIFY
 * - Extend this class for all Page Object classes
 * - Use formEnter() as primary interaction method
 * - Use $() helper for controls that need data
 * - Use $dynamicControl() for dynamic selectors with {0}, {1} placeholders
 */

import { Page, Locator, expect } from "@playwright/test";
import { FormHelper } from "../helpers/FormHelper";
import { Control } from "../types/controls.types";
import { CustomTableControls } from "./CustomizeTableControl";

export type Language = "en" | "ja";

export abstract class BasePage {
  protected page: Page;
  protected formHelper: FormHelper;
  protected url?: string;
  private _lang: Language;

  constructor(page: Page, lang: Language = "en") {
    this.page = page;
    this.formHelper = new FormHelper(page);
    this._lang = lang;
  }

  private _lstControls?: Record<string, Control> = {};

  protected items<T extends Record<string, Control>>(
    controls: T,
  ): { [K in keyof T]: K } {
    var els: { [K in keyof T]: K } = new Proxy({} as any, {
      get: (_, prop: string) => prop,
    });
    this._lstControls = controls;

    return els;
  }

  /**i
   * ExpectControl - For test assertions with autocomplete
   * Use in test files with items property for autocomplete
   * example
   * // In test file:
   * await loginPage.expectControl(loginPage.items.loginButton).toBeVisible();
   * await loginPage.expectControl(loginPage.items.successMessage).toHaveText("Success!");
   */
  public expectControl(controlName: string): any {
    const control = this._lstControls
      ? this._lstControls[controlName]
      : undefined;
    if (!control) {
      throw new Error(
        `Control '${controlName}' not found in ${this.constructor.name}`,
      );
    }
    const locator = this.getLocator(control);
    return expect(locator);
  }

  /**
   * Helper to add data to control
   */
  protected $(control: Control, data?: any): Control {
    return data !== undefined ? { ...control, data } : control;
  }

  /**
   * Resolve selector template with values for {0}, {1}, {2}...
   */
  protected $dynamicControl(
    control: Control,
    ...values: (string | number)[]
  ): Control {
    return values.length > 0 ? { ...control, paras: values } : control;
  }


  async formEnter(lst: Control[]): Promise<void> {
    await this.formHelper.formEnter(lst);
  }

  async enter(control: Control): Promise<void> {
    await this.formHelper.enter(control);
  }

  async waitForPageLoad(
    state: "load" | "domcontentloaded" | "networkidle" = "domcontentloaded",
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  async waitForElement(control: Control, timeout = 10000): Promise<void> {
    const locator = this.getLocator(control);
    await locator.waitFor({ state: "visible", timeout });
  }

  async waitForNavigation(
    state: "load" | "domcontentloaded" | "networkidle" = "domcontentloaded",
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  async waitForURL(url: string | RegExp, timeout?: number): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  async getContents(controlNames: string | string[]): Promise<any> {
    return await this.formHelper.getContents(controlNames, this._lstControls!);
  }

  protected getLocator(control: Control): Locator {
    return this.formHelper.getLocator(control);
  }

  // Check if current language is Japanese
  isJA() {
    return this._lang === "ja";
  }
}






