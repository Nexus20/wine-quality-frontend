import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IPhaseResult} from "../models/phase-result";

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
}
