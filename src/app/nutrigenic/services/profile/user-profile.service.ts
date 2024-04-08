import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { JwtTokenService } from "../auth/jwt-token.service";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";

@Injectable()
export class UserProfileService {
    constructor(
        private serviceCall: ApiServiceCall,
        private jwtTokenservice: JwtTokenService
    ) { }

    getUserProfile(): Observable<OperationResult<any>> {
        let _url = ApiUrl.userProfile;
        return this.serviceCall.GET(_url, true, null);
    }

    setUserWeight(weight: number): Observable<OperationResult<any>> {
        let _url = ApiUrl.setWeight;
        return this.serviceCall.Post(_url, true, { weight: weight });
    }

}