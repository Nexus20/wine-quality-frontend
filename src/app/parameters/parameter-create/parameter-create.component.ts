import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ParametersService} from "../services/parameters.service";

@Component({
  selector: 'app-parameter-create',
  templateUrl: './parameter-create.component.html',
  styleUrls: ['./parameter-create.component.scss']
})
export class ParameterCreateComponent {

    createForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<ParameterCreateComponent>,
                private parametersService: ParametersService) {
        this.createForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    createParameter(): void {
        if (this.createForm.valid) {
            this.parametersService.create(this.createForm.value).subscribe((newParameter) => {
                this.dialogRef.close(newParameter);
            });
        }
    }
}
