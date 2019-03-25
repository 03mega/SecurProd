/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryDeliveryTypeProductComponent } from 'app/entities/delivery-delivery-type-product/delivery-delivery-type-product.component';
import { DeliveryDeliveryTypeProductService } from 'app/entities/delivery-delivery-type-product/delivery-delivery-type-product.service';
import { DeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

describe('Component Tests', () => {
    describe('DeliveryDeliveryTypeProduct Management Component', () => {
        let comp: DeliveryDeliveryTypeProductComponent;
        let fixture: ComponentFixture<DeliveryDeliveryTypeProductComponent>;
        let service: DeliveryDeliveryTypeProductService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryDeliveryTypeProductComponent],
                providers: []
            })
                .overrideTemplate(DeliveryDeliveryTypeProductComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryDeliveryTypeProductComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryDeliveryTypeProductService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DeliveryDeliveryTypeProduct(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.deliveryDeliveryTypeProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
