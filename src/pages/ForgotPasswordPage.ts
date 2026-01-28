/**
 * ForgotPasswordPage - Forgot password page
 * Language-agnostic selectors support both EN and JA
 */
import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";
export class ForgotPasswordPage extends BasePage {
    protected url = "http://35.74.242.225:20010/forgot-password";
    private controls = {
        emailInput: {
            type: "textbox",
            name: "email",
            description: "Email input field",
            data: "thanhthoaiUser2@gmail.com"
        } as Control,
        forgotPasswordButton: {
            type: "button",
            css: "button:has-text('Forgot Password')",
            description: "Forgot Password button"
        } as Control
    };
   readonly Items = this.items(this.controls);
    async goto() {
        await this.page.goto(this.url);
        await this.waitForPageLoad();
    }
    async forgotPassword(email?: string) {
        await this.formEnter([
            this.$(this.controls.emailInput, email),
            this.controls.forgotPasswordButton
        ]);
        await this.waitForNavigation('networkidle');
    }
}