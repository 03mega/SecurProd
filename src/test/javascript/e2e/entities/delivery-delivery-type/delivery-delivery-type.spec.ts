/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    DeliveryDeliveryTypeComponentsPage,
    DeliveryDeliveryTypeDeleteDialog,
    DeliveryDeliveryTypeUpdatePage
} from './delivery-delivery-type.page-object';

const expect = chai.expect;

describe('DeliveryDeliveryType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let deliveryDeliveryTypeUpdatePage: DeliveryDeliveryTypeUpdatePage;
    let deliveryDeliveryTypeComponentsPage: DeliveryDeliveryTypeComponentsPage;
    let deliveryDeliveryTypeDeleteDialog: DeliveryDeliveryTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DeliveryDeliveryTypes', async () => {
        await navBarPage.goToEntity('delivery-delivery-type');
        deliveryDeliveryTypeComponentsPage = new DeliveryDeliveryTypeComponentsPage();
        await browser.wait(ec.visibilityOf(deliveryDeliveryTypeComponentsPage.title), 5000);
        expect(await deliveryDeliveryTypeComponentsPage.getTitle()).to.eq('Delivery Delivery Types');
    });

    it('should load create DeliveryDeliveryType page', async () => {
        await deliveryDeliveryTypeComponentsPage.clickOnCreateButton();
        deliveryDeliveryTypeUpdatePage = new DeliveryDeliveryTypeUpdatePage();
        expect(await deliveryDeliveryTypeUpdatePage.getPageTitle()).to.eq('Create or edit a Delivery Delivery Type');
        await deliveryDeliveryTypeUpdatePage.cancel();
    });

    it('should create and save DeliveryDeliveryTypes', async () => {
        const nbButtonsBeforeCreate = await deliveryDeliveryTypeComponentsPage.countDeleteButtons();

        await deliveryDeliveryTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            deliveryDeliveryTypeUpdatePage.deliverySelectLastOption(),
            deliveryDeliveryTypeUpdatePage.deliveryTypeSelectLastOption()
        ]);
        await deliveryDeliveryTypeUpdatePage.save();
        expect(await deliveryDeliveryTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await deliveryDeliveryTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last DeliveryDeliveryType', async () => {
        const nbButtonsBeforeDelete = await deliveryDeliveryTypeComponentsPage.countDeleteButtons();
        await deliveryDeliveryTypeComponentsPage.clickOnLastDeleteButton();

        deliveryDeliveryTypeDeleteDialog = new DeliveryDeliveryTypeDeleteDialog();
        expect(await deliveryDeliveryTypeDeleteDialog.getDialogTitle()).to.eq(
            'Are you sure you want to delete this Delivery Delivery Type?'
        );
        await deliveryDeliveryTypeDeleteDialog.clickOnConfirmButton();

        expect(await deliveryDeliveryTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
