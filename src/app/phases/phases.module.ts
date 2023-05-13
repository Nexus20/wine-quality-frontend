import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhasesComponent} from './phases/phases.component';
import {MatTableModule} from "@angular/material/table";
import {RouterModule} from "@angular/router";
import {PhasesService} from "./services/phases.service";
import {phasesResolver} from "./resolvers/phases.resolver";
import {SharedModule} from "../shared/shared.module";
import { PhaseDetailsComponent } from './phase-details/phase-details.component';
import { PhaseDeleteComponent } from './phase-delete/phase-delete.component';
import { PhaseEditComponent } from './phase-edit/phase-edit.component';
import { PhaseCreateComponent } from './phase-create/phase-create.component';

@NgModule({
    declarations: [
        PhasesComponent,
        PhaseDetailsComponent,
        PhaseDeleteComponent,
        PhaseEditComponent,
        PhaseCreateComponent
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
    ]
})
export class PhasesModule {
}
