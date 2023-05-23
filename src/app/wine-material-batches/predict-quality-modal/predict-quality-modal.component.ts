import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";
import {GrapeSortsService} from "../../grape-sorts/services/grape-sorts.service";
import {IGrapeSortPhaseForecastModelResult, IPredictionResult} from "../../grape-sorts/models/grape-sort-result";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-predict-quality-modal',
    templateUrl: './predict-quality-modal.component.html',
    styleUrls: ['./predict-quality-modal.component.scss']
})
export class PredictQualityModalComponent implements OnInit {

    predictionForm!: FormGroup;
    models!: IGrapeSortPhaseForecastModelResult[];


    constructor(public dialogRef: MatDialogRef<PredictQualityModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    grapeSortPhaseId: string,
                    wineMaterialBatchGrapeSortPhaseId: string
                },
                private wineMaterialBatchesService: WineMaterialBatchesService,
                private grapeSortsService: GrapeSortsService,
                private formBuilder: FormBuilder) {

        this.predictionForm = this.formBuilder.group({
            selectedModel: [null, Validators.required],
        });
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    predictQuality(): void {

        if(this.predictionForm.valid) {

            const requestBody = {
                wineMaterialBatchGrapeSortPhaseId: this.data.wineMaterialBatchGrapeSortPhaseId,
                forecastModelId: this.predictionForm.get('selectedModel')?.value
            };

            console.log(requestBody);

            this.wineMaterialBatchesService.predictQualityForPhase(requestBody).subscribe((result) => {
                this.dialogRef.close(result);
            });
        }
    }

    ngOnInit(): void {
        this.grapeSortsService.getPhaseModels(this.data.grapeSortPhaseId).subscribe((response) => {
            this.models = response;
        });
    }
}
