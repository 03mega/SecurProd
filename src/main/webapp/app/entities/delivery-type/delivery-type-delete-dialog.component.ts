import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryType } from 'app/shared/model/delivery-type.model';
import { DeliveryTypeService } from './delivery-type.service';

@Component({
    selector: 'jhi-delivery-type-delete-dialog',
    templateUrl: './delivery-type-delete-dialog.component.html'
})
export class DeliveryTypeDeleteDialogComponent {
    deliveryType: IDeliveryType;

    constructor(
        protected deliveryTypeService: DeliveryTypeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deliveryTypeListModification',
                content: 'Deleted an deliveryType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-type-delete-popup',
    template: ''
})
export class DeliveryTypeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeliveryTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.deliveryType = deliveryType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/delivery-type', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/delivery-type', { outlets: { popup: null } }]);
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
