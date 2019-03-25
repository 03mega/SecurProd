/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ParcelDetailComponent } from 'app/entities/parcel/parcel-detail.component';
import { Parcel } from 'app/shared/model/parcel.model';

describe('Component Tests', () => {
    describe('Parcel Management Detail Component', () => {
        let comp: ParcelDetailComponent;
        let fixture: ComponentFixture<ParcelDetailComponent>;
        const route = ({ data: of({ parcel: new Parcel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ParcelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ParcelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParcelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.parcel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
