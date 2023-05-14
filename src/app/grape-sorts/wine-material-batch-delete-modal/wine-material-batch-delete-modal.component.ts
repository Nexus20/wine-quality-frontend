import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IWineMaterialBatchResult} from "../models/grape-sort-result";
import {WineMaterialBatchesService} from "../../wine-material-batches/services/wine-material-batches.service";

@Component({
    selector: 'app-wine-material-batch-delete-modal',
    templateUrl: './wine-material-batch-delete-modal.component.html',
    styleUrls: ['./wine-material-batch-delete-modal.component.scss']
})
export class WineMaterialBatchDeleteModalComponent {

    constructor(private dialogRef: MatDialogRef<WineMaterialBatchDeleteModalComponent>,
                private wineMaterialBatchesService: WineMaterialBatchesService,
                @Inject(MAT_DIALOG_DATA) public data: IWineMaterialBatchResult) {
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    confirmDelete(): void {
        this.wineMaterialBatchesService.delete(this.data.id).subscribe(() => {
            this.dialogRef.close(this.data.id);
        });
    }
}
