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
import {SessionExpiredModalComponent} from './session-expired-modal/session-expired-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {UsersComponent} from './users/users.component';
import {usersResolver} from "./resolvers/user.resolvers";
import { UserDetailsModalComponent } from './user-details-modal/user-details-modal.component';
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import {MatSelectModule} from "@angular/material/select";


@NgModule({
    declarations: [
        LoginComponent,
        SessionExpiredModalComponent,
        UsersComponent,
        UserDetailsModalComponent,
        UserCreateModalComponent,
        UserEditModalComponent,
        UserDeleteModalComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: UsersComponent, resolve: {users: usersResolver}},
            {path: 'login', component: LoginComponent},
        ]),
        SharedModule,
        TranslateModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
    ]
})
export class UsersModule {
}
