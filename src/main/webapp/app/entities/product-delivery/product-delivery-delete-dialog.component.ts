import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductDelivery } from 'app/shared/model/product-delivery.model';
import { ProductDeliveryService } from './product-delivery.service';

@Component({
    selector: 'jhi-product-delivery-delete-dialog',
    templateUrl: './product-delivery-delete-dialog.component.html'
})
export class ProductDeliveryDeleteDialogComponent {
    productDelivery: IProductDelivery;

    constructor(
        protected productDeliveryService: ProductDeliveryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productDeliveryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productDeliveryListModification',
                content: 'Deleted an productDelivery'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-delivery-delete-popup',
    template: ''
})
export class ProductDeliveryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productDelivery }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductDeliveryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productDelivery = productDelivery;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/product-delivery', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/product-delivery', { outlets: { popup: null } }]);
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
