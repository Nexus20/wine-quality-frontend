import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import { ErrorModalComponent } from './error-modal/error-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
    declarations: [
        HeaderComponent,
        ErrorModalComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        TranslateModule,
        MatDialogModule,
        MatButtonModule
    ],
    providers: [
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        }
    ],
    exports: [
        HeaderComponent,
    ]
})
export class SharedModule { }
