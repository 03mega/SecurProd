/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ControlComponentsPage, ControlDeleteDialog, ControlUpdatePage } from './control.page-object';

const expect = chai.expect;

describe('Control e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let controlUpdatePage: ControlUpdatePage;
    let controlComponentsPage: ControlComponentsPage;
    let controlDeleteDialog: ControlDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Controls', async () => {
        await navBarPage.goToEntity('control');
        controlComponentsPage = new ControlComponentsPage();
        await browser.wait(ec.visibilityOf(controlComponentsPage.title), 5000);
        expect(await controlComponentsPage.getTitle()).to.eq('Controls');
    });

    it('should load create Control page', async () => {
        await controlComponentsPage.clickOnCreateButton();
        controlUpdatePage = new ControlUpdatePage();
        expect(await controlUpdatePage.getPageTitle()).to.eq('Create or edit a Control');
        await controlUpdatePage.cancel();
    });

    it('should create and save Controls', async () => {
        const nbButtonsBeforeCreate = await controlComponentsPage.countDeleteButtons();

        await controlComponentsPage.clickOnCreateButton();
        await promise.all([controlUpdatePage.setControlDateInput('2000-12-31')]);
        expect(await controlUpdatePage.getControlDateInput()).to.eq('2000-12-31');
        const selectedStatus = controlUpdatePage.getStatusInput();
        if (await selectedStatus.isSelected()) {
            await controlUpdatePage.getStatusInput().click();
            expect(await controlUpdatePage.getStatusInput().isSelected()).to.be.false;
        } else {
            await controlUpdatePage.getStatusInput().click();
            expect(await controlUpdatePage.getStatusInput().isSelected()).to.be.true;
        }
        await controlUpdatePage.save();
        expect(await controlUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await controlComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Control', async () => {
        const nbButtonsBeforeDelete = await controlComponentsPage.countDeleteButtons();
        await controlComponentsPage.clickOnLastDeleteButton();

        controlDeleteDialog = new ControlDeleteDialog();
        expect(await controlDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Control?');
        await controlDeleteDialog.clickOnConfirmButton();

        expect(await controlComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
