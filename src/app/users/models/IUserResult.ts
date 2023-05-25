import {IBaseResult} from "../../core/models/IBaseResult";
import {IRoleResult} from "../../roles/models/role.result";

export interface IUserResult extends IBaseResult {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    selectedCulture: string;
    roles: IRoleResult[];
}
