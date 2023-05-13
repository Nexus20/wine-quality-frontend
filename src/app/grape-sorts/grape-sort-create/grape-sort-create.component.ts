import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {GrapeSortsService} from "../services/grape-sorts.service";


@Component({
    selector: 'app-grape-sort-create',
    templateUrl: './grape-sort-create.component.html',
    styleUrls: ['./grape-sort-create.component.scss']
})
export class GrapeSortCreateComponent {
    createForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<GrapeSortCreateComponent>,
                private grapeSortsService: GrapeSortsService) {
        this.createForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    createGrapeSort(): void {
        if (this.createForm.valid) {
            this.grapeSortsService.create(this.createForm.value).subscribe((newGrapeSort) => {
                this.dialogRef.close(newGrapeSort);
            });
        }
    }
}
