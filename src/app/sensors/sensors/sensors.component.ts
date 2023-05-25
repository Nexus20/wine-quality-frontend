import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ISensorResult} from "../models/sensor-result";
import {SensorsService} from "../services/sensors.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SensorCreateModalComponent} from "../sensor-create-modal/sensor-create-modal.component";
import {SensorDeleteModalComponent} from "../sensor-delete-modal/sensor-delete-modal.component";
import {SignalrService} from "../../core/services/signalr.service";
import {SensorStatusUpdatedMessage} from "../../core/models/IBaseResult";
import {TranslateService} from "@ngx-translate/core";

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
                private signalrService: SignalrService,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar,
                private translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({sensors}) => {
            this.sensors = sensors;
            console.log(sensors);

            this.signalrService.startConnection();
            this.signalrService.hubConnection.on(SensorStatusUpdatedMessage, (data) => {
                console.log(data);
                const sensor = this.sensors.find(x => x.id == data.deviceId);
                if (sensor) {
                    sensor.status = data.newStatus;
                }
            });
        })
    }

    copyDeviceId(deviceId: string) {
        this.clipboard.copy(deviceId);

        this.translateService.get('sensors.device-id-copied').subscribe((message: string) => {
            this.snackBar.open(message, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
            });
        });
    }

    copyDeviceKey(deviceKey: string) {
        this.clipboard.copy(deviceKey);
        this.translateService.get('sensors.device-key-copied').subscribe((message: string) => {
            this.snackBar.open(message, '', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
            });
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
