import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IParcelControl } from 'app/shared/model/parcel-control.model';
import { ParcelControlService } from './parcel-control.service';
import { IControl } from 'app/shared/model/control.model';
import { ControlService } from 'app/entities/control';

@Component({
    selector: 'jhi-parcel-control-update',
    templateUrl: './parcel-control-update.component.html'
})
export class ParcelControlUpdateComponent implements OnInit {
    parcelControl: IParcelControl;
    isSaving: boolean;

    controls: IControl[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected parcelControlService: ParcelControlService,
        protected controlService: ControlService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parcelControl }) => {
            this.parcelControl = parcelControl;
        });
        this.controlService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IControl[]>) => mayBeOk.ok),
                map((response: HttpResponse<IControl[]>) => response.body)
            )
            .subscribe((res: IControl[]) => (this.controls = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parcelControl.id !== undefined) {
            this.subscribeToSaveResponse(this.parcelControlService.update(this.parcelControl));
        } else {
            this.subscribeToSaveResponse(this.parcelControlService.create(this.parcelControl));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParcelControl>>) {
        result.subscribe((res: HttpResponse<IParcelControl>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackControlById(index: number, item: IControl) {
        return item.id;
    }
}
