import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
    IGrapeSortDetailsResult,
    IGrapeSortPhaseDatasetResult,
    IGrapeSortPhaseForecastModelResult,
    IGrapeSortPhaseResult
} from "../models/grape-sort-result";
import {MatDialog} from "@angular/material/dialog";
import {TrainPhaseModelModalComponent} from "../train-phase-model-modal/train-phase-model-modal.component";
import {DeletePhaseModelModalComponent} from "../delete-phase-model-modal/delete-phase-model-modal.component";
import {DeletePhaseDatasetModalComponent} from "../delete-phase-dataset-modal/delete-phase-dataset-modal.component";
import {UploadPhaseDatasetModalComponent} from "../upload-phase-dataset-modal/upload-phase-dataset-modal.component";
import {isArray} from "chart.js/helpers";

@Component({
    selector: 'app-grape-sort-phase-quality-prediction-settings',
    templateUrl: './grape-sort-phase-quality-prediction-settings.component.html',
    styleUrls: ['./grape-sort-phase-quality-prediction-settings.component.scss']
})
export class GrapeSortPhaseQualityPredictionSettingsComponent implements OnInit {

    grapeSortDetails!: IGrapeSortDetailsResult;
    grapeSortPhase!: IGrapeSortPhaseResult;
    datasets: IGrapeSortPhaseDatasetResult[] = [];
    forecastModels: IGrapeSortPhaseForecastModelResult[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({grapeSort, grapeSortPhase, datasets, forecastModels}) => {
            this.grapeSortDetails = grapeSort;
            this.grapeSortPhase = grapeSortPhase;
            this.datasets = datasets;
            this.forecastModels = forecastModels;
        });
    }

    openUploadDatasetDialog() {
        const dialogRef = this.dialog.open(UploadPhaseDatasetModalComponent, {
            width: '500px',
            data: {
                grapeSortPhaseId: this.grapeSortPhase.id// Список всех параметров для текущей фазы
            }
        });

        dialogRef.afterClosed().subscribe((result : false | IGrapeSortPhaseDatasetResult[] | IGrapeSortPhaseDatasetResult) => {

            if(result) {
                if(isArray(result)) {
                    this.datasets = [...result, ...this.datasets];
                } else {
                    this.datasets = [result, ...this.datasets];
                }
            }
        });
    }

    openTrainModelDialog() {
        const dialogRef = this.dialog.open(TrainPhaseModelModalComponent, {
            width: '500px',
            data: {
                grapeSortPhaseId: this.grapeSortPhase.id,
                datasets: this.datasets
            }
        });

        dialogRef.afterClosed().subscribe((result : false | IGrapeSortPhaseForecastModelResult | IGrapeSortPhaseForecastModelResult[]) => {

            if (result) {
                if(isArray(result)) {
                    this.forecastModels = [...result, ...this.forecastModels];
                } else {
                    this.forecastModels = [result, ...this.forecastModels];
                }
            }
        });
    }

    openDeleteModelDialog(model: IGrapeSortPhaseForecastModelResult) {
        const dialogRef = this.dialog.open(DeletePhaseModelModalComponent, {
            width: '500px',
            data: model
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.forecastModels = this.forecastModels.filter(x => x.id !== model.id);
            }
        });
    }

    openDeleteDatasetDialog(dataset: IGrapeSortPhaseDatasetResult) {
        const dialogRef = this.dialog.open(DeletePhaseDatasetModalComponent, {
            width: '500px',
            data: dataset
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.datasets = this.datasets.filter(x => x.id !== dataset.id);
            }
        });
    }
}
