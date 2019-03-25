/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProgramProductComponentsPage, ProgramProductDeleteDialog, ProgramProductUpdatePage } from './program-product.page-object';

const expect = chai.expect;

describe('ProgramProduct e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let programProductUpdatePage: ProgramProductUpdatePage;
    let programProductComponentsPage: ProgramProductComponentsPage;
    let programProductDeleteDialog: ProgramProductDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProgramProducts', async () => {
        await navBarPage.goToEntity('program-product');
        programProductComponentsPage = new ProgramProductComponentsPage();
        await browser.wait(ec.visibilityOf(programProductComponentsPage.title), 5000);
        expect(await programProductComponentsPage.getTitle()).to.eq('Program Products');
    });

    it('should load create ProgramProduct page', async () => {
        await programProductComponentsPage.clickOnCreateButton();
        programProductUpdatePage = new ProgramProductUpdatePage();
        expect(await programProductUpdatePage.getPageTitle()).to.eq('Create or edit a Program Product');
        await programProductUpdatePage.cancel();
    });

    it('should create and save ProgramProducts', async () => {
        const nbButtonsBeforeCreate = await programProductComponentsPage.countDeleteButtons();

        await programProductComponentsPage.clickOnCreateButton();
        await promise.all([]);
        await programProductUpdatePage.save();
        expect(await programProductUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await programProductComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProgramProduct', async () => {
        const nbButtonsBeforeDelete = await programProductComponentsPage.countDeleteButtons();
        await programProductComponentsPage.clickOnLastDeleteButton();

        programProductDeleteDialog = new ProgramProductDeleteDialog();
        expect(await programProductDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Program Product?');
        await programProductDeleteDialog.clickOnConfirmButton();

        expect(await programProductComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
