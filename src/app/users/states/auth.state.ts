import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {IAuthState} from "./auth.model";
import {Login, Logout, SetLanguage} from "./auth.action";
import {UserService} from "../user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../../environments/environment";

@State<IAuthState>({
    name: 'auth',
    defaults: {
        id: '',
        token: '',
        email: '',
        roles: undefined,
        language: environment.defaultLocale
    }
})
@Injectable()
export class AuthState {

    constructor(private authService: UserService, private jwtHelper: JwtHelperService) {
    }

    @Selector()
    static token(state: IAuthState) {
        return state.token;
    }

    @Selector()
    static userId(state: IAuthState) {
        return state.id;
    }

    @Selector()
    static isAdmin(state: IAuthState) {
        return state.roles === "Admin";
    }

    @Selector()
    static isUserCustomer(state: IAuthState) {
        return state.roles === "Customer";
    }

  @Selector()
  static selectLanguage(state: IAuthState) {
    return state.language;
  }

  @Action(SetLanguage)
  setLanguage(ctx: StateContext<IAuthState>, {newLanguage}: SetLanguage) {
    const state = ctx.getState();
    state.language = newLanguage;
    ctx.setState(state);
  }

    @Action(Login)
    login({patchState}: StateContext<IAuthState>, {payload}: Login) {
        return this.authService.login(payload.email, payload.password)
            .pipe(tap(({token}) => {

                const decodedToken = this.decodeToken(token);

                patchState({
                    email: payload.email,
                    token,
                    roles: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    id: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
                })
            }));
    }

    @Action(Logout)
    logout({patchState}: StateContext<IAuthState>, {}: Logout) {
        patchState({
            id: "",
            email: "",
            token: "",
            roles: undefined,
        })
    }

    private decodeToken(token: string): any {
        return this.jwtHelper.decodeToken(token);
    }
}
