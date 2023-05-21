import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ISensorResult, ISensorStatusResult} from "../models/sensor-result";
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class SensorsService {

    private readonly api = environment.api;

    constructor(private httpClient: HttpClient) {
    }

    public get = (queryParams?: {}) => {
        return this.httpClient.get<ISensorResult[]>(`${this.api}sensor`, {params: queryParams});
    }

    public delete = (id: string) => {
        return this.httpClient.delete(`${this.api}sensor/${id}`);
    }

    public create = (sensor: {
        parameterId: ({
            disabled: boolean;
            value: string
        } | ((control: AbstractControl) => (ValidationErrors | null)))[];
        phaseId: any
    }) => {
        return this.httpClient.post<ISensorResult>(`${this.api}sensor`, sensor);
    }

    public update = (sensor: { Id: string; Name: string }) => {
        return this.httpClient.put(`${this.api}sensor/${sensor.Id}`, sensor);
    }

    public getById = (id: string) => {
        return this.httpClient.get<ISensorResult>(`${this.api}sensor/${id}`);
    }

    public assignDevicesToWineMaterialBatchPhase(requestBody: {
        wineMaterialBatchGrapeSortPhaseId: string;
        sensorsIds: string[]
    }) {
        return this.httpClient.post(`${this.api}sensor/assign_devices_to_wine_material_batch`, requestBody);
    }

    public getStatuses() {
        return this.httpClient.get<ISensorStatusResult[]>(`${this.api}sensor/statuses`);
    }
}
