import {DeviceStatus} from "../../sensors/models/sensor-result";

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

export const SensorStatusUpdatedMessage = 'SensorStatusUpdated';
