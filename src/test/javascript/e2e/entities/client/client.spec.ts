/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClientComponentsPage, ClientDeleteDialog, ClientUpdatePage } from './client.page-object';

const expect = chai.expect;

describe('Client e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let clientUpdatePage: ClientUpdatePage;
    let clientComponentsPage: ClientComponentsPage;
    let clientDeleteDialog: ClientDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Clients', async () => {
        await navBarPage.goToEntity('client');
        clientComponentsPage = new ClientComponentsPage();
        await browser.wait(ec.visibilityOf(clientComponentsPage.title), 5000);
        expect(await clientComponentsPage.getTitle()).to.eq('Clients');
    });

    it('should load create Client page', async () => {
        await clientComponentsPage.clickOnCreateButton();
        clientUpdatePage = new ClientUpdatePage();
        expect(await clientUpdatePage.getPageTitle()).to.eq('Create or edit a Client');
        await clientUpdatePage.cancel();
    });

    it('should create and save Clients', async () => {
        const nbButtonsBeforeCreate = await clientComponentsPage.countDeleteButtons();

        await clientComponentsPage.clickOnCreateButton();
        await promise.all([
            clientUpdatePage.setCodeInput('code'),
            clientUpdatePage.setVrCodeInput('vrCode'),
            clientUpdatePage.setNameInput('name'),
            clientUpdatePage.setSeitInput('seit'),
            clientUpdatePage.setPspCodeInput('pspCode'),
            clientUpdatePage.setCategoryInput('category')
        ]);
        expect(await clientUpdatePage.getCodeInput()).to.eq('code');
        expect(await clientUpdatePage.getVrCodeInput()).to.eq('vrCode');
        expect(await clientUpdatePage.getNameInput()).to.eq('name');
        expect(await clientUpdatePage.getSeitInput()).to.eq('seit');
        expect(await clientUpdatePage.getPspCodeInput()).to.eq('pspCode');
        expect(await clientUpdatePage.getCategoryInput()).to.eq('category');
        await clientUpdatePage.save();
        expect(await clientUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Client', async () => {
        const nbButtonsBeforeDelete = await clientComponentsPage.countDeleteButtons();
        await clientComponentsPage.clickOnLastDeleteButton();

        clientDeleteDialog = new ClientDeleteDialog();
        expect(await clientDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Client?');
        await clientDeleteDialog.clickOnConfirmButton();

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
