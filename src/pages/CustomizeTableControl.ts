import { BasePage } from "./BasePage";
import { Control } from "../types/controls.types";
import { TableHelper } from "../helpers/TableHelper";


export class CustomTableControls extends BasePage {
    // all properties with default values

    tableControl = {
        type: "table",
        xpath: '//div[@class="ant-spin-container"]/div[contains(@class,"ant-table") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]//table'
    } as Control;

    refreshTableButton = {
        type: "button",
        xpath: '//span[@aria-label="sync" and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;

    viewFilterButton = {
        type: "button",
        xpath: '//span[@aria-label="insert-row-right" and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;

    columnFilterCheckBox = {
        type: "checkbox",
        dynamic: '//span[contains(@class,"ant-checkbox-label") and normalize-space(text())="{0}" and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]/preceding-sibling::span/input'
    } as Control;

    columnCheckboxLabels = {
        type: "listitem",
        dynamic: '//div[contains(@class, "ant-checkbox-group") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]//span[contains(@class, "ant-checkbox-label")]'
    } as Control;

    columnSettingsPopup = {
        type: "div",
        xpath: '//div[contains(@class, "ant-checkbox-group") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")]) and ancestor::div[contains(@class, "ant-popover") or contains(@class, "ant-modal")]]',
    } as Control;

    previousSheetButton = {
        type: "button",
        xpath: '//li[contains(@class, "ant-pagination-prev") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;

    nextSheetButton = {
        type: "button",
        xpath: '//li[contains(@class, "ant-pagination-next") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;

    next5SheetsButton = {
        type: "button",
        xpath: '//li[contains(@class, "ant-pagination-jump-next") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;

    previous5SheetsButton = {
        type: "button",
        xpath: '//li[contains(@class, "ant-pagination-jump-prev") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;

    lastSheetButton = {
        type: "button",
        xpath: '//li[contains(@class, "ant-pagination-next") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]/preceding-sibling::li[1]'
    } as Control;

    sheetChangeButton = {
        type: "button",
        dynamic: '//li[contains(@class, "ant-pagination-item") and @title="{0}" and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;

    currentSheet = {
        type: "textbox",
        xpath: "//li[contains(@class, 'ant-pagination-item-active') and not(ancestor::div[contains(@class, 'ant-tabs-tabpane-hidden')])]"
    } as Control;

    sheetSizeSelector = {
        type: "button",
        xpath: '//li[contains(@class, "ant-pagination-options") and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]//div[@aria-label="Page Size"]',
        data: "5"
    } as Control;

    sheetSizeOption = {
        type: "button",
        dynamic: '//div[contains(@class, "select-item-option") and text()="{0} / page" and not(ancestor::div[contains(@class, "ant-tabs-tabpane-hidden")])]'
    } as Control;


    private _oContent = new TableHelper(this.getLocator(this.tableControl));
    async refreshTable() {
        await this.formEnter([this.refreshTableButton]);
    }

    async openColumnSettings() {
        await this.formEnter([this.viewFilterButton]);
    }

    async goToPreviousPage() {
        await this.formEnter([this.previousSheetButton]);
    }

    async goToNextPage() {
        await this.formEnter([this.nextSheetButton]);
    }

    async goToNextFivePages() {
        await this.formEnter([this.next5SheetsButton]);
    }

    async goToPreviousFivePages() {
        await this.formEnter([this.previous5SheetsButton]);
    }

    async goToPage(pageNumber: number) {
        if (pageNumber < 1) return;

        const lastPageRaw = await this.getContents("lastSheetButton");
        const lastPage = Number(lastPageRaw) || 1;

        if (pageNumber > lastPage) return;
        if (pageNumber === lastPage) {
            this.formEnter([this.lastSheetButton]);
            return;
        }

        const currentPageRaw = await this.getContents("currentSheet");
        const currentPage = Number(currentPageRaw) || 1;

        if (pageNumber > currentPage) {
            let diff = pageNumber - currentPage;
            while (diff >= 3) {
                await this.goToNextFivePages()
                diff -= 5;
                await this.waitForPageLoad('networkidle');
            }
        }
        else if (pageNumber < currentPage) {
            let diff = currentPage - pageNumber;
            while (diff >= 3) {
                await this.goToPreviousFivePages();
                diff -= 5;
                await this.waitForPageLoad('networkidle');
            }
        }

        const pageControl = this.$dynamicControl(this.sheetChangeButton, String(pageNumber));
        await this.formEnter([pageControl]);
        await this.waitForPageLoad();
    }

    async setUpSheetSize(sheetSize: number) {
        await this.formEnter([this.sheetSizeSelector]);
        const sheetSizeControl = this.$dynamicControl(this.sheetSizeOption, String(sheetSize));
        await this.formEnter([sheetSizeControl]);
        await this.waitForPageLoad();
    }

    async waitForColumnSettingsPopup() {
        await this.waitForElement(this.columnSettingsPopup);
    }

    async ensureColumnSettingsOpen() {
        const popupLocator = this.getLocator(this.columnSettingsPopup);
        const isVisible = await popupLocator.isVisible();

        if (!isVisible) {
            await this.openColumnSettings();
            await this.waitForColumnSettingsPopup();
        }
    }

    async getAllAvailableColumns(): Promise<string[]> {
        await this.openColumnSettings();


        const labelsLocator = this.getLocator(this.columnCheckboxLabels);

        const count = await labelsLocator.count();
        if (count === 0) {
            console.warn('Không tìm thấy cột nào trong Column Settings');
            return [];
        }

        const columnNames: string[] = [];
        for (let i = 0; i < count; i++) {
            const labelText = (await labelsLocator.nth(i).textContent())?.trim();
            if (labelText) {
                columnNames.push(labelText);
            }
        }

        console.log('Danh sách cột hiện có:', columnNames);
        return columnNames;
    }

    async uncheckColumn(columnName: string) {
        const checkboxControl = this.$dynamicControl(this.columnFilterCheckBox, columnName.trim());
        const checkboxLocator = this.getLocator(checkboxControl);

        if (await checkboxLocator.count() === 0) {
            console.warn(`Không tìm thấy checkbox cho cột "${columnName}"`);
            return;
        }

        if (await checkboxLocator.isChecked()) {
            await checkboxLocator.uncheck({ force: true });
            console.log(`Đã uncheck cột: ${columnName}`);
        }
    }

    async uncheckAllColumns() {
        await this.ensureColumnSettingsOpen();

        const columnNames = await this.getAllAvailableColumns();

        for (const name of columnNames) {
            await this.uncheckColumn(name);
        }
    }

    async checkColumn(columnName: string) {
        const checkboxControl = this.$dynamicControl(this.columnFilterCheckBox, columnName.trim());
        const checkboxLocator = this.getLocator(checkboxControl);

        if (await checkboxLocator.count() === 0) {
            console.warn(`Không tìm thấy checkbox cho cột "${columnName}"`);
            return;
        }

        if (!await checkboxLocator.isChecked()) {
            await checkboxLocator.check({ force: true });
            console.log(`Đã check cột: ${columnName}`);
        }
    }

    async filterColumns(columns: string[]) {
        if (columns.length === 0) {
            return;
        }
        await this.ensureColumnSettingsOpen();
        await this.uncheckAllColumns();
        await this.waitForTableReload();
        for (const column of columns) {
            await this.checkColumn(column);
        }
        await this.waitForTableReload();
        console.log(`Đã áp dụng các cột hiển thị: ${columns.join(', ')}`);
    }

    async waitForTableReload() {
        await this.page.locator('.ant-spin.ant-spin-spinning').waitFor({
            state: 'hidden',
            timeout: 20000
        });
        await this.waitForElement(this.tableControl);
    }

    storage(): TableHelper {
        return this._oContent;

    }
} 