import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IPhaseDetailResult, IPhaseResult} from "../../phases/models/phase-result";

@Injectable({
  providedIn: 'root'
})
export class GrapeSortsService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IPhaseResult[]>(`${this.api}grapeSort`, {params: queryParams});
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}grapeSort/${id}`);
    }

    public create = (phase: { name: string }) => {
        return this.httpClient.post<IPhaseResult>(`${this.api}grapeSort`, phase);
    }

    public update = (phase: { Id: string; Name: string }) => {
        return this.httpClient.put(`${this.api}grapeSort/${phase.Id}`, phase);
    }

    public getById = (id: string) => {
        return this.httpClient.get<IPhaseDetailResult>(`${this.api}grapeSort/${id}`);
    }
}
