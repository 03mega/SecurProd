import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParcelControl } from 'app/shared/model/parcel-control.model';
import { ParcelControlService } from './parcel-control.service';
import { ParcelControlComponent } from './parcel-control.component';
import { ParcelControlDetailComponent } from './parcel-control-detail.component';
import { ParcelControlUpdateComponent } from './parcel-control-update.component';
import { ParcelControlDeletePopupComponent } from './parcel-control-delete-dialog.component';
import { IParcelControl } from 'app/shared/model/parcel-control.model';

@Injectable({ providedIn: 'root' })
export class ParcelControlResolve implements Resolve<IParcelControl> {
    constructor(private service: ParcelControlService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParcelControl> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ParcelControl>) => response.ok),
                map((parcelControl: HttpResponse<ParcelControl>) => parcelControl.body)
            );
        }
        return of(new ParcelControl());
    }
}

export const parcelControlRoute: Routes = [
    {
        path: '',
        component: ParcelControlComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelControls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ParcelControlDetailComponent,
        resolve: {
            parcelControl: ParcelControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelControls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ParcelControlUpdateComponent,
        resolve: {
            parcelControl: ParcelControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelControls'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ParcelControlUpdateComponent,
        resolve: {
            parcelControl: ParcelControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelControls'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parcelControlPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ParcelControlDeletePopupComponent,
        resolve: {
            parcelControl: ParcelControlResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelControls'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
