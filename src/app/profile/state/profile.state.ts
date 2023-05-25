import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {ProfileStateModel} from "./profile.state-model";
import {Injectable} from "@angular/core";
import {UserService} from "../../users/user.service";
import {ClearProfile, GetOwnProfile, SetLanguage} from "./profile.actions";
import {tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@State<ProfileStateModel>({
    name: 'profile',
    defaults: {
        profile: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            selectedCulture: environment.defaultLocale,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
})

@Injectable()
export class ProfileState {

    constructor(private store: Store, private userService: UserService, private translateService: TranslateService) {
    }

    @Selector()
    static selectProfile(state: ProfileStateModel) {
        return state.profile;
    }

    @Selector()
    static selectLanguage(state: ProfileStateModel) {
        return state.profile?.selectedCulture!;
    }

    @Action(GetOwnProfile)
    getOwnProfile(ctx: StateContext<ProfileStateModel>, {}: GetOwnProfile) {
        return this.userService.getOwnProfile().pipe(tap(returnData => {
            const state = ctx.getState();
            state.profile = returnData;
            ctx.setState(state);
            this.translateService.use(returnData.selectedCulture);
        }));
    }

    @Action(ClearProfile)
    clearProfile(ctx: StateContext<ProfileStateModel>, {}: ClearProfile) {
        const state = ctx.getState();
        state.profile = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            selectedCulture: environment.defaultLocale,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        ctx.setState(state);
    }

    @Action(SetLanguage)
    setLanguage(ctx: StateContext<ProfileStateModel>, {newLanguage}: SetLanguage) {
        const state = ctx.getState();
        state.profile!.selectedCulture = newLanguage;
        ctx.setState(state);

        if(state.profile?.id) {
            this.userService.setLanguage(state.profile.id, newLanguage).subscribe();
        }
    }
}
