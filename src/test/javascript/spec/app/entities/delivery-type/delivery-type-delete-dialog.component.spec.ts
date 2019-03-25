/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryTypeDeleteDialogComponent } from 'app/entities/delivery-type/delivery-type-delete-dialog.component';
import { DeliveryTypeService } from 'app/entities/delivery-type/delivery-type.service';

describe('Component Tests', () => {
    describe('DeliveryType Management Delete Component', () => {
        let comp: DeliveryTypeDeleteDialogComponent;
        let fixture: ComponentFixture<DeliveryTypeDeleteDialogComponent>;
        let service: DeliveryTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryTypeDeleteDialogComponent]
            })
                .overrideTemplate(DeliveryTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryTypeService);
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
