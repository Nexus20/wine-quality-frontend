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
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({wineMaterialBatch}) => {
            this.wineMaterialBatchDetails = wineMaterialBatch;

            this.wineMaterialBatchesService.checkIfProcessStartAllowed(this.wineMaterialBatchDetails.id).subscribe((result: IWineMaterialBatchProcessStartAllowedResult) => {
                this.startProcessAllowed = result.startAllowed;
                this.startProcessNotAllowedReasons = result.startNotAllowedReasons;
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
}
