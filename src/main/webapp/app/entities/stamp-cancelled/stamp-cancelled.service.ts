import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStampCancelled } from 'app/shared/model/stamp-cancelled.model';

type EntityResponseType = HttpResponse<IStampCancelled>;
type EntityArrayResponseType = HttpResponse<IStampCancelled[]>;

@Injectable({ providedIn: 'root' })
export class StampCancelledService {
    public resourceUrl = SERVER_API_URL + 'api/stamp-cancelleds';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/stamp-cancelleds';

    constructor(protected http: HttpClient) {}

    create(stampCancelled: IStampCancelled): Observable<EntityResponseType> {
        return this.http.post<IStampCancelled>(this.resourceUrl, stampCancelled, { observe: 'response' });
    }

    update(stampCancelled: IStampCancelled): Observable<EntityResponseType> {
        return this.http.put<IStampCancelled>(this.resourceUrl, stampCancelled, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStampCancelled>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStampCancelled[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStampCancelled[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
