import {Component, OnInit} from '@angular/core';
import {
    IWineMaterialBatchDetailsResult,
    IWineMaterialBatchGrapeSortPhaseDetailsResult, IWineMaterialBatchGrapeSortPhaseParameterDetailsResult,
    IWineMaterialBatchProcessStartAllowedResult
} from "../models/wine-material-batch-details-result";
import {ActivatedRoute} from "@angular/router";
import {SensorsService} from "../../sensors/services/sensors.service";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";
import {MatDialog} from "@angular/material/dialog";
import {StartPhaseProcessModalComponent} from "../start-phase-process-modal/start-phase-process-modal.component";
import {IReadingsMessage, ReadingsMessage, SensorStatusUpdatedMessage} from "../../core/models/IBaseResult";
import {SignalrService} from "../../core/services/signalr.service";
import {PredictQualityModalComponent} from "../predict-quality-modal/predict-quality-modal.component";
import {IPredictionResult} from "../../grape-sorts/models/grape-sort-result";
import {
    QualityPredictionDetailsModalComponent
} from "../quality-prediction-details-modal/quality-prediction-details-modal.component";
import {
    WineMaterialBatchPhaseParameterChartModalComponent
} from "../wine-material-batch-phase-parameter-chart-modal/wine-material-batch-phase-parameter-chart-modal.component";
import {DeviceStatus, ISensorResult} from "../../sensors/models/sensor-result";

@Component({
    selector: 'app-wine-material-batch-phase-details',
    templateUrl: './wine-material-batch-phase-details.component.html',
    styleUrls: ['./wine-material-batch-phase-details.component.scss']
})
export class WineMaterialBatchPhaseDetailsComponent implements OnInit {

    wineMaterialBatchDetails!: IWineMaterialBatchDetailsResult;
    wineMaterialBatchGrapeSortPhaseDetails!: IWineMaterialBatchGrapeSortPhaseDetailsResult;
    statuses!: { [status: number]: string };
    startProcessAllowed!: boolean;
    startProcessNotAllowedReasons!: string[];
    predictionResult?: IPredictionResult;

    constructor(private activatedRoute: ActivatedRoute,
                private sensorsService: SensorsService,
                private wineMaterialBatchesService: WineMaterialBatchesService,
                private dialog: MatDialog,
                private signalrService: SignalrService) {
    }

    ngOnInit(): void {

        this.activatedRoute.data.subscribe(({wineMaterialBatch, wineMaterialBatchGrapeSortPhase}) => {
            this.wineMaterialBatchDetails = wineMaterialBatch;
            this.wineMaterialBatchGrapeSortPhaseDetails = wineMaterialBatchGrapeSortPhase;

            this.sensorsService.getStatuses().subscribe(result => {
                this.statuses = result.reduce((map, statusObject) => {
                    map[statusObject.status] = statusObject.value;
                    return map;
                }, {} as { [status: number]: string });
            });

            if(!this.wineMaterialBatchGrapeSortPhaseDetails.isActive) {
                this.wineMaterialBatchesService.checkIfPhaseProcessStartAllowed(this.wineMaterialBatchGrapeSortPhaseDetails.id).subscribe((result: IWineMaterialBatchProcessStartAllowedResult) => {
                    this.startProcessAllowed = result.startAllowed;
                    this.startProcessNotAllowedReasons = result.startNotAllowedReasons;
                });
            }

            this.signalrService.startConnection();
            this.signalrService.hubConnection.on(SensorStatusUpdatedMessage, (data) => {

                for (const parameterDetails of this.wineMaterialBatchGrapeSortPhaseDetails.parametersDetails) {

                    const sensor = parameterDetails.sensors.find(x => x.id == data.deviceId);

                    if (sensor) {
                        sensor.status = data.newStatus;
                    }
                }
            });

            this.signalrService.hubConnection.on(ReadingsMessage, (data : IReadingsMessage) => {

                if(this.wineMaterialBatchDetails.id != data.wineMaterialBatchId)
                    return;

                for (const parameterDetails of this.wineMaterialBatchGrapeSortPhaseDetails.parametersDetails) {

                    const sensor = parameterDetails.sensors.find(x => x.id == data.deviceId);

                    if (sensor) {
                        sensor.lastValue = data.value.value;
                    }
                }
            });
        });
    }

    openStartPhaseProcessModal() {
        const dialogRef = this.dialog.open(StartPhaseProcessModalComponent, {
            data: {
                wineMaterialBatchId: this.wineMaterialBatchDetails.id,
                wineMaterialBatchGrapeSortPhaseId: this.wineMaterialBatchGrapeSortPhaseDetails.id,
            }
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.wineMaterialBatchGrapeSortPhaseDetails.isActive = true;
            }
        });
    }

    openPredictQualityModal() {
        const dialogRef = this.dialog.open(PredictQualityModalComponent, {
            data: {
                grapeSortPhaseId: this.wineMaterialBatchGrapeSortPhaseDetails.phase.id,
                wineMaterialBatchGrapeSortPhaseId: this.wineMaterialBatchGrapeSortPhaseDetails.id,
            },
            width: '800px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.predictionResult = result;
            }
        });
    }

    openShowPredictionDetailsModal() {
        this.dialog.open(QualityPredictionDetailsModalComponent, {
            data: this.predictionResult,
            width: '800px'
        });
    }

    openChartDialog(parameterDetail: IWineMaterialBatchGrapeSortPhaseParameterDetailsResult) {

        const dialogRef = this.dialog.open(WineMaterialBatchPhaseParameterChartModalComponent, {
            data: {
                grapeSortPhaseId: this.wineMaterialBatchGrapeSortPhaseDetails.phase.id,
                wineMaterialBatchGrapeSortPhaseId: this.wineMaterialBatchGrapeSortPhaseDetails.id,
                parameterDetail: parameterDetail
            },
            width: '800px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.predictionResult = result;
            }
        });
    }

    protected readonly DeviceStatus = DeviceStatus;

    stopSensor(sensor: ISensorResult) {
        this.sensorsService.stop(sensor.id).subscribe();
    }

    startSensor(sensor: ISensorResult) {
        this.sensorsService.start(sensor.id).subscribe();
    }
}
