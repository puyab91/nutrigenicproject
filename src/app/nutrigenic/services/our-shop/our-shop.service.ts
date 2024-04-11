import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";

@Injectable()
export class OurShopService {
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

}