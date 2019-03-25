/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParcelComponentsPage, ParcelDeleteDialog, ParcelUpdatePage } from './parcel.page-object';

const expect = chai.expect;

describe('Parcel e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let parcelUpdatePage: ParcelUpdatePage;
    let parcelComponentsPage: ParcelComponentsPage;
    let parcelDeleteDialog: ParcelDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Parcels', async () => {
        await navBarPage.goToEntity('parcel');
        parcelComponentsPage = new ParcelComponentsPage();
        await browser.wait(ec.visibilityOf(parcelComponentsPage.title), 5000);
        expect(await parcelComponentsPage.getTitle()).to.eq('Parcels');
    });

    it('should load create Parcel page', async () => {
        await parcelComponentsPage.clickOnCreateButton();
        parcelUpdatePage = new ParcelUpdatePage();
        expect(await parcelUpdatePage.getPageTitle()).to.eq('Create or edit a Parcel');
        await parcelUpdatePage.cancel();
    });

    it('should create and save Parcels', async () => {
        const nbButtonsBeforeCreate = await parcelComponentsPage.countDeleteButtons();

        await parcelComponentsPage.clickOnCreateButton();
        await promise.all([
            parcelUpdatePage.setBarreCodeInput('barreCode'),
            parcelUpdatePage.setPageNumberInput('5'),
            parcelUpdatePage.setDateCreatedInput('2000-12-31'),
            parcelUpdatePage.setDateChangedInput('2000-12-31'),
            parcelUpdatePage.deliverySelectLastOption(),
            parcelUpdatePage.parcelControlSelectLastOption(),
            parcelUpdatePage.parcelProductsSelectLastOption()
        ]);
        expect(await parcelUpdatePage.getBarreCodeInput()).to.eq('barreCode');
        expect(await parcelUpdatePage.getPageNumberInput()).to.eq('5');
        expect(await parcelUpdatePage.getDateCreatedInput()).to.eq('2000-12-31');
        expect(await parcelUpdatePage.getDateChangedInput()).to.eq('2000-12-31');
        await parcelUpdatePage.save();
        expect(await parcelUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await parcelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Parcel', async () => {
        const nbButtonsBeforeDelete = await parcelComponentsPage.countDeleteButtons();
        await parcelComponentsPage.clickOnLastDeleteButton();

        parcelDeleteDialog = new ParcelDeleteDialog();
        expect(await parcelDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Parcel?');
        await parcelDeleteDialog.clickOnConfirmButton();

        expect(await parcelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
