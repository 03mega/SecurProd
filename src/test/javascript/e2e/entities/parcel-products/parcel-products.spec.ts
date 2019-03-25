/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParcelProductsComponentsPage, ParcelProductsDeleteDialog, ParcelProductsUpdatePage } from './parcel-products.page-object';

const expect = chai.expect;

describe('ParcelProducts e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let parcelProductsUpdatePage: ParcelProductsUpdatePage;
    let parcelProductsComponentsPage: ParcelProductsComponentsPage;
    let parcelProductsDeleteDialog: ParcelProductsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ParcelProducts', async () => {
        await navBarPage.goToEntity('parcel-products');
        parcelProductsComponentsPage = new ParcelProductsComponentsPage();
        await browser.wait(ec.visibilityOf(parcelProductsComponentsPage.title), 5000);
        expect(await parcelProductsComponentsPage.getTitle()).to.eq('Parcel Products');
    });

    it('should load create ParcelProducts page', async () => {
        await parcelProductsComponentsPage.clickOnCreateButton();
        parcelProductsUpdatePage = new ParcelProductsUpdatePage();
        expect(await parcelProductsUpdatePage.getPageTitle()).to.eq('Create or edit a Parcel Products');
        await parcelProductsUpdatePage.cancel();
    });

    it('should create and save ParcelProducts', async () => {
        const nbButtonsBeforeCreate = await parcelProductsComponentsPage.countDeleteButtons();

        await parcelProductsComponentsPage.clickOnCreateButton();
        await promise.all([parcelProductsUpdatePage.setQuantityInput('5')]);
        expect(await parcelProductsUpdatePage.getQuantityInput()).to.eq('5');
        await parcelProductsUpdatePage.save();
        expect(await parcelProductsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await parcelProductsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ParcelProducts', async () => {
        const nbButtonsBeforeDelete = await parcelProductsComponentsPage.countDeleteButtons();
        await parcelProductsComponentsPage.clickOnLastDeleteButton();

        parcelProductsDeleteDialog = new ParcelProductsDeleteDialog();
        expect(await parcelProductsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Parcel Products?');
        await parcelProductsDeleteDialog.clickOnConfirmButton();

        expect(await parcelProductsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
