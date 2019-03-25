/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { StampCancelledUpdateComponent } from 'app/entities/stamp-cancelled/stamp-cancelled-update.component';
import { StampCancelledService } from 'app/entities/stamp-cancelled/stamp-cancelled.service';
import { StampCancelled } from 'app/shared/model/stamp-cancelled.model';

describe('Component Tests', () => {
    describe('StampCancelled Management Update Component', () => {
        let comp: StampCancelledUpdateComponent;
        let fixture: ComponentFixture<StampCancelledUpdateComponent>;
        let service: StampCancelledService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [StampCancelledUpdateComponent]
            })
                .overrideTemplate(StampCancelledUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StampCancelledUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StampCancelledService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StampCancelled(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stampCancelled = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StampCancelled();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stampCancelled = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
