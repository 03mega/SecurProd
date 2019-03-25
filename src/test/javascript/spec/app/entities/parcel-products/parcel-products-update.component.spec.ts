/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelProductsUpdateComponent } from 'app/entities/parcel-products/parcel-products-update.component';
import { ParcelProductsService } from 'app/entities/parcel-products/parcel-products.service';
import { ParcelProducts } from 'app/shared/model/parcel-products.model';

describe('Component Tests', () => {
    describe('ParcelProducts Management Update Component', () => {
        let comp: ParcelProductsUpdateComponent;
        let fixture: ComponentFixture<ParcelProductsUpdateComponent>;
        let service: ParcelProductsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelProductsUpdateComponent]
            })
                .overrideTemplate(ParcelProductsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParcelProductsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcelProductsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ParcelProducts(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parcelProducts = entity;
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
                    const entity = new ParcelProducts();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.parcelProducts = entity;
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
