import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    DeliveryTypeComponent,
    DeliveryTypeDetailComponent,
    DeliveryTypeUpdateComponent,
    DeliveryTypeDeletePopupComponent,
    DeliveryTypeDeleteDialogComponent,
    deliveryTypeRoute,
    deliveryTypePopupRoute
} from './';

const ENTITY_STATES = [...deliveryTypeRoute, ...deliveryTypePopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryTypeComponent,
        DeliveryTypeDetailComponent,
        DeliveryTypeUpdateComponent,
        DeliveryTypeDeleteDialogComponent,
        DeliveryTypeDeletePopupComponent
    ],
    entryComponents: [
        DeliveryTypeComponent,
        DeliveryTypeUpdateComponent,
        DeliveryTypeDeleteDialogComponent,
        DeliveryTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdDeliveryTypeModule {}
