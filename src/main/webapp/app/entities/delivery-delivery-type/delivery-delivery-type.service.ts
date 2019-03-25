import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';

type EntityResponseType = HttpResponse<IDeliveryDeliveryType>;
type EntityArrayResponseType = HttpResponse<IDeliveryDeliveryType[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryDeliveryTypeService {
    public resourceUrl = SERVER_API_URL + 'api/delivery-delivery-types';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/delivery-delivery-types';

    constructor(protected http: HttpClient) {}

    create(deliveryDeliveryType: IDeliveryDeliveryType): Observable<EntityResponseType> {
        return this.http.post<IDeliveryDeliveryType>(this.resourceUrl, deliveryDeliveryType, { observe: 'response' });
    }

    update(deliveryDeliveryType: IDeliveryDeliveryType): Observable<EntityResponseType> {
        return this.http.put<IDeliveryDeliveryType>(this.resourceUrl, deliveryDeliveryType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDeliveryDeliveryType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDeliveryDeliveryType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDeliveryDeliveryType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
