import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {SensorsService} from "../services/sensors.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ISensorResult} from "../models/sensor-result";

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit {

    sensor!: ISensorResult;

    constructor(private dialog: MatDialog,
                private activatedRoute: ActivatedRoute,
                private sensorsService: SensorsService,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({sensor}) => {
            this.sensor = sensor;
            console.log(sensor);
        })
    }
}
