import { IControl } from 'app/shared/model/control.model';

export interface IParcelControl {
    id?: number;
    control?: IControl;
}

export class ParcelControl implements IParcelControl {
    constructor(public id?: number, public control?: IControl) {}
}
