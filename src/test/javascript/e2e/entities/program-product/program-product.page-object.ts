import { element, by, ElementFinder } from 'protractor';

export class ProgramProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-program-product div table .btn-danger'));
    title = element.all(by.css('jhi-program-product div h2#page-heading span')).first();

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

export class ProgramProductUpdatePage {
    pageTitle = element(by.id('jhi-program-product-heading'));
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

export class ProgramProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-programProduct-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-programProduct'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
