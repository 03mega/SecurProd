/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ProgramProductDetailComponent } from 'app/entities/program-product/program-product-detail.component';
import { ProgramProduct } from 'app/shared/model/program-product.model';

describe('Component Tests', () => {
    describe('ProgramProduct Management Detail Component', () => {
        let comp: ProgramProductDetailComponent;
        let fixture: ComponentFixture<ProgramProductDetailComponent>;
        const route = ({ data: of({ programProduct: new ProgramProduct(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProgramProductDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProgramProductDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProgramProductDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.programProduct).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
