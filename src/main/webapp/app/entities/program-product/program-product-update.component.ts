import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IProgramProduct } from 'app/shared/model/program-product.model';
import { ProgramProductService } from './program-product.service';

@Component({
    selector: 'jhi-program-product-update',
    templateUrl: './program-product-update.component.html'
})
export class ProgramProductUpdateComponent implements OnInit {
    programProduct: IProgramProduct;
    isSaving: boolean;

    constructor(protected programProductService: ProgramProductService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ programProduct }) => {
            this.programProduct = programProduct;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.programProduct.id !== undefined) {
            this.subscribeToSaveResponse(this.programProductService.update(this.programProduct));
        } else {
            this.subscribeToSaveResponse(this.programProductService.create(this.programProduct));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgramProduct>>) {
        result.subscribe((res: HttpResponse<IProgramProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
