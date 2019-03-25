import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurProdSharedModule } from 'app/shared';
import {
    ProgramProductComponent,
    ProgramProductDetailComponent,
    ProgramProductUpdateComponent,
    ProgramProductDeletePopupComponent,
    ProgramProductDeleteDialogComponent,
    programProductRoute,
    programProductPopupRoute
} from './';

const ENTITY_STATES = [...programProductRoute, ...programProductPopupRoute];

@NgModule({
    imports: [SecurProdSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProgramProductComponent,
        ProgramProductDetailComponent,
        ProgramProductUpdateComponent,
        ProgramProductDeleteDialogComponent,
        ProgramProductDeletePopupComponent
    ],
    entryComponents: [
        ProgramProductComponent,
        ProgramProductUpdateComponent,
        ProgramProductDeleteDialogComponent,
        ProgramProductDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdProgramProductModule {}
