/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryDeliveryTypeProductDetailComponent } from 'app/entities/delivery-delivery-type-product/delivery-delivery-type-product-detail.component';
import { DeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';

describe('Component Tests', () => {
    describe('DeliveryDeliveryTypeProduct Management Detail Component', () => {
        let comp: DeliveryDeliveryTypeProductDetailComponent;
        let fixture: ComponentFixture<DeliveryDeliveryTypeProductDetailComponent>;
        const route = ({ data: of({ deliveryDeliveryTypeProduct: new DeliveryDeliveryTypeProduct(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryDeliveryTypeProductDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DeliveryDeliveryTypeProductDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryDeliveryTypeProductDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.deliveryDeliveryTypeProduct).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
