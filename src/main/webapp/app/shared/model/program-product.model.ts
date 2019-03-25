import { IProgram } from 'app/shared/model/program.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IProgramProduct {
    id?: number;
    programs?: IProgram[];
    products?: IProduct[];
}

export class ProgramProduct implements IProgramProduct {
    constructor(public id?: number, public programs?: IProgram[], public products?: IProduct[]) {}
}
