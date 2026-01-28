import path from "path";
import { promises as fs } from "fs";
import { Page } from "@playwright/test";
import { Language } from "../pages/BasePage";
import { TableRow } from "./TableHelper";

/**
 * Map alias column name → real column name(s)
 * Used to normalize tables with different structures
 */
export type ColumnAliasMap = {
  [aliasColumn: string]: string | string[];
};

/* ==================================
 * Internal helpers
 * ================================== */

/**
 * Normalize a value for comparison
 * - Convert to string
 * - Trim whitespace
 * - Lowercase
 */
function normalize(value: any): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/[０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    )
    .replace(/[．]/g, ".")
    .replace(/[，]/g, ",")
    .replace(/[−ー]/g, "-")
    .replace(/\u3000/g, " ");
}

/**
 * Match a cell value against string or RegExp
 */
function matchValue(cellValue: any, expected: string | RegExp): boolean {
  const text = normalize(cellValue);

  if (expected instanceof RegExp) {
    return expected.test(text);
  }

  return text.includes(normalize(expected));
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
export function doesTableContain(
  table: TableRow[],
  value: string | RegExp | TableRow | TableRow[],
  options?: {
    includedColumns?: string[];
    excludedColumns?: string[];
  },
): boolean {
  if (!table.length) return false;

  table = fillterTableByColumns(
    table,
    options?.includedColumns,
    options?.excludedColumns,
  );

  const columns = Object.keys(table[0]);

  // String / RegExp search
  if (typeof value === "string" || value instanceof RegExp) {
    return table.some((row) =>
      columns.some((col) => matchValue(row[col], value)),
    );
  }

  // Normalize to array of rows
  const expectedRows = Array.isArray(value) ? value : [value];

  const filteredExpected = fillterTableByColumns(
    expectedRows,
    options?.includedColumns,
    options?.excludedColumns,
  );

  return filteredExpected.every((expectedRow) =>
    table.some((row) => columns.every((col) => row[col] === expectedRow[col])),
  );
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
export function areTablesEqual(
  table: TableRow[],
  other: TableRow[],
  options?: {
    includedColumns?: string[];
    excludedColumns?: string[];
    comparator?: (cellA: any, cellB: any) => boolean;
  },
): boolean {
  if (table.length !== other.length) return false;

  table = fillterTableByColumns(
    table,
    options?.includedColumns,
    options?.excludedColumns,
  );

  other = fillterTableByColumns(
    other,
    options?.includedColumns,
    options?.excludedColumns,
  );

  const columns = Object.keys(table.at(0) ?? {});

  for (let i = 0; i < table.length; i++) {
    for (const col of columns) {
      if (
        options?.comparator &&
        !options.comparator(table[i][col], other[i][col])
      ) {
        return false;
      }

      if (normalize(table[i][col]) !== normalize(other[i][col])) {
        return false;
      }
    }
  }

  return true;
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
export function fillterTableByColumns(
  table: TableRow[],
  includedColumns?: string[],
  excludedColumns?: string[],
): TableRow[] {
  const allColumns = Object.keys(table.at(0) ?? {});
  let targetColumns = allColumns;

  if (includedColumns?.length) {
    targetColumns = allColumns.filter((c) => includedColumns.includes(c));
  }

  if (excludedColumns?.length) {
    targetColumns = allColumns.filter((c) => !excludedColumns.includes(c));
  }

  return table.map((row) => {
    const newRow: TableRow = {};
    targetColumns.forEach((col) => (newRow[col] = row[col]));
    return newRow;
  });
}

/**
 * Read a table from a JSON file
 * @param filePath (ditermiter must be /)
 * @returns
 */
export async function readTableFromJson(filePath: string): Promise<TableRow[]> {
  const absolutePath = path.resolve(...filePath.split("/"));
  const content = await fs.readFile(absolutePath, "utf-8");
  const data = JSON.parse(content);

  if (!Array.isArray(data)) {
    throw new Error(`Invalid table format in ${filePath}`);
  }

  return data as TableRow[];
}

/**
 * Write a table to a JSON file
 * @param table
 * @param filePath (ditermiter must be /)
 */
export async function writeTableToJson(
  table: TableRow[],
  filePath: string,
): Promise<void> {
  const absolutePath = path.resolve(...filePath.split("/"));
  await fs.writeFile(absolutePath, JSON.stringify(table, null, 2), "utf-8");
}

/**
 * Normalize table structure using column alias mapping
 * @param table
 * @param aliasMap
 * @returns
 */
export function normalizeTableByAlias(
  table: TableRow[],
  aliasMap: ColumnAliasMap,
): TableRow[] {
  return table.map((row) => {
    const normalized: TableRow = {};

    for (const [aliasKey, sourceCols] of Object.entries(aliasMap)) {
      const candidates = Array.isArray(sourceCols) ? sourceCols : [sourceCols];

      const found = candidates.find((col) => row[col] !== undefined);
      if (found) {
        normalized[aliasKey] = row[found];
      }
    }

    return normalized;
  });
}

/**
 * Get language of the current page
 * @param page Page want to get lang
 * @returns
 */
export async function getLang(page: Page) {
  await page.waitForLoadState("domcontentloaded"); // Wait for page
  const lang = await page.evaluate(() => localStorage.getItem("i18nextLng"));

  return (lang as Language) ?? "en";
}

/**
 * Generate a unique username by appending current epoch time (ms)
 * @param baseUsername Original username
 * @param separator Separator between username and timestamp (default: "_")
 * @returns Unique username string
 *
 * Example:
 *  generateUniqueUsername("user") → user_1706012345678
 */
export function generateUniqueUsername(
  baseUsername: string,
  separator: string = "_",
): string {
  const timestamp = Date.now(); // epoch time in milliseconds
  return `${baseUsername}${separator}${timestamp}`;
}

