import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParcelProducts } from 'app/shared/model/parcel-products.model';
import { ParcelProductsService } from './parcel-products.service';

@Component({
    selector: 'jhi-parcel-products-delete-dialog',
    templateUrl: './parcel-products-delete-dialog.component.html'
})
export class ParcelProductsDeleteDialogComponent {
    parcelProducts: IParcelProducts;

    constructor(
        protected parcelProductsService: ParcelProductsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parcelProductsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parcelProductsListModification',
                content: 'Deleted an parcelProducts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parcel-products-delete-popup',
    template: ''
})
export class ParcelProductsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parcelProducts }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParcelProductsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parcelProducts = parcelProducts;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/parcel-products', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/parcel-products', { outlets: { popup: null } }]);
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
