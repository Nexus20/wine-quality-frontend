import {Component, Inject} from '@angular/core';
import {IParameterResult} from "../models/phase-result";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PhasesService} from "../services/phases.service";
import {ParametersService} from "../../parameters/services/parameters.service";
import {MatListOption} from "@angular/material/list";
import {MatLegacyListOption} from "@angular/material/legacy-list";

@Component({
    selector: 'app-phase-parameters',
    templateUrl: './phase-parameters.component.html',
    styleUrls: ['./phase-parameters.component.scss']
})
export class PhaseParametersComponent {
    linkedParametersList!: IParameterResult[];
    availableParametersList!: IParameterResult[];

    constructor(private dialogRef: MatDialogRef<PhaseParametersComponent>,
                @Inject(MAT_DIALOG_DATA) public phaseId: string,
                private phasesService: PhasesService,
                private parametersService: ParametersService) {
        this.loadData();
    }

    loadData(): void {
        this.phasesService.getById(this.phaseId).subscribe(phaseDetail => {
            this.linkedParametersList = phaseDetail.parameters;
        });

        this.parametersService.get().subscribe(availableParameters => {
            this.availableParametersList = availableParameters;
        });
    }

    addParameter(selectedParameters: MatListOption[]): void {

        const parametersIds = selectedParameters.map(x => x.value.id);
        console.log(parametersIds);
        this.phasesService.addParameters(this.phaseId, parametersIds).subscribe(() => {
            this.loadData();
        });
    }

    removeParameter(selectedParameters: MatListOption[]): void {
        const parametersIds = selectedParameters.map(x => x.value.id);
        console.log(parametersIds);
        this.phasesService.removeParameters(this.phaseId, parametersIds).subscribe(() => {
            this.loadData();
        });
    }

    close(): void {
        this.dialogRef.close();
    }
}
