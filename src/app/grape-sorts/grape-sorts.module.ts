import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {GrapeSortsComponent} from './grape-sorts/grape-sorts.component';
import {
    datasetsResolver, forecastModelsResolver,
    grapeSortPhaseResolver,
    grapeSortPhasesResolver,
    grapeSortResolver,
    grapeSortsResolver
} from "./resolvers/grape-sorts.resolver";
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
import { WineMaterialBatchEditModalComponent } from './wine-material-batch-edit-modal/wine-material-batch-edit-modal.component';
import { WineMaterialBatchDeleteModalComponent } from './wine-material-batch-delete-modal/wine-material-batch-delete-modal.component';
import { GrapeSortPhaseQualityPredictionSettingsComponent } from './grape-sort-phase-quality-prediction-settings/grape-sort-phase-quality-prediction-settings.component';
import {MatLineModule} from "@angular/material/core";
import { TrainPhaseModelModalComponent } from './train-phase-model-modal/train-phase-model-modal.component';
import { DeletePhaseDatasetModalComponent } from './delete-phase-dataset-modal/delete-phase-dataset-modal.component';
import { DeletePhaseModelModalComponent } from './delete-phase-model-modal/delete-phase-model-modal.component';
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import { UploadPhaseDatasetModalComponent } from './upload-phase-dataset-modal/upload-phase-dataset-modal.component';


@NgModule({
    declarations: [
        GrapeSortsComponent,
        GrapeSortCreateComponent,
        GrapeSortDeleteComponent,
        GrapeSortEditComponent,
        GrapeSortDetailsComponent,
        GrapeSortPhasesComponent,
        GrapeSortPhaseStandardsSettingsComponent,
        WineMaterialBatchCreateModalComponent,
        WineMaterialBatchEditModalComponent,
        WineMaterialBatchDeleteModalComponent,
        GrapeSortPhaseQualityPredictionSettingsComponent,
        TrainPhaseModelModalComponent,
        DeletePhaseDatasetModalComponent,
        DeletePhaseModelModalComponent,
        UploadPhaseDatasetModalComponent
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
            {
                path: ':id/phases/:phaseId/quality-prediction-settings',
                component: GrapeSortPhaseQualityPredictionSettingsComponent,
                resolve: {
                    grapeSort: grapeSortResolver,
                    grapeSortPhase: grapeSortPhaseResolver,
                    datasets: datasetsResolver,
                    forecastModels: forecastModelsResolver
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
        NgxMatFileInputModule,
    ],
    providers: [MatSnackBar]
})
export class GrapeSortsModule {
}
