import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductDelivery } from 'app/shared/model/product-delivery.model';

@Component({
    selector: 'jhi-product-delivery-detail',
    templateUrl: './product-delivery-detail.component.html'
})
export class ProductDeliveryDetailComponent implements OnInit {
    productDelivery: IProductDelivery;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productDelivery }) => {
            this.productDelivery = productDelivery;
        });
    }

    previousState() {
        window.history.back();
    }
}
