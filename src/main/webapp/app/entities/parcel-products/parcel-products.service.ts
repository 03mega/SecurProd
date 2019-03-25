import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParcelProducts } from 'app/shared/model/parcel-products.model';

type EntityResponseType = HttpResponse<IParcelProducts>;
type EntityArrayResponseType = HttpResponse<IParcelProducts[]>;

@Injectable({ providedIn: 'root' })
export class ParcelProductsService {
    public resourceUrl = SERVER_API_URL + 'api/parcel-products';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/parcel-products';

    constructor(protected http: HttpClient) {}

    create(parcelProducts: IParcelProducts): Observable<EntityResponseType> {
        return this.http.post<IParcelProducts>(this.resourceUrl, parcelProducts, { observe: 'response' });
    }

    update(parcelProducts: IParcelProducts): Observable<EntityResponseType> {
        return this.http.put<IParcelProducts>(this.resourceUrl, parcelProducts, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IParcelProducts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParcelProducts[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParcelProducts[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
