import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProgramProduct } from 'app/shared/model/program-product.model';
import { ProgramProductService } from './program-product.service';

@Component({
    selector: 'jhi-program-product-delete-dialog',
    templateUrl: './program-product-delete-dialog.component.html'
})
export class ProgramProductDeleteDialogComponent {
    programProduct: IProgramProduct;

    constructor(
        protected programProductService: ProgramProductService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.programProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'programProductListModification',
                content: 'Deleted an programProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-program-product-delete-popup',
    template: ''
})
export class ProgramProductDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ programProduct }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProgramProductDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.programProduct = programProduct;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/program-product', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/program-product', { outlets: { popup: null } }]);
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
