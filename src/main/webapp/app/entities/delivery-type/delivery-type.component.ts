import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDeliveryType } from 'app/shared/model/delivery-type.model';
import { AccountService } from 'app/core';
import { DeliveryTypeService } from './delivery-type.service';

@Component({
    selector: 'jhi-delivery-type',
    templateUrl: './delivery-type.component.html'
})
export class DeliveryTypeComponent implements OnInit, OnDestroy {
    deliveryTypes: IDeliveryType[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected deliveryTypeService: DeliveryTypeService,
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
            this.deliveryTypeService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IDeliveryType[]>) => res.ok),
                    map((res: HttpResponse<IDeliveryType[]>) => res.body)
                )
                .subscribe((res: IDeliveryType[]) => (this.deliveryTypes = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.deliveryTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IDeliveryType[]>) => res.ok),
                map((res: HttpResponse<IDeliveryType[]>) => res.body)
            )
            .subscribe(
                (res: IDeliveryType[]) => {
                    this.deliveryTypes = res;
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
        this.registerChangeInDeliveryTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDeliveryType) {
        return item.id;
    }

    registerChangeInDeliveryTypes() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
