import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IParcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';
import { IDelivery } from 'app/shared/model/delivery.model';
import { DeliveryService } from 'app/entities/delivery';
import { IParcelControl } from 'app/shared/model/parcel-control.model';
import { ParcelControlService } from 'app/entities/parcel-control';
import { IParcelProducts } from 'app/shared/model/parcel-products.model';
import { ParcelProductsService } from 'app/entities/parcel-products';

@Component({
    selector: 'jhi-parcel-update',
    templateUrl: './parcel-update.component.html'
})
export class ParcelUpdateComponent implements OnInit {
    parcel: IParcel;
    isSaving: boolean;

    deliveries: IDelivery[];

    parcelcontrols: IParcelControl[];

    parcelproducts: IParcelProducts[];
    dateCreatedDp: any;
    dateChangedDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected parcelService: ParcelService,
        protected deliveryService: DeliveryService,
        protected parcelControlService: ParcelControlService,
        protected parcelProductsService: ParcelProductsService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parcel }) => {
            this.parcel = parcel;
        });
        this.deliveryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDelivery[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDelivery[]>) => response.body)
            )
            .subscribe((res: IDelivery[]) => (this.deliveries = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.parcelControlService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParcelControl[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParcelControl[]>) => response.body)
            )
            .subscribe((res: IParcelControl[]) => (this.parcelcontrols = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.parcelProductsService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParcelProducts[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParcelProducts[]>) => response.body)
            )
            .subscribe((res: IParcelProducts[]) => (this.parcelproducts = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parcel.id !== undefined) {
            this.subscribeToSaveResponse(this.parcelService.update(this.parcel));
        } else {
            this.subscribeToSaveResponse(this.parcelService.create(this.parcel));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParcel>>) {
        result.subscribe((res: HttpResponse<IParcel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackParcelControlById(index: number, item: IParcelControl) {
        return item.id;
    }

    trackParcelProductsById(index: number, item: IParcelProducts) {
        return item.id;
    }
}
