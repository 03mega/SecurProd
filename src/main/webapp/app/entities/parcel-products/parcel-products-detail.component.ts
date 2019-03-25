import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParcelProducts } from 'app/shared/model/parcel-products.model';

@Component({
    selector: 'jhi-parcel-products-detail',
    templateUrl: './parcel-products-detail.component.html'
})
export class ParcelProductsDetailComponent implements OnInit {
    parcelProducts: IParcelProducts;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parcelProducts }) => {
            this.parcelProducts = parcelProducts;
        });
    }

    previousState() {
        window.history.back();
    }
}
