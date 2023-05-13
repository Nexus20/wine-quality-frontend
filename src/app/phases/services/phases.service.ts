import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IPhaseDetailResult, IPhaseResult} from "../models/phase-result";

@Injectable({
  providedIn: 'root'
})
export class PhasesService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IPhaseResult[]>(`${this.api}processPhase`, {params: queryParams});
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}processPhase/${id}`);
    }

    public create = (phase: { name: string }) => {
        return this.httpClient.post<IPhaseResult>(`${this.api}processPhase`, phase);
    }

    public update = (phase: { Id: string; Name: string }) => {
        return this.httpClient.put(`${this.api}processPhase/${phase.Id}`, phase);
    }

    public getById = (id: string) => {
        return this.httpClient.get<IPhaseDetailResult>(`${this.api}processPhase/${id}`);
    }

    public addParameters(processPhaseId: string, processParameterIds: any[]) {
        return this.httpClient.post(`${this.api}processPhase/add_parameters`, { processPhaseId, processParameterIds });
    }

    public removeParameters(processPhaseId: string, processParameterIds: any[]) {
        return this.httpClient.post(`${this.api}processPhase/remove_parameters`, { processPhaseId, processParameterIds });
    }
}
