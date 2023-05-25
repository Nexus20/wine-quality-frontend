import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {AuthState} from "../../users/states/auth.state";
import {Logout} from "../../users/states/auth.action";
import {ClearProfile, SetLanguage} from "../../profile/state/profile.actions";
import {ProfileState} from "../../profile/state/profile.state";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isUserAuthenticated!: boolean;
    public isUserAdmin!: boolean;

    public languages: string[] = [];
    public selectedLanguage!: string;

    constructor(private store: Store, private router: Router, private translateService: TranslateService) {
    }

    ngOnInit(): void {
        const token = this.store.selectSnapshot(AuthState.token);
        this.getAvailableLanguages();
        this.selectedLanguage = this.store.selectSnapshot(ProfileState.selectLanguage);

        if (!token) {
            this.isUserAdmin = false;
            this.isUserAuthenticated = false;
            return;
        }

        this.isUserAuthenticated = true;
        this.isUserAdmin = this.store.selectSnapshot(AuthState.isAdmin);
        this.isUserAuthenticated = true;
    }

    logout() {
        this.store.dispatch([new Logout(), new ClearProfile()]).subscribe(() => {
            this.isUserAdmin = false;
            this.router.navigate(['/']);
            location.reload();
        });
    }

    setLanguage() {
        this.translateService.use(this.selectedLanguage);
        this.store.dispatch(new SetLanguage(this.selectedLanguage)).subscribe(() => {
            if(this.isUserAuthenticated) {

            }
        });
    }

    getAvailableLanguages() {
        this.languages = [...this.translateService.getLangs()];
    }
}
