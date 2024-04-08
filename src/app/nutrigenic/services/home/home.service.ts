import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { JwtTokenService } from "../auth/jwt-token.service";
import { LoginModel } from "../../models/auth/login-model";
import notiflix from 'notiflix';
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";
import { SignUpModel } from "../../models/auth/signup-model";

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