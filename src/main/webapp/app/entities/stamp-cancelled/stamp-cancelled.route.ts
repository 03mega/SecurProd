import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StampCancelled } from 'app/shared/model/stamp-cancelled.model';
import { StampCancelledService } from './stamp-cancelled.service';
import { StampCancelledComponent } from './stamp-cancelled.component';
import { StampCancelledDetailComponent } from './stamp-cancelled-detail.component';
import { StampCancelledUpdateComponent } from './stamp-cancelled-update.component';
import { StampCancelledDeletePopupComponent } from './stamp-cancelled-delete-dialog.component';
import { IStampCancelled } from 'app/shared/model/stamp-cancelled.model';

@Injectable({ providedIn: 'root' })
export class StampCancelledResolve implements Resolve<IStampCancelled> {
    constructor(private service: StampCancelledService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStampCancelled> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StampCancelled>) => response.ok),
                map((stampCancelled: HttpResponse<StampCancelled>) => stampCancelled.body)
            );
        }
        return of(new StampCancelled());
    }
}

export const stampCancelledRoute: Routes = [
    {
        path: '',
        component: StampCancelledComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StampCancelleds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StampCancelledDetailComponent,
        resolve: {
            stampCancelled: StampCancelledResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StampCancelleds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StampCancelledUpdateComponent,
        resolve: {
            stampCancelled: StampCancelledResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StampCancelleds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StampCancelledUpdateComponent,
        resolve: {
            stampCancelled: StampCancelledResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StampCancelleds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stampCancelledPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StampCancelledDeletePopupComponent,
        resolve: {
            stampCancelled: StampCancelledResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StampCancelleds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
