/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelProductsComponent } from 'app/entities/parcel-products/parcel-products.component';
import { ParcelProductsService } from 'app/entities/parcel-products/parcel-products.service';
import { ParcelProducts } from 'app/shared/model/parcel-products.model';

describe('Component Tests', () => {
    describe('ParcelProducts Management Component', () => {
        let comp: ParcelProductsComponent;
        let fixture: ComponentFixture<ParcelProductsComponent>;
        let service: ParcelProductsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelProductsComponent],
                providers: []
            })
                .overrideTemplate(ParcelProductsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParcelProductsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParcelProductsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ParcelProducts(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parcelProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
