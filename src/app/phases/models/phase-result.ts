import {IBaseResult} from "../../core/models/IBaseResult";

export interface IPhaseResult extends IBaseResult {
    name: string;
}

export interface IPhaseDetailResult extends IBaseResult {
    name: string;
    parameters: IParameterResult[];
}

export interface IParameterResult extends IBaseResult {
    name: string;
}

export interface IParameterDetailResult extends IBaseResult {
    name: string;
    phases: IPhaseResult[];
}
