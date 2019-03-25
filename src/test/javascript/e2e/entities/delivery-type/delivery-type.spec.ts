/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DeliveryTypeComponentsPage, DeliveryTypeDeleteDialog, DeliveryTypeUpdatePage } from './delivery-type.page-object';

const expect = chai.expect;

describe('DeliveryType e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let deliveryTypeUpdatePage: DeliveryTypeUpdatePage;
    let deliveryTypeComponentsPage: DeliveryTypeComponentsPage;
    let deliveryTypeDeleteDialog: DeliveryTypeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DeliveryTypes', async () => {
        await navBarPage.goToEntity('delivery-type');
        deliveryTypeComponentsPage = new DeliveryTypeComponentsPage();
        await browser.wait(ec.visibilityOf(deliveryTypeComponentsPage.title), 5000);
        expect(await deliveryTypeComponentsPage.getTitle()).to.eq('Delivery Types');
    });

    it('should load create DeliveryType page', async () => {
        await deliveryTypeComponentsPage.clickOnCreateButton();
        deliveryTypeUpdatePage = new DeliveryTypeUpdatePage();
        expect(await deliveryTypeUpdatePage.getPageTitle()).to.eq('Create or edit a Delivery Type');
        await deliveryTypeUpdatePage.cancel();
    });

    it('should create and save DeliveryTypes', async () => {
        const nbButtonsBeforeCreate = await deliveryTypeComponentsPage.countDeleteButtons();

        await deliveryTypeComponentsPage.clickOnCreateButton();
        await promise.all([
            deliveryTypeUpdatePage.setNameInput('name'),
            deliveryTypeUpdatePage.deliveryDeliveryTypeProductSelectLastOption()
        ]);
        expect(await deliveryTypeUpdatePage.getNameInput()).to.eq('name');
        await deliveryTypeUpdatePage.save();
        expect(await deliveryTypeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await deliveryTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last DeliveryType', async () => {
        const nbButtonsBeforeDelete = await deliveryTypeComponentsPage.countDeleteButtons();
        await deliveryTypeComponentsPage.clickOnLastDeleteButton();

        deliveryTypeDeleteDialog = new DeliveryTypeDeleteDialog();
        expect(await deliveryTypeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Delivery Type?');
        await deliveryTypeDeleteDialog.clickOnConfirmButton();

        expect(await deliveryTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
