import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IWineMaterialBatchGrapeSortPhaseResult} from "../models/wine-material-batch-details-result";
import {WineMaterialBatchesService} from "../services/wine-material-batches.service";

@Component({
    selector: 'app-wine-material-batch-phases-edit-modal',
    templateUrl: './wine-material-batch-phases-edit-modal.component.html',
    styleUrls: ['./wine-material-batch-phases-edit-modal.component.scss']
})
export class WineMaterialBatchPhasesEditModalComponent {

    constructor(public dialogRef: MatDialogRef<WineMaterialBatchPhasesEditModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IWineMaterialBatchGrapeSortPhaseResult[],
                private wineMaterialBatchesService: WineMaterialBatchesService) {
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    save(): void {

        const requestBody = {
            terms: this.data.map(x => {
                return {
                    startDate: x.startDate,
                    endDate: x.endDate,
                    id: x.id
                };
            })
        };

        this.wineMaterialBatchesService.updatePhasesTerms(requestBody).subscribe(() => {
            this.dialogRef.close(this.data);
        });
    }
}
