import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IWineMaterialBatchGrapeSortPhaseResult} from "../models/wine-material-batch-details-result";
import {SensorsService} from "../../sensors/services/sensors.service";
import {ISensorResult} from "../../sensors/models/sensor-result";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-wine-material-batch-phase-sensors-modal',
    templateUrl: './wine-material-batch-phase-sensors-modal.component.html',
    styleUrls: ['./wine-material-batch-phase-sensors-modal.component.scss']
})
export class WineMaterialBatchPhaseSensorsModalComponent implements OnInit {

    assignSensorForm!: FormGroup;
    availableSensors!: { sensors: ISensorResult[]; parameterName: string }[];
    wineMaterialBatchPhaseSensors!: { sensors: ISensorResult[]; parameterName: string }[];
    statuses!: { [status: number]: string };

    constructor(public dialogRef: MatDialogRef<WineMaterialBatchPhaseSensorsModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IWineMaterialBatchGrapeSortPhaseResult,
                private sensorsService: SensorsService,
                private formBuilder: FormBuilder) {

        this.refreshData();
    }

    get sensorFormGroups(): FormGroup[] {
        return (this.assignSensorForm.get('sensorGroups') as FormArray).controls as FormGroup[];
    }

    ngOnInit(): void {
        this.sensorsService.getStatuses().subscribe(result => {
            this.statuses = result.reduce((map, statusObject) => {
                map[statusObject.status] = statusObject.value;
                return map;
            }, {} as {[status: number]: string});

            console.log(this.statuses);
        });
    }

    onSubmit() {

        const formValue = this.assignSensorForm.value;
        const selectedSensorsIds: string[] = [];

        for (let i = 0; i < formValue.sensorGroups.length; i++) {
            for (let j = 0; j < formValue.sensorGroups[i].sensors.length; j++) {
                if (formValue.sensorGroups[i].sensors[j]) {
                    selectedSensorsIds.push(this.availableSensors[i].sensors[j].id);
                }
            }
        }

        const requestBody = {
            wineMaterialBatchGrapeSortPhaseId: this.data.id,
            sensorsIds: selectedSensorsIds
        };

        console.log(requestBody);  // {sensorGroups: [sensorId, sensorId, ...]}

        this.sensorsService.assignDevicesToWineMaterialBatchPhase(requestBody).subscribe(() => {
            this.refreshData();
        });
    }

    private groupSensorsByParameter(sensors: ISensorResult[]) {
        const grouped = sensors.reduce((result: any, sensor) => {
            (result[sensor.parameterName] = result[sensor.parameterName] || []).push(sensor);
            return result;
        }, {});

        return Object.keys(grouped).map(parameterName => ({
            parameterName: parameterName,
            sensors: grouped[parameterName]
        }));
    }

    private refreshData() {

        this.assignSensorForm = this.formBuilder.group({
            sensorGroups: this.formBuilder.array([])
        });

        const requestBody = {
            phaseId: this.data.phase.phaseId
        };

        this.sensorsService.get(requestBody).subscribe((result: ISensorResult[]) => {
            const wineMaterialBatchPhaseParametersIds = this.data.parameters.map(x => x.id);
            this.availableSensors = this.groupSensorsByParameter(result.filter(x => !x.wineMaterialBatchGrapeSortPhaseParameterId));
            this.wineMaterialBatchPhaseSensors = this.groupSensorsByParameter(result.filter(x => x.wineMaterialBatchGrapeSortPhaseParameterId && wineMaterialBatchPhaseParametersIds.includes(x.wineMaterialBatchGrapeSortPhaseParameterId)));

            console.log(this.wineMaterialBatchPhaseSensors);
            console.log(this.availableSensors);

            for (let group of this.availableSensors) {
                const sensorControls = group.sensors.map(() => new FormControl(false));
                const groupControl = this.formBuilder.group({
                    sensors: this.formBuilder.array(sensorControls)
                });
                (this.assignSensorForm.get('sensorGroups') as FormArray).push(groupControl);
            }
        });
    }
}
