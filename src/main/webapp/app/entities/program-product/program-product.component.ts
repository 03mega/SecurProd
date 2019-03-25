import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProgramProduct } from 'app/shared/model/program-product.model';
import { AccountService } from 'app/core';
import { ProgramProductService } from './program-product.service';

@Component({
    selector: 'jhi-program-product',
    templateUrl: './program-product.component.html'
})
export class ProgramProductComponent implements OnInit, OnDestroy {
    programProducts: IProgramProduct[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected programProductService: ProgramProductService,
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
            this.programProductService
                .search({
                    query: this.currentSearch
                })
                .pipe(
                    filter((res: HttpResponse<IProgramProduct[]>) => res.ok),
                    map((res: HttpResponse<IProgramProduct[]>) => res.body)
                )
                .subscribe((res: IProgramProduct[]) => (this.programProducts = res), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.programProductService
            .query()
            .pipe(
                filter((res: HttpResponse<IProgramProduct[]>) => res.ok),
                map((res: HttpResponse<IProgramProduct[]>) => res.body)
            )
            .subscribe(
                (res: IProgramProduct[]) => {
                    this.programProducts = res;
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
        this.registerChangeInProgramProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProgramProduct) {
        return item.id;
    }

    registerChangeInProgramProducts() {
        this.eventSubscriber = this.eventManager.subscribe('programProductListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
