/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelUpdateComponent } from 'app/entities/parcel/parcel-update.component';
import { ParcelService } from 'app/entities/parcel/parcel.service';
import { Parcel } from 'app/shared/model/parcel.model';

describe('Component Tests', () => {
    describe('Parcel Management Update Component', () => {
        let comp: ParcelUpdateComponent;
        let fixture: ComponentFixture<ParcelUpdateComponent>;
        let service: ParcelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelUpdateComponent]
            })
                .overrideTemplate(ParcelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParcelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Parcel(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parcel = entity;
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
                    const entity = new Parcel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parcel = entity;
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
