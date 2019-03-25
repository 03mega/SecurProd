import { element, by, ElementFinder } from 'protractor';

export class StampCancelledComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-stamp-cancelled div table .btn-danger'));
    title = element.all(by.css('jhi-stamp-cancelled div h2#page-heading span')).first();

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

export class StampCancelledUpdatePage {
    pageTitle = element(by.id('jhi-stamp-cancelled-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    reasonInput = element(by.id('field_reason'));
    imputationInput = element(by.id('field_imputation'));
    stampSelect = element(by.id('field_stamp'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setReasonInput(reason) {
        await this.reasonInput.sendKeys(reason);
    }

    async getReasonInput() {
        return this.reasonInput.getAttribute('value');
    }

    async setImputationInput(imputation) {
        await this.imputationInput.sendKeys(imputation);
    }

    async getImputationInput() {
        return this.imputationInput.getAttribute('value');
    }

    async stampSelectLastOption() {
        await this.stampSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async stampSelectOption(option) {
        await this.stampSelect.sendKeys(option);
    }

    getStampSelect(): ElementFinder {
        return this.stampSelect;
    }

    async getStampSelectedOption() {
        return this.stampSelect.element(by.css('option:checked')).getText();
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

export class StampCancelledDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-stampCancelled-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-stampCancelled'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
