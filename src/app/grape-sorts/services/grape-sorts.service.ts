import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IPhaseDetailResult, IPhaseResult} from "../../phases/models/phase-result";
import {IGrapeSortPhaseResult} from "../models/grape-sort-result";

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

    public create = (grapeSort: { name: string }) => {
        return this.httpClient.post<IPhaseResult>(`${this.api}grapeSort`, grapeSort);
    }

    public update = (grapeSort: { Id: string; Name: string }) => {
        return this.httpClient.put(`${this.api}grapeSort/${grapeSort.Id}`, grapeSort);
    }

    public getById = (id: string) => {
        return this.httpClient.get<IPhaseDetailResult>(`${this.api}grapeSort/${id}`);
    }

    public getPhases = (id: string) => {
        return this.httpClient.get<IGrapeSortPhaseResult[]>(`${this.api}grapeSort/${id}/phases`)
    }

    public savePhasesOrder = (request: { grapeSortId: string; phases: { phaseId: string; order: number }[] }) => {
        return this.httpClient.put(`${this.api}grapeSort/${request.grapeSortId}/save_phases_order`, request);
    }
}
