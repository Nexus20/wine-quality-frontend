import {DeviceStatus} from "../../sensors/models/sensor-result";
import {
    IWineMaterialBatchGrapeSortPhaseParameterValueResult
} from "../../wine-material-batches/models/wine-material-batch-details-result";

export interface IStatusResult<TStatus> {
    status: TStatus;
    value: string;
}

export interface IBaseResult {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ISensorStatusUpdatedMessage {
    deviceId: string;
    newStatus: DeviceStatus;
}

export interface IReadingsMessage {
    wineMaterialBatchId: string;
    deviceId: string;
    value: IWineMaterialBatchGrapeSortPhaseParameterValueResult;
    parameterId: string;
    parameterName: string;
    createdAt: Date;
}

export const SensorStatusUpdatedMessage = 'SensorStatusUpdated';
export const ReadingsMessage = 'Readings';
