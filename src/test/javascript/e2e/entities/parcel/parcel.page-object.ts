import { element, by, ElementFinder } from 'protractor';

export class ParcelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-parcel div table .btn-danger'));
    title = element.all(by.css('jhi-parcel div h2#page-heading span')).first();

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

export class ParcelUpdatePage {
    pageTitle = element(by.id('jhi-parcel-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    barreCodeInput = element(by.id('field_barreCode'));
    pageNumberInput = element(by.id('field_pageNumber'));
    dateCreatedInput = element(by.id('field_dateCreated'));
    dateChangedInput = element(by.id('field_dateChanged'));
    deliverySelect = element(by.id('field_delivery'));
    parcelControlSelect = element(by.id('field_parcelControl'));
    parcelProductsSelect = element(by.id('field_parcelProducts'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setBarreCodeInput(barreCode) {
        await this.barreCodeInput.sendKeys(barreCode);
    }

    async getBarreCodeInput() {
        return this.barreCodeInput.getAttribute('value');
    }

    async setPageNumberInput(pageNumber) {
        await this.pageNumberInput.sendKeys(pageNumber);
    }

    async getPageNumberInput() {
        return this.pageNumberInput.getAttribute('value');
    }

    async setDateCreatedInput(dateCreated) {
        await this.dateCreatedInput.sendKeys(dateCreated);
    }

    async getDateCreatedInput() {
        return this.dateCreatedInput.getAttribute('value');
    }

    async setDateChangedInput(dateChanged) {
        await this.dateChangedInput.sendKeys(dateChanged);
    }

    async getDateChangedInput() {
        return this.dateChangedInput.getAttribute('value');
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

    async parcelControlSelectLastOption() {
        await this.parcelControlSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async parcelControlSelectOption(option) {
        await this.parcelControlSelect.sendKeys(option);
    }

    getParcelControlSelect(): ElementFinder {
        return this.parcelControlSelect;
    }

    async getParcelControlSelectedOption() {
        return this.parcelControlSelect.element(by.css('option:checked')).getText();
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

export class ParcelDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-parcel-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-parcel'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
