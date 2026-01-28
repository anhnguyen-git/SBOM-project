/**
 * Control types - Based on common ARIA roles
 */
export type ControlType =
  | 'button' | 'textbox' | 'checkbox' | 'radio' | 'combobox' | 'link' | 'searchbox'
  | 'slider' | 'spinbutton' | 'switch' | 'tab' | 'menuitem' | 'option' | 'listbox'
  | 'grid' | 'table' | 'tree' | 'dialog' | 'alertdialog' | 'img' | 'heading' | 'list' | 'listitem'
  | 'div'
 

/**
 * Control interface for defining page elements
 */
export interface Control {
  type: ControlType;             // Control type (e.g. "button", "textbox")
  dynamic?: string;              // Dynamic selector template e.g. "button#btn_{0}"
  name?: string;
  text?: string;
  testId?: string;
  label?: string;
  placeholder?: string;
  altText?: string;
  title?: string;
  css?: string;
  xpath?: string;

  data?: any;                    // Value for input controls
  paras?: (string | number)[];   // Parameters to replace {0}, {1}, {2} in dynamic selectors
  description?: string;
}


/**
 * Platform types for cross-platform testing
 */
export type Platform = 'windows' | 'android' | 'ios' | 'edge' | 'chrome' | 'firefox';