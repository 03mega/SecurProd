import { IProgram } from 'app/shared/model/program.model';
import { IParcelProducts } from 'app/shared/model/parcel-products.model';
import { IProgramProduct } from 'app/shared/model/program-product.model';
import { IProductDelivery } from 'app/shared/model/product-delivery.model';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

export interface IProduct {
    id?: number;
    productCode?: string;
    name?: string;
    program?: IProgram;
    parcelProducts?: IParcelProducts;
    programProduct?: IProgramProduct;
    productDelivery?: IProductDelivery;
    deliveryDeliveryTypeProduct?: IDeliveryDeliveryTypeProduct;
}

export class Product implements IProduct {
    constructor(
        public id?: number,
        public productCode?: string,
        public name?: string,
        public program?: IProgram,
        public parcelProducts?: IParcelProducts,
        public programProduct?: IProgramProduct,
        public productDelivery?: IProductDelivery,
        public deliveryDeliveryTypeProduct?: IDeliveryDeliveryTypeProduct
    ) {}
}
