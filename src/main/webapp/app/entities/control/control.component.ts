import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IControl } from 'app/shared/model/control.model';
import { AccountService } from 'app/core';
import { ControlService } from './control.service';

@Component({
    selector: 'jhi-control',
    templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit, OnDestroy {
    controls: IControl[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected controlService: ControlService,
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
            this.controlService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IControl[]>) => res.ok),
                    map((res: HttpResponse<IControl[]>) => res.body)
                )
                .subscribe((res: IControl[]) => (this.controls = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.controlService
            .query()
            .pipe(
                filter((res: HttpResponse<IControl[]>) => res.ok),
                map((res: HttpResponse<IControl[]>) => res.body)
            )
            .subscribe(
                (res: IControl[]) => {
                    this.controls = res;
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
        this.registerChangeInControls();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IControl) {
        return item.id;
    }

    registerChangeInControls() {
        this.eventSubscriber = this.eventManager.subscribe('controlListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
