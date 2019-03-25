import { Moment } from 'moment';
import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';
import { IClient } from 'app/shared/model/client.model';
import { IProductDelivery } from 'app/shared/model/product-delivery.model';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

export interface IDelivery {
    id?: number;
    borderDelivery?: string;
    valuationNumber?: string;
    deliveryDate?: Moment;
    category?: string;
    zone?: string;
    deliveryDeliveryTypes?: IDeliveryDeliveryType[];
    client?: IClient;
    productDelivery?: IProductDelivery;
    deliveryDeliveryTypeProduct?: IDeliveryDeliveryTypeProduct;
}

export class Delivery implements IDelivery {
    constructor(
        public id?: number,
        public borderDelivery?: string,
        public valuationNumber?: string,
        public deliveryDate?: Moment,
        public category?: string,
        public zone?: string,
        public deliveryDeliveryTypes?: IDeliveryDeliveryType[],
        public client?: IClient,
        public productDelivery?: IProductDelivery,
        public deliveryDeliveryTypeProduct?: IDeliveryDeliveryTypeProduct
    ) {}
}
