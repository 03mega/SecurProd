/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryDeliveryTypeProductDeleteDialogComponent } from 'app/entities/delivery-delivery-type-product/delivery-delivery-type-product-delete-dialog.component';
import { DeliveryDeliveryTypeProductService } from 'app/entities/delivery-delivery-type-product/delivery-delivery-type-product.service';

describe('Component Tests', () => {
    describe('DeliveryDeliveryTypeProduct Management Delete Component', () => {
        let comp: DeliveryDeliveryTypeProductDeleteDialogComponent;
        let fixture: ComponentFixture<DeliveryDeliveryTypeProductDeleteDialogComponent>;
        let service: DeliveryDeliveryTypeProductService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryDeliveryTypeProductDeleteDialogComponent]
            })
                .overrideTemplate(DeliveryDeliveryTypeProductDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryDeliveryTypeProductDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryDeliveryTypeProductService);
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
