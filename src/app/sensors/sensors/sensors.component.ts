import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ISensorResult} from "../models/sensor-result";
import {SensorsService} from "../services/sensors.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SensorCreateModalComponent} from "../sensor-create-modal/sensor-create-modal.component";
import {SensorDeleteModalComponent} from "../sensor-delete-modal/sensor-delete-modal.component";

@Component({
    selector: 'app-sensors',
    templateUrl: './sensors.component.html',
    styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
    sensors: ISensorResult[] = [];
    displayedColumns: string[] = ['id', 'phaseName', 'parameterName', 'status', 'actions'];

    constructor(private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private sensorsService: SensorsService,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({sensors}) => {
            this.sensors = sensors;
            console.log(sensors);
        })
    }

    copyDeviceId(deviceId: string) {
        this.clipboard.copy(deviceId);
        this.snackBar.open('Device id copied', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
        });
    }

    copyDeviceKey(deviceKey: string) {
        this.clipboard.copy(deviceKey);
        this.snackBar.open('Device key copied', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
        });
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(SensorCreateModalComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.sensors = [...this.sensors, result];
            }
        });
    }

    openDeleteDialog(sensor: ISensorResult): void {
        const dialogRef = this.dialog.open(SensorDeleteModalComponent, {
            data: sensor
        });

        dialogRef.afterClosed().subscribe(deletedSensorId => {

            if (deletedSensorId) {
                this.sensors = this.sensors.filter(x => x.id != deletedSensorId);
            }
        });
    }
}
