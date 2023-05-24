import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorsComponent} from './sensors/sensors.component';
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SensorDetailsComponent} from './sensor-details/sensor-details.component';
import {sensorResolver, sensorsResolver} from "./resolvers/sensors.resolvers";
import { SensorCreateModalComponent } from './sensor-create-modal/sensor-create-modal.component';
import { SensorDeleteModalComponent } from './sensor-delete-modal/sensor-delete-modal.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [
        SensorsComponent,
        SensorDetailsComponent,
        SensorCreateModalComponent,
        SensorDeleteModalComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: SensorsComponent,
                resolve: {
                    sensors: sensorsResolver
                },
            },
            {
                path: ':id',
                component: SensorDetailsComponent,
                resolve: {
                    sensor: sensorResolver
                }
            }
        ]),
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        CdkDropList,
        CdkDrag,
        MatListModule,
        MatTabsModule,
        MatSelectModule,
        FormsModule,
        MatDatepickerModule,
        TranslateModule,
    ],
    providers: [MatSnackBar]
})
export class SensorsModule {
}
