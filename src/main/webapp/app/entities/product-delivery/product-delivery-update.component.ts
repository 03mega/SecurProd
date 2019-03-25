import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProductDelivery } from 'app/shared/model/product-delivery.model';
import { ProductDeliveryService } from './product-delivery.service';

@Component({
    selector: 'jhi-product-delivery-update',
    templateUrl: './product-delivery-update.component.html'
})
export class ProductDeliveryUpdateComponent implements OnInit {
    productDelivery: IProductDelivery;
    isSaving: boolean;

    constructor(protected productDeliveryService: ProductDeliveryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productDelivery }) => {
            this.productDelivery = productDelivery;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.productDelivery.id !== undefined) {
            this.subscribeToSaveResponse(this.productDeliveryService.update(this.productDelivery));
        } else {
            this.subscribeToSaveResponse(this.productDeliveryService.create(this.productDelivery));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductDelivery>>) {
        result.subscribe((res: HttpResponse<IProductDelivery>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
