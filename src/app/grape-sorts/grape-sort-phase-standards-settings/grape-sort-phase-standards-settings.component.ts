import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
    IGrapeSortPhaseResult,
    IGrapeSortProcessPhaseParameterStandardResult, IUpdateGrapeSortProcessPhaseParameterStandardsRequest,
    IUpdateGrapeSortProcessPhaseParameterStandardsRequestPart
} from "../models/grape-sort-result";
import {IParameterResult} from "../../phases/models/phase-result";
import {GrapeSortsService} from "../services/grape-sorts.service";

@Component({
  selector: 'app-grape-sort-phase-standards-settings',
  templateUrl: './grape-sort-phase-standards-settings.component.html',
  styleUrls: ['./grape-sort-phase-standards-settings.component.scss']
})
export class GrapeSortPhaseStandardsSettingsComponent {
    standardsForm!: FormGroup;
    availableParameters: IParameterResult[] = [];
    selectedParameter: IParameterResult | null = null;
    newStandardLowerBound: number | null = null;
    newStandardUpperBound: number | null = null;
    standards: IGrapeSortProcessPhaseParameterStandardResult[] = [];
    constructor(
        public dialogRef: MatDialogRef<GrapeSortPhaseStandardsSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            standards: IGrapeSortProcessPhaseParameterStandardResult[];
            phaseParameters: IParameterResult[];
            grapeSortPhaseId: string;
        },
        private formBuilder: FormBuilder,
        private grapeSortsService: GrapeSortsService
    ) {
        this.standards = this.data.standards;
        this.availableParameters = this.data.phaseParameters.filter(
            (p) => !this.standards.some((s) => s.parameterName === p.name)
        );
        this.standardsForm = this.createFormGroup();
    }

    createFormGroup(): FormGroup {
        const formGroup = this.formBuilder.group({});
        this.standards.forEach((standard) => {
            formGroup.addControl(`lowerBound-${standard.id}`, this.formBuilder.control(standard.lowerBound));
            formGroup.addControl(`upperBound-${standard.id}`, this.formBuilder.control(standard.upperBound));
        });
        return formGroup;
    }

    save(): void {
        if (this.standardsForm.valid) {
            // Здесь будет код для отправки данных на сервер
            console.log(this.standardsForm.value)

            const updatedStandards: IUpdateGrapeSortProcessPhaseParameterStandardsRequestPart[] = this.data.standards.map(
                (standard) => {
                    const standardId = standard.id;
                    const lowerBoundKey = `lowerBound-${standardId}`;
                    const upperBoundKey = `upperBound-${standardId}`;

                    return {
                        standardId,
                        lowerBound: this.standardsForm.controls[lowerBoundKey].value,
                        upperBound: this.standardsForm.controls[upperBoundKey].value,
                    };
                }
            );

            const request: IUpdateGrapeSortProcessPhaseParameterStandardsRequest = {
                standards: updatedStandards,
            };

            console.log(request);

            this.grapeSortsService.updateStandards(request).subscribe(() => {

                this.data.standards.forEach((standard) => {
                    const standardId = standard.id;
                    const lowerBoundKey = `lowerBound-${standardId}`;
                    const upperBoundKey = `upperBound-${standardId}`;

                    standard.lowerBound = this.standardsForm.controls[lowerBoundKey].value;
                    standard.upperBound = this.standardsForm.controls[upperBoundKey].value;
                });

                this.dialogRef.close();
            });
        }
    }

    addStandard() {

        if (!this.selectedParameter || this.newStandardLowerBound === null || this.newStandardUpperBound === null) {
            return;
        }

        this.grapeSortsService.createStandard({
            lowerBound: this.newStandardLowerBound,
            upperBound: this.newStandardUpperBound,
            grapeSortPhaseId: this.data.grapeSortPhaseId,
            parameterId: this.selectedParameter.id
        }).subscribe((newStandard) => {
            this.standards.push(newStandard as IGrapeSortProcessPhaseParameterStandardResult);
            this.standardsForm = this.createFormGroup();
            this.selectedParameter = null;
            this.newStandardLowerBound = null;
            this.newStandardUpperBound = null;
        });
    }
}
