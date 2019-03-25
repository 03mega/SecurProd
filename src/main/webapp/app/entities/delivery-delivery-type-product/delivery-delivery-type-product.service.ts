import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

type EntityResponseType = HttpResponse<IDeliveryDeliveryTypeProduct>;
type EntityArrayResponseType = HttpResponse<IDeliveryDeliveryTypeProduct[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryDeliveryTypeProductService {
    public resourceUrl = SERVER_API_URL + 'api/delivery-delivery-type-products';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/delivery-delivery-type-products';

    constructor(protected http: HttpClient) {}

    create(deliveryDeliveryTypeProduct: IDeliveryDeliveryTypeProduct): Observable<EntityResponseType> {
        return this.http.post<IDeliveryDeliveryTypeProduct>(this.resourceUrl, deliveryDeliveryTypeProduct, { observe: 'response' });
    }

    update(deliveryDeliveryTypeProduct: IDeliveryDeliveryTypeProduct): Observable<EntityResponseType> {
        return this.http.put<IDeliveryDeliveryTypeProduct>(this.resourceUrl, deliveryDeliveryTypeProduct, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDeliveryDeliveryTypeProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDeliveryDeliveryTypeProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDeliveryDeliveryTypeProduct[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
