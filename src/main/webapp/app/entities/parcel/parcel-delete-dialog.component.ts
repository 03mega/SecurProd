import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';

@Component({
    selector: 'jhi-parcel-delete-dialog',
    templateUrl: './parcel-delete-dialog.component.html'
})
export class ParcelDeleteDialogComponent {
    parcel: IParcel;

    constructor(protected parcelService: ParcelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parcelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parcelListModification',
                content: 'Deleted an parcel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parcel-delete-popup',
    template: ''
})
export class ParcelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parcel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParcelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.parcel = parcel;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/parcel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/parcel', { outlets: { popup: null } }]);
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
