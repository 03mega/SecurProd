import { IDelivery } from 'app/shared/model/delivery.model';
import { IProduct } from 'app/shared/model/product.model';
import { IDeliveryType } from 'app/shared/model/delivery-type.model';

export interface IDeliveryDeliveryTypeProduct {
    id?: number;
    quantity?: number;
    deliveries?: IDelivery[];
    products?: IProduct[];
    deliveryTypes?: IDeliveryType[];
}

export class DeliveryDeliveryTypeProduct implements IDeliveryDeliveryTypeProduct {
    constructor(
        public id?: number,
        public quantity?: number,
        public deliveries?: IDelivery[],
        public products?: IProduct[],
        public deliveryTypes?: IDeliveryType[]
    ) {}
}
