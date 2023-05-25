import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import {Store} from "@ngxs/store";
import {ProfileState} from "./profile/state/profile.state";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'wine-quality-system-front-end';

    constructor(private store: Store, private translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.translateService.setDefaultLang(environment.defaultLocale)
        this.translateService.addLangs(['en-US', 'uk-UA']);
        const language = this.store.selectSnapshot(ProfileState.selectLanguage);
        // const language = 'uk-UA'
        this.translateService.use(language);
    }
}
