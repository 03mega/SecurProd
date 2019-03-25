import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProgram } from 'app/shared/model/program.model';
import { ProgramService } from './program.service';
import { IUnit } from 'app/shared/model/unit.model';
import { UnitService } from 'app/entities/unit';
import { IProgramProduct } from 'app/shared/model/program-product.model';
import { ProgramProductService } from 'app/entities/program-product';

@Component({
    selector: 'jhi-program-update',
    templateUrl: './program-update.component.html'
})
export class ProgramUpdateComponent implements OnInit {
    program: IProgram;
    isSaving: boolean;

    units: IUnit[];

    programproducts: IProgramProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected programService: ProgramService,
        protected unitService: UnitService,
        protected programProductService: ProgramProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ program }) => {
            this.program = program;
        });
        this.unitService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUnit[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUnit[]>) => response.body)
            )
            .subscribe((res: IUnit[]) => (this.units = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.programProductService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProgramProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProgramProduct[]>) => response.body)
            )
            .subscribe((res: IProgramProduct[]) => (this.programproducts = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.program.id !== undefined) {
            this.subscribeToSaveResponse(this.programService.update(this.program));
        } else {
            this.subscribeToSaveResponse(this.programService.create(this.program));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgram>>) {
        result.subscribe((res: HttpResponse<IProgram>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUnitById(index: number, item: IUnit) {
        return item.id;
    }

    trackProgramProductById(index: number, item: IProgramProduct) {
        return item.id;
    }
}
