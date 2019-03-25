/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelControlUpdateComponent } from 'app/entities/parcel-control/parcel-control-update.component';
import { ParcelControlService } from 'app/entities/parcel-control/parcel-control.service';
import { ParcelControl } from 'app/shared/model/parcel-control.model';

describe('Component Tests', () => {
    describe('ParcelControl Management Update Component', () => {
        let comp: ParcelControlUpdateComponent;
        let fixture: ComponentFixture<ParcelControlUpdateComponent>;
        let service: ParcelControlService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelControlUpdateComponent]
            })
                .overrideTemplate(ParcelControlUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParcelControlUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcelControlService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ParcelControl(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parcelControl = entity;
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
                    const entity = new ParcelControl();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parcelControl = entity;
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
