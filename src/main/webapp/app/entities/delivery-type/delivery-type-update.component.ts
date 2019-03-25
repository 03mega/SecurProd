import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDeliveryType } from 'app/shared/model/delivery-type.model';
import { DeliveryTypeService } from './delivery-type.service';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';
import { DeliveryDeliveryTypeProductService } from 'app/entities/delivery-delivery-type-product';

@Component({
    selector: 'jhi-delivery-type-update',
    templateUrl: './delivery-type-update.component.html'
})
export class DeliveryTypeUpdateComponent implements OnInit {
    deliveryType: IDeliveryType;
    isSaving: boolean;

    deliverydeliverytypeproducts: IDeliveryDeliveryTypeProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected deliveryTypeService: DeliveryTypeService,
        protected deliveryDeliveryTypeProductService: DeliveryDeliveryTypeProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ deliveryType }) => {
            this.deliveryType = deliveryType;
        });
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
        if (this.deliveryType.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryTypeService.update(this.deliveryType));
        } else {
            this.subscribeToSaveResponse(this.deliveryTypeService.create(this.deliveryType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryType>>) {
        result.subscribe((res: HttpResponse<IDeliveryType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDeliveryDeliveryTypeProductById(index: number, item: IDeliveryDeliveryTypeProduct) {
        return item.id;
    }
}
