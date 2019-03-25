import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStamp } from 'app/shared/model/stamp.model';

@Component({
    selector: 'jhi-stamp-detail',
    templateUrl: './stamp-detail.component.html'
})
export class StampDetailComponent implements OnInit {
    stamp: IStamp;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stamp }) => {
            this.stamp = stamp;
        });
    }

    previousState() {
        window.history.back();
    }
}
