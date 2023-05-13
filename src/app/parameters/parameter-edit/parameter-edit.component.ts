import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IParameterResult} from "../../phases/models/phase-result";
import {ParametersService} from "../services/parameters.service";

@Component({
    selector: 'app-parameter-edit',
    templateUrl: './parameter-edit.component.html',
    styleUrls: ['./parameter-edit.component.scss']
})
export class ParameterEditComponent {
    editForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<ParameterEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IParameterResult,
                private parametersService: ParametersService) {
        this.editForm = new FormGroup({
            name: new FormControl(data.name, Validators.required)
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    editParameter(): void {
        if (this.editForm.valid) {
            const updatedParameter = {
                Id: this.data.id,
                Name: this.editForm.value.name
            };

            this.parametersService.update(updatedParameter).subscribe(() => {
                this.dialogRef.close(updatedParameter);
            });
        }
    }
}
