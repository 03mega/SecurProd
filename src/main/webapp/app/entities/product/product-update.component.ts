import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IProgram } from 'app/shared/model/program.model';
import { ProgramService } from 'app/entities/program';
import { IParcelProducts } from 'app/shared/model/parcel-products.model';
import { ParcelProductsService } from 'app/entities/parcel-products';
import { IProgramProduct } from 'app/shared/model/program-product.model';
import { ProgramProductService } from 'app/entities/program-product';
import { IProductDelivery } from 'app/shared/model/product-delivery.model';
import { ProductDeliveryService } from 'app/entities/product-delivery';
import { IDeliveryDeliveryTypeProduct } from 'app/shared/model/delivery-delivery-type-product.model';
import { DeliveryDeliveryTypeProductService } from 'app/entities/delivery-delivery-type-product';

@Component({
    selector: 'jhi-product-update',
    templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
    product: IProduct;
    isSaving: boolean;

    programs: IProgram[];

    parcelproducts: IParcelProducts[];

    programproducts: IProgramProduct[];

    productdeliveries: IProductDelivery[];

    deliverydeliverytypeproducts: IDeliveryDeliveryTypeProduct[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected productService: ProductService,
        protected programService: ProgramService,
        protected parcelProductsService: ParcelProductsService,
        protected programProductService: ProgramProductService,
        protected productDeliveryService: ProductDeliveryService,
        protected deliveryDeliveryTypeProductService: DeliveryDeliveryTypeProductService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
        this.programService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProgram[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProgram[]>) => response.body)
            )
            .subscribe((res: IProgram[]) => (this.programs = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.parcelProductsService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParcelProducts[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParcelProducts[]>) => response.body)
            )
            .subscribe((res: IParcelProducts[]) => (this.parcelproducts = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.programProductService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProgramProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProgramProduct[]>) => response.body)
            )
            .subscribe((res: IProgramProduct[]) => (this.programproducts = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.productDeliveryService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProductDelivery[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProductDelivery[]>) => response.body)
            )
            .subscribe((res: IProductDelivery[]) => (this.productdeliveries = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.deliveryDeliveryTypeProductService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDeliveryDeliveryTypeProduct[]>) => response.body)
            )
            .subscribe(
                (res: IDeliveryDeliveryTypeProduct[]) => (this.deliverydeliverytypeproducts = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(this.product));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
        result.subscribe((res: HttpResponse<IProduct>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProgramById(index: number, item: IProgram) {
        return item.id;
    }

    trackParcelProductsById(index: number, item: IParcelProducts) {
        return item.id;
    }

    trackProgramProductById(index: number, item: IProgramProduct) {
        return item.id;
    }

    trackProductDeliveryById(index: number, item: IProductDelivery) {
        return item.id;
    }

    trackDeliveryDeliveryTypeProductById(index: number, item: IDeliveryDeliveryTypeProduct) {
        return item.id;
    }
}
