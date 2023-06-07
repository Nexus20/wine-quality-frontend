import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
    IWineMaterialBatchDetailsResult,
    IWineMaterialBatchGrapeSortPhaseResult, IWineMaterialBatchProcessStartAllowedResult
} from "../models/wine-material-batch-details-result";
import {MatDialog} from "@angular/material/dialog";
import {
    WineMaterialBatchPhasesEditModalComponent
} from "../wine-material-batch-phases-edit-modal/wine-material-batch-phases-edit-modal.component";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";
import {
    WineMaterialBatchPhaseSensorsModalComponent
} from "../wine-material-batch-phase-sensors-modal/wine-material-batch-phase-sensors-modal.component";
import {
    WineMaterialBatchStartPhaseModalComponent
} from "../wine-material-batch-start-phase-modal/wine-material-batch-start-phase-modal.component";
import {SignalrService} from "../../core/services/signalr.service";
import {IReadingsMessage, ReadingsMessage, SensorStatusUpdatedMessage} from "../../core/models/IBaseResult";

@Component({
  selector: 'app-wine-material-batch-details',
  templateUrl: './wine-material-batch-details.component.html',
  styleUrls: ['./wine-material-batch-details.component.scss']
})
export class WineMaterialBatchDetailsComponent implements OnInit {

    wineMaterialBatchDetails!: IWineMaterialBatchDetailsResult;
    startProcessAllowed!: boolean;
    startProcessNotAllowedReasons!: string[];


    constructor(private activatedRoute: ActivatedRoute,
                private wineMaterialBatchesService: WineMaterialBatchesService,
                private signalrService: SignalrService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({wineMaterialBatch}) => {
            this.wineMaterialBatchDetails = wineMaterialBatch;

            if(!this.wineMaterialBatchDetails.phases.some(x => x.isActive)) {
                this.wineMaterialBatchesService.checkIfProcessStartAllowed(this.wineMaterialBatchDetails.id).subscribe((result: IWineMaterialBatchProcessStartAllowedResult) => {
                    this.startProcessAllowed = result.startAllowed;
                    this.startProcessNotAllowedReasons = result.startNotAllowedReasons;
                });
            }

            this.signalrService.startConnection();

            this.signalrService.hubConnection.on(ReadingsMessage, (data : IReadingsMessage) => {

                if(this.wineMaterialBatchDetails.activePhase && this.wineMaterialBatchDetails.id == data.wineMaterialBatchId) {

                    const reading = this.wineMaterialBatchDetails.activePhase.readings.find(x => x.parameterName == data.parameterName);

                    if(reading) {
                        reading.value = data.value.value;
                    } else {
                        this.wineMaterialBatchDetails.activePhase.readings.push({
                            createdAt: data.createdAt,
                            parameterName: data.parameterName,
                            parameterId: data.parameterId,
                            value: data.value.value
                        });
                    }
                }
            });
        })
    }

    openPhasesEditDialog(phases: IWineMaterialBatchGrapeSortPhaseResult[]) {
        const dialogRef = this.dialog.open(WineMaterialBatchPhasesEditModalComponent, {
            data: phases
        });

        dialogRef.afterClosed().subscribe(updatedPhases => {
            if (updatedPhases) {
                this.wineMaterialBatchDetails.phases = updatedPhases;
            }
        });
    }

    openSensorsDialog(phase: IWineMaterialBatchGrapeSortPhaseResult) {
        const dialogRef = this.dialog.open(WineMaterialBatchPhaseSensorsModalComponent, {
            data: phase,
            width: '1000px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {

            }
        });
    }

    openStartProcessModal() {

        const dialogRef = this.dialog.open(WineMaterialBatchStartPhaseModalComponent, {
            data: {
                wineMaterialBatchId: this.wineMaterialBatchDetails.id,
                wineMaterialBatchGrapeSortPhaseId: this.wineMaterialBatchDetails.phases.filter(x => x.phase.order == 1)[0].id,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.refreshData();
            }
        });
    }

    private refreshData() {
        this.wineMaterialBatchesService.getDetailsById(this.wineMaterialBatchDetails.id).subscribe((result: IWineMaterialBatchDetailsResult) => {

            this.wineMaterialBatchDetails = result;

            if(!this.wineMaterialBatchDetails.phases.some(x => x.isActive)) {
                this.wineMaterialBatchesService.checkIfProcessStartAllowed(this.wineMaterialBatchDetails.id).subscribe((result: IWineMaterialBatchProcessStartAllowedResult) => {
                    this.startProcessAllowed = result.startAllowed;
                    this.startProcessNotAllowedReasons = result.startNotAllowedReasons;
                });
            }
        });
    }
}
