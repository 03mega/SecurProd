/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SecurProdTestModule } from '../../../test.module';
import { ControlDetailComponent } from 'app/entities/control/control-detail.component';
import { Control } from 'app/shared/model/control.model';

describe('Component Tests', () => {
    describe('Control Management Detail Component', () => {
        let comp: ControlDetailComponent;
        let fixture: ComponentFixture<ControlDetailComponent>;
        const route = ({ data: of({ control: new Control(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SecurProdTestModule],
                declarations: [ControlDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ControlDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ControlDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.control).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
