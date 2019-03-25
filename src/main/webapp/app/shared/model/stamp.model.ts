import { IParcel } from 'app/shared/model/parcel.model';

export interface IStamp {
    id?: number;
    eNumber?: number;
    parcel?: IParcel;
}

export class Stamp implements IStamp {
    constructor(public id?: number, public eNumber?: number, public parcel?: IParcel) {}
}
