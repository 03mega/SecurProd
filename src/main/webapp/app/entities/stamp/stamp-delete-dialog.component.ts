import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStamp } from 'app/shared/model/stamp.model';
import { StampService } from './stamp.service';

@Component({
    selector: 'jhi-stamp-delete-dialog',
    templateUrl: './stamp-delete-dialog.component.html'
})
export class StampDeleteDialogComponent {
    stamp: IStamp;

    constructor(protected stampService: StampService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stampService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stampListModification',
                content: 'Deleted an stamp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stamp-delete-popup',
    template: ''
})
export class StampDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stamp }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StampDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.stamp = stamp;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/stamp', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/stamp', { outlets: { popup: null } }]);
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
