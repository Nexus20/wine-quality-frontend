import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MissingTranslationService} from "./core/utils/MissingTranslationService";
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {AuthState} from "./users/states/auth.state";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {JwtModule} from "@auth0/angular-jwt";
import {InterceptorsModule} from "./core/interceptors/interceptors.module";
import {UsersService} from "./users/users.service";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {ProfileState} from "./profile/state/profile.state";

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

export function tokenGetter() {
    return localStorage.getItem("token");
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            useDefaultLang: true,
            defaultLanguage: 'en-US',
            missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
        }),
        NgxsModule.forRoot([AuthState, ProfileState]),
        NgxsStoragePluginModule.forRoot({
            key: ['auth', 'profile'],
        }),
        NgxsLoggerPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:7088"],
            }
        }),
        InterceptorsModule,
        MatNativeDateModule,
        MatDialogModule
    ],
    providers: [UsersService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
