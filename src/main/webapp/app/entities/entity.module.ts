import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'client',
                loadChildren: './client/client.module#SecurProdClientModule'
            },
            {
                path: 'control',
                loadChildren: './control/control.module#SecurProdControlModule'
            },
            {
                path: 'delivery',
                loadChildren: './delivery/delivery.module#SecurProdDeliveryModule'
            },
            {
                path: 'delivery-type',
                loadChildren: './delivery-type/delivery-type.module#SecurProdDeliveryTypeModule'
            },
            {
                path: 'delivery-delivery-type',
                loadChildren: './delivery-delivery-type/delivery-delivery-type.module#SecurProdDeliveryDeliveryTypeModule'
            },
            {
                path: 'parcel',
                loadChildren: './parcel/parcel.module#SecurProdParcelModule'
            },
            {
                path: 'product',
                loadChildren: './product/product.module#SecurProdProductModule'
            },
            {
                path: 'program',
                loadChildren: './program/program.module#SecurProdProgramModule'
            },
            {
                path: 'unit',
                loadChildren: './unit/unit.module#SecurProdUnitModule'
            },
            {
                path: 'program-product',
                loadChildren: './program-product/program-product.module#SecurProdProgramProductModule'
            },
            {
                path: 'parcel-products',
                loadChildren: './parcel-products/parcel-products.module#SecurProdParcelProductsModule'
            },
            {
                path: 'stamp',
                loadChildren: './stamp/stamp.module#SecurProdStampModule'
            },
            {
                path: 'stamp-cancelled',
                loadChildren: './stamp-cancelled/stamp-cancelled.module#SecurProdStampCancelledModule'
            },
            {
                path: 'product-delivery',
                loadChildren: './product-delivery/product-delivery.module#SecurProdProductDeliveryModule'
            },
            {
                path: 'parcel-control',
                loadChildren: './parcel-control/parcel-control.module#SecurProdParcelControlModule'
            },
            {
                path: 'delivery-delivery-type-product',
                loadChildren:
                    './delivery-delivery-type-product/delivery-delivery-type-product.module#SecurProdDeliveryDeliveryTypeProductModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurProdEntityModule {}
