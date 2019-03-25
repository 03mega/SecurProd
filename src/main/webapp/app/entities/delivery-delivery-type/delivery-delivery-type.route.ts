import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';
import { DeliveryDeliveryTypeService } from './delivery-delivery-type.service';
import { DeliveryDeliveryTypeComponent } from './delivery-delivery-type.component';
import { DeliveryDeliveryTypeDetailComponent } from './delivery-delivery-type-detail.component';
import { DeliveryDeliveryTypeUpdateComponent } from './delivery-delivery-type-update.component';
import { DeliveryDeliveryTypeDeletePopupComponent } from './delivery-delivery-type-delete-dialog.component';
import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';

@Injectable({ providedIn: 'root' })
export class DeliveryDeliveryTypeResolve implements Resolve<IDeliveryDeliveryType> {
    constructor(private service: DeliveryDeliveryTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDeliveryDeliveryType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DeliveryDeliveryType>) => response.ok),
                map((deliveryDeliveryType: HttpResponse<DeliveryDeliveryType>) => deliveryDeliveryType.body)
            );
        }
        return of(new DeliveryDeliveryType());
    }
}

export const deliveryDeliveryTypeRoute: Routes = [
    {
        path: '',
        component: DeliveryDeliveryTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DeliveryDeliveryTypeDetailComponent,
        resolve: {
            deliveryDeliveryType: DeliveryDeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DeliveryDeliveryTypeUpdateComponent,
        resolve: {
            deliveryDeliveryType: DeliveryDeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DeliveryDeliveryTypeUpdateComponent,
        resolve: {
            deliveryDeliveryType: DeliveryDeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryDeliveryTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DeliveryDeliveryTypeDeletePopupComponent,
        resolve: {
            deliveryDeliveryType: DeliveryDeliveryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
