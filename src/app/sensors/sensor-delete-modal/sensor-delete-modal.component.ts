import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SensorsService} from "../services/sensors.service";
import {ISensorResult} from "../models/sensor-result";

@Component({
  selector: 'app-sensor-delete-modal',
  templateUrl: './sensor-delete-modal.component.html',
  styleUrls: ['./sensor-delete-modal.component.scss']
})
export class SensorDeleteModalComponent {

    constructor(private dialogRef: MatDialogRef<SensorDeleteModalComponent>,
                private sensorsService: SensorsService,
                @Inject(MAT_DIALOG_DATA) public data: ISensorResult) {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirmDelete(): void {
        this.sensorsService.delete(this.data.id).subscribe(() => {
            this.dialogRef.close(this.data.id);
        });
    }
}
