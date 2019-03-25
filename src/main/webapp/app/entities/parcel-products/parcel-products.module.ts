import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    ParcelProductsComponent,
    ParcelProductsDetailComponent,
    ParcelProductsUpdateComponent,
    ParcelProductsDeletePopupComponent,
    ParcelProductsDeleteDialogComponent,
    parcelProductsRoute,
    parcelProductsPopupRoute
} from './';

const ENTITY_STATES = [...parcelProductsRoute, ...parcelProductsPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParcelProductsComponent,
        ParcelProductsDetailComponent,
        ParcelProductsUpdateComponent,
        ParcelProductsDeleteDialogComponent,
        ParcelProductsDeletePopupComponent
    ],
    entryComponents: [
        ParcelProductsComponent,
        ParcelProductsUpdateComponent,
        ParcelProductsDeleteDialogComponent,
        ParcelProductsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdParcelProductsModule {}
