/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SecurProdTestModule } from '../../../test.module';
import { ProgramProductDeleteDialogComponent } from 'app/entities/program-product/program-product-delete-dialog.component';
import { ProgramProductService } from 'app/entities/program-product/program-product.service';

describe('Component Tests', () => {
    describe('ProgramProduct Management Delete Component', () => {
        let comp: ProgramProductDeleteDialogComponent;
        let fixture: ComponentFixture<ProgramProductDeleteDialogComponent>;
        let service: ProgramProductService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProgramProductDeleteDialogComponent]
            })
                .overrideTemplate(ProgramProductDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProgramProductDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgramProductService);
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
