/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelProductsDetailComponent } from 'app/entities/parcel-products/parcel-products-detail.component';
import { ParcelProducts } from 'app/shared/model/parcel-products.model';

describe('Component Tests', () => {
    describe('ParcelProducts Management Detail Component', () => {
        let comp: ParcelProductsDetailComponent;
        let fixture: ComponentFixture<ParcelProductsDetailComponent>;
        const route = ({ data: of({ parcelProducts: new ParcelProducts(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelProductsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParcelProductsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParcelProductsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parcelProducts).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
