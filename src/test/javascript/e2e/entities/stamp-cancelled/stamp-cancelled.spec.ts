/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StampCancelledComponentsPage, StampCancelledDeleteDialog, StampCancelledUpdatePage } from './stamp-cancelled.page-object';

const expect = chai.expect;

describe('StampCancelled e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let stampCancelledUpdatePage: StampCancelledUpdatePage;
    let stampCancelledComponentsPage: StampCancelledComponentsPage;
    let stampCancelledDeleteDialog: StampCancelledDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load StampCancelleds', async () => {
        await navBarPage.goToEntity('stamp-cancelled');
        stampCancelledComponentsPage = new StampCancelledComponentsPage();
        await browser.wait(ec.visibilityOf(stampCancelledComponentsPage.title), 5000);
        expect(await stampCancelledComponentsPage.getTitle()).to.eq('Stamp Cancelleds');
    });

    it('should load create StampCancelled page', async () => {
        await stampCancelledComponentsPage.clickOnCreateButton();
        stampCancelledUpdatePage = new StampCancelledUpdatePage();
        expect(await stampCancelledUpdatePage.getPageTitle()).to.eq('Create or edit a Stamp Cancelled');
        await stampCancelledUpdatePage.cancel();
    });

    it('should create and save StampCancelleds', async () => {
        const nbButtonsBeforeCreate = await stampCancelledComponentsPage.countDeleteButtons();

        await stampCancelledComponentsPage.clickOnCreateButton();
        await promise.all([
            stampCancelledUpdatePage.setReasonInput('reason'),
            stampCancelledUpdatePage.setImputationInput('imputation'),
            stampCancelledUpdatePage.stampSelectLastOption()
        ]);
        expect(await stampCancelledUpdatePage.getReasonInput()).to.eq('reason');
        expect(await stampCancelledUpdatePage.getImputationInput()).to.eq('imputation');
        await stampCancelledUpdatePage.save();
        expect(await stampCancelledUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await stampCancelledComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last StampCancelled', async () => {
        const nbButtonsBeforeDelete = await stampCancelledComponentsPage.countDeleteButtons();
        await stampCancelledComponentsPage.clickOnLastDeleteButton();

        stampCancelledDeleteDialog = new StampCancelledDeleteDialog();
        expect(await stampCancelledDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Stamp Cancelled?');
        await stampCancelledDeleteDialog.clickOnConfirmButton();

        expect(await stampCancelledComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
