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
    productIds: any[] = [];
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

    addToMyShop(id: number, count: number) {
        var filteredproductIds = this.productIds.filter((item: any) => item.id == id);
        if (filteredproductIds.length == 0)
            this.productIds.push({ id: id, count: count })
        else
            this.productIds.forEach((item: any) => {
                if(item.id == id)
                    item.count = count;
            });


        var sum = 0;
        this.productIds.forEach((item: any) => sum += item.count);
        this.addedProductCount.next(sum);
    }

    productCounter$ = this.addedProductCount.asObservable();

}