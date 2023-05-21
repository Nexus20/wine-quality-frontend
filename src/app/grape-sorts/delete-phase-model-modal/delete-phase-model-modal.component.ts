import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GrapeSortsService} from "../services/grape-sorts.service";
import {IGrapeSortPhaseForecastModelResult} from "../models/grape-sort-result";

@Component({
    selector: 'app-delete-phase-model-modal',
    templateUrl: './delete-phase-model-modal.component.html',
    styleUrls: ['./delete-phase-model-modal.component.scss']
})
export class DeletePhaseModelModalComponent {

    constructor(private dialogRef: MatDialogRef<DeletePhaseModelModalComponent>,
                private grapeSortsService: GrapeSortsService,
                @Inject(MAT_DIALOG_DATA) public data: IGrapeSortPhaseForecastModelResult) {
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    confirmDelete(): void {
        this.grapeSortsService.deletePhaseModel(this.data.id).subscribe(() => {
            this.dialogRef.close(true);
        });
    }

}
