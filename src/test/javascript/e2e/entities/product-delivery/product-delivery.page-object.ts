import { element, by, ElementFinder } from 'protractor';

export class ProductDeliveryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product-delivery div table .btn-danger'));
    title = element.all(by.css('jhi-product-delivery div h2#page-heading span')).first();

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

export class ProductDeliveryUpdatePage {
    pageTitle = element(by.id('jhi-product-delivery-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));

    async getPageTitle() {
        return this.pageTitle.getText();
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

export class ProductDeliveryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-productDelivery-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-productDelivery'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
