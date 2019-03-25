import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IControl } from 'app/shared/model/control.model';
import { ControlService } from './control.service';

@Component({
    selector: 'jhi-control-delete-dialog',
    templateUrl: './control-delete-dialog.component.html'
})
export class ControlDeleteDialogComponent {
    control: IControl;

    constructor(protected controlService: ControlService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.controlService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'controlListModification',
                content: 'Deleted an control'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-control-delete-popup',
    template: ''
})
export class ControlDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ control }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ControlDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.control = control;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/control', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/control', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
