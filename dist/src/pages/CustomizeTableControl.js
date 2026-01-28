"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTableControls = void 0;
const BasePage_1 = require("./BasePage");
const TableHelper_1 = require("../helpers/TableHelper");
class CustomTableControls extends BasePage_1.BasePage {
    constructor() {
        // all properties with default values
        super(...arguments);
        this.tableControl = {
            type: "table",
            xpath: '//div[@class="ant-spin-container"]/div[contains(@class,"ant-table")]//table'
        };
        this.refreshTableButton = {
            type: "button",
            xpath: '//span[@aria-label="sync"]'
        };
        this.viewFilterButton = {
            type: "button",
            xpath: '//span[@aria-label="insert-row-right"]'
        };
        this.columnFilterCheckBox = {
            type: "checkbox",
            dynamic: '//span[contains(@class,"ant-checkbox-label") and normalize-space(text())="{0}"]/preceding-sibling::span/input'
        };
        this.columnCheckboxLabels = {
            type: "listitem",
            dynamic: '//div[contains(@class, "ant-checkbox-group")]//span[contains(@class, "ant-checkbox-label")]'
        };
        this.previousSheetButton = {
            type: "button",
            xpath: '//li[contains(@class, "ant-pagination-prev")]'
        };
        this.nextSheetButton = {
            type: "button",
            xpath: '//li[contains(@class, "ant-pagination-next")]'
        };
        this.next5SheetsButton = {
            type: "button",
            xpath: '//li[contains(@class, "ant-pagination-jump-next")]'
        };
        this.previous5SheetsButton = {
            type: "button",
            xpath: '//li[contains(@class, "ant-pagination-jump-prev")]'
        };
        this.lastSheetButton = {
            type: "button",
            xpath: '//li[contains(@class, "ant-pagination-next")]/preceding-sibling::li[1]'
        };
        this.sheetChangeButton = {
            type: "button",
            dynamic: '//li[contains(@class, "ant-pagination-item") and @title="{0}"]'
        };
        this.currentSheet = {
            type: "textbox",
            xpath: "//li[contains(@class, 'ant-pagination-item-active')]"
        };
        this.sheetSizeSelector = {
            type: "button",
            xpath: '//li[contains(@class, "ant-pagination-options")]//div[@aria-label="Page Size"]',
            data: "5"
        };
        this.sheetSizeOption = {
            type: "button",
            dynamic: '//div[contains(@class, "select-item-option") and text()="{0} / page"]'
        };
        this._oContent = new TableHelper_1.TableHelper(this.getLocator(this.tableControl));
    }
    ;
    async NextItem() {
    }
    async PreviousItem() {
    }
    async filterColumn(column) {
    }
    storage() {
        return this._oContent;
    }
}
exports.CustomTableControls = CustomTableControls;
