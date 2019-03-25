/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParcelControlComponentsPage, ParcelControlDeleteDialog, ParcelControlUpdatePage } from './parcel-control.page-object';

const expect = chai.expect;

describe('ParcelControl e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let parcelControlUpdatePage: ParcelControlUpdatePage;
    let parcelControlComponentsPage: ParcelControlComponentsPage;
    let parcelControlDeleteDialog: ParcelControlDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ParcelControls', async () => {
        await navBarPage.goToEntity('parcel-control');
        parcelControlComponentsPage = new ParcelControlComponentsPage();
        await browser.wait(ec.visibilityOf(parcelControlComponentsPage.title), 5000);
        expect(await parcelControlComponentsPage.getTitle()).to.eq('Parcel Controls');
    });

    it('should load create ParcelControl page', async () => {
        await parcelControlComponentsPage.clickOnCreateButton();
        parcelControlUpdatePage = new ParcelControlUpdatePage();
        expect(await parcelControlUpdatePage.getPageTitle()).to.eq('Create or edit a Parcel Control');
        await parcelControlUpdatePage.cancel();
    });

    it('should create and save ParcelControls', async () => {
        const nbButtonsBeforeCreate = await parcelControlComponentsPage.countDeleteButtons();

        await parcelControlComponentsPage.clickOnCreateButton();
        await promise.all([parcelControlUpdatePage.controlSelectLastOption()]);
        await parcelControlUpdatePage.save();
        expect(await parcelControlUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await parcelControlComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ParcelControl', async () => {
        const nbButtonsBeforeDelete = await parcelControlComponentsPage.countDeleteButtons();
        await parcelControlComponentsPage.clickOnLastDeleteButton();

        parcelControlDeleteDialog = new ParcelControlDeleteDialog();
        expect(await parcelControlDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Parcel Control?');
        await parcelControlDeleteDialog.clickOnConfirmButton();

        expect(await parcelControlComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
