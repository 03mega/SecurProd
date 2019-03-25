/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { StampCancelledDetailComponent } from 'app/entities/stamp-cancelled/stamp-cancelled-detail.component';
import { StampCancelled } from 'app/shared/model/stamp-cancelled.model';

describe('Component Tests', () => {
    describe('StampCancelled Management Detail Component', () => {
        let comp: StampCancelledDetailComponent;
        let fixture: ComponentFixture<StampCancelledDetailComponent>;
        const route = ({ data: of({ stampCancelled: new StampCancelled(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [StampCancelledDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StampCancelledDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StampCancelledDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stampCancelled).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
