import { Locator, Page } from "@playwright/test";
import {
  areTablesEqual,
  doesTableContain,
  fillterTableByColumns,
  normalizeTableByAlias,
} from "./Utils";

/**
 * Map alias column name → real column name(s)
 * Used to normalize tables with different structures
 */
export type ColumnAliasMap = {
  [aliasColumn: string]: string | string[];
};

export interface TableRow {
  [columnName: string]: any;
}

/**
 * TableHelper
 * -----------
 * A utility class to:
 * - Compare rows and tables
 * - Search values inside tables
 * - Normalize tables with column aliases
 * - Read/write table data from/to JSON files
 */
export class TableHelper {
  private _value: TableRow[];
  private tableLocator: Locator;
  private page: Page;

  get value(): TableRow[] {
    return this._value;
  }

  constructor(tableLocator: Locator) {
    this.tableLocator = tableLocator;
    this.page = tableLocator.page();
    this._value = [];
  }

  /**
   * Convert full-width characters to half-width (Japanese → English)
   * Handles: numbers, spaces, and common punctuation
   */
  private normalizeFullWidth = (text: string): string => {
    return (
      text
        // Convert full-width numbers (0-9) to half-width (0-9)
        .replace(/[0-9]/g, (char) => {
          return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
        })
        // Convert full-width decimal point (.) to half-width (.)
        .replace(/\./g, ".")
        // Convert full-width comma (,) to half-width (,)
        .replace(/,/g, ",")
        // Convert full-width minus (−) to half-width (-)
        .replace(/[−ー]/g, "-")
        // Convert full-width space to half-width space
        .replace(/\s/g, " ")
    );
  };

  /**
   * Parse cell text to appropriate type (string or number)
   * Supports both Japanese (full-width) and English (half-width)
   * Handles: numbers, decimals, negatives, percentages
   * Preserves: text with mixed content
   */
  private parseCell = (text: string): any => {
    // Handle null/undefined
    if (text === null || text === undefined) {
      return "";
    }

    const trimmed = text.trim();

    // Empty string
    if (trimmed === "") {
      return "";
    }

    // Normalize full-width to half-width for number detection
    const normalized = this.normalizeFullWidth(trimmed);

    // Remove common number formatting (commas, spaces)
    const cleaned = normalized.replace(/[,\s]/g, "");

    // Remove percentage sign if present
    const withoutPercent = cleaned.replace(/%$/, "");

    // Extract numeric value
    const numValue = parseFloat(withoutPercent.replace(/[^0-9.-]/g, ""));

    // Check if it's a pure number (with optional formatting)
    const isPureNumber = normalized.match(
      /^\s*-?\d{1,3}([\s,]\d{3})*(\.\d+)?\s*%?\s*$/,
    );

    // Return number if valid, otherwise return ORIGINAL text (preserves full-width)
    return !isNaN(numValue) && isPureNumber ? numValue : trimmed;
  };

  /**
   * Get all header names from the table
   * @returns Array of header names
   */
  async getAllHeaderNames(): Promise<string[]> {
    const headers = await this.tableLocator
      .locator("thead th")
      .allTextContents();
    return headers.map((h) => h.trim());
  }

  /**
   * Get all items (rows) from the table as JSON
   * @returns Array of row objects where keys are column names
   * access as: items[i]['Column Name']
   */
  async getAllItems() {
    const headers = await this.getAllHeaderNames();
    const rows = await this.tableLocator.locator("tbody tr").all();

    this._value = await Promise.all(
      rows.map(async (row) => {
        const cells = await row.locator("td").allTextContents();

        return headers.reduce((rowData, header, index) => {
          rowData[header] = this.parseCell(cells[index] || "");
          return rowData;
        }, {} as TableRow);
      }),
    );

    return this;
  }

  /**
   * Get item by row index (0-based)
   * @param index Row index (0-based)
   * @returns Row object where keys are column names
   * access as: item['Column Name']
   */
  async getItemByIdx(index: number): Promise<TableRow> {
    if (index < 0) {
      throw new Error(`Index must be >= 0. Got: ${index}`);
    }
    const rowCount = await this.tableLocator.locator("tbody tr").count();
    if (rowCount <= 0) {
      throw new Error(`Table has no rows`);
    }

    if (index >= rowCount) {
      throw new Error(`Index ${index} out of range [0..${rowCount - 1}]`);
    }

    const headers = await this.getAllHeaderNames();
    const row = this.tableLocator.locator("tbody tr").nth(index);
    const cells = await row.locator("td").allTextContents();

    return headers.reduce((rowData, header, idx) => {
      rowData[header] = this.parseCell(cells[idx] || "");
      return rowData;
    }, {} as TableRow);
  }

  /**
   * Get specific cell value by row index and column name
   * @param idxRow Row index (0-based)
   * @param colName Column header name
   * @returns Cell value (any type based on content)
   */
  async getCell(idxRow: number, colName: string): Promise<any> {
    const headers = await this.getAllHeaderNames();
    const colIndex = headers.indexOf(colName);

    if (colIndex === -1) {
      throw new Error(
        `Column "${colName}" not found. Available columns: ${headers.join(", ")}`,
      );
    }

    const cell = this.tableLocator
      .locator("tbody tr")
      .nth(idxRow)
      .locator("td")
      .nth(colIndex);
    const text = (await cell.textContent()) || "";

    return this.parseCell(text);
  }

  /**
   * Get all cell values from a specific column
   * @param colName Column header name
   * @returns Array of cell values from that column
   */
  async getCells(colName: string): Promise<any[]> {
    const headers = await this.getAllHeaderNames();
    const colIndex = headers.indexOf(colName);

    if (colIndex === -1) {
      throw new Error(
        `Column "${colName}" not found. Available columns: ${headers.join(", ")}`,
      );
    }

    const rows = await this.tableLocator.locator("tbody tr").all();

    return await Promise.all(
      rows.map(async (row) => {
        const cell = row.locator("td").nth(colIndex);
        const text = (await cell.textContent()) || "";
        return this.parseCell(text);
      }),
    );
  }

  /**
   * Get cell locator by row index and column name
   * @param idxRow Row index (0-based)
   * @param colName Column header name
   * @returns Locator for the cell
   */
  async getCellLocator(idxRow: number, colName: string): Promise<Locator> {
    const headers = await this.getAllHeaderNames();
    const colIndex = headers.indexOf(colName);

    if (colIndex === -1) {
      throw new Error(
        `Column "${colName}" not found. Available columns: ${headers.join(", ")}`,
      );
    }

    return this.tableLocator
      .locator("tbody tr")
      .nth(idxRow)
      .locator("td")
      .nth(colIndex);
  }

  /**
   * Get item(s) by specific column value
   * @param colName Column name to search in
   * @param value Value to match
   * @returns Array of matching row objects (JSON format)
   */
  async getItemBySpcValue(colName: string, value: any): Promise<this> {
    const columnValues = await this.getCells(colName);

    const matchingIndices = columnValues
      .map((cellValue, index) => ({ cellValue, index }))
      .filter(({ cellValue }) => cellValue === value)
      .map(({ index }) => index);

    this._value = await Promise.all(
      matchingIndices.map((index) => this.getItemByIdx(index)),
    );

    return this;
  }

  /**
   * Check whether a table contains:
   * - a string / RegExp
   * - a single row
   * - a list of rows
   * @param table
   * @param value
   * @param options
   * @returns
   */
  contains(
    value: string | RegExp | TableRow | TableRow[],
    options?: {
      includedColumns?: string[];
      excludedColumns?: string[];
    },
  ) {
    return doesTableContain(this._value, value, options);
  }

  /**
   * Compare two tables for equality
   * - Same length
   * - Same rows
   * - Same values per column
   * - Optional custom comparator
   * @param table
   * @param other
   * @param options
   * @returns
   */
  isEqual(
    other: TableRow[],
    options?: {
      includedColumns?: string[];
      excludedColumns?: string[];
      comparator?: (cellA: any, cellB: any) => boolean;
    },
  ) {
    return areTablesEqual(this._value, other, options);
  }

  /**
   * Filter table columns
   * - Include only specified columns
   * - Or exclude specified columns
   * @param table
   * @param includedColumns
   * @param excludedColumns
   * @returns
   */
  fillter(includedColumns?: string[], excludedColumns?: string[]): this {
    this._value = fillterTableByColumns(
      this._value,
      includedColumns,
      excludedColumns,
    );

    return this;
  }

  /**
   * Normalize table structure using column alias mapping
   * @param table
   * @param aliasMap
   * @returns
   */
  alias(aliasMap: ColumnAliasMap): this {
    this._value = normalizeTableByAlias(this._value, aliasMap);

    return this;
  }
}