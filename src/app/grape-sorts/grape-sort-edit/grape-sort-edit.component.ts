import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IGrapeSortResult} from "../models/grape-sort-result";
import {GrapeSortsService} from "../services/grape-sorts.service";

@Component({
    selector: 'app-grape-sort-edit',
    templateUrl: './grape-sort-edit.component.html',
    styleUrls: ['./grape-sort-edit.component.scss']
})
export class GrapeSortEditComponent {
    editForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<GrapeSortEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IGrapeSortResult,
                private grapeSortsService: GrapeSortsService) {
        this.editForm = new FormGroup({
            name: new FormControl(data.name, Validators.required)
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    editGrapeSort(): void {
        if (this.editForm.valid) {
            const updatedGrapeSort = {
                Id: this.data.id,
                Name: this.editForm.value.name
            };

            this.grapeSortsService.update(updatedGrapeSort).subscribe(() => {
                this.dialogRef.close(updatedGrapeSort);
            });
        }
    }
}
