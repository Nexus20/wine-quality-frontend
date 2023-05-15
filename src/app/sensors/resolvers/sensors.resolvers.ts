import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {SensorsService} from "../services/sensors.service";
import {ISensorResult} from "../models/sensor-result";

export const sensorsResolver: ResolveFn<ISensorResult[]> = () => {
    return inject(SensorsService).get();
}

export const sensorResolver: ResolveFn<ISensorResult> = (route: ActivatedRouteSnapshot) => {
    return inject(SensorsService).getById(route.paramMap.get('id')!);
}
