import {IBaseResult} from "../../core/models/IBaseResult";

export interface IUserResult extends IBaseResult {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    selectedCulture: string;
}
