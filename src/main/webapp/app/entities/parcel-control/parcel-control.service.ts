import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParcelControl } from 'app/shared/model/parcel-control.model';

type EntityResponseType = HttpResponse<IParcelControl>;
type EntityArrayResponseType = HttpResponse<IParcelControl[]>;

@Injectable({ providedIn: 'root' })
export class ParcelControlService {
    public resourceUrl = SERVER_API_URL + 'api/parcel-controls';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/parcel-controls';

    constructor(protected http: HttpClient) {}

    create(parcelControl: IParcelControl): Observable<EntityResponseType> {
        return this.http.post<IParcelControl>(this.resourceUrl, parcelControl, { observe: 'response' });
    }

    update(parcelControl: IParcelControl): Observable<EntityResponseType> {
        return this.http.put<IParcelControl>(this.resourceUrl, parcelControl, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IParcelControl>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParcelControl[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IParcelControl[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
