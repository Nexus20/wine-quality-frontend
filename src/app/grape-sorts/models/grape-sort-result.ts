import {IBaseResult} from "../../core/models/IBaseResult";
import {IParameterResult} from "../../phases/models/phase-result";

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
    parameters: IParameterResult[];
}

export interface IUpdateGrapeSortProcessPhaseParameterStandardsRequest {
    standards: IUpdateGrapeSortProcessPhaseParameterStandardsRequestPart[];
}

export interface IUpdateGrapeSortProcessPhaseParameterStandardsRequestPart {
    standardId: string;
    lowerBound: number;
    upperBound: number;
}
export interface IGrapeSortProcessPhaseParameterStandardResult extends IBaseResult {
    parameterName: string;
    lowerBound: number,
    upperBound: number,
}