import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParcelProducts } from 'app/shared/model/parcel-products.model';
import { ParcelProductsService } from './parcel-products.service';
import { ParcelProductsComponent } from './parcel-products.component';
import { ParcelProductsDetailComponent } from './parcel-products-detail.component';
import { ParcelProductsUpdateComponent } from './parcel-products-update.component';
import { ParcelProductsDeletePopupComponent } from './parcel-products-delete-dialog.component';
import { IParcelProducts } from 'app/shared/model/parcel-products.model';

@Injectable({ providedIn: 'root' })
export class ParcelProductsResolve implements Resolve<IParcelProducts> {
    constructor(private service: ParcelProductsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParcelProducts> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ParcelProducts>) => response.ok),
                map((parcelProducts: HttpResponse<ParcelProducts>) => parcelProducts.body)
            );
        }
        return of(new ParcelProducts());
    }
}

export const parcelProductsRoute: Routes = [
    {
        path: '',
        component: ParcelProductsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ParcelProductsDetailComponent,
        resolve: {
            parcelProducts: ParcelProductsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ParcelProductsUpdateComponent,
        resolve: {
            parcelProducts: ParcelProductsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ParcelProductsUpdateComponent,
        resolve: {
            parcelProducts: ParcelProductsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelProducts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parcelProductsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ParcelProductsDeletePopupComponent,
        resolve: {
            parcelProducts: ParcelProductsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParcelProducts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
