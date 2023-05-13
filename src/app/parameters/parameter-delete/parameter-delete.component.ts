import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ParametersService} from "../services/parameters.service";
import {IParameterResult} from "../../phases/models/phase-result";

@Component({
  selector: 'app-parameter-delete',
  templateUrl: './parameter-delete.component.html',
  styleUrls: ['./parameter-delete.component.scss']
})
export class ParameterDeleteComponent {

    constructor(private dialogRef: MatDialogRef<ParameterDeleteComponent>,
                private parametersService: ParametersService,
                @Inject(MAT_DIALOG_DATA) public data: IParameterResult) {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.parametersService.delete(this.data.id).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
}
