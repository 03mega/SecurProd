/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { StampDetailComponent } from 'app/entities/stamp/stamp-detail.component';
import { Stamp } from 'app/shared/model/stamp.model';

describe('Component Tests', () => {
    describe('Stamp Management Detail Component', () => {
        let comp: StampDetailComponent;
        let fixture: ComponentFixture<StampDetailComponent>;
        const route = ({ data: of({ stamp: new Stamp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [StampDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StampDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StampDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stamp).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
