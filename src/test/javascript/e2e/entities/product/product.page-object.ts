import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
    title = element.all(by.css('jhi-product div h2#page-heading span')).first();

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

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    productCodeInput = element(by.id('field_productCode'));
    nameInput = element(by.id('field_name'));
    programSelect = element(by.id('field_program'));
    parcelProductsSelect = element(by.id('field_parcelProducts'));
    programProductSelect = element(by.id('field_programProduct'));
    productDeliverySelect = element(by.id('field_productDelivery'));
    deliveryDeliveryTypeProductSelect = element(by.id('field_deliveryDeliveryTypeProduct'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setProductCodeInput(productCode) {
        await this.productCodeInput.sendKeys(productCode);
    }

    async getProductCodeInput() {
        return this.productCodeInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async programSelectLastOption() {
        await this.programSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async programSelectOption(option) {
        await this.programSelect.sendKeys(option);
    }

    getProgramSelect(): ElementFinder {
        return this.programSelect;
    }

    async getProgramSelectedOption() {
        return this.programSelect.element(by.css('option:checked')).getText();
    }

    async parcelProductsSelectLastOption() {
        await this.parcelProductsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async parcelProductsSelectOption(option) {
        await this.parcelProductsSelect.sendKeys(option);
    }

    getParcelProductsSelect(): ElementFinder {
        return this.parcelProductsSelect;
    }

    async getParcelProductsSelectedOption() {
        return this.parcelProductsSelect.element(by.css('option:checked')).getText();
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

    async productDeliverySelectLastOption() {
        await this.productDeliverySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async productDeliverySelectOption(option) {
        await this.productDeliverySelect.sendKeys(option);
    }

    getProductDeliverySelect(): ElementFinder {
        return this.productDeliverySelect;
    }

    async getProductDeliverySelectedOption() {
        return this.productDeliverySelect.element(by.css('option:checked')).getText();
    }

    async deliveryDeliveryTypeProductSelectLastOption() {
        await this.deliveryDeliveryTypeProductSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async deliveryDeliveryTypeProductSelectOption(option) {
        await this.deliveryDeliveryTypeProductSelect.sendKeys(option);
    }

    getDeliveryDeliveryTypeProductSelect(): ElementFinder {
        return this.deliveryDeliveryTypeProductSelect;
    }

    async getDeliveryDeliveryTypeProductSelectedOption() {
        return this.deliveryDeliveryTypeProductSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-product-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-product'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
