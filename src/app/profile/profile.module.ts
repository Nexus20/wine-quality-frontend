import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {profileResolver} from "./resolvers/profile.resolvers";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileEditComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: ProfileComponent, resolve: {profile: profileResolver}},
            {path: 'edit', component: ProfileEditComponent, resolve: {profile: profileResolver}},
        ]),
        SharedModule,
        TranslateModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
    ]
})
export class ProfileModule {
}
