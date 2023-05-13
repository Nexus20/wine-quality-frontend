import {IBaseResult} from "../../core/models/IBaseResult";

export interface IGrapeSortResult extends IBaseResult {
    name: string;
}

export interface IGrapeSortDetailsResult extends IBaseResult {
    name: string;
    phases: IGrapeSortPhaseResult[];
    wineMaterialBatches: IWineMaterialBatchResult[];
}

export interface IWineMaterialBatchResult extends IBaseResult {
    name: string;
    harvestDate: Date;
    harvestLocation: string,
}

export interface IGrapeSortPhaseResult extends IBaseResult {
    phaseId: string;
    phaseName: string;
    grapeSortProcessPhaseParameterStandards: IGrapeSortProcessPhaseParameterStandardResult[];
    duration: number;
    order: number;
}

export interface IGrapeSortProcessPhaseParameterStandardResult extends IBaseResult {
    lowerBound: number,
    upperBound: number,
}
