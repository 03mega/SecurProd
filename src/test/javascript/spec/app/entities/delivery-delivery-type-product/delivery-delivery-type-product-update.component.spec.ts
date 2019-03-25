/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryDeliveryTypeProductUpdateComponent } from 'app/entities/delivery-delivery-type-product/delivery-delivery-type-product-update.component';
import { DeliveryDeliveryTypeProductService } from 'app/entities/delivery-delivery-type-product/delivery-delivery-type-product.service';
import { DeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

describe('Component Tests', () => {
    describe('DeliveryDeliveryTypeProduct Management Update Component', () => {
        let comp: DeliveryDeliveryTypeProductUpdateComponent;
        let fixture: ComponentFixture<DeliveryDeliveryTypeProductUpdateComponent>;
        let service: DeliveryDeliveryTypeProductService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryDeliveryTypeProductUpdateComponent]
            })
                .overrideTemplate(DeliveryDeliveryTypeProductUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryDeliveryTypeProductUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryDeliveryTypeProductService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DeliveryDeliveryTypeProduct(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.deliveryDeliveryTypeProduct = entity;
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
                    const entity = new DeliveryDeliveryTypeProduct();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.deliveryDeliveryTypeProduct = entity;
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
