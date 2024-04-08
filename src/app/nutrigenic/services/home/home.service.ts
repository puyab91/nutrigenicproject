import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";

@Injectable()
export class HomeService {
    constructor(
        private serviceCall: ApiServiceCall
        ) { }

    getMeals(): Observable<OperationResult<any>> {
        let _url = ApiUrl.meals;
        return this.serviceCall.GET(_url, false, null);
    }

}