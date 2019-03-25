import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';
import { DeliveryDeliveryTypeService } from './delivery-delivery-type.service';

@Component({
    selector: 'jhi-delivery-delivery-type-delete-dialog',
    templateUrl: './delivery-delivery-type-delete-dialog.component.html'
})
export class DeliveryDeliveryTypeDeleteDialogComponent {
    deliveryDeliveryType: IDeliveryDeliveryType;

    constructor(
        protected deliveryDeliveryTypeService: DeliveryDeliveryTypeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryDeliveryTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deliveryDeliveryTypeListModification',
                content: 'Deleted an deliveryDeliveryType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-delivery-type-delete-popup',
    template: ''
})
export class DeliveryDeliveryTypeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryDeliveryType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeliveryDeliveryTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.deliveryDeliveryType = deliveryDeliveryType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/delivery-delivery-type', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/delivery-delivery-type', { outlets: { popup: null } }]);
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
