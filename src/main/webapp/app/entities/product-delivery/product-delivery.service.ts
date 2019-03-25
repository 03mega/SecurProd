import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductDelivery } from 'app/shared/model/product-delivery.model';

type EntityResponseType = HttpResponse<IProductDelivery>;
type EntityArrayResponseType = HttpResponse<IProductDelivery[]>;

@Injectable({ providedIn: 'root' })
export class ProductDeliveryService {
    public resourceUrl = SERVER_API_URL + 'api/product-deliveries';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/product-deliveries';

    constructor(protected http: HttpClient) {}

    create(productDelivery: IProductDelivery): Observable<EntityResponseType> {
        return this.http.post<IProductDelivery>(this.resourceUrl, productDelivery, { observe: 'response' });
    }

    update(productDelivery: IProductDelivery): Observable<EntityResponseType> {
        return this.http.put<IProductDelivery>(this.resourceUrl, productDelivery, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductDelivery>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductDelivery[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductDelivery[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
