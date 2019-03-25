/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StampComponentsPage, StampDeleteDialog, StampUpdatePage } from './stamp.page-object';

const expect = chai.expect;

describe('Stamp e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let stampUpdatePage: StampUpdatePage;
    let stampComponentsPage: StampComponentsPage;
    let stampDeleteDialog: StampDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Stamps', async () => {
        await navBarPage.goToEntity('stamp');
        stampComponentsPage = new StampComponentsPage();
        await browser.wait(ec.visibilityOf(stampComponentsPage.title), 5000);
        expect(await stampComponentsPage.getTitle()).to.eq('Stamps');
    });

    it('should load create Stamp page', async () => {
        await stampComponentsPage.clickOnCreateButton();
        stampUpdatePage = new StampUpdatePage();
        expect(await stampUpdatePage.getPageTitle()).to.eq('Create or edit a Stamp');
        await stampUpdatePage.cancel();
    });

    it('should create and save Stamps', async () => {
        const nbButtonsBeforeCreate = await stampComponentsPage.countDeleteButtons();

        await stampComponentsPage.clickOnCreateButton();
        await promise.all([stampUpdatePage.setENumberInput('5'), stampUpdatePage.parcelSelectLastOption()]);
        expect(await stampUpdatePage.getENumberInput()).to.eq('5');
        await stampUpdatePage.save();
        expect(await stampUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await stampComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Stamp', async () => {
        const nbButtonsBeforeDelete = await stampComponentsPage.countDeleteButtons();
        await stampComponentsPage.clickOnLastDeleteButton();

        stampDeleteDialog = new StampDeleteDialog();
        expect(await stampDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Stamp?');
        await stampDeleteDialog.clickOnConfirmButton();

        expect(await stampComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
