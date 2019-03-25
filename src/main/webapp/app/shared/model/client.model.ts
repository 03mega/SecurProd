export interface IClient {
    id?: number;
    code?: string;
    vrCode?: string;
    name?: string;
    seit?: string;
    pspCode?: string;
    category?: string;
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public code?: string,
        public vrCode?: string,
        public name?: string,
        public seit?: string,
        public pspCode?: string,
        public category?: string
    ) {}
}
