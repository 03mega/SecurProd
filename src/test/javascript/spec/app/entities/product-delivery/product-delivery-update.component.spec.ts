/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ProductDeliveryUpdateComponent } from 'app/entities/product-delivery/product-delivery-update.component';
import { ProductDeliveryService } from 'app/entities/product-delivery/product-delivery.service';
import { ProductDelivery } from 'app/shared/model/product-delivery.model';

describe('Component Tests', () => {
    describe('ProductDelivery Management Update Component', () => {
        let comp: ProductDeliveryUpdateComponent;
        let fixture: ComponentFixture<ProductDeliveryUpdateComponent>;
        let service: ProductDeliveryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProductDeliveryUpdateComponent]
            })
                .overrideTemplate(ProductDeliveryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductDeliveryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductDeliveryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductDelivery(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productDelivery = entity;
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
                    const entity = new ProductDelivery();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productDelivery = entity;
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
