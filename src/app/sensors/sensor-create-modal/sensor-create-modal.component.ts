import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {PhasesService} from "../../phases/services/phases.service";
import {ParametersService} from "../../parameters/services/parameters.service";
import {IParameterResult, IPhaseResult} from "../../phases/models/phase-result";
import {SensorsService} from "../services/sensors.service";

@Component({
    selector: 'app-sensor-create-modal',
    templateUrl: './sensor-create-modal.component.html',
    styleUrls: ['./sensor-create-modal.component.scss']
})
export class SensorCreateModalComponent implements OnInit {

    createSensorForm!: FormGroup;
    phases: IPhaseResult[] = [];
    parameters: IParameterResult[] = [];

    constructor(private fb: FormBuilder,
                private dialogRef: MatDialogRef<SensorCreateModalComponent>,
                private phasesService: PhasesService,
                private parametersService: ParametersService,
                private sensorsService: SensorsService
    ) {
    }

    ngOnInit(): void {
        this.createSensorForm = this.fb.group({
            phase: ['', Validators.required],
            parameter: [{ value: '', disabled: true }, Validators.required],
        });

        this.phasesService.get().subscribe((phases) => {
            this.phases = phases;
        });

        this.createSensorForm.get('phase')!.valueChanges.subscribe((selectedPhase) => {
            this.parameters = [];
            this.createSensorForm.get('parameter')!.disable();
            this.parametersService.get({phaseId: selectedPhase}).subscribe((parameters) => {
                this.parameters = parameters;
                this.createSensorForm.get('parameter')!.enable();
            });
        });
    }

    submitForm() {
        if (this.createSensorForm.valid) {
            // Отправьте данные формы на сервер.
            // Предположим, у вас есть метод createSensor в сервисе sensorsService
            this.sensorsService.create({
                phaseId: this.createSensorForm.value.phase,
                parameterId: this.createSensorForm.value.parameter
            }).subscribe((sensor) => {
                this.dialogRef.close(sensor);
            });
        }
    }

    close() {
        this.dialogRef.close();
    }
}
