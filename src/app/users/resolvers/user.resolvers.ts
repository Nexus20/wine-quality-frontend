import {ResolveFn} from "@angular/router";
import {inject} from "@angular/core";
import {IUserResult} from "../models/IUserResult";
import {UsersService} from "../users.service";

export const usersResolver: ResolveFn<IUserResult[]> = () => {
    return inject(UsersService).get();
}
