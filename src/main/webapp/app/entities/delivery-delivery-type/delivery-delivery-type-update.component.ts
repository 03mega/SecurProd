import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';
import { DeliveryDeliveryTypeService } from './delivery-delivery-type.service';
import { IDelivery } from 'app/shared/model/delivery.model';
import { DeliveryService } from 'app/entities/delivery';
import { IDeliveryType } from 'app/shared/model/delivery-type.model';
import { DeliveryTypeService } from 'app/entities/delivery-type';

@Component({
    selector: 'jhi-delivery-delivery-type-update',
    templateUrl: './delivery-delivery-type-update.component.html'
})
export class DeliveryDeliveryTypeUpdateComponent implements OnInit {
    deliveryDeliveryType: IDeliveryDeliveryType;
    isSaving: boolean;

    deliveries: IDelivery[];

    deliverytypes: IDeliveryType[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected deliveryDeliveryTypeService: DeliveryDeliveryTypeService,
        protected deliveryService: DeliveryService,
        protected deliveryTypeService: DeliveryTypeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ deliveryDeliveryType }) => {
            this.deliveryDeliveryType = deliveryDeliveryType;
        });
        this.deliveryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDelivery[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDelivery[]>) => response.body)
            )
            .subscribe((res: IDelivery[]) => (this.deliveries = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.deliveryTypeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDeliveryType[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDeliveryType[]>) => response.body)
            )
            .subscribe((res: IDeliveryType[]) => (this.deliverytypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.deliveryDeliveryType.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryDeliveryTypeService.update(this.deliveryDeliveryType));
        } else {
            this.subscribeToSaveResponse(this.deliveryDeliveryTypeService.create(this.deliveryDeliveryType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryDeliveryType>>) {
        result.subscribe(
            (res: HttpResponse<IDeliveryDeliveryType>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackDeliveryById(index: number, item: IDelivery) {
        return item.id;
    }

    trackDeliveryTypeById(index: number, item: IDeliveryType) {
        return item.id;
    }
}
