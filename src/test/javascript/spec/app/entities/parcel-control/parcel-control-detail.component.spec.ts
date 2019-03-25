/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelControlDetailComponent } from 'app/entities/parcel-control/parcel-control-detail.component';
import { ParcelControl } from 'app/shared/model/parcel-control.model';

describe('Component Tests', () => {
    describe('ParcelControl Management Detail Component', () => {
        let comp: ParcelControlDetailComponent;
        let fixture: ComponentFixture<ParcelControlDetailComponent>;
        const route = ({ data: of({ parcelControl: new ParcelControl(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelControlDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParcelControlDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParcelControlDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parcelControl).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
