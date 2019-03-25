import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParcel } from 'app/shared/model/parcel.model';

@Component({
    selector: 'jhi-parcel-detail',
    templateUrl: './parcel-detail.component.html'
})
export class ParcelDetailComponent implements OnInit {
    parcel: IParcel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parcel }) => {
            this.parcel = parcel;
        });
    }

    previousState() {
        window.history.back();
    }
}
