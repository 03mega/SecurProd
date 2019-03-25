import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProgramProduct } from 'app/shared/model/program-product.model';

type EntityResponseType = HttpResponse<IProgramProduct>;
type EntityArrayResponseType = HttpResponse<IProgramProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProgramProductService {
    public resourceUrl = SERVER_API_URL + 'api/program-products';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/program-products';

    constructor(protected http: HttpClient) {}

    create(programProduct: IProgramProduct): Observable<EntityResponseType> {
        return this.http.post<IProgramProduct>(this.resourceUrl, programProduct, { observe: 'response' });
    }

    update(programProduct: IProgramProduct): Observable<EntityResponseType> {
        return this.http.put<IProgramProduct>(this.resourceUrl, programProduct, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProgramProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProgramProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProgramProduct[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
