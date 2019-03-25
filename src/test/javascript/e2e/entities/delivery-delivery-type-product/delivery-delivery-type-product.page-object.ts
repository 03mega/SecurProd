import { element, by, ElementFinder } from 'protractor';

export class DeliveryDeliveryTypeProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-delivery-delivery-type-product div table .btn-danger'));
    title = element.all(by.css('jhi-delivery-delivery-type-product div h2#page-heading span')).first();

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

export class DeliveryDeliveryTypeProductUpdatePage {
    pageTitle = element(by.id('jhi-delivery-delivery-type-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    quantityInput = element(by.id('field_quantity'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
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

export class DeliveryDeliveryTypeProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-deliveryDeliveryTypeProduct-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-deliveryDeliveryTypeProduct'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
