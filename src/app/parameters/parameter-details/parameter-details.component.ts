import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IParameterDetailResult} from "../../phases/models/phase-result";

@Component({
  selector: 'app-parameter-details',
  templateUrl: './parameter-details.component.html',
  styleUrls: ['./parameter-details.component.scss']
})
export class ParameterDetailsComponent {

    constructor(private dialogRef: MatDialogRef<ParameterDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public parameterDetail: IParameterDetailResult) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
