import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import {Store} from "@ngxs/store";
import {AuthState} from "./users/states/auth.state";

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
    this.translateService.addLangs(['en', 'ua']);
    const language = this.store.selectSnapshot(AuthState.selectLanguage);
    this.translateService.use(language);
  }
}
