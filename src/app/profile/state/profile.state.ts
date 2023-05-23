import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {ProfileStateModel} from "./profile.state-model";
import {Injectable} from "@angular/core";
import {UserService} from "../../users/user.service";
import {ClearProfile, GetOwnProfile, SetLanguage} from "./profile.actions";
import {tap} from "rxjs";
import {environment} from "../../../environments/environment";

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
        profile: undefined
    }
})

@Injectable()
export class ProfileState {

    constructor(private store: Store, private userService: UserService) {
    }

    @Selector()
    static selectProfile(state: ProfileStateModel) {
        return state.profile;
    }

    @Selector()
    static selectLanguage(state: ProfileStateModel) {
        return state.profile?.selectedCulture ?? environment.defaultLocale;
    }

    @Action(GetOwnProfile)
    getOwnProfile(ctx: StateContext<ProfileStateModel>, {}: GetOwnProfile) {
        return this.userService.getOwnProfile().pipe(tap(returnData => {
            const state = ctx.getState();
            state.profile = returnData;
            ctx.setState(state);
        }));
    }

    @Action(ClearProfile)
    clearProfile(ctx: StateContext<ProfileStateModel>, {}: ClearProfile) {
        const state = ctx.getState();
        state.profile = undefined;
        ctx.setState(state);
    }

    @Action(SetLanguage)
    setLanguage(ctx: StateContext<ProfileStateModel>, {newLanguage}: SetLanguage) {
        const state = ctx.getState();
        state.profile!.selectedCulture = newLanguage;
        ctx.setState(state);
    }
}
