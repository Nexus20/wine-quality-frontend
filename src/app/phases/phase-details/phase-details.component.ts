import {Component, Inject} from '@angular/core';
import {IPhaseDetailResult} from "../models/phase-result";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-phase-details',
    templateUrl: './phase-details.component.html',
    styleUrls: ['./phase-details.component.scss']
})
export class PhaseDetailsComponent {
    constructor(private dialogRef: MatDialogRef<PhaseDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public phaseDetail: IPhaseDetailResult) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
