import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

@Component({
    selector: 'jhi-delivery-delivery-type-product-detail',
    templateUrl: './delivery-delivery-type-product-detail.component.html'
})
export class DeliveryDeliveryTypeProductDetailComponent implements OnInit {
    deliveryDeliveryTypeProduct: IDeliveryDeliveryTypeProduct;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryDeliveryTypeProduct }) => {
            this.deliveryDeliveryTypeProduct = deliveryDeliveryTypeProduct;
        });
    }

    previousState() {
        window.history.back();
    }
}
