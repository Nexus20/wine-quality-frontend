import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
    IGrapeSortDetailsResult,
    IGrapeSortPhaseResult,
    IGrapeSortResult,
    IUpdateGrapeSortProcessPhaseParameterStandardsRequest
} from "../models/grape-sort-result";

@Injectable({
    providedIn: 'root'
})
export class GrapeSortsService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IGrapeSortResult[]>(`${this.api}grapeSort`, {params: queryParams});
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}grapeSort/${id}`);
    }

    public create = (grapeSort: { name: string }) => {
        return this.httpClient.post<IGrapeSortResult>(`${this.api}grapeSort`, grapeSort);
    }

    public update = (grapeSort: { Id: string; Name: string }) => {
        return this.httpClient.put(`${this.api}grapeSort/${grapeSort.Id}`, grapeSort);
    }

    public getById = (id: string) => {
        return this.httpClient.get<IGrapeSortDetailsResult>(`${this.api}grapeSort/${id}`);
    }

    public getPhases = (id: string) => {
        return this.httpClient.get<IGrapeSortPhaseResult[]>(`${this.api}grapeSort/${id}/phases`)
    }

    public savePhasesOrder = (request: { grapeSortId: string; phases: { phaseId: string; order: number }[] }) => {
        return this.httpClient.put(`${this.api}grapeSort/${request.grapeSortId}/save_phases_order`, request);
    }

    public createStandard(requestBody: { grapeSortPhaseId: string; parameterId: string; upperBound: number; lowerBound: number }) {
        return this.httpClient.post(`${this.api}grapeSort/create_standard`, requestBody)
    }

    public updateStandards(requestBody: IUpdateGrapeSortProcessPhaseParameterStandardsRequest) {
        return this.httpClient.put(`${this.api}grapeSort/update_standards`, requestBody);
    }
}
