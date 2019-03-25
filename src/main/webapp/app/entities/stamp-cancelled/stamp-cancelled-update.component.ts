import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStampCancelled } from 'app/shared/model/stamp-cancelled.model';
import { StampCancelledService } from './stamp-cancelled.service';
import { IStamp } from 'app/shared/model/stamp.model';
import { StampService } from 'app/entities/stamp';

@Component({
    selector: 'jhi-stamp-cancelled-update',
    templateUrl: './stamp-cancelled-update.component.html'
})
export class StampCancelledUpdateComponent implements OnInit {
    stampCancelled: IStampCancelled;
    isSaving: boolean;

    stamps: IStamp[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected stampCancelledService: StampCancelledService,
        protected stampService: StampService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stampCancelled }) => {
            this.stampCancelled = stampCancelled;
        });
        this.stampService
            .query({ filter: 'stampcancelled-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IStamp[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStamp[]>) => response.body)
            )
            .subscribe(
                (res: IStamp[]) => {
                    if (!this.stampCancelled.stamp || !this.stampCancelled.stamp.id) {
                        this.stamps = res;
                    } else {
                        this.stampService
                            .find(this.stampCancelled.stamp.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IStamp>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IStamp>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IStamp) => (this.stamps = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stampCancelled.id !== undefined) {
            this.subscribeToSaveResponse(this.stampCancelledService.update(this.stampCancelled));
        } else {
            this.subscribeToSaveResponse(this.stampCancelledService.create(this.stampCancelled));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStampCancelled>>) {
        result.subscribe((res: HttpResponse<IStampCancelled>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStampById(index: number, item: IStamp) {
        return item.id;
    }
}
