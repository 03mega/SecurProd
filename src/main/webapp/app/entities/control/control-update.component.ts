import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { IControl } from 'app/shared/model/control.model';
import { ControlService } from './control.service';

@Component({
    selector: 'jhi-control-update',
    templateUrl: './control-update.component.html'
})
export class ControlUpdateComponent implements OnInit {
    control: IControl;
    isSaving: boolean;
    controlDateDp: any;

    constructor(protected controlService: ControlService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ control }) => {
            this.control = control;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.control.id !== undefined) {
            this.subscribeToSaveResponse(this.controlService.update(this.control));
        } else {
            this.subscribeToSaveResponse(this.controlService.create(this.control));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IControl>>) {
        result.subscribe((res: HttpResponse<IControl>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
