import { element, by, ElementFinder } from 'protractor';

export class ProgramComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-program div table .btn-danger'));
    title = element.all(by.css('jhi-program div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class ProgramUpdatePage {
    pageTitle = element(by.id('jhi-program-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    unitSelect = element(by.id('field_unit'));
    programProductSelect = element(by.id('field_programProduct'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async unitSelectLastOption() {
        await this.unitSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async unitSelectOption(option) {
        await this.unitSelect.sendKeys(option);
    }

    getUnitSelect(): ElementFinder {
        return this.unitSelect;
    }

    async getUnitSelectedOption() {
        return this.unitSelect.element(by.css('option:checked')).getText();
    }

    async programProductSelectLastOption() {
        await this.programProductSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async programProductSelectOption(option) {
        await this.programProductSelect.sendKeys(option);
    }

    getProgramProductSelect(): ElementFinder {
        return this.programProductSelect;
    }

    async getProgramProductSelectedOption() {
        return this.programProductSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ProgramDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-program-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-program'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
