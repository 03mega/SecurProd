import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParcelControl } from 'app/shared/model/parcel-control.model';
import { AccountService } from 'app/core';
import { ParcelControlService } from './parcel-control.service';

@Component({
    selector: 'jhi-parcel-control',
    templateUrl: './parcel-control.component.html'
})
export class ParcelControlComponent implements OnInit, OnDestroy {
    parcelControls: IParcelControl[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected parcelControlService: ParcelControlService,
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
            this.parcelControlService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IParcelControl[]>) => res.ok),
                    map((res: HttpResponse<IParcelControl[]>) => res.body)
                )
                .subscribe((res: IParcelControl[]) => (this.parcelControls = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.parcelControlService
            .query()
            .pipe(
                filter((res: HttpResponse<IParcelControl[]>) => res.ok),
                map((res: HttpResponse<IParcelControl[]>) => res.body)
            )
            .subscribe(
                (res: IParcelControl[]) => {
                    this.parcelControls = res;
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
        this.registerChangeInParcelControls();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParcelControl) {
        return item.id;
    }

    registerChangeInParcelControls() {
        this.eventSubscriber = this.eventManager.subscribe('parcelControlListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
