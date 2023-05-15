import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";
import {IWineMaterialBatchDetailsResult} from "../models/wine-material-batch-details-result";

export const wineMaterialBatchResolver: ResolveFn<IWineMaterialBatchDetailsResult> = (route: ActivatedRouteSnapshot) => {
    return inject(WineMaterialBatchesService).getDetailsById(route.paramMap.get('id')!);
}
