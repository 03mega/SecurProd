import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductDelivery } from 'app/shared/model/product-delivery.model';
import { ProductDeliveryService } from './product-delivery.service';
import { ProductDeliveryComponent } from './product-delivery.component';
import { ProductDeliveryDetailComponent } from './product-delivery-detail.component';
import { ProductDeliveryUpdateComponent } from './product-delivery-update.component';
import { ProductDeliveryDeletePopupComponent } from './product-delivery-delete-dialog.component';
import { IProductDelivery } from 'app/shared/model/product-delivery.model';

@Injectable({ providedIn: 'root' })
export class ProductDeliveryResolve implements Resolve<IProductDelivery> {
    constructor(private service: ProductDeliveryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductDelivery> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProductDelivery>) => response.ok),
                map((productDelivery: HttpResponse<ProductDelivery>) => productDelivery.body)
            );
        }
        return of(new ProductDelivery());
    }
}

export const productDeliveryRoute: Routes = [
    {
        path: '',
        component: ProductDeliveryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductDeliveries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductDeliveryDetailComponent,
        resolve: {
            productDelivery: ProductDeliveryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductDeliveries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductDeliveryUpdateComponent,
        resolve: {
            productDelivery: ProductDeliveryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductDeliveries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductDeliveryUpdateComponent,
        resolve: {
            productDelivery: ProductDeliveryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductDeliveries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productDeliveryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProductDeliveryDeletePopupComponent,
        resolve: {
            productDelivery: ProductDeliveryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductDeliveries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
