import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParcelControl } from 'app/shared/model/parcel-control.model';
import { ParcelControlService } from './parcel-control.service';

@Component({
    selector: 'jhi-parcel-control-delete-dialog',
    templateUrl: './parcel-control-delete-dialog.component.html'
})
export class ParcelControlDeleteDialogComponent {
    parcelControl: IParcelControl;

    constructor(
        protected parcelControlService: ParcelControlService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parcelControlService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parcelControlListModification',
                content: 'Deleted an parcelControl'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parcel-control-delete-popup',
    template: ''
})
export class ParcelControlDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parcelControl }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParcelControlDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parcelControl = parcelControl;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/parcel-control', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/parcel-control', { outlets: { popup: null } }]);
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
