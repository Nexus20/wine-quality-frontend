import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IPredictionResult} from "../../grape-sorts/models/grape-sort-result";

@Component({
    selector: 'app-quality-prediction-details-modal',
    templateUrl: './quality-prediction-details-modal.component.html',
    styleUrls: ['./quality-prediction-details-modal.component.scss']
})
export class QualityPredictionDetailsModalComponent {

    constructor(public dialogRef: MatDialogRef<QualityPredictionDetailsModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IPredictionResult) {
    }
}
