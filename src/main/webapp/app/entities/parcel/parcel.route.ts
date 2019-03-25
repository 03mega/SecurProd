import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Parcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';
import { ParcelComponent } from './parcel.component';
import { ParcelDetailComponent } from './parcel-detail.component';
import { ParcelUpdateComponent } from './parcel-update.component';
import { ParcelDeletePopupComponent } from './parcel-delete-dialog.component';
import { IParcel } from 'app/shared/model/parcel.model';

@Injectable({ providedIn: 'root' })
export class ParcelResolve implements Resolve<IParcel> {
    constructor(private service: ParcelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParcel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Parcel>) => response.ok),
                map((parcel: HttpResponse<Parcel>) => parcel.body)
            );
        }
        return of(new Parcel());
    }
}

export const parcelRoute: Routes = [
    {
        path: '',
        component: ParcelComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Parcels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ParcelDetailComponent,
        resolve: {
            parcel: ParcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parcels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ParcelUpdateComponent,
        resolve: {
            parcel: ParcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parcels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ParcelUpdateComponent,
        resolve: {
            parcel: ParcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parcels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parcelPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ParcelDeletePopupComponent,
        resolve: {
            parcel: ParcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parcels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
