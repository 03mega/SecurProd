import { IParcel } from 'app/shared/model/parcel.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IParcelProducts {
    id?: number;
    quantity?: number;
    parcels?: IParcel[];
    products?: IProduct[];
}

export class ParcelProducts implements IParcelProducts {
    constructor(public id?: number, public quantity?: number, public parcels?: IParcel[], public products?: IProduct[]) {}
}
