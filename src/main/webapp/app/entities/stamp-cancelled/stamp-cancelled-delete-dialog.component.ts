import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStampCancelled } from 'app/shared/model/stamp-cancelled.model';
import { StampCancelledService } from './stamp-cancelled.service';

@Component({
    selector: 'jhi-stamp-cancelled-delete-dialog',
    templateUrl: './stamp-cancelled-delete-dialog.component.html'
})
export class StampCancelledDeleteDialogComponent {
    stampCancelled: IStampCancelled;

    constructor(
        protected stampCancelledService: StampCancelledService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stampCancelledService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stampCancelledListModification',
                content: 'Deleted an stampCancelled'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stamp-cancelled-delete-popup',
    template: ''
})
export class StampCancelledDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stampCancelled }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StampCancelledDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stampCancelled = stampCancelled;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/stamp-cancelled', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/stamp-cancelled', { outlets: { popup: null } }]);
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
