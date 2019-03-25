import { element, by, ElementFinder } from 'protractor';

export class ClientComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-client div table .btn-danger'));
    title = element.all(by.css('jhi-client div h2#page-heading span')).first();

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

export class ClientUpdatePage {
    pageTitle = element(by.id('jhi-client-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    vrCodeInput = element(by.id('field_vrCode'));
    nameInput = element(by.id('field_name'));
    seitInput = element(by.id('field_seit'));
    pspCodeInput = element(by.id('field_pspCode'));
    categoryInput = element(by.id('field_category'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setVrCodeInput(vrCode) {
        await this.vrCodeInput.sendKeys(vrCode);
    }

    async getVrCodeInput() {
        return this.vrCodeInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setSeitInput(seit) {
        await this.seitInput.sendKeys(seit);
    }

    async getSeitInput() {
        return this.seitInput.getAttribute('value');
    }

    async setPspCodeInput(pspCode) {
        await this.pspCodeInput.sendKeys(pspCode);
    }

    async getPspCodeInput() {
        return this.pspCodeInput.getAttribute('value');
    }

    async setCategoryInput(category) {
        await this.categoryInput.sendKeys(category);
    }

    async getCategoryInput() {
        return this.categoryInput.getAttribute('value');
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

export class ClientDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-client-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-client'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
