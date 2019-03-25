import { IDelivery } from 'app/shared/model/delivery.model';
import { IDeliveryType } from 'app/shared/model/delivery-type.model';

export interface IDeliveryDeliveryType {
    id?: number;
    delivery?: IDelivery;
    deliveryType?: IDeliveryType;
}

export class DeliveryDeliveryType implements IDeliveryDeliveryType {
    constructor(public id?: number, public delivery?: IDelivery, public deliveryType?: IDeliveryType) {}
}
