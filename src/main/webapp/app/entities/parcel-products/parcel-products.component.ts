import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParcelProducts } from 'app/shared/model/parcel-products.model';
import { AccountService } from 'app/core';
import { ParcelProductsService } from './parcel-products.service';

@Component({
    selector: 'jhi-parcel-products',
    templateUrl: './parcel-products.component.html'
})
export class ParcelProductsComponent implements OnInit, OnDestroy {
    parcelProducts: IParcelProducts[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected parcelProductsService: ParcelProductsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.parcelProductsService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IParcelProducts[]>) => res.ok),
                    map((res: HttpResponse<IParcelProducts[]>) => res.body)
                )
                .subscribe((res: IParcelProducts[]) => (this.parcelProducts = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.parcelProductsService
            .query()
            .pipe(
                filter((res: HttpResponse<IParcelProducts[]>) => res.ok),
                map((res: HttpResponse<IParcelProducts[]>) => res.body)
            )
            .subscribe(
                (res: IParcelProducts[]) => {
                    this.parcelProducts = res;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParcelProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParcelProducts) {
        return item.id;
    }

    registerChangeInParcelProducts() {
        this.eventSubscriber = this.eventManager.subscribe('parcelProductsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
