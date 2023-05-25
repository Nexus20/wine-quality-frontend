import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IRoleResult} from "../models/role.result";

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IRoleResult[]>(`${this.api}role`, {params: queryParams});
    }
}
