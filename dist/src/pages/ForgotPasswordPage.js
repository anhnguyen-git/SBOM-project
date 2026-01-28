"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordPage = void 0;
/**
 * ForgotPasswordPage - Forgot password page
 * Language-agnostic selectors support both EN and JA
 */
const BasePage_1 = require("./BasePage");
class ForgotPasswordPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/forgot-password";
        this.controls = {
            emailInput: {
                type: "textbox",
                name: "email",
                description: "Email input field",
                data: "thanhthoaiUser2@gmail.com"
            },
            forgotPasswordButton: {
                type: "button",
                css: "button:has-text('Forgot Password')",
                description: "Forgot Password button"
            }
        };
        this.Items = this.items(this.controls);
    }
    async goto() {
        await this.page.goto(this.url);
        await this.waitForPageLoad();
    }
    async forgotPassword(email) {
        await this.formEnter([
            this.$(this.controls.emailInput, email),
            this.controls.forgotPasswordButton
        ]);
        await this.waitForNavigation('networkidle');
    }
}
exports.ForgotPasswordPage = ForgotPasswordPage;
