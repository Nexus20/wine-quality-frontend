import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParametersComponent} from './parameters/parameters.component';
import {RouterModule} from "@angular/router";
import {parametersResolver} from "./resolvers/parameters.resolver";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import { ParameterDetailsComponent } from './parameter-details/parameter-details.component';
import { ParameterCreateComponent } from './parameter-create/parameter-create.component';
import { ParameterEditComponent } from './parameter-edit/parameter-edit.component';
import { ParameterDeleteComponent } from './parameter-delete/parameter-delete.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        ParametersComponent,
        ParameterDetailsComponent,
        ParameterCreateComponent,
        ParameterEditComponent,
        ParameterDeleteComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ParametersComponent,
                resolve: {
                    parameters: parametersResolver
                }
            },
        ]),
        MatButtonModule,
        SharedModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
    ]
})
export class ParametersModule {
}
