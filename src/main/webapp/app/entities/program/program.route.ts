import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Program } from 'app/shared/model/program.model';
import { ProgramService } from './program.service';
import { ProgramComponent } from './program.component';
import { ProgramDetailComponent } from './program-detail.component';
import { ProgramUpdateComponent } from './program-update.component';
import { ProgramDeletePopupComponent } from './program-delete-dialog.component';
import { IProgram } from 'app/shared/model/program.model';

@Injectable({ providedIn: 'root' })
export class ProgramResolve implements Resolve<IProgram> {
    constructor(private service: ProgramService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProgram> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Program>) => response.ok),
                map((program: HttpResponse<Program>) => program.body)
            );
        }
        return of(new Program());
    }
}

export const programRoute: Routes = [
    {
        path: '',
        component: ProgramComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Programs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProgramDetailComponent,
        resolve: {
            program: ProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Programs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProgramUpdateComponent,
        resolve: {
            program: ProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Programs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProgramUpdateComponent,
        resolve: {
            program: ProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Programs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const programPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProgramDeletePopupComponent,
        resolve: {
            program: ProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Programs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
