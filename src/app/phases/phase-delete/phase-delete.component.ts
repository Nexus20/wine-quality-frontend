import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PhasesService} from "../services/phases.service";
import {IPhaseResult} from "../models/phase-result";

@Component({
    selector: 'app-phase-delete',
    templateUrl: './phase-delete.component.html',
    styleUrls: ['./phase-delete.component.scss']
})
export class PhaseDeleteComponent {

    constructor(private dialogRef: MatDialogRef<PhaseDeleteComponent>,
                private phasesService: PhasesService,
                @Inject(MAT_DIALOG_DATA) public data: IPhaseResult) {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.phasesService.delete(this.data.id).subscribe(() => {
            this.dialogRef.close(true);
        });
    }
}
