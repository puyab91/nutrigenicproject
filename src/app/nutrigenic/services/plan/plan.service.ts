import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";
import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";
import notiflix from "notiflix";

@Injectable()
export class PlanService {
    constructor(
        private serviceCall: ApiServiceCall
        ) { }

    getExperts(): Observable<OperationResult<any>> {
        let _url = ApiUrl.publicExperts;
        return this.serviceCall.GET(_url, false, null);
    }

    assignExperts(id: number): void {
        let _url = ApiUrl.experts + '/' + id + '/assign';
         this.serviceCall.Post(_url, true, null).subscribe({
            next: this.handleAssignResponse.bind(this),
            error: this.handleError.bind(this)
         });
    }

    unAssignExperts(id: number): Observable<ArrayBuffer> {
        let _url = ApiUrl.experts + '/' + id + '/unassign';
        return this.serviceCall.Delete(_url, true);
    }

    changeExpert(newId: number, oldId: number){
        this.unAssignExperts(oldId).subscribe((response: any) => {
            if(response)
                //var x = newId
                this.assignExperts(newId);
        });        
    }

    handleAssignResponse(response: any): void {
        notiflix.Notify.success(response.ok + '- Operation unsuccessful', {
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