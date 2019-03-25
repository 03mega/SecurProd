import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductDelivery } from 'app/shared/model/product-delivery.model';
import { AccountService } from 'app/core';
import { ProductDeliveryService } from './product-delivery.service';

@Component({
    selector: 'jhi-product-delivery',
    templateUrl: './product-delivery.component.html'
})
export class ProductDeliveryComponent implements OnInit, OnDestroy {
    productDeliveries: IProductDelivery[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected productDeliveryService: ProductDeliveryService,
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
            this.productDeliveryService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IProductDelivery[]>) => res.ok),
                    map((res: HttpResponse<IProductDelivery[]>) => res.body)
                )
                .subscribe(
                    (res: IProductDelivery[]) => (this.productDeliveries = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.productDeliveryService
            .query()
            .pipe(
                filter((res: HttpResponse<IProductDelivery[]>) => res.ok),
                map((res: HttpResponse<IProductDelivery[]>) => res.body)
            )
            .subscribe(
                (res: IProductDelivery[]) => {
                    this.productDeliveries = res;
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
        this.registerChangeInProductDeliveries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductDelivery) {
        return item.id;
    }

    registerChangeInProductDeliveries() {
        this.eventSubscriber = this.eventManager.subscribe('productDeliveryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
