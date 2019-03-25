/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SecurProdTestModule } from '../../../test.module';
import { ProgramProductComponent } from 'app/entities/program-product/program-product.component';
import { ProgramProductService } from 'app/entities/program-product/program-product.service';
import { ProgramProduct } from 'app/shared/model/program-product.model';

describe('Component Tests', () => {
    describe('ProgramProduct Management Component', () => {
        let comp: ProgramProductComponent;
        let fixture: ComponentFixture<ProgramProductComponent>;
        let service: ProgramProductService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProgramProductComponent],
                providers: []
            })
                .overrideTemplate(ProgramProductComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProgramProductComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgramProductService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProgramProduct(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.programProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
