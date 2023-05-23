import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import { SessionExpiredModalComponent } from './session-expired-modal/session-expired-modal.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
    declarations: [
        LoginComponent,
        SessionExpiredModalComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'login', component: LoginComponent},
        ]),
        SharedModule,
        TranslateModule,
        MatTableModule,
        MatDialogModule,
    ]
})
export class UsersModule {
}
