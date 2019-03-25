import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    ParcelComponent,
    ParcelDetailComponent,
    ParcelUpdateComponent,
    ParcelDeletePopupComponent,
    ParcelDeleteDialogComponent,
    parcelRoute,
    parcelPopupRoute
} from './';

const ENTITY_STATES = [...parcelRoute, ...parcelPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ParcelComponent, ParcelDetailComponent, ParcelUpdateComponent, ParcelDeleteDialogComponent, ParcelDeletePopupComponent],
    entryComponents: [ParcelComponent, ParcelUpdateComponent, ParcelDeleteDialogComponent, ParcelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdParcelModule {}
