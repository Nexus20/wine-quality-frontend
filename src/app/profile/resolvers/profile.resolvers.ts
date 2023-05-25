import {ResolveFn} from "@angular/router";
import {IUserResult} from "../../users/models/IUserResult";
import {inject} from "@angular/core";
import {UsersService} from "../../users/users.service";

export const profileResolver: ResolveFn<IUserResult> = () => {
    return inject(UsersService).getOwnProfile();
}
