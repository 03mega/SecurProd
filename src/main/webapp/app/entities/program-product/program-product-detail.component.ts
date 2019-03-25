import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProgramProduct } from 'app/shared/model/program-product.model';

@Component({
    selector: 'jhi-program-product-detail',
    templateUrl: './program-product-detail.component.html'
})
export class ProgramProductDetailComponent implements OnInit {
    programProduct: IProgramProduct;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ programProduct }) => {
            this.programProduct = programProduct;
        });
    }

    previousState() {
        window.history.back();
    }
}
