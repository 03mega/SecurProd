import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    StampCancelledComponent,
    StampCancelledDetailComponent,
    StampCancelledUpdateComponent,
    StampCancelledDeletePopupComponent,
    StampCancelledDeleteDialogComponent,
    stampCancelledRoute,
    stampCancelledPopupRoute
} from './';

const ENTITY_STATES = [...stampCancelledRoute, ...stampCancelledPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StampCancelledComponent,
        StampCancelledDetailComponent,
        StampCancelledUpdateComponent,
        StampCancelledDeleteDialogComponent,
        StampCancelledDeletePopupComponent
    ],
    entryComponents: [
        StampCancelledComponent,
        StampCancelledUpdateComponent,
        StampCancelledDeleteDialogComponent,
        StampCancelledDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdStampCancelledModule {}
