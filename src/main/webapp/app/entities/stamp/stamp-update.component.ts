import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStamp } from 'app/shared/model/stamp.model';
import { StampService } from './stamp.service';
import { IParcel } from 'app/shared/model/parcel.model';
import { ParcelService } from 'app/entities/parcel';

@Component({
    selector: 'jhi-stamp-update',
    templateUrl: './stamp-update.component.html'
})
export class StampUpdateComponent implements OnInit {
    stamp: IStamp;
    isSaving: boolean;

    parcels: IParcel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected stampService: StampService,
        protected parcelService: ParcelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stamp }) => {
            this.stamp = stamp;
        });
        this.parcelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParcel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParcel[]>) => response.body)
            )
            .subscribe((res: IParcel[]) => (this.parcels = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stamp.id !== undefined) {
            this.subscribeToSaveResponse(this.stampService.update(this.stamp));
        } else {
            this.subscribeToSaveResponse(this.stampService.create(this.stamp));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStamp>>) {
        result.subscribe((res: HttpResponse<IStamp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackParcelById(index: number, item: IParcel) {
        return item.id;
    }
}
