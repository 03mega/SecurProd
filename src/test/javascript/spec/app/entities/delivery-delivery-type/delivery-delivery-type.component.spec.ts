/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryDeliveryTypeComponent } from 'app/entities/delivery-delivery-type/delivery-delivery-type.component';
import { DeliveryDeliveryTypeService } from 'app/entities/delivery-delivery-type/delivery-delivery-type.service';
import { DeliveryDeliveryType } from 'app/shared/model/delivery-delivery-type.model';

describe('Component Tests', () => {
    describe('DeliveryDeliveryType Management Component', () => {
        let comp: DeliveryDeliveryTypeComponent;
        let fixture: ComponentFixture<DeliveryDeliveryTypeComponent>;
        let service: DeliveryDeliveryTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryDeliveryTypeComponent],
                providers: []
            })
                .overrideTemplate(DeliveryDeliveryTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryDeliveryTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryDeliveryTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DeliveryDeliveryType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.deliveryDeliveryTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
