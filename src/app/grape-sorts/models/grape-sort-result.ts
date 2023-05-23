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

export interface IGrapeSortPhaseDatasetResult extends IBaseResult {
    datasetInfo: IFileNameWithUrlDto;
}

export interface IFileNameWithUrlDto {
    name: string;
    url: string;
}

export interface IGrapeSortPhaseForecastModelResult extends IBaseResult {
    accuracy: number;
    modelName: string;
    modelUri: string;
    datasetInfo: IGrapeSortPhaseDatasetResult;
}

export interface IPredictionResult extends IBaseResult {
    quality: string;
    explanationItems?: IQualityExplanationItem[] | null;
    explanationUri: string;
}

export interface IQualityExplanationItem {
    reason: string;
    value: number;
    severity: number;
}

export interface IWineMaterialBatchPhaseParameterChartDataResult {
    labels: Date[];
    values: number[];
}
