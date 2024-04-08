import { Injectable } from "@angular/core";
import { ApiServiceCall } from "../global.apiServicecall";
import { ApiUrl } from "../../constants/apiUrl";

import { Observable } from "rxjs";
import { OperationResult } from "../../models/operation-result";

@Injectable()
export class BlogService {
    constructor(
        private serviceCall: ApiServiceCall
        ) { }

    getBlogs(): Observable<OperationResult<any>> {
        let _url = ApiUrl.blogs;
        return this.serviceCall.GET(_url, true, null);
    }

}