import {IBaseResult, IStatusResult} from "../../core/models/IBaseResult";

export interface ISensorStatusResult extends IStatusResult<DeviceStatus> {

}
export interface ISensorResult extends IBaseResult {
    phaseParameterId: string;
    phaseId: string;
    phaseName: string;
    parameterId: string;
    parameterName: string;

    wineMaterialBatchGrapeSortPhaseParameterId?: string | null;
    wineBatchId?: string | null;
    wineBatchName?: string | null;

    deviceKey: string;
    isActive: boolean;
    status: DeviceStatus;

    lastValue?: number | null;
}

export enum DeviceStatus {
    Created = 0,
    Ready = 1000,
    BoundariesUpdated = 2000,
    Working = 3000,
    Stopped = 4000
}
