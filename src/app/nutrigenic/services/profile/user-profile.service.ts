import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { JwtTokenService } from "../auth/jwt-token.service";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";
import notiflix from "notiflix";

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

    getUserExpert(): Observable<OperationResult<any>> {
        let _url = ApiUrl.userExpert;
        return this.serviceCall.GET(_url, true, null);
    }

    getUserOrders(): Observable<OperationResult<any>> {
        const id = this.jwtTokenservice.getId();
        let _url = ApiUrl.userOrders + '/' + id;
        return this.serviceCall.GET(_url, true, null);
    }

    getUserCreditCards(): Observable<OperationResult<any>> {
        const id = this.jwtTokenservice.getId();
        let _url = ApiUrl.userCreditCards + '/' + id;
        return this.serviceCall.GET(_url, true, null);
    }

    setUserWeight(weight: number): Observable<OperationResult<any>> {
        let _url = ApiUrl.setWeight;
        return this.serviceCall.Post(_url, true, { weight: weight });
    }

    submitExpertReview(review: any, expertId: number): void {
        let _url = ApiUrl.experts + '/' + expertId + '/reviews';
         this.serviceCall.Post(_url, true, review).subscribe({
            next: this.handleSubmitReviewResponse.bind(this),
            error: this.handleError.bind(this)
         });;
    }

    handleSubmitReviewResponse(response: any): void {
        console.log(response);
        notiflix.Notify.success(response.statusCode + '- Operation unsuccessful', {
            position: 'right-top',
            timeout: 3000
        });
    }

    handleError(error: any): void {
        notiflix.Notify.failure(error.error.message + '- Operation unsuccessful', {
            position: 'right-top',
            timeout: 3000
        });
    }
}