import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';
import { DeliveryDeliveryTypeProductService } from './delivery-delivery-type-product.service';
import { DeliveryDeliveryTypeProductComponent } from './delivery-delivery-type-product.component';
import { DeliveryDeliveryTypeProductDetailComponent } from './delivery-delivery-type-product-detail.component';
import { DeliveryDeliveryTypeProductUpdateComponent } from './delivery-delivery-type-product-update.component';
import { DeliveryDeliveryTypeProductDeletePopupComponent } from './delivery-delivery-type-product-delete-dialog.component';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

@Injectable({ providedIn: 'root' })
export class DeliveryDeliveryTypeProductResolve implements Resolve<IDeliveryDeliveryTypeProduct> {
    constructor(private service: DeliveryDeliveryTypeProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDeliveryDeliveryTypeProduct> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DeliveryDeliveryTypeProduct>) => response.ok),
                map((deliveryDeliveryTypeProduct: HttpResponse<DeliveryDeliveryTypeProduct>) => deliveryDeliveryTypeProduct.body)
            );
        }
        return of(new DeliveryDeliveryTypeProduct());
    }
}

export const deliveryDeliveryTypeProductRoute: Routes = [
    {
        path: '',
        component: DeliveryDeliveryTypeProductComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypeProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DeliveryDeliveryTypeProductDetailComponent,
        resolve: {
            deliveryDeliveryTypeProduct: DeliveryDeliveryTypeProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypeProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DeliveryDeliveryTypeProductUpdateComponent,
        resolve: {
            deliveryDeliveryTypeProduct: DeliveryDeliveryTypeProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypeProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DeliveryDeliveryTypeProductUpdateComponent,
        resolve: {
            deliveryDeliveryTypeProduct: DeliveryDeliveryTypeProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypeProducts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryDeliveryTypeProductPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DeliveryDeliveryTypeProductDeletePopupComponent,
        resolve: {
            deliveryDeliveryTypeProduct: DeliveryDeliveryTypeProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DeliveryDeliveryTypeProducts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
