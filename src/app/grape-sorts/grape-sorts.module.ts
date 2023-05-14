import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {GrapeSortsComponent} from './grape-sorts/grape-sorts.component';
import {grapeSortPhasesResolver, grapeSortResolver, grapeSortsResolver} from "./resolvers/grape-sorts.resolver";
import {MatButtonModule} from "@angular/material/button";
import { GrapeSortCreateComponent } from './grape-sort-create/grape-sort-create.component';
import { GrapeSortDeleteComponent } from './grape-sort-delete/grape-sort-delete.component';
import { GrapeSortEditComponent } from './grape-sort-edit/grape-sort-edit.component';
import { GrapeSortDetailsComponent } from './grape-sort-details/grape-sort-details.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { GrapeSortPhasesComponent } from './grape-sort-phases/grape-sort-phases.component';
import {phasesResolver} from "../phases/resolvers/phases.resolver";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatListModule} from "@angular/material/list";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import { GrapeSortPhaseStandardsSettingsComponent } from './grape-sort-phase-standards-settings/grape-sort-phase-standards-settings.component';
import {MatSelectModule} from "@angular/material/select";
import { WineMaterialBatchCreateModalComponent } from './wine-material-batch-create-modal/wine-material-batch-create-modal.component';
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
    declarations: [
        GrapeSortsComponent,
        GrapeSortCreateComponent,
        GrapeSortDeleteComponent,
        GrapeSortEditComponent,
        GrapeSortDetailsComponent,
        GrapeSortPhasesComponent,
        GrapeSortPhaseStandardsSettingsComponent,
        WineMaterialBatchCreateModalComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: GrapeSortsComponent,
                resolve: {
                    grapeSorts: grapeSortsResolver
                },
            },
            {
                path: ':id',
                component: GrapeSortDetailsComponent,
                resolve: {
                    grapeSort: grapeSortResolver
                }
            },
            {
                path: ':id/phases/edit',
                component: GrapeSortPhasesComponent,
                resolve: {
                    grapeSortPhases: grapeSortPhasesResolver,
                    phases: phasesResolver
                },
            },
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
export class GrapeSortsModule {
}
