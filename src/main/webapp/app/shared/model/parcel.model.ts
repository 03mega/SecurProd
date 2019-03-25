import { Moment } from 'moment';
import { IStamp } from 'app/shared/model/stamp.model';
import { IDelivery } from 'app/shared/model/delivery.model';
import { IParcelControl } from 'app/shared/model/parcel-control.model';
import { IParcelProducts } from 'app/shared/model/parcel-products.model';

export interface IParcel {
    id?: number;
    barreCode?: string;
    pageNumber?: number;
    dateCreated?: Moment;
    dateChanged?: Moment;
    stamps?: IStamp[];
    delivery?: IDelivery;
    parcelControl?: IParcelControl;
    parcelProducts?: IParcelProducts;
}

export class Parcel implements IParcel {
    constructor(
        public id?: number,
        public barreCode?: string,
        public pageNumber?: number,
        public dateCreated?: Moment,
        public dateChanged?: Moment,
        public stamps?: IStamp[],
        public delivery?: IDelivery,
        public parcelControl?: IParcelControl,
        public parcelProducts?: IParcelProducts
    ) {}
}
