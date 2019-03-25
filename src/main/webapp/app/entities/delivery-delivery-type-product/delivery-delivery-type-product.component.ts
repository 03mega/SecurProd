import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';
import { AccountService } from 'app/core';
import { DeliveryDeliveryTypeProductService } from './delivery-delivery-type-product.service';

@Component({
    selector: 'jhi-delivery-delivery-type-product',
    templateUrl: './delivery-delivery-type-product.component.html'
})
export class DeliveryDeliveryTypeProductComponent implements OnInit, OnDestroy {
    deliveryDeliveryTypeProducts: IDeliveryDeliveryTypeProduct[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected deliveryDeliveryTypeProductService: DeliveryDeliveryTypeProductService,
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
            this.deliveryDeliveryTypeProductService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => res.ok),
                    map((res: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => res.body)
                )
                .subscribe(
                    (res: IDeliveryDeliveryTypeProduct[]) => (this.deliveryDeliveryTypeProducts = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.deliveryDeliveryTypeProductService
            .query()
            .pipe(
                filter((res: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => res.ok),
                map((res: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => res.body)
            )
            .subscribe(
                (res: IDeliveryDeliveryTypeProduct[]) => {
                    this.deliveryDeliveryTypeProducts = res;
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
        this.registerChangeInDeliveryDeliveryTypeProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDeliveryDeliveryTypeProduct) {
        return item.id;
    }

    registerChangeInDeliveryDeliveryTypeProducts() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryDeliveryTypeProductListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
