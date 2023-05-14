import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {IGrapeSortDetailsResult, IGrapeSortPhaseResult, IGrapeSortResult} from "../models/grape-sort-result";

export const grapeSortsResolver: ResolveFn<IGrapeSortResult[]> = () => {
    return inject(GrapeSortsService).get();
};

export const grapeSortPhasesResolver: ResolveFn<IGrapeSortPhaseResult[]> = (route: ActivatedRouteSnapshot) => {
    return inject(GrapeSortsService).getPhases(route.paramMap.get('id')!);
}

export const grapeSortResolver: ResolveFn<IGrapeSortDetailsResult> = (route: ActivatedRouteSnapshot) => {
    return inject(GrapeSortsService).getById(route.paramMap.get('id')!);
}
