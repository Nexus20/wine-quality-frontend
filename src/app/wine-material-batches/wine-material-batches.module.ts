import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WineMaterialBatchDetailsComponent} from './wine-material-batch-details/wine-material-batch-details.component';
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {wineMaterialBatchResolver} from "./resolvers/wine-material-batches.resolvers";
import {MatSnackBar} from "@angular/material/snack-bar";


@NgModule({
    declarations: [
        WineMaterialBatchDetailsComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: WineMaterialBatchDetailsComponent,
                resolve: {
                    wineMaterialBatch: wineMaterialBatchResolver
                }
            }
        ]),
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        CdkDropList,
        CdkDrag,
        MatListModule,
        MatTabsModule,
        MatSelectModule,
        FormsModule,
        MatDatepickerModule,
    ],
    providers: [MatSnackBar]
})
export class WineMaterialBatchesModule {
}
