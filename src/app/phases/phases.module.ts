import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhasesComponent} from './phases/phases.component';
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {phasesResolver} from "./resolvers/phases.resolver";
import {SharedModule} from "../shared/shared.module";
import {PhaseDetailsComponent} from './phase-details/phase-details.component';
import {PhaseDeleteComponent} from './phase-delete/phase-delete.component';
import {PhaseEditComponent} from './phase-edit/phase-edit.component';
import {PhaseCreateComponent} from './phase-create/phase-create.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {PhaseParametersComponent} from './phase-parameters/phase-parameters.component';
import {MatListModule} from "@angular/material/list";

@NgModule({
    declarations: [
        PhasesComponent,
        PhaseDetailsComponent,
        PhaseDeleteComponent,
        PhaseEditComponent,
        PhaseCreateComponent,
        PhaseParametersComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: PhasesComponent,
                resolve: {
                    phases: phasesResolver
                }
            },
        ]),
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatListModule,
    ]
})
export class PhasesModule {
}
