import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

export interface IDeliveryType {
    id?: number;
    name?: string;
    deliveryDeliveryTypes?: IDeliveryDeliveryType[];
    deliveryDeliveryTypeProduct?: IDeliveryDeliveryTypeProduct;
}

export class DeliveryType implements IDeliveryType {
    constructor(
        public id?: number,
        public name?: string,
        public deliveryDeliveryTypes?: IDeliveryDeliveryType[],
        public deliveryDeliveryTypeProduct?: IDeliveryDeliveryTypeProduct
    ) {}
}
