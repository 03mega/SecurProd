import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    DeliveryDeliveryTypeComponent,
    DeliveryDeliveryTypeDetailComponent,
    DeliveryDeliveryTypeUpdateComponent,
    DeliveryDeliveryTypeDeletePopupComponent,
    DeliveryDeliveryTypeDeleteDialogComponent,
    deliveryDeliveryTypeRoute,
    deliveryDeliveryTypePopupRoute
} from './';

const ENTITY_STATES = [...deliveryDeliveryTypeRoute, ...deliveryDeliveryTypePopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryDeliveryTypeComponent,
        DeliveryDeliveryTypeDetailComponent,
        DeliveryDeliveryTypeUpdateComponent,
        DeliveryDeliveryTypeDeleteDialogComponent,
        DeliveryDeliveryTypeDeletePopupComponent
    ],
    entryComponents: [
        DeliveryDeliveryTypeComponent,
        DeliveryDeliveryTypeUpdateComponent,
        DeliveryDeliveryTypeDeleteDialogComponent,
        DeliveryDeliveryTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdDeliveryDeliveryTypeModule {}
