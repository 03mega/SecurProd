import { IDelivery } from 'app/shared/model/delivery.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IProductDelivery {
    id?: number;
    deliveries?: IDelivery[];
    products?: IProduct[];
}

export class ProductDelivery implements IProductDelivery {
    constructor(public id?: number, public deliveries?: IDelivery[], public products?: IProduct[]) {}
}
