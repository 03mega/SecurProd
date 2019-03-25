import { element, by, ElementFinder } from 'protractor';

export class StampComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-stamp div table .btn-danger'));
    title = element.all(by.css('jhi-stamp div h2#page-heading span')).first();

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

export class StampUpdatePage {
    pageTitle = element(by.id('jhi-stamp-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    eNumberInput = element(by.id('field_eNumber'));
    parcelSelect = element(by.id('field_parcel'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setENumberInput(eNumber) {
        await this.eNumberInput.sendKeys(eNumber);
    }

    async getENumberInput() {
        return this.eNumberInput.getAttribute('value');
    }

    async parcelSelectLastOption() {
        await this.parcelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async parcelSelectOption(option) {
        await this.parcelSelect.sendKeys(option);
    }

    getParcelSelect(): ElementFinder {
        return this.parcelSelect;
    }

    async getParcelSelectedOption() {
        return this.parcelSelect.element(by.css('option:checked')).getText();
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

export class StampDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-stamp-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-stamp'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
