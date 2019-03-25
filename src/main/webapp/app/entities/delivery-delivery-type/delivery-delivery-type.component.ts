import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';
import { AccountService } from 'app/core';
import { DeliveryDeliveryTypeService } from './delivery-delivery-type.service';

@Component({
    selector: 'jhi-delivery-delivery-type',
    templateUrl: './delivery-delivery-type.component.html'
})
export class DeliveryDeliveryTypeComponent implements OnInit, OnDestroy {
    deliveryDeliveryTypes: IDeliveryDeliveryType[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected deliveryDeliveryTypeService: DeliveryDeliveryTypeService,
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
            this.deliveryDeliveryTypeService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IDeliveryDeliveryType[]>) => res.ok),
                    map((res: HttpResponse<IDeliveryDeliveryType[]>) => res.body)
                )
                .subscribe(
                    (res: IDeliveryDeliveryType[]) => (this.deliveryDeliveryTypes = res),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.deliveryDeliveryTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IDeliveryDeliveryType[]>) => res.ok),
                map((res: HttpResponse<IDeliveryDeliveryType[]>) => res.body)
            )
            .subscribe(
                (res: IDeliveryDeliveryType[]) => {
                    this.deliveryDeliveryTypes = res;
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
        this.registerChangeInDeliveryDeliveryTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDeliveryDeliveryType) {
        return item.id;
    }

    registerChangeInDeliveryDeliveryTypes() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryDeliveryTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
