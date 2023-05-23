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
    deviceId: string;
    value: IWineMaterialBatchGrapeSortPhaseParameterValueResult;
}

export const SensorStatusUpdatedMessage = 'SensorStatusUpdated';
export const ReadingsMessage = 'Readings';
