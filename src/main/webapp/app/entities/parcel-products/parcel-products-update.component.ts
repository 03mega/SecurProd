import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IParcelProducts } from 'app/shared/model/parcel-products.model';
import { ParcelProductsService } from './parcel-products.service';

@Component({
    selector: 'jhi-parcel-products-update',
    templateUrl: './parcel-products-update.component.html'
})
export class ParcelProductsUpdateComponent implements OnInit {
    parcelProducts: IParcelProducts;
    isSaving: boolean;

    constructor(protected parcelProductsService: ParcelProductsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parcelProducts }) => {
            this.parcelProducts = parcelProducts;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parcelProducts.id !== undefined) {
            this.subscribeToSaveResponse(this.parcelProductsService.update(this.parcelProducts));
        } else {
            this.subscribeToSaveResponse(this.parcelProductsService.create(this.parcelProducts));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParcelProducts>>) {
        result.subscribe((res: HttpResponse<IParcelProducts>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
