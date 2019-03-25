import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStamp } from 'app/shared/model/stamp.model';

type EntityResponseType = HttpResponse<IStamp>;
type EntityArrayResponseType = HttpResponse<IStamp[]>;

@Injectable({ providedIn: 'root' })
export class StampService {
    public resourceUrl = SERVER_API_URL + 'api/stamps';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/stamps';

    constructor(protected http: HttpClient) {}

    create(stamp: IStamp): Observable<EntityResponseType> {
        return this.http.post<IStamp>(this.resourceUrl, stamp, { observe: 'response' });
    }

    update(stamp: IStamp): Observable<EntityResponseType> {
        return this.http.put<IStamp>(this.resourceUrl, stamp, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStamp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStamp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStamp[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
