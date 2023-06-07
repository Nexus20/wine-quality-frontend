import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";
import {
    IWineMaterialBatchDetailsResult, IWineMaterialBatchGrapeSortPhaseDetailsResult
} from "../models/wine-material-batch-details-result";
import {IPredictionResult} from "../../grape-sorts/models/grape-sort-result";

export const wineMaterialBatchResolver: ResolveFn<IWineMaterialBatchDetailsResult> = (route: ActivatedRouteSnapshot) => {
    return inject(WineMaterialBatchesService).getDetailsById(route.paramMap.get('id')!);
}

export const wineMaterialBatchGrapeSortPhaseResolver: ResolveFn<IWineMaterialBatchGrapeSortPhaseDetailsResult> = (route: ActivatedRouteSnapshot) => {
    return inject(WineMaterialBatchesService).getPhaseDetailsById(route.paramMap.get('phaseId')!);
}

export const wineMaterialBatchGrapeSortPhasePredictionHistoryResolver : ResolveFn<IPredictionResult[]> = (route: ActivatedRouteSnapshot) => {
    return inject(WineMaterialBatchesService).getPredictionHistory(route.paramMap.get('phaseId')!);
}
