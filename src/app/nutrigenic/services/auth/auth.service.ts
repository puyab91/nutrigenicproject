import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { JwtTokenService } from "./jwt-token.service";
import { LoginModel } from "../../models/auth/login-model";
import notiflix from 'notiflix';
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";

@Injectable()
export class AuthService {
  constructor(
    private serviceCall: ApiServiceCall,
    private jwtTokenservice: JwtTokenService
  ) { }

  login(loginModel: LoginModel): Observable<OperationResult<any>> {
    let _url = ApiUrl.login;
    return this.serviceCall.Post(_url, false, loginModel);    
  }

}