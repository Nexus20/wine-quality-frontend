import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IParameterDetailResult, IParameterResult} from "../../phases/models/phase-result";

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IParameterResult[]>(`${this.api}processParameter`, {params: queryParams});
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}processParameter/${id}`);
    }

    public create = (parameter: { name: string }) => {
        return this.httpClient.post<IParameterResult>(`${this.api}processParameter`, parameter);
    }

    public update = (parameter: { Id: string; Name: string }) => {
        return this.httpClient.put(`${this.api}processParameter/${parameter.Id}`, parameter);
    }

    public getById = (id: string) => {
        return this.httpClient.get<IParameterDetailResult>(`${this.api}processParameter/${id}`);
    }
}
