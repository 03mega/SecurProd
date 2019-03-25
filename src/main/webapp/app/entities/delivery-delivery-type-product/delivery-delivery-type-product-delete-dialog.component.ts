import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';
import { DeliveryDeliveryTypeProductService } from './delivery-delivery-type-product.service';

@Component({
    selector: 'jhi-delivery-delivery-type-product-delete-dialog',
    templateUrl: './delivery-delivery-type-product-delete-dialog.component.html'
})
export class DeliveryDeliveryTypeProductDeleteDialogComponent {
    deliveryDeliveryTypeProduct: IDeliveryDeliveryTypeProduct;

    constructor(
        protected deliveryDeliveryTypeProductService: DeliveryDeliveryTypeProductService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryDeliveryTypeProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deliveryDeliveryTypeProductListModification',
                content: 'Deleted an deliveryDeliveryTypeProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-delivery-type-product-delete-popup',
    template: ''
})
export class DeliveryDeliveryTypeProductDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryDeliveryTypeProduct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeliveryDeliveryTypeProductDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.deliveryDeliveryTypeProduct = deliveryDeliveryTypeProduct;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/delivery-delivery-type-product', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/delivery-delivery-type-product', { outlets: { popup: null } }]);
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
