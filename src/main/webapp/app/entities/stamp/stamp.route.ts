import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Stamp } from 'app/shared/model/stamp.model';
import { StampService } from './stamp.service';
import { StampComponent } from './stamp.component';
import { StampDetailComponent } from './stamp-detail.component';
import { StampUpdateComponent } from './stamp-update.component';
import { StampDeletePopupComponent } from './stamp-delete-dialog.component';
import { IStamp } from 'app/shared/model/stamp.model';

@Injectable({ providedIn: 'root' })
export class StampResolve implements Resolve<IStamp> {
    constructor(private service: StampService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStamp> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Stamp>) => response.ok),
                map((stamp: HttpResponse<Stamp>) => stamp.body)
            );
        }
        return of(new Stamp());
    }
}

export const stampRoute: Routes = [
    {
        path: '',
        component: StampComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stamps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StampDetailComponent,
        resolve: {
            stamp: StampResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stamps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StampUpdateComponent,
        resolve: {
            stamp: StampResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stamps'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StampUpdateComponent,
        resolve: {
            stamp: StampResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stamps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stampPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StampDeletePopupComponent,
        resolve: {
            stamp: StampResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stamps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
