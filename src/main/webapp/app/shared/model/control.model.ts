import { Moment } from 'moment';
import { IParcelControl } from 'app/shared/model/parcel-control.model';

export interface IControl {
    id?: number;
    controlDate?: Moment;
    status?: boolean;
    parcelControls?: IParcelControl[];
}

export class Control implements IControl {
    constructor(public id?: number, public controlDate?: Moment, public status?: boolean, public parcelControls?: IParcelControl[]) {
        this.status = this.status || false;
    }
}
