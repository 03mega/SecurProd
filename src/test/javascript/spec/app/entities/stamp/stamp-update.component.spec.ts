/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { StampUpdateComponent } from 'app/entities/stamp/stamp-update.component';
import { StampService } from 'app/entities/stamp/stamp.service';
import { Stamp } from 'app/shared/model/stamp.model';

describe('Component Tests', () => {
    describe('Stamp Management Update Component', () => {
        let comp: StampUpdateComponent;
        let fixture: ComponentFixture<StampUpdateComponent>;
        let service: StampService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [StampUpdateComponent]
            })
                .overrideTemplate(StampUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StampUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StampService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Stamp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stamp = entity;
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
                    const entity = new Stamp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stamp = entity;
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
