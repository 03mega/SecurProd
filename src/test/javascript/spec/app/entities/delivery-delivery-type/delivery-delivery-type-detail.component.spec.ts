/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryDeliveryTypeDetailComponent } from 'app/entities/delivery-delivery-type/delivery-delivery-type-detail.component';
import { DeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';

describe('Component Tests', () => {
    describe('DeliveryDeliveryType Management Detail Component', () => {
        let comp: DeliveryDeliveryTypeDetailComponent;
        let fixture: ComponentFixture<DeliveryDeliveryTypeDetailComponent>;
        const route = ({ data: of({ deliveryDeliveryType: new DeliveryDeliveryType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryDeliveryTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DeliveryDeliveryTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryDeliveryTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.deliveryDeliveryType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
