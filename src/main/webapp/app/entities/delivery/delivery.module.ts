import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    DeliveryComponent,
    DeliveryDetailComponent,
    DeliveryUpdateComponent,
    DeliveryDeletePopupComponent,
    DeliveryDeleteDialogComponent,
    deliveryRoute,
    deliveryPopupRoute
} from './';

const ENTITY_STATES = [...deliveryRoute, ...deliveryPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryComponent,
        DeliveryDetailComponent,
        DeliveryUpdateComponent,
        DeliveryDeleteDialogComponent,
        DeliveryDeletePopupComponent
    ],
    entryComponents: [DeliveryComponent, DeliveryUpdateComponent, DeliveryDeleteDialogComponent, DeliveryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdDeliveryModule {}
