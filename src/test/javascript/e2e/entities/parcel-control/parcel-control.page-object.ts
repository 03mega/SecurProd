import { element, by, ElementFinder } from 'protractor';

export class ParcelControlComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-parcel-control div table .btn-danger'));
    title = element.all(by.css('jhi-parcel-control div h2#page-heading span')).first();

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

export class ParcelControlUpdatePage {
    pageTitle = element(by.id('jhi-parcel-control-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    controlSelect = element(by.id('field_control'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async controlSelectLastOption() {
        await this.controlSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async controlSelectOption(option) {
        await this.controlSelect.sendKeys(option);
    }

    getControlSelect(): ElementFinder {
        return this.controlSelect;
    }

    async getControlSelectedOption() {
        return this.controlSelect.element(by.css('option:checked')).getText();
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

export class ParcelControlDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-parcelControl-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-parcelControl'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
