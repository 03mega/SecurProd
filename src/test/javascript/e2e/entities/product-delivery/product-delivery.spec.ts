/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductDeliveryComponentsPage, ProductDeliveryDeleteDialog, ProductDeliveryUpdatePage } from './product-delivery.page-object';

const expect = chai.expect;

describe('ProductDelivery e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let productDeliveryUpdatePage: ProductDeliveryUpdatePage;
    let productDeliveryComponentsPage: ProductDeliveryComponentsPage;
    let productDeliveryDeleteDialog: ProductDeliveryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ProductDeliveries', async () => {
        await navBarPage.goToEntity('product-delivery');
        productDeliveryComponentsPage = new ProductDeliveryComponentsPage();
        await browser.wait(ec.visibilityOf(productDeliveryComponentsPage.title), 5000);
        expect(await productDeliveryComponentsPage.getTitle()).to.eq('Product Deliveries');
    });

    it('should load create ProductDelivery page', async () => {
        await productDeliveryComponentsPage.clickOnCreateButton();
        productDeliveryUpdatePage = new ProductDeliveryUpdatePage();
        expect(await productDeliveryUpdatePage.getPageTitle()).to.eq('Create or edit a Product Delivery');
        await productDeliveryUpdatePage.cancel();
    });

    it('should create and save ProductDeliveries', async () => {
        const nbButtonsBeforeCreate = await productDeliveryComponentsPage.countDeleteButtons();

        await productDeliveryComponentsPage.clickOnCreateButton();
        await promise.all([]);
        await productDeliveryUpdatePage.save();
        expect(await productDeliveryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await productDeliveryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ProductDelivery', async () => {
        const nbButtonsBeforeDelete = await productDeliveryComponentsPage.countDeleteButtons();
        await productDeliveryComponentsPage.clickOnLastDeleteButton();

        productDeliveryDeleteDialog = new ProductDeliveryDeleteDialog();
        expect(await productDeliveryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Product Delivery?');
        await productDeliveryDeleteDialog.clickOnConfirmButton();

        expect(await productDeliveryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
