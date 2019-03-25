/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ProductDeliveryDetailComponent } from 'app/entities/product-delivery/product-delivery-detail.component';
import { ProductDelivery } from 'app/shared/model/product-delivery.model';

describe('Component Tests', () => {
    describe('ProductDelivery Management Detail Component', () => {
        let comp: ProductDeliveryDetailComponent;
        let fixture: ComponentFixture<ProductDeliveryDetailComponent>;
        const route = ({ data: of({ productDelivery: new ProductDelivery(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProductDeliveryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductDeliveryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductDeliveryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productDelivery).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
