import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IWineMaterialBatchResult} from "../../grape-sorts/models/grape-sort-result";

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

    public update = (wineMaterialBatch: { Id: string; Name: string }) => {
        return this.httpClient.put(`${this.api}wineMaterialBatch/${wineMaterialBatch.Id}`, wineMaterialBatch);
    }

    // public getById = (id: string) => {
    //     return this.httpClient.get<IWineMaterialBatchDetailsResult>(`${this.api}wineMaterialBatch/${id}`);
    // }
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
}
