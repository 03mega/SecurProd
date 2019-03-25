import { element, by, ElementFinder } from 'protractor';

export class DeliveryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-delivery div table .btn-danger'));
    title = element.all(by.css('jhi-delivery div h2#page-heading span')).first();

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

export class DeliveryUpdatePage {
    pageTitle = element(by.id('jhi-delivery-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    borderDeliveryInput = element(by.id('field_borderDelivery'));
    valuationNumberInput = element(by.id('field_valuationNumber'));
    deliveryDateInput = element(by.id('field_deliveryDate'));
    categoryInput = element(by.id('field_category'));
    zoneInput = element(by.id('field_zone'));
    clientSelect = element(by.id('field_client'));
    productDeliverySelect = element(by.id('field_productDelivery'));
    deliveryDeliveryTypeProductSelect = element(by.id('field_deliveryDeliveryTypeProduct'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setBorderDeliveryInput(borderDelivery) {
        await this.borderDeliveryInput.sendKeys(borderDelivery);
    }

    async getBorderDeliveryInput() {
        return this.borderDeliveryInput.getAttribute('value');
    }

    async setValuationNumberInput(valuationNumber) {
        await this.valuationNumberInput.sendKeys(valuationNumber);
    }

    async getValuationNumberInput() {
        return this.valuationNumberInput.getAttribute('value');
    }

    async setDeliveryDateInput(deliveryDate) {
        await this.deliveryDateInput.sendKeys(deliveryDate);
    }

    async getDeliveryDateInput() {
        return this.deliveryDateInput.getAttribute('value');
    }

    async setCategoryInput(category) {
        await this.categoryInput.sendKeys(category);
    }

    async getCategoryInput() {
        return this.categoryInput.getAttribute('value');
    }

    async setZoneInput(zone) {
        await this.zoneInput.sendKeys(zone);
    }

    async getZoneInput() {
        return this.zoneInput.getAttribute('value');
    }

    async clientSelectLastOption() {
        await this.clientSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async clientSelectOption(option) {
        await this.clientSelect.sendKeys(option);
    }

    getClientSelect(): ElementFinder {
        return this.clientSelect;
    }

    async getClientSelectedOption() {
        return this.clientSelect.element(by.css('option:checked')).getText();
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

export class DeliveryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-delivery-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-delivery'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
