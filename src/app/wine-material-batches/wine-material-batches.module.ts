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
import { WineMaterialBatchPhasesEditModalComponent } from './wine-material-batch-phases-edit-modal/wine-material-batch-phases-edit-modal.component';
import {MatLineModule} from "@angular/material/core";
import { WineMaterialBatchPhaseSensorsModalComponent } from './wine-material-batch-phase-sensors-modal/wine-material-batch-phase-sensors-modal.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
    declarations: [
        WineMaterialBatchDetailsComponent,
        WineMaterialBatchPhasesEditModalComponent,
        WineMaterialBatchPhaseSensorsModalComponent
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
        MatLineModule,
        MatExpansionModule,
        MatRadioModule,
        MatCheckboxModule,
    ],
    providers: [MatSnackBar]
})
export class WineMaterialBatchesModule {
}
