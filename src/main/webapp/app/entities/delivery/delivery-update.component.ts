import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDelivery } from 'app/shared/model/delivery.model';
import { DeliveryService } from './delivery.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { IProductDelivery } from 'app/shared/model/product-delivery.model';
import { ProductDeliveryService } from 'app/entities/product-delivery';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';
import { DeliveryDeliveryTypeProductService } from 'app/entities/delivery-delivery-type-product';

@Component({
    selector: 'jhi-delivery-update',
    templateUrl: './delivery-update.component.html'
})
export class DeliveryUpdateComponent implements OnInit {
    delivery: IDelivery;
    isSaving: boolean;

    clients: IClient[];

    productdeliveries: IProductDelivery[];

    deliverydeliverytypeproducts: IDeliveryDeliveryTypeProduct[];
    deliveryDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected deliveryService: DeliveryService,
        protected clientService: ClientService,
        protected productDeliveryService: ProductDeliveryService,
        protected deliveryDeliveryTypeProductService: DeliveryDeliveryTypeProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ delivery }) => {
            this.delivery = delivery;
        });
        this.clientService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClient[]>) => response.body)
            )
            .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.productDeliveryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProductDelivery[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductDelivery[]>) => response.body)
            )
            .subscribe((res: IProductDelivery[]) => (this.productdeliveries = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.deliveryDeliveryTypeProductService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => response.body)
            )
            .subscribe(
                (res: IDeliveryDeliveryTypeProduct[]) => (this.deliverydeliverytypeproducts = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.delivery.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryService.update(this.delivery));
        } else {
            this.subscribeToSaveResponse(this.deliveryService.create(this.delivery));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDelivery>>) {
        result.subscribe((res: HttpResponse<IDelivery>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackClientById(index: number, item: IClient) {
        return item.id;
    }

    trackProductDeliveryById(index: number, item: IProductDelivery) {
        return item.id;
    }

    trackDeliveryDeliveryTypeProductById(index: number, item: IDeliveryDeliveryTypeProduct) {
        return item.id;
    }
}
