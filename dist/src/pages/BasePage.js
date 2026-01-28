"use strict";
/**
 * INSTRUCTIONS:
 * - This is the framework's base class - DO NOT MODIFY
 * - Extend this class for all Page Object classes
 * - Use formEnter() as primary interaction method
 * - Use $() helper for controls that need data
 * - Use $dynamicControl() for dynamic selectors with {0}, {1} placeholders
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const test_1 = require("@playwright/test");
const FormHelper_1 = require("../helpers/FormHelper");
class BasePage {
    constructor(page) {
        this._lstControls = {};
        this.page = page;
        this.formHelper = new FormHelper_1.FormHelper(page);
    }
    items(controls) {
        var els = new Proxy({}, {
            get: (_, prop) => prop,
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
    expectControl(controlName) {
        const control = this._lstControls
            ? this._lstControls[controlName]
            : undefined;
        if (!control) {
            throw new Error(`Control '${controlName}' not found in ${this.constructor.name}`);
        }
        const locator = this.getLocator(control);
        return (0, test_1.expect)(locator);
    }
    /**
     * Helper to add data to control
     */
    $(control, data) {
        return data !== undefined ? { ...control, data } : control;
    }
    /**
     * Resolve selector template with values for {0}, {1}, {2}...
     */
    $dynamicControl(control, ...values) {
        return values.length > 0 ? { ...control, paras: values } : control;
    }
    async formEnter(lst) {
        await this.formHelper.formEnter(lst);
    }
    async enter(control) {
        await this.formHelper.enter(control);
    }
    async waitForPageLoad(state = "domcontentloaded") {
        await this.page.waitForLoadState(state);
    }
    async waitForElement(control, timeout = 10000) {
        const locator = this.getLocator(control);
        await locator.waitFor({ state: "visible", timeout });
    }
    async waitForNavigation(state = "domcontentloaded") {
        await this.page.waitForLoadState(state);
    }
    async waitForURL(url, timeout) {
        await this.page.waitForURL(url, { timeout });
    }
    async getContents(controlNames) {
        return await this.formHelper.getContents(controlNames, this._lstControls);
    }
    getLocator(control) {
        return this.formHelper.getLocator(control);
    }
    // Get current language
    async updateLang() {
        await this.page.waitForLoadState("domcontentloaded"); // Wait for page
        const lang = await this.page.evaluate(() => localStorage.getItem("i18nextLng"));
        this._lang = lang ?? "en";
        console.log("[LOG]", "Update to lang: ", this._lang);
    }
    // Check if current language is Japanese
    isJA() {
        console.log("[LOG]", "lang is JA", this._lang);
        if (!this._lang) {
            this.updateLang();
        }
        return this._lang === "ja";
    }
}
exports.BasePage = BasePage;
