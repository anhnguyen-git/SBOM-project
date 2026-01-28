/**
 * SBomLoginPage - Page Object for SBom application login
 * Handles user authentication
 */

import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";

export class SBomLoginPage extends BasePage {
  protected url = "http://35.74.242.225:20010/login";

  private controls = {
    // Verified: input[name='username'] → matchCount = 1
    usernameInput: {
      type: "textbox",
      name: "username",
      description: "Username input field"
    } as Control,

    // Verified: input[name='password'] → matchCount = 1
    passwordInput: {
      type: "textbox",
      name: "password",
      description: "Password input field"
    } as Control,

    // Verified: button:has-text('Log in') → matchCount = 1
    loginButton: {
      type: "button",
      css: "button:has-text('Log in')",
      description: "Login button"
    } as Control,

    // Heading verification
    loginHeading: {
      type: "heading",
      css: "h1:has-text('Log in')",
      description: "Login page heading"
    } as Control
  };

  readonly Items = this.items(this.controls);

  async goto() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  async login(username?: string, password?: string) {
    await this.formEnter([
      this.$(this.controls.usernameInput, username),
      this.$(this.controls.passwordInput, password),
      this.controls.loginButton
    ]);
    await this.waitForNavigation('networkidle');
  }

  
}
