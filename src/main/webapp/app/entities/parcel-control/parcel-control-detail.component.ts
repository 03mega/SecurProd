import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParcelControl } from 'app/shared/model/parcel-control.model';

@Component({
    selector: 'jhi-parcel-control-detail',
    templateUrl: './parcel-control-detail.component.html'
})
export class ParcelControlDetailComponent implements OnInit {
    parcelControl: IParcelControl;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parcelControl }) => {
            this.parcelControl = parcelControl;
        });
    }

    previousState() {
        window.history.back();
    }
}
