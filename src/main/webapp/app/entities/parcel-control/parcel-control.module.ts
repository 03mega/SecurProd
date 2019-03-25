import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    ParcelControlComponent,
    ParcelControlDetailComponent,
    ParcelControlUpdateComponent,
    ParcelControlDeletePopupComponent,
    ParcelControlDeleteDialogComponent,
    parcelControlRoute,
    parcelControlPopupRoute
} from './';

const ENTITY_STATES = [...parcelControlRoute, ...parcelControlPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParcelControlComponent,
        ParcelControlDetailComponent,
        ParcelControlUpdateComponent,
        ParcelControlDeleteDialogComponent,
        ParcelControlDeletePopupComponent
    ],
    entryComponents: [
        ParcelControlComponent,
        ParcelControlUpdateComponent,
        ParcelControlDeleteDialogComponent,
        ParcelControlDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdParcelControlModule {}
