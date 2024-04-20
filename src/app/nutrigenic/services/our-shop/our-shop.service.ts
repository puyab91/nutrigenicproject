import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { Observable, Subject } from "rxjs";
import { OperationResult } from "../../models/operation-result";

@Injectable({
    providedIn: 'root' 
  })
export class OurShopService {
    private addedProductCount = new Subject<number>();
    productCount: number = 0;
    productIds: number[] = [];
    constructor(
        private serviceCall: ApiServiceCall
    ) { }

    getVitamins(): Observable<OperationResult<any>> {
        let _url = ApiUrl.vitamins;
        return this.serviceCall.GET(_url, false, null);
    }

    getFineSupplements(): Observable<OperationResult<any>> {
        let _url = ApiUrl.fineSupplements;
        return this.serviceCall.GET(_url, false, null);
    }

    getHealthBoostIngredients(): Observable<OperationResult<any>> {
        let _url = ApiUrl.healthBoostIngredients;
        return this.serviceCall.GET(_url, false, null);
    }

    getsnacks(): Observable<OperationResult<any>> {
        let _url = ApiUrl.snacks;
        return this.serviceCall.GET(_url, false, null);
    }

    addToMyShop(id: number) {
        var filteredproductIds = this.productIds.filter((item:number) => item == id);
        if(filteredproductIds.length == 0)
            this.productIds.push(id)
        this.addedProductCount.next(this.productIds.length);     
    }

    productCounter$ = this.addedProductCount.asObservable();

}