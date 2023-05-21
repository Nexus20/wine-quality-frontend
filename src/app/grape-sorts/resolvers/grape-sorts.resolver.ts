import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {
    IGrapeSortDetailsResult,
    IGrapeSortPhaseDatasetResult, IGrapeSortPhaseForecastModelResult,
    IGrapeSortPhaseResult,
    IGrapeSortResult
} from "../models/grape-sort-result";

export const grapeSortsResolver: ResolveFn<IGrapeSortResult[]> = () => {
    return inject(GrapeSortsService).get();
};

export const grapeSortPhasesResolver: ResolveFn<IGrapeSortPhaseResult[]> = (route: ActivatedRouteSnapshot) => {
    return inject(GrapeSortsService).getPhases(route.paramMap.get('id')!);
}

export const grapeSortResolver: ResolveFn<IGrapeSortDetailsResult> = (route: ActivatedRouteSnapshot) => {
    return inject(GrapeSortsService).getById(route.paramMap.get('id')!);
}

export const grapeSortPhaseResolver: ResolveFn<IGrapeSortPhaseResult> = (route: ActivatedRouteSnapshot) => {
    return inject(GrapeSortsService).getPhaseById(route.paramMap.get('phaseId')!);
}

export const datasetsResolver: ResolveFn<IGrapeSortPhaseDatasetResult[]> = (route: ActivatedRouteSnapshot) => {
    return inject(GrapeSortsService).getPhaseDatasets(route.paramMap.get('phaseId')!);
}

export const forecastModelsResolver: ResolveFn<IGrapeSortPhaseForecastModelResult[]> = (route: ActivatedRouteSnapshot) => {
    return inject(GrapeSortsService).getPhaseModels(route.paramMap.get('phaseId')!);
}
