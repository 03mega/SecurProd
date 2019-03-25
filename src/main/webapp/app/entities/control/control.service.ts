import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IControl } from 'app/shared/model/control.model';

type EntityResponseType = HttpResponse<IControl>;
type EntityArrayResponseType = HttpResponse<IControl[]>;

@Injectable({ providedIn: 'root' })
export class ControlService {
    public resourceUrl = SERVER_API_URL + 'api/controls';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/controls';

    constructor(protected http: HttpClient) {}

    create(control: IControl): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(control);
        return this.http
            .post<IControl>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(control: IControl): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(control);
        return this.http
            .put<IControl>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IControl>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IControl[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IControl[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(control: IControl): IControl {
        const copy: IControl = Object.assign({}, control, {
            controlDate: control.controlDate != null && control.controlDate.isValid() ? control.controlDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.controlDate = res.body.controlDate != null ? moment(res.body.controlDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((control: IControl) => {
                control.controlDate = control.controlDate != null ? moment(control.controlDate) : null;
            });
        }
        return res;
    }
}
