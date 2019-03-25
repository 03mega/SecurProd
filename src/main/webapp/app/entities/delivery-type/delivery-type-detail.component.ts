import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryType } from 'app/shared/model/delivery-type.model';

@Component({
    selector: 'jhi-delivery-type-detail',
    templateUrl: './delivery-type-detail.component.html'
})
export class DeliveryTypeDetailComponent implements OnInit {
    deliveryType: IDeliveryType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryType }) => {
            this.deliveryType = deliveryType;
        });
    }

    previousState() {
        window.history.back();
    }
}
