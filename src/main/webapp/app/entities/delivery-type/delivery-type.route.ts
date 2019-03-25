import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DeliveryType } from 'app/shared/model/delivery-type.model';
import { DeliveryTypeService } from './delivery-type.service';
import { DeliveryTypeComponent } from './delivery-type.component';
import { DeliveryTypeDetailComponent } from './delivery-type-detail.component';
import { DeliveryTypeUpdateComponent } from './delivery-type-update.component';
import { DeliveryTypeDeletePopupComponent } from './delivery-type-delete-dialog.component';
import { IDeliveryType } from 'app/shared/model/delivery-type.model';

@Injectable({ providedIn: 'root' })
export class DeliveryTypeResolve implements Resolve<IDeliveryType> {
    constructor(private service: DeliveryTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDeliveryType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DeliveryType>) => response.ok),
                map((deliveryType: HttpResponse<DeliveryType>) => deliveryType.body)
            );
        }
        return of(new DeliveryType());
    }
}

export const deliveryTypeRoute: Routes = [
    {
        path: '',
        component: DeliveryTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DeliveryTypeDetailComponent,
        resolve: {
            deliveryType: DeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DeliveryTypeUpdateComponent,
        resolve: {
            deliveryType: DeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DeliveryTypeUpdateComponent,
        resolve: {
            deliveryType: DeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DeliveryTypeDeletePopupComponent,
        resolve: {
            deliveryType: DeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
