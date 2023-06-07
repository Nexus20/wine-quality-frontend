import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";

@Component({
    selector: 'app-wine-material-batch-start-phase-modal',
    templateUrl: './wine-material-batch-start-phase-modal.component.html',
    styleUrls: ['./wine-material-batch-start-phase-modal.component.scss']
})
export class WineMaterialBatchStartPhaseModalComponent {
    constructor(public dialogRef: MatDialogRef<WineMaterialBatchStartPhaseModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    wineMaterialBatchId: string,
                    wineMaterialBatchGrapeSortPhaseId: string,
                },
                private wineMaterialBatchesService: WineMaterialBatchesService) {
    }

    cancel() {
        this.dialogRef.close(false);
    }

    confirmStart() {

        const request = {
            WineMaterialBatchId: this.data.wineMaterialBatchId,
            WineMaterialBatchGrapeSortPhaseId: this.data.wineMaterialBatchGrapeSortPhaseId,
        };

        this.wineMaterialBatchesService.startPhase(request).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
}
