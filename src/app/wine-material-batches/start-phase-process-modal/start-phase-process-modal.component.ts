import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";

@Component({
    selector: 'app-start-phase-process-modal',
    templateUrl: './start-phase-process-modal.component.html',
    styleUrls: ['./start-phase-process-modal.component.scss']
})
export class StartPhaseProcessModalComponent {
    constructor(public dialogRef: MatDialogRef<StartPhaseProcessModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    wineMaterialBatchId: string,
                    wineMaterialBatchGrapeSortPhaseId: string
                },
                private wineMaterialBatchesService: WineMaterialBatchesService) {
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    startPhaseProcess(): void {

        const requestBody = {
            wineMaterialBatchId: this.data.wineMaterialBatchId,
            wineMaterialBatchGrapeSortPhaseId: this.data.wineMaterialBatchGrapeSortPhaseId
        };

        this.wineMaterialBatchesService.runProcessPhase(requestBody).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
}
