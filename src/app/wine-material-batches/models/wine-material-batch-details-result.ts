import {IBaseResult} from "../../core/models/IBaseResult";
import {IGrapeSortPhaseResult, IGrapeSortResult} from "../../grape-sorts/models/grape-sort-result";

export interface IWineMaterialBatchDetailsResult extends IBaseResult {
    name: string;
    harvestDate: Date;
    harvestLocation: string;
    grapeSort: IGrapeSortResult;
    phases: IWineMaterialBatchGrapeSortPhaseResult[];
    activePhase: IActiveWineMaterialBatchGrapeSortPhaseResult | null;
}

export interface IWineMaterialBatchGrapeSortPhaseResult extends IBaseResult {
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    phase: IGrapeSortPhaseResult;
}

export interface IActiveWineMaterialBatchGrapeSortPhaseResult extends IWineMaterialBatchGrapeSortPhaseResult {
    readings: IWineMaterialBatchProcessPhaseReadingsResult[];
}

export interface IWineMaterialBatchProcessPhaseReadingsResult {
    createdAt: Date;
    parameterId: string;
    parameterName: string;
    value: number;
}

export interface IWineMaterialBatchProcessStartAllowedResult {
    startAllowed: boolean;
    startNotAllowedReasons: string[];
}
