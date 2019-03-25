import { NgModule } from '@angular/core';

import { SecurProdSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SecurProdSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SecurProdSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SecurProdSharedCommonModule {}
