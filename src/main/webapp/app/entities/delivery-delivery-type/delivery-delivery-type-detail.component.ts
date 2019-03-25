import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';

@Component({
    selector: 'jhi-delivery-delivery-type-detail',
    templateUrl: './delivery-delivery-type-detail.component.html'
})
export class DeliveryDeliveryTypeDetailComponent implements OnInit {
    deliveryDeliveryType: IDeliveryDeliveryType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryDeliveryType }) => {
            this.deliveryDeliveryType = deliveryDeliveryType;
        });
    }

    previousState() {
        window.history.back();
    }
}
