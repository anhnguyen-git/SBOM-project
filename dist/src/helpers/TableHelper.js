"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHelper = void 0;
class TableHelper {
    constructor(tableLocator) {
        /**
         * Convert full-width characters to half-width (Japanese → English)
         * Handles: numbers, spaces, and common punctuation
         */
        this.normalizeFullWidth = (text) => {
            return text
                // Convert full-width numbers (0-9) to half-width (0-9)
                .replace(/[0-9]/g, (char) => {
                return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
            })
                // Convert full-width decimal point (.) to half-width (.)
                .replace(/\./g, '.')
                // Convert full-width comma (,) to half-width (,)
                .replace(/,/g, ',')
                // Convert full-width minus (−) to half-width (-)
                .replace(/[−ー]/g, '-')
                // Convert full-width space to half-width space
                .replace(/\s/g, ' ');
        };
        /**
         * Parse cell text to appropriate type (string or number)
         * Supports both Japanese (full-width) and English (half-width)
         * Handles: numbers, decimals, negatives, percentages
         * Preserves: text with mixed content
         */
        this.parseCell = (text) => {
            // Handle null/undefined
            if (text === null || text === undefined) {
                return '';
            }
            const trimmed = text.trim();
            // Empty string
            if (trimmed === '') {
                return '';
            }
            // Normalize full-width to half-width for number detection
            const normalized = this.normalizeFullWidth(trimmed);
            // Remove common number formatting (commas, spaces)
            const cleaned = normalized.replace(/[,\s]/g, '');
            // Remove percentage sign if present
            const withoutPercent = cleaned.replace(/%$/, '');
            // Extract numeric value
            const numValue = parseFloat(withoutPercent.replace(/[^0-9.-]/g, ''));
            // Check if it's a pure number (with optional formatting)
            const isPureNumber = normalized.match(/^\s*-?\d{1,3}([\s,]\d{3})*(\.\d+)?\s*%?\s*$/);
            // Return number if valid, otherwise return ORIGINAL text (preserves full-width)
            return !isNaN(numValue) && isPureNumber ? numValue : trimmed;
        };
        this.tableLocator = tableLocator;
        this.page = tableLocator.page();
    }
    /**
     * Get all header names from the table
     * @returns Array of header names
     */
    async getAllHeaderNames() {
        const headers = await this.tableLocator.locator('thead th').allTextContents();
        return headers.map(h => h.trim());
    }
    /**
     * Get all items (rows) from the table as JSON
     * @returns Array of row objects where keys are column names
     * access as: items[i]['Column Name']
     */
    async getAllItems() {
        const headers = await this.getAllHeaderNames();
        const rows = await this.tableLocator.locator('tbody tr').all();
        return await Promise.all(rows.map(async (row) => {
            const cells = await row.locator('td').allTextContents();
            return headers.reduce((rowData, header, index) => {
                rowData[header] = this.parseCell(cells[index] || '');
                return rowData;
            }, {});
        }));
    }
    /**
     * Get item by row index (0-based)
     * @param index Row index (0-based)
     * @returns Row object where keys are column names
     * access as: item['Column Name']
     */
    async getItemByIdx(index) {
        if (index < 0) {
            throw new Error(`Index must be >= 0. Got: ${index}`);
        }
        const rowCount = await this.tableLocator.locator('tbody tr').count();
        if (rowCount <= 0) {
            throw new Error(`Table has no rows`);
        }
        if (index >= rowCount) {
            throw new Error(`Index ${index} out of range [0..${rowCount - 1}]`);
        }
        const headers = await this.getAllHeaderNames();
        const row = this.tableLocator.locator('tbody tr').nth(index);
        const cells = await row.locator('td').allTextContents();
        return headers.reduce((rowData, header, idx) => {
            rowData[header] = this.parseCell(cells[idx] || '');
            return rowData;
        }, {});
    }
    /**
     * Get specific cell value by row index and column name
     * @param idxRow Row index (0-based)
     * @param colName Column header name
     * @returns Cell value (any type based on content)
     */
    async getCell(idxRow, colName) {
        const headers = await this.getAllHeaderNames();
        const colIndex = headers.indexOf(colName);
        if (colIndex === -1) {
            throw new Error(`Column "${colName}" not found. Available columns: ${headers.join(', ')}`);
        }
        const cell = this.tableLocator.locator('tbody tr').nth(idxRow).locator('td').nth(colIndex);
        const text = (await cell.textContent()) || '';
        return this.parseCell(text);
    }
    /**
     * Get all cell values from a specific column
     * @param colName Column header name
     * @returns Array of cell values from that column
     */
    async getCells(colName) {
        const headers = await this.getAllHeaderNames();
        const colIndex = headers.indexOf(colName);
        if (colIndex === -1) {
            throw new Error(`Column "${colName}" not found. Available columns: ${headers.join(', ')}`);
        }
        const rows = await this.tableLocator.locator('tbody tr').all();
        return await Promise.all(rows.map(async (row) => {
            const cell = row.locator('td').nth(colIndex);
            const text = (await cell.textContent()) || '';
            return this.parseCell(text);
        }));
    }
    /**
     * Get cell locator by row index and column name
     * @param idxRow Row index (0-based)
     * @param colName Column header name
     * @returns Locator for the cell
     */
    async getCellLocator(idxRow, colName) {
        const headers = await this.getAllHeaderNames();
        const colIndex = headers.indexOf(colName);
        if (colIndex === -1) {
            throw new Error(`Column "${colName}" not found. Available columns: ${headers.join(', ')}`);
        }
        return this.tableLocator
            .locator('tbody tr')
            .nth(idxRow)
            .locator('td')
            .nth(colIndex);
    }
    /**
     * Get item(s) by specific column value
     * @param colName Column name to search in
     * @param value Value to match
     * @returns Array of matching row objects (JSON format)
     */
    async getItemBySpcValue(colName, value) {
        const columnValues = await this.getCells(colName);
        const matchingIndices = columnValues
            .map((cellValue, index) => ({ cellValue, index }))
            .filter(({ cellValue }) => cellValue === value)
            .map(({ index }) => index);
        return await Promise.all(matchingIndices.map(index => this.getItemByIdx(index)));
    }
}
exports.TableHelper = TableHelper;
