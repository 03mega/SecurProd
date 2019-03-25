import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    ProductDeliveryComponent,
    ProductDeliveryDetailComponent,
    ProductDeliveryUpdateComponent,
    ProductDeliveryDeletePopupComponent,
    ProductDeliveryDeleteDialogComponent,
    productDeliveryRoute,
    productDeliveryPopupRoute
} from './';

const ENTITY_STATES = [...productDeliveryRoute, ...productDeliveryPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductDeliveryComponent,
        ProductDeliveryDetailComponent,
        ProductDeliveryUpdateComponent,
        ProductDeliveryDeleteDialogComponent,
        ProductDeliveryDeletePopupComponent
    ],
    entryComponents: [
        ProductDeliveryComponent,
        ProductDeliveryUpdateComponent,
        ProductDeliveryDeleteDialogComponent,
        ProductDeliveryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdProductDeliveryModule {}
