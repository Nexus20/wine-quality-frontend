import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IPhaseResult} from "../models/phase-result";
import {PhasesService} from "../services/phases.service";

@Component({
    selector: 'app-phase-edit',
    templateUrl: './phase-edit.component.html',
    styleUrls: ['./phase-edit.component.scss']
})
export class PhaseEditComponent {

    editForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<PhaseEditComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IPhaseResult,
                private phasesService: PhasesService) {
        this.editForm = new FormGroup({
            name: new FormControl(data.name, Validators.required)
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    editPhase(): void {
        if (this.editForm.valid) {
            const updatedPhase = {
                Id: this.data.id,
                Name: this.editForm.value.name
            };

            this.phasesService.update(updatedPhase).subscribe(() => {
                this.dialogRef.close(updatedPhase);
            });
        }
    }
}
