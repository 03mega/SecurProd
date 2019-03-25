/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelDeleteDialogComponent } from 'app/entities/parcel/parcel-delete-dialog.component';
import { ParcelService } from 'app/entities/parcel/parcel.service';

describe('Component Tests', () => {
    describe('Parcel Management Delete Component', () => {
        let comp: ParcelDeleteDialogComponent;
        let fixture: ComponentFixture<ParcelDeleteDialogComponent>;
        let service: ParcelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelDeleteDialogComponent]
            })
                .overrideTemplate(ParcelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParcelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcelService);
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
