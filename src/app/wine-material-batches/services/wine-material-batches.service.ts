import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IWineMaterialBatchResult} from "../../grape-sorts/models/grape-sort-result";
import {
    IWineMaterialBatchDetailsResult,
    IWineMaterialBatchProcessStartAllowedResult
} from "../models/wine-material-batch-details-result";

@Injectable({
    providedIn: 'root'
})
export class WineMaterialBatchesService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<IWineMaterialBatchResult[]>(`${this.api}wineMaterialBatch`, {params: queryParams});
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}wineMaterialBatch/${id}`);
    }

    public create = (wineMaterialBatch: { name: string }) => {
        return this.httpClient.post<IWineMaterialBatchResult>(`${this.api}wineMaterialBatch`, wineMaterialBatch);
    }

    public update = (wineMaterialBatch: { id: string; name: string, harvestLocation: string, harvestDate: Date }) => {
        return this.httpClient.put(`${this.api}wineMaterialBatch/${wineMaterialBatch.id}`, wineMaterialBatch);
    }

    public getDetailsById = (id: string) => {
        return this.httpClient.get<IWineMaterialBatchDetailsResult>(`${this.api}wineMaterialBatch/${id}/details`);
    }
    //
    // public getPhases = (id: string) => {
    //     return this.httpClient.get<IWineMaterialBatchPhaseResult[]>(`${this.api}wineMaterialBatch/${id}/phases`)
    // }
    //
    // public savePhasesOrder = (request: { wineMaterialBatchId: string; phases: { phaseId: string; order: number }[] }) => {
    //     return this.httpClient.put(`${this.api}wineMaterialBatch/${request.wineMaterialBatchId}/save_phases_order`, request);
    // }
    //
    // public createStandard(requestBody: { wineMaterialBatchPhaseId: string; parameterId: string; upperBound: number; lowerBound: number }) {
    //     return this.httpClient.post(`${this.api}wineMaterialBatch/create_standard`, requestBody)
    // }
    //
    // public updateStandards(requestBody: IUpdateWineMaterialBatchProcessPhaseParameterStandardsRequest) {
    //     return this.httpClient.put(`${this.api}wineMaterialBatch/update_standards`, requestBody);
    // }
    public updatePhasesTerms(requestBody: { terms: { endDate: Date; id: string; startDate: Date }[] }) {
        return this.httpClient.put(`${this.api}wineMaterialBatch/update_terms`, requestBody);
    }

    public checkIfProcessStartAllowed(id: string) {
        return this.httpClient.get<IWineMaterialBatchProcessStartAllowedResult>(`${this.api}wineMaterialBatch/${id}/start_allowed`)
    }
}
