import { element, by, ElementFinder } from 'protractor';

export class ControlComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-control div table .btn-danger'));
    title = element.all(by.css('jhi-control div h2#page-heading span')).first();

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

export class ControlUpdatePage {
    pageTitle = element(by.id('jhi-control-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    controlDateInput = element(by.id('field_controlDate'));
    statusInput = element(by.id('field_status'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setControlDateInput(controlDate) {
        await this.controlDateInput.sendKeys(controlDate);
    }

    async getControlDateInput() {
        return this.controlDateInput.getAttribute('value');
    }

    getStatusInput() {
        return this.statusInput;
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

export class ControlDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-control-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-control'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
