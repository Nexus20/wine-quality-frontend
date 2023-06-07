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
import {
    wineMaterialBatchGrapeSortPhasePredictionHistoryResolver,
    wineMaterialBatchGrapeSortPhaseResolver,
    wineMaterialBatchResolver
} from "./resolvers/wine-material-batches.resolvers";
import {MatSnackBar} from "@angular/material/snack-bar";
import { WineMaterialBatchPhasesEditModalComponent } from './wine-material-batch-phases-edit-modal/wine-material-batch-phases-edit-modal.component';
import {MatLineModule} from "@angular/material/core";
import { WineMaterialBatchPhaseSensorsModalComponent } from './wine-material-batch-phase-sensors-modal/wine-material-batch-phase-sensors-modal.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { WineMaterialBatchPhaseDetailsComponent } from './wine-material-batch-phase-details/wine-material-batch-phase-details.component';
import {MatCardModule} from "@angular/material/card";
import { StartPhaseProcessModalComponent } from './start-phase-process-modal/start-phase-process-modal.component';
import { PredictQualityModalComponent } from './predict-quality-modal/predict-quality-modal.component';
import { QualityPredictionDetailsModalComponent } from './quality-prediction-details-modal/quality-prediction-details-modal.component';
import { WineMaterialBatchPhasePredictionHistoryComponent } from './wine-material-batch-phase-prediction-history/wine-material-batch-phase-prediction-history.component';
import { WineMaterialBatchPhaseParameterChartModalComponent } from './wine-material-batch-phase-parameter-chart-modal/wine-material-batch-phase-parameter-chart-modal.component';
import {NgChartsModule} from "ng2-charts";
import {TranslateModule} from "@ngx-translate/core";
import { WineMaterialBatchStartPhaseModalComponent } from './wine-material-batch-start-phase-modal/wine-material-batch-start-phase-modal.component';


@NgModule({
    declarations: [
        WineMaterialBatchDetailsComponent,
        WineMaterialBatchPhasesEditModalComponent,
        WineMaterialBatchPhaseSensorsModalComponent,
        WineMaterialBatchPhaseDetailsComponent,
        StartPhaseProcessModalComponent,
        PredictQualityModalComponent,
        QualityPredictionDetailsModalComponent,
        WineMaterialBatchPhasePredictionHistoryComponent,
        WineMaterialBatchPhaseParameterChartModalComponent,
        WineMaterialBatchStartPhaseModalComponent
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
            },
            {
                path: ':id/phases/:phaseId/details',
                component: WineMaterialBatchPhaseDetailsComponent,
                resolve: {
                    wineMaterialBatch: wineMaterialBatchResolver,
                    wineMaterialBatchGrapeSortPhase: wineMaterialBatchGrapeSortPhaseResolver
                }
            },
            {
                path: ':id/phases/:phaseId/predictions-history',
                component: WineMaterialBatchPhasePredictionHistoryComponent,
                resolve: {
                    wineMaterialBatch: wineMaterialBatchResolver,
                    wineMaterialBatchGrapeSortPhase: wineMaterialBatchGrapeSortPhaseResolver,
                    predictionHistory: wineMaterialBatchGrapeSortPhasePredictionHistoryResolver
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
        MatCardModule,
        NgChartsModule,
        TranslateModule,
    ],
    providers: [MatSnackBar]
})
export class WineMaterialBatchesModule {
}
