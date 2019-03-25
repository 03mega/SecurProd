import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProgramProduct } from 'app/shared/model/program-product.model';
import { ProgramProductService } from './program-product.service';
import { ProgramProductComponent } from './program-product.component';
import { ProgramProductDetailComponent } from './program-product-detail.component';
import { ProgramProductUpdateComponent } from './program-product-update.component';
import { ProgramProductDeletePopupComponent } from './program-product-delete-dialog.component';
import { IProgramProduct } from 'app/shared/model/program-product.model';

@Injectable({ providedIn: 'root' })
export class ProgramProductResolve implements Resolve<IProgramProduct> {
    constructor(private service: ProgramProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProgramProduct> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProgramProduct>) => response.ok),
                map((programProduct: HttpResponse<ProgramProduct>) => programProduct.body)
            );
        }
        return of(new ProgramProduct());
    }
}

export const programProductRoute: Routes = [
    {
        path: '',
        component: ProgramProductComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProgramProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProgramProductDetailComponent,
        resolve: {
            programProduct: ProgramProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProgramProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProgramProductUpdateComponent,
        resolve: {
            programProduct: ProgramProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProgramProducts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProgramProductUpdateComponent,
        resolve: {
            programProduct: ProgramProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProgramProducts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const programProductPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProgramProductDeletePopupComponent,
        resolve: {
            programProduct: ProgramProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProgramProducts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
