import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
    IWineMaterialBatchDetailsResult,
    IWineMaterialBatchGrapeSortPhaseDetailsResult
} from "../models/wine-material-batch-details-result";
import {IPredictionResult} from "../../grape-sorts/models/grape-sort-result";
import {
    QualityPredictionDetailsModalComponent
} from "../quality-prediction-details-modal/quality-prediction-details-modal.component";

@Component({
    selector: 'app-wine-material-batch-phase-prediction-history',
    templateUrl: './wine-material-batch-phase-prediction-history.component.html',
    styleUrls: ['./wine-material-batch-phase-prediction-history.component.scss']
})
export class WineMaterialBatchPhasePredictionHistoryComponent implements OnInit {

    displayedColumns: string[] = ['date', 'quality', 'details'];

    wineMaterialBatchDetails!: IWineMaterialBatchDetailsResult;
    wineMaterialBatchGrapeSortPhaseDetails!: IWineMaterialBatchGrapeSortPhaseDetailsResult;
    predictionHistory!: IPredictionResult[];

    constructor(private activatedRoute: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {

        this.activatedRoute.data.subscribe(({
                                                wineMaterialBatch,
                                                wineMaterialBatchGrapeSortPhase,
                                                predictionHistory
                                            }) => {
            this.wineMaterialBatchDetails = wineMaterialBatch;
            this.wineMaterialBatchGrapeSortPhaseDetails = wineMaterialBatchGrapeSortPhase;
            this.predictionHistory = predictionHistory;
        });
    }

    openDialog(prediction : IPredictionResult) {
        this.dialog.open(QualityPredictionDetailsModalComponent, {
            data: prediction,
            width: '800px'
        });
    }
}
