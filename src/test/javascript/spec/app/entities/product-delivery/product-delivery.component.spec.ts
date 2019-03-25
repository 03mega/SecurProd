/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SecurProdTestModule } from '../../../test.module';
import { ProductDeliveryComponent } from 'app/entities/product-delivery/product-delivery.component';
import { ProductDeliveryService } from 'app/entities/product-delivery/product-delivery.service';
import { ProductDelivery } from 'app/shared/model/product-delivery.model';

describe('Component Tests', () => {
    describe('ProductDelivery Management Component', () => {
        let comp: ProductDeliveryComponent;
        let fixture: ComponentFixture<ProductDeliveryComponent>;
        let service: ProductDeliveryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProductDeliveryComponent],
                providers: []
            })
                .overrideTemplate(ProductDeliveryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductDeliveryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductDeliveryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductDelivery(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.productDeliveries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
