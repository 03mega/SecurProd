/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ProgramProductUpdateComponent } from 'app/entities/program-product/program-product-update.component';
import { ProgramProductService } from 'app/entities/program-product/program-product.service';
import { ProgramProduct } from 'app/shared/model/program-product.model';

describe('Component Tests', () => {
    describe('ProgramProduct Management Update Component', () => {
        let comp: ProgramProductUpdateComponent;
        let fixture: ComponentFixture<ProgramProductUpdateComponent>;
        let service: ProgramProductService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ProgramProductUpdateComponent]
            })
                .overrideTemplate(ProgramProductUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProgramProductUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgramProductService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProgramProduct(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.programProduct = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProgramProduct();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.programProduct = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
