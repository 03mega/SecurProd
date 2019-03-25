/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    DeliveryDeliveryTypeProductComponentsPage,
    DeliveryDeliveryTypeProductDeleteDialog,
    DeliveryDeliveryTypeProductUpdatePage
} from './delivery-delivery-type-product.page-object';

const expect = chai.expect;

describe('DeliveryDeliveryTypeProduct e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let deliveryDeliveryTypeProductUpdatePage: DeliveryDeliveryTypeProductUpdatePage;
    let deliveryDeliveryTypeProductComponentsPage: DeliveryDeliveryTypeProductComponentsPage;
    let deliveryDeliveryTypeProductDeleteDialog: DeliveryDeliveryTypeProductDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DeliveryDeliveryTypeProducts', async () => {
        await navBarPage.goToEntity('delivery-delivery-type-product');
        deliveryDeliveryTypeProductComponentsPage = new DeliveryDeliveryTypeProductComponentsPage();
        await browser.wait(ec.visibilityOf(deliveryDeliveryTypeProductComponentsPage.title), 5000);
        expect(await deliveryDeliveryTypeProductComponentsPage.getTitle()).to.eq('Delivery Delivery Type Products');
    });

    it('should load create DeliveryDeliveryTypeProduct page', async () => {
        await deliveryDeliveryTypeProductComponentsPage.clickOnCreateButton();
        deliveryDeliveryTypeProductUpdatePage = new DeliveryDeliveryTypeProductUpdatePage();
        expect(await deliveryDeliveryTypeProductUpdatePage.getPageTitle()).to.eq('Create or edit a Delivery Delivery Type Product');
        await deliveryDeliveryTypeProductUpdatePage.cancel();
    });

    it('should create and save DeliveryDeliveryTypeProducts', async () => {
        const nbButtonsBeforeCreate = await deliveryDeliveryTypeProductComponentsPage.countDeleteButtons();

        await deliveryDeliveryTypeProductComponentsPage.clickOnCreateButton();
        await promise.all([deliveryDeliveryTypeProductUpdatePage.setQuantityInput('5')]);
        expect(await deliveryDeliveryTypeProductUpdatePage.getQuantityInput()).to.eq('5');
        await deliveryDeliveryTypeProductUpdatePage.save();
        expect(await deliveryDeliveryTypeProductUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await deliveryDeliveryTypeProductComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last DeliveryDeliveryTypeProduct', async () => {
        const nbButtonsBeforeDelete = await deliveryDeliveryTypeProductComponentsPage.countDeleteButtons();
        await deliveryDeliveryTypeProductComponentsPage.clickOnLastDeleteButton();

        deliveryDeliveryTypeProductDeleteDialog = new DeliveryDeliveryTypeProductDeleteDialog();
        expect(await deliveryDeliveryTypeProductDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Delivery Delivery Type Product?'
        );
        await deliveryDeliveryTypeProductDeleteDialog.clickOnConfirmButton();

        expect(await deliveryDeliveryTypeProductComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
