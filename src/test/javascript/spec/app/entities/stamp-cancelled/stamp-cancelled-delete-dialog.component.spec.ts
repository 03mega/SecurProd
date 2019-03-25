/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SecurProdTestModule } from '../../../test.module';
import { StampCancelledDeleteDialogComponent } from 'app/entities/stamp-cancelled/stamp-cancelled-delete-dialog.component';
import { StampCancelledService } from 'app/entities/stamp-cancelled/stamp-cancelled.service';

describe('Component Tests', () => {
    describe('StampCancelled Management Delete Component', () => {
        let comp: StampCancelledDeleteDialogComponent;
        let fixture: ComponentFixture<StampCancelledDeleteDialogComponent>;
        let service: StampCancelledService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [StampCancelledDeleteDialogComponent]
            })
                .overrideTemplate(StampCancelledDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StampCancelledDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StampCancelledService);
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
