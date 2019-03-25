/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DeliveryComponentsPage, DeliveryDeleteDialog, DeliveryUpdatePage } from './delivery.page-object';

const expect = chai.expect;

describe('Delivery e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let deliveryUpdatePage: DeliveryUpdatePage;
    let deliveryComponentsPage: DeliveryComponentsPage;
    let deliveryDeleteDialog: DeliveryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Deliveries', async () => {
        await navBarPage.goToEntity('delivery');
        deliveryComponentsPage = new DeliveryComponentsPage();
        await browser.wait(ec.visibilityOf(deliveryComponentsPage.title), 5000);
        expect(await deliveryComponentsPage.getTitle()).to.eq('Deliveries');
    });

    it('should load create Delivery page', async () => {
        await deliveryComponentsPage.clickOnCreateButton();
        deliveryUpdatePage = new DeliveryUpdatePage();
        expect(await deliveryUpdatePage.getPageTitle()).to.eq('Create or edit a Delivery');
        await deliveryUpdatePage.cancel();
    });

    it('should create and save Deliveries', async () => {
        const nbButtonsBeforeCreate = await deliveryComponentsPage.countDeleteButtons();

        await deliveryComponentsPage.clickOnCreateButton();
        await promise.all([
            deliveryUpdatePage.setBorderDeliveryInput('borderDelivery'),
            deliveryUpdatePage.setValuationNumberInput('valuationNumber'),
            deliveryUpdatePage.setDeliveryDateInput('2000-12-31'),
            deliveryUpdatePage.setCategoryInput('category'),
            deliveryUpdatePage.setZoneInput('zone'),
            deliveryUpdatePage.clientSelectLastOption(),
            deliveryUpdatePage.productDeliverySelectLastOption(),
            deliveryUpdatePage.deliveryDeliveryTypeProductSelectLastOption()
        ]);
        expect(await deliveryUpdatePage.getBorderDeliveryInput()).to.eq('borderDelivery');
        expect(await deliveryUpdatePage.getValuationNumberInput()).to.eq('valuationNumber');
        expect(await deliveryUpdatePage.getDeliveryDateInput()).to.eq('2000-12-31');
        expect(await deliveryUpdatePage.getCategoryInput()).to.eq('category');
        expect(await deliveryUpdatePage.getZoneInput()).to.eq('zone');
        await deliveryUpdatePage.save();
        expect(await deliveryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await deliveryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Delivery', async () => {
        const nbButtonsBeforeDelete = await deliveryComponentsPage.countDeleteButtons();
        await deliveryComponentsPage.clickOnLastDeleteButton();

        deliveryDeleteDialog = new DeliveryDeleteDialog();
        expect(await deliveryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Delivery?');
        await deliveryDeleteDialog.clickOnConfirmButton();

        expect(await deliveryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
