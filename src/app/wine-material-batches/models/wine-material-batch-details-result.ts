import {IBaseResult} from "../../core/models/IBaseResult";
import {
    IGrapeSortPhaseResult,
    IGrapeSortProcessPhaseParameterStandardResult,
    IGrapeSortResult
} from "../../grape-sorts/models/grape-sort-result";
import {IParameterResult} from "../../phases/models/phase-result";
import {ISensorResult} from "../../sensors/models/sensor-result";

export interface IWineMaterialBatchGrapeSortPhaseParameterValueResult extends IBaseResult {
    value: number;
    phaseParameter: IWineMaterialBatchGrapeSortPhaseParameterResult;
}

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
    parameters: IWineMaterialBatchGrapeSortPhaseParameterResult[];
}

export interface IWineMaterialBatchGrapeSortPhaseDetailsResult extends IWineMaterialBatchGrapeSortPhaseResult {
    parametersDetails: IWineMaterialBatchGrapeSortPhaseParameterDetailsResult[];
}

export interface IWineMaterialBatchGrapeSortPhaseParameterResult extends IBaseResult {
}

export interface IWineMaterialBatchGrapeSortPhaseParameterDetailsResult extends IBaseResult {
    parameter: IParameterResult;
    sensors: ISensorResult[];
    standard: IGrapeSortProcessPhaseParameterStandardResult;
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
