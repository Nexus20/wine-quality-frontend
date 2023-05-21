import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IGrapeSortPhaseDatasetResult} from "../models/grape-sort-result";
import {GrapeSortsService} from "../services/grape-sorts.service";

@Component({
  selector: 'app-train-phase-model-modal',
  templateUrl: './train-phase-model-modal.component.html',
  styleUrls: ['./train-phase-model-modal.component.scss']
})
export class TrainPhaseModelModalComponent {
    trainModelForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<TrainPhaseModelModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    grapeSortPhaseId: string;
                    datasets: IGrapeSortPhaseDatasetResult[];
                },
                private formBuilder: FormBuilder,
                private grapeSortsService: GrapeSortsService) {

        this.trainModelForm = this.formBuilder.group({
            datasetId: ['', Validators.required],
        });
    }

    trainModel() {
        const datasetId = this.trainModelForm.value.datasetId;

        this.grapeSortsService.trainModel({datasetId}).subscribe((result) => {
            // Здесь вы можете добавить обработку после успешной тренировки модели
            this.dialogRef.close(result);
        });
    }
}
