import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {IGrapeSortPhaseDatasetResult} from "../models/grape-sort-result";

@Component({
    selector: 'app-delete-phase-dataset-modal',
    templateUrl: './delete-phase-dataset-modal.component.html',
    styleUrls: ['./delete-phase-dataset-modal.component.scss']
})
export class DeletePhaseDatasetModalComponent {

    constructor(private dialogRef: MatDialogRef<DeletePhaseDatasetModalComponent>,
                private grapeSortsService: GrapeSortsService,
                @Inject(MAT_DIALOG_DATA) public data: IGrapeSortPhaseDatasetResult) {
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    confirmDelete(): void {
        this.grapeSortsService.deletePhaseDataset(this.data.id).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
}
