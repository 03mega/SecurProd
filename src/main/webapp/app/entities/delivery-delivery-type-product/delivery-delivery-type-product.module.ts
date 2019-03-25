import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    DeliveryDeliveryTypeProductComponent,
    DeliveryDeliveryTypeProductDetailComponent,
    DeliveryDeliveryTypeProductUpdateComponent,
    DeliveryDeliveryTypeProductDeletePopupComponent,
    DeliveryDeliveryTypeProductDeleteDialogComponent,
    deliveryDeliveryTypeProductRoute,
    deliveryDeliveryTypeProductPopupRoute
} from './';

const ENTITY_STATES = [...deliveryDeliveryTypeProductRoute, ...deliveryDeliveryTypeProductPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryDeliveryTypeProductComponent,
        DeliveryDeliveryTypeProductDetailComponent,
        DeliveryDeliveryTypeProductUpdateComponent,
        DeliveryDeliveryTypeProductDeleteDialogComponent,
        DeliveryDeliveryTypeProductDeletePopupComponent
    ],
    entryComponents: [
        DeliveryDeliveryTypeProductComponent,
        DeliveryDeliveryTypeProductUpdateComponent,
        DeliveryDeliveryTypeProductDeleteDialogComponent,
        DeliveryDeliveryTypeProductDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdDeliveryDeliveryTypeProductModule {}
