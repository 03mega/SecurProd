/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DeliveryService } from 'app/entities/delivery/delivery.service';
import { IDelivery, Delivery } from 'app/shared/model/delivery.model';

describe('Service Tests', () => {
    describe('Delivery Service', () => {
        let injector: TestBed;
        let service: DeliveryService;
        let httpMock: HttpTestingController;
        let elemDefault: IDelivery;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DeliveryService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Delivery(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        deliveryDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Delivery', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        deliveryDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        deliveryDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Delivery(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Delivery', async () => {
                const returnedFromService = Object.assign(
                    {
                        borderDelivery: 'BBBBBB',
                        valuationNumber: 'BBBBBB',
                        deliveryDate: currentDate.format(DATE_FORMAT),
                        category: 'BBBBBB',
                        zone: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        deliveryDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Delivery', async () => {
                const returnedFromService = Object.assign(
                    {
                        borderDelivery: 'BBBBBB',
                        valuationNumber: 'BBBBBB',
                        deliveryDate: currentDate.format(DATE_FORMAT),
                        category: 'BBBBBB',
                        zone: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        deliveryDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Delivery', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
