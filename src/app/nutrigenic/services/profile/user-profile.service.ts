import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { JwtTokenService } from "../auth/jwt-token.service";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";
import notiflix from "notiflix";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserProfileService {
    constructor(
        private serviceCall: ApiServiceCall,
        private jwtTokenservice: JwtTokenService,
        private http: HttpClient
    ) { }

    getUserProfile(): Observable<OperationResult<any>> {
        let _url = ApiUrl.userProfile;
        return this.serviceCall.GET(_url, true, null);
    }

    getUserExpert(): Observable<OperationResult<any>> {
        let _url = ApiUrl.userExpert;
        return this.serviceCall.GET(_url, true, null);
    }

    getUserBiometrics(): Observable<OperationResult<any>> {
        let _url = ApiUrl.biometrics;
        return this.serviceCall.GET(_url, true, null);
    }

    getExpertNotes(expertId: number): Observable<OperationResult<any>> {
        const id = this.jwtTokenservice.getId();
        let _url = ApiUrl.experts + '/' + expertId + '/notes' + '/' + id;
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

    setUserIMC(imc: number): Observable<OperationResult<any>> {
        let _url = ApiUrl.setImc;
        return this.serviceCall.Post(_url, true, { imc: imc });
    }

    setAddress(address: any): void {
        let _url = ApiUrl.setAddress;
        this.serviceCall.Patch(_url, true, address).subscribe({
            next: this.handleSuccessResponse.bind(this),
            error: this.handleError.bind(this)
        });;
    }

    submitExpertReview(review: any, expertId: number): void {
        let _url = ApiUrl.experts + '/' + expertId + '/reviews';
        this.serviceCall.Post(_url, true, review).subscribe({
            next: this.handleSuccessResponse.bind(this),
            error: this.handleError.bind(this)
        });;
    }

    handleSuccessResponse(response: any): void {
        notiflix.Notify.success(response.statusCode + '- Operation unsuccessful', {
            position: 'right-top',
            timeout: 3000
        });
    }

    handleError(error: any): void {
        notiflix.Notify.failure(error.message + '- Operation unsuccessful', {
            position: 'right-top',
            timeout: 3000
        });
    }

    getPhotos(): Observable<OperationResult<any>>{
        const id = this.jwtTokenservice.getId();
        let _url = ApiUrl.biometrics + '/' + id + '/photos';
        return this.serviceCall.GET(_url, true, null);
    }

    getBloods(): Observable<OperationResult<any>>{
        const id = this.jwtTokenservice.getId();
        let _url = ApiUrl.biometrics + '/' + id + '/bloods';
        return this.serviceCall.GET(_url, true, null);
    }

    setUserPicture(file: File, isPhoto: boolean): void {
        let headers = new HttpHeaders();

        var jsonWebToken = localStorage.getItem('token');
        var id: string = localStorage.getItem('id') == null ? '' : localStorage.getItem('id')!;

        if (jsonWebToken)
            headers = headers.set(
                'Authorization',
                `Bearer ${jsonWebToken}`
            );
        const formData = new FormData();

        if (isPhoto)
            formData.append('photo', file);
        else
            formData.append('blood', file);

        formData.append('user_id', id.toString());

        let _url = '';
        if (isPhoto)
            _url = ApiUrl.setPicture;
        else
            _url = ApiUrl.setBlood;
        this.http.post(_url, formData, {
            headers: headers,
            observe: 'response' as 'body'
        }).subscribe({
            next: this.handleSuccessResponse.bind(this),
            error: this.handleError.bind(this)
        });
    }
}