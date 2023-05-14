import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WineMaterialBatchesService} from "../../wine-material-batches/services/wine-material-batches.service";

@Component({
    selector: 'app-wine-material-batch-create-modal',
    templateUrl: './wine-material-batch-create-modal.component.html',
    styleUrls: ['./wine-material-batch-create-modal.component.scss']
})
export class WineMaterialBatchCreateModalComponent {

    createForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private wineMaterialBatchesService: WineMaterialBatchesService,
                private dialogRef: MatDialogRef<WineMaterialBatchCreateModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    grapeSortId: string;
                }) {
        this.createForm = this.formBuilder.group({
            name: ['', Validators.required],
            harvestDate: ['', Validators.required],
            harvestLocation: ['', Validators.required],
            grapeSortId: [this.data.grapeSortId, Validators.required]
        });
    }

    onSubmit() {
        if (this.createForm.valid) {

            console.log(this.createForm.value);

            this.wineMaterialBatchesService.create(this.createForm.value).subscribe((result) => {
              this.dialogRef.close(result);
            });
        }
    }
}
