import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WineMaterialBatchesService} from "../../wine-material-batches/services/wine-material-batches.service";
import {IWineMaterialBatchResult} from "../models/grape-sort-result";

@Component({
  selector: 'app-wine-material-batch-edit-modal',
  templateUrl: './wine-material-batch-edit-modal.component.html',
  styleUrls: ['./wine-material-batch-edit-modal.component.scss']
})
export class WineMaterialBatchEditModalComponent {
    editForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<WineMaterialBatchEditModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IWineMaterialBatchResult,
                private wineMaterialBatchesService: WineMaterialBatchesService) {

        this.editForm = new FormGroup({
            name: new FormControl(data.name, Validators.required),
            harvestDate: new FormControl(data.harvestDate, Validators.required),
            harvestLocation: new FormControl(data.harvestLocation, Validators.required),
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    editWineMaterialBatch(): void {
        if (this.editForm.valid) {
            const updatedWineMaterialBatch = {
                id: this.data.id,
                name: this.editForm.value.name,
                harvestLocation: this.editForm.value.harvestLocation,
                harvestDate: this.editForm.value.harvestDate,
            };

            this.wineMaterialBatchesService.update(updatedWineMaterialBatch).subscribe(() => {
                this.dialogRef.close(updatedWineMaterialBatch);
            });
        }
    }
}
