import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GrapeSortsService} from "../services/grape-sorts.service";

@Component({
    selector: 'app-upload-phase-dataset-modal',
    templateUrl: './upload-phase-dataset-modal.component.html',
    styleUrls: ['./upload-phase-dataset-modal.component.scss']
})
export class UploadPhaseDatasetModalComponent {

    uploadForm: FormGroup;
    files: File[] = [];

    constructor(public dialogRef: MatDialogRef<UploadPhaseDatasetModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                    grapeSortPhaseId: string;
                },
                private formBuilder: FormBuilder,
                private grapeSortsService: GrapeSortsService) {
        this.uploadForm = this.formBuilder.group({
            files: ['', Validators.required],
        });
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    onFileChange($event: any) {
        this.files = $event.target!.files;
    }

    uploadDatasets() {
        const formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
            formData.append('file' + i, this.files[i]);
        }

        formData.append('grapeSortPhaseId', this.data.grapeSortPhaseId);

        this.grapeSortsService.uploadDataset(formData).subscribe((result) => {
            // здесь вы можете добавить обработку после успешной загрузки файла
            this.dialogRef.close(result);
        });
    }
}
