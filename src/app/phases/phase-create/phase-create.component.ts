import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {PhasesService} from "../services/phases.service";

@Component({
    selector: 'app-phase-create',
    templateUrl: './phase-create.component.html',
    styleUrls: ['./phase-create.component.scss']
})
export class PhaseCreateComponent {
    createForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<PhaseCreateComponent>,
                private phasesService: PhasesService) {
        this.createForm = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    createPhase(): void {
        if (this.createForm.valid) {
            this.phasesService.create(this.createForm.value).subscribe((newPhase) => {
                this.dialogRef.close(newPhase);
            });
        }
    }
}
