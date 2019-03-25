/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SecurProdTestModule } from '../../../test.module';
import { DeliveryTypeComponent } from 'app/entities/delivery-type/delivery-type.component';
import { DeliveryTypeService } from 'app/entities/delivery-type/delivery-type.service';
import { DeliveryType } from 'app/shared/model/delivery-type.model';

describe('Component Tests', () => {
    describe('DeliveryType Management Component', () => {
        let comp: DeliveryTypeComponent;
        let fixture: ComponentFixture<DeliveryTypeComponent>;
        let service: DeliveryTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [DeliveryTypeComponent],
                providers: []
            })
                .overrideTemplate(DeliveryTypeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryTypeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DeliveryType(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.deliveryTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
