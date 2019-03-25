import { IStamp } from 'app/shared/model/stamp.model';

export interface IStampCancelled {
    id?: number;
    reason?: string;
    imputation?: string;
    stamp?: IStamp;
}

export class StampCancelled implements IStampCancelled {
    constructor(public id?: number, public reason?: string, public imputation?: string, public stamp?: IStamp) {}
}
