"use strict";
/**
 * SBomLoginPage - Page Object for SBom application login
 * Handles user authentication
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBomLoginPage = void 0;
const BasePage_1 = require("./BasePage");
class SBomLoginPage extends BasePage_1.BasePage {
    constructor() {
        super(...arguments);
        this.url = "http://35.74.242.225:20010/login";
        this.controls = {
            // Verified: input[name='username'] → matchCount = 1
            usernameInput: {
                type: "textbox",
                name: "username",
                description: "Username input field"
            },
            // Verified: input[name='password'] → matchCount = 1
            passwordInput: {
                type: "textbox",
                name: "password",
                description: "Password input field"
            },
            // Verified: button:has-text('Log in') → matchCount = 1
            loginButton: {
                type: "button",
                css: "button:has-text('Log in')",
                description: "Login button"
            },
            // Heading verification
            loginHeading: {
                type: "heading",
                css: "h1:has-text('Log in')",
                description: "Login page heading"
            }
        };
        this.Items = this.items(this.controls);
    }
    async goto() {
        await this.page.goto(this.url);
        await this.waitForPageLoad();
    }
    async login(username, password) {
        await this.formEnter([
            this.$(this.controls.usernameInput, username),
            this.$(this.controls.passwordInput, password),
            this.controls.loginButton
        ]);
        await this.waitForNavigation('networkidle');
    }
}
exports.SBomLoginPage = SBomLoginPage;
