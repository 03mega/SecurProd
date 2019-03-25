import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IControl } from 'app/shared/model/control.model';

@Component({
    selector: 'jhi-control-detail',
    templateUrl: './control-detail.component.html'
})
export class ControlDetailComponent implements OnInit {
    control: IControl;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ control }) => {
            this.control = control;
        });
    }

    previousState() {
        window.history.back();
    }
}
