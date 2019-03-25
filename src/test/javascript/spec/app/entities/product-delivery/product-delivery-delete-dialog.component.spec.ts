/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SecurProdTestModule } from '../../../test.module';
import { ProductDeliveryDeleteDialogComponent } from 'app/entities/product-delivery/product-delivery-delete-dialog.component';
import { ProductDeliveryService } from 'app/entities/product-delivery/product-delivery.service';

describe('Component Tests', () => {
    describe('ProductDelivery Management Delete Component', () => {
        let comp: ProductDeliveryDeleteDialogComponent;
        let fixture: ComponentFixture<ProductDeliveryDeleteDialogComponent>;
        let service: ProductDeliveryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProductDeliveryDeleteDialogComponent]
            })
                .overrideTemplate(ProductDeliveryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductDeliveryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductDeliveryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
