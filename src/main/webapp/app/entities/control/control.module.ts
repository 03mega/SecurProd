import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    ControlComponent,
    ControlDetailComponent,
    ControlUpdateComponent,
    ControlDeletePopupComponent,
    ControlDeleteDialogComponent,
    controlRoute,
    controlPopupRoute
} from './';

const ENTITY_STATES = [...controlRoute, ...controlPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ControlComponent,
        ControlDetailComponent,
        ControlUpdateComponent,
        ControlDeleteDialogComponent,
        ControlDeletePopupComponent
    ],
    entryComponents: [ControlComponent, ControlUpdateComponent, ControlDeleteDialogComponent, ControlDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdControlModule {}
