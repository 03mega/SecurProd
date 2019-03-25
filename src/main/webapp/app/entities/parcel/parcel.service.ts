import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParcel } from 'app/shared/model/parcel.model';

type EntityResponseType = HttpResponse<IParcel>;
type EntityArrayResponseType = HttpResponse<IParcel[]>;

@Injectable({ providedIn: 'root' })
export class ParcelService {
    public resourceUrl = SERVER_API_URL + 'api/parcels';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/parcels';

    constructor(protected http: HttpClient) {}

    create(parcel: IParcel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(parcel);
        return this.http
            .post<IParcel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(parcel: IParcel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(parcel);
        return this.http
            .put<IParcel>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IParcel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IParcel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IParcel[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(parcel: IParcel): IParcel {
        const copy: IParcel = Object.assign({}, parcel, {
            dateCreated: parcel.dateCreated != null && parcel.dateCreated.isValid() ? parcel.dateCreated.format(DATE_FORMAT) : null,
            dateChanged: parcel.dateChanged != null && parcel.dateChanged.isValid() ? parcel.dateChanged.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateCreated = res.body.dateCreated != null ? moment(res.body.dateCreated) : null;
            res.body.dateChanged = res.body.dateChanged != null ? moment(res.body.dateChanged) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((parcel: IParcel) => {
                parcel.dateCreated = parcel.dateCreated != null ? moment(parcel.dateCreated) : null;
                parcel.dateChanged = parcel.dateChanged != null ? moment(parcel.dateChanged) : null;
            });
        }
        return res;
    }
}
