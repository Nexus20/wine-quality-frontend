import {IBaseResult} from "../../core/models/IBaseResult";

export interface IWineMaterialBatchDetailsResult extends IBaseResult {
    name: string;
    harvestDate: Date;
    harvestLocation: string,
}
