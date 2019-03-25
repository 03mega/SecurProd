import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';
import { DeliveryDeliveryTypeProductService } from './delivery-delivery-type-product.service';

@Component({
    selector: 'jhi-delivery-delivery-type-product-update',
    templateUrl: './delivery-delivery-type-product-update.component.html'
})
export class DeliveryDeliveryTypeProductUpdateComponent implements OnInit {
    deliveryDeliveryTypeProduct: IDeliveryDeliveryTypeProduct;
    isSaving: boolean;

    constructor(
        protected deliveryDeliveryTypeProductService: DeliveryDeliveryTypeProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ deliveryDeliveryTypeProduct }) => {
            this.deliveryDeliveryTypeProduct = deliveryDeliveryTypeProduct;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.deliveryDeliveryTypeProduct.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryDeliveryTypeProductService.update(this.deliveryDeliveryTypeProduct));
        } else {
            this.subscribeToSaveResponse(this.deliveryDeliveryTypeProductService.create(this.deliveryDeliveryTypeProduct));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryDeliveryTypeProduct>>) {
        result.subscribe(
            (res: HttpResponse<IDeliveryDeliveryTypeProduct>) => this.onSaveSuccess(),
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
}
