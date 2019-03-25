import { element, by, ElementFinder } from 'protractor';

export class DeliveryDeliveryTypeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-delivery-delivery-type div table .btn-danger'));
    title = element.all(by.css('jhi-delivery-delivery-type div h2#page-heading span')).first();

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

export class DeliveryDeliveryTypeUpdatePage {
    pageTitle = element(by.id('jhi-delivery-delivery-type-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    deliverySelect = element(by.id('field_delivery'));
    deliveryTypeSelect = element(by.id('field_deliveryType'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async deliverySelectLastOption() {
        await this.deliverySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async deliverySelectOption(option) {
        await this.deliverySelect.sendKeys(option);
    }

    getDeliverySelect(): ElementFinder {
        return this.deliverySelect;
    }

    async getDeliverySelectedOption() {
        return this.deliverySelect.element(by.css('option:checked')).getText();
    }

    async deliveryTypeSelectLastOption() {
        await this.deliveryTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async deliveryTypeSelectOption(option) {
        await this.deliveryTypeSelect.sendKeys(option);
    }

    getDeliveryTypeSelect(): ElementFinder {
        return this.deliveryTypeSelect;
    }

    async getDeliveryTypeSelectedOption() {
        return this.deliveryTypeSelect.element(by.css('option:checked')).getText();
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

export class DeliveryDeliveryTypeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-deliveryDeliveryType-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-deliveryDeliveryType'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
