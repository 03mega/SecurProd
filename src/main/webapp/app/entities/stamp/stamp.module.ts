import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    StampComponent,
    StampDetailComponent,
    StampUpdateComponent,
    StampDeletePopupComponent,
    StampDeleteDialogComponent,
    stampRoute,
    stampPopupRoute
} from './';

const ENTITY_STATES = [...stampRoute, ...stampPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StampComponent, StampDetailComponent, StampUpdateComponent, StampDeleteDialogComponent, StampDeletePopupComponent],
    entryComponents: [StampComponent, StampUpdateComponent, StampDeleteDialogComponent, StampDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdStampModule {}
