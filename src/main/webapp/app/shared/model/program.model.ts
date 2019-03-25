import { IUnit } from 'app/shared/model/unit.model';
import { IProgramProduct } from 'app/shared/model/program-product.model';

export interface IProgram {
    id?: number;
    name?: string;
    unit?: IUnit;
    programProduct?: IProgramProduct;
}

export class Program implements IProgram {
    constructor(public id?: number, public name?: string, public unit?: IUnit, public programProduct?: IProgramProduct) {}
}
