import { Page, Locator } from '@playwright/test';
import { Control, ControlType } from '../types/controls.types';
import { TableHelper } from './TableHelper';

type ActionType = 'INPUT' | 'SELECT' | 'TOGGLE' | 'CLICK';

export class FormHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async formEnter(controls: Control[]): Promise<void> {
    for (const control of controls) {
      await this.enter(control);
    }
  }

  public async enter(control: Control): Promise<void> {
    try {
      const locator = this.getLocator(control);
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      
      const action = FormHelper.detectAction(control.type);
      await this.handleActions(locator, action, control.data);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to execute control: ${control.description || control.type}\n` +
        `Error: ${errorMessage}`
      );
    }
  }

  public getLocator(control: Control): Locator {
    // HIGHEST PRIORITY: dynamic selector with parameters
    if (control.dynamic !== undefined && control.paras !== undefined) {
      let content = control.dynamic;
      
      // Replace {0}, {1}, {2} with paras values if provided
      control.paras.forEach((value, index) => {
        const placeholder = `{${index}}`;
        content = content.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), String(value));
      });
      
      return this.page.locator(content);
    }
    
    // If dynamic is provided but paras is not
    if (control.dynamic !== undefined) {
      return this.page.locator(control.dynamic);
    }
    
    if (control.name !== undefined) {
      return this.page.getByRole(control.type as any, { name: control.name });
    }
    
    if (control.text !== undefined) {
      return this.page.getByText(control.text);
    }
    
    if (control.testId !== undefined) {
      return this.page.getByTestId(control.testId);
    }
    
    if (control.label !== undefined) {
      return this.page.getByLabel(control.label);
    }
    
    if (control.placeholder !== undefined) {
      return this.page.getByPlaceholder(control.placeholder);
    }
    
    if (control.altText !== undefined) {
      return this.page.getByAltText(control.altText);
    }
    
    if (control.title !== undefined) {
      return this.page.getByTitle(control.title);
    }
    
    if (control.css !== undefined) {
      return this.page.locator(control.css);
    }
    
    if (control.xpath !== undefined) {
      return this.page.locator(control.xpath);
    }
    
    throw new Error(
      `No selector provided in control. ` +
      `Please provide one of: dynamic, name, text, testId, label, placeholder, altText, title, css, xpath`
    );
  }

 /**
 * Helper to get content from control(s) by name
 * @param controlNameOrNames - Single control name or array of control names (use items property)
 * @returns Content from the control(s) - single value or array
 * 
 * @example
 * // Single control
 * const text = await this._(this.items.welcomeMessage);
 * 
 * // Multiple controls (returns array)
 * const results = await this._([
 *   this.items.nameField,
 *   this.items.emailField
 * ]);
 */
public async getContents(controlNames: string | string[], controls: Record<string, Control>): Promise<any> 
{
  if (!controls){
     throw new Error(`list of Controls is empty}`);
  }

  if (Array.isArray(controlNames)) {
    // 🚀 PARALLEL: Map creates promises without awaiting
    const promises = controlNames.map(async (controlName) => {
      const control = controls[controlName];
      if (!control) {
        throw new Error(`Control '${controlName}' not found in ${this.constructor.name}`);
      }
      return await this.getContent(control);
    });
    
    // Wait for all promises to resolve
    return await Promise.all(promises);
  }
  
  // Single control - no parallelization needed
  const control = controls[controlNames];
  if (!control) {
    throw new Error(`Control '${controlNames}' not found in ${this.constructor.name}`);
  }
  return await this.getContent(control);
}


/**
 * Internal method to get content from a single control
 */
private async getContent(control: Control): Promise<any> {
  const locator = this.getLocator(control);
  await locator.waitFor({ state: 'visible', timeout: 10000 });

  if (control.type === 'grid') {
    const tableCon = new TableHelper(locator);
    return await tableCon.getAllItems();
  } else {
    return await locator.textContent();
  }
}

  private static detectAction(controlType: ControlType): ActionType {
    if (['textbox', 'searchbox', 'spinbutton'].includes(controlType)) return 'INPUT';
    if (['combobox', 'listbox'].includes(controlType)) return 'SELECT';
    if (['checkbox', 'switch'].includes(controlType)) return 'TOGGLE';
    if (['button','radio', 'link', 'tab', 'menuitem', 'option', 'slider',  'grid', 'tree', 'dialog', 'alertdialog', 'img', 'heading', 'list', 'listitem'].includes(controlType)) return 'CLICK';
    
    throw new Error(`Unknown control type: ${controlType}`);
  }

  private async handleActions(locator: Locator, action: ActionType, data?: any): Promise<void> {
    switch (action) {
      case 'INPUT':
        await this.inputAction(locator, data as string);
        break;
      case 'SELECT':
        await this.selectAction(locator, data as string);
        break;
      case 'TOGGLE':
        await this.toggleAction(locator, data as boolean);
        break;
      case 'CLICK':
        await this.clickAction(locator);
        break;
      default:
        throw new Error(`Unknown action type: ${action}`);
    }
  }

  private async inputAction(locator: Locator, data: string): Promise<void> {
    if (data === undefined || data === null) {
      throw new Error('INPUT action requires data');
    }
    await locator.fill(data);
  }

  private async selectAction(locator: Locator, data: string): Promise<void> {
    if (data === undefined || data === null) {
      throw new Error('SELECT action requires data');
    }
    await locator.selectOption(data);
  }

  private async toggleAction(locator: Locator, data: boolean): Promise<void> {
    if (data === undefined || data === null) {
      throw new Error('TOGGLE action requires data');
    }
    
    if (data === true) {
      await locator.check();
    } else {
      await locator.uncheck();
    }
  }

  private async clickAction(locator: Locator): Promise<void> {
    await locator.click();
  }
}