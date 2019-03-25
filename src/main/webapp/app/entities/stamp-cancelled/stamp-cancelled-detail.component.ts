import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStampCancelled } from 'app/shared/model/stamp-cancelled.model';

@Component({
    selector: 'jhi-stamp-cancelled-detail',
    templateUrl: './stamp-cancelled-detail.component.html'
})
export class StampCancelledDetailComponent implements OnInit {
    stampCancelled: IStampCancelled;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stampCancelled }) => {
            this.stampCancelled = stampCancelled;
        });
    }

    previousState() {
        window.history.back();
    }
}
