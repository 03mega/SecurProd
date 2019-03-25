import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDelivery } from 'app/shared/model/delivery.model';

type EntityResponseType = HttpResponse<IDelivery>;
type EntityArrayResponseType = HttpResponse<IDelivery[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryService {
    public resourceUrl = SERVER_API_URL + 'api/deliveries';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/deliveries';

    constructor(protected http: HttpClient) {}

    create(delivery: IDelivery): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(delivery);
        return this.http
            .post<IDelivery>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(delivery: IDelivery): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(delivery);
        return this.http
            .put<IDelivery>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDelivery>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDelivery[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDelivery[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(delivery: IDelivery): IDelivery {
        const copy: IDelivery = Object.assign({}, delivery, {
            deliveryDate:
                delivery.deliveryDate != null && delivery.deliveryDate.isValid() ? delivery.deliveryDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.deliveryDate = res.body.deliveryDate != null ? moment(res.body.deliveryDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((delivery: IDelivery) => {
                delivery.deliveryDate = delivery.deliveryDate != null ? moment(delivery.deliveryDate) : null;
            });
        }
        return res;
    }
}
